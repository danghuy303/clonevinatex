import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbykeyCongDoan'
})
export class FilterbykeyCongDoanPipe implements PipeTransform {

        transform(value: any, Key: string, keyWord: string): Array<any> {   
                if (!!value) {
                        if (keyWord !== null && keyWord !== undefined && keyWord.trim() !== '') {
                                return value.filter(ele => ele.MaCongDoan === keyWord       
                                );
                        }
                        else {
                                return value;
                        }
                } else {
                        return null;
                }
        }

}
