import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-mathanglienket',
  templateUrl: './mathanglienket.component.html',
  styleUrls: ['./mathanglienket.component.css']
})
export class MathanglienketComponent implements OnInit {

  title: String = '';
  listView: any = [];
  filter: any = {};
  quyTrinh: any = {};
  checkedAll: boolean = false;
  listCongDoan: any = [];
  listPhieuLienKet: any = [];
  listDaChon: any = [];

  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListPhieuLienKet();
  }

  getListPhieuLienKet() {
    this._services.GetListTrienKhaiKeHoachSanXuatLienKet(this.quyTrinh.Id).subscribe((res: any) => {
      this.listPhieuLienKet = mapArrayForDropDown(res.Data, 'NoiDung', 'Id');
    })
  }

  getDanhMatHangLienKet() {
    let data = {
      listItemMay: this.quyTrinh.listItemMay || [],
      IdGiaoKeHoachSanXuatGoc: this.filter.IdPhieuLienKet
    }
    this._services.GetDanhMatHangLienKet(data).subscribe((res: any) => {
      this.listView = res.Data?.map((ele: any) => {
        const matched = this.listDaChon
          .find(daChon => daChon.IddmLoaiSoi === ele.IddmLoaiSoi && daChon.CM === ele.CM && daChon.ChiSo  === ele.ChiSo  && daChon.PE === ele.PE && daChon.CD === ele.CD && daChon.CongDoan === ele.CongDoan);
        return {
          ...ele,
          checked: matched ? true : false
        }
      });
      this.checkedAll = this.listView.every(ele => ele.checked);
    })
  }

  getlistData() {

  }

  getCheckAll(value) {
    this.listView = this.listView.map(ele => {
      return {
        ...ele,
        checked: value ? value : false
      }
    })
  }

  getChecked(item) {
    this.checkedAll = this.listView.every(ele => ele.checked);
  }

  nhapSoTanDat(item) {
    if (item.SanLuongDat >= item.KhoiLuongSanXuat) {
      this._toastr.error('Vui lòng nhập Số tấn đặt < Kế hoạch triển khai gốc') // alap số lượng đặt < số lượng triển khai
    }
  }

  accept() {
    this._activeModal.close(this.listView.filter(ele => ele.checked));
  }

}