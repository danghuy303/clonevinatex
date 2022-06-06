import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-denghixulysuconhancong',
  templateUrl: './denghixulysuconhancong.component.html',
  styleUrls: ['./denghixulysuconhancong.component.css']
})
export class DenghixulysuconhancongComponent implements OnInit {

  @Input() listNhanCong: any;
  // @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  listTenNhanVien: any = [];

  constructor(
    private _services: SanXuatService,
    public _modal: NgbModal,) { }

  ngOnInit(): void {
    this._services.GetListUser().subscribe((res: any) => {
      this.listTenNhanVien = mapArrayForDropDown(res, 'TenNhanVien', 'IdUser');
    });
  }

  addNhanCong() {
    if (this.listNhanCong == undefined || this.listNhanCong == null)
      this.listNhanCong = [];
    this.listNhanCong.push(this.newitem);
    this.newitem = {}
  }

  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.listNhanCong.splice(index, 1)
    }).catch(er => console.log(er))

  }

}
