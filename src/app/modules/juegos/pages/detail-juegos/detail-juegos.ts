import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Juego } from '../../interfaces/juego.interface';
import { JuegoService } from '../../../../api/services/juego/juego.service';
import { CarritoService } from '../../../../api/services/carrito/carrito.service';
import { AuthService } from '../../../../api/services/auth/auth.service';

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
  carritoService = inject(CarritoService);
  authService = inject(AuthService);

  juego: Juego | null = null;
  juegosSimilares: Juego[] = [];
  loading = true;
  mensajeExito: string | null = null;

  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;

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

   scrollLeft() {
    if (this.carouselTrack)
      this.carouselTrack.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    if (this.carouselTrack)
      this.carouselTrack.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }


  agregarAlCarrito(juegoId: number) {
  const usuario = this.authService.getCurrentUser();

  if (usuario) {
    const usuarioId = usuario.id;

    this.carritoService.agregarAlCarrito(juegoId, usuarioId).subscribe({
      next: (response) => {
        this.mensajeExito = response.message;
        console.log('Juego agregado al carrito con éxito:', response);
        setTimeout(() => this.mensajeExito = null, 3000);
      },
      error: (error) => {
        console.error('Error al agregar al carrito:', error);
      }
    });
  } else {
    this.router.navigate(['/signin']);
  }
}

}
