import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hopdongsanphammodal',
  templateUrl: './hopdongsanphammodal.component.html',
  styleUrls: ['./hopdongsanphammodal.component.css']
})
export class HopdongsanphammodalComponent implements OnInit {

  listHopDong: any = {};
  tenSanPham: any = "";
  selectedProducts: any = [];
  checkedAll: boolean;
  nam: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _modal: NgbModal,
    public toastr: ToastrService,
  ) { 
    // this.hopdong = {
    //   listSanPham: [
    //     {
    //       HopDong: "Hợp đồng 1",
    //       TenSanPham: "Sản phẩm 1",
    //       Nam: 2022,
    //       TongSanLuong: 1200,
    //       DaSanXuat: 1100,
    //       ConLai: 100,
    //       DonVi: "tấn"
    //     },
    //     {
    //       HopDong: "Hợp đồng 1",
    //       TenSanPham: "Sản phẩm 2",
    //       Nam: 2022,
    //       TongSanLuong: 1200,
    //       DaSanXuat: 1100,
    //       ConLai: 100,
    //       DonVi: "tấn"
    //     },
    //     {
    //       HopDong: "Hợp đồng 1",
    //       TenSanPham: "Sản phẩm 3",
    //       Nam: 2022,
    //       TongSanLuong: 1200,
    //       DaSanXuat: 1100,
    //       ConLai: 100,
    //       DonVi: "tấn"
    //     },
    //     {
    //       HopDong: "Hợp đồng 1",
    //       TenSanPham: "Sản phẩm 4",
    //       Nam: 2022,
    //       TongSanLuong: 1200,
    //       DaSanXuat: 1100,
    //       ConLai: 100,
    //       DonVi: "tấn"
    //     },
    //     {
    //       HopDong: "Hợp đồng 1",
    //       TenSanPham: "Sản phẩm 5",
    //       Nam: 2022,
    //       TongSanLuong: 1200,
    //       DaSanXuat: 1100,
    //       ConLai: 100,
    //       DonVi: "tấn"
    //     }
    //   ]
    // }
  }

  ngOnInit(): void {
    console.log("listHopDong", this.listHopDong);
    
    this.CountSLConlai();
  }

  CountSLConlai() {
    this.listHopDong.forEach(ele => {
      ele.ConLai = 0;
      ele.ConLai = (ele.TongSanLuong || 0) - (ele.SanLuongDoDang || 0) - (ele.SanLuongDaSanXuat || 0);
    }) 
  }

  ChapNhan() {
    this.activeModal.close(this.listHopDong);
  }

}
