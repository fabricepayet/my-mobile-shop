import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase) {
  }

  addProduct(storeKey: string, product: Product, captureData: string): Promise<any> {
    product.timestamp = Date.now();
    return new Promise ((resolve, reject) => {
      let productKey = this.database.list(`/products/${storeKey}`).push({}).key;
      if(captureData) {
        this.uploadPhoto(storeKey, productKey, captureData).then((snapshot: any) => {
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

  // getProduct(productKey): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     firebase.database().ref('/stores/' + productKey).once('value').then((snapshot) => {
  //       let store = snapshot.val()
  //       store.$key = snapshot.key
  //       resolve(store)
  //     }, (err) => {
  //       reject(err);
  //     })
  //   })
  // }

  uploadPhoto(storeKey: string, productKey: string, captureDataUrl: string) {
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/stores/${storeKey}/products/${productKey}.jpg`);
      let parseUpload = imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);
      parseUpload.on('state_changed', (_snapshot) => {
        // console.log('snapshot progress ' + _snapshot);
      }, (_err) => {
        reject(_err);
      }, () => {
        resolve(parseUpload.snapshot);
      })
    })
  }
}
