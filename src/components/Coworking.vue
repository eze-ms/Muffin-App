<script setup>
  defineProps({
    coworking: {
      type: Object
    }
  })
</script>

<template>
  <v-col cols="12" md="4">
    <v-card
      :to="{ name: 'coworking', params: { id: coworking.id }}"
      class="hover-zoom"
    >
      <v-img :src="coworking.imagen" height="250" cover class="image-filter" />

      <v-card-title class="font-weight-bold mt-3">
        {{ coworking.titulo }}
      </v-card-title>
      <v-card-text>
        {{ coworking.barrio }}
      </v-card-text>
    </v-card>
  </v-col>
</template>

<style>
.hover-zoom {
  overflow: hidden;
}

.image-filter {
  filter: brightness(0.9) contrast(1.1); /* Filtro suave por defecto */
  transition: filter 0.3s ease;
}

.hover-zoom:hover .image-filter {
  filter: none; /* Eliminar el filtro al hacer hover */
}
</style>
