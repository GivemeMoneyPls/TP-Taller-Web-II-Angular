import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Juego } from '../../../modules/juegos/interfaces/juego.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegoFiltrosService {
  private juegosSubject = new BehaviorSubject<Juego[]>([]);
  public juegos$ = this.juegosSubject.asObservable();

  actualizarJuegos(juegos: Juego[]) {
    this.juegosSubject.next(juegos);
  }
}
