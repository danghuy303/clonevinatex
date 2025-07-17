

import { AuthenticationService } from "./../../../../../services/auth.service";
import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ModalthongbaoComponent } from "src/app/quantri/modal/modalthongbao/modalthongbao.component";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { vn } from "src/app/services/const";
import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
  validVariable,
} from "src/app/services/globalfunction";

@Component({
  selector: 'app-modallaphopdongbongxo',
  templateUrl: './modallaphopdongbongxo.component.html',
  styleUrls: ['./modallaphopdongbongxo.component.css']
})

export class ModallaphopdongbongxoComponent implements OnInit {
  opt: any = "add";
  title: string
  item: any = {};
  hopDong: any = {};
  listLoaiMatHang: any = []
  listLoaiMatHang_ref: any = []
  listDieuKhoanThanhToan: any = [];
  userInfo: any;
  newItem: any = {};
  isBong: boolean = true
  filter: any = {
    keyWord: "",
  };
  lang: any = vn;

  checkedAll: boolean = false;
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  };
Id:any = "";
  yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 5
    }`;
  constructor(
    public activeModal: NgbActiveModal,
    private _auth: AuthenticationService,
    public _modal: NgbModal,
    private _service: HopDongService,
    private _servicesSanXuat: SanXuatService,
    private _toastr: ToastrService
  ) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
      this.title = 'Thêm mới hợp đồng bông xơ'
      this.item.listHangHoa[0].DonGiaThanhToan = 0;
      this.item.listHangHoa[0].DonGia = 0;
    } else {
      this.title = "Chỉnh sửa hợp đồng bông xơ"
      this.GetQuyTrinh();
    }
    this._servicesSanXuat.GetListdmLoaiBongForHopDong(this.item.HopDong.Loai || 0).subscribe((res: any) => {
      this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
      this.listLoaiMatHang_ref = res;
    })
  }
  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.HopDong.Id || "", this.item.HopDong.IdTrangThai || "").subscribe((res: any) => {
        this.checkbutton = res;
      });
  }

  GetNextSoQuyTrinh() {
    this._service.QuyTrinhHopDong().GetNextSoQuyTrinh().subscribe((res: any) => {
        this.item.HopDong.SoQuyTrinh = res.Data;
      });
  }
  GetQuyTrinh() {
    this._service.QuyTrinhHopDong().Get(this.Id).subscribe((res1: any) => {
      this.item = res1.Data
      this.item.HopDong.IdTrangThai = res1.Data.HopDong.IdTrangThai;
      this.item.HopDong.Id = res1.Data.HopDong.Id;
      this.item.HopDong.NgayKy = UnixToDate(this.item.HopDong.NgayKyUnix);
      this.item.HopDong.NgayHieuLuc = UnixToDate(this.item.HopDong.NgayHieuLucUnix );
      this.item.HopDong.NgayGiaoHang = UnixToDate(this.item.HopDong.NgayGiaoHangUnix);
      this.item.HopDong.NgayDuKienVeKho = UnixToDate(this.item.HopDong.NgayDuKienVeKhoUnix);
      if(this.item.listHangHoa.length > 0){
        this.item.listHangHoa[0].DonGiaThanhToan =  (this.item.listHangHoa[0].DonGia || 0) * 1.1;
        this.item.listHangHoa[0].GiaTriHopDongMatHang =  (this.item.listHangHoa[0].DonGiaThanhToan || 0) * (this.item.listHangHoa[0].SoLuong || 0);
      }
        this.item.HopDong.BenBanChiu = this.item.HopDong.isBenBanChiu;
        this.item.HopDong.BenMuaChiu = !this.item.HopDong.BenBanChiu;
      
      this.KiemTraButtonModal();
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
  ValidData() {
    if (!validVariable(this.item.HopDong.IddmLoaiHopDong)) {
      this._toastr.error("Vui lòng chọn loại hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.HopDong.TenHopDong)) {
      this._toastr.error("Vui lòng chọn tên hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.HopDong.SoHopDong)) {
      this._toastr.error("Vui lòng chọn số hợp đồng");
      return false;
    }
    else if (!validVariable(this.item.HopDong.Loai)) {
      this._toastr.error("Vui lòng chọn loại hàng hóa");
      return false;
    }
    return true;
  }

  GhiLai() {
    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    this.item.HopDong.NgayDuKienVeKhoUnix = DateToUnix(this.item.HopDong.NgayDuKienVeKho);
    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    if (this.ValidData()) {
      this._service.QuyTrinhHopDong().Set(this.item).subscribe((res: any) => {
          console.log(res);
          if (res) {
            if (res?.statusCode === 200) {
              this._toastr.success(res.Message);
              this.Id = res.Data;
              this.GetQuyTrinh()
            } else {
              this._toastr.error(res.Message);
            }
          }
        });
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._service
          .QuyTrinhHopDong()
          .Deletes(this.item.HopDong.Id)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.statusCode === 200) {
              this.activeModal.close();
              this._toastr.success(res.Message);
            } else {
              this._toastr.error(res.Message);
            }
          });
      })
      .catch((er) => console.log(er));
  }
  ChuyenTiep() {

    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    this.item.HopDong.NgayDuKienVeKhoUnix = DateToUnix(this.item.HopDong.NgayDuKienVeKho);

    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        console.log(res);
        if (res?.statusCode === 200) {
          this._toastr.success(res.Message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.Message);
        }
      }
    })

  }
  KhongDuyet() {
    this.item.HopDong.NgayKyUnix = DateToUnix(this.item.HopDong.NgayKy);
    this.item.HopDong.NgayHieuLucUnix = DateToUnix(this.item.HopDong.NgayHieuLuc);
    this.item.HopDong.NgayGiaoHangUnix = DateToUnix(this.item.HopDong.NgayGiaoHang);
    this.item.HopDong.NgayDuKienVeKhoUnix = DateToUnix(this.item.HopDong.NgayDuKienVeKho);

    if (this.item.HopDong.BenBanChiu) {
      this.item.HopDong.isBenBanChiu = true;
    }
    this._service.QuyTrinhHopDong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res?.statusCode === 200) {
          this._toastr.success(res.Message)
          this.activeModal.close();
        } else {
          this._toastr.error(res.Message);
        }
      }
    })

  }
}
