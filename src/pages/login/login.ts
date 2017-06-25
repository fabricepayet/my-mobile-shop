import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    try {
      await this.authService.loginWithFacebook();
      this.navCtrl.push('TabsPage');
    } catch(e) {
      console.error('Error when logging with facebook:', e);
    }
  }
}
