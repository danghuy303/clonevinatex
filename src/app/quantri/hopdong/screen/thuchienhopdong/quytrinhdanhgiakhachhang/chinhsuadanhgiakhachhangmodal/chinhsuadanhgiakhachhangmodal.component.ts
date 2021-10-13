import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TreeNode } from 'primeng/api';
import { deepCopy, validVariable } from 'src/app/services/globalfunction';

@Component({
  selector: 'app-chinhsuadanhgiakhachhangmodal',
  templateUrl: './chinhsuadanhgiakhachhangmodal.component.html',
  styleUrls: ['./chinhsuadanhgiakhachhangmodal.component.css']
})
export class ChinhsuadanhgiakhachhangmodalComponent implements OnInit {
  item: any = {};
  items: any = [];
  listHangHoa: any = [];
  listHangHoaGoc: any = [];
  IdQuyTrinh : any = '';
  Loai : any = 0;
  cols: any = [
    {
      header: 'Mã khách hàng',
      field: 'Ma',
      width: 'unset'
    },
    {
      header: 'Tên khách hàng',
      field: 'Ten',
      width: 'unset'
    },
    {
      header: 'Số điện thoại',
      field: 'SoDienThoai',
      width: 'unset'
    },
    {
      header: 'Địa chỉ',
      field: 'DiaChi',
      width: 'unset'
    },
    {
      header: 'Ghi chú',
      field: 'GhiChu',
      width: 'unset'
    },
  ];
  loai='';
  checkedAll: boolean = false;
  paging: any = {};
  vungs: TreeNode[] = [];
  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    if(!validVariable(this.item.listTieuChiDanhGia))
      this.item.listTieuChiDanhGia = [];
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.items.length;
  }
  checkAll(e) {
    this.items.forEach(item => {
      item.checked = e.checked;
      this.checkItem(item)
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
    this.activeModal.close(this.listHangHoa)
  }
  filtertable_add() {
    if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
      this.item.listThuTucThanhToan_ref_copy = deepCopy(this.items);
      let filter: any = this.item.listThuTucThanhToan_ref_copy.filter(
        ele=>ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || ele.Ma.toLowerCase().includes(this.KeyWord.toLowerCase())
      );
      console.log(filter)
      this.item.listThuTucThanhToan_ref = filter;
      this.item.listThuTucThanhToan_ref_copy = filter;
    }
    else {
      this.item.listThuTucThanhToan_ref = this.items;
      this.item.listThuTucThanhToan_ref_copy = this.items;
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
  
checkItem(item){
if(item.checked == true)
{
  let itemFind: any = this.listHangHoa.filter((e: any) =>e.iddmItem === item.Id)[0]
  if(itemFind === undefined){
    let itemFinds = this.items.find(e => e.checked === true && e.Id === item.Id);
    itemFinds = {
      iddmKhachHang: itemFinds.Id,
      ten: itemFinds.Ten,
      ma: itemFinds.Ma,
      isXoa: false,
      id: '',
    }
    this.listHangHoa.push(itemFinds)
  }
  else
    itemFind.isXoa = false;
}
  else{
    let itemFind = this.listHangHoa.filter((e: any) =>e.IddmItem === item.id)[0];
    if(itemFind !== undefined){
      itemFind.isXoa = true;
    }
  }
}
Onclose() {
  this.activeModal.close(this.listHangHoaGoc)

}
}
