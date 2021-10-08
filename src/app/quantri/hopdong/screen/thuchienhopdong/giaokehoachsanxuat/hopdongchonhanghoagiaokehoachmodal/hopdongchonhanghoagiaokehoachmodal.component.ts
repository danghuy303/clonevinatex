import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-hopdongchonhanghoagiaokehoachmodal',
  templateUrl: './hopdongchonhanghoagiaokehoachmodal.component.html',
  styleUrls: ['./hopdongchonhanghoagiaokehoachmodal.component.css']
})
export class HopdongchonhanghoagiaokehoachmodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
  constructor(private _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService) { }

  ngOnInit(): void {
    this.items.forEach(item => {
      item.checked = false;
    });
    if (this.selectedItems.length !== 0) {
      switch (this.opt) {
        default:
          console.log(this.selectedItems)
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.iddmItem === item.Id)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
      }
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
    if (this.items.length !== 0) {
      this.checkedAll = this.items.every((ele) => ele.checked);
    }
  }
  resetFilter() {
    this.KeyWord = '';
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.items.every(ele => ele.checked)
  }
  accept() {
    switch (this.opt) {
      default:
        this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            // Ten: `${ele.Ma} - ${ele.Ten}`,
            idGiaoKeHoachSanXuat: this.IdQuyTrinh,
            iddmItem: ele.iddmItem,
            id: '',
          }
        }));
    }
  }
}
