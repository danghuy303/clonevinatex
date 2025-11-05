import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'CongDoan',pure:false})
export class CongDoanPipe implements PipeTransform {
  transform(value: Array<any>,CongDoan?:any): Array<any> {
    if(!!value){
      if(CongDoan!==undefined&& CongDoan!==null){
        return value.filter(ele=>ele.isXoa!== true && (ele.CongDoan || ele.MaCongDoan)===CongDoan)
      }else{
        return value.filter(ele=>ele.isXoa!== true);
      }
    }else{
      return null;
    }
  }
}