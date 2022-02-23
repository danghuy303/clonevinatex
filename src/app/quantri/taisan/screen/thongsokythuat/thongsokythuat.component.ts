import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-thongsokythuat',
  templateUrl: './thongsokythuat.component.html',
  styleUrls: ['./thongsokythuat.component.css']
})
export class ThongsokythuatComponent implements OnInit {

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
      this.item.listThongSoKyThuat = [];
    this.item.listThongSoKyThuat.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.listThongSoKyThuat.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listThongSoKyThuat.push(JSON.parse(JSON.stringify(item)));
    }
  }

  
    XoaTaiSanCon(item, index) {
      if (validVariable(item.Id)) {
        this.item.listThongSoKyThuat.splice(index, 1);
      }
      else {
        this.item.TaiSan.listThongSoKyThuat[index].isXoa = true;
      }
    }
  
}
