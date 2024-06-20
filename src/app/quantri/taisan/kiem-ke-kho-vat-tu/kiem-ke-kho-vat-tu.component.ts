import { Component, OnInit, ViewChild } from '@angular/core';
import { DateToUnix } from 'src/app/services/globalfunction';
import { KhobongphekiemkekhomodalComponent } from '../../quanlykhosanxuat/quytrinh/khobongphekiemkekhomodal/khobongphekiemkekhomodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';
import { ChiTietKiemKhoVatTuComponent } from './chi-tiet-kiem-kho-vat-tu/chi-tiet-kiem-kho-vat-tu.component';

@Component({
    selector: 'app-kiem-ke-kho-vat-tu',
    templateUrl: './kiem-ke-kho-vat-tu.component.html',
    styleUrls: ['./kiem-ke-kho-vat-tu.component.css']
})
export class KiemKeKhoVatTuComponent extends StoreBase implements OnInit {
    @ViewChild("paginator") paginator: any;
    items: any = [];
    filter: any = {};
    listLoaiPhuongAn: any = [];
    trangThai: any = 1;
    paging: any = { CurrentPage: 1, TotalPage: 1, TotalItem: 0 };
    cols: any = [
        // {
        //     header: "Tên kho",
        //     field: "TendmKho",
        //     width: "200px",
        //     ellipsis: false,
        //     class: `text-center`
        // },
        {
            header: "Nội dung",
            field: "NoiDung",
            width: "200px",
            ellipsis: true,
            class: `text-left`
        },
        {
            header: "Ghi chú",
            field: "GhiChu",
            width: "200px",
            ellipsis: true,
            class: `text-left`
        },
        {
            header: "Trạng thái",
            field: "TenTrangThai",
            width: "150px",
            ellipsis: false,
            class: `text-center`
        },
    ];
    checkQuyen: any = { ChuaXuLy: true, DaXyLy: true, ThemMoi: true };
    title: any = "";
    eAction = 'PHIEUKIEMKEKHO'
    constructor(
        public _modal: NgbModal,
        public _toastr: ToastrService,
        private _service: SanXuatService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        public store: StoreService
    ) {
        super(store)
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((res: any) => {
            this.title = 'khobongphe';
            if (res.id !== "0") {
                this.update(res.id);
            }
        });
        this.resetFilter()
        this.KiemTraTabTrangThai();
    }
    changeParam(id) {
        if (this._modal.hasOpenModals()) {
            this._modal.dismissAll();
        }
        this.router.navigate(
            [`quantri/taisan/kiem-ke-kho-vat-tu/${id}`],
            { replaceUrl: true }
        );
    }
    add() {
        let modalRef = this._modal.open(ChiTietKiemKhoVatTuComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "add";
        modalRef.componentInstance.title = this.title;
        modalRef.componentInstance.item = {};
        modalRef.result
            .then((res: any) => {
                this.changeParam(0);
                this.GetListQuyTrinh();
            })
            .catch((er) => {
                this.GetListQuyTrinh();
                this.changeParam(0);

            });
    }
    update(Id) {
        let modalRef = this._modal.open(ChiTietKiemKhoVatTuComponent, {
            size: "fullscreen",
            backdrop: "static",
        });
        modalRef.componentInstance.opt = "edit";
        modalRef.componentInstance.Id = JSON.parse(JSON.stringify(Id));
        modalRef.componentInstance.title = this.title;
        modalRef.componentInstance.isKhoThanhPham = (this.title === 'khothanhpham');
        modalRef.result
            .then((res: any) => {
                this.changeParam(0);
                this.GetListQuyTrinh();
            })
            .catch((er) => {
                this.GetListQuyTrinh();
                this.changeParam(0);
            });
    }
    changeTab(e) {
        this.trangThai = e.index + 1;
        this.GetListQuyTrinh(true);
    }
    changePage(event) {
        this.paging.CurrentPage = event.page + 1;
        this.GetListQuyTrinh();
    }
    GetListQuyTrinh(reset?) {
        if (reset) {
            this.paging.CurrentPage = 1;
        }
        let data: any = {
            PageSize: 20,
            CurrentPage: this.paging.CurrentPage,
            TabTrangThai: this.trangThai,
            sFilter: this.filter.KeyWord,
            TuNgay: DateToUnix(this.filter.TuNgay),
            DenNgay: DateToUnix(this.filter.DenNgay),
            Ma: "",
            Ten: "",
        };
        data.Loai = 7;
        this._service.PhieuKiemKeKhoVatTu().GetList(data).subscribe((res: any) => {
                this.items = res.Data.Items;
                this.paging.CurrentPage = res.Data.Page;
                this.paging.TotalItem = res.Data.TotalCount
            });
    }
    resetFilter() {
        this.filter = {};
        this.GetListQuyTrinh(true);
    }
    KiemTraTabTrangThai() {
        this._service.KiemTraTabTrangThai(this.eAction).subscribe((res: any) => {
            this.checkQuyen = res;
        })
    }

}
