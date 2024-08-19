<script setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFirestore, useDocument } from 'vuefire'
  import { doc, updateDoc } from 'firebase/firestore'
  import useImage from '@/composables/useImage'
  import useLocationMap from '@/composables/useLocationMap';
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
  import { validationSchema } from '@/validation/coworkingSchema'
  import { validateForm, watchField } from '@/validation/error'
  import Spinner from '@/components/Spinner.vue'

  const { uploadImages, removeImage, uploadedUrls } = useImage();
  const { zoom, center, pin } = useLocationMap();

  const route = useRoute();
  const router = useRouter();
  const db = useFirestore();

  const titulo = ref('');
  const direccion = ref('');
  const barrio = ref('');
  const provincia = ref('');
  const precio = ref('');
  const cantidadPersonas = ref('');
  const tipoEspacio = ref('');
  const servicios = ref([]);
  const disponibilidad = ref([]);
  const descripcion = ref('');
  const selectedImages = ref([]);
  const imagePreviews = ref([]);
  const errors = ref({});
  const cargando = ref(false);

  const items_cantidad = [1, 2, 3, 4, 5];
  const items_tipo_espacio = [
    'Pase de día', 
    'Sala de reuniones', 
    'Escritorio personal', 
    'Oficina privada', 
    'Eventos'
  ];
  const items_servicios = [
    'Guardabicis', 
    'Se admiten animales', 
    'Expresso Bar', 
    'Aparcamientos', 
    'Duchas', 
    'Sala de Bienestar'
  ];
  const items_disponibilidad = [
    'Noches abiertas', 
    'Fines de semana abiertos', 
    'Abierto 24/7'
  ];

  const docRef = doc(db, 'coworkings', route.params.id);
  const coworking = useDocument(docRef);

  // Sincronizar datos existentes del coworking en el formulario
  watch(coworking, (coworking) => {
    if (coworking) {
      titulo.value = coworking.titulo || '';
      direccion.value = coworking.direccion || '';
      barrio.value = coworking.barrio || '';
      provincia.value = coworking.provincia || '';
      precio.value = coworking.precio || '';
      cantidadPersonas.value = coworking.cantidadPersonas || '';
      tipoEspacio.value = coworking.tipoEspacio || '';
      servicios.value = coworking.servicios || [];
      disponibilidad.value = coworking.disponibilidad || [];
      descripcion.value = coworking.descripcion || '';
      uploadedUrls.value = coworking.imagenes || [];
      imagePreviews.value = [...uploadedUrls.value];
      center.value = coworking.ubicacion || center.value;
    }
  });

  // Monitorear cambios en los campos y limpiar errores
  watchField(titulo, validationSchema.titulo, errors);
  watchField(direccion, validationSchema.direccion, errors);
  watchField(barrio, validationSchema.barrio, errors);
  watchField(provincia, validationSchema.provincia, errors);
  watchField(precio, validationSchema.precio, errors);
  watchField(cantidadPersonas, validationSchema.cantidadPersonas, errors);
  watchField(tipoEspacio, validationSchema.tipoEspacio, errors);
  watchField(servicios, validationSchema.servicios, errors);
  watchField(disponibilidad, validationSchema.disponibilidad, errors);
  watchField(descripcion, validationSchema.descripcion, errors);

  // Manejar el cambio de archivos seleccionados
  const handleFileChange = (event) => {
    const files = event.target.files;
    selectedImages.value = [...files];

    // Crear miniaturas de las imágenes seleccionadas
    imagePreviews.value = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result);
      };
      reader.readAsDataURL(files[i]);
    }
  };

  // Función para eliminar imágenes seleccionadas
  const removeImagePreview = async (index) => {
    await removeImage(index); // Eliminar la imagen de Firebase Storage
    imagePreviews.value.splice(index, 1); // Eliminar la miniatura
    uploadedUrls.value.splice(index, 1); // Eliminar la URL de la lista
  };

  const submit = async () => {
    cargando.value = true;

    const fields = {
      titulo: titulo.value,
      direccion: direccion.value,
      barrio: barrio.value,
      provincia: provincia.value,
      precio: precio.value,
      cantidadPersonas: cantidadPersonas.value,
      tipoEspacio: tipoEspacio.value,
      servicios: servicios.value,
      disponibilidad: disponibilidad.value,
      descripcion: descripcion.value
    };

    const formErrors = validateForm(fields, validationSchema);

    if (Object.keys(formErrors).length > 0) {
      errors.value = formErrors;
      cargando.value = false;
      return;  // Detenemos el envío si hay errores
    }

    try {
      // Subir las imágenes si hay alguna seleccionada
      if (selectedImages.value.length > 0) {
        await uploadImages(selectedImages.value);
      }

      // Actualizar el documento en Firestore
      const data = {
        ...fields,
        imagenes: uploadedUrls.value,
        ubicacion: center.value
      };
      await updateDoc(docRef, data);

      cargando.value = false;
      router.push({ name: 'admin-coworkings' });
    } catch (error) {
      console.error('Error al actualizar el formulario:', error);
      alert('Hubo un error al actualizar el formulario. Por favor, inténtalo de nuevo.');
      cargando.value = false;
    }
  };
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-black text-black pt-10" tag="h3">
      Edita tu coworking!
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Rellena el siguiente formulario
    </v-card-subtitle>

    <form @submit.prevent="submit" class="mt-10">
      <!-- Bloque 1: Información básica -->
      <v-text-field
        class="mb-5"
        label="Título Coworking"
        prepend-icon="mdi-text"
        v-model="titulo"
        :error-messages="errors.titulo"
      />

      <v-text-field
        class="mb-5"
        label="Dirección"
        prepend-icon="mdi-home"
        v-model="direccion"
        :error-messages="errors.direccion"
      />

      <v-text-field
        class="mb-5"
        label="Barrio"
        prepend-icon="mdi-city"
        v-model="barrio"
        :error-messages="errors.barrio"
      />

      <v-text-field
        class="mb-5"
        label="Ciudad"
        prepend-icon="mdi-earth"
        v-model="provincia"
        :error-messages="errors.provincia"
      />

      <v-text-field
        class="mb-5"
        label="Precio"
        prepend-icon="mdi-currency-eur"
        v-model="precio"
        :error-messages="errors.precio"
      />

      <!-- Bloque 3: Imágenes -->
      <v-file-input
        accept="image/jpeg"
        label="Añade imágenes"
        prepend-icon="mdi-camera"
        class="mb-5"
        multiple
        @change="handleFileChange"
      />

      <div class="my-5 text-center" v-if="imagePreviews.length > 0">
        <p class="font-weight-normal text-caption mb-3">Imágenes del Coworking:</p>
        <v-row class="d-flex flex-row image-container">
          <v-col
            v-for="(preview, index) in imagePreviews"
            :key="index"
            cols="3"
            class="thumbnail"
          >
            <img class="w-100" :src="preview" alt="imagen_coworking" />
            <v-icon small class="remove-icon" @click="removeImagePreview(index)">mdi-close</v-icon>
          </v-col>
        </v-row>
      </div>

      <!-- Bloque 2: Detalles del coworking -->
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            label="Cantidad de Personas"
            class="mb-5"
            :items="items_cantidad"
            prepend-icon="mdi-account-multiple"
            v-model="cantidadPersonas"
            :error-messages="errors.cantidadPersonas"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Tipo de Espacio"
            class="mb-5"
            :items="items_tipo_espacio"
            prepend-icon="mdi-chair-rolling"
            v-model="tipoEspacio"
            :error-messages="errors.tipoEspacio"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Servicios"
            class="mb-5"
            :items="items_servicios"
            prepend-icon="mdi-briefcase"
            multiple
            v-model="servicios"
            :error-messages="errors.servicios"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Disponibilidad"
            class="mb-5"
            :items="items_disponibilidad"
            prepend-icon="mdi-calendar-clock"
            multiple
            v-model="disponibilidad"
            :error-messages="errors.disponibilidad"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Descripción..."
        v-model="descripcion"
        :error-messages="errors.descripcion"
      />

      <!-- Bloque 4: Mapa -->
      <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
      <p class="font-weight-normal text-caption mb-3 text-center">(Arrastra el pin a una ubicación aproximada)</p>
      <div class="pb-10">
        <div style="height:600px">
          <LMap 
            v-model:zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false"
          >
            <LMarker 
              :lat-lng="center" 
              draggable 
              @moveend="pin" 
            />
            <LTileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <!-- Bloque 5: Botón de envío -->
      <v-btn
        color="blue-lighten-3"
        block
        class="my-5"
        type="submit"
      >
        Agregar Coworking
      </v-btn>
    </form>

    <!-- Spinner centrado en pantalla -->
    <div v-if="cargando" class="spinner-overlay">
      <Spinner />
    </div>
  </v-card>
</template>

<style>
  .image-container {
    width: 100%;
    justify-content: center;
  }
  .thumbnail {
    position: relative;
    display: inline-block;
  }

  .remove-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  /* Estilos para centrar el spinner en pantalla */
  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1000;
  }
</style>