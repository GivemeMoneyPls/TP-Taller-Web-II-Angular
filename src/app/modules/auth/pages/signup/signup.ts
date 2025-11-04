import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../api/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SignupData } from '../../interfaces/user.interface';
import { NotificationService } from '../../../../api/services/notification/notification.service';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  notificationService = inject(NotificationService);

  signupForm: FormGroup;

  constructor() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]], // 
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      console.error("Formulario inválido");
      this.signupForm.markAllAsTouched(); 
      return;
    }
    
    const userData: SignupData = this.signupForm.value as SignupData;

    console.log("Enviando al backend:", userData);
    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log("¡Usuario creado!", response);
        this.notificationService.show('success', '¡Cuenta creada con éxito! Por favor inicia sesión.');
        this.router.navigate(['/signin']); 
      },
      error: (err) => {
        console.error("Error al registrar:", err);
        const errorMessage = err.error?.error || 'Error desconocido al registrar.';
        this.notificationService.show('error', errorMessage, 6000);
      }
    });
  }
}