import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-modalcasanxuat',
  templateUrl: './modalcasanxuat.component.html',
  styleUrls: ['./modalcasanxuat.component.css']
})
export class ModalcasanxuatComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  public opt = '';
  public listCongTy: any[] = [];
  public listPhanXuong: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _sanXuatService: SanXuatService,
    public toastr: ToastrService
  ) {
    this.item.isHoatDong = true;
  }

  ngOnInit(): void {
    this.getListPhanXuong();

    // Map properties on edit load
    this.item.isHoatDong = this.item.isHoatDong ?? this.item.HoatDong ?? true;
    if (this.item.SoGioLamViec === undefined && this.item.SoGio !== undefined) {
      this.item.SoGioLamViec = this.item.SoGio;
    }
  }

  getListPhanXuong() {
    this._sanXuatService.GetListdmPhanXuong(null, false).subscribe((res: any) => {
      const list = res.Data || res || [];
      this.listPhanXuong = mapArrayForDropDown(list, 'Ten', 'Id');
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
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
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
      this.item.HoatDong = this.item.isHoatDong;
      this.item.SoGio = this.item.SoGioLamViec;
      this._sanXuatService.SetdmCaSanXuat(this.item).subscribe((res: any) => {
        if (res.State === 1) {
          this.toastr.success(res.message);
          this.activeModal.close(res.message);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }

}
