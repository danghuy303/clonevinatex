import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-them-nha-cung-ung-modal',
  templateUrl: './them-nha-cung-ung-modal.component.html',
  styleUrls: ['./them-nha-cung-ung-modal.component.css']
})
export class ThemNhaCungUngModalComponent implements OnInit {

  filter: any = {};
  paging: any = {};
  items: any = [];
  selectedList: any[] = [];
  checkedAll: boolean = false;

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    private taiSanService: TaisanService,
  ) { }

  ngOnInit(): void {
    this.ResetFilter();
  }

  ResetFilter() {
    this.filter = {};
    this.LoadData(true)
  }

  LoadData(reset?) {
    if (reset) {
      this.paging.currentPage = 1;
    }
    this.checkedAll = false;
    let data = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      Keyword: this.filter.keyword,
      HoatDong: 0,
      Ma: "",
      Ten:"",
      GhiChu: ""
    }
    this.taiSanService.NhaCungUng().GetList(data).subscribe((res: any) => {
      this.items = res.Data.Items;
      this.paging.TotalCount = res.Data.TotalCount;
    })
  }

  AddNhaCungUng() {
    this.selectedList = this.items.filter(item => {
      return item.checked === true;
    })
    this.activeModal.close(this.selectedList)
  }

  CheckAllNhaCungUng(e) {
    if (this.checkedAll) {
      this.items.forEach(item => {
        item.checked = true;
      })
    } else {
      this.items.forEach(item => {
        item.checked = false;
      })
    }
  } 

}
