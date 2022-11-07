import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [CatalogComponent],
  imports: [CommonModule, SharedModule, SwiperModule, RouterModule],
  exports: [CatalogComponent],
})
export class CoreModule {}
