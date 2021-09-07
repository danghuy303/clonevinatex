import { validVariable } from 'src/app/services/globalfunction';


import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DanhMucHopDongService } from 'src/app/services/Hopdong/danhmuchopdong.service';


@Component({
  selector: 'app-chonthutucthanhtoanmodal',
  templateUrl: './chonthutucthanhtoanmodal.component.html',
  styleUrls: ['./chonthutucthanhtoanmodal.component.css']
})
export class ChonthutucthanhtoanmodalComponent implements OnInit {
  listThuTucThanhToan_ref: any = [];
  item: any = {};
  listThanhToanThuTuc: any = [];
  listDieuKhoanThanhToan: any = [];
  IdQuyTrinh:any="";
  cols: any = [
    {
      header: 'Mã',
      field: 'ma',
      width: 'unset'
    },
    {
      header: 'Tên',
      field: 'ten',
      width: 'unset'
    },
 
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};

  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
    private _servicesdmHopDong: DanhMucHopDongService,
  ) { }

  ngOnInit(): void {
    this._servicesdmHopDong.DanhMucThuTucThanhToan().GetListAll().subscribe((res: any) => {
      this.listDieuKhoanThanhToan = res;     
      this.paging.CurrentPage = 1;
      this.paging.TotalPage = 5;
      this.paging.TotalItem = this.listDieuKhoanThanhToan.length;      
      this.listDieuKhoanThanhToan.forEach(obj => {
        obj.checked = false;
        if (this.listThanhToanThuTuc.length > 0) {
          if (this.listThanhToanThuTuc.some(item => obj.id === item.iddmThanhToanThuTuc && (item.isXoa != true || item.isXoa == undefined))) {
            obj.checked = true;
          }
        }
      });
      if (this.listDieuKhoanThanhToan.every(obj => obj.checked === true)) {
        this.checkedAll = true;
      }    
    });  
  }


  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end =  start + 15;
    if((start + 15) > this.paging.TotalItem)
      end= this.paging.TotalItem;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref_copy.slice(start,end);
  }
  accept() {
    // var itemFind: any = this.listDieuKhoanThanhToan.filter(function (obj) {
    //   return obj.checked == true;
    // });
    // console.log(itemFind);
    this.activeModal.close(this.listDieuKhoanThanhToan.filter(item => item.checked).map(ele => {
      return {
        ...ele,
        idHopDong: this.IdQuyTrinh,
        iddmThanhToanThuTuc: ele.id,
        TendmThanhToanThuTuc: ele.ten,
        isXoa: false,
        id: '',      
      }
    }));
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = this.listDieuKhoanThanhToan;
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.ten.toLowerCase().includes(this.KeyWord.toLowerCase())
        // obj => {
        // if(obj.Ten === "CD 23"){
        //   debugger

        // }
        // let Ten = obj.Ten.toLowerCase();
        // let indexOf = Ten.includes(this.KeyWord.toLowerCase());
        // return indexOf != false
      // }
      );
      console.log(filter)
      this.item.listThuTucThanhToan_ref = filter;
      this.item.listThuTucThanhToan_ref_copy = filter;
    }
    else {
      this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc;
      this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
    }
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.item.listThuTucThanhToan_ref.length;
    this.item.listThuTucThanhToan_ref = this.item.listThuTucThanhToan_ref.slice(0,15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }

  checkAll(e) {
    if (e.checked) {
      this.listDieuKhoanThanhToan.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listDieuKhoanThanhToan.forEach(item => {
        item.checked = false;
      });
    }
  }
  checked() {
    this.checkedAll = this.listDieuKhoanThanhToan.every(ele => ele.checked)
  }
}
