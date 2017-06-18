import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { StoreService } from '../../providers/store.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {
  store: Store;
  productList: FirebaseListObservable<Product[]>;
  storePhotoUrl: string;
  private loader: Loading;

  constructor(
    private loading: LoadingController,
    private storeService: StoreService,
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
    console.log('ThisSTore from stor detail', this.store);
    this.productList = this.productService.getProductList(this.store.$key);
  }

  addProduct() {
    this.navCtrl.push('AddProductPage', {
      store: this.store
    });
  }

  deleteStore() {
    this.loader = this.loading.create({
      content: 'Suppression de la boutique...'
    })
    this.loader.present();
    this.storeService.deleteStore(this.store.$key).then(() => {
      this.loader.dismiss();
      this.navCtrl.push('StoreListPage');
    })
  }

  goToProduct(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product,
      store: this.store
    });
  }
}
