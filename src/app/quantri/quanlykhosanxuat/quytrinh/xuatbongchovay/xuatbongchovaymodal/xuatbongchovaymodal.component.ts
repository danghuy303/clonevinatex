import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { HopDongService } from 'src/app/services/Hopdong/hopdong.service';
import { ChonkienchovaymodalComponent } from '../chonkienchovaymodal/chonkienchovaymodal.component';

@Component({
  selector: 'app-xuatbongchovaymodal',
  templateUrl: './xuatbongchovaymodal.component.html',
  styleUrls: ['./xuatbongchovaymodal.component.css']
})
export class XuatbongchovaymodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
  listItem: any = [];
  paging: any = {};
  filter: any = {};
  listLoBong: any = [];
  listHopDong: any = [];
  listHopDongFull: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService, private hopDong: HopDongService,
    public toastr: ToastrService, public _modal: NgbModal) { }

  ngOnInit(): void {

    let data: any = {
      CurrentPage: 0,
      Loai: 2,
    }
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    });
    this.hopDong.QuyTrinhHopDong().GetListHopDongBanChoVay(this.item.IdDuAn).subscribe((res: any) => {
      this.listHopDong = mapArrayForDropDown(res, 'soTenHopDong', 'id');
      this.listHopDongFull = res;
    });
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    } else {
      this.GetQuyTrinh();
    }
  }
  GetQuyTrinh(page?) {
    this.services.PhieuXuatBongChoVay().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      this.listItem = (this.item.listItem);
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = this.item.listItem.length;
      this.KiemTraButtonModal();
      this.getListLoBong();
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
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
    if (validVariable(this.item.Ngay)) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatBongChoVay().ChuyenTiep(this.item).subscribe((res: any) => {
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
    if (validVariable(this.item.Ngay)) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatBongChoVay().KhongDuyet(this.item).subscribe((res: any) => {
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
    this.services.PhieuXuatBongChoVay().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this.services.PhieuXuatBongChoVay().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.Id = res.objectReturn.Id;
            this.GetQuyTrinh()
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
      this.services.PhieuXuatBongChoVay().Delete(this.item).subscribe((res: any) => {
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  delete(index) {
    let i = 15 * (this.paging.CurrentPage - 1) + index;
    let item = this.item.listItem.splice(i, 1)[0];
    this.listItem.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
    let listItem = this.item.listItem.filter(e => e.isXoa !== true);
    this.paging.TotalItem = listItem.length;
  }

  changePage(event) {
    let listItem = this.item.listItem.filter(e => e.isXoa !== true);
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.listItem = deepCopy(listItem.slice(start, end));
  }

  GetQuyTrinhFilter() {
    let items = [];
    items = deepCopy(this.item.listItem.filter(ele => ele.Ten.toLowerCase().indexOf(this.filter.KeyWord) !== -1
      || ele.MaKienDoi.toLowerCase().indexOf(this.filter.KeyWord) !== -1));
    this.listItem = deepCopy(items);
    this.paginator.changePage(0)
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = items.length;
  }
  GetQuyTrinhRefresh() {
    let listItem = this.item.listItem.filter(e => e.isXoa !== true);
    this.filter.KeyWord = '';
    this.listItem = deepCopy(listItem.slice(0, 15));
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = listItem.length;
  }
  getListLoBong() {
    let data: any = {}
    data.IddmLoaiBong = this.item.listItem[0].IddmLoaiBong;
    data.CurrentPage = 0;
    this.services.GetListLoBong(data).subscribe((res: any) => {
      this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
    });
  }
  GetMatHangTheoKho() {
    this.services.PhieuKiemKeKhoBong()
      .GetlistdmMatHangKiemKe(
        this.item.IddmKho || "",
        this.item.IdLoBong || ""
      )
      .subscribe((res1: any) => {
        res1.forEach((mathang) => {
          mathang.SoLuong = mathang.TonSoLuong;
          mathang.TrongLuong = mathang.TonTrongLuong;
        });
        this.item.listItem = res1;
        this.listItem = deepCopy(this.item.listItem.slice(0, 15));
        this.paging.CurrentPage = 1;
        this.paging.TotalPage = 5;
        this.paging.TotalItem = this.item.listItem.length;
      });
  }
  GetChonKien() {
    this.services.PhieuKiemKeKhoBong().GetlistdmMatHangKiemKe(this.item.IddmKho || "", this.item.IdLoBong || "").subscribe((res1: any) => {
      let modalRef = this._modal.open(ChonkienchovaymodalComponent, {
        size: 'xl',
        backdrop: 'static'
      })
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = deepCopy(this.item.listItem);
      modalRef.result.then((data) => {
        this.item.listItem = data.data;
        this.listItem = deepCopy(this.item.listItem.slice(0, 15));
        this.paging.CurrentPage = 1;
        this.paging.TotalPage = 5;
        this.paging.TotalItem = this.item.listItem.filter(e => e.isXoa !== true).length;
      }, (reason) => {
        // không
      });
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
