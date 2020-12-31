import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ImportdanhmucmodelComponent } from 'src/app/quantri/danhmuc/danhmucsanxuat/modals/importdanhmucmodel/importdanhmucmodel.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-thongsochatluongmodal',
  templateUrl: './thongsochatluongmodal.component.html',
  styleUrls: ['./thongsochatluongmodal.component.css']
})
export class ThongsochatluongmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    SoQuyTrinh: 'PKK_0000_001',
    listCongTenNo: []
  };
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: true,
    ChuyenTiep: true,
    Xoa: true,
  }
  newTableItem: any = {};
  listLoBong: any = [];
  data: any = {};
  lang: any = vn;
  editTableItem:any={};

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private services: SanXuatService) {
  }


  ngOnInit(): void {
    // this.GetListdmPhuongAnSapXep();
    if (this.opt !== 'edit') {
      this.item = {
        IdLoBong: 0,
        IddmLoaiBong: 0,
        IddmCapBong: 0,
        IdContainer: 0,
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    else{

    }
    this.data.CurrentPage = 0;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = new Date(this.item.NgayUnix * 1000);
      }
    this.getListLoBong();
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }
 
  ChuyenDuyet() {
    this.services.PhieuNhapLoBong_ChatLuong().ChuyenTiep(this.item).subscribe((res: any) => {
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
    this.services.PhieuNhapLoBong_ChatLuong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  
  chonThuaDat() {

  }
  GhiLai() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined)
      this.item.NgayUnix = (new Date(this.item.Ngay)).getTime() / 1000;
    this.services.PhieuNhapLoBong_ChatLuong().Set(this.item).subscribe((res: any) => {
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
      this.services.PhieuNhapLoBong_ChatLuong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  merge(newArr, existingArr) {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(

        (newEle) => newEle.IDTaiSan === oldEle.IDTaiSan
      );
      if (indexCheck === -1) {
        removeIndex.push(index);
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      if (existingArr[i].ID === 0) {
        existingArr.splice(removeIndex[i], 1);
      } else {
        existingArr[i].isXoa = true;
      }
    }
    return existingArr;
  }
  changePhuongAnDeXuat(event, item) {
    item.TenPhuongAnDeXuat = event.Ten;
    item.IDdmPhuongAnDeXuat = event.ID;
  }
  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
  getListLoBong() {
    this.services.GetListLoBong(this.data).subscribe((res: any) => {
      this.listLoBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  editChiTiet(item, index) {
    this.item.listItem.forEach(element => {
      element.editField = false;
    });
    this.item.listItem[index].editField = true;
    this.editTableItem = deepCopy(item);
  }
  saveEdit(item, index){
    this.item.listItem[index] = item;
    this.item.listItem[index].editField = false;
  }
  cancelEdit(item, index){
    this.item.listItem[index].editField = false;
  }
  importExcel(){
    let modalRef = this._modal.open(ImportdanhmucmodelComponent,{
      backdrop:'static',
    })
    modalRef.componentInstance.Name = 'PhieuNhapLoBong_ChatLuong';
    modalRef.componentInstance.data = this.item;
    modalRef.result.then(res=>{
      this.toastr.success(res.message);
      this.services.PhieuNhapLoBong_ChatLuong().Get(this.item.Id).subscribe((res: any) => {
        this.item = res;
      })
    })
    .catch(er=>console.log(er))
  }
  onClose(){
    this.activeModal.close();
  }
}
