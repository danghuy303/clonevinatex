import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danhsachluachonkien',
  templateUrl: './danhsachluachonkien.component.html',
  styleUrls: ['./danhsachluachonkien.component.css']
})
export class DanhsachluachonkienComponent implements OnInit {

  listView: any = [];
  checkedAll: boolean = false;
  listDaChon: any = [];
  title: string = '';

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
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
    let data = this.listView.filter((ele: any) => ele.checked)
    this.activeModal.close(data);
  }
}
