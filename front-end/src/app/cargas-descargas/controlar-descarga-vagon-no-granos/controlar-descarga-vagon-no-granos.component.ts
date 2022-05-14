import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { MovimientoCerealGrano } from '../../shared/data-models/movimiento-cereal-grano';
import { AuthService } from '../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { tiposProducto } from '../../shared/data-models/tipo-producto';
import { EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { Actividades } from '../../shared/enums/enums';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ControlarDescargaVagonNoGranosService } from './controlar-descarga-vagon-no-granos.service';
import { ControlarDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';
import { DatosDocumentoControlarDescargaVagonNoGranosComponent } from './datos-documento-controlar-descarga-vagon-no-granos/datos-documento-controlar-descarga-vagon-no-granos.component';
import { ControlarDescargaVagonComponent } from '../shared/controlar-descargas-base/controlar-descargas-vagon.component';
import { Resources } from '../../../locale/artifacts/resources';
import { CommandService } from '../../shared/command-service/command.service';

@Component({
  selector: 'yrd-controlar-descarga-vagon-no-granos',
  templateUrl: './controlar-descarga-vagon-no-granos.component.html',
  styleUrls: ['./controlar-descarga-vagon-no-granos.component.css']
})
export class ControlarDescargaVagonNoGranosComponent extends ControlarDescargaVagonComponent {

  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaVagonNoGranosComponent;

  constructor(popupService: PopupService,
    protected readonly controlarDescargaVagonNoGranosService: ControlarDescargaVagonNoGranosService,
    protected readonly fb: FormBuilder,
    circuitoService: CircuitoService,
    fcService: FormComponentService,
    navigationService: NavigationService,
    movimientoService: MovimientoService<MovimientoCerealGrano>,
    authService: AuthService,
    eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService) {
    super(popupService,
          fb,
          circuitoService,
          fcService,
          navigationService,
          movimientoService,
          authService,
          eventsNotifierService,
          commandService);
    this.tipoProductoSeleccionada = tiposProducto[4];
    this.tipoTransporte = EntitiesTiposTransporte.Tren;
    this.idActividad = Actividades.ControlarDescargaVagonNoGranos;
    this.ControlPath = 'ControlarDescargaVagonNoGranos';
  }

  get esAlta(): boolean {
    return this.idActividad === Actividades.ControlarDescargaVagonNoGranos;
  }

  protected resetDatosVagon() {
    super.resetDatosVagon();
    this.datosDocumento.resetDatosVagon();
    if (this.cargaNuevoVagon) {
      this.datosDocumento.focusVagon();
    }
  }

  protected resetForm() {
    this.datosDocumento.resetForm();
    super.resetForm();
  }

  protected getErroresOperadoresOncca() {
    this.datosDocumento.getErroresOperadoresOncca();
  }

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
    super.loadMovimiento(movimiento);
    if (this.esModificacionDocPorte) {
      this.controlarDescargaVagonNoGranosService.TodosVagonesFactiblesModificarFueraPuesto(movimiento.nroDocumentoPorte)
          .subscribe((todosFactiblesModificar: boolean) => {
            if (!todosFactiblesModificar) {
              this.popupService.warning(Resources.Messages.ExistenVagonesDelDocumentoDePorteQueNoSePuedenModificarFueraDePuesto);
            }
          });
    }
  }

  protected Registrar(command: ControlarDescargaCamionSubproductosCommand) {
    if (this.idActividad === Actividades.ModificarControlFueraPuesto) {
      return this.controlarDescargaVagonNoGranosService.ModificarFueraPuesto(command);
    } else if (this.idActividad === Actividades.ModificarControlFueraCircuito) {
      return this.controlarDescargaVagonNoGranosService.ModificarFueraCircuito(command);
    } else if (this.idActividad === Actividades.ModificarDocPorteVagonesFueraDePuesto) {
      return this.controlarDescargaVagonNoGranosService.ModificarDocPorteFueraDePuesto(command);
    } else {
      return this.controlarDescargaVagonNoGranosService.RegistrarMovimiento(command);
    }
  }

  protected mapControlsToCommand(): ControlarDescargaCamionSubproductosCommand {

    const idCircuito = this.circuito.id;
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte = String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, {onlySelf: true});
    this.setMascara();

    const command = new ControlarDescargaCamionSubproductosCommand(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;
    command.esModificacionDocPorte = this.esModificacionDocPorte;

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  mapControlDatosDocumentoToCommand(command: ControlarDescargaCamionSubproductosCommand): void {
    this.controlarDescargaVagonNoGranosService.MapDatosDocumentoToCommand(this.fcService, command);
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.datosVagon.tarjeta');
    command.autorizaciones = this.autorizaciones;
    if (this.datosDocumento.movimiento != null) {
      command.version = this.datosDocumento.movimiento.version;
    }
  }
}
