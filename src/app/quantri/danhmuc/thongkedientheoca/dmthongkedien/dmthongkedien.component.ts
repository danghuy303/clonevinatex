import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalquanComponent } from 'src/app/quantri/danhmuc/modal/modalquan/modalquan.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, formatdate } from 'src/app/services/globalfunction';
import { DmthongkedienmodalComponent } from '../dmthongkedienmodal/dmthongkedienmodal.component';

@Component({
  selector: 'app-dmthongkedien',
  templateUrl: './dmthongkedien.component.html',
  styleUrls: ['./dmthongkedien.component.css']
})
export class DmthongkedienComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  items: any = [{ id: 5, SoQuyTrinh: 'PNK_0000_0000' }];
  filter: any = {};
  listLoaiPhuongAn: any = [];
  listKho: any = [];
  trangThai: any = 1;
  paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 100 };
  cols: any = [
    {
      header: 'Ngày',
      field: 'SoQuyTrinh',
      width: 'unset'
    },
    {
      header: 'Phân xưởng',
      field: '_ThoiGianTao',
      width: 'unset'
    },
    {
      header: 'Tổng cộng',
      field: 'ThoiGianDuyet',
      width: 'unset'
    },
    {
      header: 'Ca 1',
      field: 'TenKho',
      width: 'unset'
    },
    {
      header: 'Khối lượng nhập (Tấn)',
      field: 'TongKhoiLuongNhap',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };

  constructor(public _modal: NgbModal, public _toastr: ToastrService, private _service: SanXuatService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.activatedRoute);
    this.KiemTraTabTrangThai();
    // this.GetList()
  }
  changeParam(id) {
    if (this._modal.hasOpenModals()) {
      this._modal.dismissAll()
    }
    this.router.navigate([`quantri/thongkedientheoca/dmthongkedien/${id}`], { replaceUrl: true })
  }
  addPhieuBong() {
    this.changeParam(0);
    let modalRef = this._modal.open(DmthongkedienmodalComponent, {
      size: 'fullscreen',
      backdrop: 'static'
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {}
    modalRef.result.then((res: any) => {
      this._toastr.success('Cập nhật thành công');
      this.GetList();
    })
      .catch(er => { console.log(er) })
  }
  update(Id) {
    this._service.NhapKeHoachNguyenLieu().Get(Id).subscribe((res1: any) => {
      let modalRef = this._modal.open(DmthongkedienmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.item = JSON.parse(JSON.stringify(res1));
      modalRef.result.then((res: any) => {
        this._toastr.success('Cập nhật thành công');
        this.GetList();
      })
        .catch(er => { console.log(er) })
    })
  }
  changeTab(e) {
    this.trangThai = e.index + 1;
    this.GetList(true);
  }
  changePage(event) {
    // this.paging.CurrentPage = event.page + 1;
    // this.GetList();
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 25,
      CurrentPage: this.paging.CurrentPage,
      TabTrangThai: this.trangThai,
      sFilter: this.filter.KeyWord,
      TuNgay: (new Date(this.filter.TuNgay).getTime() / 1000) || 0,
      DenNgay: (new Date(this.filter.DenNgay).getTime() / 1000) || 0,
      Ma: "",
      Ten: "",
    }
    this._service.NhapKeHoachNguyenLieu().GetList(data).subscribe((res: any) => {
      this.items = res.items;
      if (this.items.length > 0) {
        this.items.forEach(element => {
          element._ThoiGianTao = element.ThoiGianTaoUnix > 0 ? formatdate(element.ThoiGianTao, false) : null;
          this.listKho.filter(obj => {
            if (element.idKhoNhap == obj.value) {
              element.TenKho = obj.label;
            }
          });
        });
      }
      this.paging = res.paging;
    })
  }
  resetFilter() {
    this.filter = {};
    this.GetList(true);
  }
  KiemTraTabTrangThai() {
    // this._service.KiemTraTabTrangThai(this.eAction).subscribe((res:any)=>{
    //   this.checkQuyen = res;
    //   this.GetList();
    // })
  }

}
