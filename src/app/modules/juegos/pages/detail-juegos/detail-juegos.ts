import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';

@Component({
  selector: 'app-detail-juegos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-juegos.html',
  styleUrls: ['./detail-juegos.css'],
})
export class DetailJuegos implements OnInit {
  juegoService = inject(JuegoService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  juego: Juego | null = null;
  juegosSimilares: Juego[] = [];
  loading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loading = true;
        this.juegoService.getJuegoById(id).subscribe({
          next: (data) => {
            this.juego = data;
            this.loading = false;
            const generos = data.juego_genero?.map(g => g.genero.nombre) || [];
            if (generos.length) {
              this.juegoService.getJuegosSimilares(generos, id).subscribe({
                next: (similares) => this.juegosSimilares = similares,
                error: (err) => console.error('Error juegos similares:', err)
              });
            } else {
              this.juegosSimilares = [];
            }
          },
          error: (err) => {
            console.error('Error al obtener el juego:', err);
            this.loading = false;
          }
        });
      }
    });
  }

  verDetalle(juegoId: number) {
    this.router.navigate(['/juego', juegoId]);
  }
}
