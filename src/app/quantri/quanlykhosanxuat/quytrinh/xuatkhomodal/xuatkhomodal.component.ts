import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToDatePicker, DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-xuatkhomodal',
  templateUrl: './xuatkhomodal.component.html',
  styleUrls: ['./xuatkhomodal.component.css']
})
export class XuatkhomodalComponent implements OnInit {
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
  listPhuongAnPhaBong: any = [];
  listItem: any = [];
  listItemRoot: any = [];
  paging: any = {};
  filter: any = {}
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    this.GetQuyTrinh();

    //
    let data: any = {
      CurrentPage: 0
    }
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res: any) => {
      this.listPhuongAnPhaBong = mapArrayForDropDown(res.items, 'Ten', 'Id');
    })
    // data.Loai = 2;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetQuyTrinh() {
    this.services.PhieuXuatSanXuat().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      // res1.listItem.sort((a,b)=>{
      //   return a.TenLoBong.localeCompare(b.TenLoBong);
      // })
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
      this.item.listItem = this.listItem;
      this.services.PhieuXuatSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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


    console.log(this.item)

  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.item.listItem = this.listItem
      this.services.PhieuXuatSanXuat().Set(this.item).subscribe((res: any) => {
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
      this.services.PhieuXuatSanXuat().Delete(this.item).subscribe((res: any) => {
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
    var items = [];
    items = this.listItemRoot.filter(obj => {
      let Ten = obj.Ten.toLowerCase();
      let indexOf = Ten.indexOf(this.filter.KeyWord)
      return indexOf != -1
    });

    // for(let i =0; i < this.listItemRoot.length; i++){
    //   if(this.listItemRoot[i].TenLoBong !== null){
    //     if(this.listItemRoot[i].TenLoBong.toLowerCase().includes(this.filter.KeyWord)){
    //        items.push(this.listItemRoot[i]);
    //       continue;
    //     }
    //   }
    //   if(this.listItemRoot[i].Ten !== null){
    //     if(this.listItemRoot[i].Ten.toLowerCase().includes(this.filter.KeyWord)){
    //       items.push(this.listItemRoot[i]);
    //       continue;
    //     }
    //   }
    //   if(this.listItemRoot[i].TendmViTri !== null){
    //     if(this.listItemRoot[i].TendmViTri.toLowerCase().includes(this.filter.KeyWord))
    //     {
    //       items.push(this.listItemRoot[i]);
    //       continue;
    //     }
    //   }
    // }
    this.listItem = deepCopy(items);

    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = items.length;
    this.item.listItem = items.slice(0, 15);
    this.item.listItem = items;
  }
  GetQuyTrinhRefresh() {
    this.filter.KeyWord = '';
    this.listItem = deepCopy(this.listItemRoot);
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listItem.length;
    this.item.listItem = this.listItem.slice(0, 15);
  }
  exportExcel() {
    this.services.PhieuXuatSanXuat().ExportExcel(this.item.Id).subscribe((res: any) => {
      this.services.download(res.TenFile);
    })
  }
}
