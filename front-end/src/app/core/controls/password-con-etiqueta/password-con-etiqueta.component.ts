import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidableControl } from '../../shared/super/validable-control.component';

@Component({
  selector: 'yrd-password-con-etiqueta',
  templateUrl: './password-con-etiqueta.component.html',
  styleUrls: ['./password-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: PasswordConEtiquetaComponent }
  ]
})
export class PasswordConEtiquetaComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @ViewChild('inputPassword') element: ElementRef;

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
