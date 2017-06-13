import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase) {
  }

  async addProduct(storeKey: string, product: Product, captureData: string) {
    let productKey = this.database.list(`/products/${storeKey}`).push(product).key;
    if(captureData) {
      await this.uploadPhotoForProduct(storeKey, productKey, captureData);
    }
  }

  getProductList(storeKey: string): FirebaseListObservable<Product[]> {
    return this.database.list(`products/${storeKey}`)
  }

  async uploadPhotoForProduct(storeKey: string, productKey: string, captureDataUrl: string) {
    let storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/stores/${storeKey}/products/${productKey}.jpg`);
    await imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
  }
}
