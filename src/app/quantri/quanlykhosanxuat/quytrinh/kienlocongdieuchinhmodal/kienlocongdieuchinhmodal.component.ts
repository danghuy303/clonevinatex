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
  IddmItem: any = '';
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
      align: 'center',
    },
    {
      header: 'Vị trí',
      field: 'TendmViTri',
      width: 'unset',
      align: 'center',
    },
    {
      header: 'Trọng lượng',
      field: 'TrongLuong',
      width: 'unset',
      align: 'center',
    },
  ];
  paging1: any = {};
  paging: any = {};
  isCheck = false;
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.paging1.CurrentPage = 1;
    this.paging1.TotalPage = 5;
    this.paging1.TotalItem = this.item_new.listFull.length;
    this.item.listFull = this.item_new.listFull.slice(0, 15);

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item_new.listChuaXep.length;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(0, 15);

    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });

    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    for (let i = 0; i < this.item.listChuaXep.length; i++) {
      if (this.item.listChuaXep[i].IddmItem == this.IddmItem) {
        this.selected = this.item.listChuaXep[i];
        this.selected.checked = true;
        this.isCheck = true;
      }
    }
    if (this.isCheck === false) {
      for (let i = 0; i < this.item.listFull.length; i++) {
        if (this.item.listFull[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listFull[i];
          this.selected.checked = true;
        }
      }
    }
  }
  accept() {
    this.activeModal.close(
      { data: this.selected }
    );
  }
  itemCheck(item) {
    item.checked = !item.checked;
    if (item.checked == true){
      this.selected = item;
      this.isCheck = true;
    }
    else{
      this.selected = {};
    }
    this.item_new.listFull.filter(obj => {
      obj.checked = false;
    });
    this.item_new.listChuaXep.filter(obj => {
      obj.checked = false;
    });
  }
  changePage1(event) {
    this.paging1.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging1.TotalItem)
      end = this.paging1.TotalItem;
    this.item.listFull = this.item_new.listFull.slice(start, end);
    if (this.isCheck === false) {
      for (let i = 0; i < this.item.listFull.length; i++) {
        if (this.item.listFull[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listFull[i];
          this.selected.checked = true;
        }
      }
    }
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listChuaXep = this.item_new.listChuaXep.slice(start, end);
    if(this.isCheck === false){
      for (let i = 0; i < this.item.listChuaXep.length; i++) {
        if (this.item.listChuaXep[i].IddmItem == this.IddmItem) {
          this.selected = this.item.listChuaXep[i];
          this.selected.checked = true;
          this.isCheck = true;
        }
      }
    }
  }
}
