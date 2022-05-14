import { Component, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-etiqueta-con-valor',
  templateUrl: './etiqueta-con-valor.component.html',
  styleUrls: ['./etiqueta-con-valor.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: EtiquetaConValorComponent }
  ]
})
export class EtiquetaConValorComponent implements OnInit {

  @Input() etiqueta: string;
  @Input() valor: string;

  constructor() { }

  ngOnInit() {
  }

}
