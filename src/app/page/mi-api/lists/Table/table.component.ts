import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FashionService } from '../services/fashion.service';
import { Fashion } from '../interfaces/fashion.interface';
import { FashionModalComponent } from '../modal/fashion-modal.component';

@Component({
  selector: 'app-fashion-table',
  standalone: true,
  imports: [CommonModule, FashionModalComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class FashionTableComponent implements OnInit {
  fashions: Fashion[] = [];
  showModal = false;
  selectedFashion: Fashion | null = null;

  constructor(private fashionService: FashionService) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getFashions().subscribe(
      response => {
        console.log(response); // Verifica que los datos están siendo recibidos
        this.fashions = response.fashion;
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
  

  openModal(fashion?: Fashion): void {
    this.selectedFashion = fashion || null;
    this.showModal = true;
    console.log('Modal abierto:', this.showModal);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedFashion = null;
  }

  onSave(fashion: Fashion): void {
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
