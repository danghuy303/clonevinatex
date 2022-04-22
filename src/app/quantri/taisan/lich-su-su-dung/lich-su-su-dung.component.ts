import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { QuyTrinh } from './quy-trinh';

@Component({
  selector: 'app-lich-su-su-dung',
  templateUrl: './lich-su-su-dung.component.html',
  styleUrls: ['./lich-su-su-dung.component.css']
})
export class LichSuSuDungComponent implements OnInit {

  filter: any = {};
  paging: any = {};
  items: any = [];
  listdmPhanXuong: any = [];
  quyTrinh: any = QuyTrinh;

  constructor(
    private _serviceTaiSan: TaisanService,
    private _serviceDungChung: SanXuatService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.ResetData();
  }

  GetListPhanXuong() {

  }

  ResetData() {
    this.filter = {}
    this.LoadData(true);
  }

  LoadData(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      CurrentPage: 1,
      PageSize: 20,
      Keyword: "",
      IddmLoaiBienDong: "",
      TuNgay: 0,
      DenNgay: 0,
      IdTaiSan: ""
    }
    this._serviceTaiSan.BienDongTaiSan().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
    })
  }

  Edit(item) {
    let itemQuyTrinh = this.quyTrinh[item.MadmLoaiBienDong]
    let loaiModal = itemQuyTrinh.ModalType;
    let component = itemQuyTrinh.Component;
    if (loaiModal === 'CallOut') {
      this._serviceTaiSan
      [`${itemQuyTrinh.ServiceProp}`]()
      [`${itemQuyTrinh.ServiceMethod}`](item.IdQuyTrinh)
        .subscribe((res: any) => {
          let modalRef = this._modal.open(component, {
            size: 'fullscreen',
            backdrop: 'static'
          })
          modalRef.componentInstance.opt = 'edit';
          modalRef.componentInstance.item = res.Data;
        })
    } else {
      let modalRef = this._modal.open(component, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = { Id: item.IdQuyTrinh };
    }
  }

}
