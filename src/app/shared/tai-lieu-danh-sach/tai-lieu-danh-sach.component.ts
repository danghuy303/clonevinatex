import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { host1 } from 'src/app/services/host';

@Component({
  selector: 'app-tai-lieu-danh-sach',
  templateUrl: './tai-lieu-danh-sach.component.html',
  styleUrls: ['./tai-lieu-danh-sach.component.css']
})
export class TaiLieuDanhSachComponent implements OnInit {

  @Input() item: any;
  listTaiLieu: any = [];
  API: string = host1;

  constructor(
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) {
  }

  ngOnInit(): void {
 
  }

  taiLenFileDinhKem() {
    const modalRef = this._modal.open(UploadmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    });
    modalRef.componentInstance.multiple = true;
    modalRef.componentInstance.type = '';
    modalRef.result
      .then((data) => {
        this.item?.listFileDinhKem.push(...data.map(obj => {
          return {
            Id: "",
            FileNameGUI: obj.Name,
            FileName: obj.NameLocal,
            Link: obj.Url
          }
        }));
      }, (reason) => {

      });
  }

  deleteTaiLieu(index) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa dữ liệu vừa chọn?';
    modalRef.result.then(res => {
      this.item?.listFileDinhKem.splice(index, 1)
    }).catch(er => console.log(er))
  }
  test(){
    console.log(this.item)
  }
}
