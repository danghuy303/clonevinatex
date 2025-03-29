import { AfterViewChecked, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToDatePicker, DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { DoikienbongmodalComponent } from '../doikienbongmodal/doikienbongmodal.component';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';
import { VitrikienmodalComponent } from './vitrikienmodal/vitrikienmodal.component';

@Component({
  selector: 'app-xuatkhomodal',
  templateUrl: './xuatkhomodal.component.html',
  styleUrls: ['./xuatkhomodal.component.css']
})
export class XuatkhomodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('paginator') paginator;
  opt: any = '';
  Id: any = '';
  item: any = {};
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
  paging: any = {};
  filter: any = {};
  listKienDoi: any = [];

  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {
    this.GetQuyTrinh();

    let data: any = {
      CurrentPage: 0
    }
    this.services.PhuongAnPhaBong().GetList(data).subscribe((res: any) => {
      this.listPhuongAnPhaBong = mapArrayForDropDown(res.items, 'Ten', 'Id');
    })
    // data.Loai = 2;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetQuyTrinh(page?) {
    this.services.PhieuXuatSanXuat().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      this.services.PhieuXuatSanXuat().GetListKienDoi(this.item.Id).subscribe((res: any) => {
        this.listKienDoi = res;
        res1.listItem.forEach(element => {
          element.listKienDoi = mapArrayForDropDown(this.listKienDoi.filter(x => x.IdLoBong === element.IdLoBong), 'Ten', 'Ma');
          if (element.MaKienDoi != null) {
            let itemMoi = {
              value: element.MaKienDoi,
              label: element.MaKienDoi + "-" + element.MicKienDoi,
            }
            element.listKienDoi.push(itemMoi);
            element.MaKienDoi_root = deepCopy(element.MaKienDoi);;
          }
        });
        this.item.listItem = res1.listItem;
        this.listItem = res1.listItem.slice(0, 15);
      })
      // res1.listItem.sort((a,b)=>{
      //   return a.TenLoBong.localeCompare(b.TenLoBong);
      // })
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.KiemTraButtonModal();
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
      }
      if (validVariable(page)) {
        this.changePage(page);
      }

    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined) {
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    }
    if (validVariable(this.item.Ngay)) {

      this.item.listItem.forEach(element => {
        delete element.listKienDoi;
      });
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatSanXuat().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  KhongDuyet() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined) {
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    }
    if (validVariable(this.item.Ngay)) {
      this.item.listItem.forEach(element => {
        delete element.listKienDoi;
      });
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatSanXuat().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatSanXuat().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {

      this.item.listItem.forEach(element => {
        delete element.listKienDoi;
      });
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatSanXuat().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.filter.KeyWord = '';
            this.GetQuyTrinh();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
    else {
      this.toastr.error('Bạn chưa nhập ngày chứng từ!')
    }
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {

      this.item.listItem.forEach(element => {
        delete element.listKienDoi;
      });
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

  GetLuuKho(sFilter) {
    this.services.getLuuKho(this.item.IddmKho, '', 0, sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'fullscreen',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.result.then((data) => {
        this.item.listItem = data.data;
      }, (reason) => {
        // không
      });
    })
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.listItem = this.item.listItem.slice(start, end);
  }

  GetQuyTrinhFilter() {
    let items = [];
    items = this.item.listItem.filter(ele => ele.Ten?.toLowerCase().includes(this.filter.KeyWord) || ele.MaKienDoi?.toLowerCase().includes(this.filter.KeyWord));
    console.log(this.item.listItem)
    this.listItem = deepCopy(items);
    this.paginator.changePage(0)
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = items.length;
    this.listItem = items.slice(0, 15);
  }
  GetQuyTrinhRefresh() {
    this.filter.KeyWord = '';
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listItem.length;
    this.listItem = this.item.listItem.slice(0, 15);
  }
  exportExcel() {
    this.services.PhieuXuatSanXuat().ExportExcel(this.item.Id).subscribe((res: any) => {
      this.services.download(res.TenFile);
    })
  }
  exportHoaDon() {
    this.services.PhieuXuatSanXuat().ExportHoaDon(this.item.Id).subscribe((res: any) => {
      this.services.download(res.TenFile);
    })
  }
  changeKien(item, index) {
    this.services.GetDanhSachKienCoTheThayThe(item.IddmItem).subscribe(res => {
      let modalRef = this._modal.open(DoikienbongmodalComponent, { size: 'xl' })
      modalRef.componentInstance.IdPhieu = this.item.Id;
      modalRef.componentInstance.CurrentItem = [deepCopy(item)];
      modalRef.componentInstance.items = res;
      modalRef.result
        .then(res => {
          let page = { page: this.paging.CurrentPage - 1 };
          this.GetQuyTrinh(page);
        })
        .catch(er => { console.log('err:', er) })
    })
  }
  next(event) {
    let nextIndex = event.srcElement.tabIndex;
    let items: any = document.querySelectorAll('.focus-tag');
    if (nextIndex < 15) {
      items[nextIndex].focus();
    }
  }
  changeKienDoi(item) {
    if (item.MaKienDoi !== null) {
      let listItemChange = this.item.listItem.filter(x => x.IdLoBong == item.IdLoBong && x.IddmItem !== item.IddmItem);
      item.MaKienDoi_root = deepCopy(item.MaKienDoi)
      item.MicKienDoi = item.listKienDoi.find(ele => ele.value == item.MaKienDoi).label.split("-")[1];
      let itemMoi = {
        value: item.MaKien,
        label: item.Ten + "-" + item.Mic,
      }
      listItemChange.forEach(element => {
        let itemChecklist = element.listKienDoi.find(ele => ele.value == item.MaKien);
        element.listKienDoi = element.listKienDoi.filter(x => x.value !== item.MaKienDoi);
        if (itemChecklist === undefined || itemChecklist === null)
          element.listKienDoi.push(itemMoi);
      });
    }
    else {
      let itemMoi = {
        value: item.MaKienDoi_root,
        label: item.MaKienDoi_root + "-" + item.MicKienDoi,
      }
      item.MicKienDoi = 0;
      let listItemChange = this.item.listItem.filter(x => x.IdLoBong == item.IdLoBong && x.IddmItem !== item.IddmItem);
      listItemChange.forEach(element => {
        element.listKienDoi = element.listKienDoi.filter(x => x.value !== item.MaKien);
        element.listKienDoi.push(itemMoi);
      });
    }
  }
  ViTriKien(item) {
    let modalRef = this._modal.open(VitrikienmodalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res: any) => {
    })
      .catch(er => {
        console.log(er)
      })
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
              const rowIndex = Math.floor(indexInList / 1);
              const colIndex = indexInList % 1;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } //  Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

}
