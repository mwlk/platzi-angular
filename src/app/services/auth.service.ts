import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../shared/models/auth';
import { User } from '../shared/models/user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = `${environment.API_URL}/api/auth`;

  constructor(private _http: HttpClient, private _tokenSvc: TokenService) {}

  login(email: string, password: string) {
    return this._http
      .post<Auth>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          this._tokenSvc.setToken(res.access_token);
        })
      );
  }

  profile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization',  `Bearer ${token}`);
    return this._http.get<User>(`${this.apiUrl}/profile`);
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // 'Content-type': 'application/json'
    //   },
    // });
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(() => this.profile())
    );
  }
}
