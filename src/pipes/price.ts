import { Pipe, PipeTransform } from '@angular/core';
import { _ } from 'underscore';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: any, ...args) {
    if (typeof(value) === 'number') {
      value = value.toString();
    }
    let values = value.split('.')
    let res = '<span class="price">' + _.escape(values[0])
    let cents = values[1]
    if (cents) {
      if (cents.length == 1) {
        cents += '0'
      }
      res +=  '<span class="cents">,' + _.escape(cents) + '€</span>'
    } else {
      res += '<span class="cents">€</span>'
    }
    res += '</span>'
    return res
  }
}
