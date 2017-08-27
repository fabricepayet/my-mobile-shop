import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../providers/product.service';
import { ShopService } from '../../providers/shop.service';
import { AuthService } from '../../providers/auth.service';

@IonicPage({
  segment: 'products'
})
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {
  productList: Product[] = [];
  lastKey: number;
  private townFilter: string;
  private auth;
  private loadComplete:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private shopService: ShopService,
    private authService: AuthService
  ) {
    this.authService.getAuthentificateUser().subscribe(auth => {
      this.auth = auth;
    })
  }

  ionViewWillLoad() {
    // TODO: subscribe for new product to let them reactive
    // search subject rxjs
    // this.productService.getProducts({limitToLast: 1}).subscribe(products => {
    //   products.forEach (product => {
    //     this.productList.unshift(product);
    //   })
    // })
    this.loadOlderProducts();
  }

  addProduct(products, opts:any = {}) {
    this.lastKey = products[products.length - 1].timestamp
    products.forEach(product => {
      this.productList.push(product);
    })
    // we already load all the products all the client
    if (products.length < 10) {
      this.loadComplete = true;
    }
  }

  loadOlderProducts(lastKey: number = null) {
    let query: any = {};
    if (this.townFilter) {
      query.orderByChild = 'shopTown';
      query.equalTo = this.townFilter;
    }
    if (lastKey) {
      query.endAt = lastKey - 1;
    }
    let lastProductsSubscription = this.productService.getProducts(query).subscribe(snapshots => {
      this.addProduct(snapshots);
      lastProductsSubscription.unsubscribe()
    })
  }

  showArticle(product) {
    let shop = product.shop
    delete product.shop;
    this.navCtrl.push('ProductDetailPage', {
      shop,
      product,
      productId: product.$key,
      shopId: product.shopRef,
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
    this.loadOlderProducts(this.lastKey);
    setTimeout(() => {
      infiniteScroll.complete();
      if (this.loadComplete) {
        infiniteScroll.enable(false);
      }
    }, 300);
  }
}
