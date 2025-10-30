import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego } from '../../../modules/juegos/interfaces/juego.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  httpClient = inject(HttpClient);

  getJuegos():Observable<Juego[]>{
    return this.httpClient.get<Juego[]>(`${environment.API_URL}`);
  }

}
