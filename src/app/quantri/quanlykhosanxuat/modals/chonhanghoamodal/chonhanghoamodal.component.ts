import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chonhanghoamodal',
  templateUrl: './chonhanghoamodal.component.html',
  styleUrls: ['./chonhanghoamodal.component.css']
})
export class ChonhanghoamodalComponent implements OnInit {
  items:any=[

  ];
  filter:any={};
  constructor() { }

  ngOnInit(): void {
    this.items =[
      {Ma:'Ne 36 TCM 65/35',Ten:'Ne 36 TCM 65/36',GhiChu:'Xuất khẩu  HD 6063	'},
      {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/35',GhiChu:'Nội địa - đóng tải trắng, giao hàng từ 4/11	'},
      {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/35',GhiChu:'Nội địa  đóng tải xanh - Đông Xuân 	'},
      {Ma:'Ne 30 TCM 65/35',Ten:'Ne 30 TCM 65/36',GhiChu:'Xuất khẩu HD 6078	'},
      {Ma:'Ne 45 TCM 65/35 DK ',Ten:'Ne 45 TCM 65/35 DK ',GhiChu:'Xuất khẩu  (đã ký HD)	'},
      {Ma:'Ne 40 TCM 65/35',Ten:'Ne 40 TCM 65/36',GhiChu:'Xuất khẩu ( Đã ký HĐ)	'},
      {Ma:'Ne 40 CVCM 50/50',Ten:'Ne 40 CVCM 50/51',GhiChu:'Xuất khẩu  HD 6069 (KH 2 cont giao tháng 11 + 2 cont giao tháng 12) dự kiến 16 tấn sx trong T10  	'},
      {Ma:'Ne 45 CVCM 60/40',Ten:'Ne 45 CVCM 60/41',GhiChu:'Giao hàng tháng 11 ( đã ký HD)	'},
      {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/41',GhiChu:'Xuất khẩu HD 6076 10 cont (5 cont giao tháng 11+ 5 cont giao tháng 12)	'},
      {Ma:'Ne 30 CVCM 60/40',Ten:'Ne 30 CVCM 60/41',GhiChu:'Xuất khẩu 6084(HĐ 10 cont 2 cont giao tháng 11 + 5 cont giao tháng 12+ 3 cont giao tháng 1)	'},
      {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/40',GhiChu:'Nội địa - đóng tải trắng (đóng đủ theo TBSX 20 tấn) 	'},
      {Ma:'Ne 40 CVCM 60/40',Ten:'Ne 40 CVCM 60/40',GhiChu:'Nội địa - Xuất công ty Bốn mùa	'},
      {Ma:'Sợi 24 TCD 65/35',Ten:'Sợi 24 TCD 65/36',GhiChu:'Xuất khẩu HD 6083	'},
      {Ma:'Sợi 30 TCD 65/35',Ten:'Sợi 30 TCD 65/36',GhiChu:'Xuất khẩu HD 6083	'},
    ]
  }

}
