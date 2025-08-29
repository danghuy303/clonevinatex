import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbykeyCongDoan'
})
export class FilterbykeyCongDoanPipe implements PipeTransform {

        transform(value: any, keyWord: string): Array<any> {   
                console.log('value',value);
                  console.log('keyWord',keyWord);
                if (!!value) {
                        if (keyWord !== null && keyWord !== undefined && keyWord.trim() !== '') {
                                return value.filter(ele =>( ele.MaCongDoan || ele.CongDoan) === keyWord       
                                );
                        }
                        else {
                                return value;
                        }
                } else {
                        return [];
                }
        }

}
