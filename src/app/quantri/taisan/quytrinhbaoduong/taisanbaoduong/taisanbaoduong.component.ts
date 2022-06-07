import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';

@Component({
  selector: 'app-taisanbaoduong',
  templateUrl: './taisanbaoduong.component.html',
  styleUrls: ['./taisanbaoduong.component.css']
})
export class TaisanbaoduongComponent implements OnInit, OnChanges {

  @Input() items: any = [];

  constructor(
    private _modal: NgbModal,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngOnInit(): void {
  }

  delete(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.message = 'Bạn chắc chắn muốn xóa tài sản này?';
    modalRef.result
      .then(()=>{
        this.items.splice(index, 1)
      })
  }

}
