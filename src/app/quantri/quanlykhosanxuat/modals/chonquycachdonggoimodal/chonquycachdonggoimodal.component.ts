import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chonquycachdonggoimodal',
  templateUrl: './chonquycachdonggoimodal.component.html',
  styleUrls: ['./chonquycachdonggoimodal.component.css']
})
export class ChonquycachdonggoimodalComponent implements OnInit {

  items: any = [];
  selectedItems: any = [];
  IdQuyTrinh: any;
  KeyWord: any = '';
  opt: any = '';
  checkedAll: boolean = false;
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset'
    },    
  ];;
  constructor(private _activeModal: NgbActiveModal, private _services: SanXuatService) { }

  ngOnInit(): void {
    this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
      let selected = this.items.filter(item => sItem.IddmItem === item.IddmItem)[0];
      if (selected) {
        selected.checked = true;
      }
    });
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
  accept() {
    // let data = this.items.filter(item => item.checked)
    // data.forEach(mathang => {
    //   mathang.listItemTemp = {};
    //   this._services.GetOptions().GetListCongDoanTheoMatHang(mathang.IddmItem).subscribe((res: any) => {
    //     res.forEach(cd => {
    //       mathang.listItemTemp[cd.CongDoan] = []
    //     })
    //   })
    // });
    // this._activeModal.close(this.items.filter(item => item.checked).map(ele => {
    //   return {
    //     ...ele,
    //     IdGiaoKeHoachSanXuat_TrienKhai: this.IdQuyTrinh,
    //     IddmItem: ele.IddmItem,
    //     Id: '',
    //   }
    // }))
  }

}
