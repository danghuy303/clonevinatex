import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';

@Component({
  selector: 'app-kiemkekhomodal',
  templateUrl: './kiemkekhomodal.component.html',
  styleUrls: ['./kiemkekhomodal.component.css']
})
export class KiemkekhomodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listdmKho:any= [];
  listdmViTri:any= [];
  paging: any = {};
  listItem: any = [];
  item_new: any = {};
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else{
      this.KiemTraButtonModal();
      this.GetQuyTrinh();
    }
    this.item_new = this.item;

    var data : any ={};
    data.CurrentPage =0;
    data.Loai = 1;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, "Ten", 'Id');
    })
    this.services.GetListdmViTriOpt().subscribe((res: any) => {
      this.listdmViTri = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  GetQuyTrinh()
  {
    this.services.PhieuKiemKeKho().Get(this.item.Id).subscribe((res1:any)=>{
      this.item = res1;
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0,15);
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  
  ChuyenDuyet() {
    this.item_new.listItem = this.listItem;

    this.services.PhieuKiemKeKho().ChuyenTiep(this.item_new).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  
  GetNextSoQuyTrinh() {
    this.services.PhieuKiemKeKho().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
 
  GhiLai() {
    this.item_new.listItem = this.listItem;

      this.services.PhieuKiemKeKho().Set(this.item_new).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;

            this.listItem = res.objectReturn.listItem;
            this.paging.CurrentPage = 1;
            this.paging.TotalPage = 5;
            if(res.objectReturn.listItem != undefined && res.objectReturn.listItem != null)
              this.paging.TotalItem = res.objectReturn.listItem.length;
            this.item.listItem = res.objectReturn.listItem.slice(0,15);

            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhieuKiemKeKho().Delete(this.item).subscribe((res: any) => {
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
    var IddmKho = this.item.IddmKho
    if(this.item.IddmViTri !== null )
      IddmKho = '';
    this.services.getLuuKho(IddmKho,this.item.IddmViTri, 0, '').subscribe((res1: any) => {
      this.item.listItem = res1;
      this.listItem = res1;
    })
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    var start = (event.page + 1)*15;
    this.item.listItem = this.listItem.slice(start, start + 15);
  }
}
