import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { vn } from 'src/app/services/const';
import { DanhMucMatHangPopupComponent } from '../../danh-muc-mat-hang-popup/danh-muc-mat-hang-popup.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { DateToUnix, UnixToDate, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhap-kho-gia-cong-modal',
  templateUrl: './nhap-kho-gia-cong-modal.component.html',
  styleUrls: ['./nhap-kho-gia-cong-modal.component.css']
})
export class NhapKhoGiaCongModalComponent implements OnInit, AfterViewInit, AfterViewChecked {

  nametype: string = '';
  opt: string = '';
  item: any = {};
  checkbutton: any = {};
  listKhoGiaCong: any = [];
  lang: any = vn;
  yearRange: string = `${((new Date()).getFullYear() - 60)}:${((new Date()).getFullYear() + 60)}`;
  data: any = {};
  listdmQuyCachDongGoi: any = [];
  listdmKgCo: any = [];
  listdmLo: any = [];
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.item = {
        NhaMay: '',
        IddmLoaiBong: '',
        IddmCapBong: '',
        IdLoBong: '',
        listItem: [],
      }
      this.GetNextSoQuyTrinh();
    }
    this.KiemTraButtonModal();
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.getListKho();
    this.getListdmQuyCachDongGoi();
    this.GetListKgCone();
    this.GetListLoHang();
  }

  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    this._services.PhieuNhapGiaCong().ChuyenTiep(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapGiaCong().GetNextSo().subscribe((res: any) => {
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

  GhiLai() {
    this._services.PhieuNhapGiaCong().Set(this.setData()).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.toastr.success(res.message)
          this.opt = 'edit';
          this.item = res.objectReturn;
          this.KiemTraButtonModal();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.PhieuNhapGiaCong().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListKho() {
    this.data.Loai = 203;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoGiaCong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetListKgCone() {
    let data = {
      CurrentPage: 0
    }
    this._services.GetListdmKgCone(data).subscribe((res: any) => {
      this.listdmKgCo = res.map(ele => {
        return {
          label: ele.GiaTri,
          value: ele.GiaTri,
        }
      });
    })
  }
  GetListLoHang() {
    let data = {
      CurrentPage: 0
    }
    this._services.LoHang().GetList(data).subscribe((res: any) => {
      this.listdmLo = mapArrayForDropDown(res, 'Ten', 'Id');
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

  GetMatHangTheoKho() {
    let modalRef = this._modal.open(DanhMucMatHangPopupComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.kho = 'khothanhpham';
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(this.item))
    modalRef.result.then((data) => {
      this.item.listItem = data;
    })
  }

  ExportExcel() {
    this._services.BaoCao().ExportPhieuNhapKhoThanhPham_Bieu1({ IdPhieuNhapKho: this.item.Id }).subscribe((res: any) => {
      if (res) {
        if (res.State) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  KhongDuyet() {
    this._services.PhieuNhapGiaCong().KhongDuyet(this.item).subscribe((res: any) => {
      if (res) {
        if (res.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      }
    })
  }

  TinhKhoiLuong(data) {
    data.KhoiLuong = 0;
    data.KhoiLuong = (data.KgCone || 0) * (data.SoQua || 0);
    this.item.listItem = [...this.item.listItem];
  }

  navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const key = event.key;
    const inputElements: any = this.inputs.toArray();
    const colsPerRow = 2; // Số cột chứa ô nhập liệu

    let nextIndex = rowIndex * colsPerRow + colIndex;
    if (key === 'ArrowRight') nextIndex += 1;
    if (key === 'ArrowLeft') nextIndex -= 1;
    if (key === 'ArrowDown') nextIndex += colsPerRow;
    if (key === 'ArrowUp') nextIndex -= colsPerRow;

    setTimeout(() => {
      while (nextIndex >= 0 && nextIndex < inputElements.length) {
        const nextElement = inputElements[nextIndex]?.nativeElement;
        if (!nextElement) break; // Dừng nếu không có phần tử hợp lệ
        let inputInside = nextElement.querySelector('input');
        // Nếu không tìm thấy input, thử tìm thẻ con trong PrimeNG component
        if (!inputInside) {
          nextElement.focus();
          return;
        }

        // Kiểm tra nếu ô hiện tại bị disabled
        const isDisabled =
          inputInside.hasAttribute('disabled') ||
          inputInside.classList.contains('p-disabled') ||
          nextElement.hasAttribute('ng-reflect-disabled') ||
          nextElement.classList.contains('p-disabled');
        // Nếu ô không bị disabled, focus và thoát vòng lặp
        if (!isDisabled) {
          inputInside.focus();
          return;
        }
        // Nếu bị disabled, tiếp tục kiểm tra ô tiếp theo
        nextIndex = getNextIndex(nextIndex, key, colsPerRow);
      }
    }, 0);

    // Hàm tính toán nextIndex để nhảy ô chính xác
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
    this.initInputListeners(); // Đảm bảo input được cập nhật khi bảng thay đổi
  }
  initInputListeners() {
    this.inputs.forEach((el) => {
      const realInput = el?.nativeElement?.querySelector('input'); // Lấy phần tử <input> thực tế
      if (realInput) {
        realInput.addEventListener(
          'keydown',
          (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
              event.preventDefault(); //  Chặn PrimeNG thay đổi số
              event.stopPropagation();
              event.stopImmediatePropagation();
              //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
              const indexInList = this.inputs.toArray().findIndex(
                (inp) => inp.nativeElement.querySelector('input') === realInput
              );
              const rowIndex = Math.floor(indexInList / 2);
              const colIndex = indexInList % 2;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } //  Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

}
