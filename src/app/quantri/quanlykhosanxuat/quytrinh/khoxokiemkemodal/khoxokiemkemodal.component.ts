import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalthongbaoComponent } from 'src/app/quantri/modal/modalthongbao/modalthongbao.component';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { deepCopy, mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { KhoxokiemkemathangmodalComponent } from '../khoxokiemkemathangmodal/khoxokiemkemathangmodal.component';
import { ImportnhapkhothanhphamComponent } from '../nhapkhothanhphammodal/modals/importnhapkhothanhpham/importnhapkhothanhpham.component';
import { XuatkhoxomathangmodalComponent } from '../xuatkhoxomathangmodal/xuatkhoxomathangmodal.component';

@Component({
    selector: 'app-khoxokiemkemodal',
    templateUrl: './khoxokiemkemodal.component.html',
    styleUrls: ['./khoxokiemkemodal.component.css']
})
export class KhoxokiemkemodalComponent implements OnInit, AfterViewInit, AfterViewChecked {
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
    listLoBong: any = [];
    listLoHang: any = [];
    listQuyCachDongGoi: any = [];
    listNewMatHang: any = [];
    listNewMatHang_ref: any = [];
    listHinhThuc: any = [
        {
            label: `Kiểm kê`,
            value: `KiemKe`,
        },
        {
            label: `Cho vay`,
            value: `ChoVay`,
        },
        {
            label: `Điều chuyển`,
            value: `DieuChuyen`,
        },
        {
            label: `Khác`,
            value: `Khac`,
        },
    ];
    isKhoThanhPham: any = false;
    paging: any = {};
    listItem: any = [];
    item_new: any = {};
    title: any = "";
    newItem: any = {};
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
        this.item_new = this.item;

        var data: any = {};
        data.CurrentPage = 0;
        data.Loai = 5;
        this.item_new.Loai = 5;
        this.item.LoaiKiemKe = `KiemKe`;
        this.services.GetListdmKho(data).subscribe((res: any) => {
            this.listdmKho = mapArrayForDropDown(res, "Ten", "Id");
        });
        this.services.GetListLoBong(data).subscribe((res: any) => {
            this.listLoBong = mapArrayForDropDown(res, "Ten", "Id");
        });
        this.services
            .LoHang()
            .GetList(data)
            .subscribe((res: any) => {
                this.listLoHang = mapArrayForDropDown(res, "Ten", "Id");
            });
        this.services
            .dmQuyCachDongGoi()
            .GetList()
            .subscribe((res: any) => {
                this.listQuyCachDongGoi = mapArrayForDropDown(res, "Ten", "Id");
            });
        this.services
            .PhieuKiemKeKhoBongPhe()
            .GetlistdmMatHangKiemKeBongPhe(data.Loai)
            .subscribe((res: any) => {
                this.listNewMatHang = mapArrayForDropDown(res, "Ten", "Id");
                this.listNewMatHang_ref = res;
            });
    }
    GetQuyTrinh() {
        this.services
            .PhieuKiemKeKhoBong()
            .Get(this.Id)
            .subscribe((res1: any) => {
                this.item = res1;
                this.paging.CurrentPage = 1;
                this.paging.TotalPage = 5;
                this.paging.TotalItem = res1.listItem.length;
                this.item.listItem = res1.listItem;
                this.listItem = this.item.listItem.slice(0, 10);
                this.item_new = res1;
                this.KiemTraButtonModal();
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
            this.item.listItem.push(deepCopy(this.newItem));
            this.newItem = {};
        }
        //   this.item.listItem = deepCopy(this.listItem);
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
            this.item.listItem.push(deepCopy(this.newItem));
            this.newItem = {};
        }
        //   this.item.listItem = deepCopy(this.listItem);
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

    GhiLai() {
        if (validVariable(this.newItem.IddmItem)) {
            this.item.listItem.push(deepCopy(this.newItem));
            this.newItem = {};
        }
        //   this.item_new.listItem = this.listItem;
        this.services
            .PhieuKiemKeKhoBong()
            .Set(this.item)
            .subscribe((res: any) => {
                if (res) {
                    if (res.State === 1) {
                        this.toastr.success(res.message);
                        this.opt = "edit";
                        this.paginator.changePage(0);
                        //   this.item = res.objectReturn;
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
                    .PhieuKiemKeKhoBong()
                    .Delete(this.item)
                    .subscribe((res: any) => {
                        console.log(res);
                        if (res?.State === 1) {
                            this.toastr.success(res.message);
                            this.activeModal.close();
                        } else {
                            this.toastr.error(res.message);
                        }
                    });
            })
            .catch((er) => console.log(er));
    }

    delete(index) {
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
            .getLuuKhoKiemKeKhoXo(
                this.item.IddmKho,
                this.item.IdLoBong,
                "",
                this.item.IdLoHang
            )
            .subscribe((res1: any) => {
                res1.forEach((mathang) => {
                    mathang.SoLuong = mathang.TonSoLuong;
                    mathang.TongTrongLuong = mathang.TonTongTrongLuong;
                });
                this.item.listItem = res1;
                this.listItem = this.item.listItem.slice(0, 10);
                this.paging.CurrentPage = 1;
                this.paging.TotalPage = 5;
                this.paging.TotalItem = res1.length;
            });
    }
    changePage(event) {
        this.paging.CurrentPage = event.page + 1;
        this.paging.TotalItem = this.item.listItem.filter(ele => ele.isXoa !== true).length;

        let start = 10 * event.page;
        let end = start + 10;
        if (start + 10 > this.item.listItem.length) {
            end = this.item.listItem.filter(ele => ele.isXoa !== true).length;
        }
        this.listItem = this.item.listItem.filter(ele => ele.isXoa !== true).slice(start, end);
    }
    setNewItemName(event) {
        this.services
            .PhieuKiemKeKhoBong().getLuuKhoKiemKeKhoXoTheoItem(event.value)
            .subscribe((res1: any) => {
                console.log(res1)
                this.newItem = res1[0]
            });
        //   let selected = this.listNewMatHang_ref.find(
        //       (ele) => ele.Id === event.value
        //   );
        //   this.newItem.Ten = selected?.Ten;
        //   this.newItem.Ma = selected?.Ma;
    }
    add() {
        if (validVariable(this.newItem.IddmItem)) {
            //   this.listItem.push(deepCopy(this.newItem));
            this.item.listItem.push(deepCopy(this.newItem));
            this.newItem = {};
            console.log(this.paging);
            if (this.listItem.length > this.paging.CurrentPage * 10) {
                console.log(Math.floor(this.item.listItem.length / 10));
                this.paginator.changePage(
                    Math.floor(this.item.listItem.length / 10)
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
    luacChonMatHang() {
        let listItem: any = []
        if (this.item.listItem !== undefined && this.item.listItem !== null) {
            listItem = this.item.listItem.filter((e: any) => e.isXoa !== true);
        }
        this.services.getLuuKhoKiemKeKhoXo(this.item.IddmKho, this.item.IdLoBong, "", this.item.IdLoHang).subscribe((res1: any) => {
            let modalRef = this._modal.open(KhoxokiemkemathangmodalComponent, {
                backdrop: 'static',
                size: 'lg'
            })
            modalRef.componentInstance.opt = 'edit';
            modalRef.componentInstance.listMatHang = res1;
            modalRef.componentInstance.listItem = listItem;
            modalRef.result.then((data) => {

                console.log(data)
                if (this.item.listItem !== undefined && this.item.listItem.length > 0) {
                    this.item.listItem.forEach(element => {
                        element.isXoa = true;
                    });
                }
                else
                    this.item.listItem = [];
                for (let i = 0; i < data.data.length; i++) {
                    let isCheck: any = false;
                    for (let j = 0; j < this.item.listItem.length; j++) {
                        if (data.data[i].IddmItem === this.item.listItem[j].IddmItem && data.data[i].IdLoBong === this.item.listItem[j].IdLoBong) {
                            this.item.listItem[j].isXoa = false;
                            isCheck = true;
                            break;
                        }
                    }

                    if (isCheck == false) {
                        this.item.listItem.push(data.data[i])
                    }
                }
                this.changePage({ page: 0 });

            }, (reason) => {
            });
        })
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
