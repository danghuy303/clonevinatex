import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon-vat-tu',
  templateUrl: './chon-vat-tu.component.html',
  styleUrls: ['./chon-vat-tu.component.css']
})
export class ChonVatTuComponent implements OnInit {

  IdTaiSan: string = '';
  checkedAll: boolean;
  listVatTu: any = [];
  listIdVatTuDaChon: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this._serviceTaiSan.QuyTrinhBaoDuong().GetListVatTuByIdTaiSan(this.IdTaiSan).subscribe((res: any) => {
      this.listVatTu = res.Data;
      this.checkExistedVatTu(this.listVatTu);
      this.checked();
    })
  }

  GhiLai() {
    let resData = [];
    resData = this.listVatTu.filter(vattu => {
      return vattu.checked;
    })
    this.activeModal.close(resData);
  }

  checkExistedVatTu(arr) {
    arr.forEach(vattu => {
      vattu.checked = this.listIdVatTuDaChon.includes(vattu.IdVatTuThayThe);
    })
  }

  checkAll(e) {
    this.listVatTu.forEach(vattu => {
      vattu.checked = this.checkedAll;
    })
  }

  checked() {
    this.checkedAll = this.listVatTu.every(ele => ele.checked);
  }

}
