import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: string;
  tab2Root: string;
  tab3Root: string;

  constructor() {
    this.tab1Root = 'StoreListPage';
    this.tab2Root = 'ProductListPage';
    this.tab3Root = 'ReservationPage';
  }

  tabChanged($ev){
    console.log('tab switch', $ev)
    // $ev.setRoot($ev.root)
  }
}
