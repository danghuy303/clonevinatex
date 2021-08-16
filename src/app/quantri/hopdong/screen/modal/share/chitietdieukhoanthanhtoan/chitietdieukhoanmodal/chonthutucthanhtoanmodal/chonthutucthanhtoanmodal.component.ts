import { validVariable } from 'src/app/services/globalfunction';


import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-chonthutucthanhtoanmodal',
  templateUrl: './chonthutucthanhtoanmodal.component.html',
  styleUrls: ['./chonthutucthanhtoanmodal.component.css']
})
export class ChonthutucthanhtoanmodalComponent implements OnInit {
  listThuTucThanhToan_ref: any = [];
  item: any = {};
  listThanhToanThuTuc: any = [];
  cols: any = [
    {
      header: 'Mã thủ tục',
      field: 'ma',
      width: 'unset'
    },
    {
      header: 'Tên  thủ tục',
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
  ) { }

  ngOnInit(): void {
    console.log(this.listThanhToanThuTuc.length);
    
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listThanhToanThuTuc.length;
    // if(this.listThuTucThanhToan_ref != undefined && this.listThuTucThanhToan_ref!= null)
    // {
    //   for(let i = 0; i < this.listThuTucThanhToan_ref.length; i++){
    //     console.log(this.listThuTucThanhToan_ref[i])
    //     let itemFind = this.listThanhToanThuTuc.find(
        
          
    //       ele =>ele.id === this.listThuTucThanhToan_ref[i].id)
          
      
    //     if(validVariable(itemFind)){
    //       itemFind.checked = true;
    //     }
    //   }
    // }
    this.item.listThuTucThanhToan_ref = this.listThanhToanThuTuc.slice(0,15);
    this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
  }
  checkAll(e) {
    if (e.checked) {
      this.listThanhToanThuTuc.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listThanhToanThuTuc.forEach(item => {
        item.checked = false;
      });
    }
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
    let itemFind: any = this.listThanhToanThuTuc.filter(function (obj) {
      return obj.checked == true;
    });
    console.log(itemFind);
    this.activeModal.close(
      { data: itemFind.map(ele=>{
        return {
          ...ele,
          Ten:`${ele.TenLoHang} - ${ele.ten}`
        }
      }) }
    );
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = this.listThanhToanThuTuc;
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
}
