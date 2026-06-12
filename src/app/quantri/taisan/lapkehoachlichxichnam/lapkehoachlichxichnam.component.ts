import { Component, DoCheck, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';
import { exhaustMap } from 'rxjs/operators';


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
  listCongDoan: any = [];
  store: any;
  TaiSanItem: any = [];
  count: number;
  trangThai: any = 0;
  currentYear: any = 0;
  checkBtnChonTaiSan: boolean;
  keyword: any = '';
  differ: any;
  opp: boolean = false;
  private customerDiffer: KeyValueDiffer<string, any>;
  private ghiLai$ = new Subject<void>();

  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private differs: KeyValueDiffers
  ) {

  }

  ngOnInit(): void {
    this.nextGhiLai();
    this.currentYear = new Date().getFullYear();
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20,
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
      this.item.Nam = new Date().getFullYear() + 1;
    }
    else {
      console.log("this.GetQuyTrinhById", this.item);
      this.GetQuyTrinhById(this.item.Id);
    }
    for (let i = new Date().getFullYear() - 10; i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._servicesSanXuat.GetListCongDoan().toPromise();
    Promise.all([ls1, ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data, "Ten", "Id");
      this.listCongDoan = mapArrayForDropDown(values[1], "Ten", "Ma");
    });
    // this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
    //   this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    // })
    this.KiemTraButtonModal();
    // this.customerDiffer = this.differs.find(this.item).create();
  }

  // customerChanged(changes: KeyValueChanges<string, any>) {
  //   console.log('changes');
  // }

  // ngDoCheck(): void {
  //   const changes = this.customerDiffer.diff(this.item);
  //   if (changes) {
  //     this.opp = !this.opp
  //     this.customerChanged(changes);
  //   }
  // }

  // QuayLai() {
  //   if (this.opp) {
  //     this.toastr.success('loi');
  //     this.activeModal.dismiss();
  //   }
  //   else this.activeModal.dismiss();
  // }

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
        this.KiemTraButtonModal();
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
    this.item.listTaiSan = this.item.listTaiSan?.filter((ele: any) => !ele.isXoa);
    return this.item;
  }

  ValidateData() {
    if (!validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
      this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
      return false;
    }
    if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm máy/thiết bị!");
      return false;
    }
    return true;
  }

  nextGhiLai() {
    console.log("this.item", this.item);

    this.ghiLai$
      .pipe(
        exhaustMap(() => {
          if (!this.ValidateData()) return []; // nếu validate fail thì không gọi

          return this._serviceTaiSan
            .GetDanhSachVatTuThayTheForLichXichNam(this.item.listTaiSan)
            .pipe(
              exhaustMap((taisan: any) => {
                this.item = {
                  ...this.item,
                  listTaiSan: taisan.Data
                };

                return this._serviceTaiSan.LichXich().Set(this.setData());
              })
            );
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.StatusCode !== 200 || !res.StatusCode) {
            this.toastr.error("Có lỗi trong quá trình xử lý!!!");
          } else {
            this.item = res.Data;
            this.toastr.success(res.Message);
            this.GetQuyTrinhById(this.item.Id);
          }
        },
        error: () => {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        }
      });
  }

  GhiLai() {
    // if (this.ValidateData()) {
    //   this._serviceTaiSan.GetDanhSachVatTuThayTheForLichXichNam(this.item.listTaiSan).subscribe((taisan: any) => {
    //     this.item = {
    //       ...this.item,
    //       listTaiSan: taisan.Data
    //     }
    //     this._serviceTaiSan.LichXich().Set(this.setData()).subscribe((res: any) => {
    //       if (res.StatusCode !== 200 || !res.StatusCode) {
    //         this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    //       } else {
    //         this.item = res.Data;
    //         this.toastr.success(res.Message);
    //         this.GetQuyTrinhById(this.item.Id);
    //       }
    //     }, (er) => {
    //       this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    //     })
    //   })
    // }
    console.log("this.item", this.item);

    this.ghiLai$.next();
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkBtnChonTaiSan = res.Ghi;
      this.checkbutton = res;
    });
  }
  ChuyenDuyet() {
    this._serviceTaiSan.GetDanhSachVatTuThayTheForLichXichNam(this.item.listTaiSan).subscribe((taisan: any) => {
      this.item = {
        ...this.item,
        listTaiSan: taisan.Data
      }
      this._serviceTaiSan.LichXich().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
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

  // ThemMoiDanhSachTaiSan() {
  //   if (!validVariable(this.item.IddmLoaiTaiSan) || !validVariable(this.item.IdBoPhanSuDung) || !validVariable(this.item.Nam)) {
  //     this.toastr.error("Yêu cầu nhập đầy đủ các trường bắt buộc!");
  //     return
  //   }
  //   let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
  //     size: "fullscreen",
  //     backdrop: "static",
  //   });
  //   modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : [];
  //   modalRef.componentInstance.opt = this.opt;
  //   modalRef.componentInstance.Lay_Chon = this.item;
  //   modalRef.componentInstance.item = this.item;
  //   modalRef.componentInstance.checkBtnChonTaiSan = this.checkBtnChonTaiSan;
  //   modalRef.componentInstance.checkedAll = false;
  //   modalRef.result.then((res: any) => {
  //     this.item.listTaiSan = this.merge(res || [], this.item.listTaiSan||[], 'IdTaiSan').filter(ele => !ele.isXoa);
  //   })
  //     .catch((er) => {
  //     });
  // }

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
    data = {
      ListIdTaiSan: this.item.listTaiSan.map(ele => ele.IdTaiSan),
      Ngay: DateToUnix(new Date(this.item.Nam, 1, 1)),
      IdQuyTrinh: this.item.Id,
    };
    this._serviceTaiSan.LichXich().GetListVatTuByIdTaiSanForLapKeHoachLichXichNam(data).subscribe((res: any) => {
      this.item.listTaiSan = res.Data.listTaiSan;
      this.checkDisableSelectMonth();
    });
  }

  checkDisableSelectMonth() {
    this.item.listTaiSan.forEach(taisan => {
      if (new Date() > new Date(taisan.thoiGianDuaVaoSuDung)) {
        taisan.ThoiGian = new Date().getMonth() + 2;
        taisan.Nam = new Date().getFullYear();
      }
      else {
        taisan.ThoiGian = new Date(taisan.thoiGianDuaVaoSuDung).getMonth() + 1;
        taisan.Nam = new Date(taisan.thoiGianDuaVaoSuDung).getFullYear();
      }
      taisan.listBaoDuong.forEach(baoduong => {
        baoduong.canInput = this.comparison(taisan.Nam, taisan.ThoiGian, baoduong.ThoiGian)
      });
      taisan.listVatTu.forEach(vattu => {
        vattu.listThoiGian.forEach(thoiGianVatTu => {
          thoiGianVatTu.canInput = this.comparison(taisan.Nam, taisan.ThoiGian, thoiGianVatTu.ThoiGian)
        })
      })
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

  // phần sửa theo yêu cầu

  ThemMoiDanhSachTaiSan() {
    let data = {
      IdBoPhanSuDung: this.item.IdBoPhanSuDung || "",
      Ngay: DateToUnix(new Date(this.item.Nam, 1, 1)) || 0,
      MaCongDoan: this.item.MaCongDoan || "",
      IdQuyTrinh: this.item.Id || "",
    }
    this._serviceTaiSan.LichXich().GetListVatTuByIdTaiSanForLapKeHoachLichXichNam(data).subscribe((res: any) => {
      this.item.listTaiSan = res.Data.listTaiSan;
    })
  }

  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa chứ?";
    modalRef.result
      .then((res) => {
        this.item.listTaiSan.splice(index, 1);
        //  this.item.IdBoPhanSuDung = null;
        this.item.listTaiSan = [...this.item.listTaiSan]
      })
      .catch((er) => console.log(er));
  }

  resetFilter() {
    this.keyword = '';
  }

  HandListTaiSan(data) {
    this.item.listTaiSan = data;
  }

  ChonCongDoan(event: any) {
    // this.ThemMoiDanhSachTaiSan()


    setTimeout(() => {
      // Tìm phần tử dropdown
      const dropdownElement = document.querySelector('p-dropdown');

      if (dropdownElement) {
        // Tìm phần tử input của filter trong dropdown
        const inputElement: any = dropdownElement.querySelector('.ui-dropdown-filter');
        if (inputElement) {
          inputElement.value = '';
          // Kích hoạt sự kiện input để cập nhật giá trị trong dropdown
          const inputEvent = new Event('input', { bubbles: true });
          inputElement.dispatchEvent(inputEvent);
        }
      }
    });
  }
}
