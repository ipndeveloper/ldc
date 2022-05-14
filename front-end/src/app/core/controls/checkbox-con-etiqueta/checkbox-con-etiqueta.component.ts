import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-checkbox-con-etiqueta',
  templateUrl: './checkbox-con-etiqueta.component.html',
  styleUrls: ['./checkbox-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CheckboxConEtiquetaComponent }
  ]
})
export class CheckboxConEtiquetaComponent extends ValidableControl<boolean> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() habilitarEtiqueta = true;
  @Input() cssClassEtiqueta = '';
  @ViewChild('inputCheckbox') element: ElementRef;

  setValue(value?: boolean): void {
    if (value) {
      this.valor = value;
    } else {
      this.valor = false;
    }
  }

  setFocus() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 0);
  }
}
