import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { Shop } from '../../models/shop.interface';
import { ShopService } from '../../providers/shop.service';
import { FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'shop-info-component',
  templateUrl: 'shop-info.html'
})

export class ShopInfoComponent implements OnInit {
  @Input() shopId: string;
  shop: FirebaseObjectObservable<Shop>;

  constructor(
    private shopService: ShopService
  ) {
  }

  ngOnInit() {
    this.shop = this.shopService.getShop(this.shopId)
  }
}
