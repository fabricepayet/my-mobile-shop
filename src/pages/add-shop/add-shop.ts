import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { Camera } from '@ionic-native/camera';
import { ShopService } from '../../providers/shop.service';
import { ImageService } from '../../providers/image.service';
import { LoadingController, Loading } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-shop',
  templateUrl: 'add-shop.html',
})
export class AddShopPage {

  shop = {} as Shop;
  private bannerData: string;
  private logoData: string;
  private loader: Loading;

  constructor(
  private shopService: ShopService,
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

  addShop() {
    this.navCtrl.setRoot('ShopListPage')
    this.loader.present();
    this.shopService.addShop(this.shop, this.bannerData, this.logoData).then(() => {
      this.loader.dismiss()
      this.navCtrl.push('ShopListPage');
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
