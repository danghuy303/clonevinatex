import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SanXuatService } from "src/app/services/callApiSanXuat";
import {
    DateToUnix,
    mapArrayForDropDown,
    validVariable,
} from "src/app/services/globalfunction";
import { StoreService } from "src/app/services/store.service";
import { BotrimayChungComponent } from "./modals/botrimay-chung/botrimay-chung.component";
import { BotrimayOngComponent } from "./modals/botrimay-ong/botrimay-ong.component";
@Component({
    selector: "app-candoichuyen",
    templateUrl: "./candoichuyen.component.html",
    styleUrls: ["./candoichuyen.component.css"],
    providers: [DatePipe],
})
export class CandoichuyenComponent implements OnInit {
    listDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    listDates = [];
    filter: any = {
        CongDoan: "ONG",
    };
    listCongDoan: any = [];
    listPhanXuong: any = [];
    mapMa_TenCongDoan: any = {};
    IdDuAn: any;

    constructor(
        private _store: StoreService,
        private _services: SanXuatService,
        private datepipe: DatePipe,
        private _modal: NgbModal
    ) {
        this._store.getNhaMay().subscribe((res) => {
            this.IdDuAn = res;
        });
    }

    ngOnInit(): void {
        this.GetOptions();
        this.boTriMay();
    }
    GetOptions(): void {
        let data2 = {
            PageSize: 20,
            CurrentPage: 0,
            sFilter: this.filter.keyWord ? this.filter.keyWord : "",
            CongDoan: this.filter.CongDoan ? this.filter.CongDoan : "",
            Ma: "",
            Ten: "",
        };
        this._services.GetListdmPhanXuong(data2).subscribe((res: any) => {
            this.listPhanXuong = mapArrayForDropDown(res, "Ten", "Id");
        });
        this._services.GetListCongDoan().subscribe((res: any) => {
            this.listCongDoan = mapArrayForDropDown(res, "Ten", "Ma");
            res.forEach((cd) => {
                this.mapMa_TenCongDoan[cd.Ma] = cd.Ten;
            });
            // this.listCongDoan.unshift({ label: 'Tất cả', value: '' })
            // this.filter.CongDoan = this.listCongDoan[0].value;ß
        });
    }
    getDates(startDate, endDate) {
        let dates = [],
            currentDate = startDate,
            addDays = function (days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            let data: any = {};
            if (currentDate.getDate() === 1) {
                data.header = `01/${
                    currentDate.getMonth() < 9
                        ? `0${currentDate.getMonth() + 1}`
                        : currentDate.getMonth() + 1
                }`;
            } else {
                data.header = this.datepipe.transform(currentDate, "dd");
            }
            data.prop = this.datepipe.transform(currentDate, "dd_MM_yyyy");
            data.value = currentDate;
            dates.push(data);
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    }
    GetCalendar() {
        if (validVariable(this.filter._tuNgay)) {
            this.filter.TuNgayUnix = DateToUnix(this.filter._tuNgay);
        } else {
            this.filter.TuNgayUnix = null;
        }
        if (validVariable(this.filter._denNgay)) {
            this.filter.DenNgayUnix = DateToUnix(this.filter._denNgay);
        } else {
            this.filter.DenNgayUnix = null;
        }
        if (
            validVariable(this.filter.TuNgayUnix) &&
            validVariable(this.filter.DenNgayUnix) &&
            this.filter.TuNgayUnix < this.filter.DenNgayUnix
        ) {
            this.listDates = this.getDates(
                this.filter._tuNgay,
                this.filter._denNgay
            );
            for (let i = 0; i < this.filter._tuNgay.getDay(); i++) {
                this.listDates.unshift({ header: "none" });
            }
        }
    }
    boTriMay(date?) {
        console.log(date);
        if (this.filter.CongDoan === "ONG") {
            let modalRef = this._modal.open(BotrimayOngComponent, {
                size: "fullscreen",
                backdrop: "static",
            });
            modalRef.componentInstance.item = {
                listItem: [],
            };
            modalRef.result
                .then((res) => {})
                .catch((er) => {
                    console.log(er);
                });
        } else {
            let modalRef = this._modal.open(BotrimayChungComponent, {
                size: "fullscreen",
                backdrop: "static",
            });
            modalRef.componentInstance.TenCongDoan = this.mapMa_TenCongDoan[this.filter.CongDoan]
            modalRef.componentInstance.item = {
                listItem: [],
            };
            modalRef.result
                .then((res) => {})
                .catch((er) => {
                    console.log(er);
                });
        }
    }
}
