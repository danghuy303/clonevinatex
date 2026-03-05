import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service';
import { API } from '../../../../services/host';
import { mapQuyTrinhRoute } from '../../../../services/mapquytrinhroute';
import * as printJS from 'print-js';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-lohangmodal',
  templateUrl: './lohangmodal.component.html',
  styleUrls: ['./lohangmodal.component.css']
})
export class LohangmodalComponent implements OnInit {

  opt: any = ''
  listGiaoKeHoachFull: any = [];
  listGiaoKeHoach: any = [];
  listTrienKhaiKeHoach: any = [];
  item: any = { listItem: [] };
  khongclicknhieu: any = false;
  lang: any = vn;
  listGiaoKeHoach_TrienKhaiFull: any = [];
  listGiaoKeHoach_TrienKhai: any = [];
  options: any = { listLoBong: [] };
  isQR: any = false;
  listKichThuoc: any = [
    { value: 100, label: '100' },
    { value: 200, label: '200' },
    { value: 400, label: '400' },
  ];
  isQRZoomed: boolean = false;
  filter: any = {};
  QuyTrinhRoute: any = mapQuyTrinhRoute;
  item_MaQR: any = '';
  QRType: any = '';
  isCheckPort: boolean = true;

  constructor(public activeModal: NgbActiveModal, private store: StoreService,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService) { }

  ngOnInit(): void {
    this.isCheckPort = this.store.getIsCheckPort();
    if (this.opt !== 'edit')
      this.item.HoatDong = true
    this.getListGiaoKeHoach();
    this.getListTrienKhaiKeHoach();
    this.getOptions();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.item.QRType = `{"MaQR":"${this.item.MaQR}","Type":"${this.item.Type}","Ten":"${this.item.Ten}","IddmItem":"${this.item._IddmItem}","IddmQuyCachDongGoi":"${this.item.QuyCachDongGoi}","kg_Cone":"${this.item.TrongLuongKg_Cone}"}`
    this.item.listItem = this.item.listItem?.map((ele: any) => {
      return {
        ...ele,
        QRType: `{"MaQR":"${ele.MaQr}","Type":"${ele.Type}","Ten":"${ele.Ten}","IddmItem":"${ele.IddmItem}","IddmQuyCachDongGoi":"${ele.QuyCachDongGoi}","kg_Cone":"${ele.TrongLuongKg_Cone}"}`
      }
    })
  }

  getOptions() {
    // const urls = [
    //   'this.services.GetListLoBong()',
    //   'this._services.GetOptions().GetMatHang()',
    //   'this.services.PhuongAnPhaBong().GetHoanThanh()',
    //   'this.services.dmQuyCachDongGoi().GetList()',
    //   'this._services.GetListKgCone()',
    // ];
    forkJoin([
      this.services.GetListLoBong({ CurrentPage: 0 }),
      this.services.GetOptions().GetMatHang(),
      this.services.PhuongAnPhaBong().GetHoanThanh(),
      this.services.dmQuyCachDongGoi().GetList(),
      this.services.GetListKgCone(),
      this.services.LoHang().GetList({ CurrentPage: 0 }),
    ]).subscribe(
      ([loBong, matHang, hoanThanh, quyCach, kgCone, lohang]) => {
        this.options.listLoBong = mapArrayForDropDown(loBong as any[], 'Ten', 'Id');
        this.options.listMatHang = mapArrayForDropDown(matHang as any[], 'Ten', 'Id');
        this.options.listPhaBong = mapArrayForDropDown(hoanThanh as any[], 'SoQuyTrinh', 'Id');
        this.options.listQuyCach = mapArrayForDropDown(quyCach as any[], 'Ten', 'Id');
        this.options.listQuyCachAll = quyCach;
        this.options.listKgCone = mapArrayForDropDown(kgCone as any[], 'GiaTri', 'Id');
        this.options.listLoHang = lohang;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    );
  }

  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.LoHang().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  getListGiaoKeHoach() {
    this.services.GetOptions().GetListGiaoKeHoachSanXuatChuaLapKeHoach().subscribe((res: any) => {
      this.listGiaoKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
      this.listGiaoKeHoachFull = res;
    })
  }

  getListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
      isHoanThanh: false
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listGiaoKeHoach_TrienKhaiFull = res;
      this.listGiaoKeHoach_TrienKhai = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
  giaoKeHoach(event) {
    var itemFind = this.listGiaoKeHoachFull.find(function (obj) {
      return obj.Id == event.value;
    });
    this.item.IddmPhanXuong = itemFind.IddmPhanXuong;
    this.item.IdGiaoKeHoachSanXuat = itemFind.Id;
    let dataFilter: any = this.listGiaoKeHoach_TrienKhaiFull.filter(ele => ele.IdGiaoKeHoachSanXuat === itemFind.Id);
    this.listGiaoKeHoach_TrienKhai = mapArrayForDropDown(dataFilter, 'SoQuyTrinh', 'Id');
  }

  InQrCode() {
    if (this.item.NgayNhapKho) {
      let data = {
        // KichThuoc: this.item.IdKichThuoc || 100,
        MaQR: this.item_MaQR || this.item.MaQR,
        SoBan: this.item.SoBan || 1,
        KhoGiay: this.item.KhoGiay || 8,
        NgayUnix: DateToUnix(this.item.NgayNhapKho)
      }
      this._danhMucTaiSan.InQrCodeLoHang(data).subscribe((res: any) => {
        if (res.State === 1) {
          const url = API.imgURL + res.Data;
          printJS({
            printable: url,
            type: 'pdf',
            showModal: false
          });
          this.toastr.success(res.message)
        } else this.toastr.error(res.message)
      });
    } else this.toastr.error('VUi lòng chọn ngày nhập kho!!!')

  }


  handleQR() {
    this.item_MaQR = '';
    this.isQR = !this.isQR;
    this.item.KhoGiay = 8;
  }
  toggleZoomQR(_MaQR: any) {
    this.isQRZoomed = !this.isQRZoomed;
    this.QRType = _MaQR;
  }

  handleLoHang() {
    let objLoHang = this.options.listLoHang?.find(ele => ele.Id === this.filter.LoHang.Id);
    this.item.Ten = objLoHang.Ten;
    this.item.Ma = objLoHang.Ma;
  }

  xemChiTiet(IdQuyTrinh, Ma) {
    let routerURL = '';
    routerURL = this.QuyTrinhRoute[Ma];
    if (routerURL) {
      window.open(`${API.imgURL}/vinatex/#${routerURL}/${IdQuyTrinh || 0}`);
    } else {
      this.toastr.warning("Không tìm thấy điều hướng của quy trình!");
    }
  }

  handleQuyCach() {
    this.item.TrongLuongKg_Cone = this.options.listQuyCachAll?.find(ele => ele.Id === this.item.QuyCachDongGoi)?.Kg_Cone || 0;
  }
  // 18/9/2025 a_cong thay đổi
  handleQuyCach_Item(data: any) {
    data.TrongLuongKg_Cone = this.options.listQuyCachAll?.find(ele => ele.Id === data.QuyCachDongGoi)?.Kg_Cone || 0;
    this.item.listItem = [...this.item.listItem];
  }
  handleDel(idx: number) {
    this.item.listItem.splice(idx, 1);
    this.item.listItem = [...this.item.listItem];
  }

  handleAdd() {
    this.item.listItem = this.item.listItem?.length ? this.item.listItem : [];
    this.item.listItem.push({});
  }

  handlePrint(data: any) {
    this.isQR = !this.isQR;
    this.item.KhoGiay = 8;
    this.item_MaQR = data.MaQr;
  }

}
