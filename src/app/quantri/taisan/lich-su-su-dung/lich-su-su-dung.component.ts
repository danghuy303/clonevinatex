import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { QuyTrinh } from './quy-trinh';

@Component({
  selector: 'app-lich-su-su-dung',
  templateUrl: './lich-su-su-dung.component.html',
  styleUrls: ['./lich-su-su-dung.component.css']
})
export class LichSuSuDungComponent implements OnInit {

  filter: any = {};
  paging: any = {};
  items: any = [];
  listdmPhanXuong: any = [];
  listdmLoaiTaiSan: any = [];
  quyTrinh: any = QuyTrinh;
  $sub!: Subscription;

  constructor(
    private _serviceTaiSan: TaisanService,
    private _serviceDungChung: SanXuatService,
    public _modal: NgbModal,
    private _serviceDmTaiSan: DanhmuctaisanService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.ResetData();
    this.GetListPhanXuong();
    this.GetListLoaiTaiSan();
  }

  GetListPhanXuong() {
    this._serviceDungChung.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListLoaiTaiSan() {
    let data = {
      CurrentPage: 0,
      PageSize: 0,
      Keyword: "",
      MaCongDoan: ""
    }
    this._serviceDmTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listdmLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  ResetData() {
    this.filter = {}
    this.LoadData(true);
  }

  LoadData(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
      IdBoPhanSuDung: this.filter.IdBoPhanSuDung,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
    }
    this._serviceTaiSan.BienDongTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.totalCount = res.Data.TotalCount;
    })
  }

  Edit(item) {
    let itemQuyTrinh = this.quyTrinh[item.MadmLoaiBienDong]
    let loaiModal = itemQuyTrinh.ModalType;
    let component = itemQuyTrinh.Component;
    console.log('item',item);
    if (loaiModal === 'CallOut') {
      this._serviceTaiSan
      [`${itemQuyTrinh.ServiceProp}`]()
      [`${itemQuyTrinh.ServiceMethod}`](item.IdQuyTrinh)
        .subscribe((res: any) => {
          let modalRef = this._modal.open(component, {
            size: 'fullscreen',
            backdrop: 'static'
          })
          modalRef.componentInstance.opt = 'edit';
          modalRef.componentInstance.title = item?.NoiDungBienDong;
          modalRef.componentInstance.item = res.Data;
        })
    } else {
      let modalRef = this._modal.open(component, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
        modalRef.componentInstance.title = item?.NoiDungBienDong;
      modalRef.componentInstance.item = { Id: item.IdQuyTrinh };
    }
  }

  ChangePage(e) {
    this.paging.currentPage = e.page + 1;
    this.LoadData(false)
  }

}
