<script setup>
import { computed } from 'vue'; // Importar computed desde Vue
import useCoworkings from '@/composables/useCoworkings'
import Coworking from '@/components/Coworking.vue'
import Footer from './Footer.vue'

const { provincia, filteredItems, coworkingsCollection } = useCoworkings()

// Añadir la opción "Todos" para mostrar todos los coworkings
const ciudades = ['Todos', 'Amsterdam', 'Barcelona', 'Berlin', 'Islas Canarias', 'Londres', 'Lisboa', 'Madrid', 'Paris']

// Actualizar el comportamiento para que muestre todos los coworkings si la provincia es "Todos" o está vacía
const filteredCoworkings = computed(() => {
  return provincia.value === 'Todos' || !provincia.value 
    ? coworkingsCollection.value 
    : filteredItems.value
})
</script>

<template>
  <main>
    
    <v-card flat class="py-10 d-flex flex-column align-center">
      <v-card-title 
        class="d-flex flex-column flex-md-row align-center justify-space-between mb-10"
        style="width: 100%; max-width: 600px;"
      >
        <!-- Select de ciudad -->
        <v-select 
        label="Selecciona una ciudad"
        v-model="provincia"
        :items="ciudades"
        clearable
        outlined
        hide-details="auto"
        class="w-100 mb-3 mb-md-0"
        />
        
        <div class="text-box w-100 w-md-auto text-center">
        <p class="font-weight-bold">¡Encuentra tu coworking!</p>
      </div>
      </v-card-title>

      <v-row>
        <Coworking 
          v-for="coworking in filteredCoworkings" 
          :key="coworking.id" 
          :coworking="coworking" 
        />
      </v-row>
    </v-card>
    <Footer />
  </main>
</template>

<style scoped>
  .text-box {
    background-color: #5bc9e1;
    color: #fff;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
  }

  .text-box {
    background-color: #5bc9e1;
    color: #fff;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px; /* Altura igual al input */
  }
</style>
