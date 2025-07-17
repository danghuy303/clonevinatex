import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { vn } from '../../../../../../services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from '../../../../../../services/globalfunction';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HopDongService } from '../../../../../../services/Hopdong/hopdong.service';
import { SanXuatService } from '../../../../../../services/callApiSanXuat';

@Component({
  selector: 'app-tabkhieunaimodal',
  templateUrl: './tabkhieunaimodal.component.html',
  styleUrls: ['./tabkhieunaimodal.component.css']
})
export class TabkhieunaimodalComponent implements OnInit, OnChanges {

  item: any = {};
  quyTrinh: any = {};
  lang: any = vn;
  yearRange: string = `${new Date().getFullYear() - 50}:${new Date().getFullYear()}`;
  listLoHang: any = [];
  listTrangThai: any = [];
  isSoi: boolean = false;
  opt: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    public _toastr: ToastrService,
    private _hopDong: HopDongService,
    private _service: SanXuatService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.GetlistdmTrangThaiKhieuNai();
    this.getListLoHang();
    if (this.opt === 'edit') {
      this.item = {
        ...this.item,
        KhachHang: this.item.KhachHang,
        NoiDung: this.item.NoiDung,
        GhiChu: this.item.GhiChu,
        NgayLo: UnixToDate(this.item.NgayLoUnix),
        NgayKhieuNai: UnixToDate(this.item.NgayKhieuNaiUnix),
      }
    }
  }
  getListLoHang() {
    let api$ = this.isSoi ? this._hopDong.GetListLoHang(this.quyTrinh.HopDong.Id, this.quyTrinh.HopDong.SoHopDong) : this._hopDong.GetListLoBong(this.quyTrinh.HopDong.Id, this.quyTrinh.HopDong.SoHopDong)
    api$.subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetlistdmTrangThaiKhieuNai() {
    this._hopDong.GetlistdmTrangThaiKhieuNai({}).subscribe((res: any) => {
      this.listTrangThai = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  setData() {
    return {
      ...this.item,
      IdHopDong: this.quyTrinh.HopDong.Id,
      NgayLoUnix: DateToUnix(this.item.NgayLo),
      NgayKhieuNaiUnix: DateToUnix(this.item.NgayKhieuNai),
      TendmTrangThaiKhieuNai: this.listTrangThai.find(ele => ele.value === this.item.IddmTrangThaiKhieuNai)?.label
    }
  }

  chapNhan() {
    this._hopDong.SetKhieuNai(this.setData()).subscribe((res: any) => {
      if(res) {
        this.activeModal.close(this.setData());
      } else this._toastr.error('Ghi lại bị lỗi, vui lòng liên hệ bộ phận kỹ thuật')
    })
  }

}
