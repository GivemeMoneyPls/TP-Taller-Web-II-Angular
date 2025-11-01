import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { SignupData, SigninData, User } from '../../../modules/auth/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);

  private apiUrl = `${environment.API_URL}/auth`;

  registerUser(userData: SignupData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/signup`, userData);
  }

  loginUser(loginData: SigninData): Observable<{ message: string, user: User }> {
    return this.httpClient.post<{ message: string, user: User }>(`${this.apiUrl}/signin`, loginData);
  }
}