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
  listItemDaChon:any=[];
  Lay_Chon: any = "";
  checkedAll: boolean = false;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    console.log(this.Lay_Chon); // Kiểm tra lấy được Id chưa...
    this.Loaddata();
  
  }

  Loaddata() {
    this._serviceTaiSan.GetListTaiSanThuHoi().GetListTaiSan(this.Lay_Chon).subscribe((res: any) => {
      let items = [];
        this.items = [];
        items = res.Data;
        console.log(this.listItemDaChon)
        items.forEach(obj => {
          // check list id vua truyen vao, neu cai nao da ton tai thì đánh check cho nó 
            obj.checked = this.listItemDaChon.includes(obj.Id);
            let obj_copy: any = {};
            if (obj?.listTaiSan) {
              obj_copy.children = [];
              obj.listTaiSan.forEach(element => {
                console.log(element)
                element.checked = this.listItemDaChon.includes(element.Id);
                obj_copy.children.push({ data: element });
              });
              obj.listTaiSan=undefined;
            }
            obj_copy.data = obj;
            this.items.push({ data: obj_copy.data, children: obj_copy.children });
        });
        this.checkedAll=items.every(ele=>ele.checked);
        console.log(items)
        console.log(this.items);
    });
    // this._serviceTaiSan.GetOptions().GetListTaiSanChuaBanGiao().subscribe((res: any) => {
    //   let items = [];
    //   this.items = [];
    //   items = res.Data;
    //   console.log(this.listItemDaChon)
    //   items.forEach(obj => {
    //     // check list id vua truyen vao, neu cai nao da ton tai thì đánh check cho nó 
    //       obj.checked = this.listItemDaChon.includes(obj.Id);
    //       let obj_copy: any = {};
    //       if (obj?.listTaiSan) {
    //         obj_copy.children = [];
    //         obj.listTaiSan.forEach(element => {
    //           console.log(element)
    //           element.checked = this.listItemDaChon.includes(element.Id);
    //           obj_copy.children.push({ data: element });
    //         });
    //         obj.listTaiSan=undefined;
    //       }
    //       obj_copy.data = obj;
    //       this.items.push({ data: obj_copy.data, children: obj_copy.children });
    //   });
    //   this.checkedAll=items.every(ele=>ele.checked);
    //   console.log(items)
    //   console.log(this.items);
    // })
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
          obj.children.forEach(objchildren => {
            objchildren.data.checked = true;
          });
        }
      });
    } else {
      this.items.forEach(obj => {
        obj.data.checked = false;
        if (validVariable(obj.children) && obj.children.length > 0) {
          obj.children.forEach(objchildren => {
            objchildren.data.checked = false;
          });
        }
      });
    }
  }

  checked() {
    // this.checkedAll = this.items.every(ele => ele.data.checked)
    this.checkedAll = this.TimCheck();
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