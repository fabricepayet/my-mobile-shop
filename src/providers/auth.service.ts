import  { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private database: AngularFireDatabase) {
  }

  async loginWithFacebook() {
    try {
      await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    } catch(e) {
      // Handle errors here:!
      console.error('Error when logging to facebook', e)
    }
  }

  getAuthentificateUser() {
    return this.afAuth.authState
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
