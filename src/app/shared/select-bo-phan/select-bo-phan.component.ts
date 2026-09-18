import { Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { mapTreeForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
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
export class SelectBoPhanComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() ngModel: any;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() placeholder: string = 'Chọn bộ phận';
  @Input() disabled: boolean = false;
  @Input() showClear: boolean = true;
  @Input() filter: boolean = true;
  @Input() options: any[];
  @Input() IdDuAn: any;
  @Input() styleClass: string = 'w-100 p-inputtext-sm';
  @Input() style: any;
  @Input() appendTo: any;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  listOptions: any[] = [];
  innerValue: any = null;
  private storeSub!: Subscription;
  private masterList: any[] = [];

  private onChangeCb: (_: any) => void = () => {};
  private onTouchedCb: () => void = () => {};

  constructor(
    private _serviceTaiSan: TaisanService,
    @Optional() private store: StoreService
  ) {}

  ngOnInit(): void {
    if (this.options && this.options.length) {
      this.processOptions(this.options);
    } else {
      this.loadData();
    }

    if (this.store) {
      this.storeSub = this.store.getNhaMay().subscribe(res => {
        if (res && (!this.options || !this.options.length)) {
          this.loadData();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
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
      this.masterList = res || [];
      this.processOptions(res);
    });
  }

  processOptions(data: any[]): void {
    if (!data || !data.length) {
      this.listOptions = [];
      return;
    }
    const hasLevel = data.some(item => item && item.level !== undefined);
    if (hasLevel) {
      this.listOptions = data;
      return;
    }

    const hasParent = data.some(item => item && (item.IdParent !== undefined || item.idParent !== undefined));
    if (hasParent) {
      this.listOptions = mapTreeForDropDown(data, 'Ten', 'Id');
      return;
    }

    // Nếu options truyền vào bị thiếu IdParent, dùng master list để bổ sung IdParent
    if (this.masterList && this.masterList.length) {
      this.enrichAndMapTree(data, this.masterList);
    } else {
      this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS(this.IdDuAn).subscribe((res: any) => {
        this.masterList = res || [];
        this.enrichAndMapTree(data, this.masterList);
      }, () => {
        this.listOptions = mapTreeForDropDown(data, 'Ten', 'Id');
      });
    }
  }

  private enrichAndMapTree(data: any[], master: any[]): void {
    const masterMap = new Map<string, any>();
    master.forEach(item => {
      if (item && item.Id) {
        masterMap.set(item.Id, item);
      }
    });

    const enriched = data.map(item => {
      if (!item) return item;
      const id = item.Id !== undefined ? item.Id : item.value;
      const masterItem = masterMap.get(id);
      if (masterItem) {
        return {
          ...masterItem,
          ...item,
          IdParent: masterItem.IdParent,
          Ten: item.label || item.Ten || masterItem.Ten,
          Id: id
        };
      }
      return item;
    });

    this.listOptions = mapTreeForDropDown(enriched, 'Ten', 'Id');
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
