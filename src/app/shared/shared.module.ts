import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReversePipe } from '../pipes/reverse.pipe';
import { HighlightDirective } from '../directives/highlight.directive';



@NgModule({
  declarations: [
    ProductComponent,
    NavbarComponent,
    ReversePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductComponent,
    NavbarComponent,
    HighlightDirective
  ]
})
export class SharedModule { }
