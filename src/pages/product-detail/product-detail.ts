import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { LoadingController, Loading } from 'ionic-angular';

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
  private loader: Loading;

  constructor(
    private loading: LoadingController,
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
    this.store = this.navParams.get('store');
  }

  deleteProduct() {
    this.loader = this.loading.create({
      content: 'Suppression du produit...'
    })
    this.loader.present();
    this.productService.deleteProduct(this.product.$key, this.store.$key).then(() => {
      this.loader.dismiss()
      this.navCtrl.push('StoreDetailPage', {store: this.store})
    })
  }
}
