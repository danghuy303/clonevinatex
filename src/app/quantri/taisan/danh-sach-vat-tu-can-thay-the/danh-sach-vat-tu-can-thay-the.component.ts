import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-danh-sach-vat-tu-can-thay-the',
  templateUrl: './danh-sach-vat-tu-can-thay-the.component.html',
  styleUrls: ['./danh-sach-vat-tu-can-thay-the.component.css']
})
export class DanhSachVatTuCanThayTheComponent implements OnInit {

  filter: any = {};
  eAction: any = "";
  loaiTab: any = 0;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: any = [];
  itemsTonKho: any = [];
  listLoaiTaiSan: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listNam: any = [];
  listBoPhanSuDung: any = [];
  labelThang: any[];
  checkList: any = [];
  checkedAll: boolean = false;
  listVatTuDaChon: any = [];
  checkButton: boolean = false;
  $sub!: Subscription;

  constructor(
    public _modal: NgbModal,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private router: Router,
    public toastr: ToastrService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
    this.labelThang = [];

  }

  ngOnInit(): void {
    let data = { PageSize: 20, CurrentPage: this.paging.page, Keyword: this.filter.Keyword, };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
    })
    this._serviceTaiSan.GetListdmPhanXuongForIdDuAn_QLTS().subscribe((res: any) => {
      this.listBoPhanSuDung = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.labelThang = [
      { label: 'All', value: 0 }
    ];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push({ label: i, value: i })
    }
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth() + 1;
    this.GetList();
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.filter.Nam = new Date().getFullYear();
    this.filter.Thang = new Date().getMonth() + 1;
    this.GetList(true);
  }

  GetList(reset?) {

    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      Nam: this.filter.Nam,
      Thang: this.filter.Thang,
      QuaHan: this.filter.QuaHan,
    };
    this._serviceTaiSan.ListDanhSachVatTu().GetList(data).subscribe((res: any) => {
      this.paging.CurrentPage = res.Data.Page;
      this.paging.TotalPages = res.Data.TotalPages;
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
      // this.CheckExist(this.items);
      // this.TimCheck();
      this.items = this.items.map(ele => {
        return {
          data: { ...ele, isShow: true, listVatTu: null },
          children: ele.listVatTu.map(obj => {
            return {
              data: {
                ...obj,
                SoLuongThayThe: obj.SoLuong,
                isShow: false
              },
              children: []
            }
          })
        }
      })
      this.checked();
    })
  }

  KiemTraNCC() {
    // let data = {
    //   ...this.checkList,
    // };
    let data = this.items.filter(ele => ele.data.checked).map(obj => obj.data.Id);
    this._serviceTaiSan.ListDanhSachVatTu().KiemTraNCC(data).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.toastr.success(res.Message);
        // this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  checked() {
    this.checkButton = this.items.some(ele => ele.data.checked)
    // this.items.forEach(ele => {
    //   let exist = this.listVatTuDaChon.find(obj => obj.Id === ele.data.Id);
    //   if (ele.data.checked) {
    //     if (!!!exist) { // Kiểm tra mảng tạm nhớ, nếu chưa có thì push vào
    //       this.listVatTuDaChon.push(ele)
    //     }
    //     // if (!this.listVatTuDaChon.includes(ele.Id)) { // Kiểm tra mảng tạm nhớ, nếu chưa có thì push vào
    //     //   this.listVatTuDaChon.push(ele)
    //     // }
    //   } else {
    //     if (!!exist) { // Kiểm tra mảng tạm nhớ, nếu đã có, mà ta bỏ check thì xóa ra khỏi mảng
    //       let index = this.listVatTuDaChon.findIndex(a => a.Id === ele.Id);
    //       if (index !== -1) {
    //         this.listVatTuDaChon.splice(index, 1)
    //       }
    //     }
    //   }
    // });
    this.TimCheck();
  }

  CheckExist(items) {
    items.forEach(ele => {
      let exist = this.listVatTuDaChon.find(obj => obj.Id === ele.Id);
      ele.checked = !!exist;
    })
  }
  TimCheck() {
    this.checkedAll = this.items.every(ele => ele.data.checked);
  }

  checkAll(e) {
    this.items.forEach(ele => {
      ele.data.checked = e.checked;
    })
    this.checked();
  }

  KiemTraTabTrangThai() {
    this._servicesSanXuat.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.GetList();
    })
  }

  exportExcel() {
    // let data = this.listVatTuDaChon.map(ele => {
    //   return {
    //     "Ma": ele.Ma,
    //     "Ten": ele.Ten,
    //     "TuoiTho": ele.TuoiTho,
    //     "TonKho": ele.TonKho,
    //     "SoLuongCanThayThe": ele.SoLuongCanThayThe,
    //     "DonGiaNhapGanNhat": ele.DonGiaNhapGanNhat,
    //     "ThanhTien": ele.ThanhTien,
    //   }
    // })
    let data = this.items.filter(ele => ele.data.checked).map(obj => {
      return {
        ...obj.data,
        listVatTu: obj.children.map(obj => {
          return {
            ...obj.data
          }
        })
      }
    });
    this._serviceTaiSan.ListDanhSachVatTu().exportExcel(data).subscribe((res: any) => {
      this._serviceTaiSan.ListDanhSachVatTu().download(res.Data);
    })

  }

}

