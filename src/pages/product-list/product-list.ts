import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  productList: Product[] = [];
  lastKey: number;
  private a = 3;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private shopService: ShopService) {
  }

  addProduct(products) {
    console.log(' je rajoute product', products.length);
    products.forEach(product => {
      this.productList.push(product);
      this.lastKey = product.timestamp;
      console.log('timestamp', product.timestamp);
    })
    console.log('last timestamp is', this.lastKey);
  }

  loadRecentProducts(lastKey: number = null) {
    let query: any = {};
    if (lastKey) {
      query.endAt = lastKey - 1;
    }
    this.productService.getProducts(query).subscribe(snapshots => {
      this.addProduct(snapshots);
    })
  }

  ionViewWillLoad() {
    this.loadRecentProducts(this.lastKey);
  }

  gotoShop(product) {
    this.shopService.getShop(product.shopRef).then(shop => {
      this.navCtrl.push('ShopDetailPage', {shop})
    })
  }

  gotoProduct(product) {
    let shop = product.shop
    delete product.shop;
    this.navCtrl.push('ProductDetailPage', {
      shop, product
    })
  }

  filterTownChanged(town) {
    // if (town === 'all') {
    //   this.productList = this.productService.getProducts({})
    // } else {
    //   this.productList = this.productService.getProducts({
    //     orderByChild: 'shopTown',
    //     equalTo: town
    //   })
    // }
  }

  navigateToReservationPage() {
    this.navCtrl.push('ReservationPage')
  }

  doInfinite(infiniteScroll) {
    this.loadRecentProducts(this.lastKey);
    setTimeout(() => {
      this.a += 1;
      infiniteScroll.complete();
    }, 500);
  }
}
