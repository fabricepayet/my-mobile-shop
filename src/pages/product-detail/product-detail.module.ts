import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { PricePipe } from '../../pipes/price/price'
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ProductDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    PipesModule
  ],
  exports: [
    ProductDetailPage
  ]
})
export class ProductDetailPageModule {}
