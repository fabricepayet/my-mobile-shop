import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailPage } from './shop-detail';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ShopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailPage),
    ComponentsModule
  ],
  exports: [
    ShopDetailPage
  ]
})
export class ShopDetailPageModule {}
