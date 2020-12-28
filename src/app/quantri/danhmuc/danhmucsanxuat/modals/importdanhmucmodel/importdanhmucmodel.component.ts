import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { API } from 'src/app/services/host';

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
  mapTepMauURL:any={
  };
  constructor(private _modalActive: NgbActiveModal, private _modal: NgbModal, 
    private service: SanXuatService,private _toastr:ToastrService) { }
  ngOnInit(): void {
  }
  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((data) => {
      this.TepImport.TenGui = data[data.length - 1].Name;
      this.TepImport.TenGoc = data[data.length - 1].NameLocal;
      this.TepImport.DuongDan = data[data.length - 1].Url;
    }, (reason) => {

    });
  }
  accept() {
    this.service.Importdm(this.importFunc, this.TepImport.TenGui).subscribe((res:any) => {
      if(res.State===1){
        this._modalActive.close({mess:'Cập nhật thành công!'})
      }else{
        this._toastr.error(res.message);
      }
    })
  }
  taiTepMau(){
    window.open(API.baseUrl+this.mapTepMauURL[this.importFunc]);
  }
}
