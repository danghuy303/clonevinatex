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
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = "";
  checkedAll: boolean = false;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  Keyword: any = '';
  filter: any = {};
  selectedNodes: TreeNode[] = [];
  listTaiSanDaChon: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }
  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList() {
    let data = {
      Keyword: this.filter.Keyword,
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      IddmLoaiTaiSan: '',
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
    }
    this._serviceTaiSan.GetTaiSanTheoLoai().GetListTaiSanThuHoi(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      let items = [];
      this.items = [];
      items = res.Data.Items;


      items.forEach(obj => {
        obj.checked = this.listItemDaChon.includes(obj.Id);

        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj.isCha = true;
          obj_copy.children = [];

          obj.listTaiSan.forEach(element => {
            element.isCha = false;
            element.checked = this.listItemDaChon.includes(element.Id);
            obj_copy.children.push({ data: element });
          });
          obj.listTaiSan = undefined;
        }
        obj_copy.data = obj;
        this.items.push({ data: obj_copy.data, children: obj_copy.children });
      });
      this.checkedAll = this.items.every(obj => obj.data.checked);
    });
  }
  TimCheck(eleCha) {
    eleCha.children.forEach(eleCon => {
      eleCon.data.checked = eleCha.data.checked
    });
  }

  checkAll(e) {
    this.items.forEach(eleCha => {
      eleCha.data.checked = e.checked;
      this.TimCheck(eleCha);
    })
  }

  checked(item) {
    if (!item.isCha) {
      this.items.forEach(eleCha => {
        eleCha.data.checked = eleCha.children.every(eleCon => eleCon.data.checked)
      })
    } else {
      this.items.forEach(eleCha => {
        this.TimCheck(eleCha);
      })
    }
    this.checkedAll = this.items.every(eleCha => eleCha.data.checked)
  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          IdTaiSan: obj.data.Id,
          Id: '',
          TenTaiSan: obj.data.Ten,
          MaTaiSan: obj.data.Ma,
          NguyenGia: obj.data.NguyenGia,
          GiaTriConLai: obj.data.GiaTriConLai,
        });

      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            data.push({
              IdTaiSan: objchildren.data.Id,
              Id: '',
              TenTaiSan: objchildren.data.Ten,
              MaTaiSan: objchildren.data.Ma,
              NguyenGia: objchildren.data.NguyenGia,
              GiaTriConLai: objchildren.data.GiaTriConLai,
            });
          }
        });
      }
    });
    return data;
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}