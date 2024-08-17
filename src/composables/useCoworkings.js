import { ref, computed } from "vue"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"

export default function useCoworkings() {
  const provincia = ref("") // Estado reactivo para almacenar la provincia seleccionada en el filtro
  const storage = useFirebaseStorage() // Referencia al servicio de almacenamiento de Firebase
  const db = useFirestore() // Referencia a Firestore

  // Carga de todos los coworkings desde la colección "coworkings" en Firestore
  const coworkingsCollection = useCollection(collection(db, "coworkings"))

  /**
   * Función para eliminar un coworking específico y su imagen asociada
   * @param {string} id - ID del coworking a eliminar
   * @param {string} urlImage - URL de la imagen a eliminar del almacenamiento
   */
  async function deleteItem(id, urlImage) {
    if(confirm('¿Deseas eliminar este coworking?')) {
      // Referencia al documento en Firestore
      const docRef = doc(db, 'coworkings', id)
      // Referencia al objeto de la imagen en el almacenamiento de Firebase
      const imageRef = storageRef(storage, urlImage)

      // Elimina el documento y la imagen asociada de forma simultánea
      await Promise.all([
        deleteDoc(docRef),
        deleteObject(imageRef)
      ])  
    }   
  }

  // Computed property que filtra los coworkings según la provincia seleccionada
  const filteredItems = computed(() => {
    // Si hay una provincia seleccionada, realiza el filtrado
    if (provincia.value) {
      return coworkingsCollection.value?.filter((coworking) =>
        coworking.provincia?.toLowerCase().includes(provincia.value.toLowerCase())
      )
    }
    // Si no hay una provincia seleccionada, retorna todos los coworkings
    return coworkingsCollection.value;
  })

  return {
    provincia,  
    coworkingsCollection,  
    filteredItems, 
    deleteItem 
  }
}
