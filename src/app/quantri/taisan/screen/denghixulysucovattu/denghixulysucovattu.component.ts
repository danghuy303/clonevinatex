import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { merge, validVariable } from 'src/app/services/globalfunction';
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
    this.sumAll();
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
        console.log("res", res);
        item.listVatTu = merge(res, item.listVatTu || [], 'IdVatTuCanThayThe');
        this.sumItem(item);
      })
      .catch((er) => {
      });
  }

  sumItem(item) {
    item.listVatTu.forEach(vattu => {
      vattu.ThanhTien = ((vattu.GiaTri || 0) * (vattu.SoLuong || 0)) || 0;
    })
    item.TongThanhTien = item.listVatTu.reduce((sum, obj) => {
      return sum + obj.ThanhTien;
    }, 0)
    this.sumAll();
  }

  sumAll () {
    this.TongGiaTriToanBang = 0;
    this.items.forEach(ele => {
      this.TongGiaTriToanBang += (ele.TongThanhTien || 0);
    })
  }

  delete(index, item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, { 
      size: 'md', 
      backdrop: 'static'
    })
    modalRef.componentInstance.message = 'Bạn chắc chắn muốn xóa vật tư này?';
    modalRef.result
      .then(() => {
        item.listVatTu.splice(index, 1);
        this.sumItem(item)
      })
  }

}
