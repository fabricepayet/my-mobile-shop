import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Account } from '../../models/account.interface';
import { AuthService } from '../../providers/auth.service';
import { LoginResponse } from '../../models/login-response.interface';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account = {} as Account;
  error: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService) {
  }

  async register() {
    const result: LoginResponse = await this.auth.createUserWithEmailAndPassword(this.account);
    console.log('Register result', result);
    if (!result.error) {
      this.navCtrl.push('ProductListPage');
    } else {
      this.error = result.error.message;
    }
  }
}
