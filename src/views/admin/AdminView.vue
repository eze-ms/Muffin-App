<script setup>
import useCoworkings from '@/composables/useCoworkings'
import { coworkingPrice } from '@/helpers'

const { coworkingsCollection, deleteItem } = useCoworkings()
</script>

<template>
  <h2 class="text-center text-h4 my-5 font-weight-bold">Panel de administración</h2>

  <v-btn
    color="blue"
    variant="flat"
    :to="{ name: 'nuevo-coworking' }"
  >
    Nuevo Coworking
  </v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item
        v-for="coworking in coworkingsCollection"
        :key="coworking.id"
        class="d-flex flex-column flex-md-row align-items-center"
      >
        <!-- Slot for Image -->
        <template v-slot:prepend>
          <v-list-item-media class="coworking-image-wrapper mb-4 mb-md-0">
            <!-- Mostrar la primera imagen del array de imágenes -->
            <img 
              width="180" 
              :src="coworking.imagenes && coworking.imagenes.length > 0 ? coworking.imagenes[0] : ''" 
              alt="imagen_coworking" 
            />
          </v-list-item-media>
        </template>

        <!-- Content (Title and Price) -->
        <v-list-item-content class="text-center text-md-left mb-4 mb-md-0">
          <v-list-item-title>{{ coworking.titulo }}</v-list-item-title>
          <v-list-item-subtitle>{{ coworkingPrice(coworking.precio) }}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- Slot for Button -->
        <template v-slot:append>
          <div class="d-flex flex-column flex-md-row">
            <v-btn 
              color="deep-purple-lighten-2"
              variant="flat"
              class="mr-md-2 mb-2 mb-md-0"
              :to="{ name: 'editar-coworking', params: { id: coworking.id }}"
            >
              Editar
            </v-btn>
            <v-btn 
              color="red-lighten-2"
              variant="flat"
              @click="deleteItem(coworking.id, coworking.imagenes ? coworking.imagenes[0] : '')"
            >
              Eliminar
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped>
.coworking-image-wrapper {
  width: 180px;
}

@media (max-width: 599px) {
  .coworking-image-wrapper {
    margin: 0 auto;
  }
  .v-list-item-content {
    text-align: center;
  }
}

@media (min-width: 600px) {
  .v-list-item {
    justify-content: space-between;
  }
}
</style>
