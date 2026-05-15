import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable, getSTT } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanCopyComponent } from '../modalchontaisan-copy/modalchontaisan-copy.component';
import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';
@Component({
  selector: 'app-modalthuhoitaisan',
  templateUrl: './modalthuhoitaisan.component.html',
  styleUrls: ['./modalthuhoitaisan.component.css']
})
export class ModalthuhoitaisanComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = { listTaiSan: [], };
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  listTaiSan_copy: any = [];
  NameFile: string;
  title: any = '';
  Continue: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.item.NgayThuHoiUnix !== 0) {
      this.item.NgayThuHoi = UnixToDate(this.item.NgayThuHoiUnix);
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }
    else {
      if (validVariable(this.item.Id)) {
        this.GetQuyTrinh(this.item.Id);
      }
      this.item.listTaiSan = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele, index);
      });
      this.CheckParent(this.item.listTaiSan);
    }
    this.GetListdmPhanXuong();
    this.KiemTraButtonModal();
  }

  GetListdmPhanXuong() {
    this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  add() {
    if (this.item.listTaiSan == undefined || this.item.listTaiSan == null)
      this.item.listTaiSan = [];
    this.item.listTaiSan.push(this.newitem);
    this.newitem = {}
  }

  delete(item) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa máy/thiết bị này chứ?";
    modalRef.result
      .then((res) => {
        this.item.listTaiSan.splice(item.STT - 1, 1);
        this.item.listTaiSan = [...this.item.listTaiSan];
        getSTT(this.item.listTaiSan)
      })
      .catch((er) => console.log(er));
  }

  setData() {
    this.item.NgayThuHoiUnix = DateToUnix(this.item.NgayThuHoi);
    this.item.IdDuAn = this.store.getCurrent();
    this.item.listTaiSan = this.item.listTaiSan?.map(ele => {
      return this.mapDataViewToModel(ele);
    });
    return this.item;
  }

  setDataCV() {
    this.item.NgayThuHoiUnix = DateToUnix(this.item.NgayThuHoi);
    this.item.IdDuAn = this.store.getCurrent();
    this.item.Continue = true;
    this.item.listTaiSan = this.item.listTaiSan?.map(ele => {
      return this.mapDataViewToModel(ele);
    });
    return this.item;
  }

  mapDataViewToModel(item: any) {
    return {
      Id: item.data?.Id || "",
      IdTaiSan: item.data?.IdTaiSan,
      SoLuong: item.data?.SoLuong,
      GhiChu: item.data?.GhiChu || "",
      MaTaiSan: item.data?.MaTaiSan,
      TenTaiSan: item.data?.TenTaiSan,
      GiaTriConLai: item.data?.GiaTriConLai,
      NguyenGia: item.data?.NguyenGia,
      listTaiSan: this.isEmpty(item.children) ? item.children.map(ele => this.mapDataViewToModel(ele)) : null
    }
  }

  isEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0
  }

  ValidateData() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Yêu cầu nhập bộ phận sử dụng!");
      return false;
    } else if (!validVariable(this.item.NgayThuHoi)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
      return false;
    } else if (!validVariable(this.item.listTaiSan)) {
      this.toastr.error("Yêu cầu nhập máy/thiết bị!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.PhieuThuHoiTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 500 || !res.StatusCode) {
          this.toastr.error(res.Message);
        }
        else if (res.StatusCode === 201) {
          this.item = res.Data;
          this.item.NgayThuHoiUnix = UnixToDate(this.item.NgayThuHoiUnix);
          this.item.listTaiSan = this.item.listTaiSan?.map((ele, index) => {
            return this.mapDataModelToView(ele, index);
          });
          this.KiemTraButtonModal();
          this.CheckParent(this.item.listTaiSan);
          let modalRef = this._modal.open(ModalthongbaoComponent, {
            backdrop: "static",
          });
          modalRef.componentInstance.message = res.Message;
          modalRef.result
            .then((res) => {
              this._serviceTaiSan.PhieuThuHoiTaiSan().Set(this.setDataCV()).subscribe((res: any) => {
                if (res.StatusCode === 500 || !res.StatusCode) {
                  this.toastr.error(res.Message);
                }
                else {
                  this.item = res.Data;
                  this.item.Id = res.Data.Id;
                  this.GetQuyTrinh(this.item.Id);
                  this.toastr.success(res.Message);
                  this.KiemTraButtonModal();
                }
              })
            })
            .catch((er) => console.log(er));
        }
        else {
          this.item = res.Data;
          this.item.Id = res.Data.Id;
          this.GetQuyTrinh(this.item.Id);
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }

  GetQuyTrinh(id) {
    this._serviceTaiSan.PhieuThuHoiTaiSan().Get(id).subscribe((res: any) => {
      this.item = res.Data;
      this.item.NgayThuHoiUnix = UnixToDate(this.item.NgayThuHoiUnix);
      this.item.listTaiSan = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele, index);
      });
      this.KiemTraButtonModal();
      this.CheckParent(this.item.listTaiSan);
    })
  }

  CheckParent(list) {
    list.forEach(ele => {
      ele.data.isCha = true;
    })
  }

  mapDataModelToView(ele, index, indexCha?) {
    return {
      data: {
        ...ele,
        Id: ele.Id,
        IdCha: null,
        IdQuyTrinhBanGiao: this.item.Id,
        STT: indexCha ? `${indexCha}.${index + 1}` : index + 1,
        SoLuong: ele.SoLuong,
        GhiChu: ele.GhiChu,
        GiaTriConLai: ele.GiaTriConLai,
        NguyenGia: ele.NguyenGia,
      },
      children: this.isEmpty(ele.listTaiSan) ? ele.listTaiSan.map((eleCon, indexCon) => {
        return this.mapDataModelToView(eleCon, indexCon, index + 1)
      }) : null,
      expanded: true
    }
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  ThemMoiDanhSachTaiSan() {
    if (!validVariable(this.item.IdBoPhanSuDung)) {
      this.toastr.error("Nhập bộ phận sử dụng!");
      return;
    }
    if (!validVariable(this.item.NgayThuHoi)) {
      this.toastr.error("Nhập ngày thu hồi !");
      return;
    }
    let modalRef = this._modal.open(ModalchontaisanCopyComponent, {
      size: "xl",
      backdrop: "static",
    });
    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.data?.IdTaiSan) : []
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.listTaiSan = this.MergeArr(res, this.item.listTaiSan)
      this.item.listTaiSan = [...this.item.listTaiSan];
      this.item.listTaiSan.forEach((ele, index) => {
        ele.data.isCha = true;
        ele.data.STT = index + 1;
        ele.children?.forEach((child, index) => {
          child.data.STT = `${ele.data.STT}.${index + 1}`
        })
      })
    })
      .catch((er) => {
      });
  }

  MergeArr(newArr: Array<any>, existingArr: Array<any>) {
    let removeIndex = [];
    newArr.forEach((newEle) => {
      let index = existingArr.findIndex(
        (oldEle) => newEle.data.IdTaiSan === oldEle.data.IdTaiSan
      );
      if (index === -1) {
        existingArr.push(newEle);
      }
    });
    existingArr.forEach((oldEle, index) => {
      let indexCheck = newArr.findIndex(
        (newEle) => newEle.data.IdTaiSan === oldEle.data.IdTaiSan
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

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ChuyenDuyet() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  KhongDuyet() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().KhongDuyet(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.PhieuThuHoiTaiSan().Delete(this.item.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }
  GetPhanXuong() {
    this._serviceTaiSan.GetListTaiSanThuHoi().GetListTaiSan(this.item.IddmPhanXuong).subscribe((res: any) => {
      this.listTaiSan = res.Data;
    });
  }

  ChonLoaiTaiSan() {
    this.item.listTaiSan = [];
  }

}

