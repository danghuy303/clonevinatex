import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danhsachmathangui',
  templateUrl: './danhsachmathangui.component.html',
  styleUrls: ['./danhsachmathangui.component.css']
})
export class DanhsachmathangmuiComponent implements OnInit {

  title: string = '';
  listView: any = [];
  listDaChon: any = [];
  filter: any = { trangThai: '' };
  checkedAll: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.listView.forEach((ele: any) => {
      ele.checked = this.listDaChon.includes(ele.IddmItem);
    })
    this.checked();
  }
  checkAll(e: any) {
    this.listView.forEach((ele: any) => {
      ele.checked = e.checked;
    })
  }

  checked() {
    this.checkedAll = this.listView.every((ele: any) => ele.checked)
  }

  ChapNhan() {
    let data = this.listView.filter((ele: any) => ele.checked);
    data = data.map(ele => {
      return {
        ...ele,
        Id: ''
      }
    })
    this.activeModal.close(data);
  }

}

