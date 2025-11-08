import { HttpClient, HttpParams } from '@angular/common/http';
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

  getJuegosFiltrados(filtros: any): Observable<any[]> {
  let params = new HttpParams();

  if (filtros.precioMin !== undefined) {
    params = params.append('precioMin', filtros.precioMin.toString());
  }

  if (filtros.precioMax !== undefined) {
    params = params.append('precioMax', filtros.precioMax.toString());
  }

  if (filtros.plataformaId !== undefined) {
    params = params.append('plataformaId', filtros.plataformaId.toString());
  }

  if (filtros.generoIds && filtros.generoIds.length > 0) {
    filtros.generoIds.forEach((id: number) => {
      params = params.append('generoIds', id.toString());
    });
  }

  return this.httpClient.get<any[]>(`${environment.API_URL_GAME}`, { params });
}
  
}
