import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AuthService } from '../../providers/auth.service';
import { Profile } from '../../models/profile.interface';

@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})

export class ShopListPage {
  shopList: FirebaseListObservable<Shop[]>;
  private profile: FirebaseObjectObservable<Profile>;

  constructor(
    private shopService: ShopService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
  ) {
  }

  ionViewWillLoad() {
    this.authService.getAuthentificateUser().subscribe(auth => {
      if (auth) {
        this.profile = this.authService.getProfile(auth.uid)
      }
    })
  }

  ionViewDidLoad() {
    this.getShopList();
  }

  goToShop(shop) {
    this.navCtrl.push('ShopDetailPage', {shop, profile: this.profile});
  }

  addShop() {
    this.navCtrl.push('AddShopPage');
  }

  getShopList() {
    this.shopList = this.shopService.getShopList({
      orderByChild: 'name'
    })
  }
}
