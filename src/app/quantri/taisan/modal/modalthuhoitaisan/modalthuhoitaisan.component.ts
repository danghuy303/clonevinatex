import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modalthuhoitaisan',
  templateUrl: './modalthuhoitaisan.component.html',
  styleUrls: ['./modalthuhoitaisan.component.css']
})
export class ModalthuhoitaisanComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = {};
  type = '';
  opt = '';
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    if (this.opt == 'add') {

    }
    else {

    }
  
  }
  
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  edit(item) {
    item.edit = true;
  }

  save(item) {
    item.edit = false;
  }

  xoa(item) {

  }

  GhiLai() {
    if (this.opt == 'add') {
      this.item.lstChiTiet = deepCopy(this.item.listItem);
      delete this.item.listItem;
      console.log(this.item);
      this._danhMucHopDong.DanhSachTinhLuong().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
    else {
      this.item.lstChiTiet = deepCopy(this.item.listItem);
      this._danhMucHopDong.DanhSachTinhLuong().Update(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  
}
