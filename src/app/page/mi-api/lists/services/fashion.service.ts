import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from '../interfaces/fashion.interface';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:3000/api/fashion'; // URL base de la API para Fashion

  constructor(private http: HttpClient) {}

  // Obtener la lista de productos Fashion
  getFashions(): Observable<{ fashion: Fashion[] }> {
    return this.http.get<{ fashion: Fashion[] }>(this.apiUrl);
  }  

  // Crear un nuevo producto Fashion
  createFashion(fashion: Omit<Fashion, '_id'>): Observable<Fashion> {
    return this.http.post<Fashion>(this.apiUrl, fashion);
  }

  // Actualizar un producto Fashion existente
  updateFashion(id: string, fashion: Partial<Fashion>): Observable<Fashion> {
    return this.http.put<Fashion>(`${this.apiUrl}/${id}`, fashion);
  }

  // Eliminar un producto Fashion por ID
  deleteFashion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
