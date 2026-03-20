import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from '../../quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from '../../services/Taisan/danhmuctaisan.service';
import { mapArrayForDropDown } from '../../services/globalfunction';

@Component({
  selector: 'app-dinh-muc-nguyen-lieu',
  templateUrl: './dinh-muc-nguyen-lieu.component.html',
  styleUrls: ['./dinh-muc-nguyen-lieu.component.css']
})
export class DinhMucNguyenLieuComponent implements OnInit {

  @Input('Items') Items: any = [];
  @Input() isXoa: boolean = true;
  @Output('Items') itemChange: EventEmitter<any> = new EventEmitter<any>();
  listLoaiNhienLieu: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService
  ) { }

  ngOnInit(): void {
    this.Items = this.Items ? this.Items : [];
    this.getListLoaiNhienLieu();
  }

  getListLoaiNhienLieu() {
    this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listLoaiNhienLieu = mapArrayForDropDown(res.Data, 'Ten', 'Id')
    })
  }

  add() {
    this.Items.push({});
  }
  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.Items.splice(index, 1)
    }).catch(er => console.log(er))
  }

}
