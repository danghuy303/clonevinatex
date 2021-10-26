import { dataLoader } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan-copy',
  templateUrl: './modalchontaisan-copy.component.html',
  styleUrls: ['./modalchontaisan-copy.component.css']
})
export class ModalchontaisanCopyComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  checkedAll: boolean = false;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.Loaddata();
  }

  TimCheck() {
    let cha: boolean = false;
    let con: boolean = false;
    cha = this.items.every(ele => ele.data.checked);
    this.items.filter(obj => {
      if (validVariable(obj.children) && obj.children.length > 0) {
        con = obj.children.every(ele => ele.data.checked);
        if (!con) {
        return false;
        }
      }   
    });
    if ((cha) && (con)) {
      return true;
    }
    else {
      return false;
    }
   
  }

  checkAll(e) {
    if (e.checked) {
      this.items.forEach(obj => {
        obj.data.checked = true;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(obj_children => {
            obj_children.data.checked = true;
          });
        }
      });
    } else {
      this.items.forEach(obj => {
        obj.data.checked = false;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(obj_children => {
            obj_children.data.checked = false;
          });
        }
      });
    }
    
  }

  checked() {
    this.checkedAll = this.TimCheck();
  }

  Loaddata() {
    this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
      let items = [];
      this.items = [];
      items = res.Data;
      items.forEach(obj => {
        let obj_copy: any = [];
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj.listTaiSan.forEach(taisan => {
            obj_copy.children.push({ data: taisan });
          });
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
    })
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          TaiSan: obj.data,
          IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
          IdTaiSan: obj.data.Id,
          Id: '',
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            data.push({
              TaiSan: obj.data,
              IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
              IdTaiSan: objchildren.data.Id,
              Id: '',
            });
          }
        });
      }
    });
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}