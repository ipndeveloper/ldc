import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { Finalidad } from '../data-models/finalidad';
import { FinalidadService } from './finalidad.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Circuito } from '../data-models/circuito/circuito';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-finalidad',
  templateUrl: './desplegable-finalidad.component.html',
  styleUrls: ['./desplegable-finalidad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableFinalidadComponent }
  ]
})
export class DesplegableFinalidadComponent
  extends DropdownComponent<Finalidad>
  implements OnChanges {

  @Input() control: FormControl;
  @Input() circuito: Circuito;
  @Input() cssClassControl = 'col-sm-9';
  @Input() obtenerTodos = false;
  @ViewChild('selectFinalidad') baseElement: ElementRef;

  constructor(readonly finalidadService: FinalidadService) {
    super(finalidadService);
  }

  protected getData(): Observable<Finalidad[]> {
    if (this.obtenerTodos) {
      return this.finalidadService.getAll();
    } else {
      return this.finalidadService.getFinalidadesPorCircuito(this.circuito.id);
    }
  }

  databind(): void {
    if (this.obtenerTodos || (this.circuito && this.circuito.id)) {
      super.databind();
    }
  }

  ngOnChanges(): void {
    this.databind();
  }
}
