import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hopdongsanphammodal',
  templateUrl: './hopdongsanphammodal.component.html',
  styleUrls: ['./hopdongsanphammodal.component.css']
})
export class HopdongsanphammodalComponent implements OnInit {

  hopdong: any = {};
  selectedProducts: any = [];
  checkedAll: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { 
    this.hopdong = {
      listSanPham: [
        {
          HopDong: "Hợp đồng 1",
          TenSanPham: "Sản phẩm 1",
          Nam: 2022,
          TongSanLuong: 1200,
          DaSanXuat: 1100,
          ConLai: 100,
          DonVi: "tấn"
        },
        {
          HopDong: "Hợp đồng 1",
          TenSanPham: "Sản phẩm 2",
          Nam: 2022,
          TongSanLuong: 1200,
          DaSanXuat: 1100,
          ConLai: 100,
          DonVi: "tấn"
        },
        {
          HopDong: "Hợp đồng 1",
          TenSanPham: "Sản phẩm 3",
          Nam: 2022,
          TongSanLuong: 1200,
          DaSanXuat: 1100,
          ConLai: 100,
          DonVi: "tấn"
        },
        {
          HopDong: "Hợp đồng 1",
          TenSanPham: "Sản phẩm 4",
          Nam: 2022,
          TongSanLuong: 1200,
          DaSanXuat: 1100,
          ConLai: 100,
          DonVi: "tấn"
        },
        {
          HopDong: "Hợp đồng 1",
          TenSanPham: "Sản phẩm 5",
          Nam: 2022,
          TongSanLuong: 1200,
          DaSanXuat: 1100,
          ConLai: 100,
          DonVi: "tấn"
        }
      ]
    }
  }

  ngOnInit(): void {
  }

  checkAll() {

  }

  check() {
    
  }

}
