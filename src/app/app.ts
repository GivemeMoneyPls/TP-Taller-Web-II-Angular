import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./public/header/header";
import { Footer } from "./public/footer/footer";
import { NotificationComponent } from './modules/notification/notification';
import { Cart } from './modules/cart/cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NotificationComponent, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tp-taller2-angular');
}
