import  { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { FirebaseListObservable } from 'angularfire2/database';
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

  async createReservation(store: Store, product: Product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getAuthentificateUser().subscribe((user) => {
        let reservation = {
          user: user.uid,
          product: product,
          store: store
        }
        this.database.list(`/user-reservations/${user.uid}/`).push(reservation)
        this.database.list(`/reservations/${product.$key}/current/`).push(reservation)
        this.database.list(`/reservations/${product.$key}/all/`).push(reservation)
        resolve()
      })
    })
  }

  getReservationsForUser(userUid): FirebaseListObservable<Reservation[]> {
    return this.database.list(`/user-reservations/${userUid}/`);
  }

  getReservationForProductForCurrentUser(productUid) {
    var userId = firebase.auth().currentUser.uid;
    console.log('getReservationForProductForCurrentUser', userId, productUid);
    return firebase.database().ref(`/user-reservations/${userId}/${productUid}`)
    .once('value').then(function(snapshot) {
      console.log('Snapshot', snapshot.val())
    });
  }
}
