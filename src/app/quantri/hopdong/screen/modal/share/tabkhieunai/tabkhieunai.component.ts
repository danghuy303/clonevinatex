import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TabkhieunaimodalComponent } from '../tabkhieunaimodal/tabkhieunaimodal.component';
import { ModalthongbaoComponent } from '../../../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { UnixToDate } from '../../../../../../services/globalfunction';
import { HopDongService } from '../../../../../../services/Hopdong/hopdong.service';

@Component({
  selector: 'app-tabkhieunai',
  templateUrl: './tabkhieunai.component.html',
  styleUrls: ['./tabkhieunai.component.css']
})
export class TabkhieunaiComponent implements OnInit, OnChanges {

  @Input() quyTrinh: any = {};
  @Input() isSoi: boolean = false;

  constructor(
    public _modal: NgbModal,
    public _toastr: ToastrService,
    private _hopDong: HopDongService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.quyTrinh.listKhieuNai = this.quyTrinh.listKhieuNai?.map((ele: any) => {
      return {
        ...ele,
        NgayLo: UnixToDate(ele.ngayLoUnix),
        NgayKhieuNai: UnixToDate(ele.ngayKhieuNaiUnix),
      }
    })
  }
  ngOnInit(): void { }

  add() {
    let modalRef = this._modal.open(TabkhieunaimodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.quyTrinh = this.quyTrinh;
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.isSoi = this.isSoi;
    modalRef.result.then(res => {
      this.quyTrinh.listKhieuNai = this.quyTrinh.listKhieuNai?.length > 0 ? this.quyTrinh.listKhieuNai : [];
      this.quyTrinh.listKhieuNai.push({
        ...res,
        NgayLo: UnixToDate(res.NgayLoUnix),
        NgayKhieuNai: UnixToDate(res.NgayKhieuNaiUnix),
        ngayLoUnix: res.NgayLoUnix,
        ngayKhieuNaiUnix: res.NgayKhieuNaiUnix,
        khachHang: res.KhachHang,
        noiDung: res.NoiDung,
        ghiChu: res.GhiChu,
      })
    }).catch(er => { console.log(er) });
  }
  edit(data, idx) {
    let modalRef = this._modal.open(TabkhieunaimodalComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.item = JSON.parse(JSON.stringify({
      ...data,
    }));
    modalRef.componentInstance.quyTrinh = this.quyTrinh;
    modalRef.componentInstance.opt = 'edit';
    modalRef.componentInstance.isSoi = this.isSoi;
    modalRef.result.then(res => {
      this.quyTrinh.listKhieuNai[idx] = {
        ...res,
        NgayLo: UnixToDate(res.NgayLoUnix),
        NgayKhieuNai: UnixToDate(res.NgayKhieuNaiUnix),
        ngayLoUnix: res.NgayLoUnix,
        ngayKhieuNaiUnix: res.NgayKhieuNaiUnix,
        khachHang: res.KhachHang,
        noiDung: res.NoiDung,
        ghiChu: res.GhiChu,
      };
    }).catch(er => { console.log(er) });
  }
  delete(item, idx) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this._hopDong.DeleteKhieuNai(item.id).subscribe((res: any) => {
        if (res.statusCode === 200) {
          this.quyTrinh.listKhieuNai.splice(idx, 1);
          this._toastr.success(res.message);
        } else this._toastr.error(res.message)
      })
    }).catch(er => console.log(er))
  }

}
