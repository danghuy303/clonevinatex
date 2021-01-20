import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-xuatkhomathangmodal',
  templateUrl: './xuatkhomathangmodal.component.html',
  styleUrls: ['./xuatkhomathangmodal.component.css']
})
export class XuatkhomathangmodalComponent implements OnInit {

  listMatHang: any = [];
  listItem: any = [];
  listItem_new: any = [];
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số lượng',
      field: 'Ton',
      width: 'unset'
    },
  ];
  checkedAll: boolean = false;
  paging: any = {};

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    this.listItem_new = this.listMatHang.slice(0,15);

    if(this.listItem != undefined && this.listItem!= null && this.listItem_new!= undefined && this.listItem_new!= null)
    {
      this.listItem.forEach(element => {
        var itemFind = this.listItem_new.find(function (obj) {
          return obj.IddmItem == element.IddmItem;
          // return obj.Id == element.IddmItem;
        });
        itemFind.checked = true;
      });
    }

  }
  accept() {
    let data: any = []
    this.listMatHang.forEach(element => {
      if (element.checked == true)
        data.push(element);
    });
    this.activeModal.close(
      { data: data }
    );
  }
  checkAll(e) {
    if (e.checked) {
      this.listMatHang.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listMatHang.forEach(item => {
        item.checked = false;
      });
    }

  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page)  + 1;
    var end =  start + 14;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.listItem_new = this.listMatHang.slice(start,end);
  }
}
