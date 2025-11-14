import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../api/services/auth/auth.service'; 
import { NotificationService } from '../../../../api/services/notification/notification.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  templateUrl: './recuperar.html',
  styleUrls: ['./recuperar.css'],
  imports: [FormsModule, CommonModule, RouterModule]
})
export class RecuperarComponent {

  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  router = inject(Router);

  correo: string = '';
  cargando: boolean = false;

  enviarCorreo() {
    if (!this.correo) {
      this.notificationService.show('error', 'Debes ingresar un correo electrónico.');
      return;
    }

    this.cargando = true;

    this.authService.requestPasswordRecovery(this.correo).subscribe({
      next: () => {
        this.cargando = false;
        this.notificationService.show('success', 'Token generado. Buscá el archivo "recuperar.txt" en la carpeta del servidor.');

        setTimeout(() => {
           this.router.navigate(['/recuperar-confirmar']);
        }, 3000);
      },
      error: (err) => {
        this.cargando = false;
        const msg = err.error?.mensaje || 'Error al solicitar recuperación.';
        this.notificationService.show('error', msg);
      }
    });
  }
}