import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Netflix } from '../interfaces/netflix.interface'; // Importa la interfaz NetflixItem

@Injectable({
  providedIn: 'root'
})
export class NetflixService {
  private apiUrl = 'http://localhost:3000/api/netflix'; // URL actualizada para apuntar a la API de Netflix

  constructor(private http: HttpClient) {}

  // Obtener la lista de elementos Netflix
  getNetflixItems(): Observable<{ netflix: Netflix[] }> {
    return this.http.get<{ netflix: Netflix[] }>(this.apiUrl);
  }

  // Crear un nuevo elemento Netflix
  createNetflixItem(item: Omit<Netflix, '_id'>): Observable<Netflix> {
    return this.http.post<Netflix>(this.apiUrl, item);
  }

  // Actualizar un elemento Netflix existente
  updateNetflixItem(id: string, item: Partial<Netflix>): Observable<Netflix> {
    return this.http.put<Netflix>(`${this.apiUrl}/${id}`, item);
  }

  // Eliminar un elemento Netflix por ID
  deleteNetflixItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
