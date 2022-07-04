import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input('product') producto!: Product;

  @Output() addedProduct = new EventEmitter<Product>()

  onAddToCart(){
    this.addedProduct.emit(this.producto)
  }
}
