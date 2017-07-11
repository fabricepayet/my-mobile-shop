import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service'

/**
 * Generated class for the EditShopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {

  shop: Shop;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private shopService: ShopService) {
    this.shop = this.navParams.get('shop');
  }

  editShop() {
    this.shopService.editShop(this.shop.$key, {
      name: this.shop.name,
      activity: this.shop.activity,
      town: this.shop.town
    })
    this.navCtrl.push('ShopDetailPage', {shop: this.shop})
  }
}
