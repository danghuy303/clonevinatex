import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseFirstletter'
})
export class UppercaseFirstletterPipe implements PipeTransform {

  transform(value: string, arg: any): any {
    if (arg === 'everyfirst') {
      let arr = value.split(" ");
      let newValue = arr
        .map((item, index) => {
          return item.charAt(0).toUpperCase() + item.substring(1, item.length).toLocaleLowerCase();
        })
        .join(" ");
      return newValue;
    }
    if (arg === 'first') {
      let newStr = value.charAt(0).toUpperCase() + value.substring(1, value.length).toLowerCase();
      return newStr
    }
  }

}
