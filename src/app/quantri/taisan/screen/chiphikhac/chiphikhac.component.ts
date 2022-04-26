import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-chiphikhac',
  templateUrl: './chiphikhac.component.html',
  styleUrls: ['./chiphikhac.component.css']
})
export class ChiphikhacComponent implements OnInit, OnChanges {

  @Input() items: any = [];
  tongChiPhi: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log("this.items", this.items);
    
  }

  ngOnInit(): void {
    this.Count();
  }
  
  Count() {
    this.items.forEach(ele => {
      ele.GiaTri = ele.listChiPhiKhac.reduce((sum, obj) => {
        return sum + obj.GiaTri;
      },0)
    })
    this.tongChiPhi = this.items.reduce((sum, ele) => {
      return sum + ele.GiaTri
    },0)
  }

  AddChiPhi(taisan) {
    let newChiPhi = {
      Id: "",
      IdTaiSan: taisan.IdTaiSan,
      IdTaiSanChiPhi: taisan.IdTaiSanChiPhi || "",
      TenChiPhi: "Chi phí phát sinh",
      GiaTri: 0,
      GhiChu: "",
      GiatriKeHoach: 0,
    };
    taisan.listChiPhiKhac.push(newChiPhi);
  }

  DeleteChiPhi(item, index) {
    item.listChiPhiKhac.splice(index, 1)
  }
}

