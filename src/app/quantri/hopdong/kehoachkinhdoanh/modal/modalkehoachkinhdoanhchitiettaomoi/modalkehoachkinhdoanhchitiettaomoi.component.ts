import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { ModalkehoachkinhdoanhtheodoiComponent } from '../modalkehoachkinhdoanhtheodoi/modalkehoachkinhdoanhtheodoi.component';

@Component({
  selector: 'app-modalkehoachkinhdoanhchitiettaomoi',
  templateUrl: './modalkehoachkinhdoanhchitiettaomoi.component.html',
  styleUrls: ['./modalkehoachkinhdoanhchitiettaomoi.component.css']
})
export class ModalkehoachkinhdoanhchitiettaomoiComponent implements OnInit {

  // newItem: any = { id: '', itemPhuCap:{Ten: ""},soLuongTonKho:{ },itemLoaiThoiGian: { LoaiLuong: "", isDeleted: false } };
  tong: any = {
    thang1: 0,
    thang2: 0,
    thang3: 0,
    thang4: 0,
  }

  public newitemlap: any = [];
  public newitem: any = [];
  item:any = {};
  filter: any = {};
  listPhanXuong: any = [];
  idSanPham: string = "";
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  idDuAn: string = "";
  showDropDown: boolean = false;
  userBtn: any;
  userInfo: any;
  userSub: any;
  oldEditItem: any = [];
  listNam: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    // for (let i = moment().year() + 5; i > moment().year() - 100; i--) {
    //   this.listNam.push({ value: i, label: i });
    // }
    this.getListNhaMay();
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

  GetListdmLoaiSoi() {
    this._services.GetListOptdmLoaiSoi().subscribe((res: any) => {
      this.listdmLoaiSoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  TheoDoi() {
    let modalRef = this._modal.open( ModalkehoachkinhdoanhtheodoiComponent, {
      backdrop: 'static',
      size: 'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = 'Theo dõi kế hoạch - Thực tế';
    // modalRef.result.then(res=>{
    //   this.GetListdmCoCauNhanSu()
    // }).catch(er=>console.log(er))
  }

  add1() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(this.newitem);
    this.newitem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));

    }
  }

  edit(item) {
    this.item.listItem(JSON.parse(JSON.stringify(item)));
    
  }

  add2() {
    if (this.item.listItemLap == undefined || this.item.listItemLap == null)
      this.item.listItemLap = [];
    this.item.listItemLap.push(this.newitemlap);
    this.newitemlap.tong = this.newitemlap.thang1+ this.newitemlap.thang2+this.newitemlap.thang3+this.newitemlap.thang4
    +this.newitemlap.thang5+this.newitemlap.thang6+this.newitemlap.thang7+this.newitemlap.thang8+this.newitemlap.thang9
    +this.newitemlap.thang10+this.newitemlap.thang11+this.newitemlap.thang12;
    this.newitemlap = {}
  }

  GhiLai() {
    
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Set(this.item).subscribe((res: any) => {
        if (res.statusCode !== 200) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
          this.activeModal.close();
        } 
      
      })
  }
  // TinhTong() {
  //  this.tong={thang1:0,
  //     thang2:0,
  //     thang3:0,
  //     thang4:0,}

  //     this.item.listItemLap.forEach(itemlap => {
  //       this.tong.thang1+= itemlap.thang1;
  //       this.tong.thang2+= itemlap.thang2;
  //       this.tong.thang3+= itemlap.thang3;
  //       this.tong.thang4+= itemlap.thang4;

  //     });
  // }


}


