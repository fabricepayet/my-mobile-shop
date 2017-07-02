import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(private authService: AuthService, private navCtrl: NavController) {
  }

  async loginWithFacebook() {
    this.authService.loginWithFacebook().then(() => {
      this.navCtrl.push('TabsPage');
    }).catch((error: any) => {
      console.error('Error when logging with facebook:', error);
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.debug('errorMessage', errorMessage);
      console.debug(errorMessage);
      console.debug('email', email);
      console.debug(email);
      console.debug('credential', credential);
      console.debug(credential);
    })
  }
}
