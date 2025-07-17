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
  selector: "app-chitiethopdongbongxomodal",
  templateUrl: "./chitiethopdongbongxomodal.component.html",
  styleUrls: ["./chitiethopdongbongxomodal.component.css"],
})
export class ChitiethopdongbongxomodalComponent implements OnInit {
  title: string = "Hợp đồng bông/xơ"
  item: any = {};
  @Input() res1: any = [];
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
    this.GetQuyTrinh();
    this._servicesSanXuat.GetListdmLoaiBongForHopDong(this.item.HopDong.loai || 0).subscribe((res: any) => {
      this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
      this.listLoaiMatHang_ref = res;
    })
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
