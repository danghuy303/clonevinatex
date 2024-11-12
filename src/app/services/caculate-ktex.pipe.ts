import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caculateKtex'
})
export class CaculateKtexPipe implements PipeTransform {

  transform(data: any): any {
    let result = 1 / (data.Ne * 1.693);
    return (result || 0).toFixed(3);
  }

}
