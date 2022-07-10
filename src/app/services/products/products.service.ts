import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateProductDTO, Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl: string = 'https://fakestoreapi.com/products/';
  constructor(private _http: HttpClient) {}

  getAllProducts() {
    return this._http.get<Product[]>(this.apiUrl);
  }

  getDetail(id: number) {
    return this._http.get<Product>(`${this.apiUrl}/${id.toString()}`);
  }

  create(dto: CreateProductDTO) {
    return this._http.post<Product>(this.apiUrl, dto);
  }
}
