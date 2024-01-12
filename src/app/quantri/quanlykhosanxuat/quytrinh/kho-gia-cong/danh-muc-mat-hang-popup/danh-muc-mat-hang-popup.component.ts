import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danh-muc-mat-hang-popup',
  templateUrl: './danh-muc-mat-hang-popup.component.html',
  styleUrls: ['./danh-muc-mat-hang-popup.component.css']
})
export class DanhMucMatHangPopupComponent implements OnInit {

  KeyWord: string = '';
  listItem: any = [];
  paging:any = {};
  item:any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  GetList() {
    console.log(this.item);
    let data = {
      // Ngay: DateToUnix(this.item.Ngay),
      // IddmKho: this.item.IddmKhoGiaCong,
    }
    this._services.GetlistdmMatHangGiaCong(data).subscribe((res: any) => {
      this.listItem = res
    })
  }

  filtertable_add() { }

  resetFilter() { }

  SetData() {
    let data = this.listItem.filter(ele => ele.checked);
    return data;
  }

  accept() {
    this.activeModal.close(this.SetData());
  }

}
