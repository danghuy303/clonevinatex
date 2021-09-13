import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
@Component({
  selector: 'app-modaldanhsachtinhluong',
  templateUrl: './modaldanhsachtinhluong.component.html',
  styleUrls: ['./modaldanhsachtinhluong.component.css']
})
export class ModaldanhsachtinhluongComponent implements OnInit {

  public newitem: any=[];
  listdmLoaiSoi:any = [];
listNhaMay: Array<any> = [];
listPhanXuong: any = [];

IdDuAn: string = "";
showDropDown: boolean = false;
userBtn: any;
userInfo: any;
userSub: any;
oldEditItem:any=[];
  public item: any = {};
  public title: any = '';
  public type = '';

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService, 
    private _danhMucHopDong: DanhMucHopDongService, 
    public toastr: ToastrService,
    private _auth: AuthenticationService,) { this.userInfo = this._auth.currentUserValue;}

  ngOnInit(): void {
    this.getListNhaMay();
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
  // SetData() {
  //   let data: any = {
  //     "Id": this.item.Id,
  //     "Nam": this.item.Nam,
  //     "IdDuAn": this.item.IdDuAn,
  //     "Created": this.type == "danhsachtinhluong" ? new Date() : this.item.Created,
  //   };
  //   return data;
  // }


  GhiLai() {
      this._danhMucHopDong.DanhSachTinhLuong().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
      
      })
    }
  
}