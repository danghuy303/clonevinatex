import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
@Component({
  selector: 'app-modalbaoduong',
  templateUrl: './modalbaoduong.component.html',
  styleUrls: ['./modalbaoduong.component.css']
})
export class ModalbaoduongComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  bool: boolean=true;
  Keyword: any = '';
  paging: any = { page: 1, totalPages: 1, totalCount: 1 };
  listTaiSan: any = [];
  listMucDoUuTien: any = [];
  Time = {
    Ngay: 'Ngày',
    Tuan: 'Tuần',
    Thang: 'Tháng',
    Nam: 'Năm',
  };

  constructor(public activeModal: NgbActiveModal, private _danhMucTaiSan: DanhmuctaisanService, public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
    this.GetListdmLoaiTaiSan();
  }

  GetListdmLoaiTaiSan() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.page,
      Keyword: this.Keyword,
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._danhMucTaiSan.DanhMucMucDoUuTien().GetList(data).subscribe((res: any) => {
     res.Data.Items.forEach(ele => {
        ele.tenValue = `${ele.Ten} - ${ele.ThuTu}`;
     })
      this.listMucDoUuTien = mapArrayForDropDown(res.Data.Items, "tenValue", "Id",);
      console.log(this.listMucDoUuTien);
      
    })
  }
  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên !");
      return false;
    }
    if (!validVariable(this.item.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập đầy đủ loại tài sản !");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucTaiSan.DanhMucLoaiBaoDuong().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
        this.activeModal.close();
      })
    }
  }
}
