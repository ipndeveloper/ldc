import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { MotivoCupo } from '../data-models/motivo-cupo';
import { DesplegableMotivoCupoService } from './desplegable-motivo-cupo.service';
import { Observable, of } from 'rxjs';
import { Finalidad } from '../data-models/finalidad';

@Component({
  selector: 'yrd-desplegable-motivo-cupo',
  templateUrl: './desplegable-motivo-cupo.component.html',
  styleUrls: ['./desplegable-motivo-cupo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMotivoCupoComponent }
  ]
})
export class DesplegableMotivoCupoComponent extends DropdownComponent<MotivoCupo> implements OnInit, OnChanges {
    @Input() cssClassEtiqueta = 'col-sm-3';
    @Input() cssClassControl = 'col-sm-4';
    @Input() finalidad: Finalidad;

    @ViewChild('selectMotivoCupo') select: ElementRef;

    constructor(private readonly motivoCupoService: DesplegableMotivoCupoService) {
      super(motivoCupoService);
     }

    ngOnInit() {
      this.baseElement = this.select;
    }

    ngOnChanges(changes: SimpleChanges) {
      const finalidad = changes['finalidad'];
      if (finalidad && (finalidad.currentValue !== finalidad.previousValue)) {
        this.databind();
      }
    }

     setFocus() {
      this.select.nativeElement.focus();
    }

    getData(): Observable<MotivoCupo[]> {
      if (this.finalidad) {
        return this.motivoCupoService.getMotivoPorFinalidad(this.finalidad);
      }
      this.entities = [];
      return of();
    }
}
