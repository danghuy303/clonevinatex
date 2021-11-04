import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-modaldanhmucdongiasanpham',
  templateUrl: './modaldanhmucdongiasanpham.component.html',
  styleUrls: ['./modaldanhmucdongiasanpham.component.css']
})

export class ModaldanhmucdongiasanphamComponent implements OnInit {

  public data: any = [];
  public title: any = '';
  public type = '';
  public listNam = [];
  public Nam;
  public listDonViTien = [];
  public listDonViTienRef = [];

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, public toastr: ToastrService,public _hopdongServices:HopDongService) { }

  ngOnInit(): void {
    // for(let i = new Date().getFullYear()-5;i<=new Date().getFullYear()+5;i++){
    //   this.listNam.push({value:i,label:i});
    // }
    this.GetListDanhMucTienTe()
    this.GetListHopDongSoi()
    if (validVariable(this.Nam)) {
      this.GetData();
    }
  }
  addThemGia(item) {
    item.lstChiTietGia.push({ Id: '', Nam: item.Nam,IdSanPham:item.IdSanPham, })
  }
  GetListHopDongSoi(){
    this._hopdongServices.GetOptions().GetAllHopDong().subscribe((res:any)=>{
      console.log(res);
    })
  }
  getMadmTienTe(item){
    item.MadmTienTe = this.listDonViTienRef.find(ele=>ele.id===item.IddmTienTe)?.ma;
  }
  GetListDanhMucTienTe() {
    this._danhMucHopDong.DanhMucLoaiTienTe().GetListAll().subscribe((res: any) => {
      console.log(res);
      this.listDonViTien = mapArrayForDropDown(res,'ma','id');
      this.listDonViTienRef = res;
    })
  }
  GetData() {
    this._danhMucHopDong.DanhMucDonGia().Get(this.Nam).subscribe((res: any) => {
      console.log(res);
      this.data = res.Data;
    })
  }
  SetData() {
    return this.data;
  }

  GhiLai() {
    this._danhMucHopDong.DanhMucDonGia().Set(this.SetData()).subscribe((res: any) => {
      if (res.StatusCode!== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
}
