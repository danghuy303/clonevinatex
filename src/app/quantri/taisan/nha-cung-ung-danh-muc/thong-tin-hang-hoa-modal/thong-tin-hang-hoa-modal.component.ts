import { Component, OnInit } from '@angular/core';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thong-tin-hang-hoa-modal',
  templateUrl: './thong-tin-hang-hoa-modal.component.html',
  styleUrls: ['./thong-tin-hang-hoa-modal.component.css']
})
export class ThongTinHangHoaModalComponent implements OnInit {

  items: any = {};
  checkedAll: boolean = false;
  selectedList: any[];

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
      console.log(res);
      this.items = res.Data.Items;
    })
  }

  SelectHangHoa() {
    this.selectedList = this.items.filter(item => {
      return item.checked === true;
    }).map(item=> {
      return ({
        IddmItem: item.Id,
        TendmItem: item.Ten,
        MadmItem: item.Ma
      })
    })
    // console.log(this.selectedList);
    this.activeModal.close(this.selectedList);
  }

  CheckAllHangHoa() {
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
