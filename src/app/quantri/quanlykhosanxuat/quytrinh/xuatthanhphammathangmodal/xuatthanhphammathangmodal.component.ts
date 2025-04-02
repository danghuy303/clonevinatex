import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UnixToDate } from '../../../../services/globalfunction';

@Component({
  selector: 'app-xuatthanhphammathangmodal',
  templateUrl: './xuatthanhphammathangmodal.component.html',
  styleUrls: ['./xuatthanhphammathangmodal.component.css']
})
export class XuatthanhphammathangmodalComponent implements OnInit {

  listMatHang: any = [];
  listRoot: any = [];
  listItem: any = [];
  cols: any = [
    {
      header: 'Tên',
      field: 'Ten',
      width: '15rem'
    },
    {
      header: 'Mã',
      field: 'Ma',
      width: '15rem'
    },
    {
      header: 'Tên lô',
      field: 'TenLoHang',
      width: 'unset'
    },
    {
      header: 'Ngày chứng từ',
      field: 'NgayNhapKho',
      width: 'unset'
    },
    {
      header: 'Quy cách đóng gói',
      field: 'TendmQuyCachDongGoi',
      width: 'unset'
    },
    {
      header: 'Số quả sợi',
      field: 'SoLuong',
      width: 'unset'
    },
    {
      header: 'Khối lượng /quả sợi (kg)',
      field: 'TrongLuong',
      width: 'unset'
    },
    {
      header: 'Trọng lượng chênh lệch',
      field: 'TrongLuongChenhLech',
      width: 'unset'
    },
  ];
  loai = '';
  checkedAll: boolean = false;
  paging: any = {};
  item: any = {};
  KeyWord: any = '';
  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    console.log(this.listItem)
    // if (this.listItem != undefined && this.listItem != null && this.listItem.length > 0) {
    //   for (let i = 0; i < this.listItem.length; i++) {
    //     let itemFind = this.listMatHang.find(
    //       ele => (ele.IddmItem === this.listItem[i].IddmItem && ele.IdLoHang == this.listItem[i].IdLoHang && ele.IddmQuyCachDongGoi == this.listItem[i].IddmQuyCachDongGoi && ele.IdNhapKho == this.listItem[i].IdNhapKho)
    //     );
    //     if (itemFind !== undefined)
    //       itemFind.checked = true;
    //   }
    // }

