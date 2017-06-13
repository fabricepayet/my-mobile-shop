import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '../../models/store.interface';
import { StoreService } from '../../providers/store.service';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the StoreListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store-list',
  templateUrl: 'store-list.html',
})
export class StoreListPage {

  storeList: FirebaseListObservable<Store[]>;

  constructor(private storeService: StoreService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getStoreList();
  }

  goToStore(store) {
    this.navCtrl.push('StoreDetailPage', {
      store: store
    });
  }

  addStore() {
    this.navCtrl.push('AddStorePage');
  }

  getStoreList() {
    this.storeList = this.storeService.getStoreList()
  }
}
