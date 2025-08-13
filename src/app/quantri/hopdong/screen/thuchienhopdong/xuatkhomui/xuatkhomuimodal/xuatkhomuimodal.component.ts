import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { BongphemathangmodalComponent } from 'src/app/quantri/quanlykhosanxuat/quytrinh/bongphemathangmodal/bongphemathangmodal.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhomuimodal',
  templateUrl: './xuatkhomuimodal.component.html',
  styleUrls: ['./xuatkhomuimodal.component.css']
})
export class XuatkhomuimodalComponent implements OnInit {

  opt: any = ''
  item: any = {};
  link: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listKhachHang: any = [];
  listPhanXuong: any = [];
  listItem: any = [];
  paging: any = { CurrentPage: 1 };
  TongKhoiLuong = 0;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;

  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal, private decimalPipe: DecimalPipe,) { }

  ngOnInit(): void {
    if (this.opt === 'edit') {
      this.GetQuyTrinh();
    }
    let data: any = {
      CurrentPage: 0
    }
    data.Loai = 23;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      if (this.link.eAction === 'PHIEUXUATCUONCUI') {
        this.item.IddmKho = res?.find(ele => ele.Ma === 'CUONCUI').Id
      }
    })
    this.services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuongOpt().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetQuyTrinh() {
    this.link.api().Get(this.item.Id).subscribe((res1: any) => {
      this.item = res1;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
      }
      this.listItem = res1.listItem;
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      this.TinhTongKhoiLuong();
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);

      this.link.api().ChuyenTiep(this.item).subscribe((res: any) => {
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
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);

      this.link.api().KhongDuyet(this.item).subscribe((res: any) => {
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
  GetNextSoQuyTrinh() {
    this.link.api().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn chọn ngày chứng từ!");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
      this.link.api().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;

            if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
              this.item.Ngay = UnixToDate(this.item.NgayUnix);
            }
            if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
              this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
            }
            this.KiemTraButtonModal();
            this.TinhTongKhoiLuong();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.link.api().Delete(this.item).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let item = this.item.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
  }

  GetLuuKho(sFilter) {
    console.log(this.item)
    this.services.GetLuuKhoBongPhe(this.item.IddmKho, '', 0, sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(BongphemathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.result.then((data) => {
        console.log(data.data)
        if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
          this.item.listItem.forEach(element => {
            element.isXoa = true
          });
        }

        data.data.forEach(element => {
          console.log(element)
          element.TonSoLuong = element.SoLuong
          element.TonTrongLuong = element.TrongLuong

          if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
            var data = this.item.listItem.filter(
              function (obj) {
                return obj.IddmItem == element.IddmItem;
              });
            if (data != undefined && data.length > 0) {
              element.Id = data[0].Id;
              element.isXoa = false;
              element.TrongLuong = data[0].TrongLuong;
              element.SoLuong = data[0].SoLuong;
            }
            else {
              element.TrongLuong = null;
              element.SoLuong = null;
            }
          }
          else {
            element.TrongLuong = null;
            element.SoLuong = null;
          }
          // element.SoLuongTon = parseInt(element.SoLuong);
          // element.TrongLuongTon = parseFloat(element.TrongLuong);
        });
        this.item.listItem = data.data;
      }, (reason) => {
        // không
      });
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page) + 1;
    var end = start + 14;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start, end);
  }
  Onclose() {
    this.activeModal.close();
  }
  TinhTongKhoiLuong() {
    this.TongKhoiLuong = 0;
    for (let i = 0; i < this.item.listItem.length; i++) {
      if (this.item.listItem[i].isXoa !== true) {
        this.TongKhoiLuong += ((this.item.listItem[i].TonTrongLuong || 0) * (this.item.listItem[i].SoLuong || 0)) + (this.item.listItem[i].TongTrongLuongChenhLech || 0);
        // this.TongKhoiLuong += (this.item.listItem[i].TonTrongLuong * this.item.listItem[i].SoLuong) || 0;
        // if(validVariable(this.item.listItem[i].TongTrongLuongChenhLech)){
        //   this.TongKhoiLuong += (this.item.listItem[i].TongTrongLuongChenhLech || 0)
        // }
      }
    }
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

