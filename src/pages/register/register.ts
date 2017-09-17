import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Account } from '../../models/account.interface';
import { AuthService } from '../../providers/auth.service';
import { LoginResponse } from '../../models/login-response.interface';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account = {} as Account;
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService) {
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

  async register() {
    const result: LoginResponse = await this.authService.createUserWithEmailAndPassword(this.account);
    if (!result.error) {
      this.navCtrl.push('ProductListPage');
    } else {
      this.errorMessage = result.error.message;
    }
  }

  navigateToConnexionPage() {
    this.navCtrl.setRoot('LoginPage')
  }
}
