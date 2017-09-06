import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../providers/product.service';
import { PriceComponent } from '../price/price';
import { FirebaseListObservable } from 'angularfire2/database';
import { NavController } from 'ionic-angular'

@Component({
  selector: 'discover-products-component',
  templateUrl: 'discover-products.html',
})

export class DiscoverProductsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  // relatedProductList: Product[];
  relatedProductList: FirebaseListObservable<Product[]>;
  title: string;

  constructor(
    private productService: ProductService,
    private navCtrl: NavController,
  ){}

  ngOnInit() {
    if (this.type === 'shop') {
      this.title = 'A découvrir dans la même boutique'
      this.relatedProductList = this.productService.getProductsListForShop(this.product.shopRef, {
        orderByChild: 'timestamp',
        limitToLast: 4,
      })
    // } else if (this.type === 'category') {
    //   this.title = 'Dans la même catégorie'
    //   this.relatedProductList = this.productService.getProducts({
    //     orderByChild: 'category',
    //     equalTo: this.product.category,
    //     limitToLast: 4,
    //   })
    } else {
      this.title = 'A découvrir aussi'
      this.relatedProductList = this.productService.getProducts({
        orderByChild: 'soldOut',
        equalTo: {value: true, key: 'soldOut'},
        limitToLast: 4,
      })
    }
  }

  showArticle(product, shop) {
    this.navCtrl.push('ProductDetailPage', {
      product,
      shopId: product.shopRef,
      productId: product.$key,
    });
    this.navCtrl.remove(1);
  }
}
