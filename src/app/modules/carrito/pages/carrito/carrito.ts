import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
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
  total: number = 0; 

  carritoService = inject(CarritoService);
  router = inject(Router);

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');

  
    if (!usuario.id) {
      this.router.navigate(['/signin']);
      return;
    }

    this.obtenerCarrito(usuario.id);
  }

  obtenerCarrito(usuarioId: number): void {
    this.carritoService.getCarrito(usuarioId).subscribe({
      next: (carrito) => {
        this.juegos = carrito;
        this.calcularTotal(); // 💰 Calcula total al cargar
        console.log('Carrito obtenido:', this.juegos);
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      },
      complete: () => {
        console.log('Carga del carrito completada.');
      },
    });
  }

 
  calcularTotal(): void {
    this.total = this.juegos.reduce((sum, item) => {
      const precio = Number(item.juego.precio) || 0;
      return sum + precio * item.cantidad;
    }, 0);
  }
}
