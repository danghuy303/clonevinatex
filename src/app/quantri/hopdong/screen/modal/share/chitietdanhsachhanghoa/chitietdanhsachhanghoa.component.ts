import { vn } from './../../../../../../services/const';
import { Subscription } from 'rxjs';
import { ChitiethanghoacuahopdongsoimodalComponent } from './chitiethanghoacuahopdongsoimodal/chitiethanghoacuahopdongsoimodal.component';
import { SanXuatService } from './../../../../../../services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ChitiethanghoamodalComponent } from './chitiethanghoamodal/chitiethanghoamodal.component';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck, SimpleChanges, ChangeDetectionStrategy, OnChanges } from '@angular/core';
// import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit {
  @Input('listVatTu') item: any = {};
  @Input('hopDong') hopDong: any = {};
  @Input('listTieuChuanChatLuong') listTieuChuanChatLuong: any = [];
  // @Input() listLoaiMatHang: any
  @Input() isXo: boolean
  @Input() isBong: boolean
  @Input() listVatTu: any = []
  @Input() res1: any = []
  @Input("opt") opt: string;
  @Input() iddmLoaiHopDong: any
  @Output('loaiNguyenVatLieu') onChange = new EventEmitter();
  @Output('listLoaiMatHang_ref') Change = new EventEmitter();
  @Output('listVatTu') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() chiTieuChange: EventEmitter<any> = new EventEmitter<any>();
  // @Output('listTieuChuanChatLuong') listTieuChuanChatLuongChange: EventEmitter<any> = new EventEmitter();
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  unsup: Subscription
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  currentMyText: number = 5

  listThanhToanThuTuc: any = []
  listKeHoachNhapBong: any = []

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private router: Router,
    public activeModal: NgbActiveModal,
    private _servicesSanXuat: SanXuatService) { }

  ngOnInit(): void {
    this.GetOptions()
    console.log('GetOptions', this.res1);
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
    this.Change.emit(this.item.listLoaiMatHang_ref);
    this.onChange.emit(this.hopDong.loaiNguyenVatLieu);
    this.chiTieuChange.emit(this.listTieuChuanChatLuong);

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
    // this._servicesSanXuat
    //   .GetListdmLoaiBongForHopDong(this.hopDong.loaiNguyenVatLieu)
    //   .subscribe((res: any) => {
    //     this.listLoaiMatHang = mapArrayForDropDown(res, "Ten", "Id");
    //     this.listLoaiMatHang_ref = res;
    //   });
  }

  add() {
    let modalRef = this._modal.open(ChitiethanghoamodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.selectedItems = this.listTieuChuanChatLuong;
    modalRef.componentInstance.IdQuyTrinh = this.hopDong.id;
    modalRef.result.then(res => {
      // console.log(res.item);         
      res.forEach(obj => {
        if (!this.listTieuChuanChatLuong.every(element => element.iddmTieuChuanChatLuong === obj.iddmTieuChuanChatLuong) || this.listTieuChuanChatLuong.length == 0) {
          this.listTieuChuanChatLuong.push(obj);          
        }
      });
      // this.listTieuChuanChatLuong.push(res);  
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
    // let item = this.listTieuChuanChatLuong.splice(i, 1)[0];
    // if (item.ID === 0) {
    // } else {
    //   item.isXoa = true;
    //   this.listTieuChuanChatLuong.push(JSON.parse(JSON.stringify(item)));
    // }

    if (!validVariable(this.listTieuChuanChatLuong[index].id)) {
      this.listTieuChuanChatLuong.splice(index, 1);
    } else {
      this.listTieuChuanChatLuong[index].isXoa = true;
    }

    // this.listTieuChuanChatLuong[i].isXoa = true;
    // this.listTieuChuanChatLuong.push(this.listTieuChuanChatLuong.splice(i,1));  
  }


  chonKeHoach() {

    this._servicesSanXuat.GetListdmItemByHangHoa().subscribe((res1: any) => {
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
