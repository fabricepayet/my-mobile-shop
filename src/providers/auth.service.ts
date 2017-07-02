import  { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private database: AngularFireDatabase) {
  }

  loginWithFacebook() {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
  }

  getAuthentificateUser() {
    return this.afAuth.authState
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }
}
