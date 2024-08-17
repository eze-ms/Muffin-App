import { computed } from "vue"
import { ref as storageRef } from "firebase/storage"
import { useFirebaseStorage, useStorageFile } from "vuefire"
import { uid } from "uid"

export default function useImage() {
  const storage = useFirebaseStorage(); // Identificamos el servicio de almacenamiento de Firebase
  const storageRefPath = storageRef(storage, `/coworkings/${uid()}.jpg`); // Creamos una referencia única para cada archivo

  const { url, upload } = useStorageFile(storageRefPath); // Obtenemos las funciones para subir el archivo y la URL del archivo subido

  function uploadImage(e) {
    const data = e.target.files[0]; // Obtiene el primer archivo seleccionado en el input

    if (data) {
      // Si hay un archivo seleccionado, llamamos a la función `upload`
      // `upload` es proporcionada por `useStorageFile` y se encarga de subir el archivo a Firebase Storage
      upload(data); // Si hay un archivo, lo sube a Firebase Storage
    } 
  }

  const image = computed (() => {
    return url.value ? url.value : null
  })

  return {
    url,
    uploadImage,
    image
  };
}
