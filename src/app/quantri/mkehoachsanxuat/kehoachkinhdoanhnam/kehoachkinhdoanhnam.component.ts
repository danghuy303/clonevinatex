import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { KehoachkinhdoanhnammodalComponent } from './kehoachkinhdoanhnammodal/kehoachkinhdoanhnammodal.component';

@Component({
  selector: 'app-kehoachkinhdoanhnam',
  templateUrl: './kehoachkinhdoanhnam.component.html',
  styleUrls: ['./kehoachkinhdoanhnam.component.css']
})
export class KehoachkinhdoanhnamComponent implements OnInit {

  listKeHoach: any = [];
  paging: any = {};
  checkQuyen: any = {};
  constructor(
    public _modal: NgbModal,
    public toastr: ToastrService,
    private activatedRoute: ActivatedRoute, 
    private router: Router,
  ) {
    this.listKeHoach = [
      {
        id: "KH001",
        SoQuyTrinh: "QTGKHSX042022_0001",
        TenKeHoach: "Tên/ Nội dung kế hoạch",
        TenNhanVien: "Nguyễn Văn A",
        DoanhThu: 100000000,
        ChiPhi: 50000000,
        LoiNhuan: 50000000,
        Nam: 2022,
        TenTrangThai: "Chưa duyệt",
        GhiChu: "Ghi chú",
        ListSanPham:[
          {
            TenSanPham: "Sản phẩm 1",
            NhaMay: "Nhà máy 1",
            HopDong: "Hợp đồng 1",
            TongSanLuong: 1300,
            Thang1: 200,
            Thang2: 100,
            Thang3: 100,
            Thang4: 100,
            Thang5: 100,
            Thang6: 100,
            Thang7: 100,
            Thang8: 100,
            Thang9: 100,
            Thang10: 100,
            Thang11: 100,
            Thang12: 100,
          },
          {
            TenSanPham: "Sản phẩm 2",
            NhaMay: "Nhà máy 2",
            HopDong: "Hợp đồng 1",
            TongSanLuong: 1300,
            Thang1: 200,
            Thang2: 100,
            Thang3: 100,
            Thang4: 100,
            Thang5: 100,
            Thang6: 100,
            Thang7: 100,
            Thang8: 100,
            Thang9: 100,
            Thang10: 100,
            Thang11: 100,
            Thang12: 100,
          },
        ],
      },
      {
        id: "KH002",
        SoQuyTrinh: "QTGKHSX042022_0002",
        TenKeHoach: "Tên/ Nội dung kế hoạch",
        TenNhanVien: "Nguyễn Văn A",
        DoanhThu: 100000000,
        ChiPhi: 50000000,
        LoiNhuan: 50000000,
        Nam: 2022,
        TenTrangThai: "Chưa duyệt",
        GhiChu: "Ghi chú",
      },
      {
        id: "KH003",
        SoQuyTrinh: "QTGKHSX042022_0003",
        TenKeHoach: "Tên/ Nội dung kế hoạch",
        TenNhanVien: "Nguyễn Văn A",
        DoanhThu: 100000000,
        ChiPhi: 50000000,
        LoiNhuan: 50000000,
        Nam: 2022,
        TenTrangThai: "Chưa duyệt",
        GhiChu: "Ghi chú",
      },
      {
        id: "KH004",
        SoQuyTrinh: "QTGKHSX042022_0004",
        TenKeHoach: "Tên/ Nội dung kế hoạch",
        TenNhanVien: "Nguyễn Văn A",
        DoanhThu: 100000000,
        ChiPhi: 50000000,
        LoiNhuan: 50000000,
        Nam: 2022,
        TenTrangThai: "Chưa duyệt",
        GhiChu: "Ghi chú",
      },
      {
        id: "KH005",
        SoQuyTrinh: "QTGKHSX042022_0005",
        TenKeHoach: "Tên/ Nội dung kế hoạch",
        TenNhanVien: "Nguyễn Văn A",
        DoanhThu: 100000000,
        ChiPhi: 50000000,
        LoiNhuan: 50000000,
        Nam: 2022,
        TenTrangThai: "Chưa duyệt",
        GhiChu: "Ghi chú",
      },
    ]
  }

  ngOnInit(): void {
    this.resetFilter();
  }

  
  resetFilter() {
    this.getListKeHoachKinhDoanh(true)
  }
  
  getListKeHoachKinhDoanh(reset?) {
    if (reset) {
      this.paging.Page = 1;
    }
  }

  changeParam(item) {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    })
    modalRef.componentInstance.kehoach = item;
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }
  
  add() {
    let modalRef = this._modal.open(KehoachkinhdoanhnammodalComponent, {
      size: "fullscreen",
      backdrop: "static",
    })
    modalRef.result
      .then((res: any) => {

      })
      .catch((error: any) => {

      })
      .finally(() => {})
  }

  changeTab(e) {

  }
}
