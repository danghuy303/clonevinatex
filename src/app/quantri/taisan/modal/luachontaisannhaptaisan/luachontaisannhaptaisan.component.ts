import { dataLoader } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-luachontaisannhaptaisan',
  templateUrl: './luachontaisannhaptaisan.component.html',
  styleUrls: ['./luachontaisannhaptaisan.component.css']
})
export class LuachontaisannhaptaisanComponent implements OnInit {
  opt: any = "";
  items: TreeNode[];
  item: any = {};
  // listItemDaChon: any = [];
  listItemDaChon: any = '';
  Lay_Chon: any = "";
  checkedAll: boolean = false;
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  Keyword: any = '';
  filter: any = {};
  LayId: any = '';

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
    this._serviceTaiSan.NhapTaiSan().ChonTuThuVien(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.items = res.Data.Items.map(ele => {
        return {
          data: {
            ...ele
          },
          children: []
        }
      });
      this.items = this.TreeItems(this.items);
    });
  }

  TreeItems(list) {
    list.forEach(ele => {
      ele.data.checked = this.listItemDaChon === ele.data.Id
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => !ele.data.IdTaiSan)
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

  checked(e) {
    this.items.forEach(ele => {
      if (ele.data.Id !== e.Id) {
        ele.data.disabled = e.checked; // nếu khác id thì disabled các item khác ( disabled = true). ko đc fix cứng => vì khi tích chọn thì e.checked = true
      }
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  GhiLai() {
    this.LayId = this.items.find( ele => ele.data.checked).data.Id;
    this._serviceTaiSan.NhapTaiSan().AddThuVienById(this.LayId).subscribe((res: any) => {
      this.activeModal.close(res.Data);
    })

  }

}