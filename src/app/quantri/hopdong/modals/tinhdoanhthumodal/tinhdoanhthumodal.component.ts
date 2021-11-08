import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
  selector: 'app-tinhdoanhthumodal',
  templateUrl: './tinhdoanhthumodal.component.html',
  styleUrls: ['./tinhdoanhthumodal.component.css']
})
export class TinhdoanhthumodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  item: any = {};
  itemKeHoach:any={};
  checkbutton:any={};
  Nam:number;
  propThang: Array<string> = ['Thang1', 'Thang2', 'Thang3', 'Thang4', 'Thang5', 'Thang6', 'Thang7', 'Thang8', 'Thang9', 'Thang10', 'Thang11', 'Thang12',]
  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { }

  ngOnInit(): void {
    console.log(this.item)
  }
  ChiTietSanPhamThang(thang,sanpham){
    console.log(thang,sanpham)
    let data = {
      Thang:thang,
      Nam:this.Nam,
      IdSanPham:sanpham.IdSanPham,
      IdKeHoachKinhDoanh:sanpham.IdKeHoachKinhDoanh,
    }
    this._danhMucHopDong.TinhToanDoanhThu().GetThang(data).subscribe(res=>{
      console.log(res);
    })
  }
}
