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
      ele.checked = this.listDaChon.includes(ele.IdTaiSan || ele.Id);
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
        ...ele,
        MaTaiSan: ele.MaTaiSan ? ele.MaTaiSan : ele.Ma,
        TenTaiSan: ele.TenTaiSan ? ele.TenTaiSan : ele.Ten,
        IdTaiSan: ele.IdTaiSan ? ele.IdTaiSan : ele.Id,
        Id: ele.IdTaiSan ? ele.Id : ''
      }
    });
    this.activeModal.close(data);
  }

}
