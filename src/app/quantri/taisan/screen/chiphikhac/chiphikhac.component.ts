import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';

@Component({
  selector: 'app-chiphikhac',
  templateUrl: './chiphikhac.component.html',
  styleUrls: ['./chiphikhac.component.css']
})
export class ChiphikhacComponent implements OnInit, OnChanges {

  @Input() items: any = [];
  tongChiPhi: number = 0;

  constructor(
    private modal: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("this.items", this.items);
    this.CountTheoKeHoach();
    this.Count();
  }

  ngOnInit(): void {
    // this.CountTheoKeHoach();
    // this.Count();
  }

  CountTheoKeHoach() {
    this.items.forEach(ele => {
      ele.GiatriKeHoach = ele.listChiPhiKhac.reduce((sum, obj) => {
        return sum + obj.GiatriKeHoach;
      },0)
    })
  }
  
  Count() {
    this.items.forEach(ele => {
      ele.GiaTri = ele.listChiPhiKhac.reduce((sum, obj) => {
        return sum + Number(obj.GiaTri);
      },0)
    })
    this.tongChiPhi = this.items.reduce((sum, ele) => {
      return sum + ele.GiaTri
    },0)
  }

  AddChiPhi(taisan) {
    let newChiPhi = {
      Id: "",
      IdTaiSan: taisan.IdTaiSan,
      IdTaiSanChiPhi: taisan.IdTaiSanChiPhi || "",
      TenChiPhi: "Chi phí phát sinh",
      GiaTri: 0,
      GhiChu: "",
      GiatriKeHoach: 0,
    };
    taisan.listChiPhiKhac.push(newChiPhi);
  }

  DeleteChiPhi(item, index) {
    let modalRef = this.modal.open(ModalthongbaoComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.message = 'Bạn chắc chắn muốn xóa chi phí đã chọn?';
    modalRef.result
      .then((res: any) => {
        item.listChiPhiKhac.splice(index, 1);
        this.Count();
      })
  }
}

