import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { vn } from 'src/app/services/const';
import { API } from 'src/app/services/host';

@Component({
  selector: 'app-thongtitaisancha',
  templateUrl: './thongtitaisancha.component.html',
  styleUrls: ['./thongtitaisancha.component.css']
})
export class ThongtitaisanchaComponent implements OnInit {
  lang: any = vn;
  checkbutton: any = {};

  @Input('item') item: any;
  @Output('itemChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('listDonVi') listDonVi: any = [];
  @Input('listLoaiTaiSan') listLoaiTaiSan: any = [];
  @Input('listTinhTrangTaiSan') listTinhTrangTaiSan: any = [];
  @Input('listNhaSanXuat') listNhaSanXuat: any = [];
  @Input('opt') opt: any = [];


  constructor() {

  }

  ngOnInit() {
    // if (this.opt === 'add') {
    //   this.item = {
    //     TaiSan: {
    //       Id: "",
    //       isXoa: false,
    //       listFileDinhKem: [],
    //     },
    //     listTaiSan: [],
    //   }
    // }
    // else {

    // }
    this.ChangeData();
    console.log(this.item);
    let option: FileUploaderOptions = {
      url: `${API.uploadURL}`,
      headers: [{ name: 'Accept', value: 'application/json' }],
      autoUpload: true,
    }

    this.item.TaiSan.listFileDinhKem = new FileUploader(option);
    this.item.TaiSan.listFileDinhKem.onBeforeUploadItem = (item) => {
      item.withCredentials = true;
    };

    this.item.TaiSan.listFileDinhKem.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.item.TaiSan.listFileDinhKem.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    this.item.TaiSan.listFileDinhKem.onCompleteItem = (item, response, status, headers) => this.onCompleteItem(item, response, status, headers);
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

  ChangeData() {
    console.log('asdkfahsdkfjh');
    console.log(this.item);
    this.itemChange.emit(this.item);    
  }
}
