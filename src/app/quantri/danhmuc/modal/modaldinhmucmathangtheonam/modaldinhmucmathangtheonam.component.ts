import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldinhmucmathangtheonam',
  templateUrl: './modaldinhmucmathangtheonam.component.html',
  styleUrls: ['./modaldinhmucmathangtheonam.component.css']
})
export class ModaldinhmucmathangtheonamComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  quyenbutton: any = { ChuyenTiep: false, GhiLai: true, KhongDuyet: false, Xoa: false, Khac: false, Cho: false };
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {

  }

  SetData() {
    let data: any = {
      "id": this.item.id,
      "nam": this.item.nam,
      "idDuAn": this.item.idDuAn,
      "created": this.type == "dinhmucmathanghangnam" ? new Date() : this.item.created,
    };
    return data;
  }


  GhiLai() {
      this._danhMucHopDong.DinhMucMatHangTheoNam().Set(this.SetData()).subscribe((res: any) => {
        if (res.statusCode !== 200) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        } 
      
      })
    }
  
}