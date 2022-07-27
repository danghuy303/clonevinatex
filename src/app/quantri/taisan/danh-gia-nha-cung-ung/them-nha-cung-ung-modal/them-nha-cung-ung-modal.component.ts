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
  checkListItem: any = [];
  checkedAll: boolean = false;
  listCheck: any = [];

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
    let data = {
      CurrentPage: 0,
      Keyword: this.filter.keyword,
    }
    this.taiSanService.NhaCungUng().GetList(data).subscribe((res: any) => {
      this.items = res.Data;
      // this.pushCheckList();
      console.log(this.listCheck);
      
      this.items.forEach(ele => {
        ele.checked = this.listCheck.includes(ele.Id)
      });
      this.paging.TotalCount = res.Data.TotalCount;
      // this.CheckExistedNhaCungUng();
    })
  }

  // pushCheckList() {
  //   this.items.forEach(ele => {
  //     let index =  this.listCheck.findIndex(item => item.Id === ele.Id);
  //     ele.checked = (index !== -1);
  //   });
  // }

  Filter() {
    let data = this.items.filter(ele => ele.checked)
    .map(ele => {
      return {
        Id: null,
        IddmNhaCungUng: ele.Id,
        TendmNhaCungUng: ele.Ten,
        MadmNhaCungUng: ele.Ma,
        IdTrangThai: ele.IddmTinhTrangNhaCungung,
      }
    })
    return data;
  }

  AddNhaCungUng() {
    this.activeModal.close(this.Filter());
  }

  Check(e, index) {
    this.checkedAll = this.items.every(item => item.checked);
      // if (e.checked === true) {
      //   this.listCheck.push(e)
      // }
      // else {
      //   // Kiểm tra mảng tạm nhớ, nếu đã có, mà ta bỏ check thì xóa ra khỏi mảng
      //       this.listCheck.splice(index,1, undefined)
      // }
  }

  CheckAllNhaCungUng() {
    this.items.forEach(item => {
      item.checked = this.checkedAll;
    })
  }

  ChangePage(event) {
    this.paging.currentPage = event.page + 1;
    this.LoadData(false);
  }

}