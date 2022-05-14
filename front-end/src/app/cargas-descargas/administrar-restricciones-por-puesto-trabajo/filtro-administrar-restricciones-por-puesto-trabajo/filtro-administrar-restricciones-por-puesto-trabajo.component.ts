import { Component } from '@angular/core';
import { AdministrarRestriccionesPorPuestoTrabajoService } from '../administrar-restricciones-por-puesto-trabajo.service';
import { AdministrarRestriccionesControls } from '../Administrar-restricciones-controls';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-restricciones-por-puesto-trabajo',
  templateUrl: './filtro-administrar-restricciones-por-puesto-trabajo.component.html',
  styleUrls: ['./filtro-administrar-restricciones-por-puesto-trabajo.component.css'],
})
export class FiltroAdministrarRestriccionesPorPuestoTrabajoComponent extends AdministrarRestriccionesControls {

  Permission = Permission;

  constructor(public readonly service: AdministrarRestriccionesPorPuestoTrabajoService) {
    super(service);
  }
}
