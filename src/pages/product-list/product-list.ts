import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../models/product.interface';
import { Shop } from '../../models/shop.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';

/**
 * Generated class for the ProductListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  private productList: FirebaseListObservable<Product[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private shopService: ShopService) {
  }

  ionViewWillLoad() {
    this.productList = this.productService.getProducts()
  }

  gotoShop(product) {
    let shop: Shop = product.shop
    shop.$key = product.shopRef
    this.navCtrl.push('ShopDetailPage', {shop})
  }

  gotoProduct(product) {
    let shop = product.shop
    delete product.shop;
    this.navCtrl.push('ProductDetailPage', {
      shop, product
    })
  }

  filterTypeChanged(event) {
    console.log(event);
  }

  filterTownChanged(town) {
    if (town === 'all') {
      this.productList = this.productService.getProducts({})
    } else {
      this.productList = this.productService.getProducts({
        orderByChild: 'shopTown',
        equalTo: town
      })
    }
  }
}
