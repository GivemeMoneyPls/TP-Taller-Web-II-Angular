import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { CarritoItem } from '../../interfaces/carrito.interface';
import { GenerosPipe } from '../../../../modules/juegos/pipes/generos-pipe';
@Component({
  selector: 'app-carrito',
  imports: [CommonModule, CurrencyPipe, GenerosPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {

  juegos: CarritoItem[] = [];
  mensaje: string | null = null;

  carritoService = inject(CarritoService);

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  
  obtenerCarrito(): void {
    const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');
    const usuarioId = usuario.id;

    this.carritoService.getCarrito(usuarioId).subscribe({
      next: (carrito) => {
        this.juegos = carrito;
        console.log('Carrito obtenido:', this.juegos);
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      },
      complete: () => {
        console.log('Carga del carrito completada.');
      }
    });
  }

 
}
