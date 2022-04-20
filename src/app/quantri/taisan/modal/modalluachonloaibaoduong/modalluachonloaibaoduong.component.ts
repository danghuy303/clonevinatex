import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachonloaibaoduong',
  templateUrl: './modalluachonloaibaoduong.component.html',
  styleUrls: ['./modalluachonloaibaoduong.component.css']
})
export class ModalluachonloaibaoduongComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: any = [];
  item: any = [];
  listItemDaChon: any = [];
  Lay_Chon: any = [];
  layId: any = {};
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Nam: any = "";

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    console.log(this.layId);
    
    this.GetList();
  }

  GetList() {
    // // this.items = this.Lay_Chon;
    // // this.items.forEach(obj => {
    // //   obj.checked = this.listItemDaChon.includes(obj.IddmLoaiBaoDuong);
    // // });
    // this.checkedAll = this.items.every(ele => ele.checked);

    let data = {
      CurrentPage: 0,
      PageSize: 0,
      IddmLoaiTaiSan: this.layId.IddmLoaiTaiSan,
      IdBoPhanSuDung: this.layId.IdBoPhanSuDung,
    }
    this._serviceTaiSan.LichXich().GetListdmLoaiBaoDuong(data).subscribe((res: any) => {
    this.items = res.Data ;
    })
    this.checkedAll = this.items.every(ele => ele.checked);
  }
  TimCheck() {
     let cha: boolean = false;
    cha = this.items.every(ele => ele.checked);
    if ((cha)) {
      return true;
    }
    else {
      return false;
    }
  }
  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.checked = true;
      });
    }
  }
  checked() {
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.checked) {
        data.push({
          IddmLoaiBaoDuong: obj.Id,
          Id: '',
          TendmLoaiBaoDuong: obj.Ten,
          NgayUnix: 0,
        });
      }
    });
    return data;
  }
  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}