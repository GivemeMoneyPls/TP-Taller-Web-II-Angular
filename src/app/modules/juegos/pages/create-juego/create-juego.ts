import { Component, inject } from '@angular/core';
import { FormJuego } from "../../components/form-juego/form-juego";
import { JuegoDTO } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-juego',
  imports: [FormJuego],
  templateUrl: './create-juego.html',
  styleUrl: './create-juego.css',
})
export class CreateJuego {

  juegoService = inject(JuegoService);

  router = inject(Router);

createJuego(juego: JuegoDTO){
      this.juegoService.createJuego(juego).subscribe({
        next: (juegoCreado) => {
            console.log('Juego actualizado:', juegoCreado);
        },
        error: (error) => {
          this.router.navigate(['/gestionar-juegos'],
        { queryParams: { mensaje: error } });
        },
        complete: () => {
          this.router.navigate(['/gestionar-juegos'],
        { queryParams: { mensaje: 'Juego creado correctamente' } });
        }
      });
    }

}
