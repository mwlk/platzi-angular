import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../shared/models/auth';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.API_URL}/api/auth`;

  constructor(private _http: HttpClient) {}

  login(email: string, password: string) {
    return this._http.post<Auth>(`${this.apiUrl}/login`, { email, password });
  }

  profile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this._http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    });
  }
}
