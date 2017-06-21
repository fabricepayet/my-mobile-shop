import  { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Injectable()
export class ImageService {
  constructor(private camera: Camera) {

  }

  takePicture(sourceType): Promise<any> {
    const OPTIONS: CameraOptions = {
      quality: 80,
      targetWidth: 800,
      targetHeight: 533,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true
    };
    return new Promise((resolve, reject) => {
      this.camera.getPicture(OPTIONS).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        reject(err);
      })
    })
  }

  uploadImage(imageStr: string, captureDataUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(imageStr);
      let parseUpload = imageRef.putString(captureDataUrl, firebase.storage.StringFormat.DATA_URL);
      parseUpload.on('state_changed', (_snapshot) => {
      }, (err) => {
        reject(err);
      }, () => {
        resolve(parseUpload.snapshot);
      })
    })
  }
}
