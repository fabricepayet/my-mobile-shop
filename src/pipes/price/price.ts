import { Pipe, PipeTransform } from '@angular/core';
import { _ } from 'underscore';

/**
 * Generated class for the PricePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: string, ...args) {
    let values = value.split('.')
    let res = '<span class="price">' + _.escape(values[0])
    if (values[1]) {
      res +=  '<span class="cents">,' + _.escape(values[1]) + '€</span>'
    } else {
      res += '<span class="cents">€</span>'
    }
    res += '</span>'
    return res
  }
}
