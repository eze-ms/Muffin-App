<script setup>
  import { RouterView } from 'vue-router'
  import { useAuthStore } from './stores/auth'
  const auth = useAuthStore()
</script>

<template>
  <v-app>
    <v-app-bar color="white" fixed app>
      <template v-slot:prepend>
        <v-btn :to="{name: 'home'}">Muffin</v-btn>
      </template>

      <template v-slot:append>
        <div v-if="auth.isAuth">
          <v-btn :to="{name: 'admin-coworkings'}">Admin</v-btn>
          <v-btn @click="auth.logout">Cerrar Sesión</v-btn>
        </div>
        <div v-else>
          <v-btn :to="{name: 'home'}">Inicio</v-btn>
          <v-btn :to="{name: 'login'}">Iniciar Sesión</v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- Contenido Principal -->
    <v-main class="pa-0">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
