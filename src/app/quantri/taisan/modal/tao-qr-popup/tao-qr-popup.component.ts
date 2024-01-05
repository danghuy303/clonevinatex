import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-tao-qr-popup',
  templateUrl: './tao-qr-popup.component.html',
  styleUrls: ['./tao-qr-popup.component.css']
})
export class TaoQrPopupComponent implements OnInit {
  opt: any = "";
  items: any = [];
  listItemDaChon: any = '';
  checkedAll: boolean = false;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  TaoQR() {
    let arr = [];
    for (let i = 1; i <= this.filter.SoLuong; i++) {
      arr.push(i)
    }
    this.items = arr.map((ele) => {
      return {
        checked: false,
        MaQr: Math.random().toString(36).substring(2, 12),
        TrangThai: ele.checked ? 'Đã hoạt động' : 'Còn trống'
      }
    });
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList() {

  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.data.checked = true;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = true;
          });
        }
      });
    } else {
      this.items.forEach(obj => {
        obj.data.checked = false;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = false;
          });
        }
      });
    }
  }

  checked(e) {
    this.items.forEach(ele => {
      if (ele.data.Id !== e.Id) {
        ele.data.disabled = e.checked; // nếu khác id thì disabled các item khác ( disabled = true). ko đc fix cứng => vì khi tích chọn thì e.checked = true
      }
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  GhiLai() {
    let data = this.items.find(ele => ele.checked).MaQr
    this.activeModal.close(data);
  }

}
