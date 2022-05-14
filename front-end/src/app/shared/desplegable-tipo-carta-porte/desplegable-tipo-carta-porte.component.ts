import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoCartaPorteService } from './desplegable-tipo-carta-porte.service';
import { TipoCartaPorte } from '../data-models/tipo-carta-porte';

@Component({
  selector: 'yrd-desplegable-tipo-carta-porte',
  templateUrl: './desplegable-tipo-carta-porte.component.html',
  styleUrls: ['./desplegable-tipo-carta-porte.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DespegableTipoCartaPorteComponent }
  ]
})
export class DespegableTipoCartaPorteComponent extends DropdownComponent<TipoCartaPorte> {
  @Input() cssClassControl = 'col-sm-9';
  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;

  constructor(tipoCartaPorteService: TipoCartaPorteService) {
    super(tipoCartaPorteService);
  }
}
