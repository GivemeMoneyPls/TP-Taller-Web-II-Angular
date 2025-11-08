import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { GenerosPipe } from '../../pipes/generos-pipe';
import { CurrencyPipe } from '@angular/common';
import { JuegoFiltrosService } from '../../../../api/services/juego-filtros/juego-filtros.service';

@Component({
  selector: 'app-list-juegos',
  imports: [CommonModule, GenerosPipe, CurrencyPipe],
  templateUrl: './list-juegos.html',
  styleUrl: './list-juegos.css',
})
export class ListJuegos {

  juegos:Juego[] = [];

  juegoService = inject(JuegoService);
  carritoService = inject(CarritoService);
  juegoFiltrosService = inject(JuegoFiltrosService);

  ngOnInit(): void {
    this.listJuegos();

    // 🔁 Cuando cambian los filtros, se actualiza la lista automáticamente
    this.juegoFiltrosService.juegos$.subscribe(juegos => {
      this.juegos = juegos;
    });
  }

  listJuegos(){
    this.juegoService.getJuegos().subscribe({
      next: (juegos) => {
        this.juegos = juegos;
        console.log('Juegos obtenidos:', this.juegos);
      },
      error: (error) => {
        console.error('Error al obtener los juegos:', error);
      }
    });
  }

  agregarAlCarrito(juegoId: number) {
    const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');
    const usuarioId = usuario.id;

    this.carritoService.agregarAlCarrito(juegoId, usuarioId).subscribe({
      next: (response) => {
        console.log('Juego agregado al carrito con exito:', response);
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    });
  }
}
