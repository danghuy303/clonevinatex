import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-xulysucoluachontaisan',
  templateUrl: './xulysucoluachontaisan.component.html',
  styleUrls: ['./xulysucoluachontaisan.component.css']
})
export class XulysucoluachontaisanComponent implements OnInit {

  opt: any = "";
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  Keyword: any = '';
  filter: any = {};
  listLoaiTaiSan = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
    this.GetListdmLoaiTaiSan();
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetListdmLoaiTaiSan() {
    let data = {
      Keyword: "", CurrentPage: 0, PageSize: 20,
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
    }
    let data = {
      Keyword: this.filter.Keyword,
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      IddmLoaiTaiSan: this.filter.IddmLoaiTaiSan,
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      // isCanDuTru: false, isGiaTriCao: false, IdDuAn: 0,
      // TuNgay: 0, DenNgay: 0,
    };
    this._serviceTaiSan.QuyTrinhXuLySuCo().GetListTaiSanQuyTrinhXulySuCo(data).subscribe((res: any) => {
      this.paging.TotalCount = res.TotalCount;
      this.paging.CurrentPage= res.Page;
      let items = [];
      this.items = [];
      items = res.Items;
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

  TimCheck() {
    // eleCha.children.forEach(eleCon => {
    //   eleCon.data.checked = eleCha.data.checked
    // });
  }

  checkAll(e) {
    this.items.forEach(eleCha => {
      eleCha.data.checked = e.checked;
      // this.TimCheck(eleCha);
    })
  }

  checked(item) {
    // if (!item.isCha) {
    //   this.items.forEach(eleCha => {
    //     eleCha.data.checked = eleCha.children.every(eleCon => eleCon.data.checked)
    //   })
    // } else {
    //   this.items.forEach(eleCha => {
    //     this.TimCheck(eleCha);
    //   })
    // }
    this.checkedAll = this.items.every(eleCha => eleCha.data.checked)

  }

  FilterTree() {
    let data: any = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        data.push({
          IdTaiSan: obj.data.Id,
          TenTaiSan: obj.data.Ten,
          Ma: obj.data.Ma,
          IddmLoaiBaoDuong: obj.data.IddmLoaiBaoDuong,
          TenLoaidmBaoDuong: obj.data.TendmLoaiBaoDuong,
          ThoiGianKeHoach: obj.data.ThoiGianKeHoach,
          IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich
        });
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            // data.push(
            //   objchildren.data.IdTaiSan,
            // );
            data.push({
              IdTaiSan: objchildren.data.Id,
              IddmLoaiBaoDuong: objchildren.data.IddmLoaiBaoDuong,
              TenTaiSan: objchildren.data.Ten,
              Ma: objchildren.data.Ma,
              // MaTaiSan: objchildren.data.MadmLoaiBaoDuong,
              TenLoaidmBaoDuong: objchildren.data.TendmLoaiBaoDuong,
              ThoiGianKeHoach: objchildren.data.ThoiGianKeHoach,
              IdLapKeHoachLichXich: obj.data.IdLapKeHoachLichXich
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

  changePage(e) {
    this.paging.currentPage = e.page + 1;
    console.log(this.paging.currentPage);
    this.GetList(false);
  }

}
