import  { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Store } from '../models/store.interface';
import firebase from 'firebase';

@Injectable()
export class StoreService {
  constructor(private database: AngularFireDatabase) {

  }

  addStore(store: Store, captureData: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let newStoreKey = this.database.list(`stores`).push(store).key;
      if(captureData) {
        this.uploadPhoto(newStoreKey, captureData).then((snapshot: any) => {
          store.image = snapshot.downloadURL;
          this.updateStore(newStoreKey, store).then((data) => {
            console.log('addStore is resolved!')
            resolve(true);
          })
        })
      } else {
        resolve(true)
      }
    })
  }

  updateStore(storeKey: string, store: Store) {
    return new Promise((resolve) => {
     var updateRef = firebase.database().ref('stores').child(storeKey);
     updateRef.update(store);
     console.log('Update Store is resolved');
     resolve(true);
   });
  }

  getStoreList(): FirebaseListObservable<Store[]> {
    return this.database.list(`stores`)
  }

  uploadPhoto(storeKey: string, captureDataUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/stores/${storeKey}/banner.jpg`);
      let parseUpload = imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);

      parseUpload.on('state_changed', (_snapshot) => {
        console.log('snapshot progress ' + _snapshot);
      }, (_err) => {
        reject(_err);
      }, () => {
        console.log('uploadPhoto is resolved!');
        resolve(parseUpload.snapshot);
      })
    })
  }
}
