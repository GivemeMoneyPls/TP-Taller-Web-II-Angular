import { Component, inject } from '@angular/core';
import { Genero, Juego, JuegoDTO, Plataforma } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormJuego } from "../../components/form-juego/form-juego";
import { Spinner } from "../../../../shared/components/spinner/spinner";

@Component({
  selector: 'app-update-juegos',
  imports: [FormJuego, Spinner],
  templateUrl: './update-juegos.html',
  styleUrl: './update-juegos.css',
})
export class UpdateJuegos {

  router = inject(Router);

  spinner = true

  id: number = 0;

  juego!:Juego;

  juegoService = inject(JuegoService);

  activatedRouter = inject(ActivatedRoute);

   ngOnInit(){
    this.id = Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.obtenerJuego();
    }

    obtenerJuego(){
              this.juegoService.getJuegoById(this.id).subscribe({
            next: (juego) => {
                this.juego = juego;
                console.log('Juego obtenido:', this.juego);
            },
            error: (error) => {
                console.error('Error al obtener el juego:', error);
            },
            complete: () => {
              this.spinner = false;
        }
      });
    }

    updateJuego(juego: JuegoDTO){
      this.juegoService.updateJuego(juego).subscribe({
        next: (juegoActualizado) => {
            console.log('Juego actualizado:', juegoActualizado);
        },
        error: (error) => {
            this.router.navigate(['/gestionar-juegos'],
          { queryParams: { mensaje: error } });
        },
        complete: () => {
          this.router.navigate(['/gestionar-juegos'],
        { queryParams: { mensajeExito: 'Juego actualizado correctamente' } });
        }
      });
    }
}
