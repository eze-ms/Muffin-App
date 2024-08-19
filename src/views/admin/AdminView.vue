<script setup>
import { computed } from 'vue'
import useCoworkings from '@/composables/useCoworkings'
import { coworkingPrice } from '@/helpers'

// Reutilizamos la lógica de useCoworkings
const { coworkingsCollection, deleteItem, provincia, filteredItems } = useCoworkings()

// Ciudades disponibles en el selector
const ciudades = ['Todos', 'Amsterdam', 'Barcelona', 'Berlin', 'Islas Canarias', 'Londres', 'Lisboa', 'Madrid', 'Paris']

// Filtrado basado en la provincia seleccionada
const filteredCoworkings = computed(() => {
  return provincia.value === 'Todos' || !provincia.value 
    ? coworkingsCollection.value 
    : filteredItems.value
})
</script>

<template>
  <v-container>
    <h2 class="text-center text-h4 my-5 pt-10 font-weight-bold">Panel de administración</h2>

    <!-- Selector de provincia -->
    <v-card flat class="py-12 d-flex flex-column align-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="d-flex justify-center">
            <div class="header-content d-flex flex-row align-center pb-10">
              <v-select 
                label="Selecciona una ciudad"
                v-model="provincia"
                :items="ciudades"
                clearable
                outlined
                hide-details="auto"
                class="header-select bg-white mr-4"
              />
              <div class="text-box text-center">
                <p class="font-weight-medium">Fitra por ciudad</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <!-- Mostrar los coworkings filtrados -->
        <v-row>
          <Coworking 
            v-for="coworking in filteredCoworkings" 
            :key="coworking.id" 
            :coworking="coworking" 
          />
        </v-row>
      </v-container>
    </v-card>

    <!-- Botón para añadir nuevo coworking -->
    <v-btn
      color="blue"
      variant="flat"
      :to="{ name: 'nuevo-coworking' }"
    >
      Nuevo Coworking
    </v-btn>

    <!-- Lista de coworkings filtrados -->
    <v-card class="mx-auto mt-10">
      <v-container>
        <v-list>
          <v-list-item
            v-for="coworking in filteredCoworkings"
            :key="coworking.id"
            class="bordered-bottom py-5"
          >
            <v-row class="align-items-center justify-center justify-md-space-between">
              <!-- Parte izquierda con la imagen y los detalles -->
              <v-col cols="12" md="8" class="d-flex flex-column flex-md-row align-items-center text-center text-md-left">
                <v-list-item-media class="coworking-image-wrapper mb-4 mb-md-0 mx-auto mx-md-0">
                  <img 
                    width="180" 
                    :src="coworking.imagenes && coworking.imagenes.length > 0 ? coworking.imagenes[0] : ''" 
                    alt="imagen_coworking" 
                  />
                </v-list-item-media>

                <v-list-item-content class="ml-md-4">
                  <v-list-item-title>{{ coworking.titulo }}</v-list-item-title>
                  <v-list-item-title>{{ coworking.provincia }}</v-list-item-title>
                  <v-list-item-subtitle>{{ coworkingPrice(coworking.precio) }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-col>

              <!-- Parte derecha con los botones -->
              <v-col cols="12" md="4" class="d-flex justify-center justify-md-end">
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
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
.coworking-image-wrapper {
  width: 180px;
}
.bordered-bottom {
  border-bottom: 1px solid #d8d8d8;
}
.text-box {
    background-color: var(--v-primary-base);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    text-align: center;
    background-color: #b1fdff;
    font-family: 'Jost', sans-serif;
  }
  .header-content {
    width: 50%;
  }
</style>
