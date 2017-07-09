import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shop } from '../../models/shop.interface';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-shop-map',
  templateUrl: 'shop-map.html',
})
export class ShopMapPage {
  shop: Shop;
  topBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private googleMaps: GoogleMaps) {
    this.topBarElement = document.querySelector('.tabbar .show-tabbar');
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);
    let shop: LatLng = new LatLng(this.shop.latitude,this.shop.longitude);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
       // create new marker
       let markerOptions: MarkerOptions = {
        position: shop,
        title: this.shop.name
       };

       map.addMarker(markerOptions)
       // Now you can add elements to the map like the marker
       // create LatLng object

       // create CameraPosition
       let position: CameraPosition = {
         target: shop,
         zoom: 17,
         tilt: 30
       };

       // move the map's camera to position
       map.moveCamera(position);
     }
    );
  }

  ionViewWillLoad() {
    this.shop = this.navParams.get('shop');
  }

  ionViewDidLoad() {
		document.getElementsByTagName('html')[0].className += 'ion-tabs-fix';
	}

	ionViewWillLeave() {
		document.getElementsByTagName('html')[0].className = '';
	}

  // Load map only after view is initialized
  ngAfterViewInit() {
   this.loadMap();
 }
}
