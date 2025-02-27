import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { deepCopy, handleHTTPResponse, merge, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';
import { ThongTinHangHoaModalComponent } from '../thong-tin-hang-hoa-modal/thong-tin-hang-hoa-modal.component';
import { DanhsachduanComponent } from '../danhsachduan/danhsachduan.component'

@Component({
  selector: 'app-thong-tin-hang-hoa',
  templateUrl: './thong-tin-hang-hoa.component.html',
  styleUrls: ['./thong-tin-hang-hoa.component.css']
})
export class ThongTinHangHoaComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() item: any = {};
  listItem_copy: any = [];
  filter: any = {};
  paging: any = {};
  keyword: any = '';
  checkedAll: boolean = false;
  fileUpload: any;
  fileUploadHangHoa: any;
  @Input() isDisabled?: boolean = false;
  @Input() listDuAn: any = [];

  constructor(
    public toast: ToastrService,
    public modal: NgbModal,
    public activeModal: NgbActiveModal,
    private taiSanService: TaisanService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item.listItem) {
      this.LoadData(true);
    } else {
      this.item.listItem = [];
    }
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    // console.log(this.isDisabled);
  }
  ngOnInit(): void {
    // console.log(this.isDisabled);
  }

  SearchHangHoa(keyword) {
    this.LoadData(false);
    if ((validVariable(keyword)) && keyword.toString().trim() !== '') {
      this.listItem_copy = this.listItem_copy.filter(ele => {
        return ele.MadmItem.toString().toLowerCase().includes(keyword.toString().trim().toLowerCase())
          || ele.TendmItem.toString().toLowerCase().includes(keyword.toString().trim().toLowerCase());
      })
      this.paging.totalCount = this.listItem_copy.length;
    } else {
      this.LoadData(true)
    }
  }

  LoadData(reset) {
    if (reset) {
      this.filter = {
        keyword: ''
      };
      this.paging = {
        currentPage: 1,
        totalCount: this.item.listItem.length,
      };
    }
    this.listItem_copy = this.item.listItem;
    this.checkedAll = false;
  }

  AddHangHoa() {
    let existedItem = this.item.listItem.map(ele => ele.IddmItem);
    let modalRef = this.modal.open(ThongTinHangHoaModalComponent, {
      size: "xl",
      backdrop: "static",
    })
    modalRef.componentInstance.checkListItem = existedItem || [];
    modalRef.result
      .then((res: any) => {
        this.item.listItem = merge(res, this.item.listItem, 'IddmItem');
        this.LoadData(true);
      })
      .catch(er => { });
  }

  DeleteListHangHoa() {
    this.confirmationService.show({
      message: 'Bạn chắc chắn muốn xóa hàng hóa đã chọn?'
    }, () => {
      this.item.listItem = this.item.listItem.filter(item => {
        return !item.checked === true;
      })
      this.LoadData(true);
    })
  }

  CheckAllHangHoa() {
    this.item.listItem.forEach((obj) => {
      obj.checked = this.checkedAll;
    })
  }

  ExportListHangHoa() {
    let data = {
      IdNhaCungUng: this.item.Id,
    }
    this.taiSanService.NhaCungUng().ExportItem(data).subscribe((res: any) => {
      this.taiSanService.NhaCungUng().download(res.Data);
    })
  }

  ImportListHangHoa() {
    let data = {
      FileName: ""
    }
    let modalRef = this.modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.onlyExcel = true;
    modalRef.result
      .then((res: any) => {
        data.FileName = res[0].Name;
        this.taiSanService.NhaCungUng().ImportItem(data).subscribe((res: any) => {
          handleHTTPResponse(res, this.toast, () => { }, () => { })
          // this.item.listItem = [...this.item.listItem, ...res.Data];
          this.item.listItem = this.mapUnique([...this.item.listItem, ...res.Data]);
          this.LoadData(true);
        })
      })
      .catch(er => { })
      .finally()
  }

  mapUnique(list) {
    let unique = list.reduce((accumulator, current) => {
      if (!accumulator.some((x) => x.MadmItem === current.MadmItem)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    return unique;
  }

  Add(item) {
    let modalRef = this.modal.open(DanhsachduanComponent, {
      size: "xl",
      backdrop: "static",
    })
    modalRef.componentInstance.listDuAn = this.listDuAn;
    modalRef.componentInstance.listDaChon = item.listDuAnUuTien?.length ? item.listDuAnUuTien.map(ele => ele.IdDuAn) : [];
    modalRef.result
      .then((res: any) => {
        item.listDuAnUuTien = res.map(ele => {
          let _newObj = item.listDuAnUuTien?.find(obj => obj.IdDuAn === ele.IdDuAn) || ele;
          return _newObj;
        })
        this.item.listItem = [...this.item.listItem];
      })
      .catch(er => { });
  }

}
