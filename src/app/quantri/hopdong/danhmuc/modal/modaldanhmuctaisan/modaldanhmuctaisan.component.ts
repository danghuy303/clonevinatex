import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';
import { StoreService } from 'src/app/services/store.service';
import { vn } from "./../../../../../services/const";

@Component({
  selector: 'app-modaldanhmuctaisan',
  templateUrl: './modaldanhmuctaisan.component.html',
  styleUrls: ['./modaldanhmuctaisan.component.css']
})
export class ModaldanhmuctaisanComponent implements OnInit {

  public item: any = {};
  public title: any = '';
  public type = '';

  //...................................


  listNhaMay: Array<any> = [];
  idDuAn: string = "";
  showDropDown: boolean = false;
  OSName: string = "HỆ THỐNG Quản lý Nhà – Đất";
  userBtn: any;
  userInfo: any;
  userSub: any;

  // getOSName(url) {
  //   if (url.includes("sanxuat")) {
  //     this.showDropDown = true;
  //     this.OSName = "Hệ thống quản trị ngành sợi";
  //     this.getListNhaMay();
  //   } else {
  //     this.showDropDown = false;
  //     this.OSName = "HỆ THỐNG Quản lý Nhà – Đất";
  //   }
  // }
  constructor(
    public activeModal: NgbActiveModal, private _danhMucHopDong: DanhMucHopDongService, 
    public toastr: ToastrService,
    private _services: SanXuatService,
    private store: StoreService,
    private _modal: NgbModal,
    private _auth: AuthenticationService,) {this.userInfo = this._auth.currentUserValue;}

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
  // setGlobalNhaMay(event) {
  //   this.store.setNhaMay(event.value);
  // }
  // open(event) {
  //   this.listNoti.toggle(event);
  // }
  // @ViewChild("listNoti") listNoti;
 
  //...............................................................

lang: any =vn;
yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;

  

  SetData() {
    let data: any = {
      "Id": this.item.Id,
      "Ma": this.item.Ma,
      "Ten": this.item.Ten,
      "GhiChu": this.item.GhiChu,
      "IdDuAn": this.item.IdDuAn,
      "ThoiGianHetKhauHao": this.item.ThoiGianHetKhauHao,
      "GiaTriKhauHaoMoiThang": this.item.GiaTriKhauHaoMoiThang,

      "Created": this.type == "taisan" ? new Date() : this.item.Created,
      "Modified": this.type == "taisan" ? new Date() : this.item.Modified,
  
      "isDelete":this.type == "taisan" ? false : this.item.isDelete,
    };
    // return this.item;
    return data;
  }

  ValidateData() {
    if (!validVariable(this.item.Ma)) {
      this.toastr.error("Yêu cầu nhập đầy đủ mã !");
      return false;
    }
    if (!validVariable(this.item.Ten)) {
      this.toastr.error("Yêu cầu nhập đầy đủ tên !");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._danhMucHopDong.DanhMucTaiSan().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        } 
      
      })

    }
  }
}