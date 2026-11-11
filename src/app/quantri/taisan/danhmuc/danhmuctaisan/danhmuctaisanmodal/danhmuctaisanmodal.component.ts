import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { mapArrayForDropDown, validVariable } from '../../../../../services/globalfunction';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../../services/callApiSanXuat';
import { DanhmuctaisanService } from '../../../../../services/Taisan/danhmuctaisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadmodalComponent } from '../../../../modal/uploadmodal/uploadmodal.component';
import { API } from '../../../../../services/host';

@Component({
  selector: 'app-danhmuctaisanmodal',
  templateUrl: './danhmuctaisanmodal.component.html',
  styleUrls: ['./danhmuctaisanmodal.component.css']
})
export class DanhmuctaisanmodalComponent implements OnInit {

  public item: any = { listDinhMuc: [], listSanLuong: [] };
  public title: any = '';
  public type = '';
  listTaiSan: any = [];
  listLoaiNhienLieu: any = [];
  rawListLoaiNhienLieu: any = [];
  paging: any = { Page: 1, TotalPages: 1, TotalCount: 1 };
  Keyword = "";

  constructor(
    public activeModal: NgbActiveModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private services: SanXuatService,
    public toastr: ToastrService,
    private _modal: NgbModal,
    private cdRef: ChangeDetectorRef,
  ) {
    this.item.isHoatDong = true;
  }

  ngOnInit(): void {
    this.GetListdmLoaiTaiSanForDanhMuc();
    this.GetListLoaiNhienLieu();

    const initialList = (this.item.listSanLuong && this.item.listSanLuong.length > 0)
      ? this.item.listSanLuong
      : (this.item.ListSanLuong && this.item.ListSanLuong.length > 0)
        ? this.item.ListSanLuong
        : (this.item.listDinhMuc && this.item.listDinhMuc.length > 0)
          ? this.item.listDinhMuc
          : [];
    this.initListDinhMuc(initialList);

    if (this.item.Id) {
      this._danhMucTaiSan.DanhMucTaiSan().ById(this.item.Id).subscribe((res: any) => {
        if (res && (res.Data || res)) {
          const data = res.Data || res;
          const rawSanLuong = (data.listSanLuong && data.listSanLuong.length > 0)
            ? data.listSanLuong
            : (data.ListSanLuong && data.ListSanLuong.length > 0)
              ? data.ListSanLuong
              : (data.listDinhMuc && data.listDinhMuc.length > 0)
                ? data.listDinhMuc
                : (data.ListDinhMuc && data.ListDinhMuc.length > 0)
                  ? data.ListDinhMuc
                  : (this.item.listSanLuong && this.item.listSanLuong.length > 0)
                    ? this.item.listSanLuong
                    : [];

          this.item = { ...this.item, ...data };
          this.initListDinhMuc(rawSanLuong);
          this.cdRef.detectChanges();
        }
      });
    }
  }

