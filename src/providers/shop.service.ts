import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
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
      })
    })
  }

  editShop(shopRef: string, shop: Shop, bannerData: string = null) {
    const shops = this.database.list('/shops')
    if (bannerData) {
      let bannerSrc = `images/shops/${shopRef}/banner.jpg`;
      this.imageService.uploadImage(bannerSrc, bannerData)
      .then((snapshot: any) => {
        if (snapshot) {
          shop.image = snapshot.downloadURL;
          shops.update(shopRef, shop)
        }
      })
    } else {
      shops.update(shopRef, shop);
    }
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

  getShop(shopKey): FirebaseObjectObservable<Shop> {
    return this.database.object(`/shops/${shopKey}`)
  }

  getShopList(query: any = {}): FirebaseListObservable<Shop[]> {
    return this.database.list('shops', {query})
  }
}
