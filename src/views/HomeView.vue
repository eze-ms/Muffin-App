<script setup>
import { computed } from 'vue'; // Importar computed desde Vue
import useCoworkings from '@/composables/useCoworkings';
import Coworking from '@/components/Coworking.vue';

const { provincia, filteredItems, coworkingsCollection } = useCoworkings();

// Añadir la opción "Todos" para mostrar todos los coworkings
const ciudades = ['Todos', 'Amsterdam', 'Barcelona', 'Berlin', 'Islas Canarias', 'Londres', 'Lisboa', 'Madrid', 'Paris'];

// Actualizar el comportamiento para que muestre todos los coworkings si la provincia es "Todos" o está vacía
const filteredCoworkings = computed(() => {
  return provincia.value === 'Todos' || !provincia.value 
    ? coworkingsCollection.value 
    : filteredItems.value;
});
</script>

<template>
  <main>
    <h1 class="text-center text-h3 font-weight-bold my-5">Nuestros coworkings</h1>

    <v-card flat class="py-10">
      <v-card-title class="text-h5 text-center">
        <v-select 
          label="Selecciona una ciudad"
          v-model="provincia"
          :items="ciudades"
          item-value="ciudad"
          item-text="ciudad"
          clearable
          outlined
        />
      </v-card-title>

      <v-row>
        <Coworking 
          v-for="coworking in filteredCoworkings"
          :key="coworking.id"
          :coworking="coworking"
        />
      </v-row>
    </v-card>
  </main>
</template>
