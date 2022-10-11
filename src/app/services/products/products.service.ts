import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import {
  CreateProductDTO,
  Product,
  UpdateProductDto,
} from 'src/app/shared/models/product';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl: string = `${environment.API_URL}/products`;
  constructor(private _http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit != undefined && limit > 0 && offset != undefined && offset > 0) {
      params.set('limit', limit);
      params.set('offset', offset);
    }
    return this._http.get<Product[]>(this.apiUrl, { params: params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: 0.21 * item.price,
          };
        })
      )
    );
  }

  getDetail(id: number) {
    return this._http.get<Product>(`${this.apiUrl}/${id.toString()}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleErrors(error);
      })
    );
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateProductDto) {
    return this._http.put<Product>(`${this.apiUrl}/${id.toString()}`, dto);
  }

  delete(id: number) {
    return this._http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getProductsByPage(limit: number, offset: number) {
    return this._http.get<Product[]>(`${this.apiUrl}`, {
      params: { limit, offset },
    });
  }

  handleErrors(error: HttpErrorResponse): Observable<never> {
    if (error.status == HttpStatusCode.Forbidden)
      return throwError(() => 'No tiene permisos para realizar la solicitud.');
    if (error.status == HttpStatusCode.NotFound)
      return throwError(() => 'El producto no existe.');
    if (error.status == HttpStatusCode.InternalServerError)
      return throwError(() => 'Error en el servidor.');
    return throwError(() => 'Un error inesperado ha ocurrido.');
  }
}
