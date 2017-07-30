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
  // rootPage:string = 'TabsPage';
  // rootPage:string = 'LoginPage';
  rootPage:string = 'ProductListPage';
  private homePage;
  private loginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: IonicApp,
    private authService: AuthService,
    private menuController: MenuController
  ) {
    this.homePage = 'ProductListPage';
    this.loginPage = 'LoginPage';
    // this.authService.getAuthentificateUser().subscribe(auth => {
    //   !auth ? this.rootPage = 'LoginPage' : this.rootPage = 'TabsPage';
    // })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.menuController.close();
    // this.rootPage = page;
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
