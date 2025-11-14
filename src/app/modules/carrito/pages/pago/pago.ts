import { Component, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../../../api/services/carrito/carrito.service'; 
import { AuthService } from '../../../../api/services/auth/auth.service';
import { PedidoService } from '../../../../api/services/pedido/pedido.service';



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
  authService = inject(AuthService);
  pedidoService = inject(PedidoService);
  ngZone = inject(NgZone);

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
    const usuario = this.authService.getCurrentUser();

    if (!usuario) {
      this.mensajeError = 'Debes iniciar sesión para finalizar la compra.';
      setTimeout(() => (this.mensajeError = null), 4000);
      this.router.navigate(['/signin']);
      return;
    }

    //Traemos los juegos del carrito
    this.carritoService.getCarrito(usuario.id).subscribe({
      next: (carritoItems: { juego: { id: number }; cantidad: number }[]) => {
        if (!carritoItems || carritoItems.length === 0) {
          this.mensajeError = '🛒 No tienes juegos en el carrito.';
          return;
        }

        // Mapear al formato que espera el backend
        const juegos = carritoItems.map(item => ({
          juegoId: item.juego.id,
          cantidad: item.cantidad
        }));

        //Crear pedido en backend
        this.pedidoService.createPedido(usuario.id, juegos).subscribe({
          next: (nuevoPedido: { total: number | string }) => {
            console.log('Pedido creado:', nuevoPedido);

            // Convertimos total a número por si viene como string
            const totalPedido = typeof nuevoPedido.total === 'number'
              ? nuevoPedido.total
              : parseFloat(nuevoPedido.total as string);

            //  Vaciar carrito
            this.carritoService.vaciarCarrito(usuario.id).subscribe({
              next: () => {
                localStorage.removeItem('carrito_total');
                this.total = 0;
                this.mensajeExito = `Compra confirmada. Total: ${totalPedido.toFixed(2)}.`;

                // Mostrar mensaje 3 segundos y redirigir
                setTimeout(() => {
                  this.mensajeExito = null;
                  this.router.navigate(['/mis-compras']);
                }, 3000);
              },
             
            });
          },
         
        });
      },
      
    });
  }
}
