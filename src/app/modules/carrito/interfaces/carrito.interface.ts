export interface CarritoItem {
    usuario_id: number;
    juego_id: number;
    cantidad: number;
}

export interface CarritoResponse {
  message: string;
  data: CarritoItem;
}