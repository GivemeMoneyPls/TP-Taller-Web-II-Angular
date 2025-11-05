import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';

@Component({
  selector: 'app-detail-juegos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-juegos.html',
  styleUrls: ['./detail-juegos.css'],
})
export class DetailJuegos implements OnInit {

  juegoService = inject(JuegoService);
  route = inject(ActivatedRoute);

  juego: Juego | null = null;
  loading = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.juegoService.getJuegoById(id).subscribe({
        next: (data) => {
          this.juego = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener el juego:', err);
          this.loading = false;
        }
      });
    }
  }
}
