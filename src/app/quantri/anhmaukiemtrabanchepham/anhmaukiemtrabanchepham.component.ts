import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../services/callApiSanXuat';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { host1 } from '../../services/host';

@Component({
  selector: 'app-anhmaukiemtrabanchepham',
  templateUrl: './anhmaukiemtrabanchepham.component.html',
  styleUrls: ['./anhmaukiemtrabanchepham.component.css']
})
export class AnhmaukiemtrabanchephamComponent implements OnInit {

  data: any = {};
  products: any = [];
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 6, numScroll: 1 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];
  listAnhDaChon: any = [];
  lisFolder = [];
  listTaiLieu = [];
  listIdAnhTaiLieuDaChon: any = [];
  isThuVienMau: boolean = false;
  isDat: boolean = false;

  constructor(
    private _services: SanXuatService,
    private _toastr: ToastrService,
    private store: StoreService,
    public activeModal: NgbActiveModal,
    private _modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.isDat = this.data.isDat ? this.data.isDat : false;
    this.GetListFileByListId_Mau();
    this.GetListFileByListId_Chon(this.data.listIdFileAnh);
  }

  GetListFileByListId_Mau() {
    let data = {
      IdFolder: this.data.IdFolderAnhMau,
      listIdFile: []
    }
    this._services.GetListFileByListId(data).subscribe((res: any) => {
      this.products = res.Data.map((ele: any) => {
        return {
          ...ele,
          Name: host1 + ele.Link
        }
      })
    })
  }
  GetListFileByListId_Chon(listId) {
    let data = {
      IdFolder: null,
      listIdFile: listId || []
    }
    this._services.GetListFileByListId(data).subscribe((res: any) => {
      this.listAnhDaChon = [...res.Data].map((ele: any) => {
        return {
          ...ele,
          Name: host1 + ele.Link
        }
      });
    })
  }

  accept() {
    let data = {
      listIdFileAnh: this.listAnhDaChon.map((ele: any) => ele.Id),
      isDat: this.isDat
    }
    this.activeModal.close(data);
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
  handleChonAnhThuVien(content: any) {
    this.isThuVienMau = true;
    let data = {
      IdDuAn: null,
      LoaiThuMuc: "ThuMucKhac"
    }
    this._services.GetListFolderAll(data).subscribe((res: any) => {
      this.lisFolder = this.mapTree(res.Data);
      this.listIdAnhTaiLieuDaChon = this.listAnhDaChon.map((ele: any) => ele.Id) || [];
    })
  }

  handleAssignIdThuMuc(data) {
    let _payload = {
      IdDuAn: null,
      LoaiThuMuc: "ThuMucKhac",
      LoaiTimKiem: "TimAll",
      IdFolder: data.Id,

      listIddmTieuDuAn: [],
      listIddmCongTrinh: [],
      listIddmHangMuc: [],
      listIddmNhaThau: [],
      listIddmHopDong: [],
      listIdUserNguoiTao: [],
      listActive: [],
      KeyWord: '',
      listVitri: {},
      KeyWordLoaiFile: '',
      listIdDuAn: [],
      TuNgay: null,
      TuNgayUnix: 0,
      DenNgay: null,
      DenNgayUnix: 0,
      listIdFile: [],
      listIddmNhomTaiLieu: [],
      LoaiFile: [],
      listIddmViTriLuuTru_Folder: [],

      CurrentPage: 1,
      PageSize: 20
    }
    this._services.GetListFileFolder(_payload).subscribe((res: any) => {
      this.listTaiLieu = res.Data.Items.map((ele: any) => {
        return {
          ...ele,
          checked: this.listIdAnhTaiLieuDaChon.includes(ele.Id)
        }
      });
    })
  }

  chaNhanTuThuMuc() {
    this.listIdAnhTaiLieuDaChon = this.listTaiLieu.filter((ele: any) => ele.checked).map((ele: any) => ele.Id);
    this.isThuVienMau = false;
    this.GetListFileByListId_Chon([...new Set(this.listIdAnhTaiLieuDaChon)]);
  }

  onDeleteImage(index: number) {
    this.listAnhDaChon.splice(index, 1);
    this.listAnhDaChon = [...this.listAnhDaChon];
  }

}
