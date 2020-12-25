import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chonhanghoamodal',
  templateUrl: './chonhanghoamodal.component.html',
  styleUrls: ['./chonhanghoamodal.component.css']
})
export class ChonhanghoamodalComponent implements OnInit {
  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.selectedItems.length !== 0) {
      this.selectedItems.forEach(sItem => {
        let selected = this.items.filter(item => sItem.IddmItem === item.Id)[0];
        if (selected) {
          selected.checked = true;
        }
      });
    }
  }
  resetFilter() {
    this.KeyWord = '';
  }
  accept() {
    if (this.opt === "KhoiLuongKeHoach") {
      this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
        return {
          ...ele,
          IdGiaoKeHoachSanXuat: this.IdQuyTrinh,
          IddmItem: ele.Id,
          Id: '',
        }
      }))
    } else {
      this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
        return {
          ...ele,
          IdGiaoKeHoachSanXuat: this.IdQuyTrinh,
          IddmItem: ele.Id,
          Id: '',
        }
      }));
    }
  }
}
