<script setup>
  import useCoworkings from '@/composables/useCoworkings'
  import { coworkingPrice } from '@/helpers'

  const { coworkingsCollection, deleteItem } = useCoworkings()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn
    color="blue"
    variant="flat"
    :to="{name: 'nuevo-coworking'}"
  >
    Nuevo Coworking
  </v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item
        v-for="coworking in coworkingsCollection"
        :key="coworking.id"
      >
        <!-- Slot for Image -->
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img width="180" :src="coworking.imagen" alt="imagen_coworking" />
          </v-list-item-media>
        </template>

        <!-- Content (Title and Price) -->
        <v-list-item-content>
          <v-list-item-title>{{ coworking.titulo }}</v-list-item-title>
          <v-list-item-subtitle>{{ coworkingPrice(coworking.precio)}}</v-list-item-subtitle>
        </v-list-item-content>

        <!-- Slot for Button -->
        <template v-slot:append>
          <v-btn 
            color="deep-purple-lighten-2"
            variant="flat"
            class="mr-2"
            :to="{name: 'editar-coworking', params: { id: coworking.id }}"
          >
            Editar
          </v-btn>
          <v-btn 
            color="red-lighten-2"
            variant="flat"
            @click="deleteItem(coworking.id, coworking.imagen)"
          >
            Eliminar
          </v-btn>
        </template>

      </v-list-item>
    </v-list>
  </v-card>
</template>
