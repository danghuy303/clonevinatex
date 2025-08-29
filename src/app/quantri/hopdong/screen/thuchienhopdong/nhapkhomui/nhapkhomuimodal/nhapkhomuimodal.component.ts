import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from '../../../../../../quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from '../../../../../../services/callApiSanXuat';
import { vn } from '../../../../../../services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate,validVariable } from '../../../../../../services/globalfunction';
import { StoreService } from '../../../../../../services/store.service';

@Component({
  selector: 'app-nhapkhomuimodal',
  templateUrl: './nhapkhomuimodal.component.html',
  styleUrls: ['./nhapkhomuimodal.component.css']
})
export class NhapkhomuimodalComponent implements OnInit {

  opt: any = ''
  item: any = { listItem: [] };
  link: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listMatHang: any = [];
  listHopDong: any = [];
  listKho: any = [];
  lang: any = vn;
  data: any = {};
  listPhanXuong: any = []
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  listdmQuyCachDongGoi: any = [];
  listdmQuyCachDongGoiAll: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private _services: SanXuatService,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListMatHang();
    this.getListKho();
    // this.getListHopDong();

    this.QuyCachDongGoi();
  }

  QuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoiAll = res;
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien != undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this.link.api().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.newTableItem.SoKien != undefined) {
        this.add();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.link.api().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this.link.api().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  setData() {
    let data = {
      ...this.item,
      NgayUnix: DateToUnix(this.item.Ngay)
    }
    return data
  }

  valiDate() {
    if (!validVariable(this.item.Ngay)) {
      this.toastr.error("Yêu cầu nhập ngày chứng từ!");
      return false;
    }
    return true;
  }

  GhiLai() {
    if (this.valiDate()) {
      this.link.api().Set(this.setData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.item = {
              ...res.objectReturn,
              Ngay: UnixToDate(res.objectReturn.NgayUnix)
            }
            this.KiemTraButtonModal();
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  GetQuyTrinh(Id) {
    this.link.api().Get(Id).subscribe((res: any) => {
      this.item = res;
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    })
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.link.api().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.toastr.success(res.message)
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  getListKho() {
    // this.data.Loai = 23;
    let data = {
      Loai: this.link.Loai,
    };
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      if (this.link.eAction === 'PHIEUNHAPCUONCUI') {
        this.item.IddmKho = res?.find(ele => ele.Ma === 'CUONCUI').Id
      }
    })
  }
  getListMatHang() {
    this.data.Loai = 23;
    let _api = this.link.value === 'khotho' ? this._services.GetOptions().GetListdmItemLoaiSoiTho() : this._services.GetOptions().GetListdmItemLoaiCuonCui();
    _api.subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res, 'Ten', 'IddmItem');
    })
  }
  getListHopDong() {
    let IdDuAn = this.store.getCurrent();
    this._services.GetOptions().GetDanhSachHopDongByNhaThau(IdDuAn, 23).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'tenHopDong', 'id');
    })
  }

  add() {
    this.item.listItem = this.item?.listItem?.length > 0 ? this.item.listItem : []
    this.item.listItem.push({
      Id: ''
    })
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }

  navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const key = event.key;
    const inputElements: any = this.inputs.toArray();
    const colsPerRow = 1; // Số cột chứa ô nhập liệu

    let nextIndex = rowIndex * colsPerRow + colIndex;
    if (key === 'ArrowRight') nextIndex += 1;
    if (key === 'ArrowLeft') nextIndex -= 1;
    if (key === 'ArrowDown') nextIndex += colsPerRow;
    if (key === 'ArrowUp') nextIndex -= colsPerRow;

    setTimeout(() => {
      while (nextIndex >= 0 && nextIndex < inputElements.length) {
        const nextElement = inputElements[nextIndex]?.nativeElement;
        if (!nextElement) break;
        let inputInside = nextElement.querySelector('input');
        if (!inputInside) {
          nextElement.focus();
          return;
        }
        const isDisabled =
          inputInside.hasAttribute('disabled') ||
          inputInside.classList.contains('p-disabled') ||
          nextElement.hasAttribute('ng-reflect-disabled') ||
          nextElement.classList.contains('p-disabled');
        if (!isDisabled) {
          inputInside.focus();
          return;
        }
        nextIndex = getNextIndex(nextIndex, key, colsPerRow);
      }
    }, 0);
    function getNextIndex(currentIndex: number, key: string, colsPerRow: number): number {
      if (key === 'ArrowRight') return currentIndex + 1;
      if (key === 'ArrowLeft') return currentIndex - 1;
      if (key === 'ArrowDown') return currentIndex + colsPerRow;
      if (key === 'ArrowUp') return currentIndex - colsPerRow;
      return currentIndex;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initInputListeners();
    }, 0);
  }

  ngAfterViewChecked() {
    this.initInputListeners();
  }
  initInputListeners() {
    this.inputs.forEach((el) => {
      const realInput = el?.nativeElement?.querySelector('input');
      if (realInput && !realInput.hasAttribute('data-keydown')) {
        realInput.setAttribute('data-keydown', 'true');
        realInput.addEventListener(
          'keydown',
          (event: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
              event.preventDefault();
              event.stopPropagation();
              event.stopImmediatePropagation();
              const indexInList = this.inputs.toArray().findIndex(
                (inp) => inp.nativeElement.querySelector('input') === realInput
              );
              const rowIndex = Math.floor(indexInList / 1);
              const colIndex = indexInList % 1;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true }
        );
      }
    });
  }

  // new
  chonQuyCach(data) {
    let _objQuyCach = this.listdmQuyCachDongGoiAll.find(ele => ele.Id === data.IddmQuyCachDongGoi);
    let _trongLuongQuyCach = _objQuyCach.TrongLuong || 0;
    data.SoCan = (data.SoKien) * (_trongLuongQuyCach || 0);
    this.item.listItem = [...this.item.listItem];
  }

}