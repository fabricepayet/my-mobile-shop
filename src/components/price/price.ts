import { Component, Input, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'price-component',
  templateUrl: 'price.html'
})

export class PriceComponent {
  @Input() product: Product;

  constructor() {
  }
}
