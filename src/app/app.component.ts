import { Component } from '@angular/core';
import { Platform, MenuController, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:string = 'TabsPage';
  // rootPage:string = 'LoginPage';
  rootPage:string = 'ProductListPage';

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public app: IonicApp,
    private authService: AuthService,
    private menuController: MenuController
  ) {
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
    // console.log('thisNav', this.nav)
    // let nav = this.app.getElementRef(this.nav);
    // nav.setRoot(page.component);
    // nav.push(page);
    // nav.push(page);
    // this.navCtrl.push(page)
  }

  closeMenu() {
    this.menuController.close();
  }

  logout() {
    this.authService.logout();
    this.menuController.close();
  }
}
