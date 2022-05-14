import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidableControl } from '../../shared/super/validable-control.component';

@Component({
  selector: 'yrd-texto-mascara-con-etiqueta',
  templateUrl: './texto-mascara-con-etiqueta.component.html',
  styleUrls: ['./texto-mascara-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextoMascaraConEtiquetaComponent }
  ]
})
export class TextoMascaraConEtiquetaComponent extends ValidableControl<string>  {
  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() mascara: any;
  @Input() isLoading = false;
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-9';
  @Input() habilitarEtiqueta = true;
  @ViewChild('inputTexto') element: ElementRef;
  @Output() blur = new EventEmitter();

  setValue(value?: string): void {
    if (value) {
      this.valor = value;
    } else {
      this.valor = '';
    }
  }

  setFocus() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    }, 0);
  }

  touched() {
    super.touched();
    this.blur.emit(this.valor);
  }
}

