import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product.interface';

@Injectable()
export class ProductService {
  constructor(private database: AngularFireDatabase) {
  }

  async addProduct(storeKey: string, product: Product) {
    console.log('Pushing product un store database', storeKey, product);
    await this.database.list(`/products/${storeKey}`).push(product);
  }

  getProductList(storeKey: string): FirebaseListObservable<Product[]> {
    return this.database.list(`products/${storeKey}`)
  }
}
