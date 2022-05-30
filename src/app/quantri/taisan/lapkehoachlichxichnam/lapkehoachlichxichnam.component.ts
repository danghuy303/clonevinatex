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
  currentYear: any = 0;
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
    this.currentYear = new Date().getFullYear();
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
      this.item.Nam = new Date().getFullYear();
    }
    else {
      this.GetQuyTrinhById(this.item.Id);
    }
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    Promise.all([ls1]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
    });
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.KiemTraButtonModal();
  }

  GetQuyTrinhById(id) {
    this._serviceTaiSan
      .LichXich()
      .Get(id)
      .subscribe((res: any) => {
        this.item = res.Data;
        this.item.listTaiSan.forEach(ele => {
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
        // this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        // this.checkDisableSelectMonth();
      });
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

  ValidateData() {
    if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return false;
    }
    if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm tài sản!");
      return false;
    }
    return true;
  }

  GhiLai() {
    // if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
    //   this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
    //   return
    // }
    if (this.ValidateData()) {
      this._serviceTaiSan.LichXich().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.toastr.success(res.Message);
          this.GetQuyTrinhById(this.item.Id);
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
    modalRef.componentInstance.checkBtnChonTaiSan = this.checkBtnChonTaiSan;
    modalRef.componentInstance.checkedAll = false;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = this.merge(res || [], this.item.listTaiSan, 'IdTaiSan').filter(ele => !ele.isXoa);
    })
      .catch((er) => {
      });
  }

  merge(newArr: Array<any>, existingArr: Array<any>, diffProp: string): Array<any> {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle[diffProp] === oldEle[diffProp]
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(
        (newEle) => newEle[diffProp] === oldEle[diffProp]
      );
      if (indexCheck === -1) {
        removeIndex.push(index);
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      if (!validVariable(existingArr[i].Id)) {
        existingArr.splice(removeIndex[i], 1);
      } else {
        existingArr[i].isXoa = true;
      }
    }
    return existingArr;
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
    modalRef.componentInstance.checkBtnChonTaiSan = this.checkBtnChonTaiSan;
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

  ChangeYear() {
    let data: any = {};
    let arr = [];
    data = {
      ListIdTaiSan: this.item.listTaiSan.map(ele => ele.IdTaiSan),
      // IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      // IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
      Ngay: DateToUnix(new Date(this.item.Nam, 1, 1)),
      IdQuyTrinh: this.item.Id,
    };
    this._serviceTaiSan.LichXich().GetListVatTuByIdTaiSanForLapKeHoachLichXichNam(data).subscribe((res: any) => {
      this.item.listTaiSan = res.Data.listTaiSan;
      // this.checkDisableSelectMonth();
    });
  }

  checkDisableSelectMonth() {
    this.item.listTaiSan.forEach(taisan => {
      // let thangDuaVaoSuDung = new Date(taisan.thoiGianDuaVaoSuDung).getMonth() + 1;
      // let thangHienTai = new Date().getMonth() + 2;
      // taisan.ThoiGian = thangDuaVaoSuDung < thangHienTai ? thangHienTai : thangDuaVaoSuDung;
      // taisan.Nam = new Date(taisan.thoiGianDuaVaoSuDung).getFullYear();

      // let thangDuaVaoSuDung = new Date(taisan.thoiGianDuaVaoSuDung).getMonth() + 1;
      // let thangHienTai = new Date().getMonth() + 2;
      if (new Date() > new Date(taisan.thoiGianDuaVaoSuDung)) {
        taisan.ThoiGian = new Date().getMonth() + 2;
        taisan.Nam = new Date().getFullYear();
      }
      else {
        taisan.ThoiGian = new Date(taisan.thoiGianDuaVaoSuDung).getMonth() + 1;
        taisan.Nam = new Date(taisan.thoiGianDuaVaoSuDung).getFullYear();
      }
      // taisan.ThoiGian = thangDuaVaoSuDung < thangHienTai ? thangHienTai : thangDuaVaoSuDung;
      // taisan.Nam = new Date(taisan.thoiGianDuaVaoSuDung).getFullYear();
      taisan.listBaoDuong.forEach(baoduong => {
        baoduong.canInput = this.comparison(taisan.Nam, taisan.ThoiGian, baoduong.ThoiGian)
      });
      taisan.listVatTu.forEach(vattu => {
        vattu.listThoiGian.forEach(thoiGianVatTu => {
          thoiGianVatTu.canInput = this.comparison(taisan.Nam, taisan.ThoiGian, thoiGianVatTu.ThoiGian)
        })
      })
      // chi phi
      taisan.listChiPhi.forEach(chiphi => {
        chiphi.canInput = this.comparison(taisan.Nam, taisan.ThoiGian, chiphi.ThoiGian)
      });
    })
  }

  comparison(year, time, repairTime) {
    //year năm đưa vào sử dụng
    //time = tháng to nhất so sánh giữa tháng đưa vào sử dụng và tháng hiện tại;
    //repairTime = tháng của bảo dưỡng
    if (this.item.Nam < year) {
      return false;
    }
    else if (this.item.Nam === year) {
      if (repairTime < time) {
        return false;
      } else {
        return true;
      }
    }
    else if (this.item.Nam > year) {
      return true
    }
    //false  = khoong duoc nhap
    //true  = duoc nhap
  }

}
