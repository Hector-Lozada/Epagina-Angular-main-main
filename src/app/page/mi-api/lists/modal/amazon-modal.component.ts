import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmazonProduct } from '../interfaces/amazon.interface'; // Asegúrate de que la interfaz AmazonProduct esté importada correctamente

@Component({
  selector: 'app-fashion-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './amazon-modal.component.html', // Asegúrate de que el nombre de la plantilla coincida
  styleUrls: ['./amazon-modal.component.css']
})
export class FashionModalComponent implements OnInit {
  @Input() fashion: AmazonProduct | null = null;
  @Output() save = new EventEmitter<AmazonProduct>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      imagenes: ['', Validators.required], // Campo de imágenes con validación
      calificacion: ['', [Validators.min(0), Validators.max(5)]],
      reseñas: [''] // Reseñas como cadena de texto inicial
    });
  }

  ngOnInit(): void {
    if (this.fashion) {
      this.form.patchValue({
        ...this.fashion,
        imagenes: this.fashion.imagenes?.join('\n') || '', // Convertir las imágenes a una cadena
        reseñas: this.fashion.reviews
          ?.map(res => `${res.usuario}, ${res.comentario}, ${res.rating}`)
          .join('\n') || ''
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const fashion: AmazonProduct = {
        ...formValue,
        _id: this.fashion?._id,
        imagenes: formValue.imagenes.split('\n').filter((item: string) => item.trim()), // Separar imágenes por línea
        reseñas: formValue.reseñas.split('\n').map((linea: string) => {
          const [usuario, comentario, rating] = linea.split(',').map((item: string) => item.trim());
          return { usuario, comentario, rating: rating ? parseFloat(rating) : 0 };
        })
      };

      console.log('Datos enviados al servidor:', fashion);

      this.save.emit(fashion);
    } else {
      console.error('El formulario no es válido:', this.form.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
