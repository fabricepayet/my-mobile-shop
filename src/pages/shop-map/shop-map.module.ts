import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopMapPage } from './shop-map';

@NgModule({
  declarations: [
    ShopMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopMapPage)
  ],
  exports: [
    ShopMapPage
  ]
})
export class ShopMapPageModule {}
