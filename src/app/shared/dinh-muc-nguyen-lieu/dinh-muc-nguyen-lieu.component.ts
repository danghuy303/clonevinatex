import { buildDinhMucTree, visitDinhMucRows, removeDinhMucRow } from './dinh-muc-tree';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DanhmuctaisanService } from '../../services/Taisan/danhmuctaisan.service';
import { TaisanService } from '../../services/Taisan/taisan.service';
import { generateGuid, mapArrayForDropDown, validVariable } from '../../services/globalfunction';
import { UploadmodalComponent } from '../../quantri/modal/uploadmodal/uploadmodal.component';
import { API } from '../../services/host';
import { ChonComponent } from '../../quantri/taisan/screen/chon/chon.component';

@Component({
  selector: 'app-dinh-muc-nguyen-lieu',
  templateUrl: './dinh-muc-nguyen-lieu.component.html',
  styleUrls: ['./dinh-muc-nguyen-lieu.component.css']
})
export class DinhMucNguyenLieuComponent implements OnInit, OnChanges {

  @Input('Items') Items: any = [];
  @Input() listSanLuong: any = [];
  @Input() itemTaiSan: any = {};
  @Input() idTaiSan: any = '';
  @Input() isXoa: boolean = true;
  @Input() showExportExcel: boolean = true;
  dinhMucTree: any[] = [];
  @Output('ItemsChange') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() listSanLuongChange: EventEmitter<any> = new EventEmitter<any>();

