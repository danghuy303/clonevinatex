import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThemNhaCungUngModalComponent } from '../them-nha-cung-ung-modal/them-nha-cung-ung-modal.component';
import { SuaNhaCungUngModalComponent } from '../sua-nha-cung-ung-modal/sua-nha-cung-ung-modal.component';
import { AuthenticationService } from 'src/app/services/auth.service';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-gia-nha-cung-ung-modal',
  templateUrl: './danh-gia-nha-cung-ung-modal.component.html',
  styleUrls: ['./danh-gia-nha-cung-ung-modal.component.css']
})
export class DanhGiaNhaCungUngModalComponent implements OnInit {

  title: any;
  quyTrinh: any = {};
  data: any;
  // listNhaCungUng: any = [];
  filter: any = {};
  opt: any = "";
  checkbutton: any = {};
  paging: any = {};
  listTinhTrang: any[] = [];
  listPheDuyet: any[] = [];
  user: any;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    private _serviceSanXuat: SanXuatService,
    private _serviceAuth: AuthenticationService,
    public toast: ToastrService,
  ) {
    this.listPheDuyet = [
      { id: 'DUYET', label: 'Phê duyệt' },
      { id: 'CHUADUYET', label: 'Chưa phê duyệt' },
    ]
    this.user = this._serviceAuth.currentUserValue;
  }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.title = "Thêm mới";
      this.GetNextSoQuyTrinh();
      this.KiemTraButtonModal();
    }
    else {
      this.title = "Cập nhật";
      // this.GetQuyTrinh();
    }
    this.GetListTinhTrang();
    this.ResetFilter();
    console.log('setData',this.SetData());
  }

  GetListTinhTrang() {
    this._serviceTaiSan.NhaCungUng().GetListTinhTrang().subscribe((res: any) => {
      this.listTinhTrang = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._serviceSanXuat.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ResetFilter() {
    this.filter = {};
    this.GetListNhaCungUng(true);
  }

  GetListNhaCungUng(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    // let data = {
    //   CurrentPage: this.paging.currentPage,
    //   PageSize: 20,
    //   Keyword: this.filter.keyword,
    // }
    // this._serviceTaiSan.NhaCungUng().GetList(data).subscribe((res: any) => {
    //   // console.log(res);
    //   this.items = res.Data.Items;
    //   this.paging.TotalCount = res.Data.TotalCount;
    // })
    // this.paging.TotalCount = this.listNhaCungUng.length;
  }

  ValidateData() {
    if(!validVariable(this.quyTrinh.Ngay)){
      this.toast.error('Vui lòng nhập ngày đánh giá!')
      return false
    }
    return true
  }

  SetData() {
    this.quyTrinh.NgayUnix = DateToUnix(this.quyTrinh.Ngay);
    return this.quyTrinh
  }
  
  // GetQuyTrinh() {
  //   this._serviceTaiSan.DanhGiaNhaCungUng().Get(this.quyTrinh.Id).subscribe((res: any) => {
  //     this.quyTrinh = res.Data;
  //     this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.NgayUnix);
  //     this.KiemTraButtonModal();
  //   })
  // }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.DanhGiaNhaCungUng().GetNextSoQuyTrinh().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  UpdateQuyTrinh() {
    console.log('update with set data', this.SetData());
    
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().Set(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          // this.quyTrinh.Id = res.Data.Id;
          this.quyTrinh = res.Data;
          // this.GetQuyTrinh();
          // this.activeModal.close();
          
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  DeleteQuyTrinh() {
    this._serviceTaiSan.DanhGiaNhaCungUng().Delete(this.quyTrinh).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        this.toast.success(res.Message);
        this.activeModal.close();
      } else {
        this.toast.error(res.Message);
      }
    })
  }

  KhongDuyetQuyTrinh() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().KhongDuyet(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  ChuyenTiepQuyTrinh() {
    if (this.ValidateData()) {
      this._serviceTaiSan.DanhGiaNhaCungUng().ChuyenTiep(this.SetData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  // =================================================================
  //Nha cung ung
  // =================================================================

  AddNhaCungUng() {
    let modalRef = this._modal.open(ThemNhaCungUngModalComponent, {
      size: "xl",
      backdrop: "static"
    })
    modalRef.componentInstance.checkListItem = this.quyTrinh?.listPhieuDanhGia || [];
    modalRef.result
      .then((res: any) => {
        this.quyTrinh.listPhieuDanhGia = (this.quyTrinh?.listPhieuDanhGia || []).concat(res);
      })
      .catch(er => { })
      .finally()
  }


  UpdateNhaCungUng(item) {
    let modalRef = this._modal.open(SuaNhaCungUngModalComponent, {
      size: 'xl',
      backdrop: 'static',
    })
    modalRef.componentInstance.quyTrinh = this.quyTrinh;
    modalRef.componentInstance.listDiemDaDanhGia = item.listTieuChi;
    modalRef.componentInstance.item = item;
    modalRef.result
      .then((res: any) => {
        console.log(res.KetQuaDanhGia)
        item.KetQuaDanhGia = res.KetQuaDanhGia;
        item.listTieuChi = res.listTieuChi;
        console.log('item sau khi save sua danh gia', item);
        // console.log('quy trinh sau khi save', this.quyTrinh);
      })
      .catch(er => {})
      .finally(()=>{})
  }

  DeleteNhaCungUng(id: string) {
    let idItem = this.quyTrinh.listPhieuDanhGia.findIndex(item => item.IddmNhaCungUng === id);
    this.quyTrinh.listPhieuDanhGia.splice(idItem, 1);
  }

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.GetListNhaCungUng(false);
  }
  test(item){
    console.log(item)
  }
}
