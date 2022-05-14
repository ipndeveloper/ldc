import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[yrdModalFocus]'
})
export class ModalFocusDirective {

  KEYCODE_TAB = 9;
  FOCUSEABLE_TAGS = '[href],' +
                    'button:not([disabled]), input:not([disabled]),' +
                    'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  constructor(private readonly hostElement: ElementRef) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Tab' || e.keyCode === this.KEYCODE_TAB) {
      const focusableEls = this.hostElement.nativeElement;
      const modalContent = focusableEls.querySelectorAll(this.FOCUSEABLE_TAGS);
      const firstFocusableEl = modalContent[0];
      const lastFocusableEl = modalContent[modalContent.length - 1];

      if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  }
}
