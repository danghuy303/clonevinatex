import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { ChonkienbongmodalComponent } from '../chonkienbongmodal/chonkienbongmodal.component';

@Component({
  selector: 'app-timbongmodal',
  templateUrl: './timbongmodal.component.html',
  styleUrls: ['./timbongmodal.component.css']
})
export class TimbongmodalComponent implements OnInit {
  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  listBanBong: any = [];
  listTrienKhaiKeHoach: any = [];
  listItems: any = [];
  listProps: any = [];
  listCol: any = [];
  listFixedCol: any = [];
  editVal: any = 0;
  checkbutton: any = {};
  opt: any = '';
  listLoBong: any = [];
  itemSoKienTrenBan = {};
  itemMicBQ = {};
  itembBQ = {};
  itemSoKienTrenBanTruBongHoi = {};
  item: any = {
    Id: '',
    listItem: [],
    listLoBong: []
  };
  TongKhoiLuongDung: any = null;
  TongTyLe: number = 100;
  itemTrienKhaiKeHoach: any = {};
  ChatLuongBinhQuan: any = {
    Rd: 0,
    Mic: 0,
    b: 0
  }
  labelBong: any = {
  }
  PoolLoBong:any = {

  }
  constructor(public _activeModal: NgbActiveModal, private _services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) { 

  }

