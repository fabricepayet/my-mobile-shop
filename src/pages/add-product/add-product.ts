import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { LoadingController, Loading } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImageService } from '../../providers/image.service'

/**
 * Generated class for the AddProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product = {} as Product;
  store: Store;
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

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
  }

  async addProduct(storeKey: string) {
    this.loader.present();
    this.productService.addProduct(this.store.$key, this.product, this.captureDataUrl).then((data) => {
      this.loader.dismiss()
      this.navCtrl.push('StoreDetailPage', {store: this.store})
    })
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
