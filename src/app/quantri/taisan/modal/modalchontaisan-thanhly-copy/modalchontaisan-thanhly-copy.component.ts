import { dataLoader } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { DateToUnix, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan-thanhly-copy',
  templateUrl: './modalchontaisan-thanhly-copy.component.html',
  styleUrls: ['./modalchontaisan-thanhly-copy.component.css']
})
export class ModalchontaisanThanhlyCopyComponent implements OnInit {
  opt: any = "";
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = "";
  checkedAll: boolean = false;
  selectedNodes: TreeNode[] = [];
  listTaiSanDaChon: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  Keyword: any = '';
  filter: any = {};

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
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
    }
    this._serviceTaiSan.GetListTaiSanThanhLy().GetList(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.map(ele => {
        return {
          data: {
            ...ele,
          },
          children: []
        }
      });
      this.items = this.TreeItems(this.items)
      this.items.forEach(ele => {
        ele.data.isCha = true
      })

      this.listTaiSanDaChon = this.TimCheck(this.items)
      this.listItemDaChon.forEach(ele => {
        this.listTaiSanDaChon.forEach(obj => {
          if (obj.data.Id === ele) {
            this.selectedNodes.push(obj)
          }
        })
      })
    })
    console.log(this.listItemDaChon);
  }

  TreeItems(list) {
    list.forEach(ele => {
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => ele.data.IdTaiSan === null)
  }

  TimCheck(list: Array<any>) {
    let newArr = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.TimCheck(ele.children)];
      }
    })
    return newArr;
  }
  FilterTree() {
    let data = [];
    data = this.selectedNodes.map(ele => {
      return {
        MaTaiSan: ele.data.Ma,
        Id: '',
        GiaTriConLai: ele.data.GiaTriConLai,
        SoLuong: ele.data.SoLuong,
        TenTaiSan: ele.data.Ten,
        IdTaiSan: ele.data.Id,
        isCha: ele.data.isCha ? ele.data.isCha : false,
      }
    })
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