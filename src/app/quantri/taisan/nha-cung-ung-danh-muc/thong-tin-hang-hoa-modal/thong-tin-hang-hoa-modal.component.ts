import { Component, OnInit } from '@angular/core';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thong-tin-hang-hoa-modal',
  templateUrl: './thong-tin-hang-hoa-modal.component.html',
  styleUrls: ['./thong-tin-hang-hoa-modal.component.css']
})
export class ThongTinHangHoaModalComponent implements OnInit {

  items: any = [];
  checkListItem: any = [];
  checkedAll: boolean = false;
  selectedList: any[] = [];

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.GetListHangHoa();
  }

  GetListHangHoa() {
    let data = {
      CurrentPage: 1,
      PageSize: 20,
      Keyword: "",
    }
    this.taiSanService.NhaCungUng().GetListItem(data).subscribe((res: any)=>{
      this.items = res.Data.Items;
      this.CheckExistedHangHoa();
    })
  }

  SelectHangHoa() {
    let newArr = this.checkListItem.map(item=>item.MadmItem);
    this.selectedList = this.items.filter(item=>{
      return newArr.indexOf(item.Ma) == -1 && item.checked === true;
    })
    .map(item=> {
      return ({
        IddmItem: item.Id,
        TendmItem: item.Ten,
        MadmItem: item.Ma
      })
    })
    this.activeModal.close(this.selectedList);
  }

  CheckAllHangHoa() {
    this.items.forEach(item => {
      item.checked = this.checkedAll;
    })
  }

  CheckExistedHangHoa() {
    this.items.forEach(item => {
      this.checkListItem.forEach(checkedItem => {
        if (item.Ma === checkedItem.MadmItem) {
          item.checked = true;
        }
      })
    })
  }

}
