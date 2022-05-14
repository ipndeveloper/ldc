import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-caracteristicas',
  templateUrl: './filtro-administrar-caracteristicas.component.html',
  styleUrls: ['./filtro-administrar-caracteristicas.component.css']
})
export class FiltroAdministrarCaracteristicasComponent {
  @Input() form: FormGroup;
  @ViewChild('desplegableCircuito') desplegableCircuito: DesplegableCircuitoComponent;
  readonly Permission = Permission;

  constructor() {
  }

  setFocus(): any {
    setTimeout(() => this.desplegableCircuito.setFocus(), 0);
  }
}
