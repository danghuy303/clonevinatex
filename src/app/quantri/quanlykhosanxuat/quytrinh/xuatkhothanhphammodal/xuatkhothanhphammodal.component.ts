import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CalcmodalComponent } from 'src/app/quantri/modal/calcmodal/calcmodal.component';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, deepCopy, mapArrayForDropDown, UnixToDate, validVariable } from '../../../../services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';
import { XuatthanhphammathangmodalComponent } from '../xuatthanhphammathangmodal/xuatthanhphammathangmodal.component';
import { DanhsachhopdongmodalComponent } from '../../../modal/danhsachhopdongmodal/danhsachhopdongmodal.component';

@Component({
  selector: 'app-xuatkhothanhphammodal',
  templateUrl: './xuatkhothanhphammodal.component.html',
  styleUrls: ['./xuatkhothanhphammodal.component.css']
})
export class XuatkhothanhphammodalComponent implements OnInit, AfterViewInit, AfterViewChecked {

  opt: any = ''
  item: any = { listItem: [] };
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  newTableItem: any = {
    "Id": "",
    "idKeHoachXuatNguyenLieu": this.item.Id,
  };
  editTableItem: any = [];
  listPhuongAnSapXep: any = [];
  listLoBong: any = [];
  listCapBong: any = [];
  listKho: any = [];
  listloaisoi: any = [];
  lang: any = vn;
  data: any = {};
  filter: any = {};
  type: any = '';
  editField: any = false;
  nametype: any = '';
  TongKhoiLuong = 0;
  TongThanhTien = 0;
  listdmKhachHang: any = [];
  listdmQuyCachDongGoi: any = [];
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;

  constructor(public activeModal: NgbActiveModal,
    public toastr: ToastrService, public _modal: NgbModal, private _services: SanXuatService) {
  }

