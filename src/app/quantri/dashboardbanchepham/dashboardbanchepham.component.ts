import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown, validVariable } from 'src/app/services/globalfunction';
import { StoreService } from 'src/app/services/store.service';
import { StoreBase } from 'src/app/services/storebase.class';

@Component({
  selector: 'app-dashboardbanchepham',
  templateUrl: './dashboardbanchepham.component.html',
  styleUrls: ['./dashboardbanchepham.component.css']
})
export class DashboardbanchephamComponent extends StoreBase implements OnInit {
  filter: any = {
    IdDuAn: 0,
    IddmPhanXuong: "1cf3f340-0f55-4f34-938p-e329318e25et",
    IddmCaSanXuatThucTe: "",
    nNam: 0,
    nThang: 0,
    nNgay: 0,
    LoaiThoiGian: 0,
    CongDoan:null,
  };
  listMatHang:any=[];
  Nams: any = [];
  dataBanChePham: any = {};
  listTieuChi:any=[];
  SelectItem:any;
  listPhanXuong: any = [];
  listCongDoan: any = [];
  option1: any = {
    scales: {
      xAxes: [{
        beginAtZero: true
        // type: 'category',
        // labels: ['January', 'February', 'March', 'April', 'May', 'June']
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
    },
    legend: {
      position: 'bottom'
    },
    maintainAspectRatio: window.innerWidth <= 768 ? false : true,
    aspectRatio: window.innerWidth <= 768 ? 1 : (((window.innerWidth - 80)) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  listLoaiThoiGian: any = [
    { value: 0, label: 'Ngày' },
    { value: 1, label: 'Tuần' },
    { value: 2, label: 'Tháng' },
  ]
  listThang:any[]=[];
  headerChatLuongSanPham =[];

  isBanChePham:boolean = false;
  checkBanChePham:any;
  indexBanChePham:any


  constructor(private _services: SanXuatService, 
    private _auth: AuthenticationService, public store: StoreService, public toastr: ToastrService) {
    super(store);
   }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.Nams.push({ value: (new Date()).getFullYear() - i, label: (new Date()).getFullYear() - i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ value: i, label: `Tháng ${i}` });
      this.headerChatLuongSanPham.push({
        label: `T ${i}`,
        prop: `Thang${i}`
      })
    }
    this.filter.nNam = (new Date()).getFullYear();
    this.filter.nThang = (new Date().getMonth()+1);
    this.getAllOptions();
  }
  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    let data2 = {
      PageSize: 20,
      CurrentPage: 0,
      sFilter: this.filter.keyWord ? this.filter.keyWord : '',
      CongDoan: this.filter.CongDoan ? this.filter.CongDoan : '',
      Ma: "",
      Ten: ""
    };
    this._services.GetOptions().GetPhanXuong().subscribe((res: any) => {
      this.listPhanXuong = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmPhanXuong = this.listPhanXuong[0].value;
    })
    
    this._services.GetListCongDoan().subscribe((res:any[])=>{
      console.log('listCongDoan',res);
      this.listCongDoan = mapArrayForDropDown(res,'Ten','Ma');
      this.filter.CongDoan = this.listCongDoan[0].value;
      this.getTieuChiChatLuongBanChePham()
    })
  }
  getTieuChiChatLuongBanChePham(){
    this._services.dmTieuChiChatLuongsoi().GetListdmTieuChiBanChePham(this.filter.CongDoan).subscribe((res: any) => {
      console.log('listTieuChi',res);
      this.listTieuChi = mapArrayForDropDown(res, 'Ten', 'Id');
      this.filter.IddmChiTieu = this.listTieuChi[0].value;
      this.GetBaoCaoQuyTrinhKiemTraChatLuong();
    })
  }
  GetBaoCaoQuyTrinhKiemTraChatLuong() {
    // this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuong(2021, "1cf3f340-0f55-4f34-938p-e629318e25et", "34701076-c84a-4459-8ce9-fbde22d44e39").subscribe((res: any) => {
    this._services.BaoCao().GetBaoCaoQuyTrinhKiemTraChatLuongBanChePham(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, '',this.filter.CongDoan).subscribe((res: any) => {
      this.listMatHang = res;
      this.listMatHang.forEach(mathang => {
        mathang.checked = false;
      });
      // if (this.SelectItem?.IddmItem !== undefined) {
      //   console.log('exist', this.SelectItem);
      //   let exist = this.listMatHang.find(ele => ele.IddmItem === this.SelectItem.IddmItem);
      //   exist.checked = true;
      //   this.SelectItem = exist;
      // } else {
      //   console.log('not exist', this.SelectItem);
        this.listMatHang[0].checked = false;
        this.SelectItem = this.listMatHang[0];
      // }
      this.GetBieuDoDuongKiemTraChatLuong_js();
      this.dataBanChePham = [];
    });
  }
  GetBieuDoDuongKiemTraChatLuong_js() {
    this._services.BaoCao().GetBieuDoDuongKiemTraChatLuongBanChePham(this.filter.nNam, this.filter.IddmPhanXuong, this.filter.IddmChiTieu, this.SelectItem.IddmItem, this.filter.LoaiThoiGian,this.filter.CongDoan).subscribe((res: any) => {
      let label = this.listTieuChi.filter(obj => obj.value == this.filter.IddmChiTieu)[0].label;
      this.dataBanChePham = {
        labels: res.lstLabel.map(ele => ele),
        datasets: [
          {
            type: 'line',
            label: this.SelectItem.TenItem,
            borderColor: '#FF0000',
            // borderWidth: 2,
            fill: false,
            data: res.listThucTe,
            // steppedLine: 'before'
          },
          {
            type: 'line',
            label: label,
            borderColor: '#0000E5',
            // borderDash: [10, 5],
            // borderWidth: 2,
            fill: false,
            data: res.listLyThyet,
          },
        ]
      }
    });
  }
  xuatBaoCaoBanChePham() {
    let data = this.filter;
    this._services.DashBoard().ExportBaoCaoThongKeChatLuongBanChePham(this.filter).subscribe((res: any) => {
      if (res) {
        if (validVariable(res.State)) {
          this.toastr.error(res.message);
        } else {
          this._services.download(res.TenFile);
        }
      }
    })
  }
  checkMatHang(e, item, index) {
    this.checkBanChePham = e.checked;
    this.indexBanChePham = index;
    // if (e.checked) {
    //   this.listMatHang.forEach(mathang => {
    //     mathang.checked = false
    //   });
    //   this.listMatHang[index].checked = true;
    //   this.SelectItem = this.listMatHang[index];
    //   this.GetBieuDoDuongKiemTraChatLuong_js();
    // }
    // else {
    //   this.SelectItem = {};
    //   this.dataBanChePham = [];
    // }
  }

  check() {
   
    this.isBanChePham = true;
    if (this.checkBanChePham) {
      this.listMatHang.forEach(mathang => {
        mathang.checked = false
      });
      this.listMatHang[this.indexBanChePham].checked = true;
      this.SelectItem = this.listMatHang[this.indexBanChePham];
      this.GetBieuDoDuongKiemTraChatLuong_js();
    }
    else {
      this.SelectItem = {};
      this.dataBanChePham = [];
    }
  }

  checkXuatMatHang(e, item, index) {
    if (item.xuatChecked) {
      item.xuatChecked = !item.xuatChecked;
    } else {
      item.xuatChecked = true;
    }
  }
  resetFilter(){
    this.filter = {
      LoaiThoiGian:0
    };
    this.listMatHang = [];
    this.dataBanChePham = {};
    this.ngOnInit();
  }
}
