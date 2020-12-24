import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter', pure: false
})
export class FilterPipe implements PipeTransform {
    transform(value: any, keyWord: string): Array<any> {
        if (!!value) {
            if (keyWord.trim() !== ''&& keyWord!== null &&keyWord!== undefined) {
                return value.filter(ele =>
                    Object.keys(ele).some(
                        k =>
                            ele[k] != null &&
                            ele[k]
                                .toString()
                                .toLowerCase()
                                .includes(keyWord.toLowerCase())
                    )
                );
            }
            else{
                return value;
            }
        } else {
            return null;
        }
    }
}