import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SanXuatService } from 'src/app/services/callApiSanXuat';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { handleHTTPResponse } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-danh-muc-ke-hoach-kinh-doanh',
  templateUrl: './danh-muc-ke-hoach-kinh-doanh.component.html',
  styleUrls: ['./danh-muc-ke-hoach-kinh-doanh.component.css']
})
export class DanhMucKeHoachKinhDoanhComponent implements OnInit, OnChanges {

  @Input() cols: any[];
  @Input() title: any;
  @Input() danhMucName: any;
  @Input() modalName: any;
  listDanhMuc: any = [];
  checkedAll: boolean = false;
  paging: any = {};
  first: number = 0;

  constructor(
    private sanxuatService: SanXuatService,
    public modal: NgbModal,
    public toast: ToastrService, 
    private confirmService: ConfirmationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log("cols", this.cols);
    this.ResetData();
  }

  ngOnInit(): void {
  }    

  ResetData() {
    this.LoadData(true);
  }
  
  LoadData(reset?: boolean) {
    if (reset) {
      this.checkedAll = false;
    }
    let data = {
      currentPage: 1,
      pageSize: 20
    }
    this.sanxuatService[this.danhMucName]()
      .GetList(data.currentPage, data.pageSize)
      .subscribe((res: any) => {
        this.listDanhMuc = res.Data.Items;
        this.paging.totalCount = res.Data.TotalCount;
    })
  }

  add() {
    let modalRef = this.modal.open(this.modalName, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.opt = 'add';
    modalRef.result
      .then((res: any) => {
        this.ResetData();
      })
      .catch()
      .finally()
  }

  update(item) {
    let modalRef = this.modal.open(this.modalName, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.danhMuc = {...item};
    modalRef.componentInstance.opt = 'edit';
    modalRef.result
      .then((res: any) => {
        this.ResetData();
      })
      .catch()
      .finally(() => {
      })
  }

  checkAll(e) {
    this.listDanhMuc.forEach((item) => {
      item.checked = e.checked;
    })
  }

  check() {
    this.checkedAll = this.listDanhMuc.every((item) => item.checked);
  }

  deleteList() {
    let listId = [];
    this.listDanhMuc.forEach(ele => {
      if (ele.checked) {
        listId.push(ele.Id);
      }
    })
    if (listId.length > 0) {
      this.confirmService.show({
        message: 'Bạn chắc chắn muốn xóa các danh mục đã chọn?'
      }, () => {
        this.sanxuatService.KeHoachSanXuat(this.danhMucName).DeleleList(listId).subscribe((res: any) => {
          handleHTTPResponse(res, this.toast, () => {
            this.ResetData();
          });
        })
      })
    } else {
      this.toast.error('Bạn chưa chọn danh mục nào!')
    }
  }

  changePage(event: any) {
    this.first = event.first;
    this.paging.currentPage = event.page + 1;
    this.LoadData(false);
  }
}
