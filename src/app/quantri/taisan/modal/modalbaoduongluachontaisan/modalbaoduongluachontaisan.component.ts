import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalbaoduongluachontaisan',
  templateUrl: './modalbaoduongluachontaisan.component.html',
  styleUrls: ['./modalbaoduongluachontaisan.component.css']
})
export class ModalbaoduongluachontaisanComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  listCheckedItems: any = [];
  ROWS_PER_PAGES = 10;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.resetFilter();
  }

  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 0;
    }
    let data = {
      Keyword: this.filter.Keyword,
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TuNgay: DateToUnix(this.filter.TuNgay), 
      DenNgay: DateToUnix(this.filter.DenNgay),
      TabTrangThai: 0, IddmLoaiTaiSan: this.item.IdDmLoaiTaiSan, IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      isCanDuTru: false, isGiaTriCao: false, IdDuAn: 0,
    };
    this._serviceTaiSan.QuyTrinhBaoDuong().GetListTaiSanBaoDuong(data).subscribe((res: any) => {
      // console.log("res", res);
      this.items = [];
      res.Data.forEach(obj => {
        // obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);
        obj.checked = this.listItemDaChon.includes(obj.IdTaiSan_BaoDuong);
        let data: any = { "data": obj, "children": [] };
        obj.listTaiSan?.forEach(con => {
          let datacon: any = { "data": con, "children": [] };
          // con.checked = this.listItemDaChon.includes(con.IdTaiSan);
          con.checked = this.listItemDaChon.includes(con.IdTaiSan_BaoDuong);
          data.children.push(datacon);
        });
        this.items.push(data);
      });
      this.paging.TotalCount = this.items.length;
      // console.log("this.items", this.items);
      // this.item = res;
      // this.items = this.SplitPages(this.items)
      this.checkedAll = res.Data.every(ele => ele.checked);
    });
  }

  TimCheck() {
    let cha: boolean = false;
    let con: boolean = false;
    cha = this.items.every(ele => ele.data.checked);
    this.items.filter(obj => {
      if (validVariable(obj.children) && obj.children.length > 0) {
        con = obj.children.every(ele => ele.data.checked);
        if (!con) {
          return false;
        }
      }
    });
    // if ((cha) && (con)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    return cha;
  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.data.checked = true;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = true;
          });
        }
      });
    } else {
      this.items.forEach(obj => {
        obj.data.checked = false;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = false;
          });
        }
      });
    }
  }

  checked(status, id) {
    this.checkedAll = this.TimCheck();
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          IdTaiSan: obj.data.IdTaiSan,
          TenTaiSan: obj.data.TenTaiSan,
          MaTaiSan: obj.data.Ma,
          IddmLoaiBaoDuong: obj.data.IddmLoaiBaoDuong,
          // MaTaiSan: obj.data.MadmLoaiBaoDuong,
          TenLoaidmBaoDuong: obj.data.TendmLoaiBaoDuong,
          ThoiGianKeHoach: obj.data.ThoiGianKeHoach,
          IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich,
          IdTaiSan_BaoDuong: obj.data.IdTaiSan_BaoDuong
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            // data.push(
            //   objchildren.data.IdTaiSan,
            // );
            data.push({
              IdTaiSan: objchildren.data.IdTaiSan,
              IddmLoaiBaoDuong: objchildren.data.IddmLoaiBaoDuong,
              TenTaiSan: objchildren.data.TenTaiSan,
              MaTaiSan: objchildren.data.Ma,
              // MaTaiSan: objchildren.data.MadmLoaiBaoDuong,
              TenLoaidmBaoDuong: objchildren.data.TendmLoaiBaoDuong,
              ThoiGianKeHoach: objchildren.data.ThoiGianKeHoach,
              IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich,
              IdTaiSan_BaoDuong: obj.data.IdTaiSan_BaoDuong
            });
          }
        });
      }
    });
    return data;
  }

  GhiLai() {
    let data = this.FilterTree().map(ele => {
      return { 
        // IdTaiSan: ele.IdTaiSan,
        // IdLapKeHoachLichXich: ele.IdLapKeHoachLichXich,
        // IddmLoaiBaoDuong: ele.IddmLoaiBaoDuong
        IdTaiSan_BaoDuong: ele.IdTaiSan_BaoDuong
      }
    })
    this._serviceTaiSan.GetOptions().GetListVatTuForBaoDuong(data).subscribe((res:any) => {
      this.activeModal.close(res.Data);
    })
  }

  SplitPages(arr) {
    let first = this.paging.CurrentPage * this.ROWS_PER_PAGES;
    let last = first + this.ROWS_PER_PAGES;
    return arr.slice(first, last);
  }

  changePage(event) {
    this.paging.CurrentPage = event.page;
    this.GetList(false)
  }

}
