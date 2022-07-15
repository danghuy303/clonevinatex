import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-danhmucmathang',
  templateUrl: './danhmucmathang.component.html',
  styleUrls: ['./danhmucmathang.component.css']
})
export class DanhmucmathangComponent implements OnInit {

  listMatHang: any = [];
  checkedAll: boolean = false;
  listIdSanPham: any = [];
  keyword: string;

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData() {
    this._services.GetOptions().GetMatHangKhongHopDongChoKHKD().subscribe((res: any) => {
      this.listMatHang = res;
      this.CheckExistedItems();
    })
  }

  CheckExistedItems() {
    this.listMatHang.forEach((matHang: any) => {
      matHang.checked = this.listIdSanPham.includes(matHang.Id);
    })
  }

  CheckAll(e) {
    this.listMatHang.forEach((matHang: any) => {
      matHang.checked = e.checked;
    })
  }

  Check() {
    this.checkedAll = this.listMatHang.every(ele => ele.checked);
  }

  TransformData(list) {
    list = list.map(ele => {
      return {
        ...ele,
        isKhongHopDong: true,
        TenSanPham: ele.Ten,
        IdSanPham: ele.Id,
        Id: "",
        lstKH_KeHoachKinhDoanh_SanPham_NhaMay: [
          {
            IdSanPham: ele.Id,
            IdDuAn: this.store.getCurrent(),
            TongSanLuongThang: 0,
            lstKH_KeHoachKinhDoanh_SanPham_ChiTietKH: this.RenderThang(ele)
          }
        ],
        lstKH_KeHoachKinhDoanh_SanPham_ThoiGianHopDong: ele.lstThoiGianHopDong
      }
    })
    return list;
  }

  RenderThang(sanpham) {
    let data = [];
    for (let i = 1; i <= 12; i++) {
      data.push({
        ChiPhi: null,
        ChiPhiDinhMuc1Kg: null,
        ChiPhiQuyDoiNe: null,
        DoanhThu: null,
        DonGia: null,
        IdDuAn: this.store.getCurrent(),
        IdSanPham: sanpham.Id,
        Nam: 0,
        NangLucSanXuatNhaMay: 0,
        Ne: null,
        SanLuongThang: 0,
        SanLuongThangQuyNe: null,
        Thang: i,
        ThongTinThang_SanPham: {
          Thang: i,
          TongSoCa: 0,
          SoMayCon: 0,
          SoNgayLamViec: 0,
          SanLuongMotCa: 0,
          HieuSuat: 0,
          SanLuongQuyDoi: 0,
          IdLoaiContainer: "",
          IdLoaiPhuongThucVanChuyen: "",
          CachThuc: ""
        },
      })
    }
    return data;
  }

  ChapNhan() {
    let data = this.TransformData(this.listMatHang).filter(ele => ele.checked);
    // console.log("listmathang", data);
    this.activeModal.close(data);
  }

}
