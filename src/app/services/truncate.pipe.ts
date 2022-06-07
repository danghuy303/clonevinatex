import { Pipe, PipeTransform } from '@angular/core';
import { validVariable } from './globalfunction';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number): any {
    // limit = limit ? limit : 25;
    if (validVariable(value)) {
      if (value.length > limit) {
        return value.substring(0, limit) + "...";
      } else return value
    }else{
      return value
    }


  }

}
