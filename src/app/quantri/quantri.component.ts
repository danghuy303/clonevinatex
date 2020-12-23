import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { AuthenticationService } from '../services/auth.service';
import { ModaldoimatkhauComponent } from './modal/modaldoimatkhau/modaldoimatkhau.component';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-quantri',
    templateUrl: './quantri.component.html',
    styleUrls: ['./quantri.component.css']
})
export class QuantriComponent implements OnInit {
    userBtn: any;
    userInfo: any;
    userSub: any;
    // userName: any = 'Vinatex';
    display: boolean = false;
    OSName: string = 'HỆ THỐNG Quản lý Nhà – Đất'
    menu: MenuItem[];
    constructor(private _auth: AuthenticationService, private _modal: NgbModal, private _router: Router) {
        this.getOSName(this._router.url)
        this.userInfo = this._auth.currentUserValue;
    }
    close() {
        this.display = false;
    }
    getOSName(url) {
        if (url.includes('sanxuat')) {
            this.OSName = 'Hệ thống quản trị ngành sợi'
        } else {
            this.OSName = 'HỆ THỐNG Quản lý Nhà – Đất'
        }
    }
    ngOnInit(): void {
        this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((res: any) => {
            this.getOSName(res.url)
        })
        this.menu = [
            // {
            //     label: 'Bàn làm việc',
            //     routerLink: '/quantri/dashboard',
            //     icon: 'fas fa-home',
            //     command: () => {
            //         this.close()
            //     }
            // },
            {
                label: 'Điều hành sản xuất',
                routerLink: '/quantri/dieuhanhsanxuat',
                icon: 'fas fa-warehouse',
                command: () => {
                    this.close()
                }
            },
            {
                label: 'Kế hoạch sản xuất',
                routerLink: '/quantri/kehoachsanxuat',
                icon: 'fas fa-circle',
                items: [
                    {
                        label: 'Giao KH sản xuất',
                        routerLink: '/quantri/kehoachsanxuat/giaokehoachsanxuat/0',
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                    {
                        label: 'Triển khai KH sản xuất',
                        routerLink: '/quantri/kehoachsanxuat/trienkhaikehoachsanxuat/0',
                        icon: 'fas fa-circle',
                        command: () => {
                            this.close()
                        }
                    },
                ]
            },
            {
                label: 'Phương án công nghệ',
                routerLink: '/quantri/trienkhaisanxuat',
                icon: 'fas fa-circle',
                items: [
                    {
                        label: 'Pha bông',
                        routerLink: '/quantri/trienkhaisanxuat/phabong/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Tìm bông',
                        routerLink: '/quantri/trienkhaisanxuat/timbong/0',
                        command: () => this.close()
                    },
                ]
            },
            // {
            //     label: 'Quản lý tài sản nhà đất',
            //     routerLink: '/quantri/quanlytaisannhadat',
            //     icon: 'pi pi-sitemap',
            //     command: () => this.close()
            // },
            // {
            //     label: 'Sắp xếp xử lý đất đai',
            //     icon: 'pi pi-sort-amount-up',
            //     routerLink: '/quantri/sapxepxuly',
            //     expanded: true,
            //     items: [
            //         {
            //             label: 'Yêu cầu sắp xếp',
            //             routerLink: '/quantri/sapxepxuly/yeucau',
            //             command: () => this.close()
            //         },
            //         {
            //             label: 'Quy trình sắp xếp',
            //             routerLink: '/quantri/sapxepxuly/quytrinh',
            //             command: () => this.close()
            //         }
            //     ]
            // },
            {
                label: 'Quản lý kho sản xuất',
                routerLink: '/quantri/quanlykhosanxuat',
                icon: 'pi pi-sitemap',
                expanded: true,
                items: [
                    {
                        label: 'Nhập kho',
                        routerLink: '/quantri/quanlykhosanxuat/nhapkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Thông số chất lượng',
                        routerLink: '/quantri/quanlykhosanxuat/thongsochatluong/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Xuất kho',
                        routerLink: '/quantri/quanlykhosanxuat/xuatkho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Kiểm kê kho',
                        routerLink: '/quantri/quanlykhosanxuat/kiemkekho/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Điều chuyển',
                        routerLink: '/quantri/quanlykhosanxuat/dieuchuyen/0',
                        command: () => this.close()
                    },
                    {
                        label: 'Hạ cấp',
                        routerLink: '/quantri/quanlykhosanxuat/hacap/0',
                        command: () => this.close()
                    },

                ]
                // command: () => this.close()
            },
            {
                label: 'Theo dõi thống kê',
                icon: 'pi pi-chart-bar',
                routerLink: '/quantri/theodoithongkebaocao',
                expanded: true,
                items: [
                    {
                        label: 'Thống kê sản lượng',
                        routerLink: '/quantri/thongkesanluong/0',
                        command: () => this.close()
                    },
                    // {
                    //     label: 'Báo cáo chi tiết cơ sở',
                    //     routerLink: '/quantri/theodoithongkebaocao/baocaochitietcaccoso',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Báo cáo tổng hợp',
                    //     routerLink: '/quantri/theodoithongkebaocao/baocaodonvi',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Báo cáo sản lượng tổng hợp',
                    //     routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongtonghop',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Báo cáo sản lượng chi tiết',
                    //     routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongchitiet',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Biểu 1A',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1a',
                    // },
                    // {
                    //     label: 'Biểu 1B',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1b',
                    // },
                    // {
                    //     label: 'Biểu 1C',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu1c',
                    // },
                    // {
                    //     label: 'Biểu 2A',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu2a',
                    // },
                    // {
                    //     label: 'Biểu 2B',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu2b',
                    // },
                    // {
                    //     label: 'Biểu 3',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu3',
                    // },

                    // {
                    //     label: 'Biểu 4',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu4',
                    // },
                    // {
                    //     label: 'Biểu 5',
                    //     routerLink: '/quantri/theodoithongkebaocao/bieu5',
                    // },
                ]
            },
            {
                label: 'Báo cáo',
                icon: 'pi pi-chart-bar',
                routerLink: '/quantri/theodoithongkebaocaosanxuat',
                expanded: true,
                items: [
                    {
                        label: 'Báo cáo sản lượng tổng hợp',
                        routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongtonghop',
                        command: () => this.close()
                    },
                    {
                        label: 'Báo cáo sản lượng chi tiết',
                        routerLink: '/quantri/theodoithongkebaocaosanxuat/sanluongchitiet',
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Danh mục dùng chung',
                routerLink: '/quantri/danhmuc',
                icon: 'pi pi-bars',
                expanded: true,
                items: [
                    // {
                    //     label: 'Tài sản',
                    //     routerLink: '/quantri/danhmuc/dmtaisan',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Tình trạng tài sản',
                    //     routerLink: '/quantri/danhmuc/dmtinhtrangtaisan',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Biến động',
                    //     routerLink: '/quantri/danhmuc/dmbiendong',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Mục đích sử dụng đất',
                    //     routerLink: '/quantri/danhmuc/dmmucdichsudung',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Đơn vị',
                    //     routerLink: '/quantri/danhmuc/dmdonvi',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Đơn vị đối tác',
                    //     routerLink: '/quantri/danhmuc/dmdonvisohuudatnha',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Nguồn gốc sử dụng đất',
                    //     routerLink: '/quantri/danhmuc/dmnguongocdat',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Hình thức xử lý',
                    //     routerLink: '/quantri/danhmuc/dmhinhthucxuly',
                    //     command: () => this.close()

                    // },
                    // {
                    //     label: 'Cấp hạng công trình',
                    //     routerLink: '/quantri/danhmuc/dmcaphangcongtrinh',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Hiện trạng sử dụng',
                    //     routerLink: '/quantri/danhmuc/dmhientrangsudung',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Loại văn bản',
                    //     routerLink: '/quantri/danhmuc/dmloaivanban',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Tỉnh/TP',
                    //     routerLink: '/quantri/danhmuc/dmtinh',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Quận/Huyện',
                    //     routerLink: '/quantri/danhmuc/dmquan',
                    //     command: () => this.close()
                    // },
                    // {
                    //     label: 'Phường/Xã',
                    //     routerLink: '/quantri/danhmuc/dmphuong',
                    //     command: () => this.close()
                    // },
                    {
                        label: 'Kho sản xuất',
                        routerLink: '/quantri/danhmucsanxuat/dmkho',
                        command: () => this.close()
                    },
                    {
                        label: 'Cấp bông',
                        routerLink: '/quantri/danhmucsanxuat/dmcapbong',
                        command: () => this.close()
                    },
                    {
                        label: 'Loại bông',
                        routerLink: '/quantri/danhmucsanxuat/dmloaibong',
                        command: () => this.close()
                    },
                    {
                        label: 'Ca sản xuất',
                        routerLink: '/quantri/danhmucsanxuat/dmcasanxuat',
                        command: () => this.close()
                    },
                    {
                        label: 'Danh sách máy',
                        routerLink: '/quantri/danhmucsanxuat/dmdsmay',
                        command: () => this.close()
                    },
                    {
                        label: 'Mặt hàng',
                        routerLink: '/quantri/danhmucsanxuat/dmmathang',
                        command: () => this.close()
                    },
                    {
                        label: 'Phân xưởng',
                        routerLink: '/quantri/danhmucsanxuat/dmphanxuong',
                        command: () => this.close()
                    },
                ]
            },
            {
                label: 'Quản lý hệ thống',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: 'HDSD',
                        routerLink: '/quantri/huongdansudung',
                        command: () => this.close()
                    },
                ]
            },
            // {
            //     label: 'Tài liệu tham khảo',
            //     icon: 'pi pi-copy',
            // }
        ];
        this.userBtn = [
            // {
            //     label: 'Thông tin tài khoản', command: () => {
            //     }
            // },
            {
                label: 'Đổi mật khẩu', command: () => {
                    let modalRef = this._modal.open(ModaldoimatkhauComponent, {
                        backdrop: 'static'
                    })
                }
            },

            { separator: true },
            {
                label: 'Đăng xuất',
                routerLink: ['/login'],
                command: () => {
                    this._auth.logout()
                }
            }
        ];

    }

}
