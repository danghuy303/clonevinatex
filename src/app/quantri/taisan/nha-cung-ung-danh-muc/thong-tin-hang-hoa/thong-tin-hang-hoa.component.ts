import { AfterContentInit, AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ThongTinHangHoaModalComponent } from '../thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';

@Component({
  selector: 'app-thong-tin-hang-hoa',
  templateUrl: './thong-tin-hang-hoa.component.html',
  styleUrls: ['./thong-tin-hang-hoa.component.css']
})
export class ThongTinHangHoaComponent implements OnInit, OnChanges {

  @Input() items: any;
  filter: any = {};
  paging: any = {};
  checkedAll: boolean = false;
  fileUpload: any;

  constructor(
    public modal: NgbModal,
    public activeModal: NgbActiveModal,
  ) { }
  
  ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.items);
    
    this.ResetListHangHoa();
  }

  ResetListHangHoa() {
    this.paging.currentPage = 1;
    this.paging.totalCount = this.items.length;
  }

  AddHangHoa() {
    let modalRef = this.modal.open(ThongTinHangHoaModalComponent, {
      size: "xl",
      backdrop: "static",
      })
      modalRef.componentInstance.selectedList = [];
      modalRef.result
      .then((res: any) => {
        this.items = this.items.concat(res)
        console.log(this.items);
      })
      .catch(er => {});
    }

    DeleteListHangHoa() {
      this.items = this.items.filter(item => {
        return !item.checked === true
      })
    }
  
  // ExportListHangHoa() {
  //   let data = {
  //     CurrentPage: 0,
  //     PageSize: 20,
  //     Ma: "",
  //     Ten: "",
  //     Keyword: this.filterHangHoa.keyword,
  //     GhiChu: "",
  //   }
  //   this.taiSanService.NhaCungUng().ExportItem(data).subscribe((res: any)=>{
  //     window.open(res.Data);
  //   })
  // }

  // ImportListHangHoa() {
  //   let modalRef = this.modal.open(UploadmodalComponent, {
  //     size: 'md',
  //     backdrop: 'static',
  //   })
  //   modalRef.result
  //     .then((res: any)=>{
  //       this.fileUploadHangHoa = res;
  //       this.taiSanService.NhaCungUng().Import(this.fileUploadHangHoa[0]).subscribe(()=>{
  //         this.LoadListHangHoa(true);
  //       })
  //     })
  //     .catch(er=>{})
  //     .finally()

  // }

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

  // SearchHangHoa() {
  //   this.listHangHoa = this.listHangHoa.filter(item => {
  //     if (
  //       item.Ma.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase()) ||
  //       item.Ten.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase())
  //     ) {
  //       // console.log(true);
  //       return item;
  //     } else {
  //       // console.log(false);
  //     }
  //   })
  //   if (this.filterHangHoa.keyword === '') {
  //     this.LoadListHangHoa();
  //   }
  // }

  // changePage(event) {
  //   this.pageHangHoa.currentPage = event + 1;
  //   this.LoadListHangHoa(false);
  // }

}
