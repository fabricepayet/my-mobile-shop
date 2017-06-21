import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import { ImageService } from './image.service';
import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase, private imageService: ImageService) {
  }

  addProduct(storeKey: string, product: Product, captureData: string): Promise<any> {
    product.timestamp = Date.now();
    return new Promise ((resolve, reject) => {
      let productKey = this.database.list(`/products/${storeKey}`).push({}).key;
      if(captureData) {
        let imgSrc = `images/stores/${storeKey}/products/${productKey}/${Date.now()}.jpg`;
        this.imageService.uploadImage(imgSrc, captureData).then((snapshot: any) => {
          product.image = snapshot.downloadURL;
          this.updateProduct(storeKey, productKey, product).then((data) => {
            resolve(true);
          })
        })
      } else {
        this.updateProduct(storeKey, productKey, product).then((data) => {
          resolve(true);
        })
      }
    })
  }

  updateProduct(storeKey: string, productKey: string, product: Product) {
    var updates = {};
    updates['/products/' + storeKey + '/' + productKey] = product;
    let recentProduct = product;
    return firebase.database().ref('/stores/' + storeKey).once('value').then(function(snapshot) {
      recentProduct.store = snapshot.val();
      recentProduct.storeKey = storeKey;
      updates['/recent-products/' + productKey] = recentProduct;
      return firebase.database().ref().update(updates);
    });

  }

  deleteProduct(productKey: string, storeKey: string) {
    return new Promise((resolve, reject) => {
      //delete data
      let removeRef = firebase.database().ref(`products/${storeKey}`).child(productKey);
      removeRef.remove()
      // delete image
      let storageRef = firebase.storage().ref();
      var imageRef = storageRef.child(`images/stores/${storeKey}/products/${productKey}.jpg`);
      imageRef.delete().then(function() {
        resolve(true)
      }).catch(function(error) {
        reject(error)
      });
    })
  }

  getProductList(storeKey: string): FirebaseListObservable<Product[]> {
    return this.database.list(`products/${storeKey}`)
  }

  getProducts(): FirebaseListObservable<Product[]> {
    return this.database.list('recent-products').map((array) => array.reverse()) as FirebaseListObservable<Product[]>
  }
}
