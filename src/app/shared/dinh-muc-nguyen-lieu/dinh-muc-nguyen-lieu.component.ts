import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalthongbaoComponent } from '../../quantri/modal/modalthongbao/modalthongbao.component';
import { DanhmuctaisanService } from '../../services/Taisan/danhmuctaisan.service';
import { generateGuid, mapArrayForDropDown } from '../../services/globalfunction';

@Component({
  selector: 'app-dinh-muc-nguyen-lieu',
  templateUrl: './dinh-muc-nguyen-lieu.component.html',
  styleUrls: ['./dinh-muc-nguyen-lieu.component.css']
})
export class DinhMucNguyenLieuComponent implements OnInit, OnChanges {

  @Input('Items') Items: any = [];
  @Input() listSanLuong: any = [];
  @Input() isXoa: boolean = true;
  @Output('Items') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() listSanLuongChange: EventEmitter<any> = new EventEmitter<any>();
  
  listLoaiNhienLieu: any = [];
  rawLoaiNhienLieu: any = [];
  flatRows: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    public _modal: NgbModal,
    private _danhMucTaiSan: DanhmuctaisanService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Items'] || changes['listSanLuong']) {
      this.initializeNestedData();
      this.syncDonViTinh();
    }
  }

  ngOnInit(): void {
    this.Items = this.Items ? this.Items : [];
    this.listSanLuong = this.listSanLuong ? this.listSanLuong : [];
    this.getListLoaiNhienLieu();
    this.initializeNestedData();
  }

  getListLoaiNhienLieu() {
    this._danhMucTaiSan.LoaiNhienLieu().GetList({ CurrentPage: 0 }).subscribe((res: any) => {
      this.rawLoaiNhienLieu = res.Data || [];
      this.listLoaiNhienLieu = mapArrayForDropDown(res.Data, 'Ten', 'Id');
      this.syncDonViTinh();
    })
  }

  syncDonViTinh() {
    if (!this.rawLoaiNhienLieu || this.rawLoaiNhienLieu.length === 0) return;
    if (this.listSanLuong && this.listSanLuong.length > 0) {
      this.listSanLuong.forEach((sl: any) => {
        if (sl.IddmLoaiNhienLieu) {
          const found = this.rawLoaiNhienLieu.find((x: any) => x.Id === sl.IddmLoaiNhienLieu);
          if (found) {
            sl.DonViTinh_NhienLieu = found.DonViTinh || '';
            sl.TendmLoaiNhienLieu = found.Ten || '';
          }
        }
        if (sl.listItem && sl.listItem.length > 0) {
          sl.listItem.forEach((child: any) => {
            if (child.IddmLoaiNhienLieu) {
              const found = this.rawLoaiNhienLieu.find((x: any) => x.Id === child.IddmLoaiNhienLieu);
              if (found) {
                child.DonViTinh_NhienLieu = found.DonViTinh || '';
                child.TendmLoaiNhienLieu = found.Ten || '';
              }
            }
          });
        }
      });
    }
  }

  onChangeLoaiNhienLieu(item: any, event?: any) {
    const id = event ? event.value : item.IddmLoaiNhienLieu;
    if (item && id && this.rawLoaiNhienLieu) {
      const selected = this.rawLoaiNhienLieu.find((x: any) => x.Id === id);
      if (selected) {
        item.DonViTinh_NhienLieu = selected.DonViTinh || '';
        item.TendmLoaiNhienLieu = selected.Ten || '';
      }
    } else if (item && !id) {
      item.DonViTinh_NhienLieu = '';
      item.TendmLoaiNhienLieu = '';
    }
    this.changeData();
  }

  initializeNestedData() {
    this.listSanLuong = this.listSanLuong || [];
    this.Items = this.Items || [];

    // 1. Ensure all parents have unique identifiers (Id or IdGuid)
    this.listSanLuong.forEach((sl: any) => {
      if (!sl.Id && !sl.IdGuid) {
        sl.IdGuid = generateGuid();
      }
      sl.listItem = sl.listItem || [];
    });

    // 2. Distribute flat Items into parents based on foreign keys ONLY if parents don't have real nested child items
    const hasNested = this.listSanLuong.some((sl: any) => sl.listItem && sl.listItem.some((dm: any) => dm.Id || dm.IddmLoaiNhienLieu));
    
    if (!hasNested && this.Items && this.Items.length > 0) {
      // Clear placeholders/empty arrays before distributing
      this.listSanLuong.forEach((sl: any) => {
        sl.listItem = [];
      });

      const firstItem = this.Items[0];
      if ('IdSanLuong' in firstItem || 'IdGuidSanLuong' in firstItem) {
        this.Items.forEach((dm: any) => {
          const parentId = dm.IdSanLuong || dm.IdGuidSanLuong;
          const parent = this.listSanLuong.find((sl: any) => (sl.Id && sl.Id === parentId) || (sl.IdGuid && sl.IdGuid === parentId));
          if (parent) {
            parent.listItem.push(dm);
          }
        });
      } else {
        // Fallback: put all items under the first SanLuong item
        if (this.listSanLuong.length > 0) {
          this.listSanLuong[0].listItem = [...this.Items];
        }
      }
    }

    // 3. If there are items but listSanLuong was empty, create a default parent
    if (this.listSanLuong.length === 0 && this.Items && this.Items.length > 0) {
      const defaultParent = {
        IdGuid: generateGuid(),
        Ten: '',
        DonViTinh_SanLuong: '',
        SanLuong: null,
        IddmLoaiNhienLieu: null,
        DonViTinh_NhienLieu: '',
        NhienLieu: null,
        SoCa: null,
        SoNgay: null,
        SoThang: null,
        GhiChu: '',
        listItem: [...this.Items]
      };
      this.listSanLuong.push(defaultParent);
    }

    this.buildFlatRows();
  }

  buildFlatRows() {
    const rows: any[] = [];
    this.listSanLuong.forEach((parent: any, pIdx: number) => {
      if (parent.isExpanded === undefined) {
        parent.isExpanded = true;
      }
      
      // 1. Always push the parent row itself
      rows.push({
        isParent: true,
        parentItem: parent,
        childItem: null,
        parentIndex: pIdx,
        childIndex: -1
      });

      // 2. Push child rows below the parent row if expanded
      const children = parent.listItem || [];
      if (parent.isExpanded && children.length > 0) {
        children.forEach((child: any, cIdx: number) => {
          rows.push({
            isParent: false,
            parentItem: parent,
            childItem: child,
            parentIndex: pIdx,
            childIndex: cIdx
          });
        });
      }
    });
    console.log('Generated flatRows:', rows);
    this.flatRows = rows;
  }

  changeData() {
    // 1. Flatten the nested child items into the flat list (Items)
    const flatList: any[] = [];
    this.listSanLuong.forEach((sl: any) => {
      if (sl.listItem) {
        sl.listItem.forEach((dm: any) => {
          dm.IdSanLuong = sl.Id || null;
          dm.IdGuidSanLuong = sl.IdGuid || null;
          flatList.push(dm);
        });
      }
    });

    // Update Items reference in-place
    this.Items.splice(0, this.Items.length, ...flatList);

    // Rebuild the display representation
    this.buildFlatRows();

    // Emit changes
    this.itemChange.emit(this.Items);
    this.listSanLuongChange.emit(this.listSanLuong);
  }

  addParent() {
    const newParent = {
      IdGuid: generateGuid(),
      Ten: '',
      DonViTinh_SanLuong: '',
      SanLuong: null,
      IddmLoaiNhienLieu: null,
      DonViTinh_NhienLieu: '',
      NhienLieu: null,
      SoCa: null,
      SoNgay: null,
      SoThang: null,
      GhiChu: '',
      listItem: []
    };
    this.listSanLuong.push(newParent);
    this.changeData();
  }

  addChild(parent: any) {
    parent.listItem = parent.listItem || [];
    parent.listItem.push({
      IdGuidSanLuong: parent.IdGuid || null,
      IdSanLuong: parent.Id || null
    });
    this.changeData();
  }

  deleteParent(parentIndex: number) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa sản lượng này và các định mức nhiên liệu đi kèm?';
    modalRef.result.then(() => {
      this.listSanLuong.splice(parentIndex, 1);
      this.changeData();
    }).catch(er => console.log(er));
  }

  deleteChild(parent: any, childIndex: number) {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = 'Bạn có chắc chắn muốn xóa định mức nhiên liệu này?';
    modalRef.result.then(() => {
      parent.listItem.splice(childIndex, 1);
      this.changeData();
    }).catch(er => console.log(er));
  }

  trackByRow(index: number, row: any) {
    if (!row) return null;
    const parentKey = row.parentItem?.Id || row.parentItem?.IdGuid || `parent-${row.parentIndex}`;
    const childKey = row.childItem?.Id || row.childItem?.IdGuid || `child-${row.childIndex}`;
    return `${parentKey}_${row.isParent}_${childKey}`;
  }

  toggleExpand(parent: any) {
    parent.isExpanded = !parent.isExpanded;
    this.buildFlatRows();
  }

}

