import { Component, inject } from '@angular/core';
import { Filters } from "../../../../public/filters/filters";
import { ListJuegos } from "../list-juegos/list-juegos";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gestionar-juegos',
  imports: [Filters, ListJuegos],
  templateUrl: './gestionar-juegos.html',
  styleUrl: './gestionar-juegos.css',
})
export class GestionarJuegos {

  gestionar:Boolean = true;

  mensaje: string | null = null;

  activatedRouter = inject(ActivatedRoute);

  ngOnInit(): void {
    this.mensaje = this.activatedRouter.snapshot.queryParamMap.get('mensaje');

    if (this.mensaje) {
      setTimeout(() => this.mensaje = null, 3000);
    }
  }

}
