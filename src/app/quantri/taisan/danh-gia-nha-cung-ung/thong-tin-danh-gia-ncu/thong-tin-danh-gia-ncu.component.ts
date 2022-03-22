import { time } from '@amcharts/amcharts4/core';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-thong-tin-danh-gia-ncu',
  templateUrl: './thong-tin-danh-gia-ncu.component.html',
  styleUrls: ['./thong-tin-danh-gia-ncu.component.css']
})
export class ThongTinDanhGiaNcuComponent implements OnInit,AfterViewInit,OnChanges {

  listTieuChi: any = [];
  @Input() phieuDanhGia: any;

  sum: any = 0;

  constructor(
    public toast: ToastrService,
    private taiSanService: TaisanService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngAfterViewInit() {
    this.LoadListTieuChi();
  }

  ngOnInit(): void {
  }

  LoadListTieuChi() {
    let data = {
      CurrentPage: 1,
      TieuChiCha: false,
      Keyword: "",
      GhiChu: "",
    }
    this.taiSanService.TieuChiDanhGia().GetList(data).subscribe((res: any) => {
      this.listTieuChi = res.Data.Items;
      this.listTieuChi= this.recursive(this.listTieuChi)
      this.SumDiemDanhGia();
      console.log('list tieu chi' ,this.listTieuChi);
    })
  }

  recursive(list: Array<any>) {
    return list.map(ele => {
      let realPoint = this.phieuDanhGia?.find(tieuchi => ele.Id === tieuchi.IddmTieuChiDanhGia)?.Diem
      return {
        ...ele,
        DiemDanhGia: realPoint || null,
        listItem: validVariable(ele.listItem) ? this.recursive(ele.listItem) : []
      }
    })
  }

  RecursiveSave() {
    this.listTieuChi.map(tieuchi => {

    })
  }

  SumDiemDanhGia() {
    this.listTieuChi.forEach((item) => {
      if (item.listItem.length) {
        item.toggle = true;
      } else {
        item.toggle = false;
      }
      item.sum = item.listItem.reduce((number, nextChild) => {
        return number + (nextChild.DiemDanhGia || 0);
      }, 0)
    })
    this.sum = this.listTieuChi.reduce((number, item) => {
      return number + item.sum;
    }, 0)
  }

}