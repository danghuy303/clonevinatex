import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { merge } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ThemMoiVatTuModalComponent } from './them-moi-vat-tu-modal/them-moi-vat-tu-modal.component';

@Component({
  selector: 'app-vattu',
  templateUrl: './vattu.component.html',
  styleUrls: ['./vattu.component.css']
})
export class VattuComponent implements OnInit, OnChanges {

  @Input() items: any;
  items_copy: any = [];
  tongThanhTien: number = 0;

  constructor(
    public _modal: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.CountTheoKeHoach();
    this.Count();
  }

  ngOnInit(): void {

  }

  CountTheoKeHoach() {
    this.items.forEach(ele => {
      ele.ThanhTienTheoKeHoach = ele.listVatTu.reduce((total, ele) => {
        return total + ele.ThanhTienTheoKeHoach
      }, 0)
    })
  }

  Count() {
    this.items.forEach(ele => {
      ele.ThanhTien = 0;
      ele.listVatTu.forEach(children => {
        children.ThanhTien = (children.DonGia || 0) * (children.SoLuong || 0);
        ele.ThanhTien += children.ThanhTien;
      })
    })
    this.tongThanhTien = this.items.reduce((sum, ele) => {
      return sum + ele.ThanhTien
    }, 0)
  }

  addVatTu(taisan) {
    // console.log("taisan", taisan);
    let listIdVatTuDaChon = [];
    this.items.forEach(item => {
      listIdVatTuDaChon = item.listVatTu.map(ele => {
        return ele.IdVatTuThayThe
      })
    })
    let modalRef = this._modal.open(ThemMoiVatTuModalComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.IdTaiSan = taisan.IdTaiSan;
    modalRef.componentInstance.listIdVatTuDaChon = listIdVatTuDaChon;
    modalRef.result
      .then((res: any) => {
        // console.log(res);
        taisan.listVatTu = merge(res, taisan.listVatTu, "IdVatTuThayThe");
        this.Count();
      })
      .catch((error: any) => {
        console.log({ message: error });
      })
      .finally(() => { })
  }

  delete(index, taisan) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.message = `Bạn chắc chắn muốn xóa vật tư này?`;
    modalRef.result
      .then((res: any) => {
        taisan.listVatTu.splice(index, 1);
        this.Count();
      })
  }

}
