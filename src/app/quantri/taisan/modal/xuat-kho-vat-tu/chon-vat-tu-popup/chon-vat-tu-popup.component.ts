import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon-vat-tu-popup',
  templateUrl: './chon-vat-tu-popup.component.html',
  styleUrls: ['./chon-vat-tu-popup.component.css']
})
export class ChonVatTuPopupComponent implements OnInit {

  item: any = {};
  listVatTu: any = []

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20, IdDuAn: 0 };
    this._serviceTaiSan.GetlistdmItem(data).subscribe((res: any) => {
      this.listVatTu = res.Data;
    })
  }

  ChapNhan() {
    let data = this.listVatTu.filter(ele => ele.checked).map(obj => {
      return {
        ...obj,
        IddmItem: obj.Id
      }
    });
    this.activeModal.close(data)
  }

}
