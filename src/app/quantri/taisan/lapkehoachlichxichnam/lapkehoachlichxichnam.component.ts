import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';


@Component({
  selector: 'app-lapkehoachlichxichnam',
  templateUrl: './lapkehoachlichxichnam.component.html',
  styleUrls: ['./lapkehoachlichxichnam.component.css']
})
export class LapkehoachlichxichnamComponent implements OnInit {
  opt: any = "";
  listNam: any = [];
  item: any = { isChon: 0, };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  store: any;
  TaiSanItem: any = [];
  count: number;
  trangThai: any = 0;


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
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20,
      // MaCongDoan: '',
      // IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      // IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
      // IdUser: '',
      // Ngay: 0,
      // LoaiKeHoach: '',
      // IdDuAn: 0,
      // IdTaiSan: this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [],
    };
    this._serviceTaiSan.LichXich().GetListTaiSanTheoNam(data).subscribe((res: any) => {
      let baoDuong = res.Data.listTaiSan;
      this.item.listTaiSan.forEach(ele => {
        let taiSan = baoDuong.filter(obj => obj.IdTaiSan === ele.IdTaiSan);
        if (taiSan !== undefined) {
          ele.listLichBaoDuong = [];
          ele.listLichBaoDuong = taiSan[0]?.listLichBaoDuong;
        }
      })
    })

    if (this.item.ThoiGianUnix !== 0) {
      this.item.ThoiGian = UnixToDate(this.item.ThoiGianUnix);
    }
    if (this.opt === 'add') {
      this.GetNextSoQuyTrinh();
    }
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }

    this.item.Nam = new Date().getFullYear();

    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();

    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.KiemTraButtonModal();
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.LichXich().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  setData() {
    this.item.ThoiGian = new Date(this.item.Nam, 0, 2);
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    this.item.listTaiSan = this.item.listTaiSan.filter(ele => !ele.isXoa);
    return this.item;
  }

  GhiLai() {
    if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return
    }
    this._serviceTaiSan.LichXich().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.item = res.Data;
        res.Data.listTaiSan.forEach(ele => {
          ele.listChiPhi.forEach(obj => {
            obj.TongTien = obj.ChiTietChiPhi.reduce((total, sum) => {
              return total + sum.SoTien;
            }, 0)
          })
          ele.TongTienChiPhi = ele.listChiPhi.reduce((total, number) => {
            return total + number.TongTien;
          }, 0)
        })
        this.item.Nam = UnixToDate(this.item.ThoiGianUnix).getFullYear();
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        // this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    this._serviceTaiSan.LichXich().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.LichXich().KhongDuyet(this.item).subscribe((res: any) => {
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
        this._serviceTaiSan.LichXich().Delete(this.item.Id).subscribe((res: any) => {
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
  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return
    }
    let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
      size: "fullscreen",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = res;
      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan');
      this.item.listTaiSan.forEach(ele => {
        ele.ThoiGian = new Date(ele.thoiGianDuaVaoSuDung).getMonth()+1;
        if (!validVariable(ele.listBaoDuong)) {
          ele.listBaoDuong = []
          for (let i = 1; i <= 12; i++) {
            ele.listBaoDuong.push(
              {
                ThoiGian: i,
                listChiTiet: [],
              }
            )
          }
        }
        // chi phi
        ele.listChiPhi.forEach(obj => {
          obj.ChiTietChiPhi = []
        })
      })
    })
      .catch((er) => {
      });
  }
  Chon(baoduong, taisan) {
    let modalRef = this._modal.open(ModalluachonloaibaoduongComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });

    modalRef.componentInstance.Nam = this.item.ThoiGian;
    modalRef.componentInstance.IdTaiSan = taisan.IdTaiSan;
    modalRef.componentInstance.listItemDaChon = baoduong.listChiTiet ? baoduong.listChiTiet.map(ele => ele?.IddmLoaiBaoDuong) : [];
    modalRef.componentInstance.IdBoPhanSuDung = this.item.IdBoPhanSuDung;
    modalRef.result.then((res: any) => {
      baoduong.listChiTiet = res;

    })
      .catch((er) => {
      });
  }
  ChonLoaiTaiSan() {
    this.item.listTaiSan.splice(0, this.item.listTaiSan.length);
  }
  changeTab(e) {
    this.trangThai = e.index;
  }

  clear() {
    this.item.listTaiSan.splice(0, this.item.listTaiSan.length);
  }

}
