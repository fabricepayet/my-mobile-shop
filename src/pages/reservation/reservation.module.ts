import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationPage } from './reservation';
import { PipesModule } from '../../pipes/pipes.module'

@NgModule({
  declarations: [
    ReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationPage),
    PipesModule
  ],
  exports: [
    ReservationPage
  ]
})
export class ReservationPageModule {}
