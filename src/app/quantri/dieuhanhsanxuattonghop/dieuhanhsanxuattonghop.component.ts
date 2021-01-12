import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dieuhanhsanxuattonghop',
  templateUrl: './dieuhanhsanxuattonghop.component.html',
  styleUrls: ['./dieuhanhsanxuattonghop.component.css']
})
export class DieuhanhsanxuattonghopComponent implements OnInit, AfterViewInit {
  filter: any = {

  }
  @ViewChild('bangScroll') bangScroll: ElementRef;
  listNhaMay: any = [];
  listMatHang: any = [];
  listPhanXuong: any = [];
  listCa: any = [];
  listThang: any = [];
  listNgay: any = [];
  thongKes: any = [];
  thongKes1: any = [];
  Nams: any = [];
  dataSet1: any = {};
  showSanLuong = false;
  optionPie: any = {
    plugins: {
      labels: {
        render: 'percentage',
        fontColor: '#fff',
        fontStyle: 'bold',
      }
    },
    legend: {
      position: 'left'
    },
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 3) / ((window.innerHeight - (225 + 32.5)) / 2))
  }
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
    maintainAspectRatio: window.innerWidth <= 375 ? false : true,
    aspectRatio: (((window.innerWidth - 80) / 2) / ((window.innerHeight - (225 + 32.5)) / 2))
  };
  dataPie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  chatLuongSanPham: any = [];
  headerChatLuongSanPham: any = [];
  chatLuongSanPhamScrollHeight: any = 0;
  constructor(private _services: SanXuatService) { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.Nams.push({ label: (new Date()).getFullYear() - i });
    }
    for (let i = 1; i <= 12; i++) {
      this.listThang.push({ label: `Tháng ${i}` });
      this.headerChatLuongSanPham.push({
        label: `T ${i}`,
        prop: `T${i}`
      })
    }
    for (let i = 1; i <= 31; i++) {
      this.listNgay.push({ label: `${i}` });
    }
    this.dataSet1 = {
      labels: this.listThang.map(ele => ele.label),
      datasets: [
        {
          type: 'line',
          label: 'NE 30 CVCM 60/40',
          borderColor: '#FF0000',
          // borderWidth: 2,
          fill: false,
          data: [928, 862, 928, 848,  765, 806, 721, 655, 655, 655, 655, 655],
          // steppedLine: 'before'
        },
        {
          type: 'line',
          label: 'Tiêu chuẩn',
          borderColor: '#0000E5',
          // borderDash: [10, 5],
          // borderWidth: 2,
          fill: false,
          data: Array.from({ length: 12 }, () => 800),
        },
      ]
    }
    this.thongKes = [
      { Ten: 'Sản lượng ống', TieuHao: 15268, DonVi: 'quả', ManHinh: 15268 },
      { Ten: 'Lũy kế', TieuHao: 407465, DonVi: 'quả', ManHinh: 407465 },
      { Ten: 'Điện AC', TieuHao: 3606, DonVi: 'KW', ManHinh: 3606 },
      { Ten: 'Tổng điện', TieuHao: 45150, DonVi: 'KW', ManHinh: 45150 },
      { Ten: 'Điện AC', TieuHao: 8, DonVi: '%', ManHinh: 8 },
    ]
    this.thongKes1 = [
      { Ten: 'Ne BQ:', GiaTri: 28 },
      { Ten: 'Sản lượng quy Ne 30:', GiaTri: 14131 },
      { Ten: 'Lũy kế quy Ne 30:', GiaTri: 379106 },
      { Ten: 'Sản lượng quy Ne 30/ca:', GiaTri: 4710 },
      { Ten: 'Sản lượng Ne 30 KH/ca:', GiaTri: 5000 },
      { Ten: 'LK % hoàn thành KHSX:', GiaTri: 90 },
    ]
    this.dataPie = {
      labels: ['Ne 16 CD', 'Ne 20 CD', 'Ne 32 CD', 'Khác'],
      datasets: [
        {
          data: [300, 50, 100, 200],
          backgroundColor: [
            "#009900",
            "#36A2EB",
            "#FFCE56",
            "#FF671F"
          ],
          hoverBackgroundColor: [
            "#009900",
            "#36A2EB",
            "#FFCE56",
            "#FF671F"
          ]
        }
      ]
    };
    this.getAllOptions();
  }

  ngAfterViewInit(): void {
    this.chatLuongSanPhamScrollHeight = `${this.bangScroll.nativeElement.offsetHeight - 35}px`;
  }

  getAllOptions() {
    let data = {
      CurrentPage: 0,
      NumperPage: 10,
      Ma: '',
      Ten: "",
      sFilter: ''
    }
    this._services.GetOptions().GetNhaMay().subscribe((res: any) => {
      this.listNhaMay = mapArrayForDropDown(res, 'Ten', 'Id')
    });
    this._services.GetOptions().GetMatHang().subscribe((res: any) => {
      let fakeMatHang = [
        {label:'Ne 20 CD',TC:110,T1:85,T2:104,T3:98,T4:104,T5:149,T6:98,T7:85,T8:115,T9:80,T10:78,T11:115,T12:null,ChiSo:2.02,Loai: 'Xuất khẩu',SoQua:14101},
        {label:'Ne 30 CD',TC:400,T1:503,T2:467,T3:371,T4:619,T5:474,T6:426,T7:322,T8:null,T9:411,T10:398,T11:453,T12:null,ChiSo:2.02,Loai: 'Xuất khẩu',SoQua:12021},
        {label:'Ne 36 CD',TC:800,T1:794,T2:756,T3:771,T4:null,T5:909,T6:717,T7:null,T8:null,T9:null,T10:null,T11:null,T12:null,ChiSo:2.02,Loai: 'Xuất khẩu',SoQua:13803},
        {label:'Ne 40 CD',TC:980,T1:956,T2:946,T3:1143,T4:1208,T5:1163,T6:962,T7:972,T8:801,T9:823,T10:null,T11:null,T12:null,ChiSo:2.02,Loai: 'Xuất khẩu',SoQua:15070},
      ]
      this.listMatHang = [...fakeMatHang,...mapArrayForDropDown(res, 'Ten', 'Id')];
      this.listMatHang.forEach(mathang => {
        mathang.checked = false;
      });
    });
    // this._services.GetListdmKho(data).subscribe((res: any) => {
    //   this.listKho = mapArrayForDropDown(res, 'Ten', 'Id')
    // });
    // this._services.GetListCongDoan().subscribe((res: any) => {
    //   this.listCongDoan = mapArrayForDropDown(res, "Ten", 'Ma')
    // });
    // this._services.GetListdmMay(data).subscribe((res: any) => {
    //   this.listMay = mapArrayForDropDown(res, "Ma", 'Id')
    // });
    this._services.GetListOptdmCaSanXuat().subscribe((res: any) => {
      this.listCa = mapArrayForDropDown(res, "Ten", 'Id')
    });
    // this._services.GetListdmLoaiBong(data).subscribe((res: any) => {
    //   res.unshift({ Id: '', Ten: 'Tổng hợp' });
    //   this.listLoaiBong = mapArrayForDropDown(res, "Ten", 'Id');
    // })
  }
  xemSanLuong() {
    this.showSanLuong = true;
  }
  checkMatHang(e,item,index){
    console.log(e,item,index);
    this.listMatHang.forEach(mathang => {
      mathang.checked = false
    });
    this.listMatHang[index].checked = true;
    this.dataSet1 = {
      labels: this.listThang.map(ele => ele.label),
      datasets: [
        {
          type: 'line',
          label: item.label,
          borderColor: '#FF0000',
          // borderWidth: 2,
          fill: false,
          data: Array.from({length:12},(v,k)=>item[`T${k+1}`])
          // data: [928, 862, 928, 848,  765, 806, 721, 655, 655, 655, 655, 655],
          // steppedLine: 'before'
        },
        {
          type: 'line',
          label: 'Tiêu chuẩn',
          borderColor: '#0000E5',
          // borderDash: [10, 5],
          // borderWidth: 2,
          fill: false,
          data: Array.from({ length: 12 }, () => item.TC),
        },
      ]
    }
  }
}
