import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EstadoCupo } from '../data-models/estado-cupo';
import { DesplegableEstadoCupoService } from './desplegable-estado-cupo.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-desplegable-estado-cupo',
  templateUrl: './desplegable-estado-cupo.component.html',
  styleUrls: ['./desplegable-estado-cupo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoCupoComponent }
  ]
})

export class DesplegableEstadoCupoComponent extends DropdownComponent<EstadoCupo>
 implements OnInit {

  @Input() estadosValidosGestionarCupos = false;
  @ViewChild('selectEstadoCupo') selectEstadoViaje: ElementRef;

  constructor(private readonly desplegableEstadoCupoService: DesplegableEstadoCupoService) {
    super(desplegableEstadoCupoService);
  }

  getData(): Observable<EstadoCupo[]> {
    if (!this.estadosValidosGestionarCupos) {
      return this.desplegableEstadoCupoService.getAll();
    } else {
      return this.desplegableEstadoCupoService.getEstadosCupoPorIds();
    }
  }

}

