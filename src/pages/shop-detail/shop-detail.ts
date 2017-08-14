import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { Profile } from '../../models/profile.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';
import { FirebaseListObservable } from 'angularfire2/database';
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
    private toastController: ToastController,
    private modalController: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
  }

  openAddProductModal(shop) {
    this.modalController.create('AddProductPage', { shop }).present()
  }

  ionViewWillLoad() {
    this.shop = this.navParams.get('shop');
    if (!this.shop) {
      return this.navCtrl.setRoot('ShopListPage')
    }
    this.profile = this.navParams.get('profile');
    this.productList = this.productService.getProductList(this.shop.$key);
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

  selectProduct(product: Product) {
    let actionSheet = this.actionSheetCtrl.create({
      title: product.name,
      buttons: [
        {
          text: 'Voir le produit',
          handler: () => {
            this.goToProduct(product)
          }
        },
        {
          text: 'Marquer comme épuisé',
          handler: () => {
          }
        },
        {
          text: 'Voir les réservations',
          handler: () => {
          }
        },
        {
          text: 'Annuler',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  editShop(shop) {
    this.navCtrl.push('EditShopPage', {shop})
  }
}
