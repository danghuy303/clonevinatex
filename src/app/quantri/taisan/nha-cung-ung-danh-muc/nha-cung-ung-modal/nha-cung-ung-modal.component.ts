import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { mapArrayForDropDown, validVariable, DateToUnix, DateToDatePicker, UnixToDate, deepCopy } from 'src/app/services/globalfunction';
import { ThongTinHangHoaModalComponent } from '../thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';

@Component({
  selector: 'app-nha-cung-ung-modal',
  templateUrl: './nha-cung-ung-modal.component.html',
  styleUrls: ['./nha-cung-ung-modal.component.css']
})
export class NhaCungUngModalComponent implements OnInit {

  item: any = {};
  title: string = "";
  listNhomCungUng: any = [];
  listHangHoa: any[];
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
    this.GetNhaCungUng();
    // this.LoadListHangHoa(true);
  }

  GetNhaCungUng() {
    if (this.item.Id) {
      this.taiSanService.NhaCungUng().Get(this.item.Id).subscribe((res: any)=>{
        this.item = res.Data;
        this.listHangHoa = res.Data.listItem;
        this.pageHangHoa.totalCount = this.listHangHoa.length;
      })
    }
  }

  SetNhaCungUng() {
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

}
