import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmphannhommay-chonmathangmodal',
  templateUrl: './dmphannhommay-chonmathangmodal.component.html',
  styleUrls: ['./dmphannhommay-chonmathangmodal.component.css']
})
export class DmphannhommayChonmathangmodalComponent implements OnInit {

  public selectedItems: any = [];
  public items: any = [];
  public title: any = '';
  public type = '';
  opt: any = "";
  cols: any = [
    {
      header: 'Mã',
      field: 'Ma',
      width: 'unset',
    },
    {
      header: 'Tên',
      field: 'Ten',
      width: 'unset',
    },
    {
      header: 'Loại sợi',
      field: 'TendmLoaiSoi',
      width: 'unset',
    },
  ];
  IdQuyTrinh: any = "";
  listloaisoi: any = [];
  khongclicknhieu: any = false;
  filter: any = {};
  checkedAll: boolean = false;

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetLoaiSoi();
    this.GetDMMatHang();
    if (this.items.length !== 0) {
      this.checkedAll = this.items.every((ele) => ele.checked);
    }
  }

  GetLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this.sanXuatService.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');;
    })
  }

  GetDMMatHang() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord != undefined && this.filter.keyWord != null ? this.filter.keyWord : "",
      CongDoan: '',
      Ma: "",
      Ten: "",
      Loai: "1",
    };
    this.sanXuatService.GetListdmItem(data).subscribe((res: any) => {
      this.items = res;
      if (this.selectedItems.length !== 0) {
        this.selectedItems.filter(item => !item.isXoa).forEach(sItem => {
          let selected = this.items.filter(item => sItem.IddmItem === item.Id)[0];
          if (selected) {
            selected.checked = true;
          }
        });
      }
    })
  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(item => {
        item.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.checked = false;
      });
    }
  }

  resetFilter() {

  }

  accept() {
    this.activeModal.close(this.items.filter(item => item.checked).map(ele => {
      return {
        ...ele,
        IddmItem: ele.Id,
        IddmPhanNhomMay: this.IdQuyTrinh || "",
        // NangSuat: ele.NangSuat || 0,
        // HieuSuat: ele.HieuSuat || 0,
        // DinhMucNangSuat: ele.DinhMucNangSuat || 0,
        // GhiChu: ele.GhiChu || "",
        Id: '',
      }
    }));
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

}
