import { Pipe } from '@angular/core';
import { formatLocaleNumber } from './globalfunction';
@Pipe({
    name: 'NumSep'
})
export class VNDPipe {
    transform(value: any): string {
        if (value !== null && value !== undefined && value !== '') {
            const formatted = formatLocaleNumber(value);
            return formatted !== '' ? formatted : value.toString();
        }
        else{
            return ''
        }
    }
}