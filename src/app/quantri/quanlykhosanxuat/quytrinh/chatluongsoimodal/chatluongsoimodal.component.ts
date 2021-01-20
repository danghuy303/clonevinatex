import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-chatluongsoimodal',
  templateUrl: './chatluongsoimodal.component.html',
  styleUrls: ['./chatluongsoimodal.component.css']
})
export class ChatluongsoimodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi:true,
    KhongDuyet:false,
    ChuyenTiep:false,
    Xoa:false,
  }
  listdmKho: any = [];
  editTableItem: any = {};
  newTableItem:any={};
  filter:any = {};
  listdmPhanXuong:any= [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
      this.getDanhSachChiTieuChatLuong();
    }
    else
      this.KiemTraButtonModal();
    if (this.item.NgayKiemTraUnix !== null && this.item.NgayKiemTraUnix !== undefined) {
      this.item.NgayKiemTra = new Date(this.item.NgayKiemTraUnix * 1000);
    }
    
    this.getListdmPhanXuong();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '',this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
 
  ChuyenDuyet() {
    if (this.item.NgayKiemTra !== null && this.item.NgayKiemTra !== undefined)
        this.item.NgayKiemTraUnix = (new Date(this.item.NgayKiemTra)).getTime() / 1000;
    this.services.PhieuChatLuongSoi().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
          this.item = res.objectReturn;
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
 
  GetNextSoQuyTrinh() {
    this.services.PhieuChatLuongSoi().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayKiemTra === null && this.item.NgayKiemTra === undefined)
      this.toastr.error("Bạn chưa chọn  ngày");
    else{
      this.item.NgayKiemTraUnix = (new Date(this.item.NgayKiemTra)).getTime() / 1000;
      this.services.PhieuChatLuongSoi().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhieuChatLuongSoi().Delete(this.item).subscribe((res: any) => {
        console.log(res);
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

  GetMatHangTheoKho() {
    let data = {
      CurrentPage: 0,
      Loai: 1,
    };
    this.services.GetListdmItem(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.lstSanPham;
      modalRef.result.then((data) => {
        this.item.lstSanPham = data.data;
        this.item.lstDanhMuc.forEach(element => {
          let sanphampush = [];
          this.item.lstSanPham.forEach(danhmuc => {
            let datapush = {
              IddmChiTieu: danhmuc.Id,
              IddmItem: element.Id,
              ChiTieuThucTe: element.ChiTieuThucTe,
            }
            sanphampush.push(datapush);
          });
          element.lstChatLuongSanPham = sanphampush;
          element.IddmItem = element.Id;
          element.Id = "";
        });
      }, (reason) => {
        // không
      });
    })
  }
  getListKho() {
    var data: any = {}
    data.Loai = 10;
    data.CurrentPage = 0;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmPhanXuong() {
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getDanhSachChiTieuChatLuong() {
    this.services.GetDanhSachChiTieuChatLuong().subscribe((res: any) => {
      this.item.lstDanhMuc = res;
    })
  }
}
