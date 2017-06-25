import  { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ReservationService {
  constructor(private database: AngularFireDatabase) {
  }

  createReservation(storeKey: string, productKey: string) {
  }
}
