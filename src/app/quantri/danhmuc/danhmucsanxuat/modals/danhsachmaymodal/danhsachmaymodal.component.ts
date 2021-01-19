import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';

@Component({
  selector: 'app-danhsachmaymodal',
  templateUrl: './danhsachmaymodal.component.html',
  styleUrls: ['./danhsachmaymodal.component.css']
})
export class DanhsachmaymodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listdmPhanXuong:any=[];
  listCongDoan : any = [];
  listPhanNhomMaySX : any = [];  
  khongclicknhieu: any = false;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
  }
  accept() {
    this.khongclicknhieu = !this.khongclicknhieu;
    if (this.item.Ma !== undefined && this.item.Ma !== '' && this.item.Ten !== '' && this.item.Ten !== undefined && this.item.CongDoan !== undefined) {
      this.services.SetdmMay(this.item).subscribe((res: any) => {
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
  
}
