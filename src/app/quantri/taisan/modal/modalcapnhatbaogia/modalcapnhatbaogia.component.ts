import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this._servicesSanXuat.GetOptions().GetNhaMay().subscribe((res: Array<any>) => {
      this.listDonVi = mapArrayForDropDown(res, 'TenDuAn', 'Id');
      this.KiemTraButtonModal();
      if (this.opt === 'add') {
        this.title = "Thêm mới";
        this.GetNextSoQuyTrinh();
      }
      else {
        this.title = "Cập nhật";
        this.GetIem();
      }
      if (validVariable(this.item.IdDuAn)) {
        this._servicesSanXuat.GetOptions().GetPhanXuong(this.item.IdDuAn).subscribe((res: any) => {
          this.listdmPhanXuong = mapArrayForDropDown(res, "Ten", 'Id');
        });
      }
      
    });
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

  GetIem() {
    this._serviceTaiSan.BanGiaoTaiSan().Get(this.item.Id || "").subscribe((res: any) => {
      this.item = res.Data;
      // this.item.listTaiSan.forEach(obj => {
      //   obj.TaiSan.GiaConLai = obj.TaiSan.GiaTriConLai;
      // });
      let listTaiSan = [];
      this.item.listTaiSan.forEach(element => {
        if (!validVariable(element.TaiSan.IdTaiSan)) {
          listTaiSan.push({ data: element, children: [] });
          this.item.listTaiSan.filter(e => {
            if (element.TaiSan.Id === e.TaiSan.IdTaiSan) {
              listTaiSan[listTaiSan.length - 1].children.push({ data: e });
            }
          });
        }
        else {
          listTaiSan.push({ data: element, children: [] });
        }
      });
      this.listTaiSan_copy = listTaiSan;
      // this.item.TaiSan.NgaySanXuat = UnixToDate(this.item.TaiSan.NgaySanXuatUnix);
      // this.item.TaiSan.NgayNhap = UnixToDate(this.item.TaiSan.NgayNhapUnix);     
    });
  }

  Validate() {
    if (!validVariable(this.item.IdBoPhanSuDung) ||
      !validVariable(this.item.IdDuAn)) {
      this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  Setdata() {
    this.item.NgayBaoGiaoUnix = DateToUnix(this.item.NgayBanGiao);
  }

  GhiLai() {
    if (this.Validate()) {
      this.Setdata();
      // if (this.opt === 'add') {
      //   this.item.Created = new Date();
      //   this.item.Modified = new Date();
      // }
      this._serviceTaiSan.BanGiaoTaiSan().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          // this.GetIem();
          this.toastr.success(res.Message);
          this.activeModal.close();
          console.log(this.item);
          
        } else {
          this.toastr.error(res.Message);
        }
      })
    }
  }

  ChuyenDuyet() {
    if (this.Validate()) {
      this.Setdata();
      this._serviceTaiSan.BanGiaoTaiSan().ChuyenTiep(this.item).subscribe((res: any) => {
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
      this._serviceTaiSan.BanGiaoTaiSan().KhongDuyet(this.item).subscribe((res: any) => {
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
    let modalRef = this._modal.open(ModalchontaisanComponent, {
      size: "xl",
      backdrop: "static",
      centered: true,
    });
    modalRef.componentInstance.opt = this.opt;
    modalRef.componentInstance.item = {};
    modalRef.result
      .then((res: any) => {
        this.item.listTaiSan = res;
        let listTaiSan = [];
        res.forEach(element => {
          element.GhiChu ='';
          if (!validVariable(element.TaiSan.IdTaiSan)) {
            listTaiSan.push({ data: element, children: [] });
            res.filter(e => {
              if (element.TaiSan.Id === e.TaiSan.IdTaiSan) {
                listTaiSan[listTaiSan.length - 1].children.push({ data: e });
              }
            });
          }
          else {
            listTaiSan.push({ data: element, children: [] });
          }
        });
        console.log(listTaiSan);
        console.log(this.listTaiSan_copy)
        
        // this.listTaiSan_copy = listTaiSan;
      })
      .catch((er) => {

      });
  }

  // CapNhatDanhSachTaiSan(item) {
  //   let modalRef = this._modal.open(ModalchontaisanComponent, {
  //     size: "xl",
  //     backdrop: "static",
  //   });
  //   modalRef.componentInstance.opt = "edit";
  //   modalRef.componentInstance.item = item;
  //   modalRef.result
  //     .then((res: any) => {
  //     })
  //     .catch((er) => {

  //     });
  // }

  XoaTaiSan(item, index) {
    if (validVariable(item.Id)) {
      this.item.listTaiSan.splice(index, 1);
    }
    else {
      this.item.listTaiSan[index].isXoa = true;
    }
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
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

}
