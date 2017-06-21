import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Store } from '../../models/store.interface';
import { Camera } from '@ionic-native/camera';
import { StoreService } from '../../providers/store.service';
import { ImageService } from '../../providers/image.service';
import { LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-store',
  templateUrl: 'add-store.html',
})
export class AddStorePage {

  store = {} as Store;
  private bannerData: string;
  private logoData: string;
  private loader: Loading;

  constructor(
  private storeService: StoreService,
  private imageService: ImageService,
  public navCtrl: NavController,
  private camera: Camera,
  private loading: LoadingController,
  public navParams: NavParams,
  public actionSheetCtrl: ActionSheetController) {
    this.loader = this.loading.create({
      content: 'Création de la boutique...'
    })
  }

  addStore() {
    this.navCtrl.setRoot('StoreListPage')
    this.loader.present();
    this.storeService.addStore(this.store, this.bannerData, this.logoData).then(() => {
      this.loader.dismiss()
      this.navCtrl.push('StoreListPage');
    })
  }

  loadLogo() {
    this.imageService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then((imageData) => {
      this.logoData = imageData;
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
              this.bannerData = imageData;
            })
          }
        },
        {
          text: 'Utiliser la Camera',
          handler: () => {
            this.imageService.takePicture(this.camera.PictureSourceType.CAMERA).then((imageData) => {
              this.bannerData = imageData;
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
