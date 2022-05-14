import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoGranoService } from './tipo-grano.service';
import { TipoGrano } from '../data-models/tipo-grano';

@Component({
  selector: 'yrd-desplegable-tipo-grano',
  templateUrl: './desplegable-tipo-grano.component.html',
  styleUrls: ['./desplegable-tipo-grano.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoGranoComponent }
  ]
})
export class DesplegableTipoGranoComponent extends DropdownComponent<TipoGrano> {

  @Input() etiqueta = 'Tipo Grano';
  @Input() cssClassEtiqueta = 'col-sm-3';
  @Input() cssClassControl = 'col-sm-9';

  constructor(tipoGranoService: TipoGranoService) {
    super(tipoGranoService);
  }

}
