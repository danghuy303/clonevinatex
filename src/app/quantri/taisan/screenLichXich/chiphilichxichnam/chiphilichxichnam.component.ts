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

  ChiTietThongTin() {
    let modalRef = this._modal.open(ChiphilichxichnamchonthemComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Chi phí lịch xích năm";
    // modalRef.componentInstance.item = item.IdTaiSan;
    // // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
console.log(res);

    this.item.listChiPhi.ChiTietChiPhi = res;
    console.log( this.item);
    
    })
      .catch((er) => {

      });
  }

}
