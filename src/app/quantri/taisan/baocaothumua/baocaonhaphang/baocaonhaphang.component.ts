import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from '../../../../services/callApiSanXuat';
import { TaisanService } from '../../../../services/Taisan/taisan.service';
import { DateToUnix, mapArrayForDropDown } from '../../../../services/globalfunction';
import { AuthenticationService } from '../../../../services/auth.service';
import { host1 } from '../../../../services/host';

@Component({
  selector: 'app-baocaonhaphang',
  templateUrl: './baocaonhaphang.component.html',
  styleUrls: ['./baocaonhaphang.component.css']
})
export class BaocaonhaphangComponent implements OnInit, AfterViewInit {

  @ViewChild('paginator') paginator: any;
  items: any = [];
  paging: any = { CurrentPage: 1, TotalPages: 1, TotalCount: 1 };
  filter: any = {};
  listDuAn: any = [];
  listKho: any = [];
  listNhaCungUng: any = [];
  userInfo: any = {};
  listView: any = [
    {
      Ten: 'Nhà cung ứng', Ma: 'IddmNhaCungUng',
      listItem: [
        { SoLuong: 1, DonGia: 2 },
        { SoLuong: 2, DonGia: 2 },
        { SoLuong: 3, DonGia: 2 }
      ]
    },
    {
      Ten: 'Kho', Ma: 'IddmKho',
      listItem: [
        { SoLuong: 2, DonGia: 1 },
        { SoLuong: 2, DonGia: 2 },
        { SoLuong: 2, DonGia: 3 }
      ]
    },
  ]
  item: any = { listData: [], listHeader: [] };

  @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;

  listItem: any = [
    { Ten: 'Nguyễn văn A', Ma: 'NVA', KA: 1, KB: 2, KC: 2 },
    { Ten: 'Nguyễn văn B', Ma: 'NVB', KA: 1, KB: 2, KC: 2 },
  ]

  constructor(
    private _serviceTaiSan: TaisanService,
    private _toastr: ToastrService,
    private _services: SanXuatService,
    private _auth: AuthenticationService
  ) { this.userInfo = this._auth.currentUserValue }

  ngOnInit(): void {
    this.GetDanhSachDuAnByIdUser();
    this.GetALLdmNhaCungUng();
    this.GetList();
  }

  resetFilter() {
    this.filter = {};
    this.GetList();
  }

