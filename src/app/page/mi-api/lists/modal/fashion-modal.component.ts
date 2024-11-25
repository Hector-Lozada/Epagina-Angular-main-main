import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fashion } from '../interfaces/fashion.interface'; // Asegúrate de que la interfaz esté importada correctamente

@Component({
  selector: 'app-fashion-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fashion-modal.component.html',
  styleUrls: ['./fashion-modal.component.css']
})
export class FashionModalComponent implements OnInit {
  @Input() fashion: Fashion | null = null;
  @Output() save = new EventEmitter<Fashion>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      imagenes: [''], // Campo de imágenes vacío por defecto.
      calificacion: ['', [Validators.min(0), Validators.max(5)]],
      reseñas: [''] // Reseñas como cadena de texto inicial.
    });
  }

  ngOnInit(): void {
    if (this.fashion) {
      this.form.patchValue({
        ...this.fashion,
        imagenes: this.fashion.imagenes?.join('\n') || '',
        reseñas: this.fashion.reseñas
          ?.map(res => `${res.usuario}, ${res.comentario}, ${res.rating}`)
          .join('\n') || ''
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const fashion: Fashion = {
        ...formValue,
        _id: this.fashion?._id,
        imagenes: formValue.imagenes.split('\n').filter((item: string) => item.trim()),
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
