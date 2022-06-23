import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ChonTaiSanKhauHaoModalComponent } from '../chon-tai-san-khau-hao-modal/chon-tai-san-khau-hao-modal.component';

@Component({
  selector: 'app-khau-hao-tai-san-modal',
  templateUrl: './khau-hao-tai-san-modal.component.html',
  styleUrls: ['./khau-hao-tai-san-modal.component.css']
})
export class KhauHaoTaiSanModalComponent implements OnInit {

  item: any = {};
  opt: any = "";
  title: any = "";
  checkbutton: any = {};
  uploader: FileUploader;
  tabTrangThai: number = 0;
  listdmPhanXuong: any = [];
  listDonVi: any = [];
  NameFile: string = "";
  listTaiSan_copy: any[] = [];
  khauHaoAll: boolean = false;
  minDate?: Date;


  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.GetMinDate();
    this.KiemTraButtonModal();
    this.getListdmPhanXuong();
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
    } else {
      this.title = "Cập nhật";
      this.item.Ngay = UnixToDate(this.item.NgayUnix)
      let listTaiSan: TreeNode[] = [];
      listTaiSan = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele, index);
      });
      this.listTaiSan_copy = listTaiSan;
      this.Loaddata();
      console.log("item", this.item);
      
    }
  }

  GetMinDate() {
    let d = new Date();
    console.log("year", d.getFullYear());
    this.minDate = new Date(`01-01-${d.getFullYear()}`);
  }

  Loaddata() {
    this.item.listTaiSan?.forEach((ele, index) => {
      ele.STT = index + 1;
    })
  }

  getListdmPhanXuong() {
    this._servicesSanXuat.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listdmPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  Validate() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng");
      return false;
    } else if (!validVariable(this.item.Ngay)) {
      this.toastr.error("Yêu cầu nhập ngày");
      return false;
    }
    return true;
  }


  Setdata() {
    this.item.NgayUnix = DateToUnix(this.item.Ngay);
    return this.item;
  }


  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.KhauHaoTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  isEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0
  }

  GhiLai() {
    if (this.Validate()) {
      console.log("this item", this.Setdata());
      this._serviceTaiSan.KhauHaoTaiSan().Set(this.Setdata()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.item = res.Data;
          this.item.listTaiSan.forEach((ele, index) => {
            ele.STT = index + 1;
          })
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.KhauHaoTaiSan().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => { });
  }

  ChuyenDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.KhauHaoTaiSan().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  KhongDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.KhauHaoTaiSan().KhongDuyet(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      })
    }
  }

  mapDataViewToModel(item: any) {
    return {
      Id: '',
      IdBanGiao: this.item.Id || '',
      IdTaiSan: item.data?.IdTaiSan,
      SoLuong: item.data?.SoLuong,
      GhiChu: item.data?.GhiChu || '',
      MaTaiSan: item.data?.TaiSan?.Ma,
      TenTaiSan: item.data?.TaiSan?.Ten,
      listTaiSan: this.isEmpty(item.children) ? item.children.map(ele => this.mapDataViewToModel(ele)) : null
    }
  }

  mapDataModelToView(ele, index, indexCha?) {
    return {
      data: {
        Id: ele.Id,
        IdCha: null,
        IdQuyTrinhBanGiao: this.item.Id,
        IdTaiSan: ele.IdTaiSan,
        STT: indexCha ? `${indexCha}.${index + 1}` : index + 1,
        SoLuong: ele.SoLuong,
        GhiChu: ele.GhiChu,
        TaiSan: ele
      },
      children: this.isEmpty(ele.listTaiSan) ? ele.listTaiSan.map((eleCon, indexCon) => {
        return this.mapDataModelToView(eleCon, indexCon, index + 1)
      }) : null,
      expanded: true
    }
  }

  ThemMoiDanhSachTaiSan() {
    let listId = [];
    this.listTaiSan_copy && this.listTaiSan_copy.forEach(ele => {
      listId.push(ele.IdTaiSan)
    })
    if (this.Validate()) {
      let modalRef = this._modal.open(ChonTaiSanKhauHaoModalComponent, {
        size: "xl",
        backdrop: "static"
      });
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.idBoPhanSuDung = this.item?.IdBoPhanSuDung;
      modalRef.componentInstance.ngay = DateToUnix(this.item.Ngay);
      modalRef.componentInstance.listIdDaChon = listId;
      modalRef.componentInstance.item = {};
      modalRef.result
        .then((res: any) => {
          res.forEach((element,index) => {
            element.STT = index + 1;
          })
          this.listTaiSan_copy = this.MergeArr(res, this.listTaiSan_copy, "IdTaiSan");
          this.item.listTaiSan = this.listTaiSan_copy;
        })
        .catch((er) => {
        });
    }
  }

  MergeArr(newArr: Array<any>, existingArr: Array<any>, diffProp: string): Array<any>{
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle[diffProp] === oldEle[diffProp]
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(
        (newEle) => newEle[diffProp] === oldEle[diffProp]
      );
      if (indexCheck === -1) {
        removeIndex.push(index);
      }
    });
    for (var i = removeIndex.length - 1; i >= 0; i--) {
      existingArr.splice(removeIndex[i], 1);
    }
    return existingArr;
  }

  XoaTaiSan(index) {
    this.confirmationService.show({
      message: 'Bạn chắc chắc muốn xóa tài sản này?'
    }, () => {
      this.item.listTaiSan.splice(index - 1, 1);
      this.Loaddata()
    })
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result.then((data) => {
      this.item.listFileDinhKem = data;
      this.item.listFileDinhKem.forEach(obj => {
        obj.Id = '';
        obj.fileNameGui = obj.Name;
        obj.fileName = obj.NameLocal;
        obj.Link = obj.Url;
        this.NameFile += `${obj.fileName}` + '; ';
      });
    }, (reason) => {

    });
  }

  ChonLoaiTaiSan() {
    this.item.listTaiSan.splice(0, this.item.listTaiSan.length);
  }

}
