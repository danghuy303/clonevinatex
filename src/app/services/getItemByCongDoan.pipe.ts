import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'itemByCongDoan', pure: false })
export class GetItemByCongDoanPipe implements PipeTransform {
    transform(value: Array<any>, CongDoan?: any): any {
        if (!!value) {
            if (CongDoan !== undefined && CongDoan !== null) {
                return value.find(ele => ele.MaCongDoan === CongDoan)
            } else {
                return {}
            }
        } else {
            return null;
        }
    }
}