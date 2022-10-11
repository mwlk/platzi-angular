import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDto } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl: string = `${environment.API_URL}/api/users`;

  constructor(private _http: HttpClient) {}

  create(dto: CreateUserDto) {
    return this._http.post(this.apiUrl, dto);
  }

  getAll() {
    return this._http.get(this.apiUrl);
  }
}
