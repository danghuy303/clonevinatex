import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-denghixulysuconhancong',
  templateUrl: './denghixulysuconhancong.component.html',
  styleUrls: ['./denghixulysuconhancong.component.css']
})
export class DenghixulysuconhancongComponent implements OnInit {

  @Input() items: any;
  // @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  listTenNhanVien: any = [];

  constructor(private _services: SanXuatService,) { }

  ngOnInit(): void {
    this._services.GetListUser().subscribe((res: any) => {
      this.listTenNhanVien = mapArrayForDropDown(res, 'TenNhanVien', 'IdUser');
    });
  }

  addNhanCong() {
    if (this.items == undefined || this.items == null)
      this.items = [];
    this.items.push(this.newitem);
    this.newitem = {}
    console.log("this.items", this.items);
    
  }

  delete(index) {
    // let item = this.items.splice(index, 1)[0];
    // if (item.Id === '' || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.items.push(JSON.parse(JSON.stringify(item)));
    // }
    this.items.splice(index, 1)
  }
  
}