  ngOnInit(): void {
    this.checkbutton={
      Ghi:true,
      Xoa:true,
      ChuyenTiep:true,
      KhongDuyet:true
    }
    this.GetListTrienKhaiKeHoach()
  }
  GetListTrienKhaiKeHoach() {
    let data = {
      CurrentPage: 0,
    }
    this._services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoach = mapArrayForDropDown(res, 'SoQuyTrinh', "Id")
      if (validVariable(this.item.IdTrienKhaiKeHoachSanXuat)) {
        // this.GetChiTietTrienKhaiKeHoachForMatHang({ value: this.item.IdTrienKhaiKeHoachSanXuat });
      }
      if (validVariable(this.item.SoBanBong) && this.item.SoBanBong !== 0) {
        this.listProps = [];
        for (let i = 1; i <= this.item.SoBanBong; i++) {
          this.listProps.push(`${i}`);
        }
        this.item.listLoBong.forEach((lobong, index) => {
          if (!validVariable(lobong.temBanBong)) {
            lobong.tempBanBong = {};
          }
          lobong.listItem.forEach((item) => {
            let data = {
              ...item,
              listItem: (validVariable(item.listItem)&& item.listItem?.length!==0)?item.listItem:[],
              SoKien: item.SoLuongKien,
              tabIndex: index + 1 + (item.ThuTu * this.item.listLoBong.length)
            }
            lobong.tempBanBong[`${item.ThuTu}`] = data;
          });
          // if(!validVariable(this.PoolLoBong[`${lobong.IdLoBong.split('-').join('_')}`])){
          //   this.PoolLoBong[`${lobong.IdLoBong.split('-').join('_')}`] = []
          // }
          // this._services.TimBong().GetListKienBong(lobong.IdLoBong).subscribe(res=>{
          //   console.log(res)
          // })
        });
        this.GetPoolKienBong();
        let TongChatLuong = {
          Mic: 0,
          Rd: 0,
          b: 0
        }
        this.item.listLoBong.forEach(lobong => {
          if (validVariable(lobong.Mic)) {
            TongChatLuong.Mic += lobong.Mic;
          }
          if (validVariable(lobong.Rd)) {
            TongChatLuong.Rd += lobong.Rd;
          }
          if (validVariable(lobong.b)) {
            TongChatLuong.b += lobong.b;
          }
        });
        this.ChatLuongBinhQuan = {
          Mic: TongChatLuong.Mic / res.length,
          Rd: TongChatLuong.Rd / res.length,
          b: TongChatLuong.b / res.length,
        }
        this.labelBong = {}
        this.item.listLoBong.forEach(lobong => {
          if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
            this.labelBong[lobong.MadmLoaiBong] = 0;
          }
          if (validVariable(lobong.TyLe)) {
            this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
          }
        });
        this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M + this.labelBong.TP);
        for (let i = 0; i < this.item.listLoBong.length; i++) {
          for (let j = 1; j <= this.item.SoBanBong; j++) {
            this.CalAllTable(i, `${j}`);
          }
        }
      }
    })
  }
  GetPoolKienBong(){
    if(validVariable(this.item.listLoBong)){
      this._services.TimBong().GetListKienBong(this.item.listLoBong.map(lobong=>lobong.IdLoBong)).subscribe((res:any)=>{
        res.forEach(kien => {
          if(!validVariable(this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`])){
              this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`] = []
            }
          this.PoolLoBong[`${kien.IdLoBong.split('-').join('_')}`].push(kien);
        });
        console.log(this.PoolLoBong);
      })
    }
  }
  TinhTyLeTong() {
    this.labelBong = {}
    this.item.listLoBong.forEach(lobong => {
      if (!validVariable(this.labelBong[lobong.MadmLoaiBong])) {
        this.labelBong[lobong.MadmLoaiBong] = 0;
      }
      if (validVariable(lobong.TyLe)) {
        this.labelBong[lobong.MadmLoaiBong] += lobong.TyLe;
      }
    });
    this.labelBong.Hoi = 100 - (this.labelBong.BR + this.labelBong.M + this.labelBong.TP);
  }
  CalAllTable(y, x) { //truc toa do y:tung x:hoanh
    let tempSLD = 0;
    for (let i = 1; i <= this.item.SoBanBong; i++) {
      if (validVariable(this.item.listLoBong[y].tempBanBong[`${i}`].SoKien)) {
        tempSLD += this.item.listLoBong[y].tempBanBong[`${i}`].SoKien;
      }
    }
    this.item.listLoBong[y].SoLuongDung = tempSLD;
    this.item.listLoBong[y].TonCuoi = this.item.listLoBong[y].SoLuongKien - tempSLD;
    let tempSoKien1Line = 0;
    let tempSoKien1LineTruBongHoi = 0;
    let tempTongCLMic = 0;
    let tempTongCLRd = 0;
    let tempTongCLb = 0;
    let tempTongKhoiLuongDung = 0;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.tempBanBong[`${x}`].SoKien)) {
        tempSoKien1Line += lobong.tempBanBong[`${x}`].SoKien;
        if (validVariable(lobong.Mic)) {
          tempSoKien1LineTruBongHoi += lobong.tempBanBong[`${x}`].SoKien;
          tempTongCLMic += (lobong.tempBanBong[`${x}`].SoKien * lobong.Mic);
        }
        if (validVariable(lobong.b)) {
          tempTongCLb += (lobong.tempBanBong[`${x}`].SoKien * lobong.b);
        }
      }
      if (validVariable(lobong.SoLuongDung)) {
        tempTongKhoiLuongDung += (lobong.SoLuongDung * lobong.TrongLuong);
      }
    });
    this.TongKhoiLuongDung = tempTongKhoiLuongDung;
    this.itemMicBQ[`${x}`] = tempTongCLMic / tempSoKien1LineTruBongHoi;
    this.itembBQ[`${x}`] = tempTongCLb / tempSoKien1LineTruBongHoi;
    this.itemSoKienTrenBan[`${x}`] = tempSoKien1Line;
    this.itemSoKienTrenBanTruBongHoi[`${x}`] = tempSoKien1LineTruBongHoi;
    this.item.listLoBong.forEach(lobong => {
      if (validVariable(lobong.SoLuongDung)) {
        lobong.TyLe = (lobong.SoLuongDung * lobong.TrongLuong) / tempTongKhoiLuongDung * 100;
      }
    });
    this.TinhTyLeTong()
  }
  chonKienBong(IdLoBong,y,x){
    console.log(IdLoBong);

    let modalRef = this._modal.open(ChonkienbongmodalComponent,{
      size:'xl'
    })
    modalRef.componentInstance.listKien = this.PoolLoBong[`${IdLoBong.split('-').join('_')}`];
    // modalRef.componentInstance.listSelectedKien = thi
  }
}
