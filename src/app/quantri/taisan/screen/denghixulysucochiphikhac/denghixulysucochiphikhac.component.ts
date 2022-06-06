import { number } from '@amcharts/amcharts4/core';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-denghixulysucochiphikhac',
  templateUrl: './denghixulysucochiphikhac.component.html',
  styleUrls: ['./denghixulysucochiphikhac.component.css']
})
export class DenghixulysucochiphikhacComponent implements OnInit, OnChanges {

  @Input('item') items: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};
  TongChiPhi: any = 0;

  constructor(
    public _modal: NgbModal,
  ) { }

  ngOnChanges(): void {
    this.TinhTong();
  }

  ngOnInit(): void {
  }
  add2(item) {
    if (!validVariable(item.listChiPhiKhac)) {
      item.listChiPhiKhac = [];
    }
    item.listChiPhiKhac.push({});

  }
  delete(item, index) {

    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      item.listChiPhiKhac.splice(index, 1);
      this.TinhTong();
    }).catch(er => console.log(er))
  }

  TinhTong() {
    this.TongChiPhi = 0;
    this.items.forEach(item => {
      item.ThanhTien = item.listChiPhiKhac.reduce((total, chiphi) => {
        return total + chiphi.GiaTri
      }, 0)
      this.TongChiPhi += (item.ThanhTien || 0)
    })

  }
}