  ngOnInit(): void {
    this.GetListdmLoaiSoi();
    this.getListdmQuyCachDongGoi();
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
      if (this.item.listItem.length > 0) {
        this.item.listItem = this.item.listItem?.map(ele => {
          return {
            ...ele,
            NgayNhapKho: UnixToDate(ele.NgayNhapKhoUnix),
            NgaySanXuat: UnixToDate(ele.NgaySanXuatUnix)
          }
        })
        // this.item.listItem.filter(obj => {
        //   obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
        //   obj.ThoiGianDuKien = UnixToDate(obj.ThoiGianDuKienUnix);
        // });
      }
      this.TinhTongKhoiLuong();
      this.TinhTongThanhTien();
      this.KiemTraButtonModal();
    }
    if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
      this.item.Ngay = UnixToDate(this.item.NgayUnix);
    }
    this.data.CurrentPage = 0;
    this.getListKho();
    this.getListdmKhachHang();
  }
  KiemTraButtonModal() {
    this._services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  GetListdmLoaiSoi() {
    let dataSearch: any = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: "",
      Ma: "",
      Ten: ""
    };
    this._services.GetListdmLoaiSoi(dataSearch).subscribe((res: any) => {
      this.listloaisoi = mapArrayForDropDown(res, 'Ten', 'Id');
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
  ChuyenTiep() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else if (this.item.IddmKhachHang === null || this.item.IddmKhachHang === undefined) {
      this.toastr.error("Bạn chưa chọn khách hàng!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuXuatThanhPham().ChuyenTiep(this.setData()).subscribe((res: any) => {
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

  KhongDuyet() {
    if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);

      this._services.PhieuXuatThanhPham().KhongDuyet(this.setData()).subscribe((res: any) => {
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
    this._services.PhieuXuatThanhPham().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  setData() {
    let data = {
      ...this.item,
      NgayUnix: DateToUnix(this.item.Ngay),
      listItem: this.item.listItem.map(ele => {
        return {
          ...ele,
          NgayNhapKhoUnix: DateToUnix(ele.NgayNhapKho),
          NgaySanXuatUnix: DateToUnix(ele.NgaySanXuat)
        }
      })
    }
    return data;
  }

  GhiLai() {
    if (!this.checkValidate())
      this.toastr.error("Bạn chưa chọn quy cách đóng gói!");
    else if (this.item.Ngay === null || this.item.Ngay === undefined) {
      this.toastr.error("Bạn chưa chọn ngày chứng từ!");
    }
    else if (this.item.IddmKhachHang === null || this.item.IddmKhachHang === undefined) {
      this.toastr.error("Bạn chưa chọn khách hàng!");
    }
    else {
      // this.item.NgayUnix = DateToUnix(this.item.Ngay);
      this._services.PhieuXuatThanhPham().Set(this.setData()).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message)
            this.opt = 'edit';
            this.item = res.objectReturn;
            this.item.listItem = this.item.listItem?.map(ele => {
              return {
                ...ele,
                NgayNhapKho: UnixToDate(ele.NgayNhapKhoUnix),
                NgaySanXuat: UnixToDate(ele.NgaySanXuatUnix)
              }
            })
            if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
              this.item.Ngay = UnixToDate(this.item.NgayUnix);
            }
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
      this._services.PhieuXuatThanhPham().Delete(this.item).subscribe((res: any) => {
        console.log(res);
        if (res?.State === 1) {
          this.activeModal.close();
        } else {
          this.toastr.error(res.message);
        }
      })
    }).catch(er => console.log(er))
  }

  tinhToan(item, opt) {
    let modalRef = this._modal.open(CalcmodalComponent)
    modalRef.result.then((res) => {
      item[opt] = res;
      this.TinhTongKhoiLuong();
    })
  }

  getListKho() {
    let data = {
      CurrentPage: 0,
      Loai: 11,
    }
    this._services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListdmKhachHang() {
    this._services.dmKhachHang().GetListOpt().subscribe((res: any) => {
      this.listdmKhachHang = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  filtertable_add() {
    if (this.filter.KeyWord != undefined && this.filter.KeyWord != null && this.filter.KeyWord != "") {
      this.item.listItem_copy = deepCopy(this.item.listItem);
      let filter = this.item.listItem.filter(obj => {
        let Ten = obj.objloaibong.label.toLowerCase();
        let indexOf = Ten.indexOf(this.filter.KeyWord);
        return indexOf != -1
      });
      this.item.listItem = filter;
    }
    else {
      this.item.listItem = deepCopy(this.item.listItem_copy);
      this.item.listItem.filter(obj => {
        obj.ThoiGianDuKien = obj.ThoiGianDuKienUnix > 0 ? UnixToDate(obj.ThoiGianDuKienUnix) : 0;
      });
    }
  }

  resetFilter() {
    this.filter = {};
    this.filter.KeyWord = '';
    this.filtertable_add();
  }

  delete(index) {
    this.item.listItem.splice(index, 1);
    this.TinhTongKhoiLuong();
    // let item = this.item.listItem.splice(index, 1)[0];
    // if (item.Id === '' || item.Id === null || item.Id === undefined) {
    // } else {
    //   item.isXoa = true;
    //   this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    // }
  }

  Onclose() {
    this.activeModal.close();
  }
  GetMatHangTheoKho() {
    var data = {
      Ngay: DateToUnix(this.item.Ngay),
      IddmKho: this.item.IddmKho,
      // IddmPhanXuong: this.item.IddmPhanXuong,
    }
    let listItem: any = []
    if (this.item.listItem !== undefined && this.item.listItem !== null) {
      listItem = this.item.listItem.filter((e: any) => e.isXoa !== true);
    }
    this._services.GetlistdmMatHangXuatThanhPham(data).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatthanhphammathangmodalComponent, {
        size: 'xl',
        backdrop: 'static'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = listItem;
      modalRef.result.then((data) => {
        // console.log("data", data);
        // if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
        //   this.item.listItem.forEach(element => {
        //     element.isXoa = true;
        //   });
        // }
        // let listdatapush: any = [];
        // data.data.forEach(element => {
        //   let datapush: any = {
        //     Ten: element.Ten,
        //     IddmItem: element.IddmItem,
        //     TenLoHang: element.TenLoHang,
        //     TonSoLuong: element.SoLuong,
        //     KhoiLuong: element.TrongLuong,
        //     IdLoHang: element.IdLoHang,
        //     IdNhapKho: element.IdNhapKho,
        //     IdNhapKhoGoc: element.IdNhapKhoGoc,
        //     IddmQuyCachDongGoi: element.IddmQuyCachDongGoi,
        //     TendmQuyCachDongGoi: element.TendmQuyCachDongGoi,
        //     NgayNhapKho: UnixToDate(element.NgayNhapKhoUnix),
        //     NgaySanXuat: UnixToDate(element.NgaySanXuatUnix)
        //   };
        //   var isCheck: any = false
        //   if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
        //     for (let i = 0; i < this.item.listItem.length; i++) {
        //       if (this.item.listItem[i].IddmItem == element.IddmItem && this.item.listItem[i].IdLoHang == element.IdLoHang && this.item.listItem[i].IddmQuyCachDongGoi == element.IddmQuyCachDongGoi && this.item.listItem[i].IdNhapKhoGoc == element.IdNhapKhoGoc) {
        //         this.item.listItem[i].isXoa = false;
        //         this.item.listItem[i].Ten = element.Ten;
        //         this.item.listItem[i].IddmItem = element.IddmItem;
        //         this.item.listItem[i].TenLoHang = element.TenLoHang;
        //         this.item.listItem[i].TonSoLuong = element.SoLuong;
        //         this.item.listItem[i].KhoiLuong = element.TrongLuong;
        //         this.item.listItem[i].IdLoHang = element.IdLoHang;
        //         this.item.listItem[i].IdNhapKho = element.IdNhapKho;
        //         this.item.listItem[i].IdNhapKhoGoc = element.IdNhapKhoGoc;
        //         this.item.listItem[i].IddmQuyCachDongGoi = element.IddmQuyCachDongGoi;
        //         this.item.listItem[i].TendmQuyCachDongGoi = element.TendmQuyCachDongGoi;
        //         this.item.listItem[i].NgayNhapKho = UnixToDate(element.NgayNhapKhoUnix);
        //         this.item.listItem[i].NgaySanXuat = UnixToDate(element.NgaySanXuatUnix);
        //         isCheck = true;
        //         break;
        //       }
        //     }
        //     if (isCheck === false)
        //       listdatapush.push(datapush);
        //   }
        //   else
        //     listdatapush.push(datapush);
        // });
        // if (this.item.listItem !== undefined && this.item.listItem !== null) {
        //   this.item.listItem = this.item.listItem.concat(listdatapush);
        // }
        // else {
        //   this.item.listItem = listdatapush
        // }
        this.item.listItem = data?.map(ele => {
          let _newObj = this.item.listItem?.find(obj => obj.IdNhapKhoGoc === ele.IdNhapKhoGoc && obj.IddmItem === ele.IddmItem && obj.IdLoHang === ele.IdLoHang && obj.IddmQuyCachDongGoi === ele.IddmQuyCachDongGoi);
          let _newData = _newObj ? _newObj : ele;
          return {
            ..._newData
          }
        })

        this.TinhTongKhoiLuong();
      }, (reason) => {
        // không
      });
    })
  }
  TinhTongKhoiLuong() {
    this.TongKhoiLuong = 0;
    this.TongThanhTien = 0;
    this.item.listItem.forEach(element => {
      this.TongKhoiLuong += (element.KhoiLuong ?? 0) * (element.SoLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0);
      this.TongThanhTien += (element.DonGia ?? 0) * ((element.SoLuong ?? 0) * (element.KhoiLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0));
    });
  }
  TinhTongThanhTien() {
    this.TongThanhTien = 0;
    this.item.listItem.forEach(element => {
      let thanhTien = (element.DonGia ?? 0) * ((element.SoLuong ?? 0) * (element.KhoiLuong ?? 0) + (element.TongTrongLuongChenhLech ?? 0));
      this.TongThanhTien = this.TongThanhTien + thanhTien;
    });
  }
  ExportExcel() {
    if (validVariable(this.item.Id)) {
      this._services.BaoCao().ExportPhieuXuatKhoThanhPham_Bieu6({ IdPhieuXuatKho: this.item.Id }).subscribe((res: any) => {
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
    const colsPerRow = 4; // Số cột chứa ô nhập liệu

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
              const rowIndex = Math.floor(indexInList / 4);
              const colIndex = indexInList % 4;
              this.navigateTable(event, rowIndex, colIndex);
            }
          },
          { capture: true } //  Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
        );
      }
    });
  }

  chonHopDong(item, idx) {
    let modalRef = this._modal.open(DanhsachhopdongmodalComponent, {
      size: "xl",
      backdrop: 'static'
    })
    modalRef.componentInstance.item = JSON.parse(JSON.stringify(item));
    modalRef.result.then((res) => {
      this.item.listItem[idx].IdHopDong = res.idHopDong;
      this.item.listItem[idx].HopDong = res.soHopDong;
      this.item.listItem = [...this.item.listItem];
    })
  }

  getListdmQuyCachDongGoi() {
    this._services.dmQuyCachDongGoi().GetList().subscribe((res: any) => {
      this.listdmQuyCachDongGoi = res;
    })
  }

  nhapSoKien(data) {
    console.log('data', data);
    let _objQuyCach = this.listdmQuyCachDongGoi.find(ele => ele.Id === data.IddmQuyCachDongGoi);
    let _soQuaQuyCach = _objQuyCach.SoQua || 0;
    let _trongLuongQuyCach = _objQuyCach.TrongLuong || 0;
    console.log('_soQuaQuyCach', _soQuaQuyCach);
    console.log('_trongLuongQuyCach', _trongLuongQuyCach);
    data.SoLuong = (data.SoKien || 0) * (_soQuaQuyCach || 0);
    data.TongKhoiLuong = (data.SoQuaSoiThanhPham) * (_trongLuongQuyCach || 0);
    this.item.listItem = [...this.item.listItem];
    console.log('listItem', this.item.listItem);
  }

}
