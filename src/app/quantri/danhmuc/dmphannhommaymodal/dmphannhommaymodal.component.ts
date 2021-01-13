import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
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
  listloaisoi: any = [];
  khongclicknhieu: any = false;

  constructor(private _modal: NgbModal, public activeModal: NgbActiveModal, private services: Dat09Service, private sanXuatService: SanXuatService, public toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.opt == 'edit') {
      // this.GetPhanXuong();
    }
    // this.GetDanhSachLoaiDienKV();
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

  TimKiem() {

  }

  resetFilter() {

  }

  DanhSachHang() {
    let modalRef = this._modal.open(DmphannhommayChonmathangmodalComponent, {
      size: "md",
      backdrop: 'static'
    });
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.title = 'Danh sách hàng';
    modalRef.componentInstance.item = {};
    modalRef.result.then(res => {
      this.toastr.success(res);
    }).catch(er => console.log(er))
  }

  delete(item) {

  }

}
