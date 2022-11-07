import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  category: string | null = null;
  limit = 10;
  offset = 0;
  productos: Product[] = [];
  constructor(
    private _activated: ActivatedRoute,
    private _productSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this._activated.paramMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('id');
          if (this.category) {
            return this._productSvc.getProductsByCategory(
              this.category,
              this.limit,
              this.offset
            );
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.productos = data;
      });
    // this._activated.paramMap.subscribe((res) => {
    //   this.category = res.get('id');
    //   // console.log(this.categorys);
    //   if (this.category)
    //     this._productSvc
    //       .getProductsByCategory(this.category, this.limit, this.offset)
    //       .subscribe((res) => {
    //         this.productos = res;
    //       });
    // });
  }
}
