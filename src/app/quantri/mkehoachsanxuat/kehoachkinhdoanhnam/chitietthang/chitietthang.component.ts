import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';

@Component({
  selector: 'app-chitietthang',
  templateUrl: './chitietthang.component.html',
  styleUrls: ['./chitietthang.component.css']
})
export class ChitietthangComponent implements OnInit {

  opt: any = "";
  idSanPham: any = "";
  itemThang: any = {};
  listCachThuc: Array<any> = [
    { value: 'noiDia', label: 'Nội địa' }, 
    { value: 'xuatKhau', label: 'Xuất khẩu' }];
  listContainer: any = [];
  listPhuongThucVanChuyen: any = [];
  thang: string = "";
  tenSanPham: string = "";

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService
  ) { }

  ngOnInit(): void {
    console.log('itemThang', this.itemThang);
    this.itemThang.checkForAll = false;
    if (this.opt === 'add') {
      this.itemThang.SanLuongMotCa = 0;
      this.GetHieuSuat();
    }
    this.GetNangSuat();
    this.GetListDropDown();
    this.CountTongSanLuong();
    this.GetDate();
  }

  GetNangSuat() {
    this._danhMucHopDong.KeHoachSanXuat()
      .GetNangSuatTrungBinh()
      .subscribe((res: any) => {
        this.itemThang.NangSuat = res;
        if (!this.itemThang.isEdited) {
          this.itemThang.SoMayCon = (this.itemThang?.SanLuongMotCa || 0) / (this.itemThang?.NangSuat || 0);
        }
      })
  }

  GetHieuSuat() {
    let d = new Date();
    this._danhMucHopDong.KeHoachSanXuat()
      .GetHieuSuatTrungBinh(d.getFullYear())
      .subscribe((res: any) => {
        let sanpham = res.find(ele => ele.IdSanPham === this.idSanPham);
        let objThang = sanpham.ListThang.find(ele => ele.Thang === this.thang);
        this.itemThang.HieuSuat = objThang.HieuSuat;
    })
  }

  GetListDropDown() {
    let ls1 = this._services.PhuongThucVanChuyen().GetListAll().toPromise();
    let ls2 = this._services.LoaiContainer().GetListAll().toPromise();
    Promise.all([ls1, ls2]).then((values: any) => {
      this.listPhuongThucVanChuyen = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listContainer = mapArrayForDropDown(values[1].Data, "Ten", "Id");
    });
  }

  CountTongSanLuong() {
    this.itemThang.SanLuongMotCa = 0;
    if (this.itemThang.TongSoCa && this.itemThang.TongSanLuong) {
      this.itemThang.SanLuongMotCa = this.itemThang.TongSanLuong / this.itemThang.TongSoCa;
      this.GetNangSuat();
    }
  }

  ChapNhan() {
    this.itemThang.isEdited = true;
    this.activeModal.close(this.itemThang);
  }

  GetDate() {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    this.itemThang.SoNgayLamViec = new Date(year, month, 0).getDate();
    this.itemThang.TongSoCa = (this.itemThang.SoNgayLamViec * 3 || 0);
  }

}
