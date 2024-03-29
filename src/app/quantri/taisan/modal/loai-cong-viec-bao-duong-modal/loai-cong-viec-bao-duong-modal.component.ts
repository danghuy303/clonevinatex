import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-loai-cong-viec-bao-duong-modal',
  templateUrl: './loai-cong-viec-bao-duong-modal.component.html',
  styleUrls: ['./loai-cong-viec-bao-duong-modal.component.css']
})
export class LoaiCongViecBaoDuongModalComponent implements OnInit {

  item: any = {};
  title: any = '';
  type = '';
  listCongDoan: any = [];
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  Keyword = "";

  constructor(public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
  }

  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã !");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ nội dung!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucTaiSan.LoaiThucHienBaoDuong().Set(this.item).subscribe((res: any) => {
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
