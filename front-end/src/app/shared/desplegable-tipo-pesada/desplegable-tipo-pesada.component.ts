import { Component, Input } from '@angular/core';
import { TipoPesada } from '../data-models/tipo-pesada';
import { TipoPesadaService } from './tipo-pesada.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-tipo-pesada',
  templateUrl: './desplegable-tipo-pesada.component.html',
  styleUrls: ['./desplegable-tipo-pesada.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoPesadaComponent }
  ]
})
export class DesplegableTipoPesadaComponent extends DropdownComponent<TipoPesada> {
  @Input() cssClassControl = 'col-sm-9';
  @Input() control: FormControl;

  constructor(tipoPesadaService: TipoPesadaService) {
    super(tipoPesadaService);  }

}
