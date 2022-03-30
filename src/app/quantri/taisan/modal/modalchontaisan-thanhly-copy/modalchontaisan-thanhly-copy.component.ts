import { dataLoader } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TreeNode } from 'primeng/api';
import { validVariable } from 'src/app/services/globalfunction';
import { TaisanService } from 'src/app/services/Taisan/taisan.service';

@Component({
  selector: 'app-modalchontaisan-thanhly-copy',
  templateUrl: './modalchontaisan-thanhly-copy.component.html',
  styleUrls: ['./modalchontaisan-thanhly-copy.component.css']
})
export class ModalchontaisanThanhlyCopyComponent implements OnInit {
  opt: any = "";
  paging: any = {};
  items: TreeNode[];
  item: any = {};
  listItemDaChon: any = [];
  Lay_Chon: any = "";
  checkedAll: boolean = false;
  selectedNodes: TreeNode[] = [];
  listTaiSanDaChon: any = [];

  constructor(
    public _modal: NgbModal,
    public activeModal: NgbActiveModal,
    public toastr: ToastrService,
    private _serviceTaiSan: TaisanService,
  ) { }

  ngOnInit(): void {
    this.GetList();
  }

  GetList() {
    let data = {
      CurrentPage: 1,
      PageSize: 20,
      IdBoPhanSuDung: '',
    }
    this._serviceTaiSan.GetListTaiSanThanhLy().GetList(data).subscribe((res: any) => {
      this.items = res.Data.map(ele => {
        return {
          data: {
            ...ele
          },
          children: []
        }
      });
      this.items = this.TreeItems(this.items)

      this.listTaiSanDaChon = this.TimCheck(this.items)
      console.log('listTaiSanDaChon ',this.listTaiSanDaChon);
      console.log('listItemDaChon ',this.listItemDaChon);
      
      this.listItemDaChon.forEach(ele => {
        this.listTaiSanDaChon.forEach(obj => {
          if (obj.data.Id === ele) {
            this.selectedNodes.push(obj)
          }
        })
      })

      console.log('selectedNodes', this.selectedNodes );
      

    })
  }
  TreeItems(list) {
    list.forEach(ele => {
      ele.children = list.filter(a => a.data.IdTaiSan === ele.data.Id)
    })
    return list.filter(ele => ele.data.IdTaiSan === null)
  }
  TimCheck(list: Array<any>) {
    let newArr = [];
    list.forEach((ele) => {
      newArr.push(ele);
      if (validVariable(ele.children) && ele.children.length !== 0) {
        newArr = [...newArr, ...this.TimCheck(ele.children)];
      }
    })
    return newArr;
  }

  // TimCheck() {
  //   let cha: boolean = false;
  //   let con: boolean = false;
  //   cha = this.items.every(ele => ele.data.checked);
  //   this.items.filter(obj => {
  //     if (validVariable(obj.children) && obj.children.length > 0) {
  //       con = obj.children.every(ele => ele.data.checked);
  //       if (!con) {
  //         return false;
  //       }
  //     }
  //   });
  //   if ((cha) && (con)) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  // checkAll(e) {
  //   if (e.checked) {
  //     this.items.forEach(obj => {
  //       obj.data.checked = true;
  //       if (validVariable(obj.children) && obj.children.length > 0) {
  //         obj.children.forEach(objchildren => {
  //           objchildren.data.checked = true;
  //         });
  //       }
  //     });
  //   } else {
  //     this.items.forEach(obj => {
  //       obj.data.checked = false;
  //       if (validVariable(obj.children) && obj.children.length > 0) {
  //         obj.children.forEach(objchildren => {
  //           objchildren.data.checked = false;
  //         });
  //       }
  //     });
  //   }
  // }
  // checked() {
  //   this.checkedAll = this.items.every(ele => ele.data.checked)
  //   this.checkedAll = this.TimCheck();
  // }
  // FilterTree() {
  //   let data: any = [];
  //   this.items.forEach(obj => {
  //     if (obj.data.checked) {
  //       data.push({
  //         TaiSan: obj.data,
  //         IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
  //         IdTaiSan: obj.data.Id,
  //         Id: '',
  //       });
  //     }
  //     if (validVariable(obj.children) && obj.children.length > 0) {
  //       obj.children.forEach(objchildren => {
  //         if (objchildren.data.checked) {
  //           data.push({
  //             TaiSan: obj.data,
  //             IdQuyTrinhBanGiao: this.opt === 'add' ? '' : this.item.IdQuyTrinhBanGiao,
  //             IdTaiSan: objchildren.data.Id,
  //             Id: '',
  //           });
  //         }
  //       });
  //     }
  //   });
  //   return data;
  // }
  FilterTree() {
    let data = [];
    data = this.selectedNodes.map(ele => {
      return {
        MaSanPham: ele.data.Ma,
        // Id:'',
        Id: ele.data.Id,
        GiaTriConLai: ele.data.GiaTriConLai,
        TenTaiSan: ele.data.Ten,
      }
    })
    return data;
  }

  GhiLai() {
    this.activeModal.close(this.FilterTree());
  }

}