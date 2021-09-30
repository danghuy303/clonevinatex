import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-xuatbongchovaymodal',
  templateUrl: './xuatbongchovaymodal.component.html',
  styleUrls: ['./xuatbongchovaymodal.component.css']
})
export class XuatbongchovaymodalComponent implements OnInit {
  @ViewChild('paginator') paginator;
  opt: any = '';
  Id: any = '';
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  listItemRoot: any = [];
  paging: any = {};
  filter: any = {};
  listLoBong: any = [];
  listHopDong: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    } else {
        this.GetQuyTrinh();
    }
    let data: any = {
      CurrentPage: 0
    }
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetQuyTrinh(page?) {
    this.services.PhieuXuatBongChoVay().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      this.listItem = res1.listItem;
      this.listItemRoot = deepCopy(res1.listItem);

      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
      }
      if(validVariable(page)){
        this.changePage(page);
      }
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined) {
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    }
    if (validVariable(this.item.Ngay)) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem = deepCopy(this.listItemRoot);
      this.services.PhieuXuatBongChoVay().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  KhongDuyet() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined) {
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    }
    if (validVariable(this.item.Ngay)) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem = deepCopy(this.listItemRoot);
      this.services.PhieuXuatBongChoVay().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatBongChoVay().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem = deepCopy(this.listItemRoot);
      this.services.PhieuXuatBongChoVay().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
              this.item.Ngay = UnixToDate(this.item.NgayUnix);
            }
            if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
              this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
            }
            this.KiemTraButtonModal();
            this.GetQuyTrinhRefresh();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
    else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhieuXuatBongChoVay().Delete(this.item).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  GetLuuKho(sFilter) {
    this.services.getLuuKho(this.item.IddmKho, '', 0, sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.result.then((data) => {
        this.item.listItem = data.data;
      }, (reason) => {
        // không
      });
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start, end);
    // if(this.filter.KeyWord !== '' || this.filter.KeyWord !== undefined)
    //   this.GetQuyTrinhFilter();
  }

  GetQuyTrinhFilter() {
    let items = [];
    items = this.listItemRoot.filter(ele=>ele.Ten.toLowerCase().indexOf(this.filter.KeyWord)!== -1
                                      || ele.MaKienDoi.toLowerCase().indexOf(this.filter.KeyWord)!== -1);
    
    this.listItem = deepCopy(items);
    this.paginator.changePage(0)
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = items.length;
    this.item.listItem = items.slice(0, 15);
    // this.item.listItem = items;
    console.log(this.item.listItem)
  }
  GetQuyTrinhRefresh() {
    this.filter.KeyWord = '';
    this.listItem = deepCopy(this.listItemRoot);
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listItem.length;
    this.item.listItem = this.listItem.slice(0, 15);
  }
  getListLoBongHopDong(){
    let data: any = {}
    this.services.GetListLoBong(data).subscribe((res: any) => {
      this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
  });
  }
}
