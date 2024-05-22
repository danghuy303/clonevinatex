import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-baocaodienmodal',
  templateUrl: './baocaodienmodal.component.html',
  styleUrls: ['./baocaodienmodal.component.css']
})
export class BaocaodienmodalComponent implements OnInit {

  listKhungGio: any = [];
  NgayNhap: any = Date;
  filter: any = {};
  items: any = [];
  listHeader: any = [];
  constructor(private _service: SanXuatService, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    if (this.items && this.items.length > 0) {
      let _firstRow = this.items[0];
      let _arr = _firstRow.listLoaiCongToKhac.map((x: any) => x.Title);
      this.listHeader = _arr;
      console.log(this.listHeader);

    }
  }

}
