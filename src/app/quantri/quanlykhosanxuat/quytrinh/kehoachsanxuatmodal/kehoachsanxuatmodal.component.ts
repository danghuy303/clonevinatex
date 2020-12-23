import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { Dat09Service } from 'src/app/services/callApi';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ChonhanghoamodalComponent } from '../../modals/chonhanghoamodal/chonhanghoamodal.component';
import { TrienkhaikehoachsanxuatComponent } from '../trienkhaikehoachsanxuat/trienkhaikehoachsanxuat.component';

@Component({
  selector: 'app-kehoachsanxuatmodal',
  templateUrl: './kehoachsanxuatmodal.component.html',
  styleUrls: ['./kehoachsanxuatmodal.component.css']
})
export class KehoachsanxuatmodalComponent implements OnInit {
  opt: any = ''
  item: any = {
    Id: ''
    // SoQuyTrinh: 'PKK_0000_001',
    // listKienHang: []
  };
  lang: any = vn;
  filter: any = {
    KeyWord: ''
  };
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  listPhuongAnSapXep: any = [];
  listDonVi: any = [];
  listPhanXuong: any = []; listMatHang: any = [];
  yearRange: string = `${((new Date()).getFullYear())}:${((new Date()).getFullYear()) + 5}`;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, public toastr: ToastrService, public _modal: NgbModal) {

  }

  ngOnInit(): void {
    this.GetFormOptions()
    this.KiemTraButtonModal();
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe((res: any) => {
      this.checkbutton = res;
    })
  }
  GetFormOptions() {
    this.services.GetOptions().GetMatHang().subscribe((res: Array<any>) => {
      this.listMatHang = res;
    })
    this.services.GetOptions().GetDonVi().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }
  getPhanXuong(IdDuAn) {
    this.listPhanXuong = [];
    this.item.IddmPhanXuong = null;
    this.services.GetOptions().GetPhanXuong(IdDuAn).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
    })
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      // console.log(data);
      // console.log(this.item.TepDinhKems);
      // let itemupload:any = {};
      // itemupload.ID = 0;
      // itemupload.TenGui = data[data.length - 1]?.Name||null;
      // itemupload.TenGoc = data[data.length - 1]?.NameLocal||null;
      // itemupload.DuongDan = data[data.length - 1]?.Url||null;
      // if(itemupload.TenGui!== null){
      //   if(this.item.TepDinhKems.length!==0){
      //     this.item.TepDinhKems.forEach(ele => {
      //       ele.isXoa =true;
      //     });
      //   }
      //   this.item.TepDinhKems.unshift(itemupload);
      //   console.log(this.item);
      // }
    }, (reason) => {

    });
  }
  ChuyenDuyet() {
    this.services.GiaoKeHoachSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }
  GetListdmPhuongAnSapXep() {
    let data = {
      PageSize: 20,
      CurrentPage: 0,
    };
    // this.services.GetListdmPhuongAnSapXep(data).subscribe((res: any) => {
    //   this.listPhuongAnSapXep = res;
    //   if (this.opt === 'edit') {
    //     if (this.item.listTaiSanQuyTrinh.length !== 0) {
    //       this.item.listTaiSanQuyTrinh.forEach(ele => {
    //         ele.tempPhuongAnSapXep = res.filter(pa => pa.ID === ele.IDdmPhuongAnDeXuat)[0];
    //       });
    //     }
    //   }
    // })
  }
  GetNextSoQuyTrinh() {
    this.services.GiaoKeHoachSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyetDinh;
    })
  }
  GetQuyTrinh(Id) {
    this.services.GiaoKeHoachSanXuat().Get(Id).subscribe(res => {
      this.item = res;
      // console.log(res);
    })
  }
  setData() {
    if (validVariable(this.item.Ngay)) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
    }
    this.item.listItem.forEach(ele => {
      ele.KhoiLuongKeHoach = ele.KhoiLuongKeHoach*1000;
    });
  }
  chonHangHoa() {
    let modalRef = this._modal.open(ChonhanghoamodalComponent, {
      size: 'lg'
    })
    modalRef.componentInstance.items = this.listMatHang;
    modalRef.componentInstance.selectedItems = this.item.listItem || [];
    modalRef.componentInstance.IdGiaoKeHoachSanXuat = this.item.Id;
    modalRef.result.then(res => {
      this.item.listItem = res;
    }).catch(er => {
      console.log(er);
    })
  }
  GhiLai() {
    this.setData()
    this.services.GiaoKeHoachSanXuat().Set(this.item).subscribe((res: any) => {
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
      this.services.GiaoKeHoachSanXuat().Delete(this.item).subscribe((res: any) => {
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
    // let item = this.items.splice(i, 1)[0];
    if (item.Id.trim() === '') {
    } else {
      item.isXoa = true;
      this.item.lisItem.push(JSON.parse(JSON.stringify(item)));
    }
  }
}
