import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { ImportnhapkhothanhphamComponent } from '../nhapkhothanhphammodal/modals/importnhapkhothanhpham/importnhapkhothanhpham.component';

@Component({
    selector: 'app-khobongphekiemkekhomodal',
    templateUrl: './khobongphekiemkekhomodal.component.html',
    styleUrls: ['./khobongphekiemkekhomodal.component.css']
})
export class KhobongphekiemkekhomodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
    listdmKho: any = [];
    listdmViTri: any = [];
    listLoBong: any = [];
    listLoHang: any = [];
    paging: any = {};
    listItem: any = [];
    title: any = "";
    newItem: any = {};
    listNewMatHang: any = [];
    listNewMatHang_ref: any = [];
    listQuyCachDongGoi: any = [];
    KeyWord: string;
    @ViewChildren('input', { read: ElementRef }) inputs!: QueryList<ElementRef>;
    constructor(
        public activeModal: NgbActiveModal,
        private services: SanXuatService,
        public toastr: ToastrService,
        public _modal: NgbModal
    ) { }

    ngOnInit(): void {
        if (this.opt !== "edit") {
            this.GetNextSoQuyTrinh();
        } else {
            this.GetQuyTrinh();
        }
        var data: any = {};
        data.CurrentPage = 0;
        data.Loai = 7;
        this.item.Loai = 7;
        this.services.GetListdmKho(data).subscribe((res: any) => {
            this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
        });
        this.services
            .dmQuyCachDongGoi()
            .GetList()
            .subscribe((res: any) => {
                this.listQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
            });
        this.services
            .PhieuKiemKeKhoBongPhe()
            .GetlistdmMatHangKiemKeBongPhe(data.Loai = 7)
            .subscribe((res: any) => {
                this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
                this.listNewMatHang_ref = res;
            });


    }
    checklistMatHang(item) {
        if (this.listNewMatHang !== undefined && this.listNewMatHang !== null) {
            for (let i = 0; i < this.listNewMatHang.length; i++) {
                if (this.listNewMatHang[i].value === item.IddmItem) {
                    this.listNewMatHang.splice(i, 1);
                }
            }
        }
    }
    checklistMatHangTheoKho() {
        this.listNewMatHang = mapArrayForDropDown(deepCopy(this.listNewMatHang_ref), "Ten", "Id");
        if (this.listNewMatHang !== undefined && this.listNewMatHang !== null && this.listNewMatHang.length > 0) {
            if (this.item.listItem !== undefined && this.item.listItem !== null && this.item.listItem.length > 0) {
                for (let i = 0; i < this.listNewMatHang.length; i++) {
                    for (let j = 0; j < this.item.listItem.length; j++) {
                        if (this.listNewMatHang[i].value === this.item.listItem[j].IddmItem && !this.item.listItem[j].isXoa) {
                            if (!this.item.listItem[j].isXoa || this.item.listItem[j].isXoa === false) {
                                this.listNewMatHang.splice(i, 1);
                            }
                        }
                    }
                }
            }

        }
    }
    resetFilter() {
        this.KeyWord = '';
    }
    filter() {
        this.changePage({ page: 0 })
    }
    GetQuyTrinh() {
        this.services
            .PhieuKiemKeKhoBongPhe()
            .Get(this.Id)
            .subscribe((res1: any) => {
                this.item = res1;
                this.paging.CurrentPage = 1;
                this.paging.TotalPage = 5;
                this.paging.TotalItem = res1.listItem.length;
                this.item.listItem = res1.listItem.map(x => {
                    return {
                        ...x,
                        GUID: crypto.randomUUID()
                    }
                });
                this.listItem = this.item.listItem.slice(0, 10);
                this.KiemTraButtonModal();
                setTimeout(() => {
                    this.checklistMatHangTheoKho();
                }, 500)
            });
    }
    KiemTraButtonModal() {
        this.services
            .KiemTraButton(this.item.Id || "", this.item.IdTrangThai || "")
            .subscribe((res) => {
                this.checkbutton = res;
            });
    }

    convertData() {
        this.item.listItem = this.item.listItem.map((x: any) => {
            let _thisFind = this.listItem.find((y: any) => y.IddmItem === x.IddmItem);
            if (_thisFind) {
                x = _thisFind;
            }
            return x;
        })
    }

    ChuyenDuyet() {
        // this.item.listItem = deepCopy(this.listItem);
        this.services
            .PhieuKiemKeKhoBongPhe()
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
        // this.item.listItem = deepCopy(this.listItem);
        this.services
            .PhieuKiemKeKhoBongPhe()
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
            .PhieuKiemKeKhoBongPhe()
            .GetNextSo()
            .subscribe((res: any) => {
                this.item.SoQuyTrinh = res.SoQuyTrinh;
            });
    }

    GhiLai() {
        this.services
            .PhieuKiemKeKhoBongPhe()
            .Set(this.item)
            .subscribe((res: any) => {
                if (res) {
                    if (res.State === 1) {
                        this.toastr.success(res.message);
                        this.opt = "edit";
                        //   this.item = res.objectReturn;
                        this.paginator.changePage(0);
                        this.Id = res.objectReturn.Id;
                        this.GetQuyTrinh();
                        //   this.listItem = res.objectReturn.listItem;
                        //   this.paging.CurrentPage = 1;
                        //   this.paging.TotalPage = 5;
                        //   if (
                        //       res.objectReturn.listItem != undefined &&
                        //       res.objectReturn.listItem != null
                        //   )
                        //       this.paging.TotalItem = res.objectReturn.listItem.length;
                        //   this.item.listItem = res.objectReturn.listItem.slice(0, 10);
                        //   this.KiemTraButtonModal();
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
                    .PhieuKiemKeKhoBongPhe()
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

    delete(index, _item) {
        let item = this.item.listItem.find(ele => ele.GUID === _item.GUID);
        if (!item.Id) {
            this.item.listItem = this.item.listItem.filter(ele => ele.GUID !== _item.GUID);
        } else {
            this.toastr.warning("Thao tác này đồng nghĩa việc không kiểm kê, không đồng nghĩa việc xóa khỏi kho");
            item.isXoa = true;
        }
        this.listItem = this.item.listItem.filter(ele => !ele.isXoa).slice((this.paging.CurrentPage - 1) * 10, 10);
        this.paging.TotalItem = Math.ceil(this.item.listItem.filter(ele => !ele.isXoa).length);
        this.checklistMatHangTheoKho();

        // let item = this.item.listItem.splice((this.paging.CurrentPage - 1) * 10 + index, 1)[0];
        // console.log("_item", _item);
        // console.log("item", item);
        // if (!_item.Id) {
        //     console.log("this.item.listItem 1", this.item.listItem);
        //     this.item.listItem = this.item.listItem.filter(ele => ele.GUID !== _item.GUID);
        // } else {
        //     this.toastr.warning("Thao tác này đồng nghĩa việc không kiểm kê, không đồng nghĩa việc xóa khỏi kho");
        //     item.isXoa = true;
        //     this.item.listItem.push(JSON.parse(JSON.stringify(item)));
        // }
        // console.log("this.item.listItem 2", this.item.listItem);
        // this.listItem = this.item.listItem.filter(ele => !ele.isXoa).slice((this.paging.CurrentPage - 1) * 10, 10);
        // console.log("this.listItem", this.listItem);

        // this.paging.TotalItem = Math.ceil(this.item.listItem.filter(ele => !ele.isXoa).length);
        //     this.checklistMatHangTheoKho();
    }

    GetMatHangTheoKho() {
        this.services.getLuuKhoKiemKeKhoBongPhe(this.item.IddmKho, "").subscribe((res1: any) => {
            // res1.forEach((mathang) => {
            //     mathang.SoLuong = mathang.TonSoLuong;
            //     mathang.TrongLuong = mathang.TonTrongLuong;
            // });
            this.item.listItem = res1;
            this.listItem = this.item.listItem.slice(0, 10);
            this.paging.CurrentPage = 1;
            this.paging.TotalPage = 5;
            this.paging.TotalItem = res1.length;
            this.checklistMatHangTheoKho();
        });
    }
    changePage(event) {
        let clone = [];
        if (validVariable(this.KeyWord)) {
            clone = this.item.listItem.filter(ele => ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()));
        } else {
            clone = this.item.listItem
        }
        console.log(clone);
        this.paging.CurrentPage = event.page + 1;
        let start = 10 * event.page;
        let end = start + 10;
        this.paging.TotalItem = 0;
        this.paging.TotalItem = clone.length;
        if (start + 10 > clone.length) {
            end = clone.length;
        }
        this.listItem = clone.slice(start, end);
        console.log(this.listItem)
    }
    setNewItemName(event) {
        let selected = this.listNewMatHang_ref.find(
            (ele) => ele.Id === event.value
        );
        this.newItem.Ten = selected?.Ten;
        this.newItem.Ma = selected?.Ma;
    }
    add() {
        this.newItem.GUID = crypto.randomUUID();
        if (validVariable(this.newItem.IddmItem)) {
            this.item.listItem.push(deepCopy(this.newItem));
            this.checklistMatHang(this.newItem);

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
        let modalRef = this._modal.open(ImportnhapkhothanhphamComponent, {
            backdrop: 'static',
        })
        modalRef.result.then(res => {
            this.toastr.success('Cập nhật thành công!');
            this.listItem = res.items;
            this.paginator.changePage(0);
        })
            .catch(er => console.log(er))
    }
    refreshFilter() {
        this.KeyWord = '';
        this.changePage({ page: 0 })
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
