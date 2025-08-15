import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChondanhmucthutucthanhtoanmodalComponent } from '../../quyettoanhopdong/chondanhmucthutucthanhtoanmodal/chondanhmucthutucthanhtoanmodal.component';

@Component({
  selector: 'app-thanhtoanhopdongsoimodal',
  templateUrl: './thanhtoanhopdongsoimodal.component.html',
  styleUrls: ['./thanhtoanhopdongsoimodal.component.css']
})
export class ThanhtoanhopdongsoimodalComponent implements OnInit {


  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  lang: any = vn;
  data: any = {};
  type: any = '';
  nametype: any = '';
  listHopDong: any = [];
  listDieuKhoanThanhToan: any = [];
  listDieuKhoanThanhToanFull: any = [];
  listThanhToanInvoice: any = [];
  IdDuAn: any = 0;
  listIdThanhToanInvoice: any = [];
  listThanhToanInvoiceFull: any = [];
  listLoaiThanhToan: any = [{ label: 'Thanh toán theo kế hoạch thanh toán', value: 1 },
  { label: 'Thanh toán theo đợt xuất hàng', value: 2 }];
  userInfo: any;

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService, private _auth: AuthenticationService,
    private _hopdong: HopDongService, private _servicesdmHopDong: DanhMucHopDongService) {
    this.userInfo = this._auth.currentUserValue;
  }

  ngOnInit(): void {
    console.log(this.item)
    if (this.opt !== 'edit') {
      this.item = {
        Id: '',
        listFileDinhKem: [],
        listThanhToanMatHang: [],
        listThanhToanThuHoi: [],
        listThanhToanDotGiaoNhan: [],
        IdDuAn: this.IdDuAn,
        loai: 11,
      }
      this.GetNextSoQuyTrinh();
    }
    else {
      this.getQuyTrinh(this.item.Id);
    }
    this.getListHopDong();

  }
  getListHopDong() {
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(this.item.IdDuAn, 11).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'SoTenHopDong', 'Id');
    })
  }

  getListDieuKhoanThanhToan(isCheck = false) {
    if (isCheck === true) {
      this.item.listThanhToanMatHang = []
      this.item.listThanhToanDotGiaoNhan = []
      this.listIdThanhToanInvoice = []
    }
    if (this.item.LoaiThanhToan === 1) {
      this._hopdong.QuyTrinhHopDong().getListDieuKhoan(this.item.IdHopDong).subscribe((res: any) => {
        this.listDieuKhoanThanhToan = mapArrayForDropDown(res.data, 'NoiDung', 'Id');
        this.listDieuKhoanThanhToanFull = res.Data;

        var data = this.listDieuKhoanThanhToanFull.filter(e => e.Id == this.item.IdThanhToanDieuKhoan);
        if (data !== undefined) {
          this.item.GiaTriThanhToanHopDong = data[0].GiaTri || 0;
        }
      })
      this.item.listThanhToanMatHang = []
      this.item.listThanhToanDotGiaoNhan = []
      this.listIdThanhToanInvoice = []
    }
    else if (this.item.LoaiThanhToan === 2) {
      this._hopdong.QuyTrinhThanhToan().getListInvoice(this.item.IdHopDong).subscribe((res: any) => {
        this.listThanhToanInvoice = mapArrayForDropDown(res.data, 'SoQuyTrinh', 'IdPhieuXuatThanhPham');
        this.listThanhToanInvoiceFull = res.Data;
      })
    }
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  ChuyenTiep() {
    let isChuaNopDu: any = false;
    for (let i = 0; i < this.item.listHoSoDinhKem.length; i++) {
      if (this.item.listHoSoDinhKem[i].isNopDu !== true) {
        isChuaNopDu = true;
        break;
      }
    }
    if (isChuaNopDu === true) {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.message = "Bạn chưa nộp đủ tài liệu bạn chắc chắn muốn lưu quy trình này chứ?"
      modalRef.result.then(res => {
        if (this.CheckTruocKhiLuu()) {
          if (this.item.NgayThanhToan !== null && this.item.NgayThanhToan !== undefined)
            this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
          this._hopdong.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
            if (res) {
              if (res.StatusCode === 200) {
                this.activeModal.close();
                this.toastr.success(res.Message)
              } else {
                this.toastr.error(res.Message);
              }
            }
          })
        }
      }).catch()
    }
    else {
      if (this.CheckTruocKhiLuu()) {
        if (this.item.NgayThanhToan !== null && this.item.NgayThanhToan !== undefined)
          this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
        this._hopdong.QuyTrinhThanhToan().ChuyenTiep(this.item).subscribe((res: any) => {
          if (res) {
            if (res.StatusCode === 200) {
              this.activeModal.close();
              this.toastr.success(res.Message)
            } else {
              this.toastr.error(res.Message);
            }
          }
        })
      }
    }
  }
  KhongDuyet() {
    let isChuaNopDu: any = false;
    for (let i = 0; i < this.item.listHoSoDinhKem.length; i++) {
      if (this.item.listHoSoDinhKem[i].isNopDu !== true) {
        isChuaNopDu = true;
        break;
      }
    }
    if (isChuaNopDu === true) {
      let modalRef = this._modal.open(ModalthongbaoComponent, {
        backdrop: 'static'
      });
      modalRef.componentInstance.message = "Bạn chưa nộp đủ tài liệu bạn chắc chắn muốn lưu quy trình này chứ?"
      modalRef.result.then(res => {
        if (this.CheckTruocKhiLuu()) {
          if (this.item.NgayThanhToan !== null && this.item.NgayThanhToan !== undefined)
            this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
          this._hopdong.QuyTrinhThanhToan().KhongDuyet(this.item).subscribe((res: any) => {
            if (res) {
              if (res.StatusCode === 200) {
                this.activeModal.close();
                this.toastr.success(res.Message)
              } else {
                this.toastr.error(res.Message);
              }
            }
          })
        }
      }).catch()
    }
    else {
      if (this.CheckTruocKhiLuu()) {
        if (this.item.NgayThanhToan !== null && this.item.NgayThanhToan !== undefined)
          this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
        this._hopdong.QuyTrinhThanhToan().KhongDuyet(this.item).subscribe((res: any) => {
          if (res) {
            if (res.StatusCode === 200) {
              this.activeModal.close();
              this.toastr.success(res.Message)
            } else {
              this.toastr.error(res.Message);
            }
          }
        })
      }
    }
  }

  GetNextSoQuyTrinh() {
    this._hopdong.QuyTrinhThanhToan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  GhiLai() {
    if (this.CheckTruocKhiLuu()) {
      this.item.NgayThanhToanUnix = DateToUnix(this.item.NgayThanhToan);
      this._hopdong.QuyTrinhThanhToan().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message)
            this.opt = 'edit';
            this.getQuyTrinh(res.data.Id)
          } else {
            this.toastr.error(res.Message);
          }
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._hopdong.QuyTrinhThanhToan().Delete(this.item.Id).subscribe((res: any) => {
        console.log(res);
        if (res?.StatusCode === 200) {
          this.activeModal.close();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    }).catch(er => console.log(er))
  }

  getQuyTrinh(Id) {
    this._hopdong.QuyTrinhThanhToan().Get(Id).subscribe((res1: any) => {
      this.item = res1.data;
      this.listIdThanhToanInvoice = []
      if (this.item.NgayThanhToanUnix !== null && this.item.NgayThanhToanUnix !== undefined) {
        this.item.NgayThanhToan = UnixToDate(this.item.NgayThanhToanUnix);
      }
      if (this.item.listThanhToanDotGiaoNhan.length > 0) {
        this.item.listThanhToanDotGiaoNhan.forEach(element => {
          this.listIdThanhToanInvoice.push(element.IdPhieuXuatThanhPham)
        });
      }
      this.KiemTraButtonModal();
      this.getListDieuKhoanThanhToan();
    })
  }
  add() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newTableItem);
    this.newTableItem = {}

  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }
  CheckTruocKhiLuu() {
    if (this.newTableItem.Ten != undefined || this.newTableItem.SoCan != undefined || this.newTableItem.SoKien != undefined || this.newTableItem.IddmViTri != undefined) {
      this.add();
    }
    if (this.item.IdHopDong === null || this.item.IdHopDong === undefined) {
      this.toastr.error("Bạn chưa chọn hợp đồng!");
      return false;
    }
    else if (this.item.NgayThanhToan === null || this.item.NgayThanhToan === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày!");
      return false;
    }
    return true;
  }
  getListItem() {
    this.item.listThanhToanMatHang = [];
    this.item.listThanhToanDotGiaoNhan = [];
    this.listIdThanhToanInvoice.forEach(element => {
      let item: any = this.listThanhToanInvoiceFull.filter(e => e.IdPhieuXuatThanhPham == element)
      if (item !== undefined) {
        let itempush: any = {
          IdPhieuXuatThanhPham: element,
        }
        this.item.listThanhToanDotGiaoNhan.push(itempush);
      }
    });
    let data: any = deepCopy(this.listIdThanhToanInvoice);
    data.unshift(this.item.IdHopDong);
    this._hopdong.QuyTrinhThanhToan().GetListInvoiceHopDongChiTiet(data).subscribe((res: any) => {
      res.data.forEach(element => {
        let itempush: any = {
          Id: '',
          IddmItem: element.IddmItem,
          MadmItem: element.MadmItem,
          TendmItem: element.TendmItem,
          SoContainer: element.SoContainer,
          TongSoKien: element.TongSoKien,
          SoLuongDaThanhToan: element.SoLuongDaThanhToan,
          TongKhoiLuong: element.TongKhoiLuong,
          DonGia: element.DonGia,
        }
        this.item.listThanhToanMatHang.push(itempush);
      });
    })
  }
  layGiaTri() {
    var data = this.listDieuKhoanThanhToanFull.filter(e => e.Id == this.item.IdThanhToanDieuKhoan);
    if (data !== undefined) {
      this.item.GiaTriThanhToan = data[0].GiaTri || 0;
      this.item.GiaTriThanhToanHopDong = data[0].GiaTri || 0;
    }
  }
  TinhThanhTien() {
    this.item.GiaTriThanhToan = 0;
    if (this.item.listThanhToanMatHang === null || this.item.listThanhToanMatHang === undefined)
      this.item.listThanhToanMatHang = []
    this.item.listThanhToanMatHang.forEach(element => {
      this.item.GiaTriThanhToan += (element.SoLuong || 0) * (element.DonGia || 0);
    });
  }
  chonDanhMuc() {
    this._servicesdmHopDong.DanhMucThuTucThanhToan().GetListAll().subscribe((res1: any) => {
      let modalRef = this._modal.open(ChondanhmucthutucthanhtoanmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.componentInstance.listHangHoa = JSON.parse(JSON.stringify(this.item.listHoSoDinhKem || []));
      modalRef.result.then(res => {
        this.item.listHoSoDinhKem = res;
      }).catch(er => { console.log(er) });
    })
  }
  XuatExcel() {
    this._hopdong.QuyTrinhThanhToan().XuatExcel(this.item.Id).subscribe((res: any) => {
      if (res) {
        if (res.StatusCode === 200) {
          this._services.download(res.Data);
        }
      }
    })
  }

}
