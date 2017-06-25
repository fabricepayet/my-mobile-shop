import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { StoreService } from '../../providers/store.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoadingController, Loading, ToastController } from 'ionic-angular';

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
    public navParams: NavParams,
    private toastController: ToastController) {
  }

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
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
    console.log('goToProduct storeUid', this.store.$key)
    this.navCtrl.push('ProductDetailPage', {
      product: product,
      store: this.store
    });
  }

  likeStore() {
    let toast = this.toastController.create({
      message: 'Hey! I love you too <3',
      duration: 3000
    });
    toast.present();
  }
}
