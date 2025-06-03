import { Component, OnInit } from '@angular/core';
import { mapArrayForDropDown, validVariable } from '../../../../../services/globalfunction';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../../services/callApiSanXuat';
import { DanhmuctaisanService } from '../../../../../services/Taisan/danhmuctaisan.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danhmuctaisanmodal',
  templateUrl: './danhmuctaisanmodal.component.html',
  styleUrls: ['./danhmuctaisanmodal.component.css']
})
export class DanhmuctaisanmodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';
  listTaiSan: any = [];
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  Keyword = "";

  constructor(public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private services: SanXuatService,
    public toastr: ToastrService) { this.item.isHoatDong = true }

  ngOnInit(): void {
    this.GetListdmLoaiTaiSanForDanhMuc();
  }

  ValidateData() {
    if (!validVariable(this.item.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu chọn loại vật tư!");
      return false;
    }
    return true;
  }

  GetListdmLoaiTaiSanForDanhMuc() {
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetListdmLoaiTaiSanForDanhMuc({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
  }
  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucTaiSan.DanhMucTaiSan().Set(this.item).subscribe((res: any) => {
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
