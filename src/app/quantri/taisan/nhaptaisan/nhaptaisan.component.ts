import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";

import {
  DateToUnix,
  mapArrayForDropDown,
  UnixToDate,
} from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { DanhmuctaisanService } from "src/app/services/Taisan/danhmuctaisan.service";
import { TreeNode } from 'primeng/api';
import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";
import { ModalthongbaoComponent } from "../../modal/modalthongbao/modalthongbao.component";

@Component({
  selector: 'app-nhaptaisan',
  templateUrl: './nhaptaisan.component.html',
  styleUrls: ['./nhaptaisan.component.css']
})
export class NhaptaisanComponent implements OnInit {

  filter: any = {};
  eAction: any = "NHAPTAISAN";
  loaiTab: any = 0;
  paging: any = {};
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];
  trangThai: any = 1;

  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceHopDong: HopDongService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.resetFilter();
  }

  changeTab(e) {
    this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    let data = {
      pageSize: 20,
      currentPage: this.paging.currentPage,
      tabTrangThai: this.trangThai,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0
    };
    this._serviceTaiSan.NhapTaiSan().GetList(data).subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data.Items;
      this.paging = res.Data;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            obj_copy.children.push({ data: element });
          });
          delete obj.listTaiSan;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  add() {
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "add";
    modalRef.componentInstance.item = {
      Id: "",
      IdTaiSan: "",
      IdTrangThai: "",
      TenTrangThai: "",
      isKetThuc: false,
      TaiSan: {
        Id: "",
        isXoa: false,
        listFileDinhKem: [],
        Created: new Date(),
        Modified: new Date(),
      },
      listTaiSan: [],
    }
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {

      });
  }

  edit(item) {    
    let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
      size: "fullscreen-100",
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {
        this.Loaddata();
      })
      .catch((er) => {
      });
  }

  delte(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.NhapTaiSan().Delete(item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.Loaddata(false);
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

}
