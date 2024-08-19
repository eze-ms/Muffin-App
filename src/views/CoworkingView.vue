<script setup>
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { doc } from 'firebase/firestore'
  import { useDocument, useFirestore } from 'vuefire'
  import "leaflet/dist/leaflet.css"
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
  import useLocationMap from '@/composables/useLocationMap'
  import { coworkingPrice } from '@/helpers'
  import Footer from './Footer.vue'
  
  const { zoom, center } = useLocationMap()
  const route = useRoute()
  const db = useFirestore()
  const docRef = doc(db, 'coworkings', route.params.id)
  const coworking = useDocument(docRef)

  watch(coworking, (coworking) => {
    if (coworking) {
      center.value = coworking.ubicacion
    }
  })
</script>

<template>
  <v-card flat>
    <!-- Verificar si `coworking` está definido antes de mostrar el contenido -->
    <v-skeleton-loader
      v-if="!coworking"
      type="card"
      width="100%"
      height="350px"
    />
    
    <template v-else>
      <!-- Imagen principal a todo el ancho -->
      <v-img :src="coworking.imagenes?.[0]" height="300" cover />

      <!-- Contenedor con el contenido principal -->
      <v-container>
        <!-- Título -->
        <v-card-title class="mt-5 text-h4 text-left py-5 pl-0 font-weight-bold title-text">
          {{ coworking?.titulo }}
        </v-card-title>

        <!-- Información general del coworking -->
        <div class="d-flex flex-column flex-md-row align-md-center py-4 bordered-container">
          <v-card-text class="d-flex flex-column">
            Precio
            <span class="font-weight-bold">{{ coworkingPrice(coworking?.precio) }}</span>
          </v-card-text>

          <v-card-text v-if="coworking?.tipoEspacio" class="d-flex flex-column">
            Tipo de espacio
            <span class="font-weight-bold">{{ Array.isArray(coworking.tipoEspacio) ? coworking.tipoEspacio.join(' / ') : coworking.tipoEspacio }}</span>
          </v-card-text>

          <v-card-text v-if="coworking?.servicios" class="d-flex flex-column">
            Servicios
            <span class="font-weight-bold">{{ Array.isArray(coworking.servicios) ? coworking.servicios.join(' / ') : coworking.servicios }}</span>
          </v-card-text>

          <v-card-text v-if="coworking?.disponibilidad" class="d-flex flex-column">
            Disponibilidad
            <span class="font-weight-bold">{{ Array.isArray(coworking.disponibilidad) ? coworking.disponibilidad.join(' / ') : coworking.disponibilidad }}</span>
          </v-card-text>
        </div>

        <v-row class="text-espacio">
          <v-col cols="12" md="8">
            <div class="py-10 bordered-bottom mb-5">
              <p class="text-h5 font-weight-bold mb-3 text-espacio">Acerca del espacio</p>
              {{ coworking?.descripcion }}
            </div>

            <!-- Galería de imágenes -->
            <div v-if="coworking?.imagenes && coworking.imagenes.length > 0" class="py-5">
              <v-row>
                <v-col
                  v-for="(imagen, index) in coworking.imagenes"
                  :key="index"
                  cols="12"
                  md="4"
                >
                  <v-img :src="imagen" height="200" cover></v-img>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <!-- Columna derecha con el mapa -->
          <v-col cols="12" md="4">
            <div class="py-10" style="height:600px;">
              <LMap 
                v-model:zoom="zoom" 
                :center="center" 
                :use-global-leaflet="false" 
              >
                <LMarker :lat-lng="center">
                  <LPopup>
                    {{ coworking.direccion }}
                  </LPopup>
                </LMarker>
                <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></LTileLayer>
              </LMap>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-card>

  <!-- Footer -->
  <v-card flat class="py-6 d-flex flex-column align-center">
    <v-container>
      <Footer />
    </v-container>
  </v-card>
</template>

<style scoped>
  .title-text {
    font-family: 'Jost', sans-serif;
  }

  .bordered-container {
    border: 1px solid #d8d8d8;
    font-family: "Work Sans", sans-serif;
  }

  .text-espacio {
    font-family: "Work Sans", sans-serif;
  }

  .bordered-bottom {
    border-bottom: 1px solid #d8d8d8;
  }
</style>
