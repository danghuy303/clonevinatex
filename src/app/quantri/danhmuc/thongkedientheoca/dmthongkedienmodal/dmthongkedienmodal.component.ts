import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate, formatdate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dmthongkedienmodal',
  templateUrl: './dmthongkedienmodal.component.html',
  styleUrls: ['./dmthongkedienmodal.component.css']
})
export class DmthongkedienmodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  nametype: any = "";
  lstKhungGio: any = [];
  khongclicknhieu: any = false;
  cols: any = [    
    {
      header: 'Số tiêu thụ',
      field: 'SoTieuThu',
      width: 'unset',
      align: 'right'
    },
    {
      header: 'Hệ số nhân',
      field: 'HeSoNhan',
      width: 'unset',
      align: 'right'
    },
    {
      header: 'Tiêu thụ trong ca',
      field: 'TieuThuTrongCa',
      width: 'unset',
      align: 'right'
    }
  ];

  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.nametype = `- ngày ${formatdate(this.item.NgayNhap, false)}, ${this.item.Ten}`;
    if (this.item.lstMayBienAp.length > 0) {
      this.lstKhungGio = this.item.lstMayBienAp[0].lstKhungGio;
      this.lstKhungGio.forEach(element => {
        let liststring: any = [];
        liststring = element.Ten.split(" ÷ ");
        element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} đến ${liststring[1]}`;
      });
    }
  }

  changeTab(e) {
    this.lstKhungGio = this.item.lstMayBienAp[e.index].lstKhungGio;
    this.lstKhungGio.forEach(element => {
      let liststring: any = [];
      liststring = element.Ten.split(" ÷ ");
      element.HeaderPanel = `Thống kê cho khung giờ ${liststring[0]} đến ${liststring[1]}`;
    });
  }

  GhiLai() {
    this.khongclicknhieu = !this.khongclicknhieu;
    this._services.ThongKeDien().Set(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.activeModal.close(res.message);
          // this.toastr.success(res.message)
        } else {
          this.khongclicknhieu = !this.khongclicknhieu;
          this.toastr.error(res.message);
        }
      }
    })
  }

  Onclose() {
    this.activeModal.close();
  }

}
