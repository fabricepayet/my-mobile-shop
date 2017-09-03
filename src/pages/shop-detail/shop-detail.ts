import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { Profile } from '../../models/profile.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { LoadingController, Loading, ToastController, AlertController } from 'ionic-angular';
import { ReservationService } from '../../providers/reservation.service';

@IonicPage()
@Component({
  selector: 'page-shop-detail',
  templateUrl: 'shop-detail.html',
})
export class ShopDetailPage {
  shop: Shop;
  productList: FirebaseListObservable<Product[]>;
  reservationsList = [];
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
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private reservationService: ReservationService,
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
    this.productList = this.productService.getProductsListForShop(this.shop.$key);
    this.reservationService.getReservationsForShop(this.shop.$key).subscribe(snapshots => {
      this.reservationsList = snapshots
      snapshots.forEach(snapshot => {
        this.reservationsList[snapshot.$key] = snapshot
      })
    })
    // this.reservationsList = this.reservationService.getReservationsForShop(this.shop.$key);
  }

  getReservationsCountForProduct(product) {
    let productReservations = this.reservationsList[product.$key]
    if (productReservations) {
      return productReservations.count
    } else {
      return 0
    }
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
            this.productService.updateProduct(product.$key, product.shopRef, {
              soldOut: true
            })
          }
        },
        {
          text: 'Marquer comme en stock',
          handler: () => {
            this.productService.updateProduct(product.$key, product.shopRef, {
              soldOut: false
            })
          }
        },
        {
          text: 'Supprimer le produit',
          handler: () => {
            this.alertController.create({
              title: 'Suppression définitive',
              message: 'Êtes-vous sûr de vouloir supprimer définitivement cet article ?',
              buttons: [
                {
                  text: 'Annuler',
                  handler: () => {
                  }
                },
                {
                  text: 'Supprimer',
                  handler: () => {
                    this.productService.deleteProduct(product)
                  }
                }]
            }).present();
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
