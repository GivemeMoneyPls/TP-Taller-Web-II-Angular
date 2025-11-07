import { Juego } from '../../juegos/interfaces/juego.interface';

export interface CarritoItem {
  usuario_id: number;
  juego_id: number;
  cantidad: number;
  juego: Juego;
}

export interface CarritoResponse {
  message: string;
  data: CarritoItem;
}
