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
      <!-- Mostrar la primera imagen del array `imagenes` si existe -->
      <v-img :src="coworking.imagenes && coworking.imagenes.length > 0 ? coworking.imagenes[0] : 'placeholder.jpg'" height="250" cover class="image-filter" />

      <v-card-title class="font-weight-bold mt-3 cow-title">
        {{ coworking.titulo }}
      </v-card-title>
      <div>
        <v-card-text class="pb-0 cow-barrio">
        {{ coworking.barrio }}
      </v-card-text>

      <v-card-text class="pt-2 font-weight-bold cow-city">
        {{ coworking.provincia }}
      </v-card-text>
      </div>
     
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
.cow-title {
  font-family: 'Jost', sans-serif;
}
.cow-barrio,
.cow-city {
  font-family: "Work Sans", sans-serif
}
</style>
