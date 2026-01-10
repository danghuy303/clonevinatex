import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danhsachtaisanpopup',
  templateUrl: './danhsachtaisanpopup.component.html',
  styleUrls: ['./danhsachtaisanpopup.component.css']
})
export class DanhsachtaisanpopupComponent implements OnInit {

  title: string = '';
  item: any = {};
  listView: any = [];
  checkAll: boolean = false;
  listDaChon: any = [];


  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.listView.forEach((ele: any) => {
      ele.checked = this.listDaChon.includes(ele.Id);
    });
    this.checkAll = this.listView.every((ele: any) => ele.checked);
  }

  select() {
    this.checkAll = this.listView.every((ele: any) => ele.checked);
  }

  selectAll() {
    this.listView = this.listView.map((ele: any) => {
      return {
        ...ele,
        checked: this.checkAll
      }
    })
  }

  handleChapNhan() {
    let data = this.listView.filter((ele: any) => ele.checked).map((ele: any, index: number) => {
      return {
        MaTaiSan: ele.Ma,
        TenTaiSan: ele.Ten,
        IdTaiSan: ele.Id,
        Id: ''
      }
    });
    this.activeModal.close(data);
  }

}
