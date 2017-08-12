import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { PricePipe } from '../../pipes/price/price'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ProductDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    ComponentsModule
  ],
  exports: [
    ProductDetailPage
  ]
})
export class ProductDetailPageModule {}
