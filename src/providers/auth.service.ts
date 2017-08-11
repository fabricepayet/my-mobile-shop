import  { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { LoginResponse } from '../models/login-response.interface';
import { Account } from '../models/account.interface';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  profile: FirebaseObjectObservable<any>;

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

  async createUserWithEmailAndPassword(account: Account) {
    try {
      return  <LoginResponse> {
        result: await this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)
      }
    } catch (e) {
      return  <LoginResponse> {
        error: e
      }
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return <LoginResponse> {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      }

    } catch(e) {
      return <LoginResponse> {
        error: e
      }
    }
  }

  getProfile(userId) {
    console.log('getProfile', userId);
    return this.database.object(`/users/${userId}`)
  }
}
