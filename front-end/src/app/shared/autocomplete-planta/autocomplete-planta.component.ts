import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as HttpStatus from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Observable, of } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompletePlantaService } from './autocomplete-planta.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Planta } from '../data-models/planta';


@Component({
  selector: 'yrd-autocomplete-planta',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompletePlantaComponent }
  ]
})
export class AutocompletePlantaComponent extends AutocompleteComponent<EntityWithDescription> implements OnChanges {
  @Input() cuit: number;
  @Input() esAutomatico: boolean;
  @Input() esRegimenElectronico: boolean;
  @Output() plantaEsRequerido = new EventEmitter();
  plantas: Planta[] = [];
  plantasFilter: Planta[] = [];
  consultoPlantas = false;


  constructor(readonly service: AutocompletePlantaService) {
    super();
    this.etiqueta = 'Planta';
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (this.cuit && this.esRegimenElectronico && this.esAutomatico) {
      this.service.getPlantas(this.cuit).subscribe(
        (plantas) => {
          plantas.length === 0 ? this.plantaEsRequerido.emit(false) : this.plantas = plantas;
        }, (error: HttpErrorResponse) => {
          if (error.status === HttpStatus.BAD_GATEWAY) {
            this.plantaEsRequerido.emit(false);
          }
        });
    }
  }

  getDataByFilter(filter: string): Observable<Planta[]> {

    if (this.esRegimenElectronico && this.esAutomatico) {
      this.plantasFilter = [];
      for (let index = 0; index < this.plantas.length; index++) {
        // tslint:disable-next-line: no-non-null-assertion
        if (this.plantas[index].descripcion.toLowerCase().includes(filter.toLowerCase())) {
          this.plantasFilter.push(this.plantas[index]);
        }
      }
      return of(this.plantasFilter);
    }
    return of([]);
  }
}
