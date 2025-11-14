import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  templateUrl: './recuperar.html',
  styleUrls: ['./recuperar.css'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class RecuperarComponent {

  correo: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  enviarCorreo() {
    this.mensajeError = null;
    this.mensajeExito = null;

    if (!this.correo) {
      this.mensajeError = "Debes ingresar un correo.";
      return;
    }

    this.http.post('http://localhost:3000/api/auth/recuperar', { email: this.correo })
      .subscribe({
        next: (resp: any) => {
          this.mensajeExito = resp.mensaje || "Correo enviado correctamente.";

          // Tomamos el token del backend
          const token = resp.token;

          setTimeout(() => {
            // Redirigimos a recuperar-confirmar pasando el token por query params
            this.router.navigate(['/recuperar-confirmar'], { queryParams: { token } });
          }, 2000);
        },
        error: (err) => {
          this.mensajeError = err.error?.mensaje || "Ocurrió un error. Intentá nuevamente.";
        }
      });
  }
}
