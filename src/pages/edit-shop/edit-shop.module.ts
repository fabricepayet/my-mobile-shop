import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShopPage } from './edit-shop';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EditShopPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShopPage),
    ComponentsModule
  ],
  exports: [
    EditShopPage
  ]
})
export class EditShopPageModule {}
