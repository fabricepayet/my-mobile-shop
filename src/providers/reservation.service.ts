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
    private authService: AuthService
  ) {
  }

  async createUserReservation(product: Product) {
    let { uid, displayName, email } = firebase.auth().currentUser;
    this.database.object(`/shops/${product.shopRef}`, {preserveSnapshot: true})
    .subscribe(snapshot => {
      let reservation: Reservation = {
        userRef: uid,
        product: product,
        shop: snapshot.val(),
        productRef: product.$key,
        shopRef: product.shopRef,
        timestamp: Date.now(),
        userName: displayName,
        userEmail: email,
      }
      this.database.object(`/user-reservations/${uid}/${product.$key}`).set(reservation)
    })
  }

  getReservationsForCurrentUser(): FirebaseListObservable<Reservation[]> {
    let { uid } = firebase.auth().currentUser;
    return this.database.list(`/user-reservations/${uid}/`);
  }

  getReservationForProductForCurrentUser(product: Product) {
    let { uid } = firebase.auth().currentUser;
    return this.database.object(`/user-reservations/${uid}/${product.$key}/`)
  }

  getReservationCountForProduct(product: Product) {
    return this.database.object(`/reservations/${product.shopRef}/${product.$key}/count`);
  }
}
