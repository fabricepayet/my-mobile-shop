import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TourPage } from './tour';

@NgModule({
  declarations: [
    TourPage,
  ],
  imports: [
    IonicPageModule.forChild(TourPage),
  ],
  exports: [
    TourPage
  ]
})
export class TourPageModule {}
