import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { vn } from 'src/app/services/const';
import { DateToUnix, UnixToDate, deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-kiemkekhohoiluongdomodal',
  templateUrl: './kiemkekhohoiluongdomodal.component.html',
  styleUrls: ['./kiemkekhohoiluongdomodal.component.css']
})
export class KiemkekhohoiluongdomodalComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild("paginator") paginator: any;
  opt: any = "";
  Id: any = "";
  item: any = {};
  checkbutton: any = {
    Ghi: true,
    KhongDuyet: false,
    ChuyenTiep: false,
    Xoa: false,
  };
  lang: any = vn;
  listdmKho: any = []; // 6
  listdmKhoBP: any = []; // 7
  listdmKhoHoiLD: any = []; // 66
  listdmKhoHoiLD_ByDuAn: any = []; // 66
  listdmViTri: any = [];
  listLoBong: any = [];
  listLoHang: any = [];
  listLoaiBong: any = [];
  listNewMatHang: any = [];
  listNewMatHangBP: any = [];
  listNewMatHangBH: any = [];
  listNewMatHang_ref: any = [];
  listCaSanXuat: any = [];
  listCaThucTe: any = [];
  listDuAn: any = [];
  isKhoThanhPham: any = false;
  yearRange: string = `${((new Date()).getFullYear() - 50)}:${((new Date()).getFullYear())}`;
  paging: any = {
    CurrentPage: 1
  };
  listItem: any = [];
  item_new: any = {};
  title: any = "";
  newItem: any = {};
  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;

  constructor(
    public activeModal: NgbActiveModal,
    private services: SanXuatService,
    public toastr: ToastrService,
    public _modal: NgbModal,
    private store: StoreService
  ) { }

  ngOnInit(): void {
    if (this.opt !== "edit") {
      this.GetNextSoQuyTrinh();
    } else {
      this.GetQuyTrinh();
    }
    this.item_new = this.item;
    this.paging.CurrentPage = 1;
    var data: any = {};
    data.CurrentPage = 0;
    data.Loai = 66;
    this.item_new.Loai = 66;
    this.item.LoaiKiemKe = `DieuChuyen`;
    this.services.GetListdmKho({
      ...data,
      Loai: 6
    }).subscribe((res: any) => {
      this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
    });
    this.services.GetListdmKho({
      ...data,
      Loai: 7
    }).subscribe((res: any) => {
      this.listdmKhoBP = mapArrayForDropDown(res, "Ten", "Id");
    });
    this.services.GetListdmKho({
      ...data,
      Loai: 66
    }).subscribe((res: any) => {
      this.listdmKhoHoiLD = mapArrayForDropDown(res, "Ten", "Id");
    });
    // this.services.GetListdmViTriOpt().subscribe((res: any) => {
    //     this.listdmViTri = mapArrayForDropDown(res, "Ten", "Id");
    // });
    // this.services.GetListLoBong(data).subscribe((res: any) => {
    //     this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
    // });
    // this.services
    //     .LoHang()
    //     .GetList(data)
    //     .subscribe((res: any) => {
    //         this.listLoHang = mapArrayForDropDown(res, "Ten", "Id");
    //     });
    this.services
      .GetListdmLoaiBong(data)
      .subscribe((res: any) => {
        this.listLoaiBong = mapArrayForDropDown(res, "Ten", "Id");
      });
    this.services
      .PhieuKiemKeKhoBongPhe()
      .GetlistdmMatHangKiemKeBongPhe(data.Loai = 6)
      .subscribe((res: any) => {
        this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
        this.listNewMatHang_ref = res;
      });

    this.services
      .GetListdmLoaiBong({
        ...data,
        Loai: 7
      })
      .subscribe((res: any) => {
        this.listNewMatHangBP = mapArrayForDropDown(res, "Ten", "Id");
      });
    this.services
      .GetListdmLoaiBong({
        ...data,
        Loai: 6
      })
      .subscribe((res: any) => {
        this.listNewMatHangBH = mapArrayForDropDown(res, "Ten", "Id");
      });
    this.getListCaSanXuat();
    this.getListCaThucTe();
    this.getListDuAn();
  }


  getListCaSanXuat() {
    this.services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCaSanXuat = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListCaThucTe() {
    this.services.GetListOptdmCaSanXuatThucTe().subscribe((res: any) => {
      this.listCaThucTe = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }
  getListDuAn() {
    this.services.GetDanhSachDuAnPublic().subscribe((res: any) => {
      this.listDuAn = mapArrayForDropDown(res.filter((x: any) => x.Id !== this.store.getCurrent()), 'TenDuAn', 'Id');
    })
  }

  getListDmKhoHoiLDByDuAn(event) {
    this.services.GetListdmKhoNoLogin({
      Loai: 66
    }, event.value).subscribe((res: any) => {
      this.listdmKhoHoiLD_ByDuAn = mapArrayForDropDown(res, "Ten", "Id");
    });
  }

  getListMatHangKiemKe(loaibong?) {
    this.services
      .PhieuKiemKeKhoBongPhe()
      .GetlistdmMatHangKiemKeBongPhe(loaibong ?? 6)
      .subscribe((res: any) => {
        this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
        this.listNewMatHang_ref = res;
        this.checklistMatHangTheoKho();
      });
  }


  GetQuyTrinh() {
    this.services
      .PhieuKiemKeKhoBong()
      .Get(this.Id)
      .subscribe((res1: any) => {
        this.item = {
          ...res1,
          Ngay: UnixToDate(res1.NgayUnix)
        };
        this.listItem = res1.listItem;
        this.paging.CurrentPage = 1;
        this.paging.TotalPage = 5;
        this.paging.TotalItem = res1.listItem.length;
        this.item.listItem = res1.listItem.slice(0, 10);
        this.item_new = res1;
        this.KiemTraButtonModal();
        //
        if (this.item.IddmLoaiBong != undefined) {
          this.services
            .PhieuKiemKeKhoBongPhe()
            .GetlistdmMatHangKiemKeBongPhe(6)
            .subscribe((res: any) => {
              this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
              this.listNewMatHang_ref = res;
            });
        }
        this.getListMatHangKiemKe();
        if (res1.LoaiKiemKe === "XuatBanNoiBo") {
          this.getListDmKhoHoiLDByDuAn({
            value: res1.IdDuAn_NoiBo
          })
        }
      });
  }
  KiemTraButtonModal() {
    this.services
      .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
      .subscribe((res) => {
        this.checkbutton = res;
      });
  }

  ChuyenDuyet() {
    if (validVariable(this.newItem.IddmItem)) {
      this.listItem.push(deepCopy(this.newItem));
      this.newItem = {};
    }
    this.item.NgayUnix = DateToUnix(this.item.Ngay)
    this.item.listItem = deepCopy(this.listItem);
    this.services
      .PhieuKiemKeKhoBong()
      .ChuyenTiep(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      });
  }
  KhongDuyet() {
    if (validVariable(this.newItem.IddmItem)) {
      this.listItem.push(deepCopy(this.newItem));
      this.newItem = {};
    }
    this.item.NgayUnix = DateToUnix(this.item.Ngay)
    this.item.listItem = deepCopy(this.listItem);
    this.services
      .PhieuKiemKeKhoBong()
      .KhongDuyet(this.item)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.activeModal.close();
          } else {
            this.toastr.error(res.message);
          }
        }
      });
  }

  GetNextSoQuyTrinh() {
    this.services
      .PhieuKiemKeKhoBong()
      .GetNextSo()
      .subscribe((res: any) => {
        this.item.SoQuyTrinh = res.SoQuyTrinh;
      });
  }

  validate() {
    let result = true;
    let msg = ``;
    let arr = []
    console.log("this.item", this.item);



    if (this.item.LoaiKiemKe === `DieuChuyenBongPhe`) {
      if (!this.item.Ngay || !this.item.IddmCaSanXuat) {
        msg = `Vui lòng nhập đầy đủ trường dữ liệu bắt buộc!`
        result = false;
      }
      this.item.listItem.forEach((x: any) => {
        if (!x.IddmLoaiBong_BongPhe) {
          arr.push(x);
          result = false;
        }
      })
    }
    if (this.item.LoaiKiemKe === `XuatBanNoiBo`) {
      if (!this.item.Ngay) {
        msg = `Vui lòng nhập đầy đủ trường dữ liệu bắt buộc!`
        result = false;
      }
      this.item.listItem.forEach((x: any) => {
        if (!x.IddmLoaiBong_BongPhe) {
          arr.push(x);
          result = false;
        }
      })
    }
    if (!result) {
      msg = arr.map(x => x.Ten).join(", ") + " chưa chọn mặt hàng!";
      this.toastr.error(msg);
    }
    return result;
  }

  GhiLai() {
    if (validVariable(this.newItem.IddmItem)) {
      this.listItem.push(deepCopy(this.newItem));
      this.newItem = {};
    }

    if (!this.item.Ngay) {
      let msg = `Vui lòng nhập đầy đủ trường dữ liệu bắt buộc!`
      this.toastr.error(msg);
      return;
    }

    if (!this.validate()) {
      return;
    }

    this.item_new.listItem = this.listItem;
    this.item_new.NgayUnix = DateToUnix(this.item.Ngay)
    this.services
      .PhieuKiemKeKhoBong()
      .Set(this.item_new)
      .subscribe((res: any) => {
        if (res) {
          if (res.State === 1) {
            this.toastr.success(res.message);
            this.opt = "edit";
            this.item_new = res.objectReturn;
            this.item = res.objectReturn;
            this.Id = res.objectReturn.Id;
            this.listItem = res.objectReturn.listItem;
            this.paging.CurrentPage = 1;
            this.paging.TotalPage = 5;
            if (
              res.objectReturn.listItem != undefined &&
              res.objectReturn.listItem != null
            )
              this.paging.TotalItem = res.objectReturn.listItem.length;
            this.item.listItem = res.objectReturn.listItem.slice(0, 10);
            this.KiemTraButtonModal();
          } else {
            this.toastr.error(res.message);
          }
        }
      });
  }
  XoaQuyTrinh() {
    let modalRef = this._modal.open(ModalthongbaoComponent, {
      backdrop: "static",
    });
    modalRef.componentInstance.message =
      "Bạn có chắc chắn muốn xóa quy trình này chứ?";
    modalRef.result
      .then((res) => {
        this.services
          .PhieuKiemKeKhoBong()
          .Delete(this.item)
          .subscribe((res: any) => {
            console.log(res);
            if (res?.State === 1) {
              this.activeModal.close();
            } else {
              this.toastr.error(res.message);
            }
          });
      })
      .catch((er) => console.log(er));
  }

  delete(index) {
    console.log(index);
    console.log((this.paging.CurrentPage - 1) * 10 + index);
    console.log((this.paging.CurrentPage - 1) * 10);
    let item = this.item.listItem.splice((this.paging.CurrentPage - 1) * 10 + index, 1)[0];
    if (item.Id === "" || item.Id === null || item.Id === undefined) {
    } else {
      this.toastr.warning("Thao tác này đồng nghĩa việc không kiểm kê, không đồng nghĩa việc xóa khỏi kho");
      item.isXoa = true;
      this.item.listItem.push(JSON.parse(JSON.stringify(item)));
    }
    this.listItem = this.item.listItem.filter(ele => ele.isXoa !== true).slice((this.paging.CurrentPage - 1) * 10, 10);
    this.paging.TotalItem = Math.ceil(this.item.listItem.filter(ele => ele.isXoa !== true).length);
  }

  GetMatHangTheoKho() {
    this.services
      .getLuuKhoKiemKeKhoBongHoiLuongDo(
        this.item.IddmKhoHoiLuongDo,
        this.item.IdLoBong,
        "",
        this.item.IdLoHang
      )
      .subscribe((res1: any) => {
        // res1.forEach((mathang) => {
        //   mathang.SoLuong = mathang.TonSoLuong;
        //   mathang.TrongLuong = mathang.TonTrongLuong;
        // });
        this.item.listItem = res1.slice(0, 10);
        this.listItem = res1;
        this.paging.CurrentPage = 1;
        this.paging.TotalPage = 5;
        this.paging.TotalItem = res1.length;
        this.checklistMatHangTheoKho();
      });
  }
  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    let start = 10 * event.page;
    let end = start + 10;
    if (start + 10 > this.listItem.length) {
      end = this.listItem.length;
    }
    this.item.listItem = this.listItem.slice(start, end);
  }
  setNewItemName(event) {
    console.log("e", event);

    let selected = this.listNewMatHang_ref.find(
      (ele) => ele.Id === event.value
    );
    this.newItem.Ten = selected?.Ten;
    this.newItem.Ma = selected?.Ma;
    this.checklistMatHang(this.newItem);
  }
  setNewItemName_BP(event) {
    let selected = this.listNewMatHangBP.find(
      (ele) => ele.value === event.value
    );
    this.newItem.TendmLoaiBong_BongPhe = selected?.label;
    // this.newItem.Ma = selected?.Ma;
    // this.checklistMatHang(this.newItem);
  }
  add() {
    if (validVariable(this.newItem.IddmItem)) {
      this.listItem.push(deepCopy(this.newItem));
      this.newItem = {};
      console.log(this.paging);
      if (this.listItem.length > this.paging.CurrentPage * 10) {
        console.log(Math.floor(this.listItem.length / 10));
        this.paginator.changePage(
          Math.floor(this.listItem.length / 10)
        );
      } else {
        this.changePage({ page: this.paging.CurrentPage - 1 });
      }
    } else {
      this.toastr.error("Vui lòng chọn mặt hàng cần thêm!");
    }
  }
  ImportExcel() {
    // let modalRef = this._modal.open(ImportnhapkhothanhphamComponent, {
    //   backdrop: 'static',
    // })
    // modalRef.result.then(res => {
    //   this.toastr.success('Cập nhật thành công!');
    //   this.listItem = res.items;
    //   this.paginator.changePage(0);
    // })
    //   .catch(er => console.log(er))
  }
  checklistMatHang(item) {
    if (this.listNewMatHang !== undefined && this.listNewMatHang !== null) {
      for (let i = 0; i < this.listNewMatHang.length; i++) {
        if (this.listNewMatHang[i].label === item.Ten) {
          this.listNewMatHang.splice(i, 1);
          break;
        }
      }
    }
  }
  checklistMatHangTheoKho() {
    if (this.listNewMatHang !== undefined && this.listNewMatHang !== null && this.listNewMatHang.length > 0) {
      if (this.listItem !== undefined && this.listItem !== null && this.listItem.length > 0) {
        for (let i = 0; i < this.listNewMatHang.length; i++) {
          for (let j = 0; j < this.listItem.length; j++) {
            if (this.listNewMatHang[i].label === this.listItem[j].Ten) {
              this.listNewMatHang.splice(i, 1);
              break;
            }
          }
        }
      }
    }
  }
  copy(value) {
    this.item.listItem.forEach(itemTon => {
      itemTon.TrongLuong = value;
    });
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
