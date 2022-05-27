import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-them-moi-vat-tu-modal',
  templateUrl: './them-moi-vat-tu-modal.component.html',
  styleUrls: ['./them-moi-vat-tu-modal.component.css']
})
export class ThemMoiVatTuModalComponent implements OnInit {

  IdTaiSan: string = '';
  checkedAll: boolean;
  listVatTu: any = [];
  listIdVatTuDaChon: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    // console.log("this.IdTaiSan",this.IdTaiSan);
    // console.log("listIdVatTuDaChon", this.listIdVatTuDaChon);
    this.loadData();
  }

  loadData() {
    this._serviceTaiSan.QuyTrinhBaoDuong().GetListVatTuByIdTaiSan(this.IdTaiSan).subscribe((res: any) => {
      this.listVatTu = res.Data;
      this.checkExistedVatTu(this.listVatTu);
      this.checked();
      // console.log("this.listVatTu", this.listVatTu);
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
