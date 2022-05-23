import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { PintableDirective } from 'voi-lib';
import { ChiphilichxichnamchonthemComponent } from '../chiphilichxichnamchonthem/chiphilichxichnamchonthem.component';

@Component({
  selector: 'app-chiphilichxichnam',
  templateUrl: './chiphilichxichnam.component.html',
  styleUrls: ['./chiphilichxichnam.component.css']
})
export class ChiphilichxichnamComponent implements OnInit, OnChanges {

  @Input('listTaiSan') listTaiSan: any = {};
  @Input('chonNam') chonNam: any = '';
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  TongGiaTriToanBang: any = 0;
  labelThang = [];

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.labelThang = [];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push(`Tháng ${i}`);
    }
    this.sum(this.listTaiSan);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  ChiTietThongTin(item) {
    let modalRef = this._modal.open(ChiphilichxichnamchonthemComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.title = "Chi phí lịch xích năm";
    modalRef.componentInstance.layIdTaiSan = this.listTaiSan[0]?.IdTaiSan;
    // // modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
      item.ChiTietChiPhi.push(res);
      this.sum(this.listTaiSan);
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
    modalRef.result.then((res: any) => {
      item = res;
      this.sum(this.listTaiSan);
    })
      .catch((er) => { });
  }

  Delete(array, index) {
    // array.splice(index, 1);
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa ?";
    modalRef.result.then((res) => {
      array.splice(index, 1);
      this.toastr.success("Xoá thành công");
    })
    .catch((er) => console.log(er));
  }

  sum(item) {
    this.TongGiaTriToanBang = 0;
    item.forEach(ele => {
      ele.listChiPhi.forEach(obj => {
        obj.TongTien = obj.ChiTietChiPhi.reduce((total, sum) => {
          return total + sum.SoTien;
        }, 0)
      })
      ele.TongTienChiPhi = ele.listChiPhi.reduce((total, number) => {
        return total + number.TongTien;
      }, 0);
      this.TongGiaTriToanBang += (ele.TongTienChiPhi || 0);
    })
  }

}
