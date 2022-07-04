import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  constructor() {}

  addProduct(p: Product) {
    this.myShoppingCart.push(p);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal() {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
