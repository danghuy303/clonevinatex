import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { handleHTTPResponse } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danh-muc-ke-hoach-modal',
  templateUrl: './danh-muc-ke-hoach-modal.component.html',
  styleUrls: ['./danh-muc-ke-hoach-modal.component.css']
})
export class DanhMucKeHoachModalComponent implements OnInit {

  @Input() danhMuc: any;
  @Input() danhMucName: any;
  opt: any = "";
  title: any = "";
  constructor(
    private sanxuatService: SanXuatService,
    public activeModal: NgbActiveModal,
    public toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = 'Thêm mới';
    } else {
      this.title = 'Cập nhật';
    }
  }

  setData() {
    let data = {...this.danhMuc}
    return data
  }

  ChapNhan() {
    this.sanxuatService.KeHoachSanXuat(this.danhMucName).Set(this.setData()).subscribe((res: any) => {
      handleHTTPResponse(res, this.toast, () => {
        this.activeModal.close();
      })
    })
  }

}
