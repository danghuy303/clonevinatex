import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from '../../quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from '../../services/Taisan/danhmuctaisan.service';
import { generateGuid, mapArrayForDropDown, UnixToDate } from '../../services/globalfunction';
@Component({
  selector: 'app-sanluong',
  templateUrl: './sanluong.component.html',
  styleUrls: ['./sanluong.component.css']
})
export class SanluongComponent implements OnInit, OnChanges {

  @Input('Items') Items: any = [];
  @Input() isXoa: boolean = true;
  @Output('ItemsChange') itemChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    
  }

  changeData() {
    this.itemChange.emit(this.Items);
  }

  add() {
    this.Items.push({ IdGuid: generateGuid() });
    this.changeData();
  }
  delete(index: any) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.Items.splice(index, 1);
      this.changeData();
    }).catch(er => console.log(er))
  }

  handleHoatDong(_item: any) {
    this.Items = this.Items?.map((item: any) => {
      return {
        ...item,
        IsHoatDong: item.IdGuid === _item.IdGuid ? true : false
      }
    })
    this.changeData();
  }

}