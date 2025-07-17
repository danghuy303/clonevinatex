import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from '../../../../services/Taisan/danhmuctaisan.service';
import { API } from '../../../../services/host';

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
  item: any = {};
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

  constructor(public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService, private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService) { }

  ngOnInit(): void {
    if (this.opt !== 'edit')
      this.item.HoatDong = true
    this.getListGiaoKeHoach();
    this.getListTrienKhaiKeHoach();
    this.getOptions();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.item.QRType = `{"MaQR":"${this.item.MaQR}","Type":"${this.item.Type}"}`
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
    ]).subscribe(
      ([loBong, matHang, hoanThanh, quyCach, kgCone]) => {
        this.options.listLoBong = mapArrayForDropDown(loBong as any[], 'Ten', 'Id');
        this.options.listMatHang = mapArrayForDropDown(matHang as any[], 'Ten', 'Id');
        this.options.listPhaBong = mapArrayForDropDown(hoanThanh as any[], 'SoQuyTrinh', 'Id');
        this.options.listQuyCach = mapArrayForDropDown(quyCach as any[], 'Ten', 'Id');
        this.options.listKgCone = mapArrayForDropDown(kgCone as any[], 'GiaTri', 'Id');
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
    this._danhMucTaiSan.InQrCodeLoHang(this.item.MaQR, this.item.SoLuong, this.item.IdKichThuoc || 100).subscribe((res: any) => {
      if (res.State === 1) {
        let url = res.Data
        window.open(API.imgURL + url);
        this.toastr.success(res.message)
      } else this.toastr.error(res.message)
    });
  }


  handleQR() {
    this.isQR = !this.isQR
  }
  toggleZoomQR() {
    this.isQRZoomed = !this.isQRZoomed;
  }

}
