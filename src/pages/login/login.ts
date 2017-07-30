import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private account = {};

  constructor(private authService: AuthService, private navCtrl: NavController) {
  }

  async loginWithFacebook() {
    this.authService.loginWithFacebook().then(() => {
      this.navCtrl.push('TabsPage');
    }).catch((error: any) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      console.error('Error when logging with facebook:', errorCode, errorMessage, email);
    })
  }
}
