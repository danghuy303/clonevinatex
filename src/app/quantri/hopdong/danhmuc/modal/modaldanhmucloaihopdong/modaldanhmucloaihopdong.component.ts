import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmucloaihopdong',
  templateUrl: './modaldanhmucloaihopdong.component.html',
  styleUrls: ['./modaldanhmucloaihopdong.component.css']
})
export class ModaldanhmucloaihopdongComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.type);
  }

  Setdata() {
    let data: any = {

      "id": this.type == "loaihopdong" ? "" : this.item.Id,
      "ma": this.item.ma,
      "ten": this.item.ten,
      "ghiChu": this.item.ghiChu,
      "created": this.type == "loaihopdong" ? new Date() : this.item.created,
      "modified":new Date() ,
      "isGiaTriHopDong":this.type == "loaihopdong" ? false : this.item.isGiaTriHopDong,
      "isDelete":this.type == "isDelete" ? false : this.item.isDelete,
    };
    return data;
  }

  async luu() {
    if (validVariable(this.item.ma) == true && validVariable(this.item.ten) == true) {
      console.log(this.Setdata());
      this._danhMucHopDong.DanhMucLoaiHopDong().Set(this.Setdata()).subscribe((res: any) => {
        if (res.status !== 200) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        }
      })

    }
  }
}