import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DesplegableMotivoErrorBalanzaService } from './desplegable-motivo-error-balanza.service';

@Component({
  selector: 'yrd-desplegable-motivo-error-balanza',
  templateUrl: './desplegable-motivo-error-balanza.component.html',
  styleUrls: ['./desplegable-motivo-error-balanza.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMotivoErrorBalanzaComponent }
  ]
})
export class DesplegableMotivoErrorBalanzaComponent extends DropdownComponent<EntityWithDescription> {

  @Input() etiqueta = 'Motivo';

  @ViewChild('selectMotivoErrorBalanza') select: ElementRef;

  constructor(service: DesplegableMotivoErrorBalanzaService) {
    super(service);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

}
