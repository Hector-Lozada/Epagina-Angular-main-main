import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../services/amazon.service';  // Asegúrate de importar el servicio correcto
import { AmazonProduct } from '../interfaces/amazon.interface';  // Asegúrate de importar la interfaz correcta
import { FashionModalComponent } from '../modal/amazon-modal.component';

@Component({
  selector: 'app-amazon-table',
  standalone: true,
  imports: [CommonModule, FashionModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class AmazonTableComponent implements OnInit {
  fashions: AmazonProduct[] = []; // Actualizado a 'Amazon' en lugar de 'Shein'
  showModal = false;
  selectedFashion: AmazonProduct | null = null; // Actualizado a 'Amazon' en lugar de 'Shein'

  constructor(private fashionService: FashionService) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe(
      response => {
        console.log(response); // Verifica que los datos están siendo recibidos
        this.fashions = response.amazon; // Asegúrate de usar 'amazon' en lugar de 'shein'
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  openModal(fashion?: AmazonProduct): void { // Usa 'Amazon' aquí en lugar de 'Shein'
    this.selectedFashion = fashion || null;
    this.showModal = true;
    console.log('Modal abierto:', this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFashion = null;
  }

  onSave(fashion: AmazonProduct): void { // Usa 'Amazon' aquí en lugar de 'Shein'
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
