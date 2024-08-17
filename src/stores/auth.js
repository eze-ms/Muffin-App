import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
  
  //! Inicializa la instancia de autenticación de Firebase y el enrutador de Vue
  const auth = getAuth(); // Obtiene la instancia de Firebase Auth configurada
  const router = useRouter(); // Obtiene el enrutador para manejar la navegación

  //! Estados reactivos para el usuario autenticado y mensajes de error
  const authUser = ref(null); // Almacena el estado del usuario autenticado
  const errorMsg = ref(''); // Almacena mensajes de error para mostrar al usuario

  //! Diccionario de códigos de error de Firebase mapeados a mensajes de error personalizados
  const errorCodes = {
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-credential': 'Credenciales inválidas',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'El correo electrónico ya está en uso',
    'auth/invalid-email': 'Correo electrónico inválido'
  };

  // ! Mantiene el estado del usuario autenticado sincronizado con Firebase
  onMounted(() => {
    onAuthStateChanged(auth, (user) => { //* onAuthStateChanged es un observador que se activa cada vez que el estado de autenticación cambia
      if (user) {
        authUser.value = user; // * Si el usuario está autenticado, se actualiza authUser
      } else {
        authUser.value = null; // * Si no hay usuario autenticado, se limpia authUser
      }
    });
  });

  //! Función para iniciar sesión usando correo electrónico y contraseña
  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password) //* signInWithEmailAndPassword es un método de Firebase que permite a los usuarios autenticarse
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user; //* Almacena el usuario autenticado en authUser
        router.push({ name: 'admin-coworkings' }); //* Redirige al usuario a la página de administración de coworkings
      })
      .catch((error) => {
        console.log('Login error:', error);
        errorMsg.value = errorCodes[error.code] || 'Error desconocido'; //* Asigna el mensaje de error basado en el código de error recibido
      });
  };

  //! Función para cerrar sesión
  const logout = () => {
    signOut(auth)
      .then(() => {
        authUser.value = null; //* Elimina la información del usuario autenticado
        router.push({ name: 'login' }); //* Redirige al usuario a la página de inicio de sesión
      })
      .catch(error => {
        console.log('Logout error:', error); //* Maneja cualquier error que ocurra durante el cierre de sesión
      });
  };

  //! Computed que devuelve true si hay un mensaje de error, lo que indica que ocurrió un problema
  const hasError = computed(() => {
    return errorMsg.value; //* Retorna el mensaje de error actual, si lo hay
  });

  //! Computed que devuelve true si hay un usuario autenticado
  const isAuth = computed(() => {
    return authUser.value !== null; //* Retorna true si authUser contiene información del usuario
  });


  return {
    login, 
    logout, 
    hasError,
    errorMsg, 
    isAuth 
  };
});
