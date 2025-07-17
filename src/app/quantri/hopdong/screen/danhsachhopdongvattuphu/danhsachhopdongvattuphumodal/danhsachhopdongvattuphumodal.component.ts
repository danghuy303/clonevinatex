import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/auth.service';
import { vn } from 'src/app/services/const';
import { UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';

@Component({
  selector: 'app-danhsachhopdongvattuphumodal',
  templateUrl: './danhsachhopdongvattuphumodal.component.html',
  styleUrls: ['./danhsachhopdongvattuphumodal.component.css']
})
export class DanhsachhopdongvattuphumodalComponent implements OnInit {
  title: string = "Hợp đồng vật tư phụ"
  item: any = {};
  hopDong: any = {};
  listDieuKhoanThanhToan: any = [];
  listHangHoaSoi: any = []
  userInfo: any;
  newItem: any = {};
  lang: any = vn;
  filter: any = {
    keyWord: "",
  };
isVatTuPhu : any= true;
isSoi : any = true;
  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
opt:any='';
  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
      this.GetQuyTrinh(this.item.HopDong.Id);
  }

  GetQuyTrinh(id) {
    this._service.QuyTrinhHopDong().Get(id).subscribe((res1: any) => {
      this.item = res1.Data
      this.item.HopDong.IdTrangThai = res1.Data.HopDong.IdTrangThai;
      this.item.HopDong.Id = res1.Data.HopDong.Id;
      this.item.HopDong.NgayKy = UnixToDate(this.item.HopDong.NgayKyUnix);
      this.item.HopDong.NgayHieuLuc = UnixToDate(this.item.HopDong.NgayHieuLucUnix );
      this.item.HopDong.NgayGiaoHang = UnixToDate(this.item.HopDong.NgayGiaoHangUnix);
      if(this.item.listHangHoa.length > 0){
          this.item.listHangHoa.forEach(element => {
              this.item.HopDong.ThanhTien = (this.item.HopDong.ThanhTien || 0) + ((element.SoLuong || 0)*(element.DonGia || 0))
          });
      }
      if (this.item.HopDong.isBenBanChiu) {
        this.item.HopDong.BenBanChiu = this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.BenBanChiu;
      }
      else {
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenBanChiu = !this.item.HopDong.BenMuaChiu;
      }
      if(this.item.listDieuKhoanThanhToan.length > 0){
        this.item.listDieuKhoanThanhToan.forEach(element => {
          element.NgayThanhToan = UnixToDate(element.NgayThanhToanUnix);
          if(element.listThanhToanThuTuc === null)
            element.listThanhToanThuTuc  = [];
        });
      }
      if(this.item.listBaoLanh.length > 0){
        this.item.listBaoLanh.forEach(element => {
          element.HieuLucBaoLanh = UnixToDate(element.HieuLucBaoLanhUnix);
        });
      }
      if(validVariable(this.item.HopDong.IdHopDong))
      {
        this.item.HopDong.isPhuLuc = true;
      }
    })
  }
}
