import { ref } from "vue";
import { getDownloadURL, uploadBytesResumable, ref as storageRef, deleteObject } from "firebase/storage";
import { useFirebaseStorage } from "vuefire";
import { uid } from "uid";

export default function useImage() {
  const storage = useFirebaseStorage();
  const uploadedUrls = ref([]); // Almacena las URLs de las imágenes subidas
  const uploadedFiles = ref([]); // Almacena las referencias de los archivos subidos

  const uploadImages = async (files) => {
    uploadedUrls.value = [];
    uploadedFiles.value = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uniqueId = uid(); // Generar un UID único para el archivo
      const fileName = `${uniqueId}_${file.name}`;
      const storageRefPath = storageRef(storage, `/coworkings/${fileName}`); // Crear referencia única

      try {
        console.log(`Subiendo archivo: ${fileName}`);

        // Usamos `uploadBytesResumable` para manejar la subida y obtener el progreso
        const uploadTask = uploadBytesResumable(storageRefPath, file);

        // Esperamos a que la subida finalice
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null, // Progreso opcional, lo podemos dejar vacío
            (error) => reject(error), // Error en la subida
            () => resolve() // Subida completada
          );
        });

        // Obtener la URL de descarga
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

        if (downloadUrl) {
          uploadedUrls.value.push(downloadUrl); // Almacenar la URL si está disponible
          uploadedFiles.value.push(`/coworkings/${fileName}`); // Almacenar la referencia al archivo
          console.log(`Archivo subido correctamente: ${downloadUrl}`);
        } else {
          console.error(`Error: no se pudo obtener la URL de descarga para el archivo: ${fileName}`);
          uploadedUrls.value.push(null); // Marcar como null si no se pudo obtener la URL
          uploadedFiles.value.push(null); // Marcar como null si no se pudo obtener la referencia
        }
      } catch (error) {
        console.error(`Error al subir el archivo: ${fileName}`, error);
        uploadedUrls.value.push(null); // Marcar como null si ocurre un error
        uploadedFiles.value.push(null); // Marcar como null si ocurre un error
      }
    }
  };

  const removeImage = async (index) => {
    const removedFilePath = uploadedFiles.value[index]; // Obtener la referencia al archivo
    if (removedFilePath) {
      const storageRefPath = storageRef(storage, removedFilePath);

      try {
        // Eliminar la imagen de Firebase Storage
        await deleteObject(storageRefPath);
        console.log(`Archivo eliminado de Firebase Storage: ${removedFilePath}`);
      } catch (error) {
        console.error(`Error al eliminar el archivo: ${removedFilePath}`, error);
      }

      // Remover la URL y la referencia del archivo de los arrays
      uploadedUrls.value.splice(index, 1);
      uploadedFiles.value.splice(index, 1);
    }
  };

  return {
    uploadImages,
    removeImage,
    uploadedUrls,
    uploadedFiles
  };
}
