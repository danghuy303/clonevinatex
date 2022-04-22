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
  items: TreeNode[];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[];
  listTaiSanDaChon: any[] = [];
  idBoPhanSuDung: any = '';
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
    this.Loaddata();
  }

  TreeItems(list) {
    list.forEach(ele => {
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => ele.data.IdTaiSan === null)
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.Loaddata(false);
  }

  Loaddata(reset?) {
    if (reset) {
      this.paging.currentPage = 1
    }
    this._serviceTaiSan
      .GetTaiSanTheoLoai()
      .GetListTaiSanKhauHao("", this.idBoPhanSuDung, this.paging.currentPage, 20, this.keyword)
      .subscribe((res: any) => {
        this.items = res.Items.map(ele => {
          return {
            data: {
              ...ele,
            },
            children: []
          }
        })
        this.items = this.TreeItems(this.items);
        this.listTaiSanDaChon = this.CheckExistedTaiSan(this.items)
        this.listIdDaChon.forEach(ele => {
          this.listTaiSanDaChon.forEach(obj => {
            if (obj.data.Id === ele) {
              this.selectedNodes.push(obj)
            }
          })
        })
        this.paging.totalCount = res.TotalCount;
      })
  }

  CheckExistedTaiSan(list: Array<any>) {
    let newArr = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.CheckExistedTaiSan(ele.children)];
      }
    })
    return newArr;
  }

  SetData() {
    let data = [];
    data = this.selectedNodes.map(ele => {
      // return {
      //   IdTaiSan: ele.data.Id,
      //   Id: "",
      //   MaTaiSan: ele.data.Ma,
      //   TenTaiSan: ele.data.Ten,
      // }
      return ele.data.Id;
    })
    return data;
  }

  GhiLai() {
    let listTaiSanKhauHao = [];
    let data = this.SetData();
    this._serviceTaiSan.KhauHaoTaiSan().GetKhauHao(data).subscribe((res: any) => {
      data.forEach(ele=>{
        listTaiSanKhauHao.push(...res.Data.filter(obj => obj.IdTaiSan === ele));
      })
      listTaiSanKhauHao.forEach(ele => {
        if (!validVariable(ele.GiaTriConLai)) {
          ele.GiaTriConLai = 0;
        }
      })
      this.activeModal.close(listTaiSanKhauHao);
    })
  }

  nodeSelect() {
    console.log(this.selectedNodes);
  }



}
