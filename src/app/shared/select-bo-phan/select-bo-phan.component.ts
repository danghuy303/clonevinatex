import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { mapTreeForDropDown } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-select-bo-phan',
  templateUrl: './select-bo-phan.component.html',
  styleUrls: ['./select-bo-phan.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoPhanComponent),
      multi: true
    }
  ]
})
export class SelectBoPhanComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() ngModel: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() placeholder: string = 'Chọn bộ phận';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = true;
  @Input() filter: boolean = true;
  @Input() options: any[];
  @Input() IdDuAn: any;
  @Input() styleClass: string = 'w-100 p-inputtext-sm';

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  listOptions: any[] = [];
  innerValue: any = null;

  private onChangeCb: (_: any) => void = () => {};
  private onTouchedCb: () => void = () => {};

  constructor(private _serviceTaiSan: TaisanService) {}

  ngOnInit(): void {
    if (this.options && this.options.length) {
      this.processOptions(this.options);
    } else {
      this.loadData();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options'] && this.options) {
      this.processOptions(this.options);
    }
    if (changes['ngModel']) {
      this.innerValue = this.ngModel;
    }
  }

  loadData(): void {
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS(this.IdDuAn).subscribe((res: any) => {
      this.processOptions(res);
    });
  }

  processOptions(data: any[]): void {
    if (!data) {
      this.listOptions = [];
      return;
    }
    if (data.length && data[0] && data[0].level !== undefined) {
      this.listOptions = data;
    } else {
      this.listOptions = mapTreeForDropDown(data, 'Ten', 'Id');
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(val: any) {
    this.innerValue = val;
    this.onChangeCb(val);
    this.onTouchedCb();
    this.ngModelChange.emit(val);
  }

  onDropdownChange(event: any): void {
    this.value = event.value;
    this.onChange.emit(event);
  }

  writeValue(val: any): void {
    this.innerValue = val;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
