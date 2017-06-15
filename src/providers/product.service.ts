import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase) {
  }

  addProduct(storeKey: string, product: Product, captureData: string): Promise<any> {
    return new Promise ((resolve, reject) => {
      let productKey = this.database.list(`/products/${storeKey}`).push(product).key;
      if(captureData) {
        this.uploadPhoto(storeKey, productKey, captureData).then((snapshot: any) => {
          product.image = snapshot.downloadURL;
          this.updateProduct(storeKey, productKey, product).then((data) => {
            resolve(true);
          })
        })
      } else {
        resolve(true)
      }
    })
  }

  updateProduct(storeKey: string, productKey: string, product: Product) {
    return new Promise((resolve, reject) => {
      let updateRef = firebase.database().ref(`products/${storeKey}`).child(productKey);
      updateRef.update(product);
      resolve(true)
    })
  }

  getProductList(storeKey: string): FirebaseListObservable<Product[]> {
    return this.database.list(`products/${storeKey}`)
  }

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
