import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { StoreService } from '../../providers/store.service';

/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  private productList: FirebaseListObservable<Product[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private storeService: StoreService) {
  }

  ionViewWillLoad() {
    this.productList = this.productService.getProducts()
  }

  gotoStore(product) {
    let store: Store = product.store
    store.$key = product.storeRef
    this.navCtrl.push('StoreDetailPage', {store})
  }

  gotoProduct(product) {
    let store = product.store
    delete product.store;
    this.navCtrl.push('ProductDetailPage', {
      store, product
    })
  }
}
