import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
        name: 'equalByKey', pure: false
})
export class EqualByKeyPipe implements PipeTransform {
        transform(value: any, Key: string, keyWord: string): Array<any> {
                if (!!value) {
                        if (keyWord !== null && keyWord !== undefined && keyWord.trim() !== '') {
                                return value.filter(ele => ele[Key].toString()
                                        .toLowerCase() === keyWord.toLowerCase()
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