
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { PintableDirective } from 'voi-lib';
import { ModalthongbaoComponent } from '../../modal/modalthongbao/modalthongbao.component';
import { ModalluachonloaibaoduongComponent } from '../modal/modalluachonloaibaoduong/modalluachonloaibaoduong.component';
import { ModalluachontaisantheolichxichComponent } from '../modal/modalluachontaisantheolichxich/modalluachontaisantheolichxich.component';

@Component({
  selector: 'app-lapkehoachthang',
  templateUrl: './lapkehoachthang.component.html',
  styleUrls: ['./lapkehoachthang.component.css']
})
export class LapkehoachthangComponent implements OnInit {

  @ViewChild(PintableDirective) voiPintable: PintableDirective;
  opt: any = "";
  listNam: any = [];
  item: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhanXuong = [];
  listLoaiTaiSan = [];
  TaiSanItem: any = [];
  store: any;

  labelThang: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
  constructor(
    private _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,
  ) { }
  
  ngOnInit(): void {
    
  }
  
  
  
  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalluachontaisantheolichxichComponent, {
      size: "lg",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.Lay_Chon = this.item;
    modalRef.componentInstance.Chon = this.TaiSanItem;
    modalRef.componentInstance.item = {};
    modalRef.result.then((res: any) => {
      // let listKetQua = [];
      // this.item.listTaiSan.forEach(Tai_San => {
      //   let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien !== undefined) {
      //     Tai_San.listBaoDuong = []
      //     for (let i = 1; i <= 30; i++) {
      //       Tai_San.listBaoDuong.push(
      //         {
      //           ThoiGian: i,
      //           listChiTiet: [],
      //         }
      //       )
      //     }
      //     listKetQua.push(Tai_San);
      //   }
      // });
      // res.forEach(Tai_San => {
      //   let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
      //   if (bien === undefined) {
      //     Tai_San.listBaoDuong = []
      //     for (let i = 1; i <= 30; i++) {
      //       Tai_San.listBaoDuong.push(
      //         {
      //           ThoiGian: i,
      //           listChiTiet: [],
      //         }
      //       )
      //     }
      //     listKetQua.push(Tai_San);
      //   }
      // });
      // this.item.listTaiSan = listKetQua;
      this.item.listTaiSan = merge(res, this.item.listTaiSan, 'IdTaiSan');
      this.item.listTaiSan.forEach(ele => {
        if (!validVariable(ele.listBaoDuong)) {
          ele.listBaoDuong = []
          for (let i = 1; i <= 30; i++) {
            ele.listBaoDuong.push(
              {
                ThoiGian: i,
                listChiTiet: [],
              }
            )
          }
        }
      })
    })
      .catch((er) => {
      });
  }

  Chon(item, itemLoaiBaoDuongDeChon) {
    let modalRef = this._modal.open(ModalluachonloaibaoduongComponent, {
      backdrop: 'static',
      size: 'fullscreen-100',
      keyboard: false
    });
    modalRef.componentInstance.Lay_Chon = itemLoaiBaoDuongDeChon;
    modalRef.componentInstance.listItemDaChon = item.listChiTiet ? item.listChiTiet.map(ele => ele.IddmLoaiBaoDuong) : []
    modalRef.result.then((res: any) => {
      item.listChiTiet = res;
    })
      .catch((er) => {
      });
  }

  setData() {
    this.item.ThoiGianUnix = DateToUnix(this.item.ThoiGian);
    return this.item;
  }
  GhiLai() {
    this._serviceTaiSan.LichXichThang().Set(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200 || !res.StatusCode) {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      } else {
        this.item = res.Data;
        this.toastr.success(res.Message);
        this.KiemTraButtonModal();
        this.activeModal.close();
      }
    }, (er) => {
      this.toastr.error("Có lỗi trong quá trình xử lý!!!");
    })
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }
  ChapNhan() {
    
  }
  XoaQuyTrinh() {
  
  }
 
  taiLenFileDinhKem() {
   
  }
  
  }

