import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AmazonProduct } from '../interfaces/amazon.interface';  // Importa la interfaz AmazonProduct

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:3000/api/amazon'; // Asegúrate de que esta URL esté apuntando a la API correcta

  constructor(private http: HttpClient) { }

  // Obtener la lista de productos Amazon
  getFashions(): Observable<{ amazon: AmazonProduct[] }> {
    return this.http.get<{ amazon: AmazonProduct[] }>(this.apiUrl);
  }

  // Crear un nuevo producto Amazon
  createFashion(fashion: Omit<AmazonProduct, '_id'>): Observable<AmazonProduct> {
    return this.http.post<AmazonProduct>(this.apiUrl, fashion);
  }

  // Actualizar un producto Amazon existente
  updateFashion(id: string, fashion: Partial<AmazonProduct>): Observable<AmazonProduct> {
    return this.http.put<AmazonProduct>(`${this.apiUrl}/${id}`, fashion);
  }

  // Eliminar un producto Amazon por ID
  deleteFashion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
