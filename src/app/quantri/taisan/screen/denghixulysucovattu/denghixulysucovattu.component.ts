import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { DenghisulyluachonthemvattuComponent } from '../../modal/denghisulyluachonthemvattu/denghisulyluachonthemvattu.component';

@Component({
  selector: 'app-denghixulysucovattu',
  templateUrl: './denghixulysucovattu.component.html',
  styleUrls: ['./denghixulysucovattu.component.css']
})
export class DenghixulysucovattuComponent implements OnInit, OnChanges {
  @Input('item') items: any = [];
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  TongGiaTriToanBang: any = 0;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnChanges(): void {
    this.TinhTong();
  }

  ngOnInit(): void {
  }

  LuaChonVatTu(item) {
    let modalRef = this._modal.open(DenghisulyluachonthemvattuComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.opt = "edit";
    // modalRef.componentInstance.layIdTaiSan = this.items.map(ele => ele.IdTaiSan);
    modalRef.componentInstance.listItemDaChon =  item.listVatTu ?  item.listVatTu.map(ele => ele.IdVatTuCanThayThe) : []
    modalRef.componentInstance.layIdTaiSan = item.IdTaiSan;
    modalRef.result
      .then((res: any) => {
        item.listVatTu = res;
      })
      .catch((er) => {
      });
  }

  TinhTong() {
    this.TongGiaTriToanBang = 0;
    this.items.forEach(ele => {
      if (validVariable(ele.listVatTu)) {
        ele.listVatTu?.forEach(vattu => {
          vattu.ThanhTien = ((vattu.GiaTri || 0) * (vattu.SoLuong || 0)) || 0;
        })
        ele.TongThanhTien = ele.listVatTu.reduce((sum, obj) => {
          return sum + obj.ThanhTien;
        }, 0)
      }
      this.TongGiaTriToanBang += (ele.TongThanhTien || 0);
    })
  }

  delete(index) {
    this.items.splice(index, 1)
  }

}
