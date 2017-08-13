import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  private townFilter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private shopService: ShopService) {
  }

  ionViewWillLoad() {
    this.loadRecentProducts(this.lastKey);
  }

  addProduct(products) {
    products.forEach(product => {
      this.productList.push(product);
      this.lastKey = product.timestamp;
    })
  }

  loadRecentProducts(lastKey: number = null) {
    let query: any = {};
    if (this.townFilter) {
      query.orderByChild = 'shopTown';
      query.equalTo = this.townFilter;
    }
    if (lastKey) {
      query.endAt = lastKey - 1;
    }
    this.productService.getProducts(query).subscribe(snapshots => {
      this.addProduct(snapshots);
    })
  }

  showArticle(product) {
    let shop = product.shop
    delete product.shop;
    this.navCtrl.push('ProductDetailPage', {
      shop, product
    })
  }

  filterTownChanged(town) {
    let query: any = {};
    if (town === 'all') {
      this.townFilter = null;
    } else {
      this.townFilter = town;
      query.orderByChild = 'shopTown';
      query.equalTo = town;
    }

    this.productService.getProducts(query).subscribe(snapshots => {
      this.productList = snapshots;
    })
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
