import { Component } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent {

  public productos: Product[] = [
    {
        id: 1,
        name: 'Automobil de juguete',
        precio: 100,
        image: './image1.jpg'
    },
    {
        id: 2,
        name: 'Muñeca de trapo',
        precio: 180,
        image: './image2.jpg'
    },
    {
        id: 3,
        name: 'Pelota de futbol',
        precio: 120,
        image: './image3.jpg'
    }
  ];
}