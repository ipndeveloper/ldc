import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { IngresarCalidadCaladoService } from './ingresar-calidad-calado.service';
import { Actividades, AccionesCalidad, Operaciones } from '../../shared/enums/enums';
import { CircuitoService } from '../shared/services/circuito.service';
import { RubrosCalidadService } from './rubros-calidad/rubros-calidad.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ConfirmacionProductoCalado } from './confirmaciones/confirmacionProductoCalado.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { GrupoRubroCalidadAnalisis } from '../../shared/data-models/grupo-rubro-calidad-analisis';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { AuthService } from '../../core/services/session/auth.service';
import { IngresarCalidadBaseComponent } from '../shared/ingresar-calidad-base/ingresar-calidad-base.component';
import { MovimientoCalado } from '../../shared/data-models/movimiento-calado';
import { MovimientoService } from '../shared/services/movimiento.service';
import { CaladoService } from './calado.service';
import { CommandService } from '../../shared/command-service/command.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-ingresar-calidad-calado',
  templateUrl: './ingresar-calidad-calado.component.html',
  styleUrls: ['./ingresar-calidad-calado.component.css']
})
export class IngresarCalidadCaladoComponent extends IngresarCalidadBaseComponent {

  private readonly _accionesPath = [
    { key: AccionesCalidad.AptoDescarga, value: 'ingresar-apto-descarga' },
    { key: AccionesCalidad.PendienteSupervisor, value: 'ingresar-pendiente-supervisor' },
    { key: AccionesCalidad.PendienteEntregador, value: 'ingresar-pendiente-entregador' },
    { key: AccionesCalidad.Rechazar, value: 'ingresar-rechazo' },
    { key: AccionesCalidad.PendienteLaboratorio, value: 'ingresar-pendiente-laboratorio' }
  ];

  public get accionesPath() { return this._accionesPath; }

  showCalidadAnterior = false;
  accionSeleccionada = undefined;

  constructor(popupService: PopupService,
              fb: FormBuilder,
              ingresarCalidadCaladoService: IngresarCalidadCaladoService,
              circuitoService: CircuitoService,
              rubroCalidadService: RubrosCalidadService,
              formComponentService: FormComponentService,
              confirmacionProductoCalado: ConfirmacionProductoCalado,
              navigationService: NavigationService,
              caladoService: CaladoService,
              grupoRubroAnalisisNotificationService: DropdownNotificationService<GrupoRubroCalidadAnalisis>,
              authService: AuthService,
              movimientoService: MovimientoService,
              private readonly activatedRoute: ActivatedRoute,
              protected readonly commandService: CommandService) {
    super(popupService, fb, ingresarCalidadCaladoService, circuitoService, rubroCalidadService,
          formComponentService, confirmacionProductoCalado,
          navigationService, caladoService, grupoRubroAnalisisNotificationService, authService,
          commandService, movimientoService);
    this.esNavegacion = false;
    this.operacion = Operaciones.Alta;
    this.basePath = 'IngresarCalidadCalado';
    this.esFueraCircuito = false;
  }

  cancelar() {
    if (this.operacion === Operaciones.Consulta) {
      super.cancelar();
    } else {
      this.movimientoService.desmarcarMovimientoEnPuesto(this.movimiento.id)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => super.cancelar());
    }
  }

  deshabilitarCalidadAnterior() {
    if (this.movimiento) {
      if (this.operacion === Operaciones.Alta) {
        return !this.movimiento.esRecalado;
      }
      return !this.movimiento.tieneMasDeUnaCalidad;
    } else {
      return true;
    }
  }

  traeCalidadAnterior() {
    if (this.movimiento) {
      return this.operacion !== Operaciones.Alta && this.movimiento.tieneMasDeUnaCalidad;
    } else {
      return false;
    }
  }

  protected fillSecciones(movimiento: MovimientoCalado): void {
    if (this.operacion === Operaciones.Consulta) {
      super.fillSecciones(movimiento);
    } else {
      this.movimientoService.marcarMovimientoEnPuesto(movimiento.id)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => super.fillSecciones(movimiento));
    }
  }

  protected getActividades() {
    let idsActividad: number[];
    idsActividad = [];

    if (this.operacion === Operaciones.Modificacion) {
      idsActividad.push(Actividades.ModificarCalidad);
    } else if (this.operacion === Operaciones.RegistroDecisionEntregador) {
      idsActividad.push(Actividades.RegistrarDecisionEntregador);
    } else if (this.operacion === Operaciones.ContinuarCircuitoPostLab) {
      idsActividad.push(Actividades.ContinuarCircuitoPostLab);
    } else {
      idsActividad.push(Actividades.IngresarCalidadCalado);
    }

    return idsActividad;
  }
  protected getPartialPath() {
    const accion = Number(this.formComponentService.getValue('accion.accion'));
    const path = this.accionesPath.find(a => a.key === accion);
    if (path) {
      return path.value;
    }
  }

  setPathAnterior() {
    if (this.operacion === Operaciones.Consulta || this.operacion === Operaciones.Modificacion
      || this.operacion === Operaciones.RegistroDecisionEntregador) {
      this.esNavegacion = true;
    }
  }

  protected subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((extras) => {
        if (this.activatedRoute.snapshot.url.toString().endsWith('vagon')) {
          this.esVagon = true;
        }
        this.fillFormPostNavegacion(extras);
      });
  }

  aceptarContinuar() {
    this.mensajeMerma();
    this.accionSeleccionada = this.formComponentService.getValue('accion.accion');
    this.popupService.confirmOk(() => {
      this.esContinuar = true;
      this.aceptarCalado();
    }, this.obtenerMensajeAceptarContinuar());
  }

  obtenerMensajeAceptarContinuar() {
    if (this.accionSeleccionada === AccionesCalidad.Rechazar ||
      this.accionSeleccionada === AccionesCalidad.PendienteEntregador ||
      this.accionSeleccionada === AccionesCalidad.PendienteSupervisor) {
      return Resources.Messages.SeEstaDejandoPendienteORechazandoMovimiento;
    }
    return Resources.Messages.DeseaConfirmarEstaAccion;
  }
}
