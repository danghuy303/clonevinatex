import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-modaldmcasanxuat',
  templateUrl: './modaldmcasanxuat.component.html',
  styleUrls: ['./modaldmcasanxuat.component.css']
})
export class ModaldmcasanxuatComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  public opt = '';
  public listCongTy: any[] = [];
  public listPhanXuong: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService
  ) {
    this.item.isHoatDong = true;
  }

  ngOnInit(): void {
    console.log("listCongTy", this.listCongTy);

    this.getListPhanXuong();
    // Synchronize SoGio / SoGioLamViec fields on edit load
    this.item.isHoatDong = this.item.isHoatDong ?? this.item.HoatDong ?? true;
    if (this.item.SoGioLamViec === undefined && this.item.SoGio !== undefined) {
      this.item.SoGioLamViec = this.item.SoGio;
    }
  }

  getListPhanXuong() {
    this._danhMucTaiSan.DanhMucCaSanXuat().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res.Data || res, 'Ten', 'Id');
    });
  }

  onChangeCongTy() {
    if (this.listCongTy && this.item.IdCongTy) {
      const selected = this.listCongTy.find(x => x.value === this.item.IdCongTy);
      if (selected) {
        this.item.TenCongTy = selected.label;
      }
    } else {
      this.item.TenCongTy = '';
    }
  }

  onChangePhanXuong() {
    if (this.listPhanXuong && this.item.IddmPhanXuong) {
      const selected = this.listPhanXuong.find(x => x.value === this.item.IddmPhanXuong);
      if (selected) {
        this.item.TendmPhanXuong = selected.label;
      }
    } else {
      this.item.TendmPhanXuong = '';
    }
  }

  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã !");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      // Map properties for backend compatibility
      this.item.HoatDong = this.item.isHoatDong;
      this.item.SoGio = this.item.SoGioLamViec;
      this._danhMucTaiSan.DanhMucCaSanXuat().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      });
    }
  }

}
