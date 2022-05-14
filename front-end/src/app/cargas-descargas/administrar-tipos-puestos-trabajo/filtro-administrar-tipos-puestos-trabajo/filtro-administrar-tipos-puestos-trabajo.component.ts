import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTipoPuestoTrabajoComponent } from '../../../shared/desplegable-tipo-puesto-trabajo/desplegable-tipo-puesto-trabajo.component';

@Component({
  selector: 'yrd-filtro-administrar-tipos-puestos-trabajo',
  templateUrl: './filtro-administrar-tipos-puestos-trabajo.component.html',
  styleUrls: ['./filtro-administrar-tipos-puestos-trabajo.component.css']
})
export class FiltroAdministrarTiposPuestosTrabajoComponent {
  @Input() form: FormGroup;
  @ViewChild('tipoPuestoTrabajo') tipoPuestoTrabajo: DesplegableTipoPuestoTrabajoComponent;

  setFocus(): any {
    if (this.tipoPuestoTrabajo) {
      setTimeout(() => this.tipoPuestoTrabajo.setFocus(), 0);
    }
  }
}
