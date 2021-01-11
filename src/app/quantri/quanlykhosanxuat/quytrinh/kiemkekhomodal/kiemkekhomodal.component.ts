import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-kiemkekhomodal',
  templateUrl: './kiemkekhomodal.component.html',
  styleUrls: ['./kiemkekhomodal.component.css']
})
export class KiemkekhomodalComponent implements OnInit {
  opt: any = ''
  item: any = {};
  checkbutton: any = {}
  listLoHang:any= [];
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {
  }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
  
  ChuyenDuyet() {
    this.services.PhieuKiemKeKho().ChuyenTiep(this.item).subscribe((res: any) => {
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
      this.item.SoQuyTrinh = res;
    })
  }
 
  GhiLai() {
      this.services.PhieuKiemKeKho().Set(this.item).subscribe((res: any) => {
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
  
  delete(item, index) {

  }
  GetListdmLoaiBong(){
    // this.services.GetListdmLoaiBong(data).subscribe((res: any) => {
    //   res.unshift({ Id: '', Ten: 'Tổng hợp' });
    //   this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    // })
  }
  
}
