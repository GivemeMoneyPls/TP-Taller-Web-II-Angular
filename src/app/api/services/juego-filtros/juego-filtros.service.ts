import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Juego } from '../../../modules/juegos/interfaces/juego.interface';

@Injectable({
  providedIn: 'root'
})
export class JuegoFiltrosService {
  private juegosSubject = new BehaviorSubject<Juego[] | null>([]);
  public juegos$ = this.juegosSubject.asObservable();

  actualizarJuegos(juegos: Juego[] | null) {
    this.juegosSubject.next(juegos);
  }

  get juegosActuales(): Juego[] {
    return this.juegosSubject.value ?? [];
  }

  limpiarFiltros() {
    this.juegosSubject.next(null);
  }

  get hayFiltrosActivos(): boolean {
    const v = this.juegosSubject.value;
    return !!v && v.length > 0;
  }
}
