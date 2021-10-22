import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { API } from 'src/app/services/host';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan',
  templateUrl: './modalchontaisan.component.html',
  styleUrls: ['./modalchontaisan.component.css']
})
export class ModalchontaisanComponent implements OnInit {
  opt: any = "";

  paging: any = {};
  items: TreeNode[];
  item: any = {};
  checkedAll: boolean = false;

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
    this.Loaddata();
  }

  Loaddata() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data;
      items.forEach(obj => {
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(element => {
            obj_copy.children.push({ data: element });
          });
          delete obj.listTaiSan;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  checkAll(e) {
    debugger
    if (e.checked) {
      this.items.forEach(item => {
        item.data.checked = true;
      });
    } else {
      this.items.forEach(item => {
        item.data.checked = false;
      });
    }
  }

  checked() {
    this.checkedAll = this.items.every(ele => ele.data.checked)
  }

  GhiLai() {
    this.activeModal.close(this.items.filter(item => item.data.checked).map(ele => {
      return {
        ...ele,
        IdQuyTrinhBanGiao: this.opt === 'add' ? this.item.IdQuyTrinhBanGiao : '',
        IdTaiSan: ele.data.Id,
        Id: '',
      }
    }));
  }

}
