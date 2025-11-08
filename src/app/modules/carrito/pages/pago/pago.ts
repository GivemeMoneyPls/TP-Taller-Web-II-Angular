import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../../api/services/carrito/carrito.service'; 

@Component({
  selector: 'app-pago',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago {
  total: number = 0;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  router = inject(Router);
  carritoService = inject(CarritoService);

  ngOnInit(): void {
    const totalGuardado = localStorage.getItem('carrito_total');
    this.total = totalGuardado ? parseFloat(totalGuardado) : 0;

    if (this.total <= 0) {
      this.mensajeError = '🛒 No tienes juegos en el carrito.';
      setTimeout(() => (this.mensajeError = null), 3000);
      this.router.navigate(['/carrito']);
      return;
    }
  }

  finalizarCompra() {
    const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');

    if (!usuario.id) {
      this.mensajeError = 'Debes iniciar sesión para finalizar la compra.';
      setTimeout(() => (this.mensajeError = null), 4000);
      this.router.navigate(['/signin']);
      return;
    }

    const pedido = {
      usuarioId: usuario.id,
      total: this.total,
      fecha: new Date().toISOString(),
    };

    console.log('Pedido creado:', pedido);

    this.carritoService.vaciarCarrito(usuario.id).subscribe({
      next: () => {
        localStorage.removeItem('carrito_total');
        this.total = 0;
        this.mensajeExito = `Compra confirmada por ${usuario.nombre}. Total: ${pedido.total.toFixed(2)}.`;

        setTimeout(() => {
          this.mensajeExito = null;
          this.router.navigate(['/mis-compras']);
        }, 3000);
      },
      error: () => {
        this.mensajeError = 'Error al vaciar el carrito.';
        setTimeout(() => (this.mensajeError = null), 4000);
      }
    });
  }
}
