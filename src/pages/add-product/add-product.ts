import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';

/**
 * Generated class for the AddProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product = {} as Product;
  store: Store;

  constructor(private productService: ProductService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
  }

  addProduct(storeKey: string) {
    this.productService.addProduct(this.store.$key, this.product);
    this.navCtrl.push('StoreDetailPage', {store: this.store})
  }
}
