import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DesplegableTipoSobreTransporteService } from './desplegable-tipo-sobre-transporte.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-tipo-sobre-transporte',
  templateUrl: './desplegable-tipo-sobre-transporte.component.html',
  styleUrls: ['./desplegable-tipo-sobre-transporte.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoSobreTransporteComponent }
  ]
})
export class DesplegableTipoSobreTransporteComponent extends DropdownComponent<EntityWithDescription> {

  @Input() etiqueta = 'Tipo';
  @ViewChild('selectTipoSobreTransporte') baseElement: ElementRef;

  constructor(service: DesplegableTipoSobreTransporteService) {
    super(service);
  }

}
