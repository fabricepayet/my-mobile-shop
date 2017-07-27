import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { FirebaseObjectObservable } from 'angularfire2/database';
import { Reservation } from '../../models/reservation.interface';
import { ProductService } from '../../providers/product.service';
import { ReservationService } from '../../providers/reservation.service';
import { LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';

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
  shop: FirebaseObjectObservable<Shop>;
  private loader: Loading;
  private currentReservation: FirebaseObjectObservable<Reservation>;

  constructor(
    private loading: LoadingController,
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertController: AlertController,
    private toastController: ToastController,
    private reservationService: ReservationService) {
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
    this.shop = this.productService.getRelatedShop(this.product);
    this.currentReservation = this.reservationService.getReservationForProductForCurrentUser(this.product)
  }

  deleteProduct() {
    let confirm = this.alertController.create({
      title: 'Suppression article',
      message: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.loader = this.loading.create({
              content: 'Suppression du produit...'
            })
            this.loader.present();
            this.productService.deleteProduct(this.product).then(() => {
              this.loader.dismiss()
              this.navCtrl.push('ShopDetailPage', {shop: this.shop})
            })
          }
        }
      ]
    });
    confirm.present();
  }

  reserve() {
    let confirm = this.alertController.create({
      title: 'Réservation',
      message: 'Êtes-vous sûr de vouloir réserver cet article ?',
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Réserver',
          handler: () => {
            this.reservationService.createUserReservation(this.product)
            .then(() => {
              this.toastController.create({
                message: 'Super ! Votre réservation a bien été enregistrée.',
                duration: 3000
              }).present()
              this.navCtrl.push('ReservationPage');
            })
          }
        }
      ]
    });
    confirm.present();
  }

  visitShop() {
    this.navCtrl.push('ShopDetailPage', {shop: this.shop});
  }

  editShop() {
    
  }
}
