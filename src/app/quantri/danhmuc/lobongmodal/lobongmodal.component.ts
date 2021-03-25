import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-lobongmodal',
  templateUrl: './lobongmodal.component.html',
  styleUrls: ['./lobongmodal.component.css']
})
export class LobongmodalComponent implements OnInit {

  opt: any = ''
  listdmLoaiBong: any = [];
  listdmCapBong: any = [];
  item: any = {};
  khongclicknhieu: any = false;
  lang: any = vn;
  constructor(public activeModal: NgbActiveModal,
     private services: SanXuatService,
      public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.getListdmCapBong();
    this.GetListdmLoaiBong();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = new Date(this.item.NgayUnix * 1000);
    }
    console.log(this.item)
    debugger
  }
  
  accept() {
    this.item.HoatDong = true;
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.Ngay !== undefined) {
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
      this.services.SetLoBong(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.activeModal.close(res.message);
          } else {
            this.khongclicknhieu = !this.khongclicknhieu;
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.khongclicknhieu = !this.khongclicknhieu;
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }

  GetListdmLoaiBong(){
    let data={
      CurrentPage: 0,
    }
    this.services.GetListdmLoaiBong(data).subscribe((res:any)=>{
      this.listdmLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  getListdmCapBong(){
    this.services.GetListOptdmCapBong().subscribe((res:any)=>{
      this.listdmCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  Onclose() {
    this.activeModal.close();
  }
}
