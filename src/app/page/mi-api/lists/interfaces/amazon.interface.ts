export interface Review {  // Cambié Reseña a Review
  usuario: string;
  comentario: string;
  rating: number;
  fecha: Date;
}

export interface AmazonProduct {
  _id?: string;  // El _id es opcional ya que puede ser asignado automáticamente por MongoDB
  nombre: string;
  categoria: string;
  precio: number;
  descripcion: string;
  imagenes: string[];  // Arreglo de URLs de imágenes
  stock: number;
  calificacion: number;
  reviews: Review[];
}  // Camb
