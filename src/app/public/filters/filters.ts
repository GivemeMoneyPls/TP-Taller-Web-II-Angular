import { Component, inject } from '@angular/core';
import { Genero, Plataforma } from '../../modules/juegos/interfaces/juego.interface';
import { FilterService } from '../../api/services/filter/filter.service';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.css',
})
export class Filters  {

  generos:Genero[] = [];
  plataformas:Plataforma[] = [];

  filterService = inject(FilterService)

ngOnInit(){
 this.crearFiltro();
}

crearFiltro(){
    this.filterService.getGeneros().subscribe(
      {
        next: (generos) => {
          this.generos = generos;
          console.log('Generos obtenidos:', this.generos);
        },
        error: (error) => {
            console.error('Error al obtener los generos:', error);
        },
        complete: () => {
            console.log('Solicitud de generos completada.');
        }
      }
    )

    this.filterService.getPlataformas().subscribe(
      {
        next: (plataformas) => {
          this.plataformas = plataformas;
          console.log('Plataformas obtenidas:', this.plataformas);
        },
        error: (error) => {
            console.error('Error al obtener las plataformas:', error);
        },
        complete: () => {
            console.log('Solicitud de plataformas completada.');
        }
      }
    )
}

}
