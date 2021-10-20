import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import {TreeTableModule} from 'primeng/treetable';
@Component({
  selector: 'app-chinhsuadanhgiakhachhangmodal',
  templateUrl: './chinhsuadanhgiakhachhangmodal.component.html',
  styleUrls: ['./chinhsuadanhgiakhachhangmodal.component.css']
})
export class ChinhsuadanhgiakhachhangmodalComponent implements OnInit {
  item: any = {};
  IdQuyTrinh : any = '';
  checkedAll: boolean = false;
  paging: any = {};
  listTieuChiDanhGia: TreeNode[] = [];
  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(!validVariable(this.item.listTieuChiDanhGia))
      this.item.listTieuChiDanhGia = [];
    this.item.listTieuChiDanhGia.forEach(element => {
        let data: any = {"data":element,
                         "children":[]};
        element.listItem.forEach(chil => {
          let datachil: any = {"data":chil,
          "children":[]};
          data.children.push(datachil);
        });
        this.listTieuChiDanhGia.push(data);
    });

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listHopDong.length;
  }

  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref_copy.slice(start,end);
  }
  accept() {
    this.item.ketQuaDanhGia = this.item.listTieuChiDanhGia.reduce((total, ele) => {
      return total + (ele.diemDanhGia || 0)
    }, 0);
    this.activeModal.close(this.item)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = deepCopy(this.item.listHopDong);
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
    }
    else {
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listThuTucThanhToan_ref.length;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
  Onclose() {
    this.activeModal.close()
  }
}
