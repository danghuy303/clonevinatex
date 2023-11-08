import { formatNumber } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { PintableDirective } from 'voi-lib';

@Component({
    selector: 'app-quyet-toan-nguyen-lieu',
    templateUrl: './quyet-toan-nguyen-lieu.component.html',
    styleUrls: ['./quyet-toan-nguyen-lieu.component.css']
})
export class QuyetToanNguyenLieuComponent implements OnInit {
    @ViewChild(PintableDirective) voiPintable: PintableDirective;
    pin: number = 3;
    filter: any = {};
    data: any;
    dataXo: any;
    item: any = { listData3: [] };
    listPhanXuong: any = [];
    listNam: any = [];
    thang: any;
    options: any = {
        plugins: {
            labels: {
                fontSize: 0,
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    if (context.dataset.label) {
                        return formatNumber(parseFloat(value), 'en-US', '0.0-3')
                    }
                    return null
                },
            }
        },
        legend: {
            position: 'bottom',
            display: false
        },
        scales: {
            xAxes: [{
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (label, index, labels) {
                        return formatNumber(label, 'en-EN', '0.3-3');
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return `${formatNumber(tooltipItem.yLabel, 'en-EN')}`
                },
            }
        },
        responsive: true,
    };
    ops: any = {
        plugins: {
            labels: {
                fontSize: 0,
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold'
                },
                formatter: (value, context) => {
                    if (context.dataset.label) {
                        return formatNumber(parseFloat(value), 'en-US', '0.0-3')
                    }
                    return null
                },
            }
        },
        legend: {
            position: 'bottom',
            display: false
        },
        scales: {
            xAxes: [{
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function (label, index, labels) {
                        return formatNumber(label, 'en-EN', '0.3-3');
                    }
                }
            }]
        },
        tooltips: {
            bodyFontSize: 20,
            titleFontSize: 22,
            callbacks: {
                label: function (tooltipItem, data) {
                    return `${formatNumber(tooltipItem.yLabel, 'en-EN')}`
                },
            }
        },
        responsive: true,
    };
    obj_data: any = {};
    payload: any = {};
    itemBongPhe: any = { listData1: [] };
    chart5: any;
    $sub!: Subscription;

    constructor(
        private _services: SanXuatService,
        private toastr: ToastrService,
        private store: StoreService,
    ) {
        this.$sub = this.store.getNhaMay().subscribe(res => {
            if (res) {
                this.ngOnInit()
            }
        })
    }

    ngOnInit(): void {
        for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
            this.listNam.push({ value: i, label: i });
        }
        this.GetListdmPhanXuong();
        this.filter.Nam = this.listNam[0].value;
    }

    XuatDuLieu() {
        let data = {
            Nam: this.filter.Nam ? this.filter.Nam : null,
            IddmPhanXuong: this.filter.IddmPhanXuong,
            Thang: this.thang ? this.thang : new Date().getMonth()+1 
        }
        this._services.QuyetToan().ExportDashbroadKiemKeBanChePhamToHieu(data).subscribe((res: any) => {
            this._services.download(res.TenFile);
        })
    }

    BieuDoTiLeTieuHaoBong(data) {
        this._services.QuyetToan().BieuDoTiLeTieuHaoBong(data).subscribe((res: any) => {
            this.obj_data = res.objectReturn;
            this.data = {
                labels: res.objectReturn.listThoiGian.map(ele => `T${ele}`),
                datasets: [
                    // {
                    //     label: 'Định mức',
                    //     backgroundColor: '#42A5F5',
                    //     borderColor: '#1E88E5',
                    //     data: res.objectReturn.listDinhMuc.map(ele => ele.KhoiLuong),
                    // },
                    {
                        type: 'line',
                        borderColor: '#1E88E5',
                        fill: false,
                        data: res.objectReturn.listDinhMuc.map(ele => ele.KhoiLuong),
                    },
                    {
                        type: 'line',
                        borderColor: '#7CB342',
                        fill: false,
                        data: res.objectReturn.listThucTe.map(ele => ele.KhoiLuong)
                    },
                    {
                        type: 'line',
                        borderColor: '#cc65c5',
                        fill: false,
                        data: res.objectReturn.listSoSach.map(ele => ele.KhoiLuong)
                    },
                    // {
                    //     label: 'Thực tế',
                    //     backgroundColor: '#9CCC65',
                    //     borderColor: '#7CB342',
                    //     data: res.objectReturn.listThucTe.map(ele => ele.KhoiLuong),
                    // }
                ]
            }
        })
    }

    BieuDoTiLeTieuHaoXo(data) {
        this._services.QuyetToan().BieuDoTiLeTieuHaoXo(data).subscribe((res: any) => {
            this.obj_data = res.objectReturn;
            this.dataXo = {
                labels: res.objectReturn.listThoiGian.map(ele => `T${ele}`),
                datasets: [
                    // {
                    //     label: 'Định mức',
                    //     backgroundColor: '#42A5F5',
                    //     borderColor: '#1E88E5',
                    //     data: res.objectReturn.listDinhMuc.map(ele => ele.KhoiLuong),
                    // },
                    {
                        type: 'line',
                        label: '',
                        borderColor: '#1E88E5',
                        fill: false,
                        data: res.objectReturn.listDinhMuc.map(ele => ele.KhoiLuong),
                    },
                    {
                        type: 'line',
                        label: '',
                        borderColor: '#7CB342',
                        fill: false,
                        data: res.objectReturn.listThucTe.map(ele => ele.KhoiLuong)
                    },
                    // {
                    //     label: 'Thực tế',
                    //     backgroundColor: '#9CCC65',
                    //     borderColor: '#7CB342',
                    //     data: res.objectReturn.listThucTe.map(ele => ele.KhoiLuong),
                    // }
                    {
                        type: 'line',
                        label: '',
                        borderColor: '#cc65c5',
                        fill: false,
                        data: res.objectReturn.listSoSach.map(ele => ele.KhoiLuong)
                    },
                ]
            }
        })
    }

    getChart(data?: any) {
        this.thang = this.obj_data.listThoiGian ? this.obj_data.listThoiGian[data.element._index] : ((new Date()).getMonth() + 1);
        this.payload = {
            ... this.payload,
            Nam: this.filter.Nam ? this.filter.Nam : null,
            IddmPhanXuong: this.filter.IddmPhanXuong,
            Thang: this.thang
        }
        this.BieuDoTiLeCheThanhToHieu(this.payload)
        this.BieuDoTiLeBongPhe(this.payload)
    }

    GetListdmPhanXuong() {
        this._services.GetListdmPhanXuongForIdDuAn().subscribe((res: any) => {
            this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
            this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
            this.getOptions();
        })
    }

    BieuDoTiLeCheThanhToHieu(data) {
        this._services.QuyetToan().BieuDoTiLeCheThanhToHieu(data).subscribe((res: any) => {
            this.toastr.success(res.message);
            if (res.objectReturn) {
                this.item = res.objectReturn
            }
            else this.item = { listData3: [] }
        })
    }
    BieuDoTiLeBongPhe(data) {
        this._services.QuyetToan().BieuDoTiLeBongPhe(data).subscribe((res: any) => {
            if (res) {
                this.itemBongPhe = res;
            }
            else this.itemBongPhe = {}
        })
    }

    getOptions() {
        this.payload = {
            ... this.payload,
            Nam: this.filter.Nam ? this.filter.Nam : null,
            IddmPhanXuong: this.filter.IddmPhanXuong,
        }
        this.BieuDoTiLeTieuHaoBong(this.payload);
        this.BieuDoTiLeTieuHaoXo(this.payload);
        this.getChart();
    }

}
