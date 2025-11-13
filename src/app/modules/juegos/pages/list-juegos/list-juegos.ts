import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { GenerosPipe } from '../../pipes/generos-pipe';
import { CurrencyPipe } from '@angular/common';
import { JuegoFiltrosService } from '../../../../api/services/juego-filtros/juego-filtros.service';
import { Spinner } from "../../../../shared/components/spinner/spinner";

@Component({
  selector: 'app-list-juegos',
  imports: [CommonModule, GenerosPipe, CurrencyPipe, Spinner],
  templateUrl: './list-juegos.html',
  styleUrl: './list-juegos.css',
})
export class ListJuegos {


eliminarJuego(arg0: number) {
throw new Error('Method not implemented.');
}

  spinner = true;

  gestionar = input<Boolean>(false);

  juegos: Juego[] = [];
  mensajeExito: string | null = null;

  juegoService = inject(JuegoService);
  carritoService = inject(CarritoService);
  router = inject(Router);

  juegoFiltrosService = inject(JuegoFiltrosService);

  ngOnInit(): void {
    this.listJuegos();

    // 🔁 Cuando cambian los filtros, se actualiza la lista automáticamente
    this.juegoFiltrosService.juegos$.subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  listJuegos() {
    this.juegoService.getJuegos().subscribe({
      next: (juegos) => {
        this.juegos = juegos;
        console.log('Juegos obtenidos:', this.juegos);
      },
      error: (error) => {
        console.error('Error al obtener los juegos:', error);
      },
      complete: () => {
        console.log('Solicitud de juegos completada.');
        this.spinner = false;
      }
    });
  }

  agregarAlCarrito(juegoId: number) {
    const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');
    const usuarioId = usuario.id;

    this.carritoService.agregarAlCarrito(juegoId, usuarioId).subscribe({
      next: (response) => {
        this.mensajeExito = response.message;
        console.log('Juego agregado al carrito con éxito:', response);
        setTimeout(() => this.mensajeExito = null, 3000);
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    });
  }

  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }

  actualizarJuego(juegoId: number) {
    this.router.navigate(['/actualizar-juegos', juegoId]);
  }

}
