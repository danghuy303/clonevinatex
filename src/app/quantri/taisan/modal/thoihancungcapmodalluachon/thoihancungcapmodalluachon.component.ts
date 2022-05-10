import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-thoihancungcapmodalluachon',
  templateUrl: './thoihancungcapmodalluachon.component.html',
  styleUrls: ['./thoihancungcapmodalluachon.component.css']
})
export class ThoihancungcapmodalluachonComponent implements OnInit {

  opt: any = "";
  items: any = [];
  item: any = [];
  listItemDaChon: any = [];
  Lay_Chon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    // this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.GetList();
  }
  GetList() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      IddmLoaiTaiSan: "",
      Nam: this.filter.Nam,
      Thang: this.filter.Thang,
      TuNgay:DateToUnix(this.filter.TuNgay),
      DenNgay:DateToUnix(this.filter.DenNgay),
      QuaHan: true,
    };
    this._serviceTaiSan.ThoiHanCungCap().LuaChon(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
      this.items.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.Id);
      });
     
      this.checkedAll = this.items.every(ele => ele.checked);
    });
  }
  TimCheck() {
    let check: boolean = false;
    check = this.items.every(ele => ele.checked);
    if ((check)) {
      return true;
    }
    else {
      return false;
    }
  }
  checkAll(e) {
    this.items.forEach(obj => {
      obj.checked = e.checked;
    })
  }
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.checked) {
        data.push({
          IdTaiSan: obj.Id,
          TenTaiSan: obj.Ten,
          // IdNhaCungUng: obj.IddmNhaCungUng,
          MaTaisan: obj.Ma,
          // TenLoaidmBaoDuong: obj.data.TendmLoaiBaoDuong,
        });
      }
    });
    return data;
  }
  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }
}

