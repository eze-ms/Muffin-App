<script setup>
  import { useForm, useField } from 'vee-validate'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirestore } from 'vuefire'
  import { useRouter } from 'vue-router'
  import { validationSchema, imageSchema } from '@/validation/coworkingSchema'
  import useImage from '@/composables/useImage'
  import useLocationMap from '@/composables/useLocationMap'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"


  const items_cantidad = [1, 2, 3, 4, 5]
  const items_tipo_espacio = [
    'Pase de día', 
    'Sala de reuniones', 
    'Escritorio personal', 
    'Oficina privada', 
    'Eventos'
  ]
  const items_servicios = [
    'Guardabicis', 
    'Se admiten animales', 
    'Expresso Bar', 
    'Aparcamientos', 
    'Duchas', 
    'Sala de Bienestar'
  ]
  const items_disponibilidad = [
    'Noches abiertas', 
    'Fines de semana abiertos', 
    'Abierto 24/7'
  ]
  const { url, uploadImage, image } = useImage()
  const { zoom, center, pin } = useLocationMap()

  const router = useRouter()
  const db = useFirestore()

  const { handleSubmit } = useForm({
    validationSchema : {
      ...validationSchema,
      ...imageSchema
    }
  })

  const titulo = useField('titulo')
  const direccion = useField('direccion')
  const barrio = useField('barrio')
  const provincia = useField('provincia')
  const imagen = useField('imagen')
  const precio = useField('precio')
  const cantidadPersonas = useField('cantidadPersonas')
  const tipoEspacio = useField('tipoEspacio')
  const servicios = useField('servicios')
  const disponibilidad = useField('disponibilidad')
  const descripcion = useField('descripcion')
  
  const submit = handleSubmit(async (values) => {

    const { imagen, ...coworking } = values

    const docRef = await addDoc(collection(db, "coworkings"), {
      ...coworking,
      imagen: url.value,
      ubicacion:center.value
    })
    if(docRef.id) {
      router.push({name: 'admin-coworkings'})
    }
  })

</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title
      class="text-h4 font-weight-black text-black"
      tag="h3"
    >
      ¡Crea tu nuevo coworking!
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Rellena el siguiente formulario
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        class="mb-5"
        label="Título Coworking"
        prepend-icon="mdi-text"
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
      />

      <v-text-field
        class="mb-5"
        label="Dirección"
        prepend-icon="mdi-map-marker"
        v-model="direccion.value.value"
        :error-messages="direccion.errorMessage.value"
      />
      <v-text-field
        class="mb-5"
        label="Barrio"
        prepend-icon="mdi-map-marker"
        v-model="barrio.value.value"
        :error-messages="barrio.errorMessage.value"
      />

      <v-text-field
        class="mb-5"
        label="Ciudad"
        prepend-icon="mdi-map-marker"
        v-model="provincia.value.value"
        :error-messages="provincia.errorMessage.value"
      />

      <v-file-input
        accept="image/jpeg"
        label="Añade imágenes"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        @change="uploadImage"
      />

      <div class="my-5 text-center" v-if="image">
        <p class="font-weight-normal text-caption mb-3">Imagen Coworking:</p>
        <img class="w-50" :src="image" alt="imagen_coworking" />
      </div>

      <v-text-field
        class="mb-5"
        label="Precio"
        prepend-icon="mdi-currency-eur"
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
      />

      <v-row>
        <v-col cols="12" md="3">
          <v-select
            label="Cantidad de Personas"
            class="mb-5"
            :items="items_cantidad"
            prepend-icon="mdi-account-multiple"
            v-model="cantidadPersonas.value.value"
            :error-messages="cantidadPersonas.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Tipo de Espacio"
            class="mb-5"
            :items="items_tipo_espacio"
            prepend-icon="mdi-chair-rolling"
            v-model="tipoEspacio.value.value"
            :error-messages="tipoEspacio.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Servicios"
            class="mb-5"
            :items="items_servicios"
            prepend-icon="mdi-briefcase"
            multiple
            v-model="servicios.value.value"
            :error-messages="servicios.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            label="Disponibilidad"
            class="mb-5"
            :items="items_disponibilidad"
            prepend-icon="mdi-calendar-clock"
            multiple
            v-model="disponibilidad.value.value"
            :error-messages="disponibilidad.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Descripción..."
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
      />

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

      <v-btn
        color="blue-lighten-3"
        block
        class="my-5"
        @click="submit"
      >
        Agregar Coworking
      </v-btn>
    </v-form>
  </v-card>
</template>
