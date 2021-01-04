import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[voiPintable]'
})
export class PintableDirective implements AfterViewInit {
  @Input('pinnedCols') pinnedCols:number = 0;
  constructor(private elementRef:ElementRef,private renderer:Renderer2) { }
  
  ngAfterViewInit(){
    this.active();
  }
  public active(){
    this.renderer.listen(this.elementRef.nativeElement.querySelector('tbody'),'scroll',this.onScroll.bind(this))
  }
  onScroll(event){
    let header = this.elementRef.nativeElement.querySelector('thead');
    let body = this.elementRef.nativeElement.querySelector('tbody');
    header.style.transform = `translateX(-${event.srcElement.scrollLeft}px)`;
    if(this.pinnedCols>0){
      header.childNodes.forEach(tr => {
        let n = this.pinnedCols;
        for (let i = 0; i < n; i++) {
            if(tr.childNodes[i]?.style !== null && tr.childNodes[i]?.style!== undefined){
              tr.childNodes[i].style.position = `relative`;
              tr.childNodes[i].style.transform = `translate(${event.srcElement.scrollLeft}px)`;
            }
        }
      });
      body.childNodes.forEach(tr => {
        for (let i = 0; i < this.pinnedCols; i++) {
          if(tr.childNodes[i]?.style !== null && tr.childNodes[i]?.style!== undefined){
            tr.childNodes[i].style.position = `relative`;
            tr.childNodes[i].style.transform = `translate(${event.srcElement.scrollLeft}px)`;
          }
        }
      });
    }
  }
}
