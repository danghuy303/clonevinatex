import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { host1 } from '../../services/host';

@Component({
  selector: 'app-dashboardtonghop',
  templateUrl: './dashboardtonghop.component.html',
  styleUrls: ['./dashboardtonghop.component.css']
})
export class DashboardtonghopComponent implements OnInit {

@ViewChild('iframe', { static: false }) iframe!: ElementRef<HTMLIFrameElement>;
  private $sub!: Subscription;
  private messageSubscription: any;
  IdDuAnDaChon: any;
  url: string = '';
  urlSafe: SafeResourceUrl = '';
  url_copy: string = '';
  link: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: StoreService,
    private sanitizer: DomSanitizer,
  ) {
    this.$sub = this.store.getNhaMay().subscribe(res => {
      if (res) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit(): void {
    this.OtherFunction();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.postMessageToIframe();
    }, 1000)
  }

  OtherFunction() {
    this.link = ``;
    this.IdDuAnDaChon = this.store.getCurrent();
    let isDEV = window.location.hostname.includes('localhost');
    this.url = isDEV
      ? `${host1}/vinatex-rjs/`
      : `/vinatex-rjs/`;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.postMessageToIframe();
  }

  postMessageToIframe() {
    try {
      const obj = {
        IdDuAn: this.IdDuAnDaChon,
        access_token: localStorage.getItem('access_token'),
      };

      if (this.iframe?.nativeElement?.contentWindow) {
        this.iframe.nativeElement.contentWindow.postMessage(obj, '*');
      } else {
        console.warn("Iframe chưa sẵn sàng");
      }
    } catch (error) {
      console.log(error);
    }
  }

}
