import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kienlocongdieuchinhmodal',
  templateUrl: './kienlocongdieuchinhmodal.component.html',
  styleUrls: ['./kienlocongdieuchinhmodal.component.css']
})
export class KienlocongdieuchinhmodalComponent implements OnInit {

  item: any = {};
  item_new: any = {};
  selected: any = {};
  SoKienMoi: any = '';
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'SoLuong',
      width: 'unset'
    },
  ];
  paging1: any = {};
  paging: any = {};

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.paging1.CurrentPage = 1;
    this.paging1.TotalPage = 5;
    this.paging1.TotalItem = this.item_new.listFull.length;
    this.item.listFull = this.item_new.listFull.slice(0,15);

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item_new.listChuaXep.length;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(0,15);

    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });

    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    // if(this.listItem != undefined && this.listItem!= null && this.listMatHang!= undefined && this.listMatHang!= null)
    // {
    //   this.listItem.forEach(element => {
    //     var itemFind = this.listMatHang.find(function (obj) {
    //       return obj.IddmItem == element.IddmItem;
    //     });
    //     itemFind.checked = true;
    //   });
    // }
  }
  accept() {
    this.activeModal.close(
      { data: this.selected }
    );
  }
  itemCheck(item){
    item.checked = !item.checked;
    if(item.checked == true)
      this.selected = item
    else
      this.selected = {}
    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });
  }
  changePage1(event) {
    this.paging1.CurrentPage = event.page + 1;
    var start = 15 * (event.page)  + 1;
    var end =  start + 14;
    if((start + 15) > this.paging1.TotalItem)
      end= this.paging1.TotalItem;
    this.item.listFull = this.item_new.listFull.slice(start,end);
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page)  + 1;
    var end =  start + 14;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(start,end);
  }
}
