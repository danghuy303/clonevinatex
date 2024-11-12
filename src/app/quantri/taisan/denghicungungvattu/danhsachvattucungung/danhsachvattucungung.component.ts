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

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.GetDanhSachNhanVien();
  }

  GetDanhSachNhanVien() {
    this.listItem.forEach((ele: any) => {
      ele.checked = this.listDaChon.map((x: any) => x.IddmItem).includes(ele.Id);
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
      let _newObj = this.listDaChon.find((x: any) => x.IddmItem === ele.Id) ? this.listDaChon.find((x: any) => x.IddmItem === ele.Id) : ele;
      return {
        ..._newObj,
        Id: '',
        IddmItem: ele.Id,
      }
    });
    this.activeModal.close(data);
  }

}
