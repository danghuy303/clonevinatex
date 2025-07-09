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
        KhachHang: this.item.khachHang,
        NoiDung: this.item.noiDung,
        GhiChu: this.item.ghiChu,
        NgayLo: UnixToDate(this.item.ngayLoUnix),
        NgayKhieuNai: UnixToDate(this.item.ngayKhieuNaiUnix),
      }
    }
  }
  getListLoHang() {
    let api$ = this.isSoi ? this._hopDong.GetListLoHang(this.quyTrinh.hopDong.id, this.quyTrinh.hopDong.soHopDong) : this._hopDong.GetListLoBong(this.quyTrinh.hopDong.id, this.quyTrinh.hopDong.soHopDong)
    api$.subscribe((res: any) => {
      this.listLoHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetlistdmTrangThaiKhieuNai() {
    this._hopDong.GetlistdmTrangThaiKhieuNai({}).subscribe((res: any) => {
      this.listTrangThai = mapArrayForDropDown(res, 'ten', 'id');
    })
  }

  setData() {
    return {
      ...this.item,
      IdHopDong: this.quyTrinh.hopDong.id,
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
