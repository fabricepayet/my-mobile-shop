import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Product } from '../../models/product.interface';

/**
 * Generated class for the ReservationModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-reservation-modal',
  templateUrl: 'reservation-modal.html',
})
export class ReservationModalPage {

  product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
  }

}
