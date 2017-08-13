import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdowntimer',
})
export class CountdownPipe implements PipeTransform {
  transform(value: any, ...args) {
    let remaining = value;
    let hours = Math.trunc(remaining / 3600);
    remaining = remaining - (hours * 3600);
    let minutes = Math.trunc(remaining / 60)
    remaining = remaining - (minutes * 60);
    let seconds = remaining
    let res = ''
    if (hours == 0) {
      res += '00'
    } else if (hours < 10) {
      res += '0' + hours
    } else {
      res += hours
    }
    res += ':'
    if (minutes == 0) {
      res += '00'
    } else if (minutes < 10) {
      res += '0' + minutes
    } else {
      res += minutes
    }
    res += ':'
    if (seconds < 10) {
      res += '0'
    }
    res += seconds
    return res
  }
}
