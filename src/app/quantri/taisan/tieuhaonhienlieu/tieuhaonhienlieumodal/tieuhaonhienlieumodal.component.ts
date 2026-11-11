import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { vn } from '../../../../services/const';
import { DateToUnix, deepCopy, getSTT, mapArrayForDropDown, merge, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { StoreService } from '../../../../services/store.service';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DanhsachtaisanpopupComponent } from '../../kiemdinhtaisan/danhsachtaisanpopup/danhsachtaisanpopup.component';
import { ConfirmationService } from '../../../../services/confirmation.service';
import { API } from '../../../../services/host';

@Component({
  selector: 'app-tieuhaonhienlieumodal',
  templateUrl: './tieuhaonhienlieumodal.component.html',
  styleUrls: ['./tieuhaonhienlieumodal.component.css']
})
export class TieuhaonhienlieumodalComponent implements OnInit {

  quyTrinh: any = { listTaiSan: [] };
  type = '';
  checkbutton: any = {};
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  listTaiSan: any = [];
  title: any = '';
  eAction: string = '';
  listLoaiNhienLieu: any = [];
  listLoaiDinhMucNhienLieu: any = [];
  listBoPhan: any = [];
  private sanLuongCache: { [idTaiSan: string]: any[] } = {};

  constructor(
    public activeModal: NgbActiveModal,
    private _serviceTaiSan: TaisanService,
    public toastr: ToastrService,
    public store: StoreService,
    public _modal: NgbModal,
    private _confirmService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    if (this.type === 'themmoi') {
      this.GetNextSoQuyTrinh();
      this.quyTrinh.Ngay = new Date();
      this.quyTrinh.NgayBatDau = new Date();
      this.quyTrinh.NgayKetThuc = new Date();
    } else {
      this.quyTrinh.Ngay = UnixToDate(this.quyTrinh.NgayUnix || this.quyTrinh.NgayBatDauUnix) || new Date();
      this.quyTrinh.NgayBatDau = UnixToDate(this.quyTrinh.NgayBatDauUnix) || this.quyTrinh.Ngay;
      this.quyTrinh.NgayKetThuc = UnixToDate(this.quyTrinh.NgayKetThucUnix) || this.quyTrinh.Ngay;
      if (this.quyTrinh.listTaiSan?.length) {
        this.quyTrinh.listTaiSan.forEach((ele: any) => {
          this.normalizeTaiSanItem(ele);
        });
        this.loadSanLuongForList(this.quyTrinh.listTaiSan);
      }
      this.getTongChiPhiTaiSan();
    }
    this.KiemTraButtonModal();
    if (this.quyTrinh.IddmPhanXuong || this.quyTrinh.IdBoPhanSuDung) {
      this.quyTrinh.IddmPhanXuong = this.quyTrinh.IddmPhanXuong || this.quyTrinh.IdBoPhanSuDung;
      this.quyTrinh.IdBoPhanSuDung = this.quyTrinh.IddmPhanXuong;
      this.getListTaiSanDangSuDung();
    }
  }

