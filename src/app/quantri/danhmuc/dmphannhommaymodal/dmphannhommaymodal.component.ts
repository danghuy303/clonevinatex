import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, merge, validVariable } from 'src/app/services/globalfunction';
import { DmphannhommayChonmathangmodalComponent } from '../dmphannhommay-chonmathangmodal/dmphannhommay-chonmathangmodal.component';

@Component({
  selector: 'app-dmphannhommaymodal',
  templateUrl: './dmphannhommaymodal.component.html',
  styleUrls: ['./dmphannhommaymodal.component.css']
})
export class DmphannhommaymodalComponent implements OnInit {
  public item: any = {};
  public title: any = '';
  public type = '';
  opt: any = "";
  childModalOpt:any=null;
  listPhanXuong:any = [];
  listCongDoan:any = [];
  listloaisoi: any = [];
  listDonViNangSuat: any = [];
  khongclicknhieu: any = false;
  filter: any = {
    KeyWord: ''
  };
  mapCongDoan:any={
    THO:'SOI', 
    GHEPDAURA:'SOI', 
    GHEPTRONB:'SOI', 
    GHEPTRONA:'SOI',
    ONG:'MATHANG', 
    CON:'MATHANG',
    CUONCUI:'', 
    GHEPSOBO:'', 
    BONGCHAI:'', 
    XOCHAI:'',
    CHAITHO:'',
    CHAIKY:''
  }

  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { 

   }

  ngOnInit(): void {
    if (this.opt == 'edit') {
    }
    if(validVariable(this.item.CongDoan)){
      this.childModalOpt = this.mapCongDoan[this.item.CongDoan];
    }
    this.GetListPhanXuong();
    this.GetListCongDoan();
  } 
  GetListPhanXuong(){
    this.sanXuatService.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  GetListCongDoan() {
    this.sanXuatService.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== null && this.item.Ten !== undefined && this.item.Ten !== null) {
      this.Save();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ trường thông tin bắt buộc!')
    }
  }

  Save() {
    this.sanXuatService.dmPhanNhomMaySanXuat().Set(this.item).subscribe((res: any) => {
      if (res) {
        this.resAction(res)
      }
    })
  }

  resAction(res: any) {
    if (res.State === 1) {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.success(res.message);
      this.activeModal.close();
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.error(res.message)
    }
  }

  TimKiem() {

  }

  resetFilter() {

  }

  DanhSachHang() {
    let modalRef = this._modal.open(DmphannhommayChonmathangmodalComponent, {
      size: "lg",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = this.childModalOpt;
    modalRef.componentInstance.title = 'Danh sách hàng';
    modalRef.componentInstance.selectedItems = this.item.lstdmItem || [];
    modalRef.componentInstance.IdQuyTrinh = this.item.Id || "";
    modalRef.result.then(res => {
      // this.toastr.success(res);
      merge(res, this.item.lstdmItem, this.childModalOpt==='MATHANG'?'IddmItem':'IddmLoaiSoi');
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.lstdmItem.splice(index, 1)[0];
    // let item = this.items.splice(i, 1)[0];
    if (item.Id.trim() === '') {
    } else {
      item.isXoa = true;
      this.item.lisItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  changeNangSuat(e, item) {
    item.DinhMucNangSuat = (e.value * item.HieuSuat || 0)/100;
  }

  changeHieuSuat(e, item) {
    item.DinhMucNangSuat = (e.value * item.NangSuat || 0)/100;
  }

  changeCongDoan(e){
    console.log(e,'change')
    this.item.lstdmItem=[];
    this.childModalOpt = this.mapCongDoan[e.value];
    if(this.childModalOpt===''){
      console.log(this.item.lstdmItem)
      this.item.lstdmItem.push({})
    }
  }
}
