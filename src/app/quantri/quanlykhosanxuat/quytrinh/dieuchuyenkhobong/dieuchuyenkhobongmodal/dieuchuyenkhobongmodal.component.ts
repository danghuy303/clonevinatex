import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalthongbaoComponent } from '../../../../modal/modalthongbao/modalthongbao.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SanXuatService } from '../../../../../services/callApiSanXuat';
import { ToastrService } from 'ngx-toastr';
import { vn } from '../../../../../services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from '../../../../../services/globalfunction';
import { DanhsachluachonkienComponent } from '../danhsachluachonkien/danhsachluachonkien.component';
import { StoreService } from '../../../../../services/store.service';

@Component({
  selector: 'app-dieuchuyenkhobongmodal',
  templateUrl: './dieuchuyenkhobongmodal.component.html',
  styleUrls: ['./dieuchuyenkhobongmodal.component.css']
})
export class DieuchuyenkhobongmodalComponent implements OnInit {

  opt: any = '';
  quyTrinh: any = { listItem: [] };
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKhoXuat: any = [];
  listKhoNhan: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  eAction: string = '';
  loai: number = 0;

  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(
    public activeModal: NgbActiveModal, private _service: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal, public store: StoreService
  ) { }

  ngOnInit(): void {
    if (this.opt === 'add') {
      this.getNextSoQuyTrinh();
    }
    this.KiemTraButtonModal();
  }

  KiemTraButtonModal() {
    this._service.KiemTraButton(this.quyTrinh.Id || '', this.quyTrinh.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.quyTrinh.Ngay === null || this.quyTrinh.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.quyTrinh.Ngay !== null && this.quyTrinh.Ngay !== undefined)
        this.quyTrinh.NgayUnix = DateToUnix(this.quyTrinh.Ngay);
      if (this.quyTrinh.NgayChungTu !== null && this.quyTrinh.NgayChungTu !== undefined)
        this.quyTrinh.NgayChungTuUnix = DateToUnix(this.quyTrinh.NgayChungTu);

      this._service.PhieuDieuChuyenBongXo().ChuyenTiep(this.quyTrinh).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  KhongDuyet() {
    if (this.quyTrinh.Ngay === null || this.quyTrinh.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.quyTrinh.Ngay !== null && this.quyTrinh.Ngay !== undefined)
        this.quyTrinh.NgayUnix = DateToUnix(this.quyTrinh.Ngay);
      if (this.quyTrinh.NgayChungTu !== null && this.quyTrinh.NgayChungTu !== undefined)
        this.quyTrinh.NgayChungTuUnix = DateToUnix(this.quyTrinh.NgayChungTu);

      this._service.PhieuDieuChuyenBongXo().KhongDuyet(this.quyTrinh).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  getNextSoQuyTrinh() {
    this._service.PhieuDieuChuyenBongXo().GetNextSo().subscribe((res: any) => {
      this.quyTrinh.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  validate(item: any) {
    let result = true;
    if (!item.Ngay) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
      result = false;
    }
    return result;
  }

  setData(item: any) {
    return {
      ...item,
      eAction: this.eAction,
      Loai:this.loai,
      NgayUnix: DateToUnix(this.quyTrinh.Ngay)
    }
  }

  GhiLai() {
    if (this.validate(this.quyTrinh)) {
      this._service.PhieuDieuChuyenBongXo().Set(this.setData(this.quyTrinh)).subscribe((res: any) => {

        // if (res.St) {
        //   this.quyTrinh = {
        //     ...res.Data,
        //     Ngay: UnixToDate(res.Data.NgayUnix)
        //   }
        //   this.toastr.success(res.message)
        //   this.KiemTraButtonModal();
        // } else this.toastr.error(res.message);

      })
    }

  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this._service.PhieuDieuChuyenBongXo().Delete(this.quyTrinh).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  getListdmKhoNhap(value: string) {
    let data = {
      CurrentPage: 0,
      Loai: 2,
      IdDuAn: this.store.getCurrent(),
      IddmKho: value
    };
    this._service.GetListdmKhoNhap(data).subscribe((res: any) => {
      this.listKhoNhan = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  delete(item: any) {
    this.quyTrinh.listItem = this.quyTrinh.listItem?.filter((ele: any) => ele.IddmItem !== item?.IddmItem)
  }

  themDanhSachKien() {
    this._service.getLuuKhoKiemKeKhoBong(this.store.getCurrent(), this.quyTrinh.IddmKho || '').subscribe((res: any) => {
      let modalRef = this._modal.open(DanhsachluachonkienComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.title = 'Danh sách kiện';
      modalRef.componentInstance.listView = res;
      modalRef.componentInstance.listDaChon = this.quyTrinh.listItem?.map((x: any) => x.IddmItem);
      modalRef.result.then((data) => {
        console.log(data)
        this.quyTrinh.listItem = data.map((ele: any) => {
          let _newObj = this.quyTrinh.listItem.find((x: any) => x.IddmItem === ele.IddmItem) ? this.quyTrinh.listItem.find((x: any) => x.IddmItem === ele.IddmItem) : ele;
          return {
            ..._newObj,
            Id: ''
          }
        });
      }, (reason) => { });
    })
  }

  Onclose() {
    this.activeModal.close();
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
    this.inputs.forEach((el: any) => {
      const realInput = el?.nativeElement?.querySelector('input'); // Lấy phần tử <input> thực tế
      if (realInput && !realInput.hasAttribute('data-keydown')) {
        realInput.setAttribute('data-keydown', 'true'); // Chỉ đăng ký 1 lần
        realInput.addEventListener(
          'keydown',
          (event: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
              event.preventDefault(); //  Chặn PrimeNG thay đổi số
              event.stopPropagation();
              event.stopImmediatePropagation();
              //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
              const indexInList = this.inputs.toArray().findIndex(
                (inp: any) => inp.nativeElement.querySelector('input') === realInput
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
