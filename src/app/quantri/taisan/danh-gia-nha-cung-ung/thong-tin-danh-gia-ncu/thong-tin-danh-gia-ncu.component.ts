import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thong-tin-danh-gia-ncu',
  templateUrl: './thong-tin-danh-gia-ncu.component.html',
  styleUrls: ['./thong-tin-danh-gia-ncu.component.css']
})
export class ThongTinDanhGiaNcuComponent implements OnInit {

  @Input() items: any;

  constructor() { 
    this.items = [
      {
        name: 'Chứng từ thanh toán - Hóa đơn tài chính',
        max: 10,
        now: 0,
        toggle: true,
        children: [
          {
            name: 'Hóa đơn VAT',
            max: 5,
            now: 0,
          },
          {
            name: 'Hóa đơn trực tiếp',
            max: 4,
            now: 0,
          },
          {
            name: 'Không có hóa đơn',
            max: 1,
            now: 0,
          },
        ]
      },
      {
        name: 'Khả năng cung cấp: Nguồn hàng - Cơ sở vật chất',
        max: 15,
        now: 0,
        toggle: false,
        children: [],
      },
      {
        name: 'Giấy tờ pháp lý',
        max: 10,
        now: 0,
        toggle: true,
        children: [
          {
            name: 'Hóa đơn VAT',
            max: 5,
            now: 5,
          },
          {
            name: 'Hóa đơn trực tiếp',
            max: 5,
            now: 5,
          }
        ]
      },
    ]
  }

  ngOnInit(): void {
    console.log(this.items);
    // this.LoadData();
  }

  // LoadData() {
  //   this.items.forEach((item) =>{
  //     item.sum = item.children.map()
      
  //   })
  // }

  SumDiemDanhGia(item, child) {
    item.sum += child.now
  }

}