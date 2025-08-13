import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from '../../../../../services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from '../../../../../services/globalfunction';
import { vn } from '../../../../../services/const';
import { ModalthongbaoComponent } from '../../../../modal/modalthongbao/modalthongbao.component';
import { DanhsachmathangmuiComponent } from '../danhsachmathangmui/danhsachmathangui.component';

@Component({
  selector: 'app-xuatkhocapdaumodal',
  templateUrl: './xuatkhocapdaumodal.component.html',
  styleUrls: ['./xuatkhocapdaumodal.component.css']
})
export class XuatkhocapdaumodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  listKhoHoiAm: any = [];
  listKhoThanhPham: any = [];
  lang: any = vn;
  type: any = '';
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

  ngOnInit(): void {
    this.getListKho();
    this.KiemTraButton();
    if (this.type === 'add') {
      this.GetNextSoQuyTrinh();
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuXuatHoiAmCapDau().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.Data;
    })
  }
  KiemTraButton() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetMatHangTheoKho() {
    let data = {

    }
    this._services.GetlistdmMatHangXuatHoiAmCapDau(data).subscribe((res: any) => {
      let modalRef = this._modal.open(DanhsachmathangmuiComponent, {
        backdrop: 'static', size: 'lg'
      });
      modalRef.componentInstance.listDaChon = this.item.listItem?.length ? this.item.listItem?.map(ele => ele.IddmItem) : [];
      modalRef.componentInstance.title = 'Danh sách mặt hàng'
      modalRef.result.then(res => {
        this.item.listItem = [this.item.listItem, ...res]
      }).catch(er => console.log(er))
    })
  }


  getListKho() {
    this._services.GetListdmKho({ Loai: 10 }).subscribe((res: any) => {
      this.listKhoHoiAm = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._services.GetListdmKho({ Loai: 11 }).subscribe((res: any) => {
      this.listKhoThanhPham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  setData() {
    let data = {
      ...this.item,
      NgayUnix: DateToUnix(this.item.Ngay)
    }
    return data;
  }

  GhiLai() {
    this._services.PhieuXuatHoiAmCapDau().Set(this.setData()).subscribe((res: any) => {
    })
  }

  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._services.PhieuXuatHoiAmCapDau().Delete(this.setData()).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  ChuyenDuyet() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn chuyển duyệt?"
    modalRef.result.then(res => {
      this._services.PhieuXuatHoiAmCapDau().ChuyenTiep(this.setData()).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }
  KhongDuyet() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn hủy?"
    modalRef.result.then(res => {
      this._services.PhieuXuatHoiAmCapDau().KhongDuyet(this.setData()).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  Onclose() {
    this.activeModal.close();
  }

  navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const key = event.key;
    const inputElements: any = this.inputs.toArray();
    const colsPerRow = 3;

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
    this.inputs.forEach((el) => {
      const realInput = el?.nativeElement?.querySelector('input'); // Lấy phần tử <input> thật
      if (realInput) {
        realInput.addEventListener(
          'keydown',
          (event: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
              event.preventDefault(); // Ngăn hành vi mặc định
              event.stopImmediatePropagation(); // Chặn PrimeNG xử lý tiếp
              //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
              const indexInList = this.inputs.toArray().findIndex(
                (inp) => inp.nativeElement.querySelector('input') === realInput
              );
              const rowIndex = Math.floor(indexInList / 3);
              const colIndex = indexInList % 3;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } // Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

}