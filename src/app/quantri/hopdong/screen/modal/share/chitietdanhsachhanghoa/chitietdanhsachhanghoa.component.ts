import { vn } from './../../../../../../services/const';
import { Subscription } from 'rxjs';
import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal/chitiethanghoacuahopdongsoimodal.component';
import { SanXuatService } from './../../../../../../services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable , dinhDangSo} from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck, SimpleChanges, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { LuachonvattuphucuahanghoamodalComponent } from './luachonvattuphucuahanghoamodal/luachonvattuphucuahanghoamodal.component';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
// import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit, DoCheck {
  @Input('listHangHoa') item: any = {
    iddmLoaiVatTu: '',
  };
  @Input('listHangHoaSoi') listHangHoaSoi: any = [];
  @Input('hopDong') hopDong: any = {};
  @Input('listTieuChuanChatLuong') listTieuChuanChatLuong: any = [];
  @Input('listLoaiMatHang') listLoaiMatHang: any = [];
  @Input() isXo: boolean
  @Input() isBong: boolean
  @Input() isVatTuPhu: boolean
  @Input() res1: any = []
  @Input("opt") opt: string;
  @Input() iddmLoaiHopDong: any
  @Output('loaiNguyenVatLieu') onChange = new EventEmitter();
  // @Output('listHangHoaChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('hopDongChange') hopDongChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('listHangHoaChange') listHangHoaChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output('listLoaiMatHangChange') listLoaiMatHangChange: EventEmitter<any> = new EventEmitter<any>(); 
  @Output() chiTieuChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output('listTieuChuanChatLuong') listTieuChuanChatLuongChange: EventEmitter<any> = new EventEmitter();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  unsup: Subscription
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  currentMyText: number = 5
  dinhDangSo = dinhDangSo;
  listThanhToanThuTuc: any = []
  listKeHoachNhapBong: any = []
  listdmQuyCachDongGoi: any = [];
  listdmCapBong: any = [];
  listdmDacTinh: any = [];
  // listLoaiMatHang: any = [];

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private _danhmucHopDong: DanhMucHopDongService,
    private _servicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetOptions()
    this.tinhDonGiaThanhToan();
    this.getlistCapBong();
    // if (this.opt === "edit") {
    //   if (this.hopDong.isBenBanChiu) {
    //     this.hopDong.BenBanChiu = this.hopDong.isBenBanChiu;
    //     this.hopDong.BenMuaChiu = !this.hopDong.BenBanChiu;
    //   }
    //   else {
    //     this.hopDong.BenMuaChiu = !this.hopDong.isBenBanChiu;
    //     this.hopDong.BenBanChiu = !this.hopDong.BenMuaChiu;
    //   }
    // }
    // else {
    //   this.item.DonGiaThanhToan = 0;
    //   this.hopDong.giaTri = 0;
    // }
    // this.item.listVatTu[0].donGia = 0
    // this.item.listVatTu[0].thueGTGT = 0
    // this.item.listVatTu[0].soLuong = 0
    // this.item.listVatTu[0].saiLech = 0
    // if(this.item.donGia == null && this.item.thueGTGT == null){
    //  parseInt(this.item.donGia) * parseInt(this.item.thueGTGT) 
    // }
    // console.log(this.item.donGia);



    // console.log(this.item.hopDong.loaiNguyenVatLieu);
  }


  ngDoCheck() {
    this.listHangHoaChange.emit(this.item);    
    this.hopDongChange.emit(this.hopDong);
    this.chiTieuChange.emit(this.listTieuChuanChatLuong);
    this.listLoaiMatHangChange.emit(this.listLoaiMatHang);
    
    // this.listLoaiMatHang = mapArrayForDropDown(this.listLoaiMatHang_copy, "Ten", "Id")
  }
  changeDiaDiem(e) {
    console.log(this.res1);

  }
  changInput() {
    console.log(this.item);

  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if ('loaiNguyenVatLieu' in changes) {
  //   if (typeof changes['loaiNguyenVatLieu'].currentValue !== 'number') {
  //   const loaiNguyenVatLieu = Number(changes['loaiNguyenVatLieu'].currentValue);
  //   if (Number.isNaN(loaiNguyenVatLieu)) {
  //   this.hopDong.loaiNguyenVatLieu = null;
  //   } else {
  //   this.hopDong.loaiNguyenVatLieu = this.item.iddmLoaiVatTu;
  //   }
  //   }
  //   }
  //   }

  GetOptions() {
    this._servicesSanXuat.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
        this.listdmQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
      });
      
      this._servicesSanXuat.GetListOptdmCapBong().subscribe((res: any) => {
        this.listdmCapBong = mapArrayForDropDown(res, "Ten", "Id");
      });
  }
  getlistCapBong(){
    this._servicesSanXuat.dmDacTinhBong().GetDacTinh(this.item.iddmLoaiBong || '', this.item.iddmCapBong || '').subscribe((res: any) => {
      this.listdmDacTinh = mapArrayForDropDown(res, "DacTinh", "Id");
    });
  }

  add() {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.selectedItems = deepCopy(this.listTieuChuanChatLuong);
    modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
    modalRef.result.then(res => {
      // console.log(res.item);         
      // res.forEach(obj => {
      //   if (!this.listTieuChuanChatLuong.every(element => element.iddmTieuChuanChatLuong === obj.iddmTieuChuanChatLuong) || this.listTieuChuanChatLuong.length == 0) {
      //     this.listTieuChuanChatLuong.push(obj);
      //   }
      // });
      this.listTieuChuanChatLuong= deepCopy(res);  
    }).catch(er => { console.log(er) });
  }


  // edit(item, i) {
  //   let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'xl', backdrop: 'static' });
  //   modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
  //   modalRef.componentInstance.opt = 'edit';
  //   modalRef.result.then(res => {
  //     this.listTieuChuanChatLuong.splice(i, 1);
  //     this.listTieuChuanChatLuong.push(res.item);
  //     if (res.opt !== 'add') {
  //       this.add()
  //     }
  //   }).catch(er => { console.log(er) });
  // }
  delete(index) {
    if (!validVariable(this.listHangHoaSoi[index].id)) {
      this.listHangHoaSoi.splice(index, 1);
    } else {
      let item = this.listHangHoaSoi.splice(index, 1)[0];
      item.isXoa = true;
      this.listHangHoaSoi.push(JSON.parse(JSON.stringify(item)));
    }
  }


  chonKeHoach() {
    let Loai = 1;
    if(this.isVatTuPhu)
      Loai = 23;
    this._servicesSanXuat.GetListdmItemByHangHoa(Loai).subscribe((res1: any) => {
      let modalRef = this._modal.open(ChitiethanghoacuahopdongsoimodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      // this.listKeHoachNhapBong = res1
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.componentInstance.listHangHoa = deepCopy(this.listHangHoaSoi);
      modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
      modalRef.result.then(res => {
        this.listHangHoaSoi= deepCopy(res);  
      }).catch(er => { console.log(er) });
    })
  }
  tinhDonGiaThanhToan() {
    this.item.donGia = this.dinhDangSo(this.item.donGia);
    this.item.thueGTGT = this.dinhDangSo(this.item.thueGTGT);
    this.item.DonGiaThanhToan = 0;
    this.item.DonGiaThanhToan = this.item.donGia *(100 +(this.item.thueGTGT || 0))/100 ;
    this.tinhgiaTriHopDong();
  }

  tinhgiaTriHopDong() {
    this.item.soLuong = this.dinhDangSo(this.item.soLuong);
    this.item.giaTriHopDongMatHang = this.item.DonGiaThanhToan * this.item.soLuong;
    if(this.hopDong.isLayTheoGiaTriHangHoa === true)
      this.hopDong.giaTri = this.item.giaTriHopDongMatHang;
  }
  tinhgiaTriHopDongSoi(item) {
    item.soLuong = this.dinhDangSo(item.soLuong);
    item.donGia = this.dinhDangSo(item.donGia);
    this.hopDong.thanhTien = (this.hopDong.thanhTien || 0)+ (item.donGia || 0) * (item.soLuong|| 0);
    if(this.hopDong.isLayTheoGiaTriHangHoa === true)
      this.hopDong.giaTri = this.hopDong.thanhTien;
  }
  
  chonVatTuPhu() {
    this._danhmucHopDong.DanhMucVatTuPhu().GetListAll().subscribe((res1: any) => {

    let modalRef = this._modal.open(LuachonvattuphucuahanghoamodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listHangHoa = deepCopy(this.listHangHoaSoi);
      modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
      modalRef.componentInstance.listThanhToanThuTuc = res1;
      modalRef.result.then(res => {
        this.listHangHoaSoi= deepCopy(res);  
      }).catch(er => { console.log(er) });
    })

  }
}
