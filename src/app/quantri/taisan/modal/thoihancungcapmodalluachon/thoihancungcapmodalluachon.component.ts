import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
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
    this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.GetList();
  }
  GetList() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      KeyWord: this.filter.KeyWord,
      IddmLoaiTaiSan: "",
      Nam: this.filter.Nam,
      Thang: this.filter.Thang,
      QuaHan: true,
    };
    this._serviceTaiSan.ThoiHanCungCap().LuaChon(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items;
      // res.Data.forEach(obj => {
      //   obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);
      //   let data: any = { "data": obj, "children": [] };
      //   obj.listTaiSan.forEach(con => {
      //     let datacon: any = { "data": con, "children": [] };
      //     con.checked = this.listItemDaChon.includes(con.IdTaiSan);
      //     data.children.push(datacon);
      //   });
      //   this.items.push(data);
      // });
      // this.checkedAll = res.Data.every(ele => ele.checked);
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
    if ((cha) && (con)) {
      return true;
    }
    else {
      return false;
    }
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
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.checked) {
        data.push({
          IdTaiSan: obj.Id,
          Ten: obj.Ten,
          IdNhaCungUng: obj.IddmNhaCungUng,
          Ma: obj.Ma,
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

