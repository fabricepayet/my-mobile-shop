import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationPage } from './reservation';
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    ReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationPage),
    ComponentsModule
  ],
  exports: [
    ReservationPage
  ]
})
export class ReservationPageModule {}
