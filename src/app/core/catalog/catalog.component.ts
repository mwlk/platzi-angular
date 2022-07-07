import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent implements OnInit {
  total: number = 0;
  myShoppingCart: Product[] = [];
  productos: Product[] = [];
  showProductDetail: boolean = false;

  /**
   *
   */
  constructor(
    private _storeSvc: StoreService,
    private _productSvc: ProductsService
  ) {
    this.myShoppingCart = _storeSvc.getShoppingCart();
  }
  ngOnInit(): void {
    this._productSvc.getAllProducts().subscribe((res) => {
      this.productos = res;
    });
  }

  onAddToShopping(p: Product) {
    this._storeSvc.addProduct(p);

    this.total = this._storeSvc.getTotal();
  }

  toggleDetails() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: number){
    this._productSvc.getDetail(id).subscribe(res => {
      console.log(res);
    })
  }
}
