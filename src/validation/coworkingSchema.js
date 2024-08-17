export const validationSchema = {
  titulo(value) {
    if (value?.length >= 6) return true;
    return 'El título del coworking es obligatorio o muy corto';
  },
  precio(value) {
    if (/^[0-9]+$/.test(value)) return true;
    return 'El precio solo debe contener números';
  },
  direccion(value) {
    if (value?.length >= 6) return true;
    return 'La dirección no puede ir vacía';
  },
  barrio(value) {
    if (value?.length >= 3) return true;
    return 'El barrio no puede ir vacío o es muy corto';
  },
  provincia(value) {
    if (value?.length >= 3) return true;
    return 'La provincia no puede ir vacía o es muy corta';
  },
  cantidadPersonas(value) {
    if (value) return true;
    return 'Selecciona una cantidad de personas';
  },
  tipoEspacio(value) {
    if (value) return true;
    return 'Selecciona un tipo de espacio';
  },
  servicios(value) {
    if (value?.length > 0) return true;
    return 'Selecciona al menos un servicio';
  },
  disponibilidad(value) {
    if (value?.length > 0) return true;
    return 'Selecciona al menos una opción de disponibilidad';
  },
  descripcion(value) {
    if (value) return true;
    return 'Agrega una descripción';
  }
};

export const imageSchema = {
  imagen(value) {
    if (value) return true;
    return 'La imagen es obligatoria';
  }
};
