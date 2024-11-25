// src/app/page/mi-api/lists/lists.component.ts
import { Component, OnInit } from '@angular/core';
import { Fashion } from './interfaces/fashion.interface';
import { FashionService } from './services/fashion.service';
import { FashionTableComponent } from "./Table/table.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [FashionTableComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  productos: Fashion[] = [];
  selectedProducto: Fashion | null = null; // Para el modal

  constructor(private fashionService: FashionService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.productos = data.fashion; // Ajustar según el formato de la respuesta
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  agregarProducto(producto: Fashion): void {
    this.fashionService.createFashion(producto).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  editarProducto(producto: Fashion): void {
    this.selectedProducto = producto; // Mostrar en el modal
  }

  actualizarProducto(producto: Fashion): void {
    if (producto._id) {
      this.fashionService.updateFashion(producto._id, producto).subscribe({
        next: () => {
          this.cargarProductos();
          this.selectedProducto = null; // Cerrar el modal
        },
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    }
  }

  eliminarProducto(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.fashionService.deleteFashion(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }
}
