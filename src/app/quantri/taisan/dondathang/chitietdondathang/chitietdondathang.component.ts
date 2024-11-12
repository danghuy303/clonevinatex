import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chitietdondathang',
  templateUrl: './chitietdondathang.component.html',
  styleUrls: ['./chitietdondathang.component.css']
})
export class ChitietdondathangComponent implements OnInit {

  listDeNghiCungUng: any = [];
  listPhieuKiemHang: any = [];
  filter: any = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let data = {
      CurrentPage: 0
    };
    // this._serviceTaiSan.PhieuDNCU().GetList(data).subscribe((res: any) => {
    //   // this.listDeNghiCungUng = res.Data;
    // })
  }

  XemChiTiet(item) {

  }

}