  GetList(reset?) {
    if (reset) {
      this.paging.CurrentPage = 1;
      this.paginator.changePage(0);
    }
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdDuAn: this.filter.IdDuAn ? this.filter.IdDuAn : 0,
      IddmKho: this.filter.IddmKho ? this.filter.IddmKho : '',
      IddmNhaCungUng: this.filter.IddmNhaCungUng ? this.filter.IddmNhaCungUng : '',
    };
    this._serviceTaiSan.BaoCaoNhapHangNew(data).subscribe((res: any) => {
      // this.items = res.Data.Items;
      // this.paging.TotalCount = res.Data.TotalCount;

      this.item.listData = this.mapDeQuy(res.Data.Items.listData, 0)
      this.item.listHeader = res.Data.Items.listHearder.map((ele: any) => {
        return {
          ...ele,
          Header: ele.Header.map((obj: any) => {
            return {
              ...obj,
              DoRong: `${obj.DoRong ? obj.DoRong : 100}px`
            }
          })
        }
      });

    })
  }

  mapDeQuy(lits: any, level: number) {
    let newItem = lits.map((ele: any) => {
      return {
        data: {
          ...ele.data,
          level: level,
          RowData: ele.data.RowData.map((x: any) => {
            return {
              ...x,
              DoRong: `${x.DoRong ? x.DoRong : 100}px`,
            }
          })
        },
        children: ele.children || [],
        expanded: ele.data.expanded,
        showChildren: ele.data.expanded
      }
    })
    newItem.forEach((obj: any) => {
      if (obj.children && obj.children.length) {
        obj.children = this.mapDeQuy(obj.children, level + 1)
      }
    })
    return newItem;
  }

  toggleChildren(parent: any) {
    parent.showChildren = !parent.showChildren;
  }

  GetDanhSachDuAnByIdUser() {
    this._services.GetOptions().GetDanhSachDuAnByIdUser(this.userInfo.Id).subscribe((res: any) => {
      this.listDuAn = mapArrayForDropDown(res, 'TenDuAn', 'Id');
    })
  }

  handleDuAn(value) {
    this.filter.IddmKho = null;
    this.GetKho(value);
    this.GetList(true);
  }

  GetKho(value) {
    this._serviceTaiSan.GetlistdmKho(value).subscribe((res: any) => {
      this.listKho = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  GetALLdmNhaCungUng() {
    this._serviceTaiSan.GetALLdmNhaCungUng({ currentpage: 0, Keyword: '' }).subscribe((res: any) => {
      this.listNhaCungUng = mapArrayForDropDown(res, 'Ten', 'Id');
    })
  }

  changePage(event) {
    this.paging.CurrentPage = event.page + 1;
    this.GetList()
  }

  export() {
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.CurrentPage,
      Keyword: this.filter.Keyword,
      TuNgay: DateToUnix(this.filter.TuNgay),
      DenNgay: DateToUnix(this.filter.DenNgay),
      IdDuAn: this.filter.IdDuAn ? this.filter.IdDuAn : 0,
      IddmKho: this.filter.IddmKho ? this.filter.IddmKho : '',
      IddmNhaCungUng: this.filter.IddmNhaCungUng ? this.filter.IddmNhaCungUng : '',
    };
    this._serviceTaiSan.ExportBaoCaoNhapHang(data).subscribe((res: any) => {
      if (res.StatusCode === 200) {
        const _url = host1 + res.Data;
        this._toastr.success(res.Message)
        window.open(_url);
      } else this._toastr.error(res.Message)
    })
  }

  // onKeyDown(event: KeyboardEvent, rowIndex: number, colIndex: number, field: string) {
  //   const inputElements: any = this.inputs.toArray();
  //   const totalRows = this.listView.length;
  //   const totalCols = 3;
  //   const inputsPerRow = totalCols * 2; // Mỗi cột có 2 ô riêng biệt (SoLuong & DonGia)
  //   const currentIndex = rowIndex * inputsPerRow + colIndex * 2 + (field === 'DonGia' ? 1 : 0);
  //   switch (event.key) {
  //     case 'ArrowDown': {
  //       const nextIndex = currentIndex + inputsPerRow;
  //       if (nextIndex < inputElements.length) {
  //         event.preventDefault();
  //         inputElements[nextIndex]?.el.nativeElement.querySelector('input')?.focus();
  //       }
  //       break;
  //     }
  //     case 'ArrowUp': {
  //       const prevIndex = currentIndex - inputsPerRow;
  //       if (prevIndex >= 0) {
  //         event.preventDefault();
  //         inputElements[prevIndex]?.el.nativeElement.querySelector('input')?.focus();
  //       }
  //       break;
  //     }
  //     case 'ArrowRight': {
  //       const nextIndex = currentIndex + 1;
  //       if (currentIndex % 2 === 0) {
  //         // Chuyển từ SoLuong sang DonGia trong cùng cột
  //         event.preventDefault();
  //         inputElements[nextIndex]?.el.nativeElement.querySelector('input')?.focus();
  //       } else if (colIndex < totalCols - 1) {
  //         // Chuyển sang ô SoLuong của cột kế tiếp
  //         event.preventDefault();
  //         inputElements[nextIndex + 1]?.el.nativeElement.querySelector('input')?.focus();
  //       }
  //       break;
  //     }
  //     case 'ArrowLeft': {
  //       const prevIndex = currentIndex - 1;
  //       if (currentIndex % 2 === 1) {
  //         // Chuyển từ DonGia về SoLuong trong cùng cột
  //         event.preventDefault();
  //         inputElements[prevIndex]?.el.nativeElement.querySelector('input')?.focus();
  //       } else if (colIndex > 0) {
  //         // Chuyển sang ô DonGia của cột trước đó
  //         event.preventDefault();
  //         inputElements[prevIndex - 1]?.el.nativeElement.querySelector('input')?.focus();
  //       }
  //       break;
  //     }
  //   }

  // }

  // navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
  //   const key = event.key;
  //   const inputElements: any = this.inputs.toArray();
  //   const colsPerRow = 4; // Số cột có thể focus (Tên, Mã, KA, KB, KC)

  //   let nextIndex = rowIndex * colsPerRow + colIndex;
  //   switch (key) {
  //     case "ArrowRight":
  //       event.preventDefault();
  //       nextIndex += 1;
  //       break;
  //     case "ArrowLeft":
  //       event.preventDefault();
  //       nextIndex -= 1;
  //       break;
  //     case "ArrowDown":
  //       event.preventDefault();
  //       nextIndex += colsPerRow;
  //       break;
  //     case "ArrowUp":
  //       event.preventDefault();
  //       nextIndex -= colsPerRow;
  //       break;
  //   }
  //   setTimeout(() => {
  //     if (inputElements[nextIndex]) {
  //       const nextElement = inputElements[nextIndex]?.el.nativeElement.querySelector('input');
  //       if (nextElement) {
  //         nextElement.focus();
  //       }
  //     }
  //   }, 0);
  // }

  // navigateTable(event: KeyboardEvent, rowIndex: number, colIndex: number) {
  //   const key = event.key;
  //   const inputElements: any = this.inputs.toArray();
  //   const colsPerRow = 6; // Số cột chứa ô nhập liệu

  //   let nextIndex = rowIndex * colsPerRow + colIndex;
  //   if (key === 'ArrowRight') nextIndex += 1;
  //   if (key === 'ArrowLeft') nextIndex -= 1;
  //   if (key === 'ArrowDown') nextIndex += colsPerRow;
  //   if (key === 'ArrowUp') nextIndex -= colsPerRow;
  //   // Kiểm tra nếu index hợp lệ thì focus
  //   setTimeout(() => {
  //     if (inputElements[nextIndex]) {
  //       inputElements[nextIndex]?.nativeElement.querySelector('input')?.focus();
  //     }
  //   }, 0);
  // }


  ngAfterViewInit() {
    // this.inputs.forEach((el) => {
    //   const realInput = el?.nativeElement?.querySelector('input'); // Lấy phần tử <input> thật
    //   if (realInput) {
    //     realInput.addEventListener(
    //       'keydown',
    //       (event: KeyboardEvent) => {
    //         if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    //           event.preventDefault(); // Ngăn hành vi mặc định
    //           event.stopImmediatePropagation(); // Chặn PrimeNG xử lý tiếp
    //           //  Gọi navigateTable() để xử lý di chuyển sau khi chặn sự kiện
    //           const indexInList = this.inputs.toArray().findIndex(
    //             (inp) => inp.nativeElement.querySelector('input') === realInput
    //           );
    //           const rowIndex = Math.floor(indexInList / 6);
    //           const colIndex = indexInList % 6;
    //           this.navigateTable(event, rowIndex, colIndex);
    //         }
    //       },
    //       { capture: true } // ⚡ Quan trọng: chặn sự kiện trước khi PrimeNG xử lý
    //     );
    //   }
    // });
  }

}
