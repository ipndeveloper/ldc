import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextoComponent }
  ]
})
export class TextoComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @ViewChild('inputTexto') element: ElementRef;

  setValue(value?: string): void {
    if (value) {
      this.valor = value;
    } else {
      this.valor = '';
    }
  }

  setFocus() {
    this.element.nativeElement.focus();
  }
}
