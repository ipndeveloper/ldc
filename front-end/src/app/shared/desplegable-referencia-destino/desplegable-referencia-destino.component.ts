import { Component, Input } from '@angular/core';
import { ReferenciaDestino } from '../data-models/referencia-destino';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { ReferenciaDestinoService } from './referencia-destino.service';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-referencia-destino',
  templateUrl: './desplegable-referencia-destino.component.html',
  styleUrls: ['./desplegable-referencia-destino.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableReferenciaDestinoComponent }
  ]
})

export class DesplegableReferenciaDestinoComponent extends DropdownComponent<ReferenciaDestino> {

  @Input() control: FormControl;

  constructor(referenciaDestinoService: ReferenciaDestinoService) {
    super(referenciaDestinoService);
  }
}

