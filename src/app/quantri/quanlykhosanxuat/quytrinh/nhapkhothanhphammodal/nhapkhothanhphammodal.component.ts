import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';
import { DecimalPipe } from '@angular/common';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { Label } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-nhapkhothanhphammodal',
  templateUrl: './nhapkhothanhphammodal.component.html',
  styleUrls: ['./nhapkhothanhphammodal.component.css']
})
export class NhapkhothanhphammodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  opt: any = ''
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {};
  listLoaiBong: any = [];
  listKhoHoiAm: any = [];
  listKhoThanhPham: any = [];
  listdmQuyCachDongGoi: any = [];
  listdmQuyCachDongGoiAll: any = [];
  lang: any = vn;
  data: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  format = '0.0-2';
  // listMucDich: any = [
  //   { value: 0, label: 'Xuất khẩu' },
  //   { value: 1, label: 'Nội địa' },
  // ]
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;

  constructor(public activeModal: NgbActiveModal, private decimalPipe: DecimalPipe,
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

    this.getListKho();
    this.getListdmQuyCachDongGoi();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenTiep() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      let _isValid = this.checkValidBeforeSubmit();
      if (_isValid) {
        return;
      }
      this._services.PhieuNhapThanhPham().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }

  GetNextSoQuyTrinh() {
    this._services.PhieuNhapThanhPham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }
  checkValidate() {
    if (this.item.listItem.length > 0 && this.item.listItem.length !== undefined) {
      for (let i = 0; i < this.item.listItem.length; i++) {
        if (this.item.listItem[i].IdLoHang !== null && this.item.listItem[i].IdLoHang !== undefined) {
          if (this.item.listItem[i].IddmQuyCachDongGoi === null || this.item.listItem[i].IddmQuyCachDongGoi === undefined) {
            return false;
          }
        }
      }
    }
    return true;
  }

  checkValidBeforeSubmit() {
    let arr = [];
    let _bool = false;
    this.item.listItem.map((x: any) => {
      if (x.SoQuaSoiThanhPham > x.SoQuaSoiHoiAm) {
        arr.push(x);
        _bool = true;
      }
    })
    if (_bool) {
      let msg = `${arr.map(x => x.Ten).join(', ')} có số quả nhập lớn hơn số quả hồi ẩm!`
      this.toastr.error(msg);
    }
    return _bool
  }

  GhiLai() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      let _isValid = this.checkValidBeforeSubmit();
      if (_isValid) {
        return;
      }
      this._services.PhieuNhapThanhPham().Set(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
             this.getListQuyCachTheoMatHang();
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
      this._services.PhieuNhapThanhPham().Delete(this.item).subscribe((res: any) => {
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
    this.data.Loai = 10;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoHoiAm = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    this.data.Loai = 11;
    this._services.GetListdmKho(this.data).subscribe((res: any) => {
      this.listKhoThanhPham = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoiAll = res;
      this.listdmQuyCachDongGoi = mapArrayForDropDown(res, 'Ten', 'Id');
      if (this.item.listItem?.length > 0) {
        this.item.listItem = this.item.listItem?.map(ele => {
          return {
            ...ele,
            listQuyCach: res?.filter(obj => obj.Kg_Cone === ele.KgCone)
              .map(obj => {
                return {
                  value: obj.Id,
                  label: obj.Ten
                }
              })
          }
        })
      }
    })
  }
  delete(index) {
    // let item = this.item.listItem.splice(index, 1)[0];
    // if (item.Id === '' || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    // }

    this.item.listItem.splice(index, 1)
    this.item.listItem = [...this.item.listItem];
  }

  Onclose() {
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    let data = {
      Ngay: DateToUnix(this.item.Ngay),
      IddmKho: this.item.IddmKhoHoiAm,
    }
    let cols: any = [
      {
        header: 'Tên',
        field: 'Ten',
        width: 'unset'
      },
      {
        header: 'Tên lô',
        field: 'TenLoHang',
        width: 'unset'
      },
      {
        header: 'Số quả',
        field: 'SoLuong',
        width: 'unset'
      },
      {
        header: 'Khối lượng/ quả (kg)',
        field: 'TrongLuong',
        width: 'unset'
      },
    ];
    this._services.GetlistdmMatHangThanhPham(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhomathangmodalComponent, {
        size: 'lg',
        backdrop: 'static'
      })
      // if(res1 !== null && res1 !== undefined){
      //   res1.forEach(element => {
      //     element.SoLuong = this.decimalPipe.transform(element.SoLuong, this.format, 'en-EN');
      //     element.TrongLuong = this.decimalPipe.transform(element.TrongLuong, this.format, 'en-EN');
      //   });
      // }
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.cols = cols;
      modalRef.componentInstance.listItem = this.item.listItem;
      modalRef.componentInstance.kho = 'khothanhpham';
      modalRef.result.then((data) => {
        let listItem = deepCopy(this.item.listItem);
        this.item.listItem = data.data;
        this.item.listItem.forEach(element => {
          let isCheck: any = false;
          if (listItem !== undefined && listItem.length > 0) {
            for (let i = 0; i < listItem.length; i++) {
              if (listItem[i].IddmItem === element.IddmItem && listItem[i].IdLoHang === element.IdLoHang) {
                isCheck = true;
                element.SoQuaSoiHoiAm = listItem[i].SoQuaSoiHoiAm;
                element.SoQuaSoiThanhPham = listItem[i].SoQuaSoiThanhPham;
                element.KgCone = listItem[i].KgCone;
                element.IddmKho = this.item.IddmKhoThanhPham;
                element.SoKhoang = listItem[i].SoKhoang;
                element.GhiChu = listItem[i].GhiChu;
                element.SoKien = listItem[i].SoKien;
                element.IddmQuyCachDongGoi = listItem[i].IddmQuyCachDongGoi;
                element.Id = "";
                element.TongKhoiLuong = element.KgCone * element.SoQuaSoiThanhPham;
                break;
              }
            }
          }
          if (isCheck === false) {
            element.SoQuaSoiHoiAm = element.SoLuong;
            element.SoQuaSoiThanhPham = element.SoLuong;
            element.KgCone = element.TrongLuong;
            element.IddmKho = this.item.IddmKhoThanhPham;
            element.Id = "";
            element.TongKhoiLuong = element.KgCone * element.SoQuaSoiThanhPham;
          }
          this.getListQuyCachTheoMatHang();
        });
      }, (reason) => {
        // không
      });
    })
  }

  getListQuyCachTheoMatHang() {
    this.item.listItem?.forEach(ele => {
      ele.listQuyCach = this.listdmQuyCachDongGoiAll
        ?.filter(obj => obj.Kg_Cone === ele.KgCone)
        .map(obj => ({
          value: obj.Id,
          label: obj.Ten
        }));
    });
  }

  TongKhoiLuong(item) {
    item.TongKhoiLuong = (item.SoQuaSoiThanhPham || 0) * (item.KgCone || 0);
  }
  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] = Math.round(res);
      this.TongKhoiLuong(item);
    })
  }
  ExportExcel() {
    if (validVariable(this.item.Id)) {
      this._services.BaoCao().ExportPhieuNhapKhoThanhPham_Bieu1({ IdPhieuNhapKho: this.item.Id }).subscribe((res: any) => {
        if (res) {
          if (validVariable(res.State)) {
            this.toastr.error(res.message);
          } else {
            this._services.download(res.TenFile);
          }
        }
      })
    } else {
      this.toastr.error('Vui lòng ghi lại phiếu sau đó xuất!')
    }
  }
  KhongDuyet() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn  ngày");
    }
    else {
      if (this.item.Ngay !== null && this.item.Ngay !== undefined)
        this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuNhapThanhPham().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
  }
  TinhKgCone(item) {
    item.KgCone = (item.TongKhoiLuong || 0) / (item.SoQuaSoiThanhPham || 1);
  }

  getTooltip(id: string, arr: any) {
    let text = ``
    let _thisObj = arr.find((x: any) => x.value === id);
    if (_thisObj) {
      text = _thisObj.label
    }
    return text;
  }

  navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
    const key = event.key;
    const inputElements: any = this.inputs.toArray();
    const colsPerRow = 6; // Số cột chứa ô nhập liệu

    let nextIndex = rowIndex * colsPerRow + colIndex;
    switch (key) {
      case "ArrowRight":
        event.preventDefault();
        nextIndex += 1;
        break;
      case "ArrowLeft":
        event.preventDefault();
        nextIndex -= 1;
        break;
      case "ArrowDown":
        event.preventDefault();
        nextIndex += colsPerRow;
        break;
      case "ArrowUp":
        event.preventDefault();
        nextIndex -= colsPerRow;
        break;
    }

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
              event.preventDefault(); // ❌ Chặn PrimeNG thay đổi số
              event.stopPropagation();
              event.stopImmediatePropagation();
              //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
              const indexInList = this.inputs.toArray().findIndex(
                (inp) => inp.nativeElement.querySelector('input') === realInput
              );
              const rowIndex = Math.floor(indexInList / 6);
              const colIndex = indexInList % 6;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } // ⚡ Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

  chonQuyCach(data) {
    console.log('data', data);
    let _objQuyCach = this.listdmQuyCachDongGoiAll.find(ele => ele.Id === data.IddmQuyCachDongGoi);
    let _soQuaQuyCach = _objQuyCach.SoQua || 0;
    let _trongLuongQuyCach = _objQuyCach.TrongLuong || 0;
    console.log('_soQuaQuyCach', _soQuaQuyCach);
    console.log('_trongLuongQuyCach', _trongLuongQuyCach);
    data.SoQuaSoiThanhPham = (data.SoKien || 0) * (_soQuaQuyCach || 0);
    data.TongKhoiLuong = (data.SoQuaSoiThanhPham) * (_trongLuongQuyCach || 0);
    this.item.listItem = [...this.item.listItem];
    console.log('listItem', this.item.listItem);
  }

  nhapSoKien(data) {
    this.chonQuyCach(data)
  }

}
