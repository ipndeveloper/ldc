import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { BooleanToStringPipe } from '../../../core/pipes/boolean-to-string.pipe';
import { DecimalSeparatorPipe } from '../../../core/pipes/decimal-separator.pipe';

@Component({
  selector: 'yrd-mermas-especiales',
  templateUrl: './mermas-especiales.component.html',
  styleUrls: ['./mermas-especiales.component.css']
})
export class MermasEspecialesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() mermasEspeciales: FormArray;
  columns: any;
  rows: any;

  constructor(private readonly decimalSeparatorPipe: DecimalSeparatorPipe,
              private readonly booleanToStringPipe: BooleanToStringPipe) {
  }

  ngOnInit(): void {
    this.columns = [
      {
        resizeable: false,
        name: 'Merma',
        prop: 'value.descripcion'
      },
      {
        resizeable: false,
        name: '% Merma',
        prop: 'value.porcentajeMerma',
        pipe: this.decimalSeparatorPipe
      },
      {
        resizeable: false,
        name: 'Afecta Stock',
        prop: 'value.afectaStock',
        pipe: this.booleanToStringPipe
      },
      {
        resizeable: false,
        name: 'Afecta Aplicación',
        prop: 'value.afectaAplicacion',
        pipe: this.booleanToStringPipe
      },
      {
        resizeable: false,
        name: 'Recupera Merma',
        prop: 'value.recuperaMerma',
        pipe: this.booleanToStringPipe
      }
    ];
  }

  setRows(mermasEspeciales: FormArray): void {
    this.rows = [...mermasEspeciales.controls];
  }
}
