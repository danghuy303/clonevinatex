import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { validVariable } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-modalcapnhatsuachuabaoduong',
  templateUrl: './modalcapnhatsuachuabaoduong.component.html',
  styleUrls: ['./modalcapnhatsuachuabaoduong.component.css']
})
export class ModalcapnhatsuachuabaoduongComponent implements OnInit {
  item: any = {};
  opt: any = "";
  title: any = "";
  lang: any = vn;
  listLoaiSuCo: any = [];
  listPhongBan: any = [];
  listMucDoUuTien: any = [];
  newTableItem: any = {};
  uploader: FileUploader;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới";
    }
    else {
      this.title = "Cập nhật";
    }
    let option: FileUploaderOptions = {
      url: `${API.uploadURL}`,
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
    // console.log(res)
    // this.TepImport.TenGui = res[0].Name;
    // this.TepImport.TenGoc = res[0].NameLocal;
    // this.TepImport.DuongDan = res[0].Url;
  };
  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
  }

  add() {
    // if (!validVariable(this.newTableItem.thoiGianCapCang) || !validVariable(this.newTableItem.thoiGianDuKien)) {
    //   this.toastr.error('Vui lòng chọn thời gian')
    // }
    // if (this.item.listInvoice == undefined || this.item.listInvoice == null)
    //   this.item.listInvoice = [];
    // this.newTableItem.id = "";
    // this.newTableItem.idKeHoachNhapBong = this.item.id;
    // this.newTableItem = {
    //   "id": "",
    //   "idKeHoachNhapBong": this.item.id,
    // }
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {

    }, (reason) => {

    });
  }

  GhiLai() {

  }
}
