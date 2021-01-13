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

  public item: any = {};
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
  listloaisoi: any = [];
  khongclicknhieu: any = false;
  filter: any = {};

  constructor(public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetLoaiSoi();
    this.GetDMMatHang();
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
      this.listloaisoi = res;
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
    })
  }

  resetFilter() {

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
    this.sanXuatService.DMMayBienAp().Set(this.item).subscribe((res: any) => {
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

}
