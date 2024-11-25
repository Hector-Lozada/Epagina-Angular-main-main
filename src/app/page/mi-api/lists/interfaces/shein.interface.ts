export interface SheinReview {
  usuario: string;
  comentario: string;
  rating: number;
  fecha: Date;
}

export interface Shein {
  _id: string; // ID único generado por MongoDB
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagenes: string[]; // Arreglo de URLs de imágenes
  tallas: string[]; // Arreglo de tallas disponibles
  colores: string[]; // Arreglo de colores disponibles
  stock: number;
  calificacion: number; // Calificación promedio
  reseñas: SheinReview[]; // Arreglo de reseñas de los usuarios
}
