import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-chon-tai-san-khau-hao-modal',
  templateUrl: './chon-tai-san-khau-hao-modal.component.html',
  styleUrls: ['./chon-tai-san-khau-hao-modal.component.css']
})
export class ChonTaiSanKhauHaoModalComponent implements OnInit {

  opt: any = "";
  keyword: any = '';
  paging: any = {};
  items: TreeNode[] = [];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[] = [];
  listTaiSanDaChon: any[] = [];
  idBoPhanSuDung: any = '';
  ngay: any;
  selectedNodes: TreeNode[] = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    public toastr: ToastrService,
    private _servicesSanXuat: SanXuatService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.resetFilter();
  }

  TreeItems(list) {
    list.forEach(ele => {
      const nestedChildren = Array.isArray(ele.data?.listTaiSan)
        ? ele.data.listTaiSan.map(child => ({
            data: { ...child },
            children: []
          }))
        : [];
      const flatChildren = list.filter(a => a.data.IdTaiSan && a.data.IdTaiSan === ele.data.Id && a.data.Id !== ele.data.Id);
      ele.children = [...nestedChildren, ...flatChildren];
    });
    return list.filter(ele => !ele.data.IdTaiSan || !list.some(p => p.data.Id === ele.data.IdTaiSan && p.data.Id !== ele.data.Id));
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

  resetFilter() {
    this.keyword = '';
    this.Loaddata(true);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1
    }
    const idDuAn = this._serviceTaiSan.store.getCurrent();
    this._serviceTaiSan
      .GetTaiSanTheoLoai()
      .GetListTaiSanKhauHao(idDuAn, this.idBoPhanSuDung, this.paging.currentPage, 20, this.keyword, this.ngay)
      .subscribe((res: any) => {
        const rawItems = Array.isArray(res?.Data?.Items)
          ? res.Data.Items
          : Array.isArray(res?.Data)
            ? res.Data
            : Array.isArray(res?.Items)
              ? res.Items
              : [];
        this.items = rawItems.map(ele => {
          return {
            data: {
              ...ele,
            },
            children: []
          }
        })
        this.items = this.TreeItems(this.items);
        this.listTaiSanDaChon = this.CheckExistedTaiSan(this.items);
        this.selectedNodes = [];
        (this.listIdDaChon || []).forEach(ele => {
          this.listTaiSanDaChon.forEach(obj => {
            if (obj.data.Id === ele || obj.data.IdTaiSan === ele) {
              this.selectedNodes.push(obj)
            }
          })
        })
        this.paging.totalCount = res?.Data?.TotalCount ?? res?.TotalCount ?? this.items.length;
      })
  }

  CheckExistedTaiSan(list: Array<any>) {
    let newArr:any = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.CheckExistedTaiSan(ele.children)];
      }
    })
    return newArr;
  }

  SetData() {
    let data = {
      ListIdTaiSan: this.selectedNodes.map(ele => ele.data.Id),
      Ngay: this.ngay
    };
    return data;
  }

  GhiLai() {
    let listTaiSanKhauHao: any = [];
    let data = this.SetData();
    this._serviceTaiSan.KhauHaoTaiSan().GetKhauHao(data).subscribe((res: any) => {
      const resData = Array.isArray(res?.Data)
        ? res.Data
        : Array.isArray(res?.Data?.Items)
          ? res.Data.Items
          : [];
      data.ListIdTaiSan.forEach(ele => {
        listTaiSanKhauHao.push(...resData.filter(obj => obj.IdTaiSan === ele || obj.Id === ele));
      });
      if (listTaiSanKhauHao.length === 0 && resData.length > 0) {
        listTaiSanKhauHao.push(...resData);
      }
      listTaiSanKhauHao.forEach(ele => {
        if (!validVariable(ele.GiaTriConLai)) {
          ele.GiaTriConLai = 0;
        }
      });
      this.activeModal.close(listTaiSanKhauHao);
    });
  }

  nodeSelect() {
  }

}
