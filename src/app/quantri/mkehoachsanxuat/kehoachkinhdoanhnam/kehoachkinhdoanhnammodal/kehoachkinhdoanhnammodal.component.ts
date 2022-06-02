import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';
import { ChitietthangComponent } from '../chitietthang/chitietthang.component';
import { HopdongsanphammodalComponent } from '../hopdongsanphammodal/hopdongsanphammodal.component';

@Component({
  selector: 'app-kehoachkinhdoanhnammodal',
  templateUrl: './kehoachkinhdoanhnammodal.component.html',
  styleUrls: ['./kehoachkinhdoanhnammodal.component.css']
})
export class KehoachkinhdoanhnammodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  checkbutton: any = {
    Ghi: true,
    Xoa: true,
    KhongDuyet: true,
    ChuyenTiep: true,
  };
  kehoach: any = {};
  years: any = [];
  listDonViTienTe: Array<any> = [{ value: 'VND', label: 'Việt Nam Đồng' }, { value: 'USD', label: 'USD' }];
  labelThang: Array<string> = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12',];
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',];

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _danhMucHopDong: DanhMucHopDongService,
    private _services: SanXuatService,
    private store: StoreService,
    private _auth: AuthenticationService) {

  }

  ngOnInit(): void {
    console.log("ke hoach", this.kehoach);
    this.getYearsForDropDown();
  }

  getYearsForDropDown() {
    let date = new Date().getFullYear() -11;
    for(let i = 0; i <= 20; i++) {
      date++;
      this.years.push({
        label: date,
        value: date
      });
    }
  }

  GhiLai() {

  }

  XoaQuyTrinh() {

  }

  ChuyenDuyet() {

  }

  KhongDuyet() {

  }

  AddSanPham() {
    let data = {
      TenSanPham: "Sản phẩm",
      NhaMay: "Nhà máy 1",
      HopDong: "Hợp đồng 1",
      TongSanLuong: 0,
      Thang1: 0,
      Thang2: 0,
      Thang3: 0,
      Thang4: 0,
      Thang5: 0,
      Thang6: 0,
      Thang7: 0,
      Thang8: 0,
      Thang9: 0,
      Thang10: 0,
      Thang11: 0,
      Thang12: 0,
      NgoaiLe: true,
    };
    this.kehoach.ListSanPham.push(data);
  }

  SeeHopDongDetail() {
    let modalRef = this._modal.open(HopdongsanphammodalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  SeeMonthDetail() {
    let modalRef = this._modal.open(ChitietthangComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  DeleteSanPham(index) {
    console.log(index);
    this.kehoach.ListSanPham.splice(index, 1)
  }

}
