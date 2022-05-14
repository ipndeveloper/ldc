import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DesplegableEstadoSobreTransporteService } from './desplegable-estado-sobre-transporte.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';

@Component({
  selector: 'yrd-desplegable-estado-sobre-transporte',
  templateUrl: './desplegable-estado-sobre-transporte.component.html',
  styleUrls: ['./desplegable-estado-sobre-transporte.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoSobreTransporteComponent }
  ]
})
export class DesplegableEstadoSobreTransporteComponent extends DropdownComponent<EntityWithDescription> {

  @Input() etiqueta = 'Estado';
  @ViewChild('selectEstadoSobreTransporte') baseElement: ElementRef;

  constructor(desplegableService: DesplegableEstadoSobreTransporteService) {
    super(desplegableService);
  }

}
