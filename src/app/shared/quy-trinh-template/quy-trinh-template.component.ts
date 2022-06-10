import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type Button = 'QuayLai' | 'GhiLai' | 'ChuyenTiep' | 'KhongDuyet' | 'Xoa'

@Component({
  selector: 'app-quy-trinh-template',
  templateUrl: './quy-trinh-template.component.html',
  styleUrls: ['./quy-trinh-template.component.css']
})
export class QuyTrinhTemplateComponent implements OnInit {
  @Input() value: any;
  @Output('clickEvent') clickEvent:EventEmitter<any> = new EventEmitter<any>();
  item: any = {};
  // Button: 'QuayLai' | 'GhiLai' | 'ChuyenTiep' | 'KhongDuyet' | 'Xoa';

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log("value", this.value);
  }
  
  handleEvent(button: Button){
    this.clickEvent.emit(button);
  }
}
