import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';
import { PintableDirective } from 'voi-lib';
import { DanhSachTheoNhomMayComponent } from '../danh-sach-theo-nhom-may/danh-sach-theo-nhom-may.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vattuthaythelichxichnam',
  templateUrl: './vattuthaythelichxichnam.component.html',
  styleUrls: ['./vattuthaythelichxichnam.component.css']
})
export class VattuthaythelichxichnamComponent implements OnInit, OnChanges {

  @Input('listTaiSan') listTaiSan: any = {};
  @Output() HandListTaiSan: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(PintableDirective) voiPintable: PintableDirective;

  labelThang: any = [];
  ThanhTien: any = 0;
  TongGiaTriToanBang: any = 0;
  vatTu: any = [];


  constructor(
    private _serviceTaiSan: TaisanService,
    public _modal: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnChanges(): void {
    this.SumAll();
    this.labelThang = [];
    for (let i = 1; i <= 12; i++) {
      this.labelThang.push(`Tháng ${i}`);
    }
  }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.voiPintable.active();
  }

  changeValue(event) {
    if (event.target.value.trim() == '') {
      event.target.value = 0;
    }
  }

  tongTien(item) {
    this.TongGiaTriToanBang = 0;
    item.TongGiaTri = 0;
    item.TongThanhTien = new Array(12).fill(0);
    for (let i = 0; i <= 11; i++) {
      item.listVatTu.forEach(vattu => {
        item.TongThanhTien[i] += ((vattu.listThoiGian[i].DonGia || 0) * (vattu.listThoiGian[i].SoLuong || 0));
      })
    }
    item.listVatTu.forEach(vattu => {
      vattu.ThanhTien12Thang = vattu.listThoiGian.reduce((a, b) => { return a += (b.DonGia || 0) * (b.SoLuong || 0) }, 0)
    })
    item.TongThanhTien.forEach(Tong => {
      item.TongGiaTri += Tong;
    });
    this.listTaiSan.forEach(ele => {
      this.TongGiaTriToanBang += (ele.TongGiaTri || 0);
    })
    item.listVatTu.forEach(vattu => {
      vattu.listThoiGian.forEach(obj => {
        if (obj.SoLuong == null) {
          obj.SoLuong = 0;
        }
        if (obj.DonGia == null) {
          obj.DonGia = 0;
        }
      })
      vattu.listThoiGian = deepCopy(vattu.listThoiGian)
    })
    // item.listVatTu = deepCopy(item.listVatTu);
  }

  SumAll() {
    this.TongGiaTriToanBang = 0;
    this.listTaiSan.forEach(item => {
      item.TongGiaTri = 0;
      item.TongThanhTien = new Array(12).fill(0);
      for (let i = 0; i <= 11; i++) {
        item.listVatTu.forEach(vattu => {
          item.TongThanhTien[i] += ((vattu.listThoiGian[i].DonGia || 0) * (vattu.listThoiGian[i].SoLuong || 0));
        })
      }
      item.listVatTu.forEach(vattu => {
        vattu.ThanhTien12Thang = vattu.listThoiGian.reduce((a, b) => { return a += (b.DonGia || 0) * (b.SoLuong || 0) }, 0)
      })
      item.TongThanhTien.forEach(Tong => {
        item.TongGiaTri += Tong;
      });
      this.TongGiaTriToanBang += (item.TongGiaTri || 0);
    })
  }

  LayVatTu() {
    this._serviceTaiSan.GetDanhSachVatTuThayTheForLichXichNam(this.listTaiSan).subscribe((res: any) => {
      this.HandListTaiSan.emit(res.Data);
    })
  }

  handleNhapGia() {
    this._serviceTaiSan.GetGiaVatTuThayTheForLichXichNam(this.listTaiSan).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        let modalRef = this._modal.open(DanhSachTheoNhomMayComponent, {
          backdrop: "static", size: 'lg'
        });
        modalRef.componentInstance.title = "Nhóm máy/thiết bị";
        modalRef.componentInstance.listTaiSan = res.Data;
        modalRef.result.then((res: any) => {
          this.getGiaVatTuThayThe(res);
        })
          .catch((er: any) => { })
      } else res.Message;
    })
  }

  getGiaVatTuThayThe(list: any) {
    let data = {
      listTaiSan: this.listTaiSan,
      listDonGia: list
    }
    this._serviceTaiSan.GetGiaVatTuThayThe(data).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.listTaiSan = res.Data;
        this.HandListTaiSan.emit(this.listTaiSan);
        this.toastr.success(res.Message);
      } else this.toastr.error(res.Message);
    })
  }

}
