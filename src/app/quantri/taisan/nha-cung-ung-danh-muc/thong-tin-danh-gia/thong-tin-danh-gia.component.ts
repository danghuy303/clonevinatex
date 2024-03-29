import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-thong-tin-danh-gia',
  templateUrl: './thong-tin-danh-gia.component.html',
  styleUrls: ['./thong-tin-danh-gia.component.css']
})
export class ThongTinDanhGiaComponent implements OnInit, OnChanges {

  @Input() item: any = {};
  paging: any = {};
  filter: any = {};
  listDanhGia: any = [];

  constructor(
    private router: Router,
  ) { 
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.item.listPhieuDanhGia) {
      this.LoadData();
    } else {
      this.item.listPhieuDanhGia = [];
    }
  }
  
  ngOnInit(): void {
  }
  
  LoadData() {
    this.listDanhGia = this.item.listPhieuDanhGia;
    this.filter = {};
    this.paging = {
      currentPage: 0,
      totalCount: this.item.listPhieuDanhGia.length,
    };
  }

  SearchDanhGia(keyword) {
    if ((validVariable(keyword)) && keyword.trim() !== '') {
      this.listDanhGia = this.listDanhGia.filter(ele => {
        return ele.SoQuyTrinh.toLowerCase().includes(keyword)
      })
      this.paging.totalCount = this.listDanhGia.length
    } else {
      this.LoadData();
    }
  }

  SplitPages(arr) {
    const ROWS_PER_PAGES = 20;
    let first = this.paging.currentPage*ROWS_PER_PAGES;
    let last = first + ROWS_PER_PAGES;
    return arr.slice(first, last);
  }

  changePage(e) {
    this.paging.currentPage = e.page;
    this.SplitPages(this.listDanhGia);
  }

  Xem(item:any) {
    this.router.navigate([`/quantri/taisan/danhgianhacungung/${item.IdQuyTrinhDanhGia || 0}`]);
  }

}
