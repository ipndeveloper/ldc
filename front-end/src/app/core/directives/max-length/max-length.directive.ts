import { Directive, Input, HostListener} from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[yrdMaxLength]'
})

export class MaxLengthDirective {

  @Input() maxLength: number;
  @Input() maxDecimalPlaces: number;
  @Input() control: FormControl;

  constructor() {
  }

  @HostListener('input', ['$event.target.value']) onInput(value) {
    if (value) {
      let newValue = value.toString();
      if (this.maxDecimalPlaces) {
        newValue = this.formatDecimalNumber(newValue);
      } else {
        newValue = newValue.slice(0, this.maxLength);
      }
      if (newValue) {
        this.control.setValue(newValue);
      }
    }
  }

    private formatDecimalNumber(value: string): string {
      const valueSplitted = value.split('.');
      const integerPart = valueSplitted[0].slice(0, this.maxLength - this.maxDecimalPlaces);
      value = integerPart;
      if (valueSplitted[1] || valueSplitted[1] === '') {
        const decimalPart = valueSplitted[1].slice(0, this.maxDecimalPlaces);
        value += '.' + decimalPart;
    }
    return value;
  }
}
