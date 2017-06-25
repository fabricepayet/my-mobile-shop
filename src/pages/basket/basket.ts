import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReservationService } from '../../providers/reservation.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Reservation } from '../../models/reservation.interface';
import { AuthService } from '../../providers/auth.service';

/**
 * Generated class for the BasketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html',
})
export class BasketPage {

  private reservationList: FirebaseListObservable<Reservation[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private reservationService: ReservationService,
    private authService: AuthService) {
  }

  ionViewWillLoad() {
    this.authService.getAuthentificateUser().subscribe((user) => {
      this.reservationList = this.reservationService.getReservationsForUser(user.uid);
    })
  }

}
