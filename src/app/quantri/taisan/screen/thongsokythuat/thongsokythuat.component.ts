import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';

@Component({
  selector: 'app-thongsokythuat',
  templateUrl: './thongsokythuat.component.html',
  styleUrls: ['./thongsokythuat.component.css']
})
export class ThongsokythuatComponent implements OnInit, OnChanges {

  @Input('listThongSoKyThuat') listThongSoKyThuat: any;
  // @Output('listThongSoKyThuat') itemChange: EventEmitter<any> = new EventEmitter<any>();
  newitem: any = {};

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  
  }
  addThongSo() {
    if (this.listThongSoKyThuat === undefined || this.listThongSoKyThuat === null)
      this.listThongSoKyThuat = [];
    this.listThongSoKyThuat.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let listThongSoKyThuat = this.listThongSoKyThuat.splice(index, 1)[0];
    if (listThongSoKyThuat.Id === '' || listThongSoKyThuat.Id === null || listThongSoKyThuat.Id === undefined) {
    } else {
      listThongSoKyThuat.isXoa = true;
      this.listThongSoKyThuat.push(JSON.parse(JSON.stringify(listThongSoKyThuat)));
    }
  }

}
