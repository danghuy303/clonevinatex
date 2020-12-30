import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Dat09Component),
  multi: true
};

@Component({
  selector: 'app-dat09',
  templateUrl: './dat09.component.html',
  providers: [VALUE_ACCESSOR],
  styleUrls: ['./dat09.component.css']
})
export class Dat09Component implements ControlValueAccessor {
  @Input() label: string = "Nhập số";
  @Input() required: boolean = true;
  private _value: string = '';
  private preValue: string = '';
  private editing: boolean = false;
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

  onBlur($event: Event) {
    this.editing = false;
    if (this._value == "") {
      this._value = "_";
    }
  }
  onEnter($event: Event) {
    this.editing = false;
    if (this._value == "") {
      this._value = "_";
    }
  }

  beginEdit(value) {
    this.preValue = value;
    this.editing = true;
  }
}
