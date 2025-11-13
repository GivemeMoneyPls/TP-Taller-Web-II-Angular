import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SigninData, SignupData, User } from '../../../modules/auth/interfaces/user.interface';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  router = inject(Router);

  private apiUrl = `${environment.API_URL_AUTH}`;

  private user = new BehaviorSubject<User | null>(this.getUserFromToken());

  public user$ = this.user.asObservable();

  registerUser(userData: SignupData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, userData);
  }

  loginUser(loginData: SigninData): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.apiUrl}/signin`, loginData)
      .pipe(
        tap(response => {
          localStorage.setItem('app_token', response.token);
          const decodedUser = this.getUserFromToken();
          this.user.next(decodedUser);
        })
      );
  }

  logout() {
    localStorage.removeItem('app_token');

    this.user.next(null);

    this.router.navigate(['/']);
  }

  updateProfile(userId: number, data: any): Observable<any> {
    const body = { id: userId, ...data };

    return this.httpClient.put<{ token: string }>(`${this.apiUrl}/update`, body)
      .pipe(
        tap(response => {
          const newToken = response.token;

          localStorage.setItem('app_token', newToken);

          const decodedUser = this.getUserFromToken();
          this.user.next(decodedUser);
        })
      );
  }

  private getUserFromToken(): User | null {
    const token = localStorage.getItem('app_token');

    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);

      return {
        id: decoded.id,
        email: decoded.email,
        nombre: decoded.nombre,
        apellido: decoded.apellido || '',
        direccion: decoded.direccion || '',
        contrase_a: ''
      };
    } catch (error) {
      console.error('Error al decodificar token', error);
      return null;
    }
  }

  public isLoggedIn(): boolean {
    return this.user.getValue() !== null;
  }

  public getCurrentUser(): User | null {
    return this.user.getValue();
  }

  public getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    
    return user ? user.id : null; 
  }
}
