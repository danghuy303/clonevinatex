import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { ModaldongiakehoachthucteComponent } from '../modaldongiakehoachthucte/modaldongiakehoachthucte.component';
import { ModalkehoachkinhdoanhtheodoiComponent } from '../modalkehoachkinhdoanhtheodoi/modalkehoachkinhdoanhtheodoi.component';

@Component({
  selector: 'app-modalkehoachkinhdoanhchitiettaomoi',
  templateUrl: './modalkehoachkinhdoanhchitiettaomoi.component.html',
  styleUrls: ['./modalkehoachkinhdoanhchitiettaomoi.component.css']
})
export class ModalkehoachkinhdoanhchitiettaomoiComponent implements OnInit {
  // tong: any = {
  //   thang1: 0,
  //   thang2: 0,
  //   thang3: 0,
  //   thang4: 0,
  // }
  public newitemlap: any = {};
  public newitem: any = {};
  item:any = {};
  copyItem:any = {};
  filter: any = {};
  listPhanXuong: any = [];
  idSanPham: string = "";
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  idDuAn: string = ""
  showDropDown: boolean = false;
  userBtn: any;
  userInfo: any;
  userSub: any;
  oldEditItem: any = {};
  listNam: any = [];
  lang: any = vn;
  listMatHang: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  type: any= '';
  lstKH_KeHoachKinhDoanh_SanPham: any = [];

  constructor(public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    console.log(this.item,this.type);
    for (let i = new Date().getFullYear();i<=(new Date().getFullYear()+20);i++)
    {
      this.listNam.push({ value: i, label: i });
    }
    this.getListNhaMay();
    this.getListPhanXuong();
    this.GetListMatHang();
    if(this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();

    }
  }

  GetListMatHang() {
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  getListNhaMay() {
    this._services
      .GetOptions()
      .GetDanhSachDuAnByIdUser(this.userInfo.Id)
      .subscribe((res: any) => {
        this.listNhaMay = mapArrayForDropDown(res, "TenDuAn", "Id");
      });
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  
  TheoDoi(item) {
    if(!item.edit)
    {
      let modalRef = this._modal.open( ModalkehoachkinhdoanhtheodoiComponent, {
        backdrop: 'static',
        size: 'fullscreen'
      });
      modalRef.componentInstance.opt='add';
      modalRef.componentInstance.type = this.listMatHang.find(ele=>ele.value===item.IdSanPham)?.label;
      modalRef.componentInstance.title = 'Theo dõi kế hoạch - Thực tế';      
      modalRef.componentInstance.item=item;
    }  
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
      // this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  edit(item) 
  {
  item.edit=true;
  // this.copyItem = Object.assign({}, item);
  // console.log(this.copyItem);
  }
  
  save(item)
  {
    item.edit=false;
  }

  add2() {
    if (this.item.listItemLap == undefined || this.item.listItemLap == null)
      this.item.listItemLap = [];
    this.item.listItemLap.push(this.newitemlap);
    this.newitemlap.tong = (this.newitemlap.thang1||0) + (this.newitemlap.thang2||0) + (this.newitemlap.thang3||0) + (this.newitemlap.thang4||0) + (this.newitemlap.thang5||0)
    + (this.newitemlap.thang6||0) +(this.newitemlap.thang7||0)+ (this.newitemlap.thang8||0)+(this.newitemlap.thang9||0)+(this.newitemlap.thang10||0)
    +(this.newitemlap.thang11||0)+(this.newitemlap.thang12||0);
    this.newitemlap = {}
  }

  GhiLai() {   
    let itemC=this.item;
    if(itemC.Id==null)
    {
      itemC.Id="";
    }
    this.item.lstKH_KeHoachKinhDoanh_SanPham = deepCopy(this.item.listItem);
    delete this.item.listItem;
      this._danhMucHopDong.DanhSachKeHoachKinhDoanh().Set(itemC).subscribe((res: any) => {
        console.log(res)
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }   
      })
  }

  CapNhatDonGia()
  {
    let modalRef = this._modal.open( ModaldongiakehoachthucteComponent, {
      backdrop: 'static',
      size: 'fullscreen'
    });
    modalRef.componentInstance.opt='add';
    modalRef.componentInstance.type = '';
    modalRef.componentInstance.title = '';
  }
 GetNextSoQuyTrinh() {
  this._danhMucHopDong.DanhSachKeHoachKinhDoanh().NextQuyTrinh().subscribe((res: any) => {
    console.log(res);
    this.item.SoQuyTrinh=res.Data;  
  })
 }
}




