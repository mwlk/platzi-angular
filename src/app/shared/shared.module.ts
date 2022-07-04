import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReversePipe } from '../pipes/reverse.pipe';



@NgModule({
  declarations: [
    ProductComponent,
    NavbarComponent,
    ReversePipe
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
