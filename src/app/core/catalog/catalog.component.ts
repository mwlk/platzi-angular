import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { StoreService } from 'src/app/services/store.service';
import {
  CreateProductDTO,
  Product,
  UpdateProductDto,
} from 'src/app/shared/models/product';

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

  private limit: number = 50;
  private offset: number = 0;

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
    this.loadMore();
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

  createNewProduct() {
    const prod: CreateProductDTO = {
      image: 'https://placeimg.com/640/480/any?random=$%7BMath.random()%7D',
      category: '',
      description: '',
      price: 1000,
      title: 'New Product',
    };
    this._productSvc.create(prod).subscribe((res) => {
      console.log(res);
      this.productos.unshift(res);
    });
  }

  updateProduct() {
    const prod: UpdateProductDto = {
      title: 'update success!',
    };

    const id = this.productChosen.id;

    this._productSvc.update(id, prod).subscribe((res: Product) => {
      console.log(`updated ${res}`);
      const prodIndex = this.productos.findIndex((x) => x.id === res.id);

      this.productos[prodIndex] = res;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;

    this._productSvc.delete(id).subscribe(() => {
      const prodIndex = this.productos.findIndex((x) => x.id === id);
      this.productos.splice(prodIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this._productSvc
      .getProductsByPage(this.limit, this.offset)
      .subscribe((res: Product[]) => {
        this.productos.push(...res);

        this.offset += this.limit;
      });
  }

  readAndUpdate(id: number) {
    this._productSvc
      .getDetail(id)
      .pipe(
        switchMap((product) => {
          return this._productSvc.update(product.id, { title: 'changed' });
        })
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  zipReadAndUpdate(id: number) {
    zip(
      this._productSvc.getDetail(id),
      this._productSvc.update(id, { title: 'new' })
    ).subscribe((response) => {
      const read = response[0];
      const update = response[1];
    });
  }
}
