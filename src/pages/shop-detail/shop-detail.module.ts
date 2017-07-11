import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailPage } from './shop-detail';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ShopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailPage),
    PipesModule
  ],
  exports: [
    ShopDetailPage
  ]
})
export class ShopDetailPageModule {}
