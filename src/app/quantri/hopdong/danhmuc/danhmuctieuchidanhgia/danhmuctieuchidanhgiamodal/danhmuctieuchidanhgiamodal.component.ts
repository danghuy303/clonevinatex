import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhmuctieuchidanhgiamodal',
  templateUrl: './danhmuctieuchidanhgiamodal.component.html',
  styleUrls: ['./danhmuctieuchidanhgiamodal.component.css']
})
export class DanhmuctieuchidanhgiamodalComponent implements OnInit {
  item: any = {};
  title: any = '';
  type = '';
  listTieuChiCha: any = [];

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: HopDongService, public toastr: ToastrService) { }

  ngOnInit(): void {
  this.getlistTieuChiCha();
  }
  SetData() {
    let data: any = {
      "Id":this.item.Id || '',
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "TieuChuan": this.item.TieuChuan,
      "GhiChu": this.item.GhiChu,
      "HoatDong": this.item.HoatDong,
      "NoiDung": this.item.NoiDung,
      "ThuTu": this.item.ThuTu  || 0,
      "DiemToiDa": this.item.DiemToiDa || 0,
      "IddmTieuChiCha": this.item.IddmTieuChiCha,
      "Loai": this.item.Loai  || 0,
    };
    return data;
  }
  GhiLai() {
      this._danhMucHopDong.dmTieuChiDanhGia().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } else {
          this.toastr.error(res.Message);
        } 
      })
  }
  getlistTieuChiCha(){
    let data = {
      PageSize: 20,
    };
    this._danhMucHopDong.dmTieuChiDanhGia().GetList(data).subscribe((res: any) => {
      let listTieuChiCha = res.Data.filter(e => e.IddmTieuChiCha === null || e.IddmTieuChiCha === '');
      this.listTieuChiCha = mapArrayForDropDown(listTieuChiCha, 'Ten', 'Id');
    })
  }
  
}
