import { Component, inject } from '@angular/core';
import { CommonModule} from '@angular/common'; 
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { GenerosPipe } from '../../pipes/generos-pipe';
import { CurrencyPipe } from '@angular/common';

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
  ngOnInit(): void {
    this.listJuegos();
  }

  listJuegos(){
    this.juegoService.getJuegos().subscribe(
      {
        next: (juegos) => {
          this.juegos = juegos;
          console.log('Juegos obtenidos:', this.juegos);
        },
        error: (error) => {
          console.error('Error al obtener los juegos:', error);
      },
      complete: () => {
        console.log('Solicitud de juegos completada.');
      }
  })
}
 
mensajeExito: string | null = null;

agregarAlCarrito(juegoId: number) {
  const usuario = JSON.parse(localStorage.getItem('app_user') || '{}');
  const usuarioId = usuario.id;

  this.carritoService.agregarAlCarrito(juegoId, usuarioId).subscribe({
    next: (response) => {
      this.mensajeExito = response.message; 
      console.log('Juego agregado al carrito con exito:', response);

      setTimeout(() => this.mensajeExito = null, 3000); 
    },
    error: (error) => {
      console.error('Error al agregar al carrito:', error);
    }
  });
}



}
