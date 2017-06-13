import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {
  store: Store;
  productList: FirebaseListObservable<Product[]>;
  storePhotoUrl: string;

  constructor(private productService: ProductService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
    this.productList = this.productService.getProductList(this.store.$key);
    let storage = firebase.storage();
    let storageRef = storage.ref();
    storageRef.child(`images/stores/${this.store.$key}/banner.jpg`).getDownloadURL().then((url) => {
      this.storePhotoUrl = url;
    }).catch((error) => {
      console.error(error);
    });
  }

  addProduct() {
    this.navCtrl.push('AddProductPage', {
      store: this.store
    });
  }

  goToProduct(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product,
      store: this.store
    });
  }
}
