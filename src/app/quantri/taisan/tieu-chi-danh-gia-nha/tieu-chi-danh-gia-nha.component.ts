import { Component, NgModuleRef, OnInit } from '@angular/core';
import { deepCopy, handleHTTPResponse, validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from "src/app/services/Taisan/taisan.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from 'ngx-toastr';
import { UploadmodalComponent } from 'src/app/quantri/modal/uploadmodal/uploadmodal.component';
import { TieuChiDanhGiaModalComponent } from './tieu-chi-danh-gia-modal/tieu-chi-danh-gia-modal.component';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-tieu-chi-danh-gia-nha',
  templateUrl: './tieu-chi-danh-gia-nha.component.html',
  styleUrls: ['./tieu-chi-danh-gia-nha.component.css']
})
export class TieuChiDanhGiaNhaComponent implements OnInit {

  filter: any = {};
  items: any[] = [];
  listTreeItems: TreeNode[] = [];
  checkedAll: boolean = false;
  keyword: string = '';
  paging: any = {};
  fileUpload: any;
  index: any;
  selectedNodes: TreeNode[];
  $sub!: Subscription;

  constructor(
    private taiSanService: TaisanService,
    public modal: NgbModal,
    public toast: ToastrService,
    public confirmService: ConfirmationService,
    private store: StoreService
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
          this.ngOnInit()
      }
  })
   }

  ngOnInit(): void {
    this.ResetListTieuChi();
  }

  ResetListTieuChi() {
    this.filter = {};
    this.LoadListTieuChi(true);
  }

  LoadListTieuChi(reset?) {
    if (reset===true) {
      this.paging.currentPage = 1;
    }
    this.checkedAll = false;
    let data = {
      PageSize: 20,
      CurrentPage: this.paging.currentPage,
      TieuChiCha: false,
      Keyword: this.filter.keyword,
      GhiChu: "",
    }
    this.taiSanService.TieuChiDanhGia().GetList(data).subscribe((res:any) => {
      let responseData = res.Data.Items
      this.items = this.DataToTree(responseData)
      this.paging.totalCount = res.Data.TotalCount;
    })
  }

  DataToTree(list) {
    return list.map((item,index)=> {
      item.STT = index + 1;
      item.checked = false;
      return ({
          data: item,
          children: item.listItem.map((child,childIndex)=>{
            child.STT = `${item.STT}.${childIndex + 1}`;
            child.checked = false;
            return ({
              data: child,
            })
          }),
          expanded: true,
      })
    })
  }

  TreeToData(list) {
    let newArr = [];
    list.forEach((ele)=>{
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr,...this.TreeToData(ele.children)];
      }
    })
    newArr.forEach(ele => {
      ele.children = [];
    })
    return newArr;
  }

  AddTieuChi() {
    let modalRef = this.modal.open(TieuChiDanhGiaModalComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'add';
    modalRef.componentInstance.item = {
      Id: "",
      Ma: "",
      Ten: "",
      DiemToiDa: 0,
      ThuTu: 0,
      NoiDung: "",
      GhiChu: "",
      HoatDong: true,
    }
    modalRef.result
      .then((res: any) => {})
      .catch(er => {})
      .finally(() =>{
        this.LoadListTieuChi()
      })
  }

  UpdateTieuChi(id) {
    let modalRef = this.modal.open(TieuChiDanhGiaModalComponent, {
      size: 'lg',
      backdrop: 'static',
    })
    modalRef.componentInstance.opt = 'update';
    modalRef.componentInstance.item.Id = id;
    modalRef.result
      .then((res: any) => {
      })
      .catch(er => {
      })
      .finally(() =>{
        this.LoadListTieuChi()
      })
  }

  DeleteListTieuChi() {
    let arr = [];
    this.items.forEach((item) => {
      if (item.data.checked) {
        arr.push(item.data.Id)
      }    
      item.children?.forEach((child) => {
        if (child.data.checked) {
          arr.push(child.data.Id)
        }
      })
    })
    if (arr.length > 0) {
      this.confirmService.show({
        message: 'Bạn chắc chắn muốn xóa các tiêu chí này?'
      }, () => {
        this.taiSanService.TieuChiDanhGia().Delete(arr).subscribe((res: any) => {
            this.LoadListTieuChi();
        })
      })
    } else {
      this.toast.error('Vui lòng chọn tiêu chí!')
    }
  }

  CheckAll(item) {
    item.listItem && item.listItem.forEach(ele => {
      ele.checked = item.checked
    })
  }

  ExportTieuChi() {
    let data = {
      CurrentPage: this.paging.currentPage,
      PageSize: 20,
      HoatDong: 0,
      Ma: "",
      Ten: "",
      Keyword: this.filter.keyword,
      GhiChu: ""
    }
    this.taiSanService.TieuChiDanhGia().Export(data).subscribe((res: any) => {
      // window.open('http://103.130.212.45:2269' + res.Data)
      this.taiSanService.TieuChiDanhGia().download(res.Data)
    });
  }

  ImportTieuChi() {
    let modalRef = this.modal.open(UploadmodalComponent, {
      size: 'md',
      backdrop: 'static',
    })
    modalRef.componentInstance.single = true;
    modalRef.componentInstance.onlyExcel = true;
    modalRef.result
      .then((res: any) => {
        this.fileUpload = res;
        console.log(this.fileUpload[0].Name);
        this.taiSanService.TieuChiDanhGia().Import(this.fileUpload[0]).subscribe((res: any)=>{
          handleHTTPResponse(res, this.toast, () => {}, () => {})
          this.ResetListTieuChi();
        })
      })
      .catch(er => {})
      .finally(()=> {
      })
  } 

  changePage(event) {
    this.paging.currentPage = event.page + 1;
    this.LoadListTieuChi();
  }

}
