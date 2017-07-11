import { Component, Output, EventEmitter } from '@angular/core';
import { Shop } from '../../models/shop.interface'

@Component({
  selector: 'shop-form-component',
  templateUrl: 'shop-form.html'
})

export class ShopFormComponent {
  @Output() existingProfile: EventEmitter<Shop>;

  constructor() {
  }
}
