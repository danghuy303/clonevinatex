import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danhsachvattucungung',
  templateUrl: './danhsachvattucungung.component.html',
  styleUrls: ['./danhsachvattucungung.component.css']
})
export class DanhsachvattucungungComponent implements OnInit {

  listItem: any = [];
  checkedAll: boolean = false;
  Id: any = [];
  listDaChon: any = [];
  filter: any = {};
  title: string = 'Danh sách vật tư';
  titleHead: string = '';

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.GetDanhSach();
  }

  GetDanhSach() {
    this.listItem.forEach((ele: any) => {
      ele.checked = this.listDaChon.includes(ele.Id);
    })
    this.checked();
  }

  checkAll(e: any) {
    this.listItem.forEach((ele: any) => {
      ele.checked = e.checked;
    })
  }

  checked() {
    this.checkedAll = this.listItem.every((ele: any) => ele.checked)
  }

  ChapNhan() {
    let data = this.listItem.filter((ele: any) => ele.checked).map((ele: any) => {
      return {
        ...ele,
        Id: '',
        IddmItem: ele.Id,
      }
    });
    this.activeModal.close(data);
  }

}
