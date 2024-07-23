import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { host1 } from 'src/app/services/host';
import { StoreService } from 'src/app/services/store.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-danh-sach-ke-hoach-nam',
  templateUrl: './danh-sach-ke-hoach-nam.component.html',
  styleUrls: ['./danh-sach-ke-hoach-nam.component.css']
})
export class DanhSachKeHoachNamComponent implements OnInit {

  @ViewChild("iframe") _iframe: any;
  $sub!: Subscription;
  IdDuAnDaChon: any;
  url: string = '';
  urlSafe: SafeResourceUrl = '';
  url_copy: string = '';
  link: any;

  constructor(
    private activatedRoute: ActivatedRoute, private router: Router,
    private location: Location,
    private store: StoreService,
    private sanitizer: DomSanitizer,
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit()
      }
    })
  }

  ngOnInit(): void {
    this.OtherFunction()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.postMessageToIframe();
    }, 1000)
  }

  OtherFunction() {
    this.link = `lap-ke-hoach-nam`
    this.IdDuAnDaChon = this.store.getCurrent();
    let isDEV = window.location.hostname.includes('localhost');
    this.url = isDEV ? `${host1}/lap-ke-hoach/#/${this.link}/${this.IdDuAnDaChon}` : `/lap-ke-hoach/#/${this.link}/${this.IdDuAnDaChon}`;
    console.log('url', this.url);

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.postMessageToIframe();
  }

  postMessageToIframe() {
    try {
      let domain = window.location.protocol + "//" + window.location.host;
      this._iframe.nativeElement
        .contentWindow.postMessage(this.IdDuAnDaChon, `${domain}${this.url}`);
    } catch (error) {
      console.log(error);
    }
  }
}
