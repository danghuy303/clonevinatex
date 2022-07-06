import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { handleHTTPResponse } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhap-lieu-ke-hoach-modal',
  templateUrl: './nhap-lieu-ke-hoach-modal.component.html',
  styleUrls: ['./nhap-lieu-ke-hoach-modal.component.css']
})
export class NhapLieuKeHoachModalComponent implements OnInit {

  @Input() opt: any = "";
  @Input() item: any = {};
  @Input() serviceName: any;
  title: string = "";
  listNam: any = [];
  labelThang: any = [];
  nam: any;

  constructor(
    private sanXuatService: SanXuatService,
    private toast: ToastrService, 
    private modal: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
    this.GetLabelThang();
    if (this.opt === 'add') {
      this.title = 'Thêm mới';
    } else {
      this.title = 'Cập nhật';
    }
  }

  GetLabelThang() {
    for(let i = 1; i <= 12; i++) {
      this.labelThang.push(`Tháng ${i}`);
    }
  }

  GetListNam() {
    this.sanXuatService[this.serviceName]()
      .GetByNam(this.nam)
      .subscribe((res: any) => {
        console.log("res", res);
        this.item.ListChiPhi = res.ListChiPhi;
    })
  }

  SetData() {
    let data = {
      ...this.item,
      Nam: this.nam
    }
    return data;
  }

  ChapNhan() {
    this.sanXuatService[this.serviceName]().Set(this.SetData()).subscribe((res: any) => {
      console.log("res", res);
      handleHTTPResponse(res, this.toast, () => {
        this.activeModal.close();
      })
    })
  }

}
