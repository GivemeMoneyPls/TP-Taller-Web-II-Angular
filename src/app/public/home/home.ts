import { Component } from '@angular/core';
import { ListJuegos } from "../../modules/juegos/pages/list-juegos/list-juegos";

@Component({
  selector: 'app-home',
  imports: [ListJuegos],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
