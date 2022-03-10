import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachontaisantheolichxich',
  templateUrl: './modalluachontaisantheolichxich.component.html',
  styleUrls: ['./modalluachontaisantheolichxich.component.css']
})
export class ModalluachontaisantheolichxichComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  Chon:any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();

  }
  resetFilter() {
    this.filter = {};
    this.Keyword = '';
    this.GetList();
  }
  GetList() {
      this.listdmLoaiBaoDuong = this.Chon.listdmLoaiBaoDuong;
      let items = [];
      this.items = [];
      items = this.Chon.listTaiSan;
      items.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.Id);
        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj_copy.children = [];
          obj_copy.children.listItem = [];      // Tạo 1 list để trải tên bảo dưỡng
          for (let i = 0; i < this.listdmLoaiBaoDuong.length; i++) {
            let dataitem = {
              Ngay: '',
            }
            obj_copy.children.listItem.push(dataitem);
          }
          obj.listTaiSan.forEach(element => {
            element.checked = this.listItemDaChon.includes(element.Id);
            obj_copy.children.push({ data: element });
          });
        }
        obj.listItem = [];
        for (let i = 0; i < this.listdmLoaiBaoDuong.length; i++) {
          let dataitem = {
            Ngay: '',
          }
          obj.listItem.push(dataitem);
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children, });
      });
      this.checkedAll = items.every(ele => ele.checked);
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
    this.checkedAll = this.TimCheck();
  }
  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          IdTaiSan: obj.data.Id,
          Id: '',
          TenTaiSan: obj.data.Ten,
          listLichBaoDuong:obj.data.listLichBaoDuong
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            data.push({
              IdTaiSan: objchildren.data.Id,
              Id: '',
              TenTaiSan: objchildren.data.Ten,
              listLichBaoDuong: objchildren.data.listLichBaoDuong
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
