import { Subscription } from 'rxjs';
import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal/chitiethanghoacuahopdongsoimodal.component';
import { SanXuatService } from './../../../../../../services/callApiSanXuat';
import { DateToUnix, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck, SimpleChanges } from '@angular/core';
// import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit, DoCheck {
  @Input('listVatTu') item: any = {};
  @Input() hopDong: any = {};
  @Input() listTieuChuanChatLuong: any = {}
  @Input() listLoaiMatHang: any
  @Input() isXo:boolean
  @Input() isBong: boolean
  @Input() listVatTu: any = []
  @Input("opt") opt: string;
  @Input() loaiNguyenVatLieu: any;
  @Output('loaiNguyenVatLieu') onChange = new EventEmitter();
  @Output('listVatTu') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() chiTieuChange: EventEmitter<any> = new EventEmitter<any>();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
unsup: Subscription
  // item: any = {}
  currentMyText: number = 5

  listThanhToanThuTuc: any = []
  listKeHoachNhapBong: any = []
  listLoaiMatHang_ref: any = []
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(public _modal: NgbModal, public _toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private _servicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
  
  
    // this.item.listVatTu.donGia = 0
    // this.item.thueGTGT = 0
    // this.item.soLuong = 0
    // this.item.saiLech = 0
    // if(this.item.donGia == null && this.item.thueGTGT == null){
    //  parseInt(this.item.donGia) * parseInt(this.item.thueGTGT) 
    // }
    // console.log(this.item.donGia);
    
 
  
    // console.log(this.item.hopDong.loaiNguyenVatLieu);
  }


  ngDoCheck(): void {




    this.itemChange.emit(this.item);
    this.onChange.emit(this.hopDong.loaiNguyenVatLieu);
    this.chiTieuChange.emit(this.listTieuChuanChatLuong);

  }
  changeDiaDiem(e) {
console.log(this.hopDong.loaiNguyenVatLieu);

    console.log(this.hopDong.diaDiemGiaoHang);

    this.hopDong.diaDiemGiaoHang = e



  }
  changInput() {
    console.log(this.item);
  
  }
  ngOnChanges(change: SimpleChanges) {
    console.log('ngOnChanges',this.hopDong.loaiNguyenVatLieu);
    
    // this._servicesSanXuat
    // .GetListdmLoaiBongForHopDong(this.hopDong.loaiNguyenVatLieu)
    // .subscribe((res: any) => {
    //   this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
    //   this.listLoaiMatHang_ref = res;
    // })  
  }

  GetOptions() {
    this._servicesSanXuat
      .GetListdmLoaiBongForHopDong(this.hopDong.loaiNguyenVatLieu)
      .subscribe((res: any) => {
        this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
        this.listLoaiMatHang_ref = res;
      });
  }
  add() {
    this.item.ngayThanhToanUnix = DateToUnix(this.item.ngayThanhToan);
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.item = {
      Id: "",
    };
    modalRef.componentInstance.opt = 'add';
    modalRef.result.then(res => {
      console.log(res.item);
      this.listTieuChuanChatLuong.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }


  edit(item, i) {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.componentInstance.opt = 'edit';
    modalRef.result.then(res => {
      this.listTieuChuanChatLuong.splice(i, 1);
      this.listTieuChuanChatLuong.push(res.item);
      if (res.opt !== 'add') {
        this.add()
      }
    }).catch(er => { console.log(er) });
  }
  delete(i) {
    let item = this.listTieuChuanChatLuong.splice(i, 1)[0];
    if (item.ID === 0) {
    } else {
      item.isXoa = true;
      this.listTieuChuanChatLuong.push(JSON.parse(JSON.stringify(item)));
    }

    // this.listTieuChuanChatLuong[i].isXoa = true;
    // this.listTieuChuanChatLuong.push(this.listTieuChuanChatLuong.splice(i,1));
    console.log(item);
    console.log(this.listTieuChuanChatLuong);
  }


  chonKeHoach() {
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    this._servicesSanXuat.GetListdmItem(data).subscribe((res1: any) => {
      console.log(res1);

      let modalRef = this._modal.open(ChitiethanghoacuahopdongsoimodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      
      this.listKeHoachNhapBong = res1
      modalRef.componentInstance.opt = 'edit';


      modalRef.componentInstance.listThanhToanThuTuc = res1;
      // modalRef.componentInstance.item = this.item.listDieuKhoanThanhToan;

    })
  }

}
