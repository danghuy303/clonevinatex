import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { vn } from 'src/app/services/const';
import { validVariable, mapTreeNodes } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ChonComponent } from '../chon/chon.component';

@Component({
  selector: 'app-thongtinthemmoitaisan',
  templateUrl: './thongtinthemmoitaisan.component.html',
  styleUrls: ['./thongtinthemmoitaisan.component.css']
})
export class ThongtinthemmoitaisanComponent implements OnInit, OnChanges {

  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  checkbutton: any = {};
  NameFile: any = "";
  listTinhTrangTaiSan_copy: any = [];
  qrcode: any = {
    size: 250
  };
  eTable: string = "QLTS_TaiSan_QuyTrinhNhap";
  IdTable: string = '';
  selectedBoPhanNode: any = null;
  listLoaiDongHo: any = [
    { label: 'Giờ hoạt động', value: 'Giờ hoạt động' },
    { label: 'Km', value: 'Km' },
    { label: 'Sản lượng', value: 'Sản lượng' }
  ];
  listPhanCap: any = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ];
  listDonViTienTe: any = [
    { label: 'USD', value: 'USD' },
    { label: 'VNĐ', value: 'VNĐ' },
    { label: 'KIP', value: 'KIP' }
  ];
  listCBNV: any[] = [];
  filteredCBNV: any[] = [];
  isLoadedCBNV: boolean = false;
  isLoadingCBNV: boolean = false;

  @Input('item') item: any = {};
  @Input('TaiSanChaCon') TaiSanChaCon: string = "";
  @Output('item') itemChange: EventEmitter<any> = new EventEmitter<any>();
  @Input('listPhanXuong') listPhanXuong: any = [];
  @Input('listLoaiTaiSan') listLoaiTaiSan: any = [];
  @Input('listCungSanXuat') listCungSanXuat: any = [];
  @Input('opt') opt: any = "";
  @Output() handleAsset = new EventEmitter();

  constructor(
    private _modal: NgbModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.opt === 'edit') {
      this.item.listFileDinhKem?.forEach(obj => {
        this.NameFile += `${obj.FileName}, `;
      });
      this.IdTable = this.item.IdTaiSan;
    }
    if (changes['listLoaiTaiSan'] && this.listLoaiTaiSan) {
      this.formatListLoaiTaiSan();
    }
    if (changes['item'] && this.item && this.item.IdDuAn) {
      if (!this.isLoadedCBNV && !this.isLoadingCBNV) {
        this.getListCBNV();
      }
    }
  }

  formatListLoaiTaiSan() {
    if (this.listLoaiTaiSan && this.listLoaiTaiSan.length) {
      this.listLoaiTaiSan = this.listLoaiTaiSan.map((ele: any) => {
        if (ele && ele.Ma && !ele.label?.startsWith(ele.Ma + ' - ')) {
          return {
            ...ele,
            label: `${ele.Ma} - ${ele.Ten || ele.label}`
          };
        }
        return ele;
      });
    }
  }

  ngOnInit() {
    this.getListCBNV();
    this.formatListLoaiTaiSan();
    if (!this.item.SoLuong) {
      this.item.SoLuong = 1;
    }
    if (!this.item.LoaiDongHo) {
      this.item.LoaiDongHo = 'Giờ hoạt động';
    }
    if (this.item.GiaTriDongHoHienTai === undefined || this.item.GiaTriDongHoHienTai === null) {
      this.item.GiaTriDongHoHienTai = 0;
    }
    if (this.item.PhanCap) {
      this.item.PhanCap = Number(this.item.PhanCap);
    }
    if (!this.item.DonViTienTe) {
      this.item.DonViTienTe = 'VNĐ';
    }
    if (this.item.DonViTienTe === 'VNĐ' && !this.item.TyGia) {
      this.item.TyGia = 1;
    }
  }

  changeDonViTienTe(e) {
    if (this.item.DonViTienTe === 'VNĐ') {
      this.item.TyGia = 1;
    }
  }

  chonBoPhan(e) {
    this.item.ThoiGianDuaVaoSuDung = null;
    this.item.ThoiGianDuaVaoSuDungUnix = 0;
    if (this.item.listTaiSan && this.item.listTaiSan[0]) {
      this.item.listTaiSan[0].ThoiGianDuaVaoSuDung = null;
      this.item.listTaiSan[0].ThoiGianDuaVaoSuDungUnix = 0;
    }
  }

  LayMa(e) {
    this.item.listLichBaoDuong = [];
    this.item.IddmTaiSan = this.item.IddmTaiSan ? this.item.IddmTaiSan : '';
    if (!validVariable(e.value)) {
      this.item.Ma = '';
      this.item.TendmTaiSan = '';
    } else {
      this._serviceTaiSan.NhapTaiSan().GetNextMaTaiSan(e.value).subscribe((res: any) => {
        if (res.StatusCode === 500) {
          this.toastr.error(res.Message);
        }
        else {
          this.item.Ma = res.Data;
        }
      })
    }
    this.handleAsset.emit(e.value)
  }

  edit(item) {
    this.item.GiaTriConLai = item.NguyenGia;
  }
  isCanDuTru() {
    this.item.isCanDuTru = true;
    this.item.isCanDuTru = false;
  }
  // taiLenFileDinhKem() {
  //   const modalRef = this._modal.open(UploadmodalComponent, { size: 'lg', backdrop: 'static' });
  //   modalRef.componentInstance.multiple = true;
  //   modalRef.componentInstance.type = '';
  //   modalRef.result.then((data) => {
  //     // this.item.listFileDinhKem = data;
  //     // this.item.listFileDinhKem.forEach(obj => {
  //     //   this.NameFile += `${obj.NameLocal}, `;
  //     // });
  //     this.item.listFileDinhKem = data;
  //     this.item.listFileDinhKem.forEach(obj => {
  //       obj.Id = '';
  //       obj.FileNameGUI = obj.Name;
  //       obj.FileName = obj.NameLocal;
  //       obj.Link = obj.Url;
  //       this.NameFile += `${obj.FileName}` + '; '; /// gắn tên vào NameFile 
  //     });
  //   }, (reason) => {

  //   });
  // }

  ChangeData() {
    this.itemChange.emit(this.item);
  }

  ngOnDestroy() {

  }
  ChonTaiSan() {
    let modalRef = this._modal.open(ChonComponent, {
      size: "xl",
      backdrop: "static",
    });

    // modalRef.componentInstance.listItemDaChon = this.item.listTaiSan ? this.item.listTaiSan.map(ele => ele.Id) : [];
    modalRef.componentInstance.ItemDaChon = this.item.IddmTaiSan ? this.item.IddmTaiSan : "";
    modalRef.componentInstance.item = this.item;
    modalRef.result.then((res: any) => {
      this.item.IddmTaiSan = res[0]?.Id;
      this.item.TendmTaiSan = res[0]?.Ten;
    })
      .catch((er) => {
      });
  }

  getListCBNV(callback?: () => void) {
    if (this.isLoadedCBNV || this.isLoadingCBNV) {
      if (callback) callback();
      return;
    }
    this.isLoadingCBNV = true;
    let currentStore = this._serviceTaiSan.store.getCurrent();
    let idDuAn = (this.item && validVariable(this.item.IdDuAn) && String(this.item.IdDuAn) !== '0')
      ? this.item.IdDuAn
      : (validVariable(currentStore) && String(currentStore) !== '0' ? currentStore : '');
    this._serviceTaiSan.GetListCBNVNganhXemayByIdDuAn(idDuAn).subscribe((res: any) => {
      this.isLoadingCBNV = false;
      this.isLoadedCBNV = true;
      let rawList: any[] = [];
      if (Array.isArray(res)) {
        rawList = res;
      } else if (res && Array.isArray(res.Data)) {
        rawList = res.Data;
      } else if (res && res.Data && Array.isArray(res.Data.Items)) {
        rawList = res.Data.Items;
      } else if (res && res.Data && Array.isArray(res.Data.Data)) {
        rawList = res.Data.Data;
      } else if (res && Array.isArray(res.Items)) {
        rawList = res.Items;
      } else if (res && Array.isArray(res.list)) {
        rawList = res.list;
      } else if (res && Array.isArray(res.List)) {
        rawList = res.List;
      } else if (res && typeof res === 'object') {
        const found = Object.values(res).find(v => Array.isArray(v));
        if (found) rawList = found as any[];
        else if (res.Data && typeof res.Data === 'object') {
          const foundData = Object.values(res.Data).find(v => Array.isArray(v));
          if (foundData) rawList = foundData as any[];
        }
      }
      this.listCBNV = rawList.map((x: any) => {
        if (typeof x === 'string') {
          return { TendmChiTieu: x, Ten: x, DisplayText: x };
        }
        let tendmChiTieu = x.TendmChiTieu || x.tendmChiTieu || x.TenDmChiTieu || x.TenChiTieu || x.Ten || x.HoTen || x.TenNhanVien || x.TenDayDu || x.Name || '';
        let ma = x.MadmChiTieu || x.madmChiTieu || x.MaDmChiTieu || x.MaChiTieu || x.Ma || x.MaNhanVien || x.MaCBNV || '';
        let chucVu = x.ChucVu || x.chucVu || x.TenChucVu || x.BoPhan || x.TenBoPhan || '';
        let displayText = tendmChiTieu;
        if (chucVu) displayText += ` (${chucVu})`;
        else if (ma) displayText += ` (${ma})`;
        return {
          ...x,
          TendmChiTieu: tendmChiTieu,
          Ten: tendmChiTieu,
          Ma: ma,
          MadmChiTieu: ma,
          ChucVu: chucVu,
          DisplayText: displayText
        };
      });
      if (callback) callback();
      this.cd.markForCheck();
      this.cd.detectChanges();
    }, (err) => {
      console.log('Error GetListCBNVNganhXemayByIdDuAn:', err);
      this.isLoadingCBNV = false;
      this.isLoadedCBNV = true;
      if (callback) callback();
      this.cd.markForCheck();
      this.cd.detectChanges();
    });
  }

  filterCBNV(event: any) {
    let query = (event && event.query != null ? event.query : (typeof event === 'string' ? event : '')).trim().toLowerCase();
    if (!query) {
      this.filteredCBNV = [...(this.listCBNV || [])];
    } else {
      const removeAccents = (str: string) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
      const queryNoAccent = removeAccents(query);
      this.filteredCBNV = (this.listCBNV || []).filter(item => {
        let ten = (item.TendmChiTieu || item.Ten || item.HoTen || item.TenNhanVien || '').toLowerCase();
        let ma = (item.MadmChiTieu || item.Ma || item.MaNhanVien || '').toLowerCase();
        let chucVu = (item.ChucVu || item.TenChucVu || item.BoPhan || '').toLowerCase();
        return ten.includes(query) || ma.includes(query) || chucVu.includes(query)
          || removeAccents(ten).includes(queryNoAccent)
          || removeAccents(ma).includes(queryNoAccent);
      });
    }
    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  onSelectCBNV(event: any) {
    let name = typeof event === 'string' ? event : (event.TendmChiTieu || event.Ten || event.HoTen || event.TenNhanVien || event.TenDayDu || '');
    this.item.NguoiVanHanh = name;
    this.ChangeData();
  }
}