import { DecimalPipe } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, mapArrayForDropDown, UnixToDate, validVariable } from 'src/app/services/globalfunction';
import { XuatkhomathangmodalComponent } from '../xuatkhomathangmodal/xuatkhomathangmodal.component';
import { XuatkhoxomathangmodalComponent } from '../xuatkhoxomathangmodal/xuatkhoxomathangmodal.component';

@Component({
  selector: 'app-xuatkhoxomodal',
  templateUrl: './xuatkhoxomodal.component.html',
  styleUrls: ['./xuatkhoxomodal.component.css']
})
export class XuatkhoxomodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  opt: any = ''
  item: any = {};
  Id: any = '';
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  }
  lang: any = vn;
  listKho: any = [];
  listPhanXuong: any = [];
  listTrienKhaiKeHoachSanXuat: any = [];
  listItem: any = [];
  paging: any = {
    CurrentPage: 1,
    TotalPage: 5
  };
  format = '0.0-2';
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
  constructor(public activeModal: NgbActiveModal, private services: SanXuatService,
    public toastr: ToastrService, public _modal: NgbModal, private decimalPipe: DecimalPipe,) { }

  ngOnInit(): void {
    if (this.opt !== 'edit') {
      this.GetNextSoQuyTrinh();
    }
    else {
      this.GetQuyTrinh();
    }
    //
    let data: any = {
      CurrentPage: 0,
      isHoanThanh: false
    }
    this.services.TrienKhaiKeHoachSanXuat().GetList(data).subscribe((res: any) => {
      this.listTrienKhaiKeHoachSanXuat = mapArrayForDropDown(res, 'SoQuyTrinh', 'Id');
    })

    this.services.GetListdmPhanXuong(data).subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
    })
    data.Loai = 5;
    this.services.GetListdmKho(data).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res, 'Ten', 'Id');
    })

  }
  GetQuyTrinh() {
    this.services.PhieuXuatKhoXo().Get(this.Id).subscribe((res1: any) => {
      this.item = res1;
      this.listItem = res1.listItem;
      // if(this.listItem !== null && this.listItem.length > 0){
      //   for(let i = 0; i<this.listItem.length ; i ++){
      //     this.tinhTongTrongLuong(this.listItem[i]);
      //   }
      // }

      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = res1.listItem.length;
      this.item.listItem = res1.listItem.slice(0, 15);
      this.KiemTraButtonModal();
      if (this.item.NgayUnix !== null && this.item.NgayUnix !== undefined) {
        this.item.Ngay = UnixToDate(this.item.NgayUnix);
      }
      if (this.item.NgayChungTuUnix !== null && this.item.NgayChungTuUnix !== undefined) {
        this.item.NgayChungTu = UnixToDate(this.item.NgayChungTuUnix);
      }
    })
  }
  KiemTraButtonModal() {
    this.services.KiemTraButton(this.item.Id || '', this.item.IdTrangThai || '').subscribe(res => {
      this.checkbutton = res;
    })
  }

  ChuyenDuyet() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
      this.services.PhieuXuatKhoXo().ChuyenTiep(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
    else {
      this.toastr.error('Vui lòng nhập ngày chứng từ!');
    }
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);


  }
  KhongDuyet() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
      this.services.PhieuXuatKhoXo().KhongDuyet(this.item).subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    }
    else {
      this.toastr.error('Vui lòng nhập ngày chứng từ!');
    }
    if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
      this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);


  }
  GetNextSoQuyTrinh() {
    this.services.PhieuXuatKhoXo().GetNextSo().subscribe((res: any) => {
      this.item.SoQuyTrinh = res.SoQuyTrinh;
    })
  }

  GhiLai() {
    if (this.item.Ngay !== null && this.item.Ngay !== undefined) {
      this.item.NgayUnix = DateToUnix(this.item.Ngay);
      if (this.item.NgayChungTu !== null && this.item.NgayChungTu !== undefined)
        this.item.NgayChungTuUnix = DateToUnix(this.item.NgayChungTu);
      this.services.PhieuXuatKhoXo().Set(this.item).subscribe((res: any) => {
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
            this.listItem = res.objectReturn.listItem;
            // if(this.listItem !== null && this.listItem.length > 0){
            //   for(let i = 0; i<this.listItem.length ; i ++){
            //     this.tinhTongTrongLuong(this.listItem[i]);
            //   }
            // }
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      })
    } else {
      this.toastr.error('Vui lòng nhập ngày chứng từ!');
    }

  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: 'static'
    });
    modalRef.componentInstance.message = "Bạn có chắc chắn muốn xóa quy trình này chứ?"
    modalRef.result.then(res => {
      this.services.PhieuXuatKhoXo().Delete(this.item).subscribe((res: any) => {
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
    let listItem: any = []
    if (this.item.listItem !== undefined && this.item.listItem !== null) {
      listItem = this.item.listItem.filter((e: any) => e.isXoa !== true);
    }
    this.services.GetLuuKhoXo(this.item.IddmKho, '', 0, sFilter).subscribe((res1: any) => {
      let modalRef = this._modal.open(XuatkhoxomathangmodalComponent, {
        backdrop: 'static',
        size: 'lg'
      })
      modalRef.componentInstance.opt = 'edit';
      modalRef.componentInstance.listMatHang = res1;
      modalRef.componentInstance.listItem = listItem;
      modalRef.result.then((data) => {
        if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
          this.item.listItem.forEach(element => {
            element.isXoa = true;
          });
        }
        let listdatapush = [];
        data.data.forEach(element => {
          let datapush: any = {};
          datapush.TonSoLuong = element.SoLuong;
          datapush.TonTrongLuong = element.TrongLuong;
          datapush.IddmItem = element.IddmItem;
          datapush.Ten = element.Ten;
          // datapush.IddmViTri = element.IddmViTri;
          // datapush.TendmViTri = element.TendmViTri;
          datapush.IdLoBong = element.IdLoBong;
          datapush.TenLoBong = element.TenLoBong;
          var isCheck: any = false

          if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
            for (let i = 0; i < this.item.listItem.length; i++) {
              if (this.item.listItem[i].IddmItem === element.IddmItem && this.item.listItem[i].IdLoBong === element.IdLoBong) {
                this.item.listItem[i].isXoa = false;
                this.item.listItem[i].Ten = element.Ten;
                this.item.listItem[i].TenLoBong = element.TenLoBong;
                // this.item.listItem[i].TendmViTri = element.TendmViTri;
                this.item.listItem[i].TonTrongLuong = element.TrongLuong;
                this.item.listItem[i].TonSoLuong = element.SoLuong;
                isCheck = true;
                break;
              }
            }
            if (isCheck === false)
              listdatapush.push(datapush);
          }
          else
            listdatapush.push(datapush);
        });
        if (this.item.listItem !== undefined && this.item.listItem !== null) {
          this.item.listItem = this.item.listItem.concat(listdatapush);
        }
        else {
          this.item.listItem = listdatapush
        }
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
  tinhTongTrongLuong(item) {
    let TrongLuong = Math.round(item.TrongLuong * 1000);
    item.TongTrongLuong = (TrongLuong * item.SoLuong / 1000) + (item.TongTrongLuongChenhLech || 0);
  }
  exportExcel() {
    if (validVariable(this.item.Id)) {
      this.services.PhieuXuatKhoXo().ExportPhieuXuatKhoXo(this.item.Id).subscribe((res: any) => {
        this.services.download(res.TenFile);
      })
    } else {
      this.toastr.error('Vui lòng ghi lại sau đó xuất Excel!')
    }
  }
  exportHoaDon() {
    if (validVariable(this.item.Id)) {
      this.services.PhieuXuatKhoXo().ExportHoaDonXuatKhoXo(this.item.Id).subscribe((res: any) => {
        this.services.download(res.TenFile);
      })
    } else {
      this.toastr.error('Vui lòng ghi lại sau đó xuất Excel!')
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
