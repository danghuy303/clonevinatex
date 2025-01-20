import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caltu'
})
export class CaltuPipe implements PipeTransform {

  transform(value: Array<any>, Key?: any): any {
    console.log('value', value);

    return value.reduce((Total, ele) => Total + (ele[Key] || 0), 0);
  }

}
