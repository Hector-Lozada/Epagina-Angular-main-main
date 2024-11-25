import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../services/shein.service';
import { Shein } from '../interfaces/shein.interface'; // Asegúrate de importar la interfaz Shein
import { FashionModalComponent } from '../modal/shein-modal.component';

@Component({
  selector: 'app-shein-table',
  standalone: true,
  imports: [CommonModule, FashionModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class FashionTableComponent implements OnInit {
  fashions: Shein[] = []; // Actualiza el tipo de datos aquí para que coincida con Shein
  showModal = false;
  selectedFashion: Shein | null = null; // Actualiza el tipo aquí también

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe(
      response => {
        console.log(response); // Verifica que los datos están siendo recibidos
        this.fashions = response.shein; // Asegúrate de usar 'shein' en lugar de 'fashion'
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
  

  openModal(fashion?: Shein): void { // Usa 'Shein' aquí en lugar de 'Fashion'
    this.selectedFashion = fashion || null;
    this.showModal = true;
    console.log('Modal abierto:', this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFashion = null;
  }

  onSave(fashion: Shein): void { // Usa 'Shein' aquí en lugar de 'Fashion'
    if (fashion._id) {
      this.fashionService.updateFashion(fashion._id, fashion).subscribe(
        () => {
          this.loadFashions();
          this.closeModal();
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    } else {
      this.fashionService.createFashion(fashion).subscribe(
        () => {
          this.loadFashions();
          this.closeModal();
        },
        error => {
          console.error('Error al crear el producto:', error);
        }
      );
    }
  }

  deleteFashion(id: string): void {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      this.fashionService.deleteFashion(id).subscribe(
        () => {
          this.loadFashions();
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    }
  }
}
