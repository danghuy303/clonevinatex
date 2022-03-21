import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { ThongTinHangHoaModalComponent } from 'src/app/quantri/taisan/nha-cung-ung-danh-muc/thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';

@Component({
  selector: 'app-sua-nha-cung-ung-modal',
  templateUrl: './sua-nha-cung-ung-modal.component.html',
  styleUrls: ['./sua-nha-cung-ung-modal.component.css']
})
export class SuaNhaCungUngModalComponent implements OnInit {

  item: any = {};
  title: string = "";
  listNhomCungUng: any = [];
  listHangHoa: any[]=[];
  filterHangHoa: any = {};
  pageHangHoa: any = {};
  checkedAll: boolean = false;
  fileUploadHangHoa: any;

  constructor(
    private taiSanService: TaisanService,
    public activeModal: NgbActiveModal,
    public modal: NgbModal,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetdmNhaCungUng();
    this.GetListdmNhomCungUng();
    this.ResetListHangHoa();
    this.SumDiemDanhGia();
    // this.SumAll();
  }
  // SumAll(){
  //   console.log(this.listDanhGia)
  //   this.listDanhGia.forEach(cha=>{
  //     if(validVariable(cha.children)){
  //       cha.sum = cha.children.reduce((Tong,ele)=>{
  //       return Tong + ele.now;
  //     },0)
  //     } else {
  //       cha.sum = cha.max;
  //     }
  //     console.log(cha.sum);
  //   })
  // }

  // =========================================================================
  // Thông tin chung
  // =========================================================================

  GetListdmNhomCungUng() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: "",  
      GhiChu: "",
    }
    this.taiSanService.NhomNhaCungUng().GetListdmNhomNhaCungung(data).subscribe((res: any) => {
      this.listNhomCungUng = mapArrayForDropDown(res.Data, 'Ten', 'Id');
    })
  }

  GetdmNhaCungUng() {
    if (this.item.Id) {
      this.taiSanService.NhaCungUng().Get(this.item.Id).subscribe((res: any)=>{
        this.item = res.Data;
      })
    }
  }

  AddNhaCungUng() {
    if (this.Validate()) {
      this.taiSanService.NhaCungUng().Set(this.item).subscribe((res: any) => {
        if (res.StatusCode === 200) {
          this.toast.success(res.Message);
          this.activeModal.close();
        } else {
          this.toast.error(res.Message);
        }
      })
    }
  }

  Validate() {
    if (!validVariable(this.item.Ma)) {
      this.toast.error("Yêu cầu nhập đầy đủ trường bắt buộc");
      return false;
    }
    return true;
  }

  // =========================================================================
  // Thông tin hàng hóa
  // =========================================================================

  ResetListHangHoa() {
    this.LoadListHangHoa(true);
  }

  LoadListHangHoa(reset?) {
    if (reset)  {
      this.pageHangHoa.currentPage = 1;
    }
    // let data = {
    //   CurrentPage: 1,
    //   PageSize: 20,
    //   Keyword: "",
    // }
    // this.taiSanService.NhaCungUng().GetListItem(data).subscribe((res:any)=>{
    //   this.listHangHoa = res.Data.Items;
    //   this.pageHangHoa.totalCount = res.Data.TotalCount;
    // })
    this.pageHangHoa.totalCount = this.listHangHoa.length;
    this.checkedAll = false;
  }

  AddHangHoa() {
    let modalRef = this.modal.open(ThongTinHangHoaModalComponent, {
      size: "xl",
      backdrop: "static",
    })
    modalRef.componentInstance.selectedList = [];
    modalRef.result
      .then((res: any) => {
        this.listHangHoa = res;
        this.LoadListHangHoa();
        this.listHangHoa.forEach(item => item.checked=false);
      })
      .catch(er => {});
  }

  DeleteListHangHoa() {
    // let listFilter = this.listHangHoa.filter(item => {
    //   return item.checked === true;
    // })
    // let listId = [];
    // listId = listFilter.reduce((a,b)=>{
    //   return a.concat(b.Id);
    // }, [])
    // this.taiSanService.NhaCungUng().DeleteList(listId).subscribe((res: any) => {
    //     this.ResetListHangHoa();
    // })
    this.listHangHoa = this.listHangHoa.filter(item => {
      return !item.checked === true
    })
    this.LoadListHangHoa();
  }

  ExportListHangHoa() {
    let data = {
      CurrentPage: 0,
      PageSize: 20,
      Ma: "",
      Ten: "",
      Keyword: this.filterHangHoa.keyword,
      GhiChu: "",
    }
    this.taiSanService.NhaCungUng().ExportItem(data).subscribe((res: any)=>{
      window.open(res.Data);
    })
  }

  ImportListHangHoa() {
    let modalRef = this.modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.result
      .then((res: any)=>{
        this.fileUploadHangHoa = res;
        this.taiSanService.NhaCungUng().Import(this.fileUploadHangHoa[0]).subscribe(()=>{
          this.ResetListHangHoa();
        })
      })
      .catch(er=>{})
      .finally()

  }

  CheckAllHangHoa() {
    if (this.checkedAll) {
      this.listHangHoa.forEach(item => {
        item.checked = true;
      })
    } else {
      this.listHangHoa.forEach(item => {
        item.checked = false;
      })
    }
  }

  SearchHangHoa() {
    this.listHangHoa = this.listHangHoa.filter(item => {
      if (
        item.Ma.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase()) ||
        item.Ten.toLowerCase().includes(this.filterHangHoa.keyword.toLowerCase())
      ) {
        // console.log(true);
        return item;
      } else {
        // console.log(false);
      }
    })
    if (this.filterHangHoa.keyword === '') {
      this.ResetListHangHoa();
    }
  }

  changePage(event) {
    this.pageHangHoa.currentPage = event + 1;
    this.LoadListHangHoa(false);
  }

  // =========================================================================
  // Thông tin đánh giá
  // =========================================================================

  listDanhGia: any[] = [
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

  SumDiemDanhGia(item?) {
    this.listDanhGia.forEach(cha=>{
      if(cha.children !== undefined){
        cha.sum = cha.children.reduce((Tong,ele)=>{
        return Tong + ele.now;
      },0)
      } else {
        cha.sum = cha.max;
      }
    })
  }

}