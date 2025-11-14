import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { GenerosPipe } from '../../pipes/generos-pipe';
import { CurrencyPipe } from '@angular/common';
import { JuegoFiltrosService } from '../../../../api/services/juego-filtros/juego-filtros.service';
import { Spinner } from "../../../../shared/components/spinner/spinner";
import { AuthService } from '../../../../api/services/auth/auth.service';
import { SearchService } from '../../../../api/services/search/search.service';

@Component({
  selector: 'app-list-juegos',
  imports: [CommonModule, GenerosPipe, CurrencyPipe, Spinner],
  templateUrl: './list-juegos.html',
  styleUrl: './list-juegos.css',
})
export class ListJuegos {


  spinner = true;

  gestionar = input<Boolean>(false);

  juegos: Juego[] = [];
  todosLosJuegos: Juego[] = []; //copia
  mensajeExito: string | null = null;

  juegoService = inject(JuegoService);
  carritoService = inject(CarritoService);
  router = inject(Router);
  authService = inject(AuthService);

  route = inject(ActivatedRoute);
  juegoFiltrosService = inject(JuegoFiltrosService);
  searchService = inject(SearchService);

  ngOnInit(): void {
    this.listJuegos();

    // 🔁 Cuando cambian los filtros, se actualiza la lista automáticamente
    this.juegoFiltrosService.juegos$.subscribe(juegos => {
      this.juegos = juegos;
    });

    this.searchService.searchTerm$.subscribe(term => {
      this.filtrarPorTermino(term);
    });

     this.route.queryParams.subscribe(params => {
      const term = params['q'] || '';
      if (term) this.filtrarPorTermino(term);
    });
  }

  listJuegos() {
    this.juegoService.getJuegos().subscribe({
      next: (juegos) => {
        this.juegos = juegos;
        this.todosLosJuegos = juegos;
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


  filtrarPorTermino(term: string) {
    const base = this.juegoFiltrosService.juegosActuales.length > 0
    ? this.juegoFiltrosService.juegosActuales
    : this.todosLosJuegos;

    if (!term.trim()) {
      this.juegos = base;
      return;
    }
    this.juegos = base.filter((j: any) =>
      j.titulo.toLowerCase().includes(term.toLowerCase())
   );
  }


  agregarAlCarrito(juegoId: number) {
    const usuario = this.authService.getCurrentUser();
    if (usuario) {
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
    } else {
      console.error('Usuario no autenticado');
      this.router.navigate(['/signin']);
    }
  }

  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }

  actualizarJuego(juegoId: number) {
    this.router.navigate(['/actualizar-juegos', juegoId]);
  }

  crearJuego() {
    this.router.navigate(['/crear-juegos']);
  }


  eliminarJuego(id: number) {
  if (!confirm("¿Deseas eliminar este juego?")) return;

  this.juegoService.deleteJuego(id).subscribe({
    next: (res: any) => {
      this.mensajeExito = res.message || "Juego eliminado correctamente";
      this.listJuegos();
      setTimeout(() => this.mensajeExito = null, 3000);
    },
    error: (err) => {
      console.error("Error al eliminar:", err);
    }
  });
}

}
