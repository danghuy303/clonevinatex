import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhsachhopdongsoimodal',
  templateUrl: './danhsachhopdongsoimodal.component.html',
  styleUrls: ['./danhsachhopdongsoimodal.component.css']
})
export class DanhsachhopdongsoimodalComponent implements OnInit {
  title: string = "Hợp đồng sợi"
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = [];
  userInfo: any;
  newItem: any = {};
  isXo: boolean = true
  isSoi: boolean = true
  lang: any = vn;
  isBongXo: boolean = true
  listdmMatHang: any = [];
  filter: any = {
    keyWord: "",
  };
  opt:string='';
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }

  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
      this._servicesSanXuat.GetListdmItemByHangHoa(1).subscribe((res: any) => {
        this.listdmMatHang = res;
      });
      this.GetQuyTrinh(this.item.HopDong.Id);
  }
  
  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.Data
      this.item.HopDong.IdTrangThai = res1.Data.HopDong.IdTrangThai;
      this.item.HopDong.Id = res1.Data.HopDong.Id;
      this.item.HopDong.NgayKy = UnixToDate(this.item.HopDong.NgayKyUnix);
      this.item.HopDong.NgayHieuLuc = UnixToDate(this.item.HopDong.NgayHieuLucUnix);
      this.item.HopDong.NgayGiaoHang = UnixToDate(this.item.HopDong.NgayGiaoHangUnix);
      if (this.item.listHangHoa.length > 0) {
          this.item.HopDong.thanhTien = this.item.listHangHoa.reduce((total, ele) => {
              return total + ((ele.SoLuong || 0) * (ele.DonGia || 0)* (1 + (ele.ThueGTGT || 0)/100))}, 0)
      }
      if (this.item.HopDong.isBenBanChiu) {
        this.item.HopDong.BenBanChiu = this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.BenBanChiu;
      }
      else {
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenBanChiu = !this.item.HopDong.BenMuaChiu;
      }
      if (this.item.listDieuKhoanThanhToan.length > 0) {
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.NgayThanhToan = UnixToDate(element.NgayThanhToanUnix);
          if (element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc = [];
        });
      }
      if (this.item.listBaoLanh.length > 0) {
        this.item.listBaoLanh.forEach(element => {
          element.HieuLucBaoLanh = UnixToDate(element.HieuLucBaoLanhUnix);
        });
      }
      if (validVariable(this.item.HopDong.IdHopDong)) {
        this.item.HopDong.isPhuLuc = true;
      }
    })
  }
}
