import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationService } from '../../providers/reservation.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Reservation } from '../../models/reservation.interface';
import { AuthService } from '../../providers/auth.service';

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  private reservationList: FirebaseListObservable<Reservation[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reservationService: ReservationService,
    private authService: AuthService) {
  }

  ionViewWillLoad() {
    this.reservationList = this.reservationService.getReservationsForCurrentUser();
  }

  gotoProduct(reservation: Reservation) {
    let shop = reservation.shop
    let product = reservation.product
    shop.$key = reservation.shopRef
    product.$key = reservation.productRef
    this.navCtrl.push('ProductDetailPage', {shop, product})
  }
}
