import { HopDongService } from "src/app/services/Hopdong/hopdong.service";

import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
// import { ModalcapnhattaisanComponent } from "../modal/modalcapnhattaisan/modalcapnhattaisan.component";

@Component({
  selector: 'app-danhsachtaisan',
  templateUrl: './danhsachtaisan.component.html',
  styleUrls: ['./danhsachtaisan.component.css']
})
export class DanhsachtaisanComponent implements OnInit {

  filter: any = {};
  eAction: any = "";
  loaiTab: any = 0;
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
  items: TreeNode[];

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceHopDong: HopDongService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.items = [
      {
          "data":{
              "name":"Documents",
              "size":"75kb",
              "type":"Folder"
          },
          "children":[
              {
                  "data":{
                      "name":"Work",
                      "size":"55kb",
                      "type":"Folder"
                  },
                  "children":[
                      {
                          "data":{
                              "name":"Expenses.doc",
                              "size":"30kb",
                              "type":"Document"
                          }
                      },
                      {
                          "data":{
                              "name":"Resume.doc",
                              "size":"25kb",
                              "type":"Resume"
                          }
                      }
                  ]
              },
              {
                  "data":{
                      "name":"Home",
                      "size":"20kb",
                      "type":"Folder"
                  },
                  "children":[
                      {
                          "data":{
                              "name":"Invoices",
                              "size":"20kb",
                              "type":"Text"
                          }
                      }
                  ]
              }
          ]
      },
      {
          "data":{
              "name":"Pictures",
              "size":"150kb",
              "type":"Folder"
          },
          "children":[
              {
                  "data":{
                      "name":"barcelona.jpg",
                      "size":"90kb",
                      "type":"Picture"
                  }
              },
              {
                  "data":{
                      "name":"primeui.png",
                      "size":"30kb",
                      "type":"Picture"
                  }
              },
              {
                  "data":{
                      "name":"optimus.jpg",
                      "size":"30kb",
                      "type":"Picture"
                  }
              }
          ]
      }
  ]
  }

  changeTab(e) {
    // this.trangThai = e.index + 1;
    this.loaiTab = e.index;
    this.Loaddata(true);
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    if (reset) {
      // this.paging.currentPage = 1;
    }
    let data = {
      pageSize: 20,
      // currentPage: this.paging.currentPage,
      tabTrangThai: 3,
      keyWord: this.filter.keyWord,
      tuNgay: DateToUnix(this.filter.TuNgay),
      denNgay: DateToUnix(this.filter.DenNgay),
      Loai: 0
    };
  }

  KiemTraTabTrangThai() {
    this._serviceDungChung.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
      this.checkQuyen = res;
      this.Loaddata();
    })
  }

  add() {
    // let modalRef = this._modal.open(ModalcapnhattaisanComponent, {
    //   size: "xl",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.opt = "add";    
    // modalRef.componentInstance.item = {};
    // modalRef.result
    //   .then((res: any) => {
    //     this.Loaddata();
    //   })
    //   .catch((er) => {

    //   });
  }

  edit(item) {
    // let modalRef = this._modal.open(ChitiethopdongbongxomodalComponent, {
    //   size: "fullscreen",
    //   backdrop: "static",
    // });
    // modalRef.componentInstance.opt = "edit";    
    // modalRef.componentInstance.item = {};
    // modalRef.result
    //   .then((res: any) => {
    //     this.Loaddata();
    //   })
    //   .catch((er) => {

    //   });
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ModalthongtinchitiettaisanComponent, {
      size: "fullscreen",
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

  }

}
