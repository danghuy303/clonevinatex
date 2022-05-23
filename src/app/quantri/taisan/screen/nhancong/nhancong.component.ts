import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhancong',
  templateUrl: './nhancong.component.html',
  styleUrls: ['./nhancong.component.css']
})
export class NhancongComponent implements OnInit {

  @Input('items') items: any;
  // @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  listTenNhanVien: any = [];

  constructor(
    private _services: SanXuatService,
    public modal: NgbModal,
    public toastr: ToastrService,
  ) { }

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
  }

  delete(index) {
    // let item = this.items.splice(index, 1)[0];
    // if (item.Id === '' || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.items.push(JSON.parse(JSON.stringify(item)));
    // }
    let modalRef = this.modal.open(ModalthongbaoComponent,{
      size: "md",
      backdrop: "static",
    })
    modalRef.componentInstance.message = 'Bạn có chắc muốn xóa dữ liệu vừa chọn?';
    modalRef.result
      .then((res) => {
        this.items.splice(index, 1)
      })
      .catch((er) => console.log(er));
  }
  
}
