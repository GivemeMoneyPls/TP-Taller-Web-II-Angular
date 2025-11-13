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

