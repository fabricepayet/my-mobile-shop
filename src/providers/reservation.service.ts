import  { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import { Reservation } from '../models/reservation.interface';
import firebase from 'firebase';

@Injectable()
export class ReservationService {
  constructor(
    private database: AngularFireDatabase,
    private authService: AuthService) {
  }

  async createUserReservation(product: Product) {
    var userId = firebase.auth().currentUser.uid;
    this.database.object(`/shops/${product.shopRef}`, {preserveSnapshot: true})
    .subscribe(snapshot => {
      let reservation = {
        user: userId,
        product: product,
        shop: snapshot.val(),
        state: 'pending',
        productRef: product.$key,
        shopRef: product.shopRef
      }
      this.database.object(`/user-reservations/${userId}/${product.$key}`)
      .set(reservation)
    })
  }

  getReservationsForCurrentUser(): FirebaseListObservable<Reservation[]> {
    var userId = firebase.auth().currentUser.uid;
    return this.database.list(`/user-reservations/${userId}/`);
  }

  getReservationForProductForCurrentUser(product) {
    var userId = firebase.auth().currentUser.uid;
    return this.database.object(`/user-reservations/${userId}/${product.$key}/`)
  }
}
