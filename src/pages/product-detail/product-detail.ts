import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import firebase from 'firebase';

/**
 * Generated class for the ProductDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  product: Product;
  store: Store;
  private storePhotoUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
    this.store = this.navParams.get('store');
    let storage = firebase.storage();
    let storageRef = storage.ref();
    storageRef.child(`images/stores/${this.store.$key}/products/${this.product.$key}.jpg`).getDownloadURL().then((url) => {
      this.storePhotoUrl = url;
    }).catch((error) => {
      console.error(error);
    });
  }

}
