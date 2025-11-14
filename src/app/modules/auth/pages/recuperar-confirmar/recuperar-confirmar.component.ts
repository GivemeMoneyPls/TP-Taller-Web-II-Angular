import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-recuperar-confirmar',
  standalone: true,
  templateUrl: './recuperar-confirmar.html',
  styleUrls: ['./recuperar-confirmar.css'],
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class RecuperarConfirmarComponent {

  token: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    // Leemos el token desde la URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  confirmarNuevaContrasena() {
    this.mensajeError = null;
    this.mensajeExito = null;

    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.mensajeError = "Completá todos los campos";
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.mensajeError = "Las contraseñas no coinciden";
      return;
    }

    this.http.post('http://localhost:3000/api/auth/recuperar-confirmar', {
      token: this.token,
      nuevaContrasena: this.nuevaContrasena
    }).subscribe({
      next: (resp: any) => {
        this.mensajeExito = resp.mensaje || "Contraseña actualizada correctamente";
        
        setTimeout(() => this.router.navigate(['/signin']), 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.mensaje || "Ocurrió un error";
      }
    });
  }
}
