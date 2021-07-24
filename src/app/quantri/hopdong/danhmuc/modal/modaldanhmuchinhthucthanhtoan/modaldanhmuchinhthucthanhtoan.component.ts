import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhmuchinhthucthanhtoan',
  templateUrl: './modaldanhmuchinhthucthanhtoan.component.html',
  styleUrls: ['./modaldanhmuchinhthucthanhtoan.component.css']
})
export class ModaldanhmuchinhthucthanhtoanComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {

  }
  Setdata() {
    let data: any = {
      "Id": this.type == "add" ? "" : this.item.Id,
      IdHinhThucThanhToan: this.item.IdHinhThucThanhToan,
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "GhiChu": this.item.GhiChu != undefined && this.item.GhiChu != null && this.item.GhiChu != "" ? this.item.GhiChu : "",
    };
    return data;
  }
  async luu1() {
    if (validVariable(this.item.Ma) == true && validVariable(this.item.Ten) == true) {
      debugger;
      console.log(this.Setdata())
      let res: any = await this._danhMucHopDong.DanhMucHinhThucThanhToan().Set(this.Setdata());
      if (res.Error === 4) {
        this.toastr.success(res.Detail, 'Thông báo');
        //  this.Onclose();
      }
      //     else {
      //       this.toastr.error(res.Detail, 'Thông báo');
      //     }
      //    }
      //    else {
      //      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc", 'Thông báo');
      //  }
    }
  }
}
