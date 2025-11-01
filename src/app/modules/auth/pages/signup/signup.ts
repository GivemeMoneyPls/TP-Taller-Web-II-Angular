import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../api/services/auth/auth.service';
import { Router } from '@angular/router';
import { SignupData } from '../../interfaces/user.interface';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

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
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        this.router.navigate(['/signin']); 
      },
      error: (err) => {
        console.error("Error al registrar:", err);
        alert(`Error: ${err.error.error}`);
      }
    });
  }
}