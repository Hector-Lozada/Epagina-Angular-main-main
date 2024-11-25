export type Reseña = {
    usuario: string; // Nombre del usuario que realiza la reseña
    comentario: string; // Comentario sobre el producto
    rating: number; // Puntuación otorgada al producto
    fecha: Date; // Fecha de la reseña
  };
  
  export type Fashion = {
    _id: string; // ID único del producto (opcional al crear, obligatorio al guardar en la base de datos)
    nombre: string; // Nombre del producto
    categoria: string; // Categoría a la que pertenece el producto
    precio: number; // Precio del producto
    descripcion: string; // Descripción detallada del producto
    imagenes: string[]; // Lista de URLs de imágenes del producto
    stock: number; // Cantidad disponible en inventario
    calificacion: number; // Calificación promedio del producto
    reseñas: Reseña[]; // Lista de reseñas del producto
  };  