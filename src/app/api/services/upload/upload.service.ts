import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  HttpClient = inject(HttpClient);

  uploadImage(file: File): Observable<string> {

    const formData = new FormData();
    formData.append('imagen_url', file);
    return this.HttpClient.post<string>(`${environment.API_URL_UPLOAD}`, formData);
  }

}
