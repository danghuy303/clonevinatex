import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMarginleft]'
})
export class MarginleftDirective {

  @Input('appMarginleft') level: number = 0;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (this.el.nativeElement.children[0] as HTMLElement).style.marginLeft = (this.level * 8) + 'px';
  }
}
