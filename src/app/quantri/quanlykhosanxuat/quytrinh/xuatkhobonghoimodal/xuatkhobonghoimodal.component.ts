import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-xuatkhobonghoimodal',
  templateUrl: './xuatkhobonghoimodal.component.html',
  styleUrls: ['./xuatkhobonghoimodal.component.css']
})
export class XuatkhobonghoimodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild("paginator") paginator: any;
  opt: any = ''
  Id: any = ''
  item: any = { listItem: [] };
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listPhanXuong: any = [];
  listPhuongAnPhaBong: any = [];
  listItem: any = [];
  paging: any = { CurrentPage: 1 };
  listdmKhachHang: any = [];
  listKien: any = [];
  listKienFull: any = [];
  listTrienKhaiKeHoachSanXuat: any = [];
  newTableItem: any = {};
  initialized: boolean = false;
  lastInputCount: number = 0;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    let data: any = {
      CurrentPage: 0
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList({ ...data, isHoanThanh: false }).subscribe((res: any) => {
      this.listTrienKhaiKeHoachSanXuat = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res: any) => {
      this.listPhuongAnPhaBong = mapArrayForDropDown((typeof res) === 'object' ? res.items : res, 'Ten', 'Id');
    })

    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listdmKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    if (this.opt !== 'edit') {
      data.Loai = 6;
      data.IddmPhanXuong = this.item.IddmPhanXuong || "";
      this.services.GetListdmKho(data).subscribe((res: any) => {
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
      this.item.Loai = 6;
    }
    else
      this.GetQuyTrinh();
  }
  GetQuyTrinh() {
    this.services.PhieuXuatSanXuat().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(Math.round(this.item.NgayChungTuUnix));
      }
      this.listItem = deepCopy(res1.listItem);
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      this.getLuuKho();
      let data: any = {
        CurrentPage: 0,
        Loai: 6,
        IddmPhanXuong: this.item.IddmPhanXuong || "",
      }
      this.services.GetListdmKho(data).subscribe((res: any) => {
        this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
      })
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.checkTruocKhiLuu()) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (validVariable(this.newTableItem.IddmItem)) {
        if (this.item.listItem === undefined || this.item.listItem === null)
          this.item.listItem = [];
        this.item.listItem.push(deepCopy(this.newTableItem));
        this.newTableItem = {};
      }
      this.services.PhieuXuatSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
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
    if (this.checkTruocKhiLuu()) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (validVariable(this.newTableItem.IddmItem)) {
        if (this.item.listItem === undefined || this.item.listItem === null)
          this.item.listItem = [];
        this.item.listItem.push(deepCopy(this.newTableItem));
        this.newTableItem = {};
      }
      this.services.PhieuXuatSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
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
    this.services.PhieuXuatSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.checkTruocKhiLuu()) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (validVariable(this.newTableItem.IddmItem)) {
        if (this.item.listItem === undefined || this.item.listItem === null)
          this.item.listItem = [];
        this.item.listItem.push(deepCopy(this.newTableItem));
        this.newTableItem = {};
      }
      this.services.PhieuXuatSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.Id = this.item.Id;
            this.KiemTraButtonModal();
            this.GetQuyTrinh();
          }
          else {
            this.toastr.error(res.message)
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
      this.services.PhieuXuatSanXuat().Delete(this.item).subscribe((res: any) => {
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

  // GetLuuKho(sFilter) {
  //   this.services.getLuuKho(this.item.IddmKho,'', 0 , sFilter).subscribe((res1: any) => {
  //     let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
  //       size: 'fullscreen',
  //       backdrop: 'static'
  //     })
  //     modalRef.componentInstance.opt = 'edit';
  //     modalRef.componentInstance.listMatHang = res1;
  //     modalRef.result.then((data) => {
  //       this.item.listItem = data.data;
  //     }, (reason) => {
  //       // không
  //     });
  //   })
  // }
  changePage(event) {
    console.log(this.item.listItem);
    this.listItem = [...this.item.listItem, ...this.listItem];
    console.log(this.listItem);
    this.listItem = this.listItem.reduce((total, ele) => {
      if (!total.some((x) => x.Id === ele.Id)) {
        total.push(ele)
      }
      return total
    }, [])
    console.log(this.listItem);
    this.listItem = this.listItem.sort((a, b) => a.ThuTu - b.ThuTu);
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.listItem.slice(start, end);
  }
  Onclose() {
    this.activeModal.close();
  }
  getLuuKho() {
    this.services.getLuuKhoKiemKeKhoBongHoi(this.item.IddmKho, "", "", "").subscribe((res: any) => {
      this.listKien = mapArrayForDropDown(res, 'Ten', 'IddmItem');
      this.listKienFull = res;
    })
  }
  getTon(item) {
    this.listKienFull.forEach(element => {
      if (element.IddmItem == item.IddmItem) {
        item.TonSoLuong = element.TonSoLuong;
        item.TonTrongLuong = element.TonTrongLuong;
      }
    });
  }
  add() {
    if (validVariable(this.newTableItem.IddmItem)) {
      if (this.item.listItem === undefined || this.item.listItem === null)
        this.item.listItem = [];
      this.item.listItem.push(deepCopy(this.newTableItem));
      this.newTableItem = {};
      console.log(this.paging);
      if (this.item.listItem.length > this.paging.CurrentPage * 10) {
        console.log(Math.floor(this.item.listItem.length / 10));
        this.paginator.changePage(
          Math.floor(this.item.listItem.length / 10)
        );
      }
      // else {
      //     this.changePage({ page: this.paging.CurrentPage - 1 });
      // }
    } else {
      this.toastr.error("Vui lòng chọn mặt hàng cần thêm!");
    }
  }
  checkTruocKhiLuu() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error('Bạn chưa chọn ngày chứng từ!')
      return false;
    }
    if (this.item.listItem !== undefined) {
      if (this.item.listItem.length > 0) {
        this.item.listItem.forEach(element => {
          if (!validVariable(element.IddmItem) && element.isXoa !== true) {
            this.toastr.error('Bạn chưa chọn kiện!')
            return false;
          }
        });
      }
    }
    return true;
  }

  getTooltip(id: string, arr: any) {
    let text = ``
    let _thisObj = arr.find((x: any) => x.value === id);
    if (_thisObj) {
      text = _thisObj.label
    }
    return text;
  }

  // navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
  //   const key = event.key;
  //   const inputElements: any = this.inputs.toArray();
  //   const colsPerRow = 2; // Số cột chứa ô nhập liệu

  //   let nextIndex = rowIndex * colsPerRow + colIndex;
  //   if (key === 'ArrowRight') nextIndex += 1;
  //   if (key === 'ArrowLeft') nextIndex -= 1;
  //   if (key === 'ArrowDown') nextIndex += colsPerRow;
  //   if (key === 'ArrowUp') nextIndex -= colsPerRow;

  //   setTimeout(() => {
  //     while (nextIndex >= 0 && nextIndex < inputElements.length) {
  //       const nextElement = inputElements[nextIndex]?.nativeElement;
  //       if (!nextElement) break; // Dừng nếu không có phần tử hợp lệ
  //       let inputInside = nextElement.querySelector('input');
  //       // Nếu không tìm thấy input, thử tìm thẻ con trong PrimeNG component
  //       if (!inputInside) {
  //         nextElement.focus();
  //         return;
  //       }

  //       // Kiểm tra nếu ô hiện tại bị disabled
  //       const isDisabled =
  //         inputInside.hasAttribute('disabled') ||
  //         inputInside.classList.contains('p-disabled') ||
  //         nextElement.hasAttribute('ng-reflect-disabled') ||
  //         nextElement.classList.contains('p-disabled');
  //       // Nếu ô không bị disabled, focus và thoát vòng lặp
  //       if (!isDisabled) {
  //         inputInside.focus();
  //         return;
  //       }
  //       // Nếu bị disabled, tiếp tục kiểm tra ô tiếp theo
  //       nextIndex = getNextIndex(nextIndex, key, colsPerRow);
  //     }
  //   }, 0);

  //   // Hàm tính toán nextIndex để nhảy ô chính xác
  //   function getNextIndex(currentIndex: number, key: string, colsPerRow: number): number {
  //     if (key === 'ArrowRight') return currentIndex + 1;
  //     if (key === 'ArrowLeft') return currentIndex - 1;
  //     if (key === 'ArrowDown') return currentIndex + colsPerRow;
  //     if (key === 'ArrowUp') return currentIndex - colsPerRow;
  //     return currentIndex;
  //   }
  // }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.initInputListeners();
  //   }, 0);
  // }

  // ngAfterViewChecked() {
  //   this.initInputListeners(); // Đảm bảo input được cập nhật khi bảng thay đổi
  // }
  // initInputListeners() {
  //   this.inputs.forEach((el) => {
  //     const realInput = el?.nativeElement?.querySelector('input'); // Lấy phần tử <input> thực tế
  //     if (realInput) {
  //       realInput.addEventListener(
  //         'keydown',
  //         (event: KeyboardEvent) => {
  //           if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
  //             event.preventDefault(); //  Chặn PrimeNG thay đổi số
  //             event.stopPropagation();
  //             event.stopImmediatePropagation();
  //             //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
  //             const indexInList = this.inputs.toArray().findIndex(
  //               (inp) => inp.nativeElement.querySelector('input') === realInput
  //             );
  //             const rowIndex = Math.floor(indexInList / 2);
  //             const colIndex = indexInList % 2;
  //             this.navigateTable(event, rowIndex, colIndex);
  //           }
  //         },
  //         { capture: true } //  Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
  //       );
  //     }
  //   });
  // }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initInputListeners();
      this.initialized = true;
    }, 0);
  }

  ngAfterViewChecked() {
    const currentInputCount = this.inputs.length;

    // Chỉ cập nhật nếu số lượng inputs thay đổi và chưa được khởi tạo
    if (!this.initialized || this.lastInputCount !== currentInputCount) {
      this.lastInputCount = currentInputCount;

      setTimeout(() => {
        this.initInputListeners();
        this.initialized = true;
      }, 0);
    }
  }
  initInputListeners() {
    this.inputs.forEach((el) => {
      const realInput = el.nativeElement.querySelector('input'); // Lấy thẻ input thật trong p-inputNumber
      if (realInput) {
        realInput.addEventListener('keydown', (event: KeyboardEvent) => this.navigateTable(event, realInput), {
          capture: true
        });
      }
    });
  }

  navigateTable(event: KeyboardEvent, currentInput: HTMLInputElement) {

   
    const key = event.key;
    const inputElements = Array.from(document.querySelectorAll('p-inputNumber input')) as HTMLInputElement[];
    if (!inputElements.length) return;

    const currentIndex = inputElements.indexOf(currentInput);
    if (currentIndex === -1) return; // Không tìm thấy phần tử hiện tại
    let nextIndex = currentIndex;

    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Enter', 'Escape', '.', ',', '-', '+'];
    if ((key >= '0' && key <= '9') || allowedKeys.includes(key)) {
      return; // Cho phép nhập số
    }
    if (key === 'ArrowRight') nextIndex = this.findNextIndex(inputElements, currentIndex, 1);
    if (key === 'ArrowLeft') nextIndex = this.findNextIndex(inputElements, currentIndex, -1);
    if (key === 'ArrowDown') nextIndex = this.findNextIndex(inputElements, currentIndex, 3); // Nhảy xuống hàng tiếp theo
    if (key === 'ArrowUp') nextIndex = this.findNextIndex(inputElements, currentIndex, -3); // Nhảy lên hàng trên

    if (nextIndex >= 0 && nextIndex < inputElements.length) {
      event.preventDefault(); // Ngăn chặn p-inputNumber tự động thay đổi giá trị khi bấm mũi tên
      event.stopPropagation();
      inputElements[nextIndex].focus();
      return;
    }
  }

  findNextIndex(elements: HTMLInputElement[], currentIndex: number, step: number): number {
    let nextIndex = currentIndex + step;
    while (nextIndex >= 0 && nextIndex < elements.length) {
      if (!elements[nextIndex].disabled) return nextIndex;
      nextIndex += step; // Bỏ qua ô bị disabled
    }
    return currentIndex; // Nếu không tìm thấy ô hợp lệ, giữ nguyên
  }


}