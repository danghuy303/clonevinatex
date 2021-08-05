import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chitietdanhsachhanghoa',
  templateUrl: './chitietdanhsachhanghoa.component.html',
  styleUrls: ['./chitietdanhsachhanghoa.component.css']
})
export class ChitietdanhsachhanghoaComponent implements OnInit {
  @Input('hangHoa')items:any=[];
  @Input('opt') opt:string='';
  @Output('hangHoa')hangHoaChange: EventEmitter<any> = new EventEmitter<any>();
  // isBongXo: boolean = false

  @Input() isBongXo: boolean;
  @Input() isSoi: boolean;

  @Output() newItemEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {



  }

}
