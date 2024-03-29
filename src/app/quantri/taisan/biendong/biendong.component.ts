import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DateToUnix } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalcapnhatbaoduongComponent } from '../modal/modalcapnhatbaoduong/modalcapnhatbaoduong.component';

@Component({
  selector: 'app-biendong',
  templateUrl: './biendong.component.html',
  styleUrls: ['./biendong.component.css']
})
export class BiendongComponent implements OnInit {
  $sub!: Subscription;
  @Input('item') item: any = {};
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  items:any = [];
  newitem: any = {};

  constructor(public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private store: StoreService
  ) {  this.$sub = this.store.getNhaMay().subscribe(res => {
    if (res) {
        this.ngOnInit()
    }
})}

  ngOnInit(): void {
    this.GetList();
  }
  GetList() {
    let data = {
      CurrentPage: 0,
      PageSize: 0,
      IdTaiSan:this.item.Id,

    }
    this._serviceTaiSan.ListDanhSachBienDong().Get(data).subscribe((res: any) => {
   this.items = res.Data.Items;
    })
  }
  add() {
    if (this.item === undefined || this.item === null)
      this.item = [];
    this.item.push(this.newitem);
    this.newitem = {}
  }
  delete(index) {
    let item = this.item.splice(index, 1)[0];
  }
}
