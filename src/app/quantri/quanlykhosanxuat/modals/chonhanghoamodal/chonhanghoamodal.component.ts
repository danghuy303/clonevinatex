import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

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
  constructor(private activeModal: NgbActiveModal, private _services: SanXuatService) { }

  ngOnInit(): void {
    console.log(this.items);
    console.log(this.selectedItems);
    if (this.selectedItems.length !== 0) {
      switch (this.opt) {
        case "KhoiLuongKeHoach":
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
        case "KhoiLuongSanXuat":
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
        default:
          this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
            let selected = this.items.filter(item => sItem.IddmItem === item.Id)[0];
            if (selected) {
              selected.checked = true;
            }
          });
          break;
      }
    }
  }
  resetFilter() {
    this.KeyWord = '';
  }
  accept() {
    switch (this.opt) {
      case "KhoiLuongKeHoach":
        let data = this.items.filter(item => item.checked)
        data.forEach(mathang => {
          mathang.listItemTemp = {};
          this._services.GetOptions().GetListCongDoanTheoMatHang(mathang.IddmItem).subscribe((res: any) => {
            res.forEach(cd => {
              mathang.listItemTemp[cd.CongDoan] = []
            })
          })
        });
        this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            IdGiaoKeHoachSanXuat_TrienKhai: this.IdQuyTrinh,
            IddmItem: ele.IddmItem,
            Id: '',
          }
        }))
        break;
      case "KhoiLuongSanXuat":
        this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
          return {
            ...ele,
            IdPhuongAnPhaBong: this.IdQuyTrinh,
            Id: '',
          }
        }));
        break;
      default:
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
