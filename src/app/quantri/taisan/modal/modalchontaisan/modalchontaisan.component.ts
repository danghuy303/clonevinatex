import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { async } from 'rxjs/internal/scheduler/async';
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
  items: TreeNode[] = [];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[];
  filter: any = {};
  selectedNodes: TreeNode[] = [];

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

  resetFilter() {
    this.filter = {};
    this.Loaddata();
  }

  Loaddata() {
    this._serviceTaiSan
      .GetTaiSanTheoLoai()
      .GetListTaiSanChuaBanGiao(0, 0, this.filter.Keyword, "", "")
      .subscribe((res: any) => {
        this.items = res.Data.map(ele => {
          return {
            data: {
              ...ele,
              IdCha: ele.IdTaiSan,
              IdTaiSan: ele.Id,
              Id: "",
              TenTaiSan: ele.Ten,
              MaTaiSan: ele.Ma,
              Soluong: ele.Soluong,
            },
            children: [],
            expanded: true,
          }
        })
        this.items = this.TreeItem(this.items);
        console.log('items',this.items);
        
        this.CheckExistedTaiSan(this.items)
      })
  }

  TreeItem(list) {
    list.forEach(ele => {
      ele.children = list.filter(obj => obj.data.IdCha === ele.data.IdTaiSan);
    })
    return list.filter(ele => ele.data.IdCha === null || ele.data.IdCha === '');
  }

  CheckExistedTaiSan(list) {
    list.forEach(ele => {
      ele.data.checked = this.listIdDaChon.includes(ele.data.IdTaiSan);
    })
    this.Checked()
  }

  CheckAll(e) {
    this.items.forEach(ele => {
      ele.data.checked = e.checked;
    })
  }

  Checked() {
    this.checkedAll = this.items.every(ele => ele.data.checked);
  }

  GhiLai() {
    let selectedItems = this.items.filter(ele => ele.data.checked);
    this.activeModal.close(selectedItems)
  }

}
