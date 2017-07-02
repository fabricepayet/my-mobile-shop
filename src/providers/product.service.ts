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
    let productKey = this.database.list(`/products/${storeKey}`).push({}).key;
    if(captureData) {
      let imgSrc = `images/stores/${storeKey}/products/${productKey}/${Date.now()}.jpg`;
      this.imageService.uploadImage(imgSrc, captureData).then((snapshot: any) => {
        product.image = snapshot.downloadURL;
        return this.updateProduct(storeKey, productKey, product)
      })
    } else {
      return this.updateProduct(storeKey, productKey, product)
    }
  }

  updateProduct(storeKey: string, productKey: string, product: Product): Promise<void> {
    product.storeRef = storeKey;
    return this.database.object(`/products/${storeKey}/${productKey}`).set(product) as Promise<void>
  }

  deleteProduct(product: Product) {
    return new Promise((resolve, reject) => {
      //delete data
      let removeRef = firebase.database().ref(`products/${product.storeRef}`).child(product.$key);
      removeRef.remove()
      // delete image
      let storageRef = firebase.storage().ref();
      var imageRef = storageRef.child(`images/stores/${product.storeRef}/products/${product.$key}.jpg`);
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

  getRelatedStore(product) {
    return this.database.object(`/stores/${product.storeRef}`)
  }
}
