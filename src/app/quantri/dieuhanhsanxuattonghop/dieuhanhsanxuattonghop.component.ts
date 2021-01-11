import { Component, OnInit } from '@angular/core';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { mapArrayForDropDown } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-dieuhanhsanxuattonghop',
  templateUrl: './dieuhanhsanxuattonghop.component.html',
  styleUrls: ['./dieuhanhsanxuattonghop.component.css']
})
export class DieuhanhsanxuattonghopComponent implements OnInit {
  filter:any={

  }
  listNhaMay:any=[];
  listPhanXuong:any=[];
  listCa:any=[];
  listThang:any=[];
  listNgay: any=[];
  thongKes:any=[];
  thongKes1:any=[];
  Nams:any=[];
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
  dataPie: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };
  constructor(private _services:SanXuatService) { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.Nams.push({ label: (new Date()).getFullYear() - i });
    }
    for (let i = 1; i <=12; i++) {
      this.listThang.push({ label: `Tháng ${i}` });
    }
    for (let i = 1; i <=31; i++) {
      this.listNgay.push({ label: `${i}` });
    }
    this.thongKes = [
      {Ten:'Sản lượng ống',TieuHao:14530,DonVi:'quả',ManHinh:''},
      {Ten:'Lũy kế',TieuHao:28900,DonVi:'quả',ManHinh:''},
      {Ten:'Điện AC',TieuHao:14530,DonVi:'KW',ManHinh:''},
      {Ten:'Tổng điện',TieuHao:14530,DonVi:'KW',ManHinh:''},
      {Ten:'Điện AC',TieuHao:14530,DonVi:'%',ManHinh:''},
    ]
    this.thongKes1 = [
      {Ten:'Ne BQ:',GiaTri:''},
      {Ten:'Sản lượng quy Ne 30:',GiaTri:''},
      {Ten:'Lũy kế quy Ne 30',GiaTri:''},
      {Ten:'Sản lượng quy Ne 30:',GiaTri:''},
      {Ten:'Sản lượng quy Ne 30:',GiaTri:''},
      {Ten:'LK % hoàn thành KHSX:',GiaTri:''},
    ]
    this.dataPie = {
      labels: ['Ne 16 CD', 'Ne 20 CD', 'Ne 32 CD', 'Ne 31 CD'],
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
}
