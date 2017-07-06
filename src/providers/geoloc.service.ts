import  { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Coordinates } from '@ionic-native/geolocation';

@Injectable()
export class GeolocService {
  constructor(private geolocation: Geolocation) {
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        console.debug(resp)
        resolve(resp.coords as Coordinates)
      }).catch((error) => {
        console.debug(error);
        reject(error)
      });
    })
  }
}
