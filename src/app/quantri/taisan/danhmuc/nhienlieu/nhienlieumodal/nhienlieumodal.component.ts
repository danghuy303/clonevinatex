import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from '../../../../../services/globalfunction';
import { DanhmuctaisanService } from '../../../../../services/Taisan/danhmuctaisan.service';
@Component({
  selector: 'app-nhienlieumodal',
  templateUrl: './nhienlieumodal.component.html',
  styleUrls: ['./nhienlieumodal.component.css']
})
export class NhienlieumodalComponent implements OnInit {

  item: any = { Ma: '', Ten: '', GhiChu: '' };
  title: any = '';
  type = '';

  constructor(
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService
  ) { this.item.isHoatDong = true }

  ngOnInit(): void {

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
      this._danhMucTaiSan.LoaiNhienLieu().Set(this.item).subscribe((res: any) => {
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