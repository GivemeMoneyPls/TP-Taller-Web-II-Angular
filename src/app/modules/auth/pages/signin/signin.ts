import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../api/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SigninData } from '../../interfaces/user.interface'; 

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
        console.log("¡Login exitoso!", response);
        alert("¡Bienvenido! Iniciaste sesión.");
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error("Error al iniciar sesión:", err);
        alert(`Error: ${err.error.message}`);
      }
    });
  }
}