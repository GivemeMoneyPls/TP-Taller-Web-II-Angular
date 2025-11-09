import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego, JuegoDTO } from '../../../modules/juegos/interfaces/juego.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  httpClient = inject(HttpClient);

  getJuegos(): Observable<Juego[]> {
    return this.httpClient.get<Juego[]>(`${environment.API_URL_GAME}`);
  }

  getJuegoById(id: number): Observable<Juego> {
    return this.httpClient.get<Juego>(`${environment.API_URL_GAME}${id}`);
  }

  getJuegosSimilares(generos: string[], idActual: number): Observable<Juego[]> {
    const generosParam = generos.join(',');
    return this.httpClient.get<Juego[]>(
      `${environment.API_URL_GAME}similares/${idActual}?generos=${generosParam}`
    );
}

  updateJuego(juego:JuegoDTO){
     return this.httpClient.put<Juego[]>(`${environment.API_URL_GAME}${juego.id}`, juego);
  }

}
