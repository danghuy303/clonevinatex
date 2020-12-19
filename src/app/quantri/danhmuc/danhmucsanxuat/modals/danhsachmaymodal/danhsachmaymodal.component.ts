import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { congDoan } from 'src/app/services/const';

@Component({
  selector: 'app-danhsachmaymodal',
  templateUrl: './danhsachmaymodal.component.html',
  styleUrls: ['./danhsachmaymodal.component.css']
})
export class DanhsachmaymodalComponent implements OnInit {
  opt: any = ''
  item: any = {
  };
  listCongDoan:any=[];
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, private _modal: NgbModal) { }

  ngOnInit(): void {
    this.listCongDoan=congDoan
  }
  accept() {
    if (this.item.Ma !== undefined && this.item.Ma.trim() !== '' && this.item.Ten.trim() !== '' && this.item.Ten !== undefined && this.item.CodeCongDoan !== undefined) {
      this.services.SetdmMay(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close(res.message);
          } else {
            this.toastr.error(res.message)
          }
        }
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin bắt buộc!')
    }
  }
}
