import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-dmtieuchichatluonghopdongmodal',
  templateUrl: './dmtieuchichatluonghopdongmodal.component.html',
  styleUrls: ['./dmtieuchichatluonghopdongmodal.component.css']
})
export class DmtieuchichatluonghopdongmodalComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
  
  }
  SetData() {
    let data: any = {
      "Id":this.item.Id,
      "Ma": this.item.Ma,
      "DacTinh": this.item.DacTinh,
      "DonVi": this.item.DonVi,
      "TieuChuan": this.item.TieuChuan,
      "GhiChu": this.item.GhiChu,
    };
    return data;
  }
  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucHopDong.DanhMucTieuChuanChatLuong().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        } 
      })

    }
  }

}
