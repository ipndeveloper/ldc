import { Component, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoTarjeta } from '../data-models/tipo-tarjeta';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
  selector: 'yrd-desplegable-tipo-tarjeta',
  templateUrl: './desplegable-tipo-tarjeta.component.html',
  styleUrls: ['./desplegable-tipo-tarjeta.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoTarjetaComponent }
  ]
})
export class DesplegableTipoTarjetaComponent extends DropdownComponent<TipoTarjeta> {

  @ViewChild('selectTipoTarjeta') select: ElementRef;
  constructor(tipoTarjetaService: TipoTarjetaService) {
    super(tipoTarjetaService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

}
