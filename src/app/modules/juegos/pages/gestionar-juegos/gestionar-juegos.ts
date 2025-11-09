import { Component, inject } from '@angular/core';
import { Filters } from "../../../../public/filters/filters";
import { ListJuegos } from "../list-juegos/list-juegos";

@Component({
  selector: 'app-gestionar-juegos',
  imports: [Filters, ListJuegos],
  templateUrl: './gestionar-juegos.html',
  styleUrl: './gestionar-juegos.css',
})
export class GestionarJuegos {

  gestionar:Boolean = true;

}
