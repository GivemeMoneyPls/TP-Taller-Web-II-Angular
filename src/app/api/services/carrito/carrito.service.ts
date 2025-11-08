import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoItem, CarritoResponse } from '../../../modules/carrito/interfaces/carrito.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  httpClient = inject(HttpClient);

  agregarAlCarrito(juegoId: number, usuarioId: number): Observable<CarritoResponse> {
  return this.httpClient.post<CarritoResponse>(
    `${environment.API_URL_CARRITO}/agregar`,
    { juegoId, usuarioId }
  );
}
  getCarrito(usuarioId: number): Observable<CarritoItem[]> {
      return this.httpClient.get<CarritoItem[]>(
        `${environment.API_URL_CARRITO}/${usuarioId}`
      );
  }
  eliminarDelCarrito(juegoId: number, usuarioId: number): Observable<any> {
  return this.httpClient.post<any>(
    `${environment.API_URL_CARRITO}/eliminar`,
    { juegoId, usuarioId }
  );
  }
  vaciarCarrito(usuarioId: number): Observable<any> {
  return this.httpClient.delete<any>(
    `${environment.API_URL_CARRITO}/vaciar/${usuarioId}`
  );
}

}
