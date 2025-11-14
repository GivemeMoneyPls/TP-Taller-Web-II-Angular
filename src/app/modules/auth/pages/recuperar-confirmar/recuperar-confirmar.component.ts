import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../api/services/auth/auth.service';
import { NotificationService } from '../../../../api/services/notification/notification.service';

@Component({
  selector: 'app-recuperar-confirmar',
  standalone: true,
  templateUrl: './recuperar-confirmar.html',
  styleUrls: ['./recuperar-confirmar.css'],
  imports: [FormsModule, CommonModule]
})
export class RecuperarConfirmarComponent {

  authService = inject(AuthService);
  notificationService = inject(NotificationService);
  router = inject(Router);

  token: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  confirmarNuevaContrasena() {
    // Validaciones visuales con Notificación
    if (!this.token || !this.nuevaContrasena || !this.confirmarContrasena) {
      this.notificationService.show('error', 'Por favor, completá todos los campos.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.notificationService.show('error', 'Las contraseñas no coinciden.');
      return;
    }

    if (this.nuevaContrasena.length < 8) {
      this.notificationService.show('error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    this.authService.confirmPasswordRecovery(this.token, this.nuevaContrasena).subscribe({
      next: () => {
        this.notificationService.show('success', '¡Contraseña actualizada! Redirigiendo al login...');
        
        setTimeout(() => this.router.navigate(['/signin']), 2000);
      },
      error: (err) => {
        const msg = err.error?.mensaje || 'El token es inválido o ha expirado.';
        this.notificationService.show('error', msg);
      }
    });
  }
}