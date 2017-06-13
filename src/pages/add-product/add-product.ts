import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { Store } from '../../models/store.interface';
import { ProductService } from '../../providers/product.service';
import { LoadingController, Loading } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    private loading: LoadingController) {
      this.loader = this.loading.create({
        content: 'Création du produit...'
      })
  }

  ionViewWillLoad() {
    this.store = this.navParams.get('store');
  }

  async addProduct(storeKey: string) {
    this.loader.present();
    await this.productService.addProduct(this.store.$key, this.product, this.captureDataUrl);
    this.loader.dismiss()
    this.navCtrl.push('StoreDetailPage', {store: this.store})
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log('error', err)
    });
  }
}
