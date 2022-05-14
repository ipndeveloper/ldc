import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[yrdFocus]'
  })

export class FocusDirective implements OnInit {

  @Input() element: ElementRef;
  @Input() isFocused: boolean;

  constructor() { }

  ngOnInit() {
    if (this.isFocused) {
      // TODO: Revisar si es la mejor y unica manera
      setTimeout(() => this.element.nativeElement.focus(), 500);
    }
  }
}
