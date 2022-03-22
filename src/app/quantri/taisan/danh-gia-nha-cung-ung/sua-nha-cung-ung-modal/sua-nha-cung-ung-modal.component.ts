import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-sua-nha-cung-ung-modal',
  templateUrl: './sua-nha-cung-ung-modal.component.html',
  styleUrls: ['./sua-nha-cung-ung-modal.component.css']
})
export class SuaNhaCungUngModalComponent implements OnInit {

  item: any = {};
  title: string = "";

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetNhaCungUng();
  }

  GetNhaCungUng() {
    if (this.item.Id) {
      this.taiSanService.NhaCungUng().Get(this.item.Id)
      .subscribe((res: any)=>{
        this.item = res.Data;
      })
    }
  }

  SetNhaCungUng() {
    if (this.Validate()) {
      this.taiSanService.NhaCungUng().Set(this.item)
      .subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  Validate() {
    if (!validVariable(this.item.Ma)) {
      this.toast.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  
  listDanhGia: any[] = [
    {
      name: 'Chứng từ thanh toán - Hóa đơn tài chính',
      max: 10,
      now: 0,
      toggle: true,
      children: [
        {
          name: 'Hóa đơn VAT',
          max: 5,
          now: 0,
        },
        {
          name: 'Hóa đơn trực tiếp',
          max: 4,
          now: 0,
        },
        {
          name: 'Không có hóa đơn',
          max: 1,
          now: 0,
        },
      ]
    },
    {
      name: 'Khả năng cung cấp: Nguồn hàng - Cơ sở vật chất',
      max: 15,
      now: 0,
      toggle: false,
    },
    {
      name: 'Giấy tờ pháp lý',
      max: 10,
      now: 0,
      toggle: true,
      children: [
        {
          name: 'Hóa đơn VAT',
          max: 5,
          now: 5,
        },
        {
          name: 'Hóa đơn trực tiếp',
          max: 5,
          now: 5,
        }
      ]
    },
  ]

}

