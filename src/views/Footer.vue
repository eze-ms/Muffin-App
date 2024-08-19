<script setup>
    import { ref } from 'vue'

    // Obtenemos el año actual para mostrar en el footer
    const currentYear = ref(new Date().getFullYear())
    </script>
<template>
    <v-footer
      padless
      class="footer py-0"
    >
        <v-col
            cols="12"
            class="text-center"
        >
        <span class="text-white text-caption text-grey-darken-1">
          Esta sitio es un proyecto personal sin fines de lucro. Todos los derechos reservados &copy; {{ currentYear }}.
        </span>
      </v-col>
    </v-footer>
  </template>
  
  
  <style scoped>
    .footer {
        border: 1px solid #d8d8d8; 
    }
  </style>
  