import { Component, OnInit } from '@angular/core';
import { Shein } from './interfaces/shein.interface'; // Asegúrate de importar la interfaz Shein
import { FashionService } from './services/shein.service';
import { FashionTableComponent } from "./Table/table.component";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [FashionTableComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  productos: Shein[] = []; // Cambiado de Fashion a Shein
  selectedProducto: Shein | null = null; // Cambiado de Fashion a Shein

  constructor(private fashionService: FashionService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.productos = data.shein; // Asegúrate de usar 'shein' en lugar de 'fashion' en la respuesta
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  agregarProducto(producto: Shein): void { // Cambiado de Fashion a Shein
    this.fashionService.createFashion(producto).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  editarProducto(producto: Shein): void { // Cambiado de Fashion a Shein
    this.selectedProducto = producto; // Mostrar en el modal
  }

  actualizarProducto(producto: Shein): void { // Cambiado de Fashion a Shein
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
