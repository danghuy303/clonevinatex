import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-lapkehoachlichxichnam',
  templateUrl: './lapkehoachlichxichnam.component.html',
  styleUrls: ['./lapkehoachlichxichnam.component.css']
})
export class LapkehoachlichxichnamComponent implements OnInit {
  listNam: any = [];
  constructor(
    // public activeModal: NgbActiveModal,
  ) { }
  
  ngOnInit(): void {
    for (let i = new Date().getFullYear(); i <= (new Date().getFullYear() + 20); i++) {
      this.listNam.push({ value: i, label: i });
    }
  }
  
  
  
  ThemMoiDanhSachTaiSan() {
     
  }
  ChapNhan() {
    
  }
  XoaQuyTrinh() {
  
  }
 
  taiLenFileDinhKem() {
   
  }
  
  }
