import { Component, inject } from '@angular/core';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { GenerosPipe } from '../../pipes/generos-pipe';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list-juegos',
  imports: [GenerosPipe, CurrencyPipe],
  templateUrl: './list-juegos.html',
  styleUrl: './list-juegos.css',
})
export class ListJuegos {

    juegos:Juego[] = [];

  juegoService = inject(JuegoService);

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

}
