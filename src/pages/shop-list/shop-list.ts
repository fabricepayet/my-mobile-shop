import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ShopListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-list',
  templateUrl: 'shop-list.html',
})
export class ShopListPage {

  shopList: FirebaseListObservable<Shop[]>;

  constructor(private shopService: ShopService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getShopList();
  }

  goToShop(shop) {
    this.navCtrl.push('ShopDetailPage', {shop});
  }

  addShop() {
    this.navCtrl.push('AddShopPage');
  }

  getShopList() {
    this.shopList = this.shopService.getShopList()
  }
}
