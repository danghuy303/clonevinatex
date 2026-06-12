import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from '../../../services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable, DateToUnix, UnixToDate } from '../../../services/globalfunction';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-anhmauchatluongbanchpham',
  templateUrl: './anhmauchatluongbanchpham.component.html',
  styleUrls: ['./anhmauchatluongbanchpham.component.css']
})
export class AnhmauchatluongbanchphamComponent implements OnInit {

  @ViewChild('paginator') paginator: any;
  listCongDoan: any = [];
  item: any = {};
  display: boolean = false;
  lisFolder: any = [];
  $sub!: Subscription;
  objFolderAnhMau: any;
  idTieuChi: string = '';
  idMatHang: string = '';

  constructor(
    private _services: SanXuatService,
    private _toastr: ToastrService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.GetListFolderAll()
      }
    })
  }

  ngOnInit(): void {
    this.GetListFolderAll();
    // this.getListCongDoan();
  }

  mapTree(list: any) {
    return list.map((ele: any) => {
      const hasChildren = Array.isArray(ele.listChild) && ele.listChild.length > 0;
      const mappedChildren = hasChildren ? this.mapTree(ele.listChild) : [];
      const { listChild, ...rest } = ele;
      const currentNode = {
        data: {
          ...rest
        },
        children: mappedChildren,
        showChildren: hasChildren,
        parent
      };
      if (hasChildren) {
        mappedChildren.forEach((child: any) => child.parent = currentNode);
      }
      return currentNode;
    })
  }
  GetListFolderAll() {
    let data = {
      IdDuAn: this.store.getCurrent() || 0,
      LoaiThuMuc: 'ThuMucMau'
    }
    this._services.GetListFolderAll(data).subscribe((res: any) => {
      this.lisFolder = this.mapTree(res.Data);
    })
  }
  getListCongDoan() {
    this._services.GetListCongDoan().subscribe((res: any) => {
      this.listCongDoan = mapArrayForDropDown(res, 'Ten', 'Ma');
    })
  }
  handleCongDoan(value) {
    this._services.GetListdmTieuChiChatLuongBCPTheoCongDoan(value).subscribe((res: any) => {
      this.item = res;
    })
  }
  chonThuMuc(tieuChi, matHang) {
    this.display = !this.display;
    this.idTieuChi = JSON.parse(JSON.stringify(tieuChi.Id));
    this.idMatHang = JSON.parse(JSON.stringify(matHang.Id));
  }
  handleAssignIdThuMuc(data) {
    this.objFolderAnhMau = JSON.parse(JSON.stringify(data));
  }
  handleChapNhan() {
    this.item.dmTieuChiChatLuongs = this.item.dmTieuChiChatLuongs.map(ele => {
      let _newObj = ele.Id === this.idTieuChi ? {
        ...ele,
        listAnhMauTieuChiChatLuongBanChePham: ele.listAnhMauTieuChiChatLuongBanChePham?.map(obj => {
          return {
            ...obj,
            IdFolderAnhMau: obj.Id === this.idMatHang ? this.objFolderAnhMau.Id : obj.IdFolderAnhMau,
            TenDuongDanFolder: obj.Id === this.idMatHang ? this.objFolderAnhMau.Ten : obj.TenDuongDanFolder,
          }
        })
      } : ele
      return _newObj;
    });
    this.display = !this.display;
  }

  upDate() {
    this._services.SetdmAnhMauTieuChiChatLuongBanChePham(this.item).subscribe((res: any) => {
      if (res.StatusCode === 0) {
        this._toastr.success(res.message)
      } else this._toastr.error(res.message)
    })
  }

}