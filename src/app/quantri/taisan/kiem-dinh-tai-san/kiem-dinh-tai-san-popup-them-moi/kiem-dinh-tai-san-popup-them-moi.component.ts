import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-kiem-dinh-tai-san-popup-them-moi',
  templateUrl: './kiem-dinh-tai-san-popup-them-moi.component.html',
  styleUrls: ['./kiem-dinh-tai-san-popup-them-moi.component.css']
})
export class KiemDinhTaiSanPopupThemMoiComponent implements OnInit {

  opt: any = "";
  paging: any = {};
  items: TreeNode[] = [];
  item: any = {};
  checkedAll: boolean = false;
  listIdDaChon: string[];
  filter: any = {};
  selectedNodes: TreeNode[] = [];
  loaiTab: any = 0;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.Loaddata();
  }

  resetFilter() {
    this.filter = {};
    this.Loaddata();
  }

  Loaddata() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      Keyword: this.filter.Keyword,
      Ngay: DateToUnix(this.filter.Ngay) || 0,
    };
    this._serviceTaiSan
      .KiemDinhTaiSan().GetListTaiSanQuyTrinhKiemDinh(data)
      .subscribe((res: any) => {
        this.items = res.Items.map(ele => {
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
        this.CheckExistedTaiSan(this.items)
      })
  }

  TreeItem(list) {
    list.forEach(ele => {
      ele.children = list.filter(obj => obj.data.IdCha === ele.data.IdTaiSan);
    })
    return list.filter(ele => ele.data.IdCha === null);
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