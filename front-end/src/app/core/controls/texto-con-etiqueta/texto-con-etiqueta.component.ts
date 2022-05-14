import { Component, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { faCheck, faTimes, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'yrd-texto-con-etiqueta',
  templateUrl: './texto-con-etiqueta.component.html',
  styleUrls: ['./texto-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextoConEtiquetaComponent }
  ]
})
export class TextoConEtiquetaComponent extends ValidableControl<string> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() isLoading = false;
  @Input() habilitarEtiqueta = true;
  @Input() pattern = '';
  @Input() allowIcon = false;
  @Input() successIcon: boolean | null;
  @Output() blur = new EventEmitter();
  @ViewChild('inputTexto') element: ElementRef;

  get iconValue(): IconDefinition {
    return this.successIcon ? faCheck : faTimes;
  }

  get iconCSSValue(): String {
    return this.successIcon ? 'successIcon' : 'errorIcon';
  }

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
