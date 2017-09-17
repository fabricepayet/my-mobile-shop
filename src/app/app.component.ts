import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, IonicApp, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;
  rootPage:string = 'ProductListPage';
  private auth;
  private productPage;
  private loginPage;
  private shopPage;
  private reservationPage;
  private isAdmin: boolean = false;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: IonicApp,
    private authService: AuthService,
    private menuController: MenuController
  ) {
    this.productPage = 'ProductListPage';
    this.loginPage = 'LoginPage';
    this.shopPage = 'ShopListPage';
    this.reservationPage = 'ReservationPage';
    this.authService.getAuthentificateUser().subscribe(auth => {
      console.log('auth detected', auth)
      this.auth = auth;
      if (this.auth) {
        let profileSub = this.authService.getProfile(this.auth.uid).subscribe(profile => {
          if (profile.role === 'admin') {
            this.isAdmin = true
          }
          profileSub.unsubscribe()
        })
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.menuController.close();
    if (page === this.productPage || page === this.shopPage) {
      return this.nav.setRoot(page);
    }
    this.nav.push(page);
  }

  closeMenu() {
    this.menuController.close();
  }

  logout() {
    this.authService.logout();
    this.menuController.close();
  }
}
