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
  currentUser = null;

  constructor(
    private database: AngularFireDatabase,
    private authService: AuthService) {
  }

  async createReservation(product: Product, store: Store) {
      this.authService.getAuthentificateUser().subscribe((user) => {
      let reservation = {
        user: user.uid,
        product: product,
        store: store,
        state: 'pending',
        productRef: product.$key,
        storeRef: store.$key
      }
      this.database.object(`/user-reservations/${user.uid}/${product.$key}`)
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
