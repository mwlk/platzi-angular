import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoreService } from 'src/app/services/store.service';
import { CreateProductDTO, Product } from 'src/app/shared/models/product';

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
  productChosen: Product = {
    id: 0,
    price: 0,
    category: '',
    description: '',
    image: '',
    title: '',
  };

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

  onShowDetail(id: number) {
    this._productSvc.getDetail(id).subscribe((res: Product) => {
      this.toggleDetails();
      this.productChosen = res;
    });
  }

  createNewProduct(){
    const prod: CreateProductDTO = {
      image: 'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D',
      category: '',
      description: '',
      price: 1000, 
      title: 'New Product'
    }
    this._productSvc.create(prod).subscribe(res => {
      console.log(res);
      this.productos.unshift(res)
    })
  }
}
