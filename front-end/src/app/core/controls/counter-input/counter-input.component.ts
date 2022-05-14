import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-counter-input',
  templateUrl: './counter-input.component.html',
  styleUrls: ['./counter-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CounterInputComponent }
  ]
})

export class CounterInputComponent {

  @Input() counterValue = 0;

  constructor() { }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }

}
