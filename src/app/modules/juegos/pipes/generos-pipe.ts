import { Pipe, PipeTransform } from '@angular/core';
import { JuegoGenero } from '../interfaces/juego.interface';

@Pipe({
  name: 'generosPipe'
})
export class GenerosPipe implements PipeTransform {

  transform(juegoGenero: JuegoGenero[] | null | undefined): string {
    if (!juegoGenero || juegoGenero.length === 0) {
      return 'Sin género';
    }

    return juegoGenero
      .map(jg => jg.genero?.nombre ?? '')
      .filter(Boolean)
      .join(', ');
  }

}
