import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModalchontaisanComponent } from '../modalchontaisan/modalchontaisan.component';

@Component({
  selector: 'app-modalcapnhatbaogia',
  templateUrl: './modalcapnhatbaogia.component.html',
  styleUrls: ['./modalcapnhatbaogia.component.css']
})
export class ModalcapnhatbaogiaComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  checkbutton: any = {};
  uploader: FileUploader;
  tabTrangThai: number = 0;
  listdmPhanXuong: any = [];
  listDonVi: any = [];
  NameFile: string = "";
  listTaiSan_copy: TreeNode[];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.KiemTraButtonModal();
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
    }
    else {
      this.title = "Cập nhật";
      this.listTaiSan_copy = this.item.listTaiSan?.map((ele, index) => {
        return this.mapDataModelToView(ele,index);
      });
      this.CheckParent(this.listTaiSan_copy);
      
    }
    if (validVariable(this.item.IdDuAn)) {
      this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
        this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
      });
    }
  }

  GetNhaMay() {
    this._servicesSanXuat.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.item.IdBoPhanSuDung = undefined;
      if (validVariable(this.item.IdDuAn)) {
        this._servicesSanXuat.GetOptions().GetPhanXuong(this.item.IdDuAn).subscribe((res: any) => {
          this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
        });
      }
    });
  }

  KiemTraButtonModal() {
    this._servicesSanXuat.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.BanGiaoTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }

  mapDataModelToView(ele, index,indexCha?) {
    return {
      data: {
        ...ele,
        Id: ele.Id,
        IdCha: null,
        IdQuyTrinhBanGiao: this.item.Id,
        STT: indexCha ? `${indexCha}.${index+1}`:index+1,
        SoLuong:ele.SoLuong,
        GhiChu:ele.GhiChu,
      },
      children: this.isEmpty(ele.listTaiSan)?ele.listTaiSan.map((eleCon,indexCon)=>{
        return this.mapDataModelToView(eleCon,indexCon,index+1)
      }):null,
      expanded:true
    }
  }
  

  Validate() {
    if (!validVariable(this.item.NgayBanGiao)) {
      this.toastr.error("Yêu cầu nhập đầy đủ ngày");
      return false;
    }
    return true;
  }

  Setdata() {
    this.item.NgayBanGiaoUnix = DateToUnix(this.item.NgayBanGiao);
    this.item.listTaiSan = [];
    this.item.listTaiSan = this.listTaiSan_copy?.map(ele => {
      return this.mapDataViewToModel(ele);
    });
    return this.item;
  }

  mapDataViewToModel(item: any) {
    return {
      Id:"",
      IdTaiSan: item.data?.Id,
      SoLuong: item.data?.SoLuong,
      GhiChu: item.data?.GhiChu || "",
      MaTaiSan: item.data?.MaTaiSan,
      TenTaiSan: item.data?.TenTaiSan,
      listTaiSan: this.isEmpty(item.children) ? item.children.map(ele => this.mapDataViewToModel(ele)) : null
    }
  }

  isEmpty(arr) {
    return Array.isArray(arr) && arr.length > 0
  }

  GhiLai() {
    if (this.Validate()) {
      this.Setdata();
      if (this.opt === 'add') {
        this.item.Created = new Date();
        this.item.Modified = new Date();
      }
      this._serviceTaiSan.BanGiaoTaiSan().Set(this.Setdata()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.item = res.Data;
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  ChuyenDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.BanGiaoTaiSan().ChuyenTiep(this.Setdata()).subscribe((res: any) => {
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
      this._serviceTaiSan.BanGiaoTaiSan().KhongDuyet(this.Setdata()).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
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
        this._serviceTaiSan.BanGiaoTaiSan().Delete(this.item.Id).subscribe((res: any) => {
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

  ThemMoiDanhSachTaiSan() {
    let listId = this.listTaiSan_copy?.map(ele => {
      return ele.data.Id;
    })
    let modalRef = this._modal.open(ModalchontaisanComponent, {
      size: "xl",
      backdrop: "static"
    });
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.listIdDaChon = listId || [];
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
        this.listTaiSan_copy = res;
        this.listTaiSan_copy = this.listTaiSan_copy.map((ele, index) => {
          return this.GetStt(ele, index);
        })
        this.CheckParent(this.listTaiSan_copy);
      })
      .catch((er) => {
      });
  }

  GetStt(ele, index, indexCha?) {
    return {
      data: {
        ...ele.data,
        STT: indexCha ? `${indexCha}.${index+1}`:index+1,
      },
      children: ele.children.map((eleCon, indexCon)=>{
        return this.GetStt(eleCon, indexCon, index + 1)
      }),
      expanded: true
    }
  }

  XoaTaiSan(index) {
    let modalref = this._modal.open(ModalthongbaoComponent);
    modalref.componentInstance.message = "Bạn có muốn xóa tài sản này?"
    modalref.result.then(()=>{
      this.listTaiSan_copy.splice(index, 1);
      this.listTaiSan_copy = [...this.listTaiSan_copy];
      this.listTaiSan_copy.forEach((ele, index) => {
        ele.data.STT = index + 1;
      })
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

  CheckParent(list) {
    list?.forEach(ele => {
      ele.data.isCha = true;
    })
  }

}
