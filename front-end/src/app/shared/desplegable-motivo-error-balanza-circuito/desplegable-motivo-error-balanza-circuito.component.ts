import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableMotivoErrorBalanzaCircuitoService } from './desplegable-motivo-error-balanza-circuito.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MotivoErrorBalanzaPorCircuitoDataView } from '../data-models/motivo-error-balanza-por-circuito-data-view';

@Component({
  selector: 'yrd-desplegable-motivo-error-balanza-circuito',
  templateUrl: './desplegable-motivo-error-balanza-circuito.component.html',
  styleUrls: ['./desplegable-motivo-error-balanza-circuito.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMotivoErrorBalanzaCircuitoComponent }
  ]
})
export class DesplegableMotivoErrorBalanzaCircuitoComponent extends DropdownComponent<MotivoErrorBalanzaPorCircuitoDataView>
  implements OnInit, OnChanges {

  @Input() etiqueta = 'Motivo';
  @Input() circuito: EntityWithDescription;
  @Input() esEntrada: boolean | null = null;

  @ViewChild('selectMotivoErrorBalanzaCircuito') select: ElementRef;

  constructor(private readonly service: DesplegableMotivoErrorBalanzaCircuitoService) {
    super(service);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    this.databind();
  }

  trySetPreviousValue() {
    if (this.entities) {
      this.SelectedEntity = this.mapEntity(this.entities.find(entity => entity.descripcion === this.previousValue.descripcion));
    }
  }

  getData(): Observable<MotivoErrorBalanzaPorCircuitoDataView[]> {
    if (this.circuito && this.esEntrada != null) {
      return this.service.getAllByCircuito(this.circuito.id, this.esEntrada);
    }
    return of([]);
  }
}
