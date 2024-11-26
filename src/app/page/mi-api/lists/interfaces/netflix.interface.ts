export interface Review {
  usuario: string;       // Nombre del usuario que deja la review.
  comentario: string;    // Comentario de la review.
  rating: number;        // Valoración de 1 a 5.
  fecha?: Date;          // Fecha de la review (opcional, con valor predeterminado a Date.now).
}

export interface Netflix {
  _id: string;
  titulo: string;        // Título del contenido.
  genero: string;        // Género del contenido.
  duracion: number;      // Duración en minutos (para películas o episodios).
  descripcion: string;   // Descripción del contenido.
  imagenes: string[];    // Lista de enlaces a las imágenes promocionales.
  estreno: Date;         // Fecha de estreno.
  calificacion?: number; // Calificación promedio (opcional, predeterminado a 0).
  reviews?: Review[];    // Lista de reviews (opcional, predeterminado a [] en el esquema).
}
