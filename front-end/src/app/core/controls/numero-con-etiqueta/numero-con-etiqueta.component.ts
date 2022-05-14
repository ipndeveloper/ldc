import { Component, Input, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValidableControl } from '../../shared/super/validable-control.component';
import { createNumberMask } from 'text-mask-addons';

@Component({
  selector: 'yrd-numero-con-etiqueta',
  templateUrl: './numero-con-etiqueta.component.html',
  styleUrls: ['./numero-con-etiqueta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: NumeroConEtiquetaComponent }
  ]
})
export class NumeroConEtiquetaComponent extends ValidableControl<string> implements OnInit {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() idForm: string;
  @Input() isFocused = false;
  @Input() maxDecimalPlaces: number | null = null;
  @Input() allowLeadingZeroes = false;
  @Input() habilitarEtiqueta = true;
  @Input() disabled = false;
  @Output() blur = new EventEmitter();
  @Input()
  set maxLength(val: number | null) {
    this._maxLength = val;
    this.controlLongitud();
  }

  @ViewChild('inputNumero') element: ElementRef;

  mask: any;
  maxLengthBefore;

  private _maxLength: number | null;

  get maxLength(): number | null { return this._maxLength; }

  ngOnInit() {
    this.controlLongitud();
  }

  private controlLongitud(): void {
    this.maxLengthBefore = this.maxLength;
    let integerLimit = this.maxLength;
    if (integerLimit !== null && this.maxDecimalPlaces !== null) {
      integerLimit -= this.maxDecimalPlaces;
    }
    this.mask = createNumberMask({
      prefix: '',
      decimalSymbol: '.',
      includeThousandsSeparator: false,
      decimalLimit: this.maxDecimalPlaces,
      integerLimit: integerLimit,
      allowDecimal: this.maxDecimalPlaces !== null,
      allowLeadingZeroes: this.allowLeadingZeroes,
    });
  }

  setDisabledState?(isDisabled: boolean): void {
    this.element.nativeElement.disabled = isDisabled;
  }

  setFocus() {
    this.element.nativeElement.focus();
  }

  setValue(value: string): void {
    if (value === undefined) {
      this.valor = null as any;
    } else {
      this.valor = value;
    }
  }

  touched(): void {
    super.touched();
    this.blur.emit(this.valor);
  }
}
