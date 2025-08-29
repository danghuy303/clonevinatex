import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucloaitiente',
  templateUrl: './modaldanhmucloaitiente.component.html',
  styleUrls: ['./modaldanhmucloaitiente.component.css']
})
export class ModaldanhmucloaitienteComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
  
  }

  SetData() {
    let data: any = {
      // "id": this.type == "loaitiente" ? "" : this.item.Id,
      "Id":this.item.Id,
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "GhiChu": this.item.GhiChu,
      "Created": this.type == "loaitiente" ? new Date() : this.item.Vreated,
      "Modified":new Date() ,
      "isDelete":this.type == "loaitiente" ? false : this.item.isDelete,
    };
    return data;
  }
  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã loại tiền tệ!");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên loại tiền tệ!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      console.log(this.SetData());
      this._danhMucHopDong.DanhMucLoaiTienTe().Set(this.SetData()).subscribe((res: any) => {
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