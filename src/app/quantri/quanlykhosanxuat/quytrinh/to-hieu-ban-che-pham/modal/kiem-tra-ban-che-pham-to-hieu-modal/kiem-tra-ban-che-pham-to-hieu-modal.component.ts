import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kiem-tra-ban-che-pham-to-hieu-modal',
  templateUrl: './kiem-tra-ban-che-pham-to-hieu-modal.component.html',
  styleUrls: ['./kiem-tra-ban-che-pham-to-hieu-modal.component.css']
})
export class KiemTraBanChePhamToHieuModalComponent implements OnInit {

  opt = '';
  number:number = 2;
  Nam:any;
  kiemke: any = {};
  item: any = {};
  checkbutton = {};
  listPhanXuong: any = [];
  listMay: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  isKiemKe: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
  ) { }

  ngOnInit(): void {
    this.GetListdmPhanXuong();
    this.GetListMayCongDoanKiemKeBanChePhamToHieu();
  }

  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GetListMayCongDoanKiemKeBanChePhamToHieu() {
    this._services.KiemKeBanChePham().GetListMayCongDoanKiemKeBanChePhamToHieu().subscribe((res: any) => {
      this.listMay = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }

  ChapNhan() {
    this.isKiemKe = !this.isKiemKe;
    let data = {
      CongDoan: this.kiemke.CongDoan,
      Thang: this.kiemke.Nam.getMonth()+1,
      Nam: this.kiemke.Nam.getFullYear(),
      IddmCaSanXuat: '',
      IddmPhanXuong: this.kiemke.IddmPhanXuong,
    }
    this._services.KiemKeBanChePham().GetKhoiTaoPhieuKiemKeBanChePhamToHieu(data).subscribe((res: any) => {
      this.item = res.objectReturn
    })
  }

}
