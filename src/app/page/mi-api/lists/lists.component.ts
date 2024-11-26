import { Component, OnInit } from '@angular/core';
import { Netflix } from './interfaces/netflix.interface'; // Importa la interfaz Netflix
import { NetflixService } from './services/netflix.service'; // Asegúrate de usar el servicio correcto
import { NetflixTableComponent } from "./Table/table.component"; // Asumiendo que AmazonTableComponent es un componente reutilizable

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [NetflixTableComponent],  
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  netflixItems: Netflix[] = []; // Cambiado de 'productos' a 'netflixItems'
  selectedNetflixItem: Netflix | null = null; // Cambiado de 'selectedProducto' a 'selectedNetflixItem'

  constructor(private netflixService: NetflixService) { }

  ngOnInit(): void {
    this.loadNetflixItems();
  }

  loadNetflixItems(): void {
    this.netflixService.getNetflixItems().subscribe({
      next: (data) => {
        this.netflixItems = data.netflix; // Asegúrate de usar 'items' en la respuesta
      },
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  addNetflixItem(netflixItem: Netflix): void { // Cambiado de 'agregarProducto' a 'addNetflixItem'
    this.netflixService.createNetflixItem(netflixItem).subscribe({
      next: () => this.loadNetflixItems(),
      error: (err) => console.error('Error al agregar producto:', err)
    });
  }

  editNetflixItem(netflixItem: Netflix): void { // Cambiado de 'editarProducto' a 'editNetflixItem'
    this.selectedNetflixItem = netflixItem; // Mostrar en el modal
  }

  updateNetflixItem(netflixItem: Netflix): void { // Cambiado de 'actualizarProducto' a 'updateNetflixItem'
    if (netflixItem._id) {
      this.netflixService.updateNetflixItem(netflixItem._id, netflixItem).subscribe({
        next: () => {
          this.loadNetflixItems();
          this.selectedNetflixItem = null; // Cerrar el modal
        },
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    }
  }

  deleteNetflixItem(id: string): void { // Cambiado de 'eliminarProducto' a 'deleteNetflixItem'
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.netflixService.deleteNetflixItem(id).subscribe({
        next: () => this.loadNetflixItems(),
        error: (err) => console.error('Error al eliminar producto:', err)
      });
    }
  }
}
