import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-text-area-con-etiqueta',
  templateUrl: './text-area-con-etiqueta.component.html',
  styleUrls: ['./text-area-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextAreaConEtiquetaComponent }
  ]
})
export class TextAreaConEtiquetaComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() maxLength = 250;
  @Input() rows = 2;
  @Input() mostrarEtiqueta = true;
  @ViewChild('inputTexto') element: ElementRef;
  @Output() blur: EventEmitter<any> = new EventEmitter();

  cssClassEtiqueta = 'col-sm-3';
  cssClassControl = 'col-sm-9';

  setValue(value?: string | undefined): void {
    if (value) {
      this.valor = value;
    } else {
      this.valor = '';
    }
  }

  setFocus(): void {
    this.element.nativeElement.focus();
  }

  onBlur() {
    this.touched();
    this.blur.emit();
  }
}
