import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


export interface PedidoItem {
  cantidad: number;
  precio_unitario: number;
  juego: {
    id: number;
    titulo: string;
    imagen_url: string; 
  };
}

export interface Pedido {
  id: number;
  usuario_id: number;
  fecha: string;
  total: number;
  pedido_juego: PedidoItem[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService { 

  private httpClient = inject(HttpClient);
  
private apiUrlBase = `${environment.API_URL_CARRITO}`;

 getMisPedidos(usuarioId: number): Observable<Pedido[]> {
  
   
    const baseApiUrlSinCarrito = this.apiUrlBase.replace('/carrito', '');
    
   
    return this.httpClient.get<Pedido[]>(`${baseApiUrlSinCarrito}/pedidos/usuario/${usuarioId}`);
  }
}