    if (this.listItem != undefined && this.listItem != null && this.listItem.length > 0) {
      this.listMatHang = this.listMatHang?.map((x: any) => {
        let itemFind = this.listItem.find(
          ele => (ele.IddmItem === x.IddmItem && ele.IdLoHang == x.IdLoHang && ele.IddmQuyCachDongGoi == x.IddmQuyCachDongGoi && ele.IdNhapKhoGoc == x.IdNhapKhoGoc)
        );
        return {
          ...x,
          checked: itemFind ? true : false
        }
      })
    }
    let _listIdLoHang = [...new Set(this.listMatHang.map((x: any) => x.Ma))]
    let results = [];
    _listIdLoHang.forEach((x: any) => {
      let _arr = this.listMatHang.filter((y: any) => y.Ma === x);

      let newObj = {
        isParent: true,
        expanded: false,
        Ma: x,
        Ten: _arr[0].Ten,
        // TenLoHang: _arr[0].TenLoHang,
        // IdLoHang: _arr[0].IdLoHang,
        SoLuong: _arr.map((y: any) => y.SoLuong).reduce((cur: any, next: any) => cur + next, 0),
        // TrongLuong: _arr.map((y: any) => y.TrongLuong).reduce((cur, next) => cur + next, 0),
        checked: _arr.filter((x: any) => x.checked).length === _arr.length,
        listChild: _arr
      }
      results.push(newObj);
    })
    this.item.listItem = results;
    this.listRoot = results;
    this.item.listItem_copy = this.listMatHang;
  }

  handleExpand(data: any) {
    data.expanded = true;
    let newArr = []
    this.listRoot.forEach((x: any) => {
      let _listChild = x.listChild.sort((a: any, b: any) => a.NgayNhapKho < b.NgayNhapKho ? -1 : 1);
      if (this.KeyWord) {
        _listChild = _listChild.filter((y: any) => y.Ten.toLowerCase().trim().includes(this.KeyWord.toLowerCase().trim()))
      }
      if (x.Ma === data.Ma || x.expanded) {
        if (_listChild.length > 0) {
          _listChild = [x, ..._listChild]
        }
        newArr = [...newArr, ..._listChild];
      } else {
        if (_listChild.length)
          newArr.push(x)
      }
    })
    this.item.listItem = newArr
  }
  handleCollapse(data: any) {
    data.expanded = false;
    let newArr = []
    this.listRoot.forEach((x: any) => {
      let _listChild = x.listChild.sort((a: any, b: any) => a.NgayNhapKho < b.NgayNhapKho ? -1 : 1);
      if (this.KeyWord) {
        _listChild = _listChild.filter((y: any) => y.Ten.toLowerCase().trim().includes(this.KeyWord.toLowerCase().trim()))
      }
      if (x.expanded) {
        if (_listChild.length > 0) {
          _listChild = [x, ..._listChild]
        }
        newArr = [...newArr, ..._listChild];
      } else {
        if (_listChild.length)
          newArr.push(x)
      }
    })
    this.item.listItem = newArr
  }

  handleParentCheck(item: any, checked: any) {
    let _parent = this.item.listItem.find((x: any) => x.Ma === item.Ma && x.isParent);
    if (!checked) {
      if (_parent) {
        _parent.checked = false
      }
    } else {
      let _listChild = _parent.listChild;
      let _lengthChild = _listChild.filter((x: any) => x.checked).length + 1;
      if (_listChild.length === _lengthChild) {
        if (_parent) {
          _parent.checked = true
        }
      }
    }
  }

  handleSelectAll(item: any) {
    item.listChild = item.listChild.map((x: any) => {
      x.checked = !item.checked;
      return x;
    })
  }

  firstInitial() {
    // onInit old
    this.paging.CurrentPage = 1;
    this.paging.TotalPage = 5;
    this.paging.TotalItem = this.listMatHang.length;
    console.log(this.listItem)
    if (this.listItem != undefined && this.listItem != null && this.listItem.length > 0) {
      for (let i = 0; i < this.listItem.length; i++) {
        let itemFind = this.listMatHang.find(
          ele => (ele.IddmItem === this.listItem[i].IddmItem && ele.IdLoHang == this.listItem[i].IdLoHang && ele.IddmQuyCachDongGoi == this.listItem[i].IddmQuyCachDongGoi)
        );
        if (itemFind !== undefined)
          itemFind.checked = true;
      }
    }
    this.item.listItem = this.listMatHang.sort((a: any, b: any) => a.IdLoHang - b.IdLoHang).slice(0, 15);
    this.item.listItem_copy = this.listMatHang;
  }

  accept() {
    // var itemFind: any = this.listMatHang.filter(function (obj) {
    //   return obj.checked == true;
    // });
    // console.log(itemFind);
    // this.activeModal.close(
    //   { data: itemFind }
    // );
    let _newArr: any = [];
    this.item.listItem?.forEach((ele: any) => {
      ele?.listChild?.forEach((x: any) => {
        _newArr.push(x);
      })
    });
    this.activeModal.close(_newArr.filter((x: any) => x.checked)?.map((element: any) => {
      return {
        Ten: element.Ten,
        IddmItem: element.IddmItem,
        TenLoHang: element.TenLoHang,
        TonSoLuong: element.SoLuong,
        KhoiLuong: element.TrongLuong,
        IdLoHang: element.IdLoHang,
        IdNhapKho: element.IdNhapKho,
        IdNhapKhoGoc: element.IdNhapKhoGoc,
        IddmQuyCachDongGoi: element.IddmQuyCachDongGoi,
        TendmQuyCachDongGoi: element.TendmQuyCachDongGoi,
        NgayNhapKho: UnixToDate(element.NgayNhapKhoUnix),
        NgaySanXuat: UnixToDate(element.NgaySanXuatUnix)
      }
    }));
  }
  checkAll(e) {
    if (e.checked) {
      this.listMatHang.forEach(item => {
        item.checked = true;
      });
    } else {
      this.listMatHang.forEach(item => {
        item.checked = false;
      });
    }
  }
  changePage(event) {
    console.log(event)
    this.paging.CurrentPage = event.page + 1;
    var start = 15 * (event.page);
    var end = start + 15;
    if ((start + 15) > this.paging.TotalItem)
      end = this.paging.TotalItem;
    this.item.listItem = this.item.listItem_copy.slice(start, end);
  }
  // timKiemMatHang() {
  //   var listItem : any = [];
  //   this.listItem_new.forEach(element => {
  //     if(element.Ten.toLowerCase().includes(this.KeyWord.toLowerCase()) || element.TenLoHang.toLowerCase().includes(this.KeyWord.toLowerCase()))
  //       listItem.push(element)
  //   });
  //   debugger
  //   this.listItem_new = listItem;
  // }
  // refresh(){
  //   this.KeyWord = '';
  //   var start = 15 * (this.paging.CurrentPage - 1);
  //   var end =  start + 15;
  //   if((start + 15) > this.paging.TotalItem)
  //     end= this.paging.TotalItem;
  //   this.item.listItem = this.listMatHang.slice(start,end);
  // }
  filtertable_add() {
    // if (this.KeyWord != undefined && this.KeyWord != null && this.KeyWord != "") {
    //   this.item.listItem_copy = this.listMatHang;
    //   let filter: any = this.item.listItem_copy.filter(
    //     ele => ele.Ten.toLowerCase().includes(this.KeyWord.toLowerCase())
    //   );
    //   console.log(filter)
    //   this.item.listItem = filter;
    //   this.item.listItem_copy = filter;
    // }
    // else {
    //   this.item.listItem = this.listMatHang;
    //   this.item.listItem_copy = this.listMatHang;
    // }
    // this.paging.CurrentPage = 1;
    // this.paging.TotalPage = 5;
    // this.paging.TotalItem = this.item.listItem.length;
    let newArr = []
    this.listRoot.forEach((x: any) => {
      let _listChild = x.listChild.sort((a: any, b: any) => a.NgayNhapKho < b.NgayNhapKho ? -1 : 1);
      if (this.KeyWord) {
        _listChild = _listChild.filter((y: any) => y.Ten.toLowerCase().trim().includes(this.KeyWord.toLowerCase().trim()));
      }
      if (x.expanded) {
        if (_listChild.length > 0) {
          _listChild = [x, ..._listChild]
        }
        newArr = [...newArr, ..._listChild];
      } else {
        if (_listChild.length)
          newArr.push(x)
      }
    })
    this.item.listItem = newArr
    // this.item.listItem = this.item.listItem.slice(0, 15);
  }
  resetFilter() {
    this.KeyWord = '';
    this.filtertable_add();
  }
}
