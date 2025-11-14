import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Pedido } from '../../../modules/mis-compras/interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
 
  private httpClient = inject(HttpClient);

  private apiUrlBase = environment.API_URL_CARRITO.replace('/carrito', '');

  getMisPedidos(usuarioId: number): Observable<Pedido[]> {
    const url = `${this.apiUrlBase}/pedidos/usuario/${usuarioId}`;
    return this.httpClient.get<Pedido[]>(url);
  }

  createPedido(usuarioId: number, juegos: { juegoId: number; cantidad: number }[]): Observable<Pedido> {
  const url = `${this.apiUrlBase}/pedidos/finalizar`;
  return this.httpClient.post<Pedido>(url, { usuarioId, juegos });
 }
}