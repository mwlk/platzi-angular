import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from './../../environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = `${environment.API_URL}/api/files`;
  constructor(private _http: HttpClient) {}

  getFile(name: string, url: string, type: string) {
    return this._http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    dto.append('file', file);

    return this._http.post<File>(`${this.apiUrl}/upload`, dto, {
      // headers: {
      //   'Content-type': 'multipart/form-data',
      // },
    });
  }
}