  mapRow(x: any) {
    return {
      ...x,
      Id: x.Id,
      Ten: x.Ten || x.TenCongViec || x.NoiDungCongViec || x.NoiDung || x.CongViec || '',
      TenCongViec: x.TenCongViec || x.Ten || x.NoiDungCongViec || x.NoiDung || x.CongViec || '',
      DonViTinh_NSMMTB: x.DonViTinh_NSMMTB || x.DonViTinh_SanLuong || x.DonViTinh || x.DonViTinhSanLuong || '',
      DonViTinh_SanLuong: x.DonViTinh_SanLuong || x.DonViTinh_NSMMTB || x.DonViTinh || x.DonViTinhSanLuong || '',
      DonViTinh: x.DonViTinh || x.DonViTinh_NSMMTB || x.DonViTinh_SanLuong || '',
      NSMMTB: x.NSMMTB !== undefined && x.NSMMTB !== null ? x.NSMMTB : (x.SanLuong !== undefined && x.SanLuong !== null ? x.SanLuong : (x.DinhMuc !== undefined && x.DinhMuc !== null ? x.DinhMuc : null)),
      SanLuong: x.SanLuong !== undefined && x.SanLuong !== null ? x.SanLuong : (x.NSMMTB !== undefined && x.NSMMTB !== null ? x.NSMMTB : (x.DinhMuc !== undefined && x.DinhMuc !== null ? x.DinhMuc : null)),
      DonViTinh_NSLD: x.DonViTinh_NSLD || x.DonViTinh_NhanCong || x.DonViTinhNhanCong || '',
      DonViTinh_NhanCong: x.DonViTinh_NhanCong || x.DonViTinh_NSLD || '',
      NSLD: x.NSLD !== undefined && x.NSLD !== null ? x.NSLD : (x.NhanCong !== undefined && x.NhanCong !== null ? x.NhanCong : null),
      NhanCong: x.NhanCong !== undefined && x.NhanCong !== null ? x.NhanCong : (x.NSLD !== undefined && x.NSLD !== null ? x.NSLD : null),
      IddmLoaiNhienLieu: x.IddmLoaiNhienLieu || x.IdLoaiNhienLieu || x.IdNhienLieu || null,
      TendmLoaiNhienLieu: x.TendmLoaiNhienLieu || x.TenLoaiNhienLieu || '',
      DonViTinh_NhienLieu: x.DonViTinh_NhienLieu || x.DonViTinhNhienLieu || '',
      MucTieuHao: x.MucTieuHao !== undefined && x.MucTieuHao !== null ? x.MucTieuHao : (x.NhienLieu !== undefined && x.NhienLieu !== null ? x.NhienLieu : (x.TieuHao !== undefined && x.TieuHao !== null ? x.TieuHao : null)),
      NhienLieu: x.NhienLieu !== undefined && x.NhienLieu !== null ? x.NhienLieu : (x.MucTieuHao !== undefined && x.MucTieuHao !== null ? x.MucTieuHao : (x.TieuHao !== undefined && x.TieuHao !== null ? x.TieuHao : null)),
      GhiChu: x.GhiChu || ''
    };
  }

  initListDinhMuc(sourceArray?: any[]) {
    let list = sourceArray;
    if (!list || !Array.isArray(list) || list.length === 0) {
      if (Array.isArray(this.item.listSanLuong) && this.item.listSanLuong.length > 0) {
        list = this.item.listSanLuong;
      } else if (Array.isArray(this.item.ListSanLuong) && this.item.ListSanLuong.length > 0) {
        list = this.item.ListSanLuong;
      } else if (Array.isArray(this.item.listDinhMuc) && this.item.listDinhMuc.length > 0) {
        list = this.item.listDinhMuc;
      } else if (Array.isArray(this.item.ListDinhMuc) && this.item.ListDinhMuc.length > 0) {
        list = this.item.ListDinhMuc;
      } else {
        list = [];
      }
    }

    if (Array.isArray(list) && list.length > 0) {
      this.item.listDinhMuc = list.map((x: any) => this.mapRow(x));
    } else {
      this.item.listDinhMuc = [];
    }
    this.item.listSanLuong = this.item.listDinhMuc;
    this.syncLoaiNhienLieuForRows();
  }

  syncLoaiNhienLieuForRows() {
    if (!this.item.listDinhMuc || !Array.isArray(this.item.listDinhMuc)) return;
    this.item.listDinhMuc.forEach((row: any) => {
      if (this.listLoaiNhienLieu && this.listLoaiNhienLieu.length > 0) {
        if (row.IddmLoaiNhienLieu && !row.TendmLoaiNhienLieu) {
          const found = this.listLoaiNhienLieu.find((x: any) => x.value === row.IddmLoaiNhienLieu);
          if (found) row.TendmLoaiNhienLieu = found.label;
        } else if (!row.IddmLoaiNhienLieu && row.TendmLoaiNhienLieu) {
          const found = this.listLoaiNhienLieu.find((x: any) => x.label?.toLowerCase() === row.TendmLoaiNhienLieu?.trim().toLowerCase());
          if (found) row.IddmLoaiNhienLieu = found.value;
        }
      }
      if (this.rawListLoaiNhienLieu && this.rawListLoaiNhienLieu.length > 0 && row.IddmLoaiNhienLieu && !row.DonViTinh_NhienLieu) {
        const raw = this.rawListLoaiNhienLieu.find((x: any) => x.Id === row.IddmLoaiNhienLieu);
        if (raw && (raw.DonViTinh || raw.DonViTinh_NhienLieu)) {
          row.DonViTinh_NhienLieu = raw.DonViTinh || raw.DonViTinh_NhienLieu;
        }
      }
    });
  }