  GetNextSoQuyTrinh() {
    this._serviceTaiSan.TieuHaoNhienLieu().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.Data;
    })
  }

  KiemTraButtonModal() {
    this._serviceTaiSan.KiemTraButton(this.quyTrinh.Id || "", this.quyTrinh.IdTrangThai || "").subscribe((res: any) => {
      this.checkbutton = res;
    });
  }

  ValidateData() {
    if (!validVariable(this.quyTrinh.IddmPhanXuong)) {
      this.toastr.error("Vui lòng chọn bộ phận!");
      return false;
    }
    if (!validVariable(this.quyTrinh.NgayBatDau)) {
      this.toastr.error("Vui lòng chọn ngày bắt đầu!");
      return false;
    }
    if (!validVariable(this.quyTrinh.NgayKetThuc)) {
      this.toastr.error("Vui lòng chọn ngày kết thúc!");
      return false;
    }
    if (new Date(this.quyTrinh.NgayBatDau).getTime() > new Date(this.quyTrinh.NgayKetThuc).getTime()) {
      this.toastr.error("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
      return false;
    }
    if (!validVariable(this.quyTrinh.NoiDung) || (typeof this.quyTrinh.NoiDung === 'string' && this.quyTrinh.NoiDung.trim() === '')) {
      this.toastr.error("Vui lòng nhập nội dung!");
      return false;
    }
    return true;
  }

  setData() {
    let data = {
      ...this.quyTrinh,
      IddmPhanXuong: this.quyTrinh.IddmPhanXuong,
      IdBoPhanSuDung: this.quyTrinh.IddmPhanXuong || this.quyTrinh.IdBoPhanSuDung,
      eAction: this.eAction,
      IdDuAn: this.store.getCurrent(),
      NgayUnix: DateToUnix(this.quyTrinh.NgayBatDau || this.quyTrinh.Ngay),
      NgayBatDauUnix: DateToUnix(this.quyTrinh.NgayBatDau || this.quyTrinh.Ngay),
      NgayKetThucUnix: DateToUnix(this.quyTrinh.NgayKetThuc || this.quyTrinh.Ngay),
      listTaiSan: (this.quyTrinh.listTaiSan || []).map((ele: any) => {
        const listCongViecClean = (ele.listCongViec || []).map((cv: any) => {
          const donGia = Number(cv.DonGia) || 0;
          const tieuThu = Number(cv.TieuThu) || 0;
          const thanhTien = donGia * tieuThu;
          return {
            ...cv,
            ThanhTien: thanhTien,
          };
        });

        const firstCv = listCongViecClean[0] || {};
        const thanhTien = (Number(firstCv.DonGia) || 0) * (Number(firstCv.TieuThu) || 0);

        return {
          ...ele,
          listCongViec: listCongViecClean,
          IdSanLuongMay: firstCv.IdSanLuongMay || firstCv.IdSanLuong || ele.IdSanLuongMay,
          IdSanLuong: firstCv.IdSanLuong || firstCv.IdSanLuongMay || ele.IdSanLuong,
          IddmLoaiNhienLieu: firstCv.IddmLoaiNhienLieu || ele.IddmLoaiNhienLieu,
          TendmLoaiNhienLieu: firstCv.TendmLoaiNhienLieu || ele.TendmLoaiNhienLieu,
          DonViTinh_NhienLieu: firstCv.DonViTinh_NhienLieu || ele.DonViTinh_NhienLieu,
          DinhMuc: firstCv.DinhMuc !== undefined ? firstCv.DinhMuc : ele.DinhMuc,
          TieuHaoDinhMuc: firstCv.TieuHaoDinhMuc !== undefined ? firstCv.TieuHaoDinhMuc : ele.TieuHaoDinhMuc,
          TieuThu: firstCv.TieuThu !== undefined ? firstCv.TieuThu : ele.TieuThu,
          DonGia: firstCv.DonGia !== undefined ? firstCv.DonGia : ele.DonGia,
          ThanhTien: firstCv.ThanhTien !== undefined ? firstCv.ThanhTien : (thanhTien || ele.ThanhTien),
          GhiChu: firstCv.GhiChu || ele.GhiChu,
          // Remove client-only dropdown lists to keep data save payload clean
          listSanLuongDropdown: undefined,
          rawSanLuongList: undefined,
        };
      })
    };
    return data;
  }

  GhiLai() {
    if (this.ValidateData()) {
      this._serviceTaiSan.TieuHaoNhienLieu().SetQuyTrinh(this.setData()).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.quyTrinh = {
            ...res.Data,
            Ngay: UnixToDate(res.Data.NgayUnix || res.Data.NgayBatDauUnix) || this.quyTrinh.Ngay,
            NgayBatDau: UnixToDate(res.Data.NgayBatDauUnix),
            NgayKetThuc: UnixToDate(res.Data.NgayKetThucUnix)
          };
          if (this.quyTrinh.listTaiSan?.length) {
            this.quyTrinh.listTaiSan.forEach((ele: any) => {
              this.normalizeTaiSanItem(ele);
            });
            this.loadSanLuongForList(this.quyTrinh.listTaiSan);
          }
          this.getTongChiPhiTaiSan();
          this.KiemTraButtonModal();
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      });
    }
  }

  ChuyenDuyet() {
    if (!this.ValidateData()) {
      return;
    }
    this._serviceTaiSan.TieuHaoNhienLieu().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  KhongDuyet() {
    this._serviceTaiSan.TieuHaoNhienLieu().ChuyenTiep(this.setData()).subscribe((res: any) => {
      if (res.StatusCode !== 200) {
        this.toastr.error(res.Message);
      } else {
        this.toastr.success(res.Message);
        this.activeModal.close();
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this._serviceTaiSan.TieuHaoNhienLieu().Delete(this.quyTrinh.Id).subscribe((res: any) => {
          if (res.StatusCode === 200) {
            this.toastr.success(res.Message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.Message);
          }
        })
      })
      .catch((er) => console.log(er));
  }

  // handle xử lý riêng

  onChangeBoPhan() {
    if (!this.quyTrinh || typeof this.quyTrinh !== 'object') {
      this.quyTrinh = { listTaiSan: [] };
    }
    this.quyTrinh.IdBoPhanSuDung = this.quyTrinh.IddmPhanXuong;
    this.listTaiSan = [];
    this.getListTaiSanDangSuDung();
  }

  getListTaiSanDangSuDung(callback?: () => void) {
    const idBoPhan = this.quyTrinh?.IddmPhanXuong || this.quyTrinh?.IdBoPhanSuDung;
    if (!idBoPhan) {
      this.listTaiSan = [];
      if (callback) callback();
      return;
    }
    this._serviceTaiSan.GetListTaiSanDangSuDung({ CurrentPage: 0, IdBoPhanSuDung: idBoPhan }).subscribe((res: any) => {
      this.listTaiSan = res.Data || [];
      if (callback) callback();
    }, (err: any) => {
      if (callback) callback();
    });
  }

  delete(item: any) {
    this._confirmService.show({
      message: 'Bạn chắc chắn muốn xóa máy/thiết bị này?'
    }, () => {
      this.quyTrinh.listTaiSan = this.quyTrinh.listTaiSan?.filter((ele: any) => ele.IdTaiSan !== item.IdTaiSan);
      this.getTongChiPhiTaiSan();
    });
  }

  handleThemTaiSan() {
    const idBoPhan = this.quyTrinh?.IddmPhanXuong || this.quyTrinh?.IdBoPhanSuDung;
    if (!idBoPhan) {
      this.toastr.error('Vui lòng chọn bộ phận');
      return;
    }
    this.getListTaiSanDangSuDung(() => {
      let modalRef = this._modal.open(DanhsachtaisanpopupComponent, {
        size: "lg",
        backdrop: "static",
      });
      modalRef.componentInstance.listDaChon = this.quyTrinh.listTaiSan ? this.quyTrinh.listTaiSan.map((ele: any) => ele.IdTaiSan) : [];
      modalRef.componentInstance.listView = this.listTaiSan || [];
      modalRef.componentInstance.title = 'Danh sách máy/thiết bị';
      modalRef.result.then((res: any) => {
        const _list = this.quyTrinh.listTaiSan || [];
        const newItems: any[] = [];
        this.quyTrinh.listTaiSan = res.map((ele: any) => {
          let _newObj = _list.find((x: any) => x.IdTaiSan === ele.IdTaiSan);
          if (!_newObj) {
            _newObj = {
              ...ele,
              listCongViec: [],
              listFileDinhKem: []
            };
            this.addCongViec(_newObj);
            newItems.push(_newObj);
          } else {
            this.normalizeTaiSanItem(_newObj);
          }
          return _newObj;
        });
        if (newItems.length > 0) {
          this.loadSanLuongForList(newItems);
        }
        this.getTongChiPhiTaiSan();
      }).catch((er) => { });
    });
  }

  addCongViec(item: any) {
    if (!item) return;
    if (!Array.isArray(item.listCongViec)) {
      item.listCongViec = [];
    }
    const newCv: any = {
      IdSanLuongMay: null,
      IdSanLuong: null,
      TenCongViec: '',
      TendmLoaiNhienLieu: '',
      IddmLoaiNhienLieu: '',
      DonViTinh_NhienLieu: '',
      DonViTinh: '',
      DinhMuc: 0,
      TieuHaoDinhMuc: 0,
      TieuThu: null,
      DonGia: null,
      ThanhTien: 0,
      GhiChu: ''
    };
    item.listCongViec.push(newCv);
    if (item.rawSanLuongList && item.rawSanLuongList.length === 1) {
      newCv.IdSanLuongMay = item.rawSanLuongList[0].Id;
      this.onChangeSanLuong(newCv, item);
    }
  }

  deleteCongViec(item: any, index: number) {
    if (item && Array.isArray(item.listCongViec) && index >= 0 && index < item.listCongViec.length) {
      item.listCongViec.splice(index, 1);
      this.getTongChiPhiTaiSan();
    }
  }

  normalizeTaiSanItem(ele: any) {
    if (!ele) return;
    if (!Array.isArray(ele.listCongViec)) {
      ele.listCongViec = [];
    }
    if (ele.listCongViec.length === 0) {
      if (ele.IdSanLuongMay || ele.IdSanLuong || ele.IddmLoaiNhienLieu || ele.TieuThu || ele.DonGia || ele.ThanhTien || ele.TendmLoaiNhienLieu) {
        ele.listCongViec.push({
          IdSanLuongMay: ele.IdSanLuongMay || ele.IdSanLuong,
          IdSanLuong: ele.IdSanLuong || ele.IdSanLuongMay,
          TenCongViec: ele.TenCongViec || ele.Ten || '',
          TendmLoaiNhienLieu: ele.TendmLoaiNhienLieu,
          IddmLoaiNhienLieu: ele.IddmLoaiNhienLieu,
          DonViTinh_NhienLieu: ele.DonViTinh_NhienLieu || ele.DonViTinh,
          DonViTinh: ele.DonViTinh_NhienLieu || ele.DonViTinh,
          DinhMuc: ele.DinhMuc || ele.TieuHaoDinhMuc || 0,
          TieuHaoDinhMuc: ele.TieuHaoDinhMuc || ele.DinhMuc || 0,
          TieuThu: ele.TieuThu,
          DonGia: ele.DonGia,
          ThanhTien: ele.ThanhTien || ((Number(ele.TieuThu) || 0) * (Number(ele.DonGia) || 0)),
          GhiChu: ele.GhiChu
        });
      }
    } else {
      ele.listCongViec.forEach((cv: any) => {
        if (cv.ThanhTien === undefined || cv.ThanhTien === null) {
          cv.ThanhTien = (Number(cv.TieuThu) || 0) * (Number(cv.DonGia) || 0);
        }
      });
    }
  }

  getTongChiPhiTaiSan() {
    let total = 0;
    (this.quyTrinh.listTaiSan || []).forEach((ele: any) => {
      if (Array.isArray(ele.listCongViec) && ele.listCongViec.length > 0) {
        ele.listCongViec.forEach((cv: any) => {
          total += (Number(cv.ThanhTien) || 0);
        });
      } else if (ele.ThanhTien) {
        total += (Number(ele.ThanhTien) || 0);
      }
    });
    this.quyTrinh.TongChiPhi = total;
  }

  handleChiPhiTaiSan(cv?: any) {
    if (cv) {
      const donGia = Number(cv.DonGia) || 0;
      const tieuThu = Number(cv.TieuThu) || 0;
      cv.ThanhTien = donGia * tieuThu;
    }
    this.getTongChiPhiTaiSan();
  }

  handleChangeItem(data: any, index: any) {
    this.quyTrinh.listTaiSan[index].listFileDinhKem.push({
      FileName: data.NameLocal,
      FileNameGUI: data.Name
    })
  }
  cancelItem(i: any, index: any) {
    this.quyTrinh.listTaiSan[i].listFileDinhKem.splice(index, 1)
  }

  download(Link: any) {
    window.open(API.imgURL + Link);
  }

  handlePreView(file: any) {
    if (!file.LinkDocView) {
      return;
    }
    let url = `/${file.LinkDocView}`
    window.open(API.imgURL + url);
  }

  loadSanLuongForList(listTaiSan: any[]) {
    if (!listTaiSan || listTaiSan.length === 0) return;

    const uniqueIds = Array.from(new Set(listTaiSan.map((x: any) => x.IdTaiSan).filter((id: any) => !!id)));
    const needFetchIds = uniqueIds.filter((id: any) => !this.sanLuongCache[id]);

    if (needFetchIds.length === 0) {
      listTaiSan.forEach((item: any) => {
        if (item.IdTaiSan && this.sanLuongCache[item.IdTaiSan]) {
          this.applySanLuongToItem(item, this.sanLuongCache[item.IdTaiSan]);
        }
      });
      return;
    }

    const requests = needFetchIds.map((id: any) => this._serviceTaiSan.GetSanLuongMay(id));
    forkJoin(requests).subscribe((responses: any[]) => {
      responses.forEach((res: any, index: number) => {
        const id = needFetchIds[index];
        this.sanLuongCache[id] = res?.Data || res || [];
      });

      listTaiSan.forEach((item: any) => {
        if (item.IdTaiSan && this.sanLuongCache[item.IdTaiSan]) {
          this.applySanLuongToItem(item, this.sanLuongCache[item.IdTaiSan]);
        }
      });
    });
  }

  applySanLuongToItem(item: any, list: any[]) {
    if (!list) return;
    item.rawSanLuongList = list;
    item.listSanLuongDropdown = list.map((x: any) => {
      return {
        label: x.Ten || (x.TendmLoaiNhienLieu ? x.TendmLoaiNhienLieu : ''),
        value: x.Id,
      };
    });

    if (Array.isArray(item.listCongViec)) {
      item.listCongViec.forEach((cv: any) => {
        const targetId = cv.IdSanLuongMay || cv.IdSanLuong || cv.IddmLoaiNhienLieu;
        if (targetId) {
          const selected = list.find((x: any) => x.Id === targetId || x.IddmLoaiNhienLieu === targetId);
          if (selected) {
            if (!cv.IdSanLuongMay) {
              cv.IdSanLuongMay = selected.Id;
            }
            cv.TenCongViec = selected.Ten;
            cv.DinhMuc = cv.DinhMuc !== undefined && cv.DinhMuc !== null && cv.DinhMuc !== 0 ? cv.DinhMuc : (selected.NhienLieu || selected.SanLuong || 0);
            cv.TieuHaoDinhMuc = cv.DinhMuc;
            cv.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
            cv.DonViTinh = selected.DonViTinh_NhienLieu || selected.DonViTinh || cv.DonViTinh;
            cv.TendmLoaiNhienLieu = selected.TendmLoaiNhienLieu;
            cv.IddmLoaiNhienLieu = selected.IddmLoaiNhienLieu;
            cv.IdSanLuong = selected.Id;
          }
        }
      });
    }
  }

  getSanLuongDropdownForAsset(item: any) {
    if (!item?.IdTaiSan) return;
    if (this.sanLuongCache[item.IdTaiSan]) {
      this.applySanLuongToItem(item, this.sanLuongCache[item.IdTaiSan]);
      return;
    }
    this._serviceTaiSan.GetSanLuongMay(item.IdTaiSan).subscribe((res: any) => {
      const list = res.Data || res || [];
      this.sanLuongCache[item.IdTaiSan] = list;
      this.applySanLuongToItem(item, list);
    });
  }

  onChangeSanLuong(cv: any, item?: any) {
    const parent = item || this.quyTrinh?.listTaiSan?.find((x: any) => x.listCongViec?.includes(cv));
    const val = cv.IdSanLuongMay || cv.IdSanLuong;
    if (parent?.rawSanLuongList && val) {
      const selected = parent.rawSanLuongList.find((x: any) => x.Id === val);
      if (selected) {
        cv.IdSanLuongMay = selected.Id;
        cv.IdSanLuong = selected.Id;
        cv.TenCongViec = selected.Ten;
        cv.DinhMuc = selected.NhienLieu || selected.SanLuong || 0;
        cv.TieuHaoDinhMuc = selected.NhienLieu || selected.SanLuong || 0;
        cv.DonViTinh_NhienLieu = selected.DonViTinh_NhienLieu;
        cv.DonViTinh = selected.DonViTinh_NhienLieu || selected.DonViTinh || '';
        cv.TendmLoaiNhienLieu = selected.TendmLoaiNhienLieu;
        cv.IddmLoaiNhienLieu = selected.IddmLoaiNhienLieu;
        if (selected.DonGia && !cv.DonGia) {
          cv.DonGia = selected.DonGia;
        }
        this.handleChiPhiTaiSan(cv);
      }
    } else if (cv) {
      cv.TenCongViec = '';
      cv.DinhMuc = 0;
      cv.TieuHaoDinhMuc = 0;
      cv.DonViTinh_NhienLieu = '';
      cv.TendmLoaiNhienLieu = '';
      cv.IddmLoaiNhienLieu = '';
      this.handleChiPhiTaiSan(cv);
    }
  }

}

