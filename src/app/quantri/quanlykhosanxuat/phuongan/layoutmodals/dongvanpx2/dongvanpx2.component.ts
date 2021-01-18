import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dongvanpx2',
  templateUrl: './dongvanpx2.component.html',
  styleUrls: ['./dongvanpx2.component.css']
})
export class Dongvanpx2Component implements OnInit {
  checkbutton: any = {};
  listLoBong: any = [];
  item: any = {};
  block1: any = [];
  block2: any = [];
  block3: any = [];
  block4: any = [];
  block5: any = [];
  poolLoBong: any = [];
  banBong: any = {};
  ngoaiQuan: any = [29,35,41,48,55,64,70,77];
  focusedSlot: any = null;
  length:number=0;
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public _toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    this.length = this.item.listItem.reduce((total,ele)=>{
      return total + ele.SoLuong
    },0)
    for (let i = 1; i <= (this.length+this.ngoaiQuan.length); i++) {
      let isNgoaiQuan = this.ngoaiQuan.findIndex(ele => ele === i) > -1;
      this.banBong[`${i}`] = {
        _focus: false,
        _ngoaiQuan: isNgoaiQuan,
        labelLoBong: isNgoaiQuan ? 'Ngoại quan bông' : null,
        STT: `${i}. `,
        IdLoBong: null,
        Mau: 'white'
      }
      if (i <= 2) {
        this.block1.push(`${i}`)
      }
      if (2 < i && i <= 24) {
        this.block2.push(`${i}`)
      }
      if (24 < i && i <= 26) {
        this.block3.push(`${i}`)
      }
      if (26 < i && i <= 57) {
        this.block4.push(`${i}`)
      }
      if (57 < i && i <= 80) {
        this.block5.push(`${i}`)
      }
    };
    this.block3.reverse();
  }
  slotFocus(slot) {
    for (let prop in this.banBong) {
      this.banBong[prop]._focus = false;
    }
    if (!this.banBong[slot].isNgoaiQuan) {
      this.banBong[slot]._focus = !this.banBong[slot]._focus;
      this.focusedSlot = parseInt(slot);
    } else {
      this.focusedSlot = null;
    }
  }
  returnSlot(event: MouseEvent, item) {
    if(validVariable(this.banBong[item].IdLoBong)){
      let _returnSlot = this.item.listItem.find(ele => ele.IdLoBong === this.banBong[item].IdLoBong);
      if(validVariable(_returnSlot)){
        _returnSlot.DaXep--;
        this.banBong[item].IdLoBong = null;
        this.banBong[item].labelLoBong = null;
        this.banBong[item].Mau = 'white';
      }
    }
    event.preventDefault();
  }
  xepLoBong(lobong, i) {
    if (validVariable(this.focusedSlot)) {
      if (validVariable(this.item.listItem[i].DaXep)) {
        if (this.item.listItem[i].DaXep < this.item.listItem[i].SoLuong) {
          if(validVariable(this.banBong[this.focusedSlot].IdLoBong)){
            let _returnSlot = this.item.listItem.find(ele => ele.IdLoBong === this.banBong[this.focusedSlot].IdLoBong);
            if(validVariable(_returnSlot)){
              _returnSlot.DaXep--;
            }
          }
          this.item.listItem[i].DaXep++
          this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
          this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
          this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.IdLoBong;
          this.clearFocus()
          this.getNextFocus()
        }
      } else {
        if(validVariable(this.banBong[this.focusedSlot].IdLoBong)){
          let _returnSlot = this.item.listItem.find(ele => ele.IdLoBong === this.banBong[this.focusedSlot].IdLoBong);
          if(validVariable(_returnSlot)){
            _returnSlot.DaXep--;
          }
        }
        this.item.listItem[i].DaXep = 1;
        this.banBong[`${this.focusedSlot}`].labelLoBong = lobong.TenLoBong;
        this.banBong[`${this.focusedSlot}`].Mau = lobong.Mau;
        this.banBong[`${this.focusedSlot}`].IdLoBong = lobong.IdLoBong;
        this.clearFocus()
        this.getNextFocus()
      }
    } else {
      this.getNextFocus()
    }
  }
  clearFocus() {
    for (let prop in this.banBong) {
      this.banBong[prop]._focus = false;
    }
  }
  getNextFocus() {
    for (let prop in this.banBong) {
      if (!this.banBong[prop]._focus && !validVariable(this.banBong[prop].labelLoBong) && parseInt(prop) <= (this.length+this.ngoaiQuan.length)) {
        this.focusedSlot = parseInt(prop);
        this.banBong[prop]._focus = true;
        break;
      } else {
        this.focusedSlot = null;
      }
    }
  }
}
