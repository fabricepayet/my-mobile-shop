import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Store } from '../models/store.interface';
import firebase from 'firebase';

@Injectable()
export class StoreService {
  constructor(private database: AngularFireDatabase) {

  }

  async addStore(store: Store, captureData: string) {
    let newStoreKey = this.database.list(`stores`).push(store).key;
    if(captureData) {
      await this.uploadPhotoForStore(newStoreKey, captureData)
    }
  }

  getStoreList(): FirebaseListObservable<Store[]> {
    return this.database.list(`stores`)
  }

  async uploadPhotoForStore(storeKey: string, captureDataUrl: string) {
    let storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(`images/stores/${storeKey}/banner.jpg`);
    await imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL)
  }
}
