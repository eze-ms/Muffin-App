<script setup>
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { doc } from 'firebase/firestore'
  import { useDocument, useFirestore } from 'vuefire'
  import "leaflet/dist/leaflet.css";
  import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet"
  import useLocationMap from '@/composables/useLocationMap'
  import { coworkingPrice } from '@/helpers'
  
  const { zoom, center } =useLocationMap()
  const route = useRoute()
  const db = useFirestore()
  const docRef = doc(db, 'coworkings', route.params.id)
  const coworking = useDocument(docRef)

  watch(coworking, (coworking) => {
    center.value = coworking.ubicacion
  })
</script>

<template>
  <v-card flat>
    <v-skeleton-loader
      v-if="!coworking"
      type="card"
      width="100%"
      height="350px"
    />

    <template v-else>
      <v-img
        :src="coworking.imagen"
        height="350"
        cover
      />
      <v-card-title class="mt-5 text-h4 py-5 font-weight-bold">
        {{ coworking ? coworking.titulo : 'Cargando...' }}
      </v-card-title>

      <v-row>
        <!-- Columna izquierda con la descripción y detalles -->
        <v-col cols="12" md="8">
          <div class="d-flex flex-column justify-center">
            <v-row>
              <v-col class="text-center">
                <v-card-text style="text-align:left;">
                  <p class="font-weight-bold text-lg">Precio</p>
                  <span>{{ coworkingPrice(coworking?.precio) }}</span>
                </v-card-text>
              </v-col>

              <v-col class="text-center">
                <v-card-text style="text-align:left;">
                  <p class="font-weight-bold text-lg">Tipo de espacio</p>
                  <span>{{ Array.isArray(coworking?.tipoEspacio) ? coworking.tipoEspacio.join(' / ') : coworking.tipoEspacio }}</span>
                </v-card-text>
              </v-col>

              <v-col class="text-center">
                <v-card-text style="text-align:left;">
                  <p class="font-weight-bold text-lg">Servicios</p>
                  <span>{{ Array.isArray(coworking?.servicios) ? coworking.servicios.join(' / ') : coworking.servicios }}</span>
                </v-card-text>
              </v-col>

              <v-col class="text-center">
                <v-card-text style="text-align:left;">
                  <p class="font-weight-bold text-lg">Disponibilidad</p>
                  <span>{{ Array.isArray(coworking?.disponibilidad) ? coworking.disponibilidad.join(' / ') : coworking.disponibilidad }}</span>
                </v-card-text>
              </v-col>
            </v-row>

            <div class="py-10 px-3">
              <p class="text-h5 font-weight-black mb-3">Acerca del espacio</p>
              <p class="text-pre-wrap">{{ coworking?.descripcion }}</p>
            </div>
          </div>
        </v-col>

        <!-- Columna derecha con el mapa -->
        <v-col cols="12" md="4">
          <div class="py-5" style="height:600px;">
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
              />
            </LMap>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<style scoped>
  .text-pre-wrap {
    white-space: pre-wrap;
  }
  .text-lg {
    font-size: 1rem;
  }
</style>

  
  