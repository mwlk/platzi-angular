import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {

  @HostListener('mouseenter') onMouseEnter(){
    this._element.nativeElement.style.backgroundColor = 'yellow';
    this._element.nativeElement.style.fontSize = 'bold'
  }

@HostListener('mouseleave') onMouseLeave(){
  this._element.nativeElement.style.backgroundColor = '';
}

  constructor(private _element: ElementRef) {
    // this._element.nativeElement.style.backgroundColor = 'yellow';
  }
}
