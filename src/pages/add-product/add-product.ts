import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { ProductService } from '../../providers/product.service';
import { LoadingController, Loading } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImageService } from '../../providers/image.service'

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product = {} as Product;
  shop: Shop;
  private captureDataUrl: string;
  private loader: Loading;

  constructor(
    private productService: ProductService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private loading: LoadingController,
    private imageService: ImageService,
    private actionSheetCtrl: ActionSheetController) {
      this.loader = this.loading.create({
        content: 'Création du produit...'
      })
  }

  priceDisplayed() {
    if (!this.product.discount) {
      return this.product.price
    }
    let newPrice = this.product.price - (this.product.price * this.product.discount / 100)
    return Math.ceil(newPrice * 10) / 10
  }

  ionViewWillLoad() {
    this.shop = this.navParams.get('shop');
  }

  async addProduct(shopKey: string) {
    this.navCtrl.setRoot('ShopListPage')
    this.loader.present();
    this.product.shopRef = this.shop.$key;
    this.product.shopTown = this.shop.town;
    this.product.shopName = this.shop.name;
    this.product.finalPrice = this.priceDisplayed();
    try {
      await this.productService.addProduct(this.product, this.captureDataUrl)
      this.loader.dismiss();
      this.navCtrl.pop();
    } catch (e) {
      console.error(e);
    }
  }

  takePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ajouter une photo',
      buttons: [
        {
          text: 'Depuis la Gallerie',
          handler: () => {
            this.imageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((imageData) => {
              this.captureDataUrl = imageData;
            })
          }
        },
        {
          text: 'Utiliser la Camera',
          handler: () => {
            this.imageService.takePicture(this.camera.PictureSourceType.CAMERA).then((imageData) => {
              this.captureDataUrl = imageData;
            })
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
}
