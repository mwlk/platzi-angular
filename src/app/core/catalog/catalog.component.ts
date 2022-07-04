import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  total: number = 0;
  myShoppingCart: Product[] = [];
  public productos: Product[] = [
    {
      id: 1,
      name: 'Automobil de juguete',
      precio: 100,
      image: '../../../assets/images/bike.jpg',
    },
    {
      id: 2,
      name: 'Muñeca de trapo',
      precio: 180,
      image: '../../../assets/images/books.jpg',
    },
    {
      id: 3,
      name: 'Pelota de futbol',
      precio: 120,
      image: './../../assets/images/toy.jpg',
    },
  ];

  /**
   *
   */
  constructor(private _storeSvc: StoreService) {
    this.myShoppingCart = _storeSvc.getShoppingCart();
  }

  onAddToShopping(p: Product) {
    this._storeSvc.addProduct(p);

    this.total = this._storeSvc.getTotal();
  }
}
