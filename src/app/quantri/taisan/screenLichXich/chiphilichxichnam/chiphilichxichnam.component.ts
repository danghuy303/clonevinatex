import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { ChiphilichxichnamchonthemComponent } from '../chiphilichxichnamchonthem/chiphilichxichnamchonthem.component';

@Component({
  selector: 'app-chiphilichxichnam',
  templateUrl: './chiphilichxichnam.component.html',
  styleUrls: ['./chiphilichxichnam.component.css']
})
export class ChiphilichxichnamComponent implements OnInit {

  @Input('item') item: any = {};

  constructor(


    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  ChiTietThongTin(item) {

    let modalRef = this._modal.open(ChiphilichxichnamchonthemComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Chi phí lịch xích năm";
    modalRef.componentInstance.layIdTaiSan = this.item[0]?.IdTaiSan;
    // // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      item.ChiTietChiPhi.push(res);

    })
      .catch((er) => {

      });
  }

  editChiTietChiPhi(item) {

    let modalRef = this._modal.open(ChiphilichxichnamchonthemComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Chi phí lịch xích năm";
    modalRef.componentInstance.item = item;
    // // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      item.ChiTietChiPhi.push(res);
    })
      .catch((er) => {

      });
  }

  Delete(array, index) {
    array.splice(index, 1);

  }

}
