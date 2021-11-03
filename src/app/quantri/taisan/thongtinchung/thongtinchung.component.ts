import { HopDongService } from "src/app/services/Hopdong/hopdong.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import { DateToUnix, formatdate, } from "src/app/services/globalfunction";
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { TreeNode } from 'primeng/api';
import { ModalthongtinchitiettaisanComponent } from "../modal/modalthongtinchitiettaisan/modalthongtinchitiettaisan.component";
@Component({
  selector: 'app-thongtinchung',
  templateUrl: './thongtinchung.component.html',
  styleUrls: ['./thongtinchung.component.css']
})
export class ThongtinchungComponent implements OnInit {
  items: TreeNode[];
item: any = {};
  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _serviceDungChung: SanXuatService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.Loaddata();
  }

  resetFilter() {
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    let data = {
      // PageSize: 20,
      // CurrentPage: this.paging.currentPage,
      // tabTrangThai: 3,
      // KeyWord: this.filter.KeyWord,
      // TuNgay: DateToUnix(this.filter.TuNgay),
      // DenNgay: DateToUnix(this.filter.DenNgay),
      // Loai: 0,
    };
    this._serviceTaiSan.ListDanhSachTaiSan().GetList(data).subscribe((res: any) => {
      console.log(res)
      let items = [];
      this.items = [];
      items = res.Data.Items;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            console.log(element)
            obj_copy.children.push({ data: element });
          });
          obj.listTaiSan = undefined;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
      console.log(items)
      console.log(this.items);
    })
  }
}