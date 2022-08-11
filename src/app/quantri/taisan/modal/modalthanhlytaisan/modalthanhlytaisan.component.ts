import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, getSTT, mapArrayForDropDown, merge, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanCopyComponent } from '../modalchontaisan-copy/modalchontaisan-copy.component';
import { ModalchontaisanThanhlyCopyComponent } from '../modalchontaisan-thanhly-copy/modalchontaisan-thanhly-copy.component';
import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';
@Component({
  selector: 'app-modalthanhlytaisan',
  templateUrl: './modalthanhlytaisan.component.html',
  styleUrls: ['./modalthanhlytaisan.component.css']
})
export class ModalthanhlytaisanComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = { listTaiSan: [] };
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  listTaiSan_copy: any = [];
  NameFile: string;
  title: any = '';
  // TongGiaTriThanhLy: any = 0;

  constructor(
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.item.listTaiSan.forEach(ele => {
      ele.isCha = !!!ele.IdRoot;
    })
    if (this.item.NgayThanhLyUnix !== 0) {
      this.item.NgayThanhLy = UnixToDate(this.item.NgayThanhLyUnix);
    }
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
    }
    if (this.opt === 'edit') {
      if (validVariable(this.item.Id)) {
        this.GetQuyTrinh(this.item.Id);
      }
      this.item.listTaiSan = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele, index);
      });
      this.CheckParent( this.item.listTaiSan);
    }
    this.KiemTraButtonModal();
    this.GetListdmPhanXuong();
    this.getList();
  }
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListTaiSanChuaBanGiao() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      this.listdsTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
      this.listTaiSanRef = res.Data;
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
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa tài sản này chứ?";
    modalRef.result
      .then((res) => {
        this.item.listTaiSan.splice(item.STT - 1, 1);
        this.item.listTaiSan = [...this.item.listTaiSan];
        getSTT(this.item.listTaiSan)
      })
      .catch((er) => console.log(er));
  }
  edit(item) {
    item.edit = true;
  }
  save(item) {
    item.edit = false;
  }
 
  setData() {
    this.item.NgayThanhLyUnix = DateToUnix(this.item.NgayThanhLy);
    this.item.IdDuAn = this.store.getCurrent();
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
      GiaTriConLai:item.data?.GiaTriConLai,
      GiaTriThanhLy:item.data?.GiaTriThanhLy,
      listTaiSan: this.isEmpty(item.children) ? item.children.map(ele => this.mapDataViewToModel(ele)) : null
    }
  }

  isEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0
  }
  
  ValidateData() {
    if (!validVariable(this.item.NgayThanhLy)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày!");
      return false;
    }
    if (!validVariable(this.item.listTaiSan) || this.item.listTaiSan.length === 0) {
      this.toastr.error("Yêu cầu nhập thêm tài sản!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.ThanhLyTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error(res.Message);
        } else {
          this.item = res.Data; // khi Ghi hiện duyệt >> KiemTraButtonModal()
          this.item.Id = res.Data.Id;
          this.GetQuyTrinh(this.item.Id);
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
          // this.activeModal.close();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }

  GetQuyTrinh(id) {
    this._serviceTaiSan.ThanhLyTaiSan().Get(id).subscribe((res:any) => {
      this.item = res.Data;
      this.item.NgayThanhLyUnix = UnixToDate(this.item.NgayThanhLyUnix);
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
      },
      children: this.isEmpty(ele.listTaiSan) ? ele.listTaiSan.map((eleCon, indexCon) => {
        return this.mapDataModelToView(eleCon, indexCon, index + 1)
      }) : null,
      expanded: true
    }
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.ThanhLyTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  ThemMoiDanhSachTaiSan() {
    let modalRef = this._modal.open(ModalchontaisanThanhlyCopyComponent, {
      size: "xl",
      backdrop: "static",
    });

    modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.data.IdTaiSan) : [];
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      console.log(res);
      this.item.listTaiSan = this.MergeArr(res, this.item.listTaiSan);
      this.item.listTaiSan = [...this.item.listTaiSan];
      getSTT(this.item.listTaiSan);
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
    this._serviceTaiSan.ThanhLyTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
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
        this._serviceTaiSan.ThanhLyTaiSan().Delete(this.item.Id).subscribe((res: any) => {
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

  Tong() {
    this.item.TongGiaTriThanhLy = 0;
    this.item.listTaiSan.forEach(item => {
      this.item.TongGiaTriThanhLy += (item.data.GiaTriThanhLy || 0) * (item.data.SoLuong || 0);
    })
  }
  getList() {
    this.Tong();
  }
}