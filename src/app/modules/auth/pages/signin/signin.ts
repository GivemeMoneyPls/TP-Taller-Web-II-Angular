import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../api/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SigninData } from '../../interfaces/user.interface'; 
import { NotificationService } from '../../../../api/services/notification/notification.service';

@Component({
  selector: 'app-signin',
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})

export class SigninComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  signinForm: FormGroup;

  constructor() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]] 
    });
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      this.signinForm.markAllAsTouched();
      return;
    }

    const loginData: SigninData = this.signinForm.value as SigninData;

    this.authService.loginUser(loginData).subscribe({
      next: (response) => {
        const currentUser = this.authService.getCurrentUser();
        const nombre  = currentUser ? currentUser.nombre : 'Usuario';
        this.notificationService.show('success', `¡Bienvenido, ${nombre}!`);
        this.router.navigate(['/']); 
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Error de conexión. Intenta más tarde.';
        this.notificationService.show('error', errorMessage, 6000);
      }
    });
  }
}