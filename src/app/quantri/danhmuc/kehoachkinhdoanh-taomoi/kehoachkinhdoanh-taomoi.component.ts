import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';


@Component({
  selector: 'app-kehoachkinhdoanh-taomoi',
  templateUrl: './kehoachkinhdoanh-taomoi.component.html',
  styleUrls: ['./kehoachkinhdoanh-taomoi.component.css']
})
export class KehoachkinhdoanhTaomoiComponent implements OnInit {

  @Input('listCongViec') listCongViec: Array<any>
  @Input('items') items: any = [];
  @Input('item') item: any = {};
  @Output('items') itemChange: EventEmitter<any> = new EventEmitter<any>();


  // newItem: any = { id: '', itemPhuCap:{Ten: ""},soLuongTonKho:{ },itemLoaiThoiGian: { LoaiLuong: "", isDeleted: false } };
  public newitemlap: any=[];

public newitem: any=[];
filter: any = {};
listPhanXuong: any = [];
idSanPham: string = "";

listdmLoaiSoi:any = [];
listNhaMay: Array<any> = [];
idDuAn: string = "";
showDropDown: boolean = false;
userBtn: any;
userInfo: any;
userSub: any;
oldEditItem:any=[];
lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, 
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue;}

  ngOnInit(): void {
   this. getListNhaMay();
this.GetListdmLoaiSoi();
   this.getListPhanXuong();
  }
  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
        // this.idDuAn = res[0].Id;ss
     
      });
  }
  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListdmLoaiSoi(){
    this._services.GetListOptdmLoaiSoi().subscribe((res:any)=>{
      this.listdmLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  addBongHoi() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }
  deleteBongHoi(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  edit(item)
  {
    this.item.listItem(JSON.parse(JSON.stringify(item)));
  }
  add2() {
    if (this.item.listItemLap == undefined || this.item.listItemLap == null)
      this.item.listItemLap = [];
    this.item.listItemLap.push(this.newitemlap);
    this.newitemlap = {}
  }



  // sửa 
  // public additem() {
   
  //    console.log(this.item);
  //     this.items.push(this.newItem);
  //     this.newItem = { id: '123', idSanPham: this.idSanPham, soLuongTonKho: this.item.soLuongTonKho};
  //     this.fakeid();
  //   console.log(this.newItem);
  //   console.log(itemms);
  // }
  // fakeid() {
  //   for (let i = 0; i < this.items.length; i++) {
  //      this.items[i].fakeid = i;

  //   }

  // }

}