  listLoaiNhienLieu: any = [];
  rawLoaiNhienLieu: any = [];
  private isInternalChange = false;

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService,
    private _serviceTaiSan: TaisanService,
    private toastr: ToastrService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInternalChange) {
      this.isInternalChange = false;
      return;
    }
    const slChange = changes['listSanLuong'];
    const itemsChange = changes['Items'];
    if ((slChange && slChange.currentValue) || (itemsChange && itemsChange.currentValue)) {
      this.initializeData();
    }
  }

  ngOnInit(): void {
    this.getListLoaiNhienLieu();
    this.initializeData();
  }

  trackByRow(index: number, row: any) {
    return row ? (row._uid || row.Id || index) : index;
  }

  rebuildDinhMucTree() {
    this.dinhMucTree = buildDinhMucTree(this.listSanLuong, this.dinhMucTree, () => generateGuid());
  }

  getListLoaiNhienLieu() {
    this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      const items = res.Data?.Items || res.Data || res.items || res || [];
      this.rawLoaiNhienLieu = items;
      this.listLoaiNhienLieu = mapArrayForDropDown(items, 'Ten', 'Id');
      this.syncDonViTinh();
      this.cdRef.detectChanges();
    });
  }

  syncDonViTinh() {
    if (!this.rawLoaiNhienLieu || this.rawLoaiNhienLieu.length === 0) return;
    if (this.listSanLuong && this.listSanLuong.length > 0) {
      visitDinhMucRows(this.listSanLuong, (sl: any) => {
        if (sl.IddmLoaiNhienLieu) {
          const found = this.rawLoaiNhienLieu.find((x: any) => x.Id === sl.IddmLoaiNhienLieu);
          if (found) {
            if (!validVariable(sl.DonViTinh_NhienLieu) || (typeof sl.DonViTinh_NhienLieu === 'string' && sl.DonViTinh_NhienLieu.trim() === '')) {
              sl.DonViTinh_NhienLieu = found.DonViTinh || '';
            }
            if (!sl.TendmLoaiNhienLieu) {
              sl.TendmLoaiNhienLieu = found.Ten || '';
            }
          }
        }
      });
    }
  }

  onChangeLoaiNhienLieu(row: any) {
    if (row && row.IddmLoaiNhienLieu && this.rawLoaiNhienLieu) {
      const selected = this.rawLoaiNhienLieu.find((x: any) => x.Id === row.IddmLoaiNhienLieu);
      if (selected) {
        row.DonViTinh_NhienLieu = selected.DonViTinh || '';
        row.TendmLoaiNhienLieu = selected.Ten || '';
      }
    } else if (row) {
      row.DonViTinh_NhienLieu = '';
      row.TendmLoaiNhienLieu = '';
    }
    this.syncRow(row);
  }

  initializeData() {
    let source = this.listSanLuong;
    if (!source || !Array.isArray(source) || source.length === 0) {
      if (this.Items && Array.isArray(this.Items) && this.Items.length > 0) {
        source = this.Items;
      }
    }

    if (Array.isArray(source) && source.length > 0) {
      this.listSanLuong = source.map((x: any) => this.mapRow(x));
    } else if (!Array.isArray(this.listSanLuong)) {
      this.listSanLuong = [];
    }

    this.rebuildDinhMucTree();
    this.syncDonViTinh();
  }

  mapRow(x: any) {
    const isTuDanhMuc = x.isTuDanhMuc !== undefined
      ? x.isTuDanhMuc
      : (x.isNgoaiDanhMuc !== undefined ? !x.isNgoaiDanhMuc : true);

    return {
      ...x,
      _uid: x._uid || generateGuid(),
      Id: x.Id || null,
      isTuDanhMuc: isTuDanhMuc,
      isNgoaiDanhMuc: !isTuDanhMuc,
      Ten: x.Ten || x.TenCongViec || '',
      TenCongViec: x.TenCongViec || x.Ten || '',
      DonViTinh_NSMMTB: x.DonViTinh_NSMMTB || x.DonViTinh_SanLuong || x.DonViTinh || '',
      DonViTinh_SanLuong: x.DonViTinh_SanLuong || x.DonViTinh_NSMMTB || x.DonViTinh || '',
      DonViTinh: x.DonViTinh || x.DonViTinh_NSMMTB || x.DonViTinh_SanLuong || '',
      NSMMTB: x.NSMMTB !== undefined && x.NSMMTB !== null ? x.NSMMTB : (x.SanLuong !== undefined && x.SanLuong !== null ? x.SanLuong : (x.DinhMuc !== undefined && x.DinhMuc !== null ? x.DinhMuc : null)),
      SanLuong: x.SanLuong !== undefined && x.SanLuong !== null ? x.SanLuong : (x.NSMMTB !== undefined && x.NSMMTB !== null ? x.NSMMTB : (x.DinhMuc !== undefined && x.DinhMuc !== null ? x.DinhMuc : null)),
      DonViTinh_NSLD: x.DonViTinh_NSLD || x.DonViTinh_NhanCong || '',
      DonViTinh_NhanCong: x.DonViTinh_NhanCong || x.DonViTinh_NSLD || '',
      NSLD: x.NSLD !== undefined && x.NSLD !== null ? x.NSLD : (x.NhanCong !== undefined && x.NhanCong !== null ? x.NhanCong : null),
      NhanCong: x.NhanCong !== undefined && x.NhanCong !== null ? x.NhanCong : (x.NSLD !== undefined && x.NSLD !== null ? x.NSLD : null),
      IddmLoaiNhienLieu: x.IddmLoaiNhienLieu || null,
      TendmLoaiNhienLieu: x.TendmLoaiNhienLieu || x.TenLoaiNhienLieu || '',
      DonViTinh_NhienLieu: x.DonViTinh_NhienLieu || '',
      MucTieuHao: x.MucTieuHao !== undefined && x.MucTieuHao !== null ? x.MucTieuHao : (x.NhienLieu !== undefined && x.NhienLieu !== null ? x.NhienLieu : null),
      NhienLieu: x.NhienLieu !== undefined && x.NhienLieu !== null ? x.NhienLieu : (x.MucTieuHao !== undefined && x.MucTieuHao !== null ? x.MucTieuHao : null),
      SoCa: x.SoCa !== undefined && x.SoCa !== null ? x.SoCa : 2,
      SoNgay: x.SoNgay !== undefined && x.SoNgay !== null ? x.SoNgay : 26,
      SoThang: x.SoThang !== undefined && x.SoThang !== null ? x.SoThang : 12,
      GhiChu: x.GhiChu || '',
      listItem: Array.isArray(x.listItem) ? x.listItem.map(child => this.mapRow(child)) : []
    };
  }

  syncRow(row: any) {
    if (!row) return;
    row.TenCongViec = row.Ten;
    row.SanLuong = row.NSMMTB;
    row.NhanCong = row.NSLD;
    row.NhienLieu = row.NhienLieu !== undefined && row.NhienLieu !== null ? row.NhienLieu : row.MucTieuHao;
    row.MucTieuHao = row.NhienLieu;
    row.DinhMucNhienLieu = row.NhienLieu;
    row.DonViTinh_SanLuong = row.DonViTinh_SanLuong || row.DonViTinh_NSMMTB;
    row.DonViTinh_NSMMTB = row.DonViTinh_SanLuong;
    row.DonViTinh = row.DonViTinh_SanLuong;
    row.DonViTinh_NhanCong = row.DonViTinh_NSLD;
    this.isInternalChange = true;
    this.listSanLuongChange.emit(this.listSanLuong);
    this.itemChange.emit(this.listSanLuong);
  }

  layDinhMucTuDanhMuc() {
    const idDanhMuc = this.itemTaiSan?.IddmTaiSan || this.itemTaiSan?.IdTaiSan || this.idTaiSan;
    if (idDanhMuc) {
      this.loadFromDanhMucId(idDanhMuc);
    } else if (this.itemTaiSan?.Id) {
      this.loadFromDanhMucId(this.itemTaiSan.Id);
    } else {
      try {
        let modalRef = this._modal.open(ChonComponent, { size: 'xl', backdrop: 'static' });
        modalRef.result.then((res: any) => {
          if (res && res[0]?.Id) {
            if (this.itemTaiSan) {
              this.itemTaiSan.IddmTaiSan = res[0].Id;
              this.itemTaiSan.TendmTaiSan = res[0].Ten;
            }
            this.loadFromDanhMucId(res[0].Id);
          }
        }).catch(() => {});
      } catch (e) {
        this.toastr.warning('Vui lòng chọn Tên MMTB/Nhóm máy ở Thông tin chung trước khi lấy định mức!');
      }
    }
  }

  loadFromDanhMucId(id: string) {
    this._danhMucTaiSan.DanhMucTaiSan().ById(id).subscribe((res: any) => {
      let rawList: any[] = [];
      if (res) {
        const data = res.Data || res;
        rawList = data.listSanLuong || data.ListSanLuong || data.listDinhMuc || data.ListDinhMuc || [];
      }
      if (!rawList || rawList.length === 0) {
        this._serviceTaiSan.GetSanLuongMay(id).subscribe((resMay: any) => {
          const listMay = resMay?.Data || resMay || [];
          this.mergeDinhMucFromCatalog(listMay);
        }, () => {
          this.toastr.warning('Không tìm thấy dữ liệu định mức trong danh mục!');
        });
      } else {
        this.mergeDinhMucFromCatalog(rawList);
      }
    }, () => {
      this._serviceTaiSan.GetSanLuongMay(id).subscribe((resMay: any) => {
        const listMay = resMay?.Data || resMay || [];
        this.mergeDinhMucFromCatalog(listMay);
      }, () => {
        this.toastr.error('Có lỗi xảy ra khi tải định mức từ danh mục!');
      });
    });
  }

  mergeDinhMucFromCatalog(catalogItems: any[]) {
    if (!catalogItems || catalogItems.length === 0) {
      this.toastr.warning('Danh mục chưa có cấu hình định mức cho loại máy này!');
      return;
    }

    if (!Array.isArray(this.listSanLuong)) {
      this.listSanLuong = [];
    }

    let addedCount = 0;
    const merge = (source: any[], target: any[], parentId: any = null) => source.forEach(item => {
      const ten = (item.Ten || item.TenCongViec || '').trim();
      const existing = target.find(row => (item.Id && row.Id === item.Id) ||
        (row.Ten || row.TenCongViec || '').trim().toLowerCase() === ten.toLowerCase());
      if (existing) {
        merge(item.listItem || [], existing.listItem, existing.Id);
      } else {
        const copy = (row: any, idParent: any) => {
          const mapped = this.mapRow({ ...row, isTuDanhMuc: true, isNgoaiDanhMuc: false });
          mapped.Id = mapped.Id || generateGuid();
          mapped.IdParent = idParent;
          mapped.listItem = (row.listItem || []).map(child => copy(child, mapped.Id));
          addedCount++;
          return mapped;
        };
        target.push(copy(item, parentId));
      }
    });
    const source = catalogItems.map(item => this.mapRow(item));
    buildDinhMucTree(source, [], () => generateGuid());
    merge(source, this.listSanLuong);

    this.syncDonViTinh();
    this.changeData();
    this.cdRef.detectChanges();

    if (addedCount > 0) {
      this.toastr.success(`Đã lấy ${addedCount} dòng định mức từ danh mục thành công!`);
    } else {
      this.toastr.info('Các định mức từ danh mục đã có đầy đủ trong bảng!');
    }
  }

  addDinhMuc(parent?: any) {
    if (parent && parent.data.IdParent) return;
    if (!Array.isArray(this.listSanLuong)) {
      this.listSanLuong = [];
    }
    const newRow = {
      _uid: generateGuid(),
      Id: generateGuid(),
      IdParent: parent ? parent.data.Id : null,
      isTuDanhMuc: false,
      isNgoaiDanhMuc: true,
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
      SoCa: 2,
      SoNgay: 26,
      SoThang: 12,
      GhiChu: '',
      listItem: []
    };
    if (parent) {
      parent.data.listItem.push(newRow);
    } else {
      this.listSanLuong.push(newRow);
    }
    if (parent) parent.expanded = true;
    this.rebuildDinhMucTree();
    this.isInternalChange = true;
    this.listSanLuongChange.emit(this.listSanLuong);
    this.itemChange.emit(this.listSanLuong);
    this.cdRef.detectChanges();
  }

  deleteRow(node: any) {
    removeDinhMucRow(this.listSanLuong, node.data);
    this.changeData();
    this.cdRef.detectChanges();
  }

  nhapExcel() {
    let modalRef = this._modal.open(UploadmodalComponent, { backdrop: 'static' });
    modalRef.componentInstance.onlyExcel = true;
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.title = 'Nhập định mức từ Excel';
    modalRef.result.then((res: any) => {
      if (res) {
        let fileName = res?.Name || res?.[0]?.Name || res?.[0]?.[0]?.Name || (typeof res === 'string' ? res : '');
        if (fileName) {
          this.toastr.info('Đang xử lý tệp: ' + fileName);
          const id = this.idTaiSan || this.itemTaiSan?.IddmTaiSan || this.itemTaiSan?.Id || '';
          this._danhMucTaiSan.DanhMucTaiSan().ImportDinhMucSanLuong(fileName, id).subscribe((resImport: any) => {
            if (resImport && (resImport.StatusCode === 200 || !resImport.StatusCode)) {
              this.toastr.success(resImport.Message || 'Nhập định mức từ Excel thành công!');
              const importedData = resImport.Data || resImport.Items || resImport.items || (Array.isArray(resImport) ? resImport : []);
              if (Array.isArray(importedData) && importedData.length > 0) {
                const mappedList = importedData.map((x: any) => this.mapRow(x));
                if (!this.listSanLuong || this.listSanLuong.length === 0 || (this.listSanLuong.length === 1 && !this.listSanLuong[0].Ten)) {
                  this.listSanLuong = mappedList;
                } else {
                  this.listSanLuong = [...this.listSanLuong, ...mappedList];
                }
                this.syncDonViTinh();
                this.changeData();
                this.cdRef.detectChanges();
              }
            } else {
              this.toastr.error(resImport?.Message || 'Nhập Excel thất bại!');
            }
          }, () => {
            this.toastr.error('Có lỗi xảy ra khi nhập dữ liệu Excel!');
          });
        }
      }
    }).catch(() => {});
  }

  xuatExcel() {
    const id = this.idTaiSan || this.itemTaiSan?.IddmTaiSan || this.itemTaiSan?.Id || '';
    this._danhMucTaiSan.DanhMucTaiSan().ExportFileMauDinhMucSanLuong({ Id: id, listDinhMuc: this.listSanLuong }).subscribe((res: any) => {
      if (res) {
        const file = res.Data || res.FileUrl || (typeof res === 'string' ? res : null);
        if (file) {
          const downloadUrl = file.startsWith('http')
            ? file
            : `${API.imgURL}${file.startsWith('/') ? '' : '/'}${file}`;
          window.open(downloadUrl);
          this.toastr.success(res.Message || 'Xuất file thành công!');
        } else if (res.StatusCode === 200) {
          this.toastr.success(res.Message || 'Xuất file thành công!');
        } else {
          this.toastr.error(res.Message || 'Xuất file không thành công!');
        }
      }
    }, () => {
      this.toastr.error('Có lỗi xảy ra khi xuất file!');
    });
  }

  changeData() {
    this.rebuildDinhMucTree();
    if (Array.isArray(this.listSanLuong)) {
      visitDinhMucRows(this.listSanLuong, (row: any) => {
        row.TenCongViec = row.TenCongViec || row.Ten;
        row.Ten = row.Ten || row.TenCongViec;
        row.SanLuong = row.NSMMTB !== undefined && row.NSMMTB !== null ? row.NSMMTB : row.SanLuong;
        row.NSMMTB = row.SanLuong !== undefined && row.SanLuong !== null ? row.SanLuong : row.NSMMTB;
        row.NhienLieu = row.NhienLieu !== undefined && row.NhienLieu !== null ? row.NhienLieu : row.MucTieuHao;
        row.MucTieuHao = row.NhienLieu;
        row.DinhMucNhienLieu = row.NhienLieu;
        row.DonViTinh_SanLuong = row.DonViTinh_SanLuong || row.DonViTinh_NSMMTB || row.DonViTinh;
        row.DonViTinh_NSMMTB = row.DonViTinh_SanLuong;
        row.DonViTinh = row.DonViTinh_SanLuong;
        row.NhanCong = row.NSLD !== undefined && row.NSLD !== null ? row.NSLD : row.NhanCong;
        row.NSLD = row.NhanCong !== undefined && row.NhanCong !== null ? row.NhanCong : row.NSLD;
        row.DonViTinh_NhanCong = row.DonViTinh_NSLD || row.DonViTinh_NhanCong;
        row.DonViTinh_NSLD = row.DonViTinh_NhanCong || row.DonViTinh_NSLD;
      });
    }
    this.Items = this.listSanLuong;
    this.isInternalChange = true;
    this.listSanLuongChange.emit(this.listSanLuong);
    this.itemChange.emit(this.Items);
  }
}
