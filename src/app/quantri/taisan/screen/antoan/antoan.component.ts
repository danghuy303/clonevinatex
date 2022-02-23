import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-antoan',
  templateUrl: './antoan.component.html',
  styleUrls: ['./antoan.component.css']
})
export class AntoanComponent implements OnInit {

  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};

  constructor( public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    ) { }

  ngOnInit(): void {

  }
 
  addThongSo() {
    // if (this.item.listThongSoKyThuat == undefined || this.item.listThongSoKyThuat == null)
      this.item.listThongSoAnToan = [];
    this.item.listThongSoAnToan.push(this.newitem);
    this.newitem = {}
  }
  
    XoaTaiSanCon(item, index) {
      if (validVariable(item.Id)) {
        this.item.listThongSoAnToan.splice(index, 1);
      }
      else {
        this.item.TaiSan.listThongSoAnToan[index].isXoa = true;
      }
    }
  
}