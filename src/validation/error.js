import { watch } from 'vue';

// Función para validar el formulario
export const validateForm = (fields, validationSchema) => {
  const formErrors = {};

  // Validamos cada campo basado en el esquema de validación
  for (const [key, value] of Object.entries(fields)) {
    const validationError = validationSchema[key](value);
    if (validationError !== true) {
      formErrors[key] = validationError;  // Guardar el error si existe
    }
  }

  // Devolver los errores
  return formErrors;
};

// Función para limpiar los errores cuando un campo cambia
export const watchField = (field, schema, errors) => {
  watch(field, (newVal) => {
    const validationResult = schema(newVal);
    if (validationResult === true) {
      delete errors.value[field.name];  // Eliminar el error si el campo es válido
    }
  });
};
