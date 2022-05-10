import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
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
      Keyword: this.filter.Keyword,
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      TuNgay: 0, DenNgay: 0,
      TabTrangThai: 0, IddmLoaiTaiSan: this.item.IdDmLoaiTaiSan, IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      isCanDuTru: false, isGiaTriCao: false, IdDuAn: 0,
    };
    this._serviceTaiSan.QuyTrinhBaoDuong().GetListTaiSanBaoDuong(data).subscribe((res: any) => {
      console.log("res", res);
      
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = [];
      res.Data.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);
        let data: any = { "data": obj, "children": [] };
        obj.listTaiSan?.forEach(con => {
          let datacon: any = { "data": con, "children": [] };
          con.checked = this.listItemDaChon.includes(con.IdTaiSan);
          data.children.push(datacon);
        });
        this.items.push(data);
      });
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

  checked() {
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
          IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich
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
              IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich
            });
          }
        });
      }
    });
    return data;
  }

  GhiLai() {
    // this._serviceTaiSan.QuyTrinhBaoDuong().GetListVatTuByIdTaiSanForXuLySuCo(this.FilterTree()).subscribe((res: any) => { 
    //   console.log(res);
      
    //   this.activeModal.close(res.Data);
    // });
    let data = this.FilterTree().map(ele => {
      return {
        IdTaiSan: ele.IdTaiSan,
        IdLapKeHoachLichXich: ele.IdLapKeHoachLichXich
      }
    })
    this._serviceTaiSan.GetOptions().GetListVatTuForBaoDuong(data).subscribe((res:any) => {
      
      this.activeModal.close(res.Data);
    })
  }

}