  GetListdmLoaiTaiSanForDanhMuc() {
    this._danhMucTaiSan.DanhMucLoaiTaiSan().GetListdmLoaiTaiSanForDanhMuc({ CurrentPage: 0 }).subscribe((res: any) => {
      this.listTaiSan = mapArrayForDropDown(res.Data, "Ten", "Id");
    });
  }

  GetListLoaiNhienLieu() {
    this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      const items = res.Data?.Items || res.Data || res.items || res || [];
      this.rawListLoaiNhienLieu = items;
      this.listLoaiNhienLieu = mapArrayForDropDown(items, 'Ten', 'Id');
      this.syncLoaiNhienLieuForRows();
      this.cdRef.detectChanges();
    });
  }

  onChangeLoaiNhienLieu(row: any) {
    if (this.listLoaiNhienLieu && row.IddmLoaiNhienLieu) {
      const selected = this.listLoaiNhienLieu.find((x: any) => x.value === row.IddmLoaiNhienLieu);
      if (selected) {
        row.TendmLoaiNhienLieu = selected.label;
      }
      if (this.rawListLoaiNhienLieu?.length) {
        const raw = this.rawListLoaiNhienLieu.find((x: any) => x.Id === row.IddmLoaiNhienLieu);
        if (raw && (raw.DonViTinh || raw.DonViTinh_NhienLieu)) {
          if (!row.DonViTinh_NhienLieu) {
            row.DonViTinh_NhienLieu = raw.DonViTinh || raw.DonViTinh_NhienLieu;
          }
        }
      }
    } else {
      row.TendmLoaiNhienLieu = '';
    }
  }

  addDinhMuc() {
    if (!Array.isArray(this.item.listDinhMuc)) {
      this.item.listDinhMuc = [];
    }
    const newRow = {
      Ten: '',
      TenCongViec: '',
      DonViTinh_NSMMTB: '',
      DonViTinh_SanLuong: '',
      DonViTinh: '',
      NSMMTB: null,
      SanLuong: null,
      DonViTinh_NSLD: '',
      DonViTinh_NhanCong: '',
      NSLD: null,
      NhanCong: null,
      IddmLoaiNhienLieu: null,
      TendmLoaiNhienLieu: '',
      DonViTinh_NhienLieu: '',
      MucTieuHao: null,
      NhienLieu: null,
      GhiChu: ''
    };
    this.item.listDinhMuc.push(newRow);
    this.item.listSanLuong = this.item.listDinhMuc;
  }

  deleteDinhMuc(index: number) {
    if (this.item.listDinhMuc && index >= 0 && index < this.item.listDinhMuc.length) {
      this.item.listDinhMuc.splice(index, 1);
      this.item.listSanLuong = this.item.listDinhMuc;
    }
  }

  nhapExcel() {
    let modalRef = this._modal.open(UploadmodalComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.onlyExcel = true;
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.title = 'Nhập định mức từ Excel';
    modalRef.result.then((res: any) => {
      if (res) {
        let fileName = res?.Name || res?.[0]?.Name || res?.[0]?.[0]?.Name || (typeof res === 'string' ? res : '');
        if (fileName) {
          this.toastr.info('Đang xử lý tệp: ' + fileName);
          this._danhMucTaiSan.DanhMucTaiSan().ImportDinhMucSanLuong(fileName, this.item.Id).subscribe((resImport: any) => {
            if (resImport && (resImport.StatusCode === 200 || !resImport.StatusCode)) {
              this.toastr.success(resImport.Message || 'Nhập định mức từ Excel thành công!');
              const importedData = resImport.Data || resImport.Items || resImport.items || (Array.isArray(resImport) ? resImport : []);
              if (Array.isArray(importedData) && importedData.length > 0) {
                const mappedList = importedData.map((x: any) => this.mapRow(x));
                if (!this.item.listDinhMuc || this.item.listDinhMuc.length === 0 || (this.item.listDinhMuc.length === 1 && !this.item.listDinhMuc[0].Ten)) {
                  this.item.listDinhMuc = mappedList;
                } else {
                  this.item.listDinhMuc = [...this.item.listDinhMuc, ...mappedList];
                }
                this.item.listSanLuong = this.item.listDinhMuc;
                this.syncLoaiNhienLieuForRows();
                this.cdRef.detectChanges();
              }
            } else {
              this.toastr.error(resImport?.Message || 'Nhập Excel thất bại!');
            }
          }, (err: any) => {
            this.toastr.error('Có lỗi xảy ra khi nhập dữ liệu Excel!');
          });
        }
      }
    }).catch((er) => {});
  }

  xuatExcel() {
    this._danhMucTaiSan.DanhMucTaiSan().ExportFileMauDinhMucSanLuong({ Id: this.item.Id || '' }).subscribe((res: any) => {
      if (res) {
        const file = res.Data || res.FileUrl || (typeof res === 'string' ? res : null);
        if (file) {
          const downloadUrl = file.startsWith('http')
            ? file
            : `${API.imgURL}${file.startsWith('/') ? '' : '/'}${file}`;
          window.open(downloadUrl);
          this.toastr.success(res.Message || 'Xuất file mẫu thành công!');
        } else if (res.StatusCode === 200) {
          this.toastr.success(res.Message || 'Xuất file mẫu thành công!');
        } else {
          this.toastr.error(res.Message || 'Xuất file không thành công!');
        }
      }
    }, (err: any) => {
      this.toastr.error('Có lỗi xảy ra khi xuất file!');
    });
  }

  ValidateData() {
    if (!validVariable(this.item.Ma) || (typeof this.item.Ma === 'string' && this.item.Ma.trim() === '')) {
      this.toastr.error("Vui lòng nhập mã!");
      return false;
    }
    if (typeof this.item.Ma === 'string' && this.item.Ma.trim().startsWith('.')) {
      this.toastr.error("Mã không được bắt đầu bằng dấu chấm '.'!");
      return false;
    }
    if (!validVariable(this.item.Ten) || (typeof this.item.Ten === 'string' && this.item.Ten.trim() === '')) {
      this.toastr.error("Vui lòng nhập tên!");
      return false;
    }
    if (!validVariable(this.item.IddmLoaiTaiSan)) {
      this.toastr.error("Yêu cầu chọn loại máy/thiết bị/vật tư!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.ValidateData()) {
      if (Array.isArray(this.item.listDinhMuc)) {
        this.item.listDinhMuc.forEach((row: any) => {
          row.TenCongViec = row.TenCongViec || row.Ten;
          row.Ten = row.Ten || row.TenCongViec;
          row.SanLuong = row.NSMMTB !== undefined && row.NSMMTB !== null ? row.NSMMTB : row.SanLuong;
          row.NSMMTB = row.SanLuong !== undefined && row.SanLuong !== null ? row.SanLuong : row.NSMMTB;
          row.NhienLieu = row.MucTieuHao !== undefined && row.MucTieuHao !== null ? row.MucTieuHao : row.NhienLieu;
          row.MucTieuHao = row.NhienLieu !== undefined && row.NhienLieu !== null ? row.NhienLieu : row.MucTieuHao;
          row.DonViTinh_SanLuong = row.DonViTinh_NSMMTB || row.DonViTinh_SanLuong || row.DonViTinh;
          row.DonViTinh = row.DonViTinh_NSMMTB || row.DonViTinh;
          row.NhanCong = row.NSLD !== undefined && row.NSLD !== null ? row.NSLD : row.NhanCong;
          row.NSLD = row.NhanCong !== undefined && row.NhanCong !== null ? row.NhanCong : row.NSLD;
          row.DonViTinh_NhanCong = row.DonViTinh_NSLD || row.DonViTinh_NhanCong;
          row.DonViTinh_NSLD = row.DonViTinh_NhanCong || row.DonViTinh_NSLD;
        });
        this.item.listSanLuong = this.item.listDinhMuc;
      }
      this._danhMucTaiSan.DanhMucTaiSan().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode !== 200) {
          this.toastr.error(res.Message);
        } else {
          this.toastr.success(res.Message);
          this.activeModal.close();
        }
      });
    }
  }
}
