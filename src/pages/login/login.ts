import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';

import { Account } from '../../models/account.interface';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private account = {} as Account;
  private errorMessage: string;
  private message: string;
  private onLogin: Function;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  async loginWithFacebook() {
    this.authService.loginWithFacebook().then(() => {
      this.navCtrl.pop();
    }).catch((error: any) => {
      var errorCode = error.code;
      this.errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      console.error('Error when logging with facebook:', errorCode, this.errorMessage, email);
    })
  }

  navigateToRegisterPage() {
    this.navCtrl.setRoot('RegisterPage')
  }

  async login() {
    const result = await this.authService.signInWithEmailAndPassword(this.account);
    if (!result.error) {
      if(this.onLogin) {
        this.onLogin()
      } else {
        this.navCtrl.pop();
      }
    } else {
      this.errorMessage = result.error.message;
    }
  }

  ionViewWillLoad() {
    this.message = this.navParams.get('message');
    this.onLogin = this.navParams.get('onLogin');
  }
}
