import  { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class ImageService {
  constructor(private camera: Camera) {

  }

  takePicture(sourceType): Promise<any> {
    const OPTIONS: CameraOptions = {
      quality: 50,
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
}
