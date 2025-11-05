import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero, Plataforma } from '../../../modules/juegos/interfaces/juego.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  httpClient = inject(HttpClient);

  getGeneros():Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(`${environment.API_URL_GENERO}`)
  }

  getPlataformas():Observable<Plataforma[]>{
    return this.httpClient.get<Plataforma[]>(`${environment.API_URL_PLATAFORMA}`)
  }
  
}
