<script setup>
import { computed } from 'vue'
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
    <!-- Cabecera con imagen, filtro oscuro, título, span y select -->
    <v-card flat>
      <v-card-title class="header-image d-flex flex-column align-center justify-center py-10">
        <h1 
          class="header-text text-h2 font-weight-bold text-white"
        >
          Futuro, Flexible. Todo Está Aquí.
        </h1>
        <span 
          class="header-subtext text-h6 text-white mt-3"
        >
          Bienvenido al coworking que estás buscando. Bienvenido a tu segundo hogar.
        </span>
      </v-card-title>
    </v-card>

    <!-- Contenido presentación -->
    <v-card flat class="py-12 d-flex flex-column align-center">
      <v-container>
        <v-row>
          <!-- Columna para el texto a la izquierda -->
          <v-col cols="12" md="6" class="pr-md-6">
            <h2 class="text-left font-weight-bold text-h3 jost-font mb-6">Tu coworking en el mundo</h2>
            <p class="text-left font-weight-bold text-subtitle-1 mb-4 line-height">
              Bienvenido al espacio de coworking que trasciende fronteras. Bienvenido a tu segundo hogar, estés donde estés.
            </p>
            <p class="text-left text-subtitle-1 mb-6">
              En Muffin ofrecemos coworkings en ciudades clave de todo el mundo, diseñados pensando en la flexibilidad y en las necesidades de profesionales globales: trabajadores en remoto, emprendedores internacionales, freelancers y equipos de startups que buscan una oficina que se adapte a su estilo de vida. Con opciones que van desde membresías flexibles por horas hasta oficinas privadas para ti y tu equipo, nos adaptamos a tu ritmo de trabajo sin importar en qué parte del mundo te encuentres.
            </p>
            <p class="text-left text-subtitle-1 mb-6">
              Nuestra misión es conectar personas y culturas, facilitando un entorno colaborativo que impulsa la innovación y la creatividad sin importar la ubicación. Con servicios exclusivos, espacios cómodos y eventos globales que fomentan el networking, cada coworking de nuestra red se convierte en un punto de encuentro vibrante para profesionales que buscan crecer.
            </p>
            <p class="text-left text-subtitle-1 font-weight-bold line-height">
              Ven, únete a nosotros y descubre cómo Muffin se convierte en tu segunda casa en cualquier ciudad del mundo.
            </p>
          </v-col>

          <!-- Columna para la imagen a la derecha -->
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-img 
              src="/images/first2.webp" 
              alt="Imagen Coworking Global"
              max-width="90%"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- Contenido principal -->
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
                <p class="font-weight-medium">¡Encuentra tu coworking!</p>
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <Coworking 
            v-for="coworking in filteredCoworkings" 
            :key="coworking.id" 
            :coworking="coworking" 
          />
        </v-row>
      </v-container>
    </v-card>

    <!-- Footer -->
    <v-card flat class="py-6 d-flex flex-column align-center">
      <v-container>
        <Footer />
      </v-container>
    </v-card>
  </main>
</template>

<style scoped>
  .header-image {
    background-image: url('/images/cow-cover.webp');
    background-size: cover;
    background-position: center;
    height: 450px;
    position: relative;
    padding-top: 20px;
  }

  .header-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Superposición oscura */
  }

  .header-text {
    z-index: 1;
    margin-bottom: 1rem;
    font-family: 'Jost', sans-serif;
    color: #fff;
  }

  .header-subtext {
    z-index: 1;
  }

  .header-content {
    width: 50%;
  }
  .header-select {  
    margin-right: 0;
    min-height: 50px; /* Asegurar que el contenedor tenga suficiente altura */
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
  .jost-font{
    font-family: 'Jost', sans-serif;
    width: 75%;
  }
  .paragraph-spacing {
    margin-bottom: 16px;
  }
  .header-subtext,
  .text-subtitle-1 {
    font-family: "Work Sans", sans-serif;
  }
  .line-height{
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .header-content {
      width: 90%;
    }
    .header-text {
      font-size: 2.5rem !important; /* Ajusta el tamaño para pantallas pequeñas */
    }
  }
  @media (max-width: 600px) {
    .header-text {
      font-size: 1.25rem !important; /* Ajusta el tamaño para pantallas pequeñas */
    }
    .header-subtext {
      font-size: 0.75rem !important;
    }
  }
</style>
