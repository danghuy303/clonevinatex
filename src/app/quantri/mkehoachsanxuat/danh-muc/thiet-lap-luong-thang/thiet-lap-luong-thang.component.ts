import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { handleHTTPResponse, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-thiet-lap-luong-thang',
  templateUrl: './thiet-lap-luong-thang.component.html',
  styleUrls: ['./thiet-lap-luong-thang.component.css']
})
export class ThietLapLuongThangComponent implements OnInit {

  listDanhMuc: any = [];
  listNhaMay: any = [];
  userInfo: any;
  idDuAn: any= '';

  constructor(
    private _serviceSanXuat: SanXuatService,
    private toastr: ToastrService,
    private _auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.getNhaMay();
    this.loadData();
  }

  loadData() {
    this._serviceSanXuat.CoCauNhanSu()
      .GetListAll(this.idDuAn).subscribe((res: any) => {
        this.listDanhMuc = res;
    })
  }

  getNhaMay() {
    this.userInfo = this._auth.currentUserValue;
    this._serviceSanXuat.GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  save() {
    this._serviceSanXuat.CoCauNhanSu()
      .Set(this.listDanhMuc).subscribe((res: any) => {
        handleHTTPResponse(res, this.toastr, () => {
          this.listDanhMuc = res.Data;
        })
      })
  }

}
