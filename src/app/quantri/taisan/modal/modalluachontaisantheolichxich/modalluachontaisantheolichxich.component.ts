import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { DateToUnix, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { DanhmuctaisanService } from 'src/app/services/Taisan/danhmuctaisan.service';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalluachontaisantheolichxich',
  templateUrl: './modalluachontaisantheolichxich.component.html',
  styleUrls: ['./modalluachontaisantheolichxich.component.css']
})
export class ModalluachontaisantheolichxichComponent implements OnInit {
  opt: any = "";
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  checkedAll: boolean = false;
  listdmLoaiBaoDuong: any = [];
  Keyword: any = '';
  filter: any = {};
  Chon: any = [];
  listCha: any = [];
  listLoaiTaiSan: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  TaiSanItem: any = [];
  checkBtnChonTaiSan: boolean;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private _danhMucTaiSan: DanhmuctaisanService,
  ) { }

  ngOnInit(): void {
    let data = {
      Keyword: this.filter.Keyword,
      CurrentPage: 0,
      PageSize: 20,
      MaCongDoan: '',
    };
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetList(data).subscribe((res: any) => {
      this.listLoaiTaiSan = mapArrayForDropDown(res.Data, "Ten", "Id");
    })
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
      MaCongDoan: '',
      IdBoPhanSuDung: this.item.IdBoPhanSuDung,
      IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
      IdUser: '',
      Ngay: 0,
      LoaiKeHoach: '',
      IdDuAn: 0,
    };
    this._serviceTaiSan.LichXich().GetListTaiSanTheoNam(data).subscribe((res: any) => {
      this.paging.TotalCount = res.Data.TotalCount;
      this.TaiSanItem = res.Data;

      this.listdmLoaiBaoDuong = this.TaiSanItem.listdmLoaiBaoDuong;
      // this.listdmLoaiBaoDuong.sort(this.compare);
      this.items = [];
      let items = [];
      items = this.TaiSanItem.listTaiSan;

      items.forEach(obj => {

        obj.checked = this.listItemDaChon.includes(obj.IdTaiSan);

        let obj_copy: any = {};
        if (obj?.listTaiSan) {
          obj.isCha = true;
          obj_copy.children = [];

          obj.listTaiSan.forEach(element => {
            element.isCha = false;
            element.checked = this.listItemDaChon.includes(element.IdTaiSan);
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
  compare(a, b) {
    if (a.MadmLoaiBaoDuong < b.MadmLoaiBaoDuong) {
      return -1;
    }
    if (a.MadmLoaiBaoDuong > b.MadmLoaiBaoDuong) {
      return 1;
    }
    return 0;
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
    let data: any = {};
    let arr = [];
    this.items.forEach(obj => {
      if (obj.data.checked) {
        arr.push(obj.data.IdTaiSan);

        data = {
          ListIdTaiSan: arr,
          IdBoPhanSuDung: this.item.IdBoPhanSuDung,
          IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
          Ngay: DateToUnix(new Date(this.item.Nam, 1, 1)),
          IdQuyTrinh: this.item.Id,
        };
      }
      if (validVariable(obj.children) && obj.children.length > 0) {
        obj.children.forEach(objchildren => {
          if (objchildren.data.checked) {
            arr.push(objchildren.data.IdTaiSan);
            data = {
              ListIdTaiSan: arr,
              IdBoPhanSuDung: this.item.IdBoPhanSuDung,
              IddmLoaiTaiSan: this.item.IddmLoaiTaiSan,
              Ngay: DateToUnix(new Date(this.item.Nam, 1, 1)),
              IdQuyTrinh: this.item.Id,
            }

          }
        });
      }
    });
    return data;
   
  }
  GhiLai() {
    this._serviceTaiSan.LichXich().GetListVatTuByIdTaiSanForLapKeHoachLichXichNam(this.FilterTree()).subscribe((res: any) => {
      this.activeModal.close(res.Data.listTaiSan);
    });
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

}
