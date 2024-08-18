<script setup>
    import { ref } from 'vue'

    // Obtenemos el año actual para mostrar en el footer
    const currentYear = ref(new Date().getFullYear())
    </script>
<template>
    <v-footer
      padless
      class="footer"
    >
        <v-col
            cols="12"
            class="text-center py-4"
        >
        <span class="text-white text-caption text-grey-darken-1">
          Esta web es un proyecto personal sin ánimo de lucro. Todos los derechos reservados &copy; {{ currentYear }}.
        </span>
      </v-col>
    </v-footer>
  </template>
  
  
  <style scoped>
    .footer {
        border: 1px solid #d8d8d8; 
    }
  </style>
  