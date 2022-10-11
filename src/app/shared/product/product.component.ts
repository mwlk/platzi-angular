import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() producto!: Product;

  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<number>();

  onAddToCart() {
    this.addedProduct.emit(this.producto);
  }

  viewDetail() {
    this.showDetail.emit(this.producto.id);
  }
}
