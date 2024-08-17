import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
// import { useFirebaseApp } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/coworking/:id',
      name: 'coworking',
      component: () => import('../views/CoworkingView.vue')
    },
    {
      path:'/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
   
    {
      path:'/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'coworkings',
          name: 'admin-coworkings', //*Vista administración
          component: () => import('../views/admin/AdminView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/nuevo-coworking',
          name: 'nuevo-coworking', //*Vista nuevo coworking
          component: () => import('../views/admin/NuevoCoworkingView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'editar/:id',
          name: 'editar-coworking',//*Vista editar coworking
          component: () => import('../views/admin/EditarCoworkingView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

//! Guarda de navegación
router.beforeEach(async(to, from, next) => {
  // Verifica si la ruta que el usuario intenta acceder requiere autenticación
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if (requiresAuth) {
    // Si la ruta requiere autenticación, comprueba si el usuario está autenticado
    try {
      await authenticateUser() // Llama a la función para verificar la autenticación
      next() // Si el usuario está autenticado, permite la navegación a la ruta solicitada
    } catch (error) {
      console.log(error) 
      next({ name: 'login' }) // Redirige al usuario a la página de inicio de sesión
    }
  } else {
    // Si la ruta no requiere autenticación, se permite la navegación a la vista solicitada
    next()
  }
})

//! Función para autenticar al usuario
// authenticateUser utiliza onAuthStateChanged para comprobar si el usuario actual está autenticado.
// onAuthStateChanged es un observador que se activa cada vez que el estado de autenticación cambia.
// Aquí se utiliza para verificar el estado de autenticación en el momento de la navegación.

function authenticateUser(){
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

export default router
