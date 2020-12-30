import { forwardRef, Input } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TrangthaimaysanxuatComponent),
  multi: true
};
@Component({
  selector: 'app-trangthaimaysanxuat',
  templateUrl: './trangthaimaysanxuat.component.html',
  styleUrls: ['./trangthaimaysanxuat.component.css'],
  providers:[VALUE_ACCESSOR]
})
export class TrangthaimaysanxuatComponent implements ControlValueAccessor {
  // @Input('IddmMatHang')IddmMatHang:string = null;
  private _value: any = {};
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: any) {
    this._value = value;
  }
  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  changeTinhTrang(){
    this.value.TinhTrang++
  }
  getColor(value){
    if(value!==null){
      if(value.TinhTrang === 0){
        return 'green'
      }
      if(value.TinhTrang === 1){
        return 'yellow'
      }
      if(value.TinhTrang === 2){
        return 'red'
      }
    }
  }
}
