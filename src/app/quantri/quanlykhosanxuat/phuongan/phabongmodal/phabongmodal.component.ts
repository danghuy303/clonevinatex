import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phabongmodal',
  templateUrl: './phabongmodal.component.html',
  styleUrls: ['./phabongmodal.component.css']
})
export class PhabongmodalComponent implements OnInit {
  listBanBong:any = [];
  listItems:any=[];
  listProps:any=[];
  listCol:any = [];
  listFixedCol:any=[];
  editVal:any = 0;
  constructor() { 
    // for(let i = 0;i<31;i++){
    //   this.listBanBong.push({label:`${i}`})
    // }
    this.listItems = [];
    for(let i=0;i<23;i++){
      let data = {
        id: i,
        label:`Thành phần ${i}`,
        // neps:`${i}`,
        // mic:`${i}`,
        // mat:`${i}`,
        // uhml:`${i}`,
        // str:`${i}`,
        // sfi:`${i}`,
        // rd:`${i}`,
        // pb:`${i}`,
        // Tap:`${i}`,
        // Am:`${i}`,
        TyLe:`${i}`,
        Used:`${i}`,
        Ton:`${i}`,
        TongNgay:`${i}`,
        ConLai:`${i}`
      }
      for(let j = 0;j<31;j++){
        data[`Ban${j}`] = i;
      }
      this.listItems.push(data);
    }
    // this.listProps = ['label','Ton','TongNgay','ConLai',
    // // 'neps','mic','mat','uhml','str','sfi','rd','pb','Tap','Am',
    // 'TyLe','Used']
    for(let j = 0;j<31;j++){
      this.listProps.push(`Ban${j}`)
    }
    this.listCol = [
      // {label:'Thành phần bông',cs:1,rs:2,width:'100px'},
      // {label:'Tồn',cs:1,rs:2,width:'100px'},
      // {label:'Tổng ngày',cs:1,rs:2,width:'100px'},
      // {label:'Còn lại',cs:1,rs:2,width:'100px'},
      // {label:'Tỷ lệ',cs:1,rs:2,width:'100px'},
      // {label:'Used',cs:1,rs:2,width:'100px'},
      {label:'Số bàn bông',cs:31,rs:1,width:'unset'},
    ]
    for(let i=0;i<31;i++){
      this.listCol.push({
        labelr2:`${i+1}`,cs:1,rs:1
      })
    }
    this.listFixedCol = [
      {label:'Thành phần bông',cs:1,rs:2,width:'100px'},
      {label:'Tồn',cs:1,rs:2,width:'100px'},
      {label:'Tổng ngày',cs:1,rs:2,width:'100px'},
      {label:'Còn lại',cs:1,rs:2,width:'100px'},
      {label:'Tỷ lệ',cs:1,rs:2,width:'100px'},
      {label:'Used',cs:1,rs:2,width:'100px'},
      {label:'Số bàn bông',cs:31,rs:1,width:'unset'},
    ]
    this.editVal = 0;
    // this.listProps = [...this.listProps,'','Ton','TongNgay','ConLai'];
  }

  ngOnInit(): void {
    
  }
  edit(i,prop){
    this.listItems[i][prop].editing=true;
  }
  doneEdit(i,prop){
    console.log(this.listItems);
    this.listItems[i][prop].editing=false;
  }
}
