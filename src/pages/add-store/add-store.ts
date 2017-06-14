import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '../../models/store.interface';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { StoreService } from '../../providers/store.service';
import { LoadingController, Loading } from 'ionic-angular';

/**
 * Generated class for the AddStorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-store',
  templateUrl: 'add-store.html',
})
export class AddStorePage {

  store = {} as Store;
  private captureDataUrl: string;
  private loader: Loading;

  constructor(
  private storeService: StoreService,
  public navCtrl: NavController,
  private camera: Camera,
  private loading: LoadingController,
  public navParams: NavParams) {
    this.loader = this.loading.create({
      content: 'Création de la boutique...'
    })
  }

  addStore() {
    this.loader.present();
    this.storeService.addStore(this.store, this.captureDataUrl).then(() => {
      this.loader.dismiss()
      this.navCtrl.push('StoreListPage');
    })
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
