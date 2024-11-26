import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Netflix } from '../interfaces/netflix.interface'; // Asegúrate de que la interfaz Netflix esté correctamente importada

@Component({
  selector: 'app-netflix-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './netflix-modal.component.html', // Cambia según el nombre de tu archivo de plantilla
  styleUrls: ['./netflix-modal.component.css'] // Cambia según el nombre de tu archivo CSS
})
export class NetflixModalComponent implements OnInit {
  @Input() netflixItem: Netflix | null = null;
  @Output() save = new EventEmitter<Netflix>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      genero: ['', Validators.required],
      duracion: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', Validators.required],
      imagenes: ['', Validators.required], // Campo de imágenes con validación
      estreno: ['', Validators.required],
      calificacion: ['', [Validators.min(0), Validators.max(5)]],
      reviews: [''] // Reviews como cadena de texto inicial
    });
  }

  ngOnInit(): void {
    if (this.netflixItem) {
      this.form.patchValue({
        ...this.netflixItem,
        imagenes: this.netflixItem.imagenes?.join('\n') || '', // Convertir las imágenes a una cadena
        reviews: this.netflixItem.reviews
          ?.map(review => `${review.usuario}, ${review.comentario}, ${review.rating}`)
          .join('\n') || ''
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const netflixItem: Netflix = {
        ...formValue,
        imagenes: formValue.imagenes.split('\n').filter((item: string) => item.trim()), // Separar imágenes por línea
        reviews: formValue.reviews.split('\n').map((linea: string) => {
          const [usuario, comentario, rating] = linea.split(',').map((item: string) => item.trim());
          return { usuario, comentario, rating: rating ? parseFloat(rating) : 0, fecha: new Date() };
        })
      };

      console.log('Datos enviados al servidor:', netflixItem);

      this.save.emit(netflixItem);
    } else {
      console.error('El formulario no es válido:', this.form.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
