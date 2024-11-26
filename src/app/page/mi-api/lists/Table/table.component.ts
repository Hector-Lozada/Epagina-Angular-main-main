import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetflixService } from '../services/netflix.service'; // Servicio actualizado a 'NetflixService'
import { Netflix } from '../interfaces/netflix.interface'; // Interfaz actualizada a 'NetflixItem'
import { NetflixModalComponent } from '../modal/netflix-modal.component'; // Componente modal actualizado

@Component({
  selector: 'app-netflix-table',
  standalone: true,
  imports: [CommonModule, NetflixModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class NetflixTableComponent implements OnInit {
  netflixItems: Netflix[] = []; // Arreglo actualizado a 'NetflixItem'
  showModal = false;
  selectedNetflixItem: Netflix | null = null; // Elemento seleccionado actualizado a 'NetflixItem'

  constructor(private netflixService: NetflixService) {}

  ngOnInit(): void {
    this.loadNetflixItems();
  }

  loadNetflixItems(): void {
    this.netflixService.getNetflixItems().subscribe(
      response => {
        console.log(response); // Verifica que los datos están siendo recibidos correctamente
        this.netflixItems = response.netflix; // Asegúrate de que 'netflix' es la propiedad correcta
      },
      error => {
        console.error('Error al cargar los elementos:', error);
      }
    );
  }
  

  openModal(netflixItem?: Netflix): void {
    this.selectedNetflixItem = netflixItem || null;
    this.showModal = true;
    console.log('Modal abierto:', this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedNetflixItem = null;
  }

  onSave(netflixItem: Netflix): void {
    if (netflixItem._id) {
      this.netflixService.updateNetflixItem(netflixItem._id, netflixItem).subscribe(
        () => {
          this.loadNetflixItems();
          this.closeModal();
        },
        error => {
          console.error('Error al actualizar el elemento:', error);
        }
      );
    } else {
      this.netflixService.createNetflixItem(netflixItem).subscribe(
        () => {
          this.loadNetflixItems();
          this.closeModal();
        },
        error => {
          console.error('Error al crear el elemento:', error);
        }
      );
    }
  }

  deleteNetflixItem(id: string): void {
    if (confirm('¿Está seguro de eliminar este elemento?')) {
      this.netflixService.deleteNetflixItem(id).subscribe(
        () => {
          this.loadNetflixItems();
        },
        error => {
          console.error('Error al eliminar el elemento:', error);
        }
      );
    }
  }
}
