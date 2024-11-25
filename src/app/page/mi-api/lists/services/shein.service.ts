import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shein } from '../interfaces/shein.interface'; // Asegúrate de que la interfaz Shein esté importada correctamente

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:3000/api/shein'; // URL base de la API para Shein

  constructor(private http: HttpClient) {}

  // Obtener la lista de productos Shein
  getFashions(): Observable<{ shein: Shein[] }> {
    return this.http.get<{ shein: Shein[] }>(this.apiUrl);
  }  

  // Crear un nuevo producto Shein
  createFashion(fashion: Omit<Shein, '_id'>): Observable<Shein> {
    return this.http.post<Shein>(this.apiUrl, fashion);
  }

  // Actualizar un producto Shein existente
  updateFashion(id: string, fashion: Partial<Shein>): Observable<Shein> {
    return this.http.put<Shein>(`${this.apiUrl}/${id}`, fashion);
  }

  // Eliminar un producto Shein por ID
  deleteFashion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
