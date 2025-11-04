import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SigninData, SignupData, User } from '../../../modules/auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  router = inject(Router);

  private apiUrl = `${environment.API_URL}/auth`;

  private user = new BehaviorSubject<User | null>(this.getInitialUser());

  public user$ = this.user.asObservable();

  registerUser(userData: SignupData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, userData);
  }

  loginUser(loginData: SigninData): Observable<{ token: string, user: User }> {
    return this.httpClient.post<{ token: string, user: User }>(`${this.apiUrl}/signin`, loginData)
      .pipe(
        tap(response => {
          localStorage.setItem('app_token', response.token);
          localStorage.setItem('app_user', JSON.stringify(response.user));

          this.user.next(response.user);
        })
      );
  }

  logout() {
    localStorage.removeItem('app_token');
    localStorage.removeItem('app_user');

    this.user.next(null);

    this.router.navigate(['/']);
  }

  private getInitialUser(): User | null {
    const token = localStorage.getItem('app_token');
    const userJson = localStorage.getItem('app_user');

    if (token && userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  public isLoggedIn(): boolean {
    return this.getInitialUser() !== null;
  }

  public getCurrentUser(): User | null {
    return this.user.getValue();
  }
}