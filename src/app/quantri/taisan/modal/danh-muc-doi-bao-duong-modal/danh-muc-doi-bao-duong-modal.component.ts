import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danh-muc-doi-bao-duong-modal',
  templateUrl: './danh-muc-doi-bao-duong-modal.component.html',
  styleUrls: ['./danh-muc-doi-bao-duong-modal.component.css']
})
export class DanhMucDoiBaoDuongModalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  listCongDoan:any =[];
  listUser:any =[];
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  Keyword="";

  constructor(public activeModal: NgbActiveModal,
     private _danhMucTaiSan:DanhmuctaisanService,
      public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
    this.GetBoPhanNhanSu();
  }

  GetBoPhanNhanSu() {
    this._danhMucTaiSan.GetBoPhanNhanSu().subscribe((res: any) => {
      this.listUser = mapArrayForDropDown(res, "Ten", "Id");
    })
  }

  ValidateData() {
    if (!validVariable(this.item.MaCongDoan)) {
      this.toastr.error("Yêu cầu nhập đầy đủ công đoạn!");
      return false;
    }
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
      this._danhMucTaiSan.DoiBaoDuong().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
        // this.activeModal.close();
      })
    }
  }
}
