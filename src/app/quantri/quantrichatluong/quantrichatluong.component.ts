import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SanXuatService } from '../../services/callApiSanXuat';
import { mapArrayForDropDown, DateToUnix } from '../../services/globalfunction';
import { API } from '../../services/host';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quantrichatluong',
  templateUrl: './quantrichatluong.component.html',
  styleUrls: ['./quantrichatluong.component.css']
})
export class QuantrichatluongComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  filter: any = {};
  listMatHang: any = [];
  listPhanXuong: any = [];
  listCongDoan: any = [
    { id: 'hoiAm', ten: 'Hồi ẩm' },
    { id: 'loiCat', ten: 'Lõi cắt' },
    { id: 'clasmimat', ten: 'Clasimát' },
    { id: 'ong', ten: 'Ống' },
    { id: 'con', ten: 'Con' }
  ];
  listView: any = [];
  listRouter: any = [
    { Loai: 'ChatLuongHoiAm', Link: '/quantri/quanlysanxuatkhohoiam/khohoiam/chatluongsoi' },
    { Loai: 'ChatLuongLoiCat', Link: '/quantri/theodoithongkebaocaosanxuat/thongkechitieuloicat' },
    { Loai: 'ChatLuongClasimat', Link: '/quantri/theodoithongkebaocaosanxuat/thongkechitieuclassimat' },
    { Loai: 'ChatLuongBanChePham', Link: '/quantri/quanlykhosanxuat/khobong/kiemtrabanchepham' },
    { Loai: 'ChatLuongBong', Link: '/quantri/quanlykhosanxuat/khobong/thongsochatluong' }
  ]


  constructor(
    public _services: SanXuatService,
    public toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllOptions();
  }
  scrollToLeft() {
    // this.scrollContainer.nativeElement.scrollLeft = 0;
    const el = this.scrollContainer.nativeElement.querySelector('.pintable-scroll');
    if (el) el.scrollLeft = 0;
  }
  getMonth() {
    let date = new Date();
    this.filter.TuNgay = new Date(date.getFullYear(), date.getMonth(), 1);
    this.filter.DenNgay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // Scroll về đầu khi thay đổi tháng
    this.scrollToLeft();
    this.getListData();
  }

  getAllOptions() {
    forkJoin([
      this._services.GetOptions().GetMatHang(),
      this._services.GetListdmPhanXuongOpt()
    ]).subscribe((res: any) => {
      this.listMatHang = mapArrayForDropDown(res[0], 'Ten', 'Id');
      this.listPhanXuong = mapArrayForDropDown(res[1], "Ten", "Id");
      this.filter.IddmPhanXuong = this.listPhanXuong[0]?.value;
      this.getMonth();
    })
  }

  getListData() {
    let data = {
      TuNgayUnix: DateToUnix(this.filter.TuNgay),
      DenNgayUnix: DateToUnix(this.filter.DenNgay),
      IddmPhanXuong: this.filter.IddmPhanXuong,
      IddmItem: ''
    }
    this._services.GetListQuanTriChatLuong(data).subscribe((res: any) => {
      if (res.Data.listMatHang?.length) {
        this.listView = res.Data.listMatHang?.map(ele => {
          return {
            ...ele,
            isShow: true
          }
        });
      }
    })
  }

  handleTree(item) {
    item.expand = !item.expand;
    setTimeout(() => {
      this.scrollToLeft();
    });
    // Chỉ gọi API khi expand = true và chưa có data (listNgay chưa được load)
    if (item.expand && (!item.listNgay || item.listNgay.length === 0)) {
      let data = {
        TuNgayUnix: DateToUnix(this.filter.TuNgay),
        DenNgayUnix: DateToUnix(this.filter.DenNgay),
        IddmPhanXuong: this.filter.IddmPhanXuong,
        IddmItem: item.IddmItem
      }

      this._services.GetListQuanTriChatLuongChiTiet(data).subscribe((res: any) => {
        if (res.Data.listNgay?.length) {
          // Update specific item với data từ API
          const itemIndex = this.listView.findIndex(ele => ele.IddmItem === item.IddmItem);
          if (itemIndex !== -1) {
            this.listView[itemIndex] = {
              ...this.listView[itemIndex],
              listNgay: res.Data.listNgay,
              dataLoaded: true // Mark data đã được load
            };
          }
        }
      });
    }
  }

  handleLink(item) {
    let routerURL = '';
    if (item.IdPhieu) {
      routerURL = this.listRouter.find(ele => ele.Loai === item.LoaiQuanTriChatLuong)?.Link || '';
      if (routerURL) {
        window.open(`${API.imgURL}/vinatex/#${routerURL}/${item.IdPhieu || 0}`);
      } else {
        this.toastr.warning("Không tìm thấy điều hướng của quy trình!");
      }
    }
  }

  handleMatHang() {
    this.listView = this.listView?.map(ele => {
      return {
        ...ele,
        isShow: this.filter.IddmMatHang ? (ele.IddmItem === this.filter.IddmMatHang ? true : false) : true
      }
    })
    // Scroll về đầu khi thay đổi mặt hàng
    setTimeout(() => {
      this.scrollToLeft();
    }, 100);
  }

}
