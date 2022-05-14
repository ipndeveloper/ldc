import { Component, ViewChild } from '@angular/core';
import { AdministrarRestriccionesPorPuestoTrabajoService } from '../administrar-restricciones-por-puesto-trabajo.service';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { AdministrarRestriccionesControls } from '../Administrar-restricciones-controls';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-restricciones-por-puesto-trabajo',
  templateUrl: './detalle-administrar-restricciones-por-puesto-trabajo.component.html',
  styleUrls: ['./detalle-administrar-restricciones-por-puesto-trabajo.component.css']
})
export class DetalleAdministrarRestriccionesPorPuestoTrabajoComponent extends AdministrarRestriccionesControls {

  @ViewChild('desplegableTerminal') desplegableTerminal: DesplegableTerminalComponent;

  Permission = Permission;

  constructor(service: AdministrarRestriccionesPorPuestoTrabajoService) {
    super(service);
  }

  validationMessagesPermiso = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Permiso)
  };

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesPuestoTrabajo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PuestoTrabajo)
  };
}
