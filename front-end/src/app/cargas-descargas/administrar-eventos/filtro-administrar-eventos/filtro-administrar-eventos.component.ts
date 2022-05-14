import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableEventoComponent } from '../../../shared/desplegable-evento/desplegable-evento.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-eventos',
  templateUrl: './filtro-administrar-eventos.component.html',
  styleUrls: ['./filtro-administrar-eventos.component.css']
})
export class FiltroAdministrarEventosComponent {

  @Input() form: FormGroup;
  label = 'Requiere Acción';
  @ViewChild('tipoEvento') tipoEvento: DesplegableEventoComponent;

  readonly Permission = Permission;

  setFocus(): any {
    setTimeout(() => {
      this.tipoEvento.setFocus();
    }, 0);
  }
}
