import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service'
import { GeolocService } from '../../providers/geoloc.service'

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopService: ShopService,
    private toastController: ToastController,
    private geolocService: GeolocService,
  ) {
    this.shop = this.navParams.get('shop');
  }

  editShop() {
    this.shopService.editShop(this.shop.$key, {
      name: this.shop.name,
      activity: this.shop.activity,
      town: this.shop.town,
      longitude: this.shop.longitude,
      latitude: this.shop.latitude,
      phone: this.shop.phone,
      email: this.shop.email,
    })
    this.navCtrl.pop()
  }

  getPosition() {
    this.geolocService.getCurrentPosition().then((coords: Coordinates) => {
      this.shop.longitude = coords.longitude;
      this.shop.latitude = coords.latitude;
      this.toastController.create({
        message: 'Coordonnées mises à jour',
        duration: 3000
      }).present()
    }).catch(error => {
      this.toastController.create({
        message: error.message,
        duration: 3000
      }).present()
    })
  }
}
