import { ref } from 'vue'

export default function useLocationMap() {

  const zoom = ref(15)
  const center = ref([41.3870154, 2.1700471])

  function pin(e) {
    const marker = e.target.getLatLng()
    center.value = [marker.lat, marker.lng]    
  }
  
  return {
    zoom,
    center,
    pin
  }
}