import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';


@Component({
  selector: 'app-modaldenghixulisuco',
  templateUrl: './modaldenghixulisuco.component.html',
  styleUrls: ['./modaldenghixulisuco.component.css']
})
export class ModaldenghixulisucoComponent implements OnInit {

  newitem: any = {};
  showDropDown: boolean = false;
  item: any = { listTaiSan: [] };
  type = '';
  opt = '';
  listPhanXuong = [];
  checkbutton: any = { Ghi: true, Xoa: true, KhongDuyet: true, ChuyenTiep: true };
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  public listdsTaiSan: any = [];
  public listTaiSanRef: any = [];
  listTaiSan: any = [];
  NameFile: string;
  title:any='';
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
      this.item.listTaiSan.forEach(obj => {
        if (!validVariable(obj.TaiSan)) {
          obj.TaiSan = {};
        }
      });
    }
  
    this.GetListdmPhanXuong();
    this.GetListTaiSanChuaBanGiao();
    this.KiemTraButtonModal();
    this.GetPhanXuong();
  }
  
  GetListdmPhanXuong() {
    this._services.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      console.log(res)
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListTaiSanChuaBanGiao() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      console.log(res)
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
  
  delete(index) {
    let item = this.item.listTaiSan.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listTaiSan.push(JSON.parse(JSON.stringify(item)));
    }
  }
  
  
  edit(item) {
    item.edit = true;
  }
  
  save(item) {
    item.edit = false;
  }
  
  xoa(item) {
  
  }
  validate(): boolean {
    if (!validVariable(this.item.IddmPhanXuong)) {
      this.toastr.error('Vui lòng nhập bộ phận sử dụng!!');
      return false;
    }
    return true;
  }
  setData() {
    this.item.NgayThuHoiUnix = DateToUnix(this.item.NgayThuHoi);
    this.item.IdDuAn = this.store.getCurrent();
    return this.item;
  }
  GhiLai() {
    if (this.validate()) {
      this._serviceTaiSan.PhieuThuHoiTaiSan().Set(this.setData()).subscribe((res: any) => {
        if (res.StatusCode !== 200 || !res.StatusCode) {
          this.toastr.error("Có lỗi trong quá trình xử lý!!!");
        } else {
          this.item = res.Data;
          this.toastr.success(res.Message);
          this.KiemTraButtonModal();
          // this.activeModal.close();
        }
      }, (er) => {
        this.toastr.error("Có lỗi trong quá trình xử lý!!!");
      })
    }
  }
  
  GetNextSoQuyTrinh() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().GetNextSoQuyTrinh().subscribe((res: any) => {
      console.log(res)
      this.item.SoQuyTrinh = res.Data;
    })
  }
  
  ThemMoiDanhSachTaiSan() {
      let modalRef = this._modal.open( {
        size: "xl",
        backdrop: "static",
      });
      modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.IdTaiSan) : []
      modalRef.componentInstance.opt = this.opt;
      modalRef.componentInstance.Lay_Chon =this.item.IddmPhanXuong; ////
      modalRef.componentInstance.item = {};
      modalRef.result.then((res: any) => {
        let listKetQua = [];
        this.item.listTaiSan.forEach(Tai_San => {
          let bien = res.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
          if (bien !== undefined) {
            listKetQua.push(Tai_San);
          }
        });
        // vong lap 2
      res.forEach(Tai_San => {
        let bien = this.item.listTaiSan.find(ele => ele.IdTaiSan === Tai_San.IdTaiSan);
        if (bien === undefined) {
          listKetQua.push(Tai_San);
        }
      });
      this.item.listTaiSan = listKetQua;
      })
        .catch((er) => {
        });
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
      console.log(this.checkbutton)
    });
  }
  ChapNhan() {
    this._serviceTaiSan.PhieuThuHoiTaiSan().ChuyenTiep(this.setData()).subscribe((res: any) => {
      console.log(res)
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
      console.log(res.Data);
    });
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