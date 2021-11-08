import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-tinhdoanhthumodal',
  templateUrl: './tinhdoanhthumodal.component.html',
  styleUrls: ['./tinhdoanhthumodal.component.css']
})
export class TinhdoanhthumodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  headerChiTietModal: string = '';
  showChiTietThang: boolean = false;
  itemChiTietThang: any = { lstDoanhThuSanPhamThang: [] };
  newDoanhThuChiTiet: any = {};
  itemKeHoach: any = {};
  checkbutton: any = {};
  listGia: any = [];
  listGiaRef: any = [];
  Nam: number;
  addonThongTinDoanhThu:any={};
  mapSanPham_Gia: any = {};
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { }

  ngOnInit(): void {
    this.GetDonGiaSanPham()
    console.log(this.item)
  }
  GetDonGiaSanPham() {
    this.mapSanPham_Gia = {};
    this._danhMucHopDong.DanhMucDonGia().Get(this.item.Nam).subscribe((res: any) => {
      console.log(res);
      this.item.lstSanPham.forEach(sanpham => {
        this.mapSanPham_Gia[sanpham.IdSanPham.replaceAll('-', '_')] = res.Data.find(ele => ele.IdSanPham === sanpham.IdSanPham);
      });
      for (let key in this.mapSanPham_Gia) {
        this.mapSanPham_Gia[key].lstChiTietGia.forEach(gia => {
          gia.HienThi = `${formatNumber(gia.Gia,'vi-VN','0.0-3')} ${gia.MadmTienTe}`;
        });
        this.mapSanPham_Gia[key].listGia = mapArrayForDropDown(this.mapSanPham_Gia[key].lstChiTietGia,'HienThi','Id');
      }
    })
  }
  ChiTietSanPhamThang(thang, sanpham) {
    console.log(thang, sanpham)
    let data = {
      Thang: thang,
      Nam: this.Nam,
      IdSanPham: sanpham.IdSanPham,
      IdKeHoachKinhDoanh: sanpham.IdKeHoachKinhDoanh,
    }
    this.addonThongTinDoanhThu={
      Thang: thang,
      Nam: this.Nam,
      IdSanPham: sanpham.IdSanPham,
      IdKeHoachKinhDoanh: sanpham.IdKeHoachKinhDoanh,
      IdKeHoachKinhDoanhGoc: sanpham.IdKeHoachKinhDoanhGoc
    }
    let key = sanpham.IdSanPham.replaceAll('-','_')
    this.listGia = this.mapSanPham_Gia[key].listGia;
    this.listGiaRef = this.mapSanPham_Gia[key].lstChiTietGia;
    this._danhMucHopDong.TinhToanDoanhThu().GetThang(data).subscribe(res => {
      this.showChiTietThang = true;
      this.itemChiTietThang = res;
      this.headerChiTietModal = `Chi tiết tháng ${thang}`;
      console.log(res);
    })
  }
  changeGia(event,rootItem){
    console.log(event);
    let ref = this.listGiaRef.find(gia=>gia.Id === event.value);
    console.log(ref);
    rootItem.Gia = ref.Gia;
    rootItem.MadmTienTe = ref.MadmTienTe;
    rootItem.IddmTienTe = ref.IddmTienTe;
    rootItem.TyGia = ref.TyGia;
    this.tinhDoanhThu(rootItem);
  }
  tinhDoanhThu(rootItem){
    console.log(rootItem);
    let arrTest = ['SanLuong','Gia','TyGia'];
    let valid = arrTest.every(prop=>validVariable(rootItem[prop]));
    if(valid){
      rootItem.DoanhThu = arrTest.reduce((multiply,ele)=>multiply*=rootItem[ele],1)
    }
    this.TinhTong()
  }
  TinhTong(){
    this.itemChiTietThang.lstDoanhThuSanPhamThang
  }
  ThemDoanhThuChiTiet() {
    let data= {...this.newDoanhThuChiTiet,Id:''}
    this.itemChiTietThang.lstDoanhThuSanPhamThang.push(deepCopy(this.newDoanhThuChiTiet));
    this.newDoanhThuChiTiet ={}
  }
  XoaDoanhThuChiTiet(index) {
    let remove = this.itemChiTietThang.lstDoanhThuSanPhamThang.splice(index,1)
  }
  cleanForm(){
    this.newDoanhThuChiTiet={};
  }
  GhiLai(){
    // this._danhMucHopDong.TinhToanDoanhThu().Set()
  }
  QuayLai(){
    this.showChiTietThang=false;
  }
}
