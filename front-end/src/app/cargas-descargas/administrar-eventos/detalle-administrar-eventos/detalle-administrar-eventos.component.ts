import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableEventoComponent } from '../../../shared/desplegable-evento/desplegable-evento.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-eventos',
  templateUrl: './detalle-administrar-eventos.component.html',
  styleUrls: ['./detalle-administrar-eventos.component.css']
})
export class DetalleAdministrarEventosComponent {
  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('tipoEvento') tipoEvento: DesplegableEventoComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  readonly Permission = Permission;

  readonly validationMessagesTipoEvento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoEvento)
  };

  readonly validationMessagesMensajeDashboard = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MensajeDashboard)
  };

  readonly validationMessagesMensajeArchestra = {
    required: Resources.Messages.EsObligatorioMensajeArchestraSiNotificaArchestra.format(Resources.Labels.MensajeArchestra)
  };


  setFocus(): void {
    setTimeout(() => this.tipoEvento.setFocus(), 0);
  }
}
