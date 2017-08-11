import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { Profile } from '../../models/profile.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { LoadingController, Loading, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {
  shop: Shop;
  productList: FirebaseListObservable<Product[]>;
  shopPhotoUrl: string;
  private loader: Loading;
  private profile: Profile;

  constructor(
    private loading: LoadingController,
    private shopService: ShopService,
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastController: ToastController) {
  }

  shopMap() {
    this.navCtrl.push('ShopMapPage', {
      shop: this.shop
    })
  }

  ionViewWillLoad() {
    this.shop = this.navParams.get('shop');
    if (!this.shop) {
      console.log('redirection sur ShopListPage')
      return this.navCtrl.setRoot('ShopListPage')
    }
    this.profile = this.navParams.get('profile');
    console.log('this.profile', this.profile);
    this.productList = this.productService.getProductList(this.shop.$key);
  }

  addProduct() {
    this.navCtrl.push('AddProductPage', {
      shop: this.shop
    });
  }

  navigateToReservationPage() {
    this.navCtrl.push('ReservationPage')
  }

  deleteShop() {
    this.loader = this.loading.create({
      content: 'Suppression de la boutique...'
    })
    this.loader.present();
    this.shopService.deleteShop(this.shop.$key).then(() => {
      this.loader.dismiss();
      this.navCtrl.push('ShopListPage');
    })
  }

  goToProduct(product: Product) {
    this.navCtrl.push('ProductDetailPage', {
      product: product,
      shop: this.shop
    });
  }

  editShop(shop) {
    this.navCtrl.push('EditShopPage', {shop})
  }
}
