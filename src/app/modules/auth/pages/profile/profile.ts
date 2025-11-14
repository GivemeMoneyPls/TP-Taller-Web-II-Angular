import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../../api/services/auth/auth.service'; 
import { NotificationService } from '../../../../api/services/notification/notification.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  fb = inject(FormBuilder);
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  profileForm: FormGroup;
  currentUser: User | null = null;

  constructor() {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
      currentPassword: [''], 
      newPassword: ['', [Validators.minLength(8)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      this.profileForm.patchValue({
        nombre: this.currentUser.nombre,
        apellido: this.currentUser.apellido,
        direccion: this.currentUser.direccion,
        email: this.currentUser.email
      });
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const current = control.get('currentPassword')?.value;
    const newPass = control.get('newPassword')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (newPass && newPass.trim() !== '') {
      
      if (!current || current.trim() === '') {
        return { currentPasswordRequired: true };
      }

      if (newPass !== confirm) {
        return { passwordMismatch: true };
      }
    }

    return null;
  }

  onSubmit() {
    if (this.profileForm.invalid || !this.currentUser) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValues = this.profileForm.value;
    
    const isNameChanged = formValues.nombre.trim() !== this.currentUser.nombre;
    const isSurnameChanged = formValues.apellido.trim() !== this.currentUser.apellido;
    const isAddressChanged = formValues.direccion.trim() !== this.currentUser.direccion;
    const isPasswordChanged = formValues.newPassword && formValues.newPassword.trim() !== '';

    if (!isNameChanged && !isSurnameChanged && !isAddressChanged && !isPasswordChanged) {
      this.notificationService.show('info', 'No has realizado ningún cambio.');
      this.profileForm.markAsPristine(); 
      return;
    }

    const dataToSend: any = {
      nombre: formValues.nombre,
      apellido: formValues.apellido,
      direccion: formValues.direccion
    };

    if (isPasswordChanged) {
      dataToSend.currentPassword = formValues.currentPassword;
      dataToSend.newPassword = formValues.newPassword;
    }

    this.authService.updateProfile(this.currentUser.id, dataToSend).subscribe({
      next: () => {
        this.notificationService.show('success', '¡Perfil actualizado con éxito!');
        
        this.profileForm.patchValue({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        this.currentUser = this.authService.getCurrentUser();
        this.profileForm.markAsUntouched(); 
        this.profileForm.markAsPristine();
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.message || 'Error al actualizar perfil';
        this.notificationService.show('error', msg);
      }
    });
  }
}