import  { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Store } from '../models/store.interface';
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
    this.database.object(`/stores/${product.storeRef}`, {preserveSnapshot: true})
    .subscribe(snapshot => {
      let reservation = {
        user: userId,
        product: product,
        store: snapshot.val(),
        state: 'pending',
        productRef: product.$key,
        storeRef: product.storeRef
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
