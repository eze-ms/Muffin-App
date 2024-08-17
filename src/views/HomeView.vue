<script setup>
  import useCoworkings from '@/composables/useCoworkings';
  import Coworking from '@/components/Coworking.vue';

  const { provincia, filteredItems, coworkingsCollection } = useCoworkings();
  const ciudades = ['Amsterdam', 'Barcelona', 'Berlin', 'Islas Canarias', 'Londres', 'Lisboa', 'Madrid', 'Paris'];
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
          v-for="coworking in filteredItems"
          :key="coworking.id"
          :coworking="coworking"
        />
      </v-row>
    </v-card>
  </main>
</template>
