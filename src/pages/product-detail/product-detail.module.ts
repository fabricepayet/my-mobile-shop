import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ProductDetailPage
  ],
  imports: [
    IonicPageModule.forChild(ProductDetailPage),
    ComponentsModule,
    PipesModule
  ],
  exports: [
    ProductDetailPage
  ]
})
export class ProductDetailPageModule {}
