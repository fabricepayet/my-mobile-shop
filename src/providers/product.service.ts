import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';
import { ImageService } from './image.service';
import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase, private imageService: ImageService) {
  }

  addProduct(shopKey: string, product: Product, captureData: string): Promise<any> {
    product.timestamp = Date.now();
    let productKey = this.database.list(`/products/${shopKey}`).push({}).key;
    if(captureData) {
      let imgSrc = `images/shops/${shopKey}/products/${productKey}/${Date.now()}.jpg`;
      this.imageService.uploadImage(imgSrc, captureData).then((snapshot: any) => {
        product.image = snapshot.downloadURL;
        return this.updateProduct(shopKey, productKey, product)
      })
    } else {
      return this.updateProduct(shopKey, productKey, product)
    }
  }

  updateProduct(shopKey: string, productKey: string, product: Product): Promise<void> {
    product.shopRef = shopKey;
    return this.database.object(`/products/${shopKey}/${productKey}`).set(product) as Promise<void>
  }

  deleteProduct(product: Product) {
    return new Promise((resolve, reject) => {
      //delete data
      let removeRef = firebase.database().ref(`products/${product.shopRef}`).child(product.$key);
      removeRef.remove()
      // delete image
      let storageRef = firebase.storage().ref();
      var imageRef = storageRef.child(`images/shops/${product.shopRef}/products/${product.$key}.jpg`);
      imageRef.delete().then(function() {
        resolve(true)
      }).catch(function(error) {
        reject(error)
      });
    })
  }

  getProductList(shopKey: string): FirebaseListObservable<Product[]> {
    return this.database.list(`products/${shopKey}`)
  }

  getProducts(): FirebaseListObservable<Product[]> {
    return this.database.list('recent-products').map((array) => array.reverse()) as FirebaseListObservable<Product[]>
  }

  getRelatedShop(product) {
    return this.database.object(`/shops/${product.shopRef}`)
  }
}
