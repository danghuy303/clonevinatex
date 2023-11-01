import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-danh-sach-mat-hang',
  templateUrl: './danh-sach-mat-hang.component.html',
  styleUrls: ['./danh-sach-mat-hang.component.css']
})
export class DanhSachMatHangComponent implements OnInit {

  items: any = [];
  filter: any = {};
  checkedAll: boolean = false;
  listDaChon: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    let data = {
      Loai: 1,
    };
    this._services.GetListdmItem(data).subscribe((res: any) => {
      this.items = res;
      this.items = this.items.map(ele => {
        return {
          ...ele,
          checked: this.listDaChon.includes(ele.Id)
        }
      })
      this.checked();
    })
  }

  resetFilter() {
    this.filter.KeyWord = '';
  }

  checkAll() {
    this.items = this.items.map(ele => {
      return {
        ...ele,
        checked: this.checkedAll ? true : false
      }
    })
  }

  checked() {
    this.checkedAll = this.items.every(ele => ele.checked);
  }

  ChapNhan() {
    let data = this.items.filter(ele => ele.checked).map(obj => {
      return {
        ...obj,
        ThanhPhan:obj.Ten,
        IddmItem: obj.Id
      }
    });
    this.activeModal.close(data)
  }

}
