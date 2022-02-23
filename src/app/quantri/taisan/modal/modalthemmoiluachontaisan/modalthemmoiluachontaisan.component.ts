import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ModaltaolichbaoduongComponent } from '../../modal/modaltaolichbaoduong/modaltaolichbaoduong.component';
@Component({
  selector: 'app-modalthemmoiluachontaisan',
  templateUrl: './modalthemmoiluachontaisan.component.html',
  styleUrls: ['./modalthemmoiluachontaisan.component.css']
})
export class ModalthemmoiluachontaisanComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  NameFile: string;
  checkbutton: any = {};
  itemDonVi: any = {};
  uploader: FileUploader;
  // newTableItem: any = {};
  listDonVi: any = [];
  listLoaiTaiSan: any = [];
  listTinhTrangTaiSan: any = [];
  listCungSanXuat: any = [];
  listTinhTrangTaiSan_copy: any = [];
  listDonVi_copy: any = [];
  qrcode: any = {
    size: 250
  };
  listPhanXuong = [];
  listTaiSan: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
    private _serviceDanhMucTaiSan: DanhmuctaisanService,
  ) {

  }

  ngOnInit() {
    this.GetListdmPhanXuong();
    let data = { Keyword: "", CurrentPage: 0, PageSize: 20 };
    let ls1 = this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).toPromise();
    let ls2 = this._danhMucTaiSan.DanhMucNhaCungCap().GetList(data).toPromise();

    Promise.all([ls1,ls2]).then((values: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(values[0].Data.Items, "Ten", "Id");
      this.listCungSanXuat = mapArrayForDropDown(values[1].Data.Items, "Ten", "Id");
    });
  }

  GetListdmPhanXuong() {
    this._servicesSanXuat.GetOptions().GetListdmPhanXuong().subscribe((res: any) => {
      console.log(res)
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  
  // Validate() {
  //   if (!validVariable(this.item.TaiSan.Ma) ||
  //     !validVariable(this.item.TaiSan.Ten) ||
  //     !validVariable(this.item.TaiSan.NgayNhap) ||
  //     !validVariable(this.item.TaiSan.SoSeri) ||
  //     !validVariable(this.item.TaiSan.IddmLoaiTaiSan) ||      
  //     !validVariable(this.item.TaiSan.IddmTinhTrang)) {
  //     this.toastr.error("Yêu cầu nhập đầy đủ trường bắt buộc");
  //     return false;
  //   }
  //   return true;
  // }

  GhiLai() {
  
      // this.item.NgaySanXuatUnix = DateToUnix(this.item.NgaySanXuat);
      // this.item.NgayNhapUnix = DateToUnix(this.item.NgayNhap);
      // this.item.MaTinhTrang = this.listTinhTrangTaiSan_copy.find(obj => obj.Id === this.item.IddmTinhTrang).Ma;
      // if (validVariable(this.item.IddmDonViTinh)) {
      //   this.item.TenDonViTinh = this.listDonVi_copy.find(obj => obj.Id === this.item.IddmDonViTinh).Ten;
      // }
      this.listTaiSan.push(this.item);
      this.activeModal.close(this.listTaiSan);
    
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
