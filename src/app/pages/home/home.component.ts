import { ProductsService } from 'src/app/services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private limit: number = 50;
  private offset: number = 0;
  productos: Product[] = [];
  constructor(private _productSvc: ProductsService) {}

  ngOnInit(): void {
    this.loadMore();
  }
  loadMore() {
    this._productSvc
      .getProductsByPage(this.limit, this.offset)
      .subscribe((res: Product[]) => {
     
        this.productos.push(...res);

        this.offset += this.limit;
      });
  }

  onLoadMore() {
    this._productSvc.getProductsByPage(this.limit, this.offset).subscribe((data) => {
      this.productos = this.productos.concat(data);
      this.offset += this.limit;
    });
  }
}
