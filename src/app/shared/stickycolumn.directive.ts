import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStickycolumn]'
})
export class StickycolumnDirective implements OnInit, AfterViewInit {
  @Input() fixedIndex: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('scroll', ['$event.target'])

  onScroll(container: any) {
    const thList = this.el.nativeElement.querySelectorAll('th');
    const trList = this.el.nativeElement.querySelectorAll('tr');
    for (let i = 0; i < this.fixedIndex; i++) {
      if (thList[i]) {
        this.renderer.setStyle(thList[i], 'position', 'sticky');
        this.renderer.setStyle(thList[i], 'transform', `translateX(${container.scrollLeft}px)`);
      }
      trList.forEach((tr: any) => {
        const tdList = tr.querySelectorAll('td');
        tdList.forEach((tr: any) => {
          for (let i = 0; i < this.fixedIndex; i++) {
            this.renderer.setStyle(tdList[i], 'position', 'sticky');
            this.renderer.setStyle(tdList[i], 'transform', `translateX(${container.scrollLeft}px)`);
          }
        })
      })
    }
  }

  ngAfterViewInit() {
  }

}
