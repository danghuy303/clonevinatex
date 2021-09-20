import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modalchiphibanhangtheonam',
  templateUrl: './modalchiphibanhangtheonam.component.html',
  styleUrls: ['./modalchiphibanhangtheonam.component.css']
})
export class ModalchiphibanhangtheonamComponent implements OnInit {

  newitem: any = [];
  listdmLoaiSoi: any = [];
  listNhaMay: Array<any> = [];
  listPhanXuong: any = [];

  IdDuAn: string = "";
  showDropDown: boolean = false;
  userBtn: any;
  userInfo: any;
  userSub: any;
  oldEditItem: any = [];
  item: any = {};
  type = '';
  opt = '';
  listChiPhi: any=[];
  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _danhMucHopDong: DanhMucHopDongService,
    public toastr: ToastrService,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue; }

  ngOnInit(): void {
    if (this.opt == 'add') {

    }
    else {

    }
    this.getListNhaMay();
    this.GetListChiPhiBanHang();
  }

  GetListChiPhiBanHang(){
    
    let data = {
      PageSize:100, 
      CurrentPage:1,
      sFilter:'',  
      ma:"", 
      ten:""    
    };
    this. _danhMucHopDong.DanhMucChiPhiBanHang().GetList(data).subscribe((res:any)=>{
      this.listChiPhi = mapArrayForDropDown(res.Data.Items, "Ten", "Id");
      
    })
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

  add2() {
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

  edit(item) 
  {
  item.edit=true;
  }
  
  save(item)
  {
    item.edit=false;
  }

  xoa(item)
  {
    
  }

  
  GhiLai() {
    if (this.opt == 'add') {
      this._danhMucHopDong.ChiPhiBanHangTheoNam().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 500) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }

      })
    }
    else {
    
      this._danhMucHopDong.ChiPhiBanHangTheoNam().Update(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 500) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }

      })
    }

    
  }

}