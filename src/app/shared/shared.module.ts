import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    ProductComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
