import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, deepCopy, mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-nhapkhohoiluongdomodal',
  templateUrl: './nhapkhohoiluongdomodal.component.html',
  styleUrls: ['./nhapkhohoiluongdomodal.component.css']
})
export class NhapkhohoiluongdomodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  editTableItem: any = [];
  listLoaiBong: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listdmViTri: any = [];
  listCaMay: any = [];
  listKho: any = [];
  listKhoHoiLD: any = [];
  lang: any = vn;
  data: any = {};
  listKeHoach: any = [];
  listCaSanXuat: any = [];
  listCaThucTe: any = [];
  // type: any = '';
  editField: any = false;
  nametype: any = '';
  TenLoaiBong: any = '';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {

  }

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
    else {
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListLoaiBong();
    this.getListKho();
    this.getListCapBong();
    this.getListCaSanXuat();
    this.getListCaThucTe();
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
    else if (this.item.IddmKho === null || this.item.IddmKho === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục kho");
    }
    else {
      if (this.newTableItem.Ten != undefined && this.newTableItem.SoCan != undefined && this.newTableItem.SoKien != undefined) {
        this.addBongHoi();
      }
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapLoBong().ChuyenTiep(this.item).subscribe((res: any) => {
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
  getListCapBong() {
    this._services.GetListdmCapBong(this.data).subscribe((res: any) => {
      this.listCapBong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  GetNextSoQuyTrinh() {
    this._services.QuyTrinhPhieuNhapLoBong().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  getListCaSanXuat() {
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaThucTe() {
    this._services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaThucTe = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  GhiLai() {
    this.item.Loai = 66;

    // if (this.opt !== 'edit') {
    //   if (this.type === 'bonghoi')
    //   else if (this.type === 'bongphe')
    //     this.item.Loai = 7;
    // }
    let isCheck = false;

    if (this.item.listItem !== undefined || this.item.listItem !== null) {
      for (let i = 0; i < this.item.listItem.length; i++) {
        if (this.item.listItem[i].IddmViTri === null || this.item.listItem[i].IddmViTri === undefined) {
          isCheck = true;
          break;
        }
      }
    }

    if (isCheck === true) {
      this.toastr.error("Bạn chưa chọn  vị trí");
      return;
    }
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
      return;
    }
    else if (this.item.IddmLoaiBong === null || this.item.IddmLoaiBong === undefined) {
      this.toastr.error("Bạn chưa chọn  danh mục loại bông");
      return;
    } else if (!this.item.IddmCaSanXuat) {
      this.toastr.error("Vui lòng điền đầy đủ thông tin cần thiết");
      return;

    }
    else {
      if (this.newTableItem.IddmLoaiBong != undefined && this.newTableItem.SoCan != undefined)
        this.addBongHoi();

      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.QuyTrinhPhieuNhapLoBong().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.Ngay = UnixToDate(this.item.NgayUnix);
            // console.log(this.type)
            this.KiemTraButtonModal();
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
      this._services.QuyTrinhPhieuNhapLoBong().Delete(this.item).subscribe((res: any) => {
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
    this.data.Loai = 66;

    // if (this.opt === 'edit') {
    //   this.data.Loai = this.item.Loai;
    // }
    // else{
    //  if (this.type === 'bonghoi'){
    //     this.data.IddmLoaiBong = this.item.IddmLoaiBong;
    //   }
    //   else  if (this.type === 'bongphe'){
    //     this.data.Loai = 7;
    //   }
    // }
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this._services.GetListdmKho({
      ...this.data,
      Loai: 66
    }).subscribe((res: any) => {
      this.listKhoHoiLD = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListLoaiBong() {
    // if (this.opt === 'edit') {
    //   if (this.type === 'bong')
    //     this.data.Loai = 2;
    //   else
    //     this.data.Loai = this.item.Loai;
    // }
    // else{
    //  if (this.type === 'bonghoi'){
    this.data.Loai = 6;
    this.data.IddmLoaiBong = this.item.IddmLoaiBong;
    //   }
    //   else  if (this.type === 'bongphe'){
    //     this.data.Loai = 7;
    //   }
    // }
    this._services.GetListdmLoaiBong(this.data).subscribe((res: any) => {
      this.listLoaiBong = mapArrayForDropDown(res, 'Ten', 'Id');
      var loaiBong: any = this.listLoaiBong.filter((e: any) => e.value === this.item.IddmLoaiBong);
      this.newTableItem.Ten = loaiBong[0].label;
      this.TenLoaiBong = loaiBong[0].label
    })
  }

  addBongHoi() {
    if (this.item.listKien == undefined || this.item.listKien == null)
      this.item.listKien = [];
    // this.newTableItem.IddmLoaiBong = this.item.IddmLoaiBong
    this.item.listKien.push(deepCopy(this.newTableItem));
    this.newTableItem = { Ten: this.TenLoaiBong };
  }

  deleteBongHoi(index) {
    let item = this.item.listKien.splice(index, 1)[0];
    if (item.Id === '' || item.Id === null || item.Id === undefined) {
    } else {
      item.isXoa = true;
      this.item.listKien.push(JSON.parse(JSON.stringify(item)));
    }
  }

  Onclose() {
    this.activeModal.close();
  }

  getnewitem(item) {
    var loaiBong: any = this.listLoaiBong.filter((e: any) => e.value === item.IddmLoaiBong);
    console.log(loaiBong)
    item.Ten = loaiBong[0].label;
    // if(this.item.listKien !== undefined && this.item.listKien.length > 0 && this.item.listKien !== null){
    //   this.item.listKien.forEach(element => {
    //     element.Ten = loaiBong[0].label;
    //     element.IddmLoaiBong = loaiBong[0].value;
    // });
    // }
  }

  navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const key = event.key;
    const inputElements: any = this.inputs.toArray();
    const colsPerRow = 3; // Số cột chứa ô nhập liệu

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
              const rowIndex = Math.floor(indexInList / 3);
              const colIndex = indexInList % 3;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } //  Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

}
