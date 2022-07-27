import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { handleHTTPResponse } from 'src/app/services/globalfunction';
@Component({
  selector: 'app-chi-phi-nhan-cong',
  templateUrl: './chi-phi-nhan-cong.component.html',
  styleUrls: ['./chi-phi-nhan-cong.component.css']
})
export class ChiPhiNhanCongComponent implements OnInit {

  listNhanCong: any = [];
  paging: any = {};

  constructor(
    private _service: SanXuatService,
    private _confirmService: ConfirmationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._service.LoaiChiPhiNhanCong()
      .GetListAll().subscribe((res: any) => {
        this.listNhanCong = res.Data;
      })
  }

  addChild(list) {
    let data = {
      Id: "",
      Ma: "",
      Ten: "",
      DonViTinh: "",
      ListNhanCong: []
    }
    list.push(data);
  }

  deleteItem(list, index) {
    this._confirmService.show({
      message: "Bạn chắc chắn muốn xóa mục này?"
    }, () => {
      list.splice(index, 1);
    })
  }

  save() {
    this._service.LoaiChiPhiNhanCong().Set(this.listNhanCong).subscribe((res: any) => {
      handleHTTPResponse(res, this.toastr, () => {
        this.listNhanCong = res.Data;
      })
    })
  }

}
