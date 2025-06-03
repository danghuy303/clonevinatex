import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';
import { TaisanService } from "src/app/services/Taisan/taisan.service";

@Component({
  selector: 'app-importdanhmucmodel',
  templateUrl: './importdanhmucmodel.component.html',
  styleUrls: ['./importdanhmucmodel.component.css']
})
export class ImportdanhmucmodelComponent implements OnInit {
  TepImport: any = {
    TenGoc: ''
  }
  importFunc: any = '';
  mapTepMauURL: any = {
  };
  Name: any = '';
  Loai: any = '';
  uploader: FileUploader;
  data: any = {};
  dataImport: any = {};
  IdDuAn: any;
  constructor(public _modalActive: NgbActiveModal, private _modal: NgbModal, private _serviceTaiSan: TaisanService,
    private service: SanXuatService, private _toastr: ToastrService, private store: StoreService) { }
  ngOnInit(): void {
    this.IdDuAn = this.store.getCurrent();
    let option: FileUploaderOptions = {
      url: `${API.uploader}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
    }

    this.uploader = new FileUploader(option);
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.uploader.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    let res = JSON.parse(response);
    // this.TepImport.TenGui = res[0].Name;
    // this.TepImport.TenGoc = res[0].NameLocal;
    // this.TepImport.DuongDan = res[0].Url;
    this.TepImport.TenGui = res.Name;
    this.TepImport.TenGoc = res.NameLocal;
    this.TepImport.DuongDan = res.Url;
  };
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }
  accept() {
    if (this.Name == 'dinhmuctieuchichatluongsoi') {
      this.service.ImportDanhSachChiTieuChatLuongTheoSanPham(this.IdDuAn, '', this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else if (this.Name == 'BCP') { //Import BÁn chế phẩm tô hiệu
      let data = {
        Id: this.importFunc,
        FileName: this.TepImport.TenGui
      }
      this.service.KiemKeBanChePham().ImportKiemKeBanChePhamToHieu(data).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close(res)
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else if (this.Name == 'BCPHUECHUNG') { //Import Bán chế phẩm huế
      let data = {
        Id: this.importFunc,
        FileName: this.TepImport.TenGui
      }
      this.service.KiemKeBanChePham().ImportKiemKeBanChePhamHue(data).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close(res)
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else if (this.Name == 'BCPHUE') { //Import Bán chế phẩm huế chung
      let data = {
        CongDoan: this.dataImport.CongDoan,
        Ngay: DateToUnix(this.dataImport.Ngay),
        IddmCaSanXuat: this.dataImport.IddmCaSanXuat,
        IddmPhanXuong: this.dataImport.IddmPhanXuong,
        FileName: this.TepImport.TenGui
      }
      this.service.KiemKeBanChePham().ImportThoDuTru(data).subscribe((res: any) => {
        if (res.State === 1) {
          this._toastr.success(res.message);
          this._modalActive.close(res.Data)
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else if (this.Name == 'VatTuTonKho') {
      this._serviceTaiSan.ImportDanhMucVatTu(this.TepImport.TenGui).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this._toastr.success(res.Message);
           this._modalActive.close()
        } else {
          this._toastr.error(res.Message);
        }
      })
    }
    else {
      this.service.Importdm(this.importFunc, this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
  }
  acceptThongSoChatLuong() {
    if (this.Loai == 'MIC') {
      this.service.PhieuNhapLoBong_ChatLuong().Import_Mic(this.data.Id, this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
    else {
      this.service.PhieuNhapLoBong_ChatLuong().Import(this.data.Id, this.TepImport.TenGui).subscribe((res: any) => {
        if (res.State === 1) {
          this._modalActive.close({ mess: 'Cập nhật thành công!' })
        } else {
          this._toastr.error(res.message);
        }
      })
    }
  }

  taiTepMau() {
    window.open(API.baseUrl + this.mapTepMauURL[this.importFunc]);
  }
}
