import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-tinhdoanhthumodal',
  templateUrl: './tinhdoanhthumodal.component.html',
  styleUrls: ['./tinhdoanhthumodal.component.css']
})
export class TinhdoanhthumodalComponent implements OnInit {
  item: any = {};
  checkbutton:any={};
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { }

  ngOnInit(): void {
  }

}
