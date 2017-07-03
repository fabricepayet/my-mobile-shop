import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Shop } from '../models/shop.interface';
import firebase from 'firebase';
import { ImageService } from './image.service';
import "rxjs/add/operator/map";

@Injectable()
export class ShopService {
  constructor(
    private database: AngularFireDatabase,
    private imageService: ImageService) {
  }

  addShop(shop: Shop, bannerData: string, logoData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let newShopKey = this.database.list(`shops`).push({}).key;
      let bannerSrc = `images/shops/${newShopKey}/banner.jpg`;
      this.imageService.uploadImage(bannerSrc, bannerData).then((snapshot: any) => {
        if (snapshot) {
          shop.image = snapshot.downloadURL;
        }
        let logoSrc = `images/shops/${newShopKey}/logo.jpg`;
        this.imageService.uploadImage(logoSrc, logoData).then((snapshot: any) => {
          if (snapshot) {
            shop.logo = snapshot.downloadURL;
          }
          this.updateShop(newShopKey, shop).then((data) => {
            resolve(true);
          })
        })
      })
    })
  }

  updateShop(shopKey: string, shop: Shop) {
    return new Promise((resolve) => {
     var updateRef = firebase.database().ref('shops').child(shopKey);
     updateRef.update(shop);
     resolve(true);
   });
  }

  deleteShop(shopKey: string) {
    return new Promise((resolve, reject) => {
      // get list of products images

      // delete data
      let shopRef = firebase.database().ref(`shops`).child(shopKey);
      shopRef.remove()
      let productRef = firebase.database().ref(`products`).child(shopKey);
      productRef.remove()
      // delete image
      // let storageRef = firebase.storage().ref();
      // var imageRef = storageRef.child(`images/shops/${shopKey}/products/${productKey}.jpg`);
      // imageRef.delete().then(function() {
      //   resolve(true)
      // }).catch(function(error) {
      //   reject(error)
      // });
      resolve(true);
    })
  }

  getShop(shopKey) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/shops/' + shopKey).once('value').then((snapshot) => {
        let shop = snapshot.val()
        shop.$key = snapshot.key
        resolve(shop)
      }, (err) => {
        reject(err);
      })
    })
  }

  getShopList(): FirebaseListObservable<Shop[]> {
    return this.database.list('shops').map((array) => array.reverse()) as FirebaseListObservable<Shop[]>;
  }
}
