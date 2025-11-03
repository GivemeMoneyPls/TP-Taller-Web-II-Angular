import { Component } from '@angular/core';
import { ListJuegos } from "../../modules/juegos/pages/list-juegos/list-juegos";
import { Filters } from '../filters/filters';

@Component({
  selector: 'app-home',
  imports: [ListJuegos, Filters],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
