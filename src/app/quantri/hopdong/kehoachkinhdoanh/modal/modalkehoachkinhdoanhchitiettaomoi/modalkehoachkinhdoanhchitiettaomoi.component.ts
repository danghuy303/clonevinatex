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
  public newitemlap: any = {};
  public newItem: any = {};
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
  labelThang:Array<string>=['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12',];
  propThang:Array<string>=['Thang1','Thang2','Thang3','Thang4','Thang5','Thang6','Thang7','Thang8','Thang9','Thang10','Thang11','Thang12 ',]
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
  TinhSoLuongDaLapKeHoach(rootItem,parentItem){
    rootItem.SoLuongDaLapKeHoach = this.propThang.reduce((total,prop)=>(rootItem[prop]|0)+total,0);
    parentItem.SoLuongDaLapKeHoach = parentItem.listNhaMay.reduce((total,ele)=>(ele.SoLuongDaLapKeHoach|0)+total,0);
    this.propThang.forEach(prop=>{
      parentItem[prop]=parentItem.listNhaMay.reduce((total,ele)=>(ele[prop]|0)+total,0);
    })
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
  changeNhaMay(rootItem){
    // console.log(rootItem.selectedNhaMay)
    rootItem.listNhaMay = rootItem.selectedNhaMay.map(key=>{
      return {
        TenNhaMay:this.listNhaMay.find(ele=>ele.value===key)?.label,
        IdNhaMay:key
      }
    })
    console.log(rootItem)
  }
  changeItem(rootItem){
    rootItem.selectedItems
    rootItem.listItem = rootItem.selectedItems.map(key=>{
      return{
        TenMatHang:this.listMatHang.find(ele=>ele.value===key)?.label,
        IddmItem:key
      }
    })
  }

  getListPhanXuong() {
    this._services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  TheoDoi(item) {
    if(item.Id!==undefined)
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
  addNhaMay(rootItem){
    !rootItem.listNhaMay && (rootItem.listNhaMay=[]);
    console.log(rootItem);
    rootItem.listNhaMay.push({});
  }
  addSanPham() {
    if (this.item.listItem == undefined || this.item.listItem == null)
      this.item.listItem = [];
    this.item.listItem.push(deepCopy(this.newItem));
    this.newItem = {}
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      // this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
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
 ChapNhan(){
   
 }
}




