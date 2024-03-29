import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chon-vat-tu-thay-the',
  templateUrl: './chon-vat-tu-thay-the.component.html',
  styleUrls: ['./chon-vat-tu-thay-the.component.css']
})
export class ChonVatTuThayTheComponent implements OnInit {

  title: string = '';
  IdTaiSan: string = '';
  listVatTu: any = [];
  listNoiDungVatTu: any = [];
  listNoiDungVatTuDeep: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,) { }

  ngOnInit(): void {
    this.GetListVatTuByIdTaiSan(this.IdTaiSan);
  }

  GetListVatTuByIdTaiSan(IdTaiSan) {
    this._serviceTaiSan.GetListVatTuByIdTaiSan(IdTaiSan).subscribe((vattu: any) => {
      this.listNoiDungVatTuDeep = vattu.Data;
      this.listNoiDungVatTu = mapArrayForDropDown(vattu.Data, 'TenTaiSan', 'IdVatTuThayThe');
    })
  }

  ChonVatTu(value, idx) {
    let check = this.Check(this.listVatTu, value);
    if (check < 2) {
      this.listVatTu[idx] = {
        ...this.listNoiDungVatTuDeep.find(ele => ele.IdVatTuThayThe === value),
        IdVatTuCanThayThe:this.listNoiDungVatTuDeep.find(ele => ele.IdVatTuThayThe === value).IdVatTuThayThe
      };
    } else {
      this.listVatTu[idx] = {
        ...this.listVatTu[idx],
        IdVatTuCanThayThe: null
      };
    }
    this.listVatTu = [...this.listVatTu]
  }

  Check(list: any, value: any) {
    let count = list.filter(ele => ele.IdVatTuCanThayThe === value).length;
    return count;
  }

  add() {
    this.listVatTu.push({})
  }

  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa?';
    modalRef.result.then(res => {
      this.listVatTu.splice(index, 1)
    })
  }

  ChapNhan() {
    this.activeModal.close(this.listVatTu)
  }

}
