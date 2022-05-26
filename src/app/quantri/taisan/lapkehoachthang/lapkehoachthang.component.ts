import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';
import { ModalluachontaisantheolichxichthangComponent } from '../modal/modalluachontaisantheolichxichthang/modalluachontaisantheolichxichthang.component';

@Component({
  selector: 'app-lapkehoachthang',
  templateUrl: './lapkehoachthang.component.html',
  styleUrls: ['./lapkehoachthang.component.css']
})
export class LapkehoachthangComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = "";
  listNam: any = [];
  item: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  TaiSanItem: any = [];
  TuThang: any = '';
  DenThang: any = '';
  getMonth: any = '';
  ngayCuoiCungCuaThangDaChon:number;
  vi: any;
  checkBtnChonTaiSan: boolean;

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.vi = {
      monthNamesShort: ["01","02","03","04","05","06","07","08","09","10","11","12",]
    }
    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    }
    let data = {
      Keyword: "", 
      CurrentPage: 0, 
      PageSize: 20, 
      MaCongDoan: '', 
      IdBoPhanSuDung: '',
      IddmLoaiTaiSan: '', 
      IdUser: '', 
      Ngay: 0, 
      LoaiKeHoach: '',
      IdDuAn: 0,
    };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._servicesSanXuat.GetOptions().GetListdmPhanXuong().toPromise();
    Promise.all([ls1,ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listPhanXuong = mapArrayForDropDown(values[1], "Ten", "Id");
    });
    this.chonThang(this.item.ThoiGian);
    // console.log("this.item", this.item);
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.LichXichThang().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalluachontaisantheolichxichthangComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.item = this.item;
    modalRef.componentInstance.filter = this.item.ThoiGian ? { DenThang: this.DenThang, TuThang: this.TuThang, getMonth: this.getMonth } : {};
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];
    modalRef.componentInstance.checkBtnChonTaiSan = this.checkBtnChonTaiSan;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = deepCopy(res);
      this.item.listTaiSan.forEach(ele => {
        ele.IdBoPhanSuDung = this.item.IdBoPhanSuDung;
        ele.IddmLoaiTaiSan = this.item.IddmLoaiTaiSan;
        ele.ThoiGian = this.item.ThoiGian;
        if (!validVariable(ele.listBaoDuong)) {
          ele.listBaoDuong = []
          for (let i = 1; i <= 30; i++) {
            ele.listBaoDuong.push(
              {
                ThoiGian: i,
                listChiTiet: [],
              }
            )
          }
        }
      })
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian)+172800;
    return this.item;
  }

  ValidateData(isChuyenDuyet) {
    if (isChuyenDuyet) {
      if (!this.checkLoaiBaoDuong()) {
        this.toastr.error("Yêu cầu chọn loại bảo dưỡng cho tài sản!");
        return false;
      }
    }
    if (!validVariable(this.item.ThoiGian)) {
      this.toastr.error("Yêu cầu chọn tháng, năm!");
      return false;
    } else if (!validVariable(this.item.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu nhập loại tài sản!");
      return false;
    } else if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    } else if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm tài sản!");
      return false;
    }
    return true;
  }

  checkLoaiBaoDuong() {
    let loaiBaoDuongisNull;
    this.item.listTaiSan.forEach(taisan => {
      taisan.hasNullListBaoDuong = taisan.listBaoDuong.every(baoduong => baoduong.listChiTiet.length === 0);
    })
    loaiBaoDuongisNull = this.item.listTaiSan.some(taisan => taisan.hasNullListBaoDuong)
    return !loaiBaoDuongisNull;
  }

  GhiLai() {
    if (this.ValidateData(false)) {
      this._serviceTaiSan.LichXichThang().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkBtnChonTaiSan = res.Ghi;
      this.checkbutton = res;
    });
  }

  ChapNhan() {
    if (this.ValidateData(true)) {
      this._serviceTaiSan.LichXichThang().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  KhongDuyet() {
    this._serviceTaiSan.LichXichThang().KhongDuyet(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.LichXichThang().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  chonThang(time) {
    let date = new Date(this.item.ThoiGian);
    let month = time.getMonth() +1;
    let year = time.getFullYear();
    this.TuThang = new Date(date.getFullYear(), date.getMonth(), 1);
    this.DenThang = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.getMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    this.ngayCuoiCungCuaThangDaChon = new Date(year,month,0).getDate();
  }
}

