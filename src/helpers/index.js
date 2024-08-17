// Computed property para calcular algo basado en el precio.
  export const coworkingPrice = (price) => 
      Number(price).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
      })
