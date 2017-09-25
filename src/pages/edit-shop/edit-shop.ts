import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service'
import { GeolocService } from '../../providers/geoloc.service'
import { ImageService } from '../../providers/image.service';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {

  shop: Shop;
  bannerData: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shopService: ShopService,
    private toastController: ToastController,
    private geolocService: GeolocService,
    public actionSheetCtrl: ActionSheetController,
    private imageService: ImageService,
    private camera: Camera,
  ) {
    this.shop = this.navParams.get('shop');
  }

  editShop() {
    let newShop: Shop = {
      name: this.shop.name,
      town: this.shop.town,
    }
    if (this.shop.description) {
      newShop.description = this.shop.description
    }
    if (this.shop.longitude) {
      newShop.longitude = this.shop.longitude
    }
    if (this.shop.latitude) {
      newShop.latitude = this.shop.latitude
    }
    if (this.shop.phone) {
      newShop.phone = this.shop.phone
    }
    if (this.shop.email) {
      newShop.email = this.shop.email
    }
    if (this.bannerData) {
      this.shopService.editShop(this.shop.$key, newShop, this.bannerData)
    } else {
      this.shopService.editShop(this.shop.$key, newShop)
    }
    this.navCtrl.pop()
  }

  getPosition() {
    this.geolocService.getCurrentPosition().then((coords: Coordinates) => {
      this.shop.longitude = coords.longitude;
      this.shop.latitude = coords.latitude;
      this.toastController.create({
        message: 'Coordonnées mises à jour',
        duration: 3000
      }).present()
    }).catch(error => {
      this.toastController.create({
        message: error.message,
        duration: 3000
      }).present()
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
