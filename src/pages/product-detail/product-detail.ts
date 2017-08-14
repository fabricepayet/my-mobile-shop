import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Reservation } from '../../models/reservation.interface';
import { ProductService } from '../../providers/product.service';
import { ReservationService } from '../../providers/reservation.service';
import { AuthService } from '../../providers/auth.service';
import { LoadingController, Loading, AlertController, ToastController } from 'ionic-angular';

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
  private relatedProductList: FirebaseListObservable<Product[]>;
  private countdown: number;
  private auth;

  constructor(
    private loading: LoadingController,
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertController: AlertController,
    private toastController: ToastController,
    private reservationService: ReservationService,
    private authService: AuthService,
    private modalController: ModalController
  ) {
      this.countdown = 10000;
      let countdownCount = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown = this.countdown - 1
        } else {
          clearInterval(countdownCount);
        }
      }, 1000);
      this.authService.getAuthentificateUser().subscribe(auth => {
        this.auth = auth;
      })
  }

  ionViewWillLoad() {
    this.product = this.navParams.get('product');
    this.shop = this.productService.getRelatedShop(this.product);
    this.relatedProductList = this.productService.getProductList(this.product.shopRef, {orderByChild: 'timestamp', limitToLast: 4})
    // this.currentReservation = this.reservationService.getReservationForProductForCurrentUser(this.product)
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

  openReservationModal() {
    this.modalController.create('ReservationModalPage', { product: this.product }).present()
  }

  openReservationConfirmbox() {
    let confirm = this.alertController.create({
      title: 'Réservation',
      message: 'Êtes-vous sûr de vouloir réserver cet article ?',
      buttons: [
        {
          text: 'Annuler'
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
    }).present();
  }

  reserveThisProduct() {
    const authObserver = this.authService.getAuthentificateUser().subscribe(auth => {
      if (!auth) {
        this.modalController.create('LoginPage', {
          message: 'Une authentification est requise',
          onLogin: this.openReservationConfirmbox.bind(this)
        }).present();
        authObserver.unsubscribe();
      } else {
        this.openReservationConfirmbox()
        authObserver.unsubscribe()
      }
    })
  }

  navigateToReservationPage() {
    this.navCtrl.push('ReservationPage')
  }

  calculReduction() {
    return this.product.price - this.product.finalPrice;
  }

  showArticle(product, shop) {
    this.navCtrl.push('ProductDetailPage', {
      product, shop
    })
    this.navCtrl.remove(1);
  }
}
