import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as HttpStatus from 'http-status-codes';
import { takeUntil } from 'rxjs/operators';

import { tiposProducto } from '../../shared/data-models/tipo-producto';
import { Terminal } from '../../shared/data-models/terminal';
import { Caracteristicas, Actividades, MotivosEstadoMovimiento, Productos, Sociedades, ComportamientoAfip } from '../../shared/enums/enums';
import { CircuitoService } from '../shared/services/circuito.service';
import { Collection } from '../../core/models/collection';
import { ControlarDescargaCamionCerealesService } from './controlar-descarga-camion-cereales.service';
import { ControlarDescargaCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';
import { DejarPendienteDescargaCamionCerealesCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-cereales-command';
import { MotivoEstadoMovimiento } from '../../shared/data-models/motivo-estado-movimiento';
import { ModalMotivoComponent } from '../shared/modals/modal-motivo/modal-motivo.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { ConsultarDatosAfipComponent } from '../../gestion-afip/consultar-datos-afip/consultar-datos-afip.component';
import { AuthService } from '../../core/services/session/auth.service';
import { ControlarDescargasBaseComponent } from '../shared/controlar-descargas-base/controlar-descargas-base.component';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { tiposTransportes, EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { DatosDocumentoControlarDescargaCerealesComponent } from './datos-documento-controlar-descarga-cereales/datos-documento-controlar-descarga-cereales.component';
import { MovimientoCerealGrano } from '../../shared/data-models/movimiento-cereal-grano';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { Movimiento } from '../../shared/data-models/movimiento';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { ModalRechazarDescargaComponent } from '../shared/modals/modal-rechazar-descarga/modal-rechazar-descarga.component';
import { PreCargaMovimientoDataView } from '../../shared/data-models/precarga-movimiento-data-view';
import { IdentificarCamionCerealCupoComponent } from './identificar-camion-cereal-cupo/identificar-camion-cereal-cupo.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { Autorizacion } from '../shared/autorizacion/autorizacion';
import { TurnoCircularService } from '../shared/services/turno-circular.service';
import { BuscarTurnoCircularCommand as BuscarTurnoCircularQuery } from '../../shared/data-models/buscar-turno-circular.command';
import { ModalSeleccionarMovimientoComponent } from './modal-seleccionar-movimiento/modal-seleccionar-movimiento.component';
import { ModalSeleccionarMovimientoDataView } from '../../shared/data-models/modal-seleccionar-movimiento-data-view';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';
import { DatosCpeAfipDataView } from '../../gestion-afip/consultar-datos-afip/datos-Cpe-Afip-Data-View';
import { ValuesCpeAfipDataView } from '../../gestion-afip/consultar-datos-afip/ValuesCpeAfipDataView';

@Component({
  selector: 'yrd-controlar-descarga-camion-cereales',
  templateUrl: './controlar-descarga-camion-cereales.component.html',
  styleUrls: ['./controlar-descarga-camion-cereales.component.css']
})

export class ControlarDescargaCamionCerealesComponent extends ControlarDescargasBaseComponent {

  @ViewChild('identificarCamion') identificarCamion: IdentificarCamionCerealCupoComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaCerealesComponent;
  @ViewChild('consultarDatosAfip') consultarDatosAfip: ConsultarDatosAfipComponent;
  @ViewChild('modalMotivo') modalMotivo: ModalMotivoComponent;
  @ViewChild('modalRechazarDescarga') modalRechazarDescarga: ModalRechazarDescargaComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('btnAceptarYContinuar') btnAceptarYContinuar: ElementRef;
  @ViewChild('btnDejarPendiente') btnDejarPendiente: ElementRef;
  @ViewChild('btnAceptar') btnAceptar: ElementRef;
  @ViewChild('modalSeleccionarMovimiento') modalSeleccionarMovimiento: ModalSeleccionarMovimientoComponent;

  terminal: Terminal;
  showCTGData = false;
  falloAfip = false;
  esCartaPorteElectronica = false;
  nroDocModificado = '';
  completarTipoProducto = true;
  fillCampoEpa = false;
  botonesDeshabilitados = false;
  buscandoPrecargaMovimiento = false;
  movimiento: Movimiento;
  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  movimientoProvieneDeCupoPrecargado = false;
  disableBotonBuscarPrecargaMovimiento = false;
  disableCtgPorMovimientoQueVieneDeCupo = false;
  disableCtgPapelPorMovimientoQueVieneDeCupo = false;
  disableCtgPorMovimientoQueVieneDeCupoOesCPE = false;
  esAutomatica = false;
  movimientoPrecargado = false;
  confirmoCtg = false;

  constructor(popupService: PopupService,
    protected readonly controlarDescargaCamionCerealesService: ControlarDescargaCamionCerealesService,
    protected readonly fb: FormBuilder,
    circuitoService: CircuitoService,
    fcService: FormComponentService,
    navigationService: NavigationService,
    movimientoService: MovimientoService<MovimientoCerealGrano>,
    authService: AuthService,
    eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService,
    protected readonly turnoCircularService: TurnoCircularService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
    private readonly servicioAfip: ConsultarDatosAfipService) {
    super(popupService,
      navigationService,
      movimientoService,
      circuitoService,
      fcService,
      authService,
      eventsNotifierService,
      commandService);
    this.tipoProductoSeleccionada = tiposProducto[0];
    this.idActividad = Actividades.ControlarDescargaCamionCereales;
    this.tipoTransporte = EntitiesTiposTransporte.Camion;
    this.ControlPath = 'ControlarDescargaCamionCereales';
  }

  get esAlta(): boolean {
    return this.idActividad === Actividades.ControlarDescargaCamionCereales && !this.esModificacion && !this.esConsulta;
  }


  handleCommand(command: Command) {
    super.handleCommand(command);
    switch (command.name) {
      case 'DejarPendiente':
        this.dejarPendiente();
        break;
      case 'Rechazar':
        this.modalRechazarDescarga.abrir(this.idMovimiento);
        break;
      case 'ConsultarDatosAFIP':
        this.openConsultarDatosAfip();
        break;
    }
  }

  resetForm() {
    this.idMovimiento = 0;
    this.falloAfip = false;
    this.movimientoProvieneDeCupoPrecargado = false;
    this.disableBotonBuscarPrecargaMovimiento = false;
    this.disableCtgPorMovimientoQueVieneDeCupo = false;
    this.disableCtgPorMovimientoQueVieneDeCupoOesCPE = false;
    super.resetForm();
    this.setFocus();
  }

  setFocus() {
    setTimeout(() => {
      if (this.identificarCamion) {
        this.identificarCamion.setFocus();
      }
      if (this.datosDocumento) {
        this.datosDocumento.setFocus();
      }
    }, 0);
  }

  protected createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: 'Descarga', disabled: true },
        tipoTransporte: { value: 'Camión', disabled: true },
        tipoProducto: { value: this.tipoProductoSeleccionada.descripcion, disabled: true }
      }),
      documentoPorte: this.fb.group({
        ctg: [{ value: '', disabled: true }, Validators.required],
        tipoDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: this.esConsulta ||
           (!this.circuitoContemplaCupo && this.esCartaPorteElectronica) }, {
          updateOn: 'blur'
        }],
        numeroDocumentoPorteInf: [{ value: this.nroDocModificado,
          disabled: this.esConsulta || (this.esAutomatica && this.esCartaPorteElectronica) || this.circuitoContemplaCupo }, {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'
        }]
      })
    });
    this.autorizaciones = [];
    this.fcService.initialize(this.form);
  }

  protected getCircuito() {
    const idTipoMovimiento = tiposMovimientos[1].id;
    const idTipoTransporte = tiposTransportes[0].id;
    const idTipoProducto = this.tipoProductoSeleccionada.id;

    this.circuitoService.getCircuito(idTipoMovimiento, idTipoTransporte, idTipoProducto, [this.idActividad, Actividades.ValidacionCupo])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
        this.circuitoContemplaCupo = this.circuito.poseeActividad(Actividades.ValidacionCupo);

        this.setHabilitacionCtg();
        this.setHabilitacionConCupoSinCupo();

        if (this.circuitoContemplaCupo &&
          !this.buscandoPrecargaMovimiento &&
          !this.movimientoProvieneDeCupoPrecargado &&
          !this.esModificacion) {
          this.fcService.disableControl('datosDocumento');
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
            Resources.Labels.Error,
            { timeOut: 10000 });
        }
      });
  }

  private setHabilitacionCtg() {
    const detalleDeshabilitadoPorCircuitoProvieneDeCupo = this.circuitoContemplaCupo &&
      !this.buscandoPrecargaMovimiento &&
      !this.movimientoProvieneDeCupoPrecargado;

    if (!this.esConsulta &&
      this.circuito &&
      this.circuito.debeActivarCaracteristica([Caracteristicas.ConfirmaCtgControlDescargaCereales]) &&
      !detalleDeshabilitadoPorCircuitoProvieneDeCupo &&
      !this.disableCtgPorMovimientoQueVieneDeCupo &&
      this.movimiento == null) {
      this.eventsNotifierService.onHabilitarCTG();
    }
  }

  protected loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.movimiento = movimiento;
    this.confirmoCtg = movimiento.confirmoCtg;
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte, { onlySelf: true }, this.esConsulta
      || movimiento.confirmoCtg);
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorteInf`, movimiento.nroDocumentoPorte, { onlySelf: true }, this.esConsulta
      || movimiento.confirmoCtg || this.circuitoContemplaCupo);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true }, true);
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
    this.setHabilitacionCtg();
    this.comportamientoAfip();
  }

  private verificarOperadoresOncca(): Promise<boolean> {
    const mensajeError = this.datosDocumento.getErroresOperadoresOncca();
    if (mensajeError) {
      return this.popupService.confirm(mensajeError);
    } else {
      return Promise.resolve(true);
    }
  }

  aceptar() {
    if (this.fcService.isValidForm() && this.verificarFechaVencimiento()) {
      if (!(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg') ||
        this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente'))
        && this.esCartaPorteElectronica
        && (this.falloAfip || !this.esAutomatica)) {
        this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnCheck);
        return;
      }
      const command = this.mapControlsToCommand();
      this.verificarOperadoresOncca().then(confirmo => {
        if (confirmo) {
          this.botonesDeshabilitados = true;
          if (!command.aceptarSinConfirmarCtg &&
            this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.ConfirmaCtgControlDescargaCereales], this.idActividad) &&
            !!this.esAutomatica) {
            this.popupService.info(Resources.Messages.ConectandoConElServicioAfip);
          }
          if (this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.InformarCircularArriboCamion], this.idActividad)) {
            this.turnoCircularService.BuscarTurnoCircular(this.armaBuscarTurnoCircularQuery(command))
              .pipe(takeUntil(this.onDestroy))
              .subscribe(turno => {
                if (turno) {
                  command.idTurnoCircular = turno.id;
                  command.turnoCircularVigente = turno.vigente;
                  if (!turno.vigente) {
                    this.popupService.warning(
                      Resources.Messages.MovimientoCuentaConTurnoCircularVencido.format(
                        turno.fechaDesdeTolerancia,
                        turno.fechaHastaTolerancia
                      )
                    );
                  } else {
                    this.popupService.success(Resources.Messages.MovimientoCuentaConTurnoCircular);
                  }
                }
                this.RegistrarMovimiento(command);
              });
          } else {
            this.RegistrarMovimiento(command);
          }
        }
      });
    } else {
      // Valido todos los controles que no cumplen con su validacion
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  private RegistrarMovimiento(command: ControlarDescargaCerealesCommand) {
    this.controlarDescargaCamionCerealesService.RegistrarMovimiento(command)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((commandResponse: number) => {
        this.botonesDeshabilitados = false;
        this.popupService.success(Resources.Messages.DescargaCerealesGuardada, Resources.Labels.Aceptar);
        if (this.esContinuar) {
          this.continuar(commandResponse);
        } else if (this.esNavegacion) {
          this.destroyedByNavigation = true;
          if (this.navigationService.isFromGestionarTransporteCircuito()) {
            this.navigationService.navigateBackToSource();
          } else {
            this.navigationService.navigateBack();
          }
        }
        this.resetForm();
        this.datosDocumento.resetForm();
      }, (error: HttpErrorResponse) => {

        this.botonesDeshabilitados = false;
        if (error.error && error.error.data && error.error.data.validationData) {
          const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
          if (numeroTarjeta && error.error.data.validationData[numeroTarjeta]) {
            this.fcService.setValue(`datosDocumento.tarjeta`, '', { onlySelf: true });
          } else {
            this.mapearRoles(error.error.data.validationData);
            this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
          }
        }
        if (error.status === HttpStatus.BAD_GATEWAY) {
          this.popupService.warning(Resources.Messages.ElServicioAfipNoSeEncuentraDisponible, Resources.Labels.ErrorAfip);
          this.falloAfip = true;
          this.activarAceptarSinConfirmarCtg();
        }
      });
  }

  abrirModalTarjeta(esContinuar: boolean) {
    if (this.idActividad === Actividades.ModificarControlIngreso && this.debeConsumirWSAfipCPE()) {
      this.validacionConsistenciaDatos(esContinuar);
    } else {
      super.abrirModalTarjeta(esContinuar);
    }
  }

  private debeConsumirWSAfipCPE() {
    return !this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg') &&
      this.circuito.debeActivarCaracteristica([Caracteristicas.ConfirmaCtgControlDescargaCereales]) &&
      this.esAutomatica &&
      this.esCartaPorteElectronica &&
      this.fcService.isValidForm() &&
      this.verificarFechaVencimiento();
  }

  mapValoresCpeForm(): ValuesCpeAfipDataView {
    return {
      ctg: this.fcService.getValue('datosDocumento.confirmacionArriboCtg.ctg'),
      cartaPorte: this.movimientoProvieneDeCupoPrecargado ?
      this.fcService.getValue('documentoPorte.numeroDocumentoPorte') :
      this.fcService.getValue('documentoPorte.numeroDocumentoPorteInf'),
      idTitular: this.fcService.getValue('datosDocumento.titularCartaPorte')
    };
  }

  validacionConsistenciaDatos(esContinuar: boolean) {
    const ctg = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.ctg');
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    this.popupService.info(Resources.Messages.ConectandoConElServicioAfip);
    this.servicioAfip.getDataCpe(ctg, idTipoDocumentoPorte).subscribe(datosCPE => {
      const valoresForm: ValuesCpeAfipDataView = this.mapValoresCpeForm();
      const valoresAfip: ValuesCpeAfipDataView = this.mapValoresCpeAfip(datosCPE);

      if (!Object.keys(valoresAfip).every(key => valoresForm[key] === valoresAfip[key])) {
        this.popupService.confirmOk(() => {
          this.setDatosCpeAfip(datosCPE);
          super.abrirModalTarjeta(esContinuar);
        }, Resources.Messages.InconsistenciaDeDatos,
          'Datos inconsistentes');
      } else {
        super.abrirModalTarjeta(esContinuar);
      }
    }, error => {
      if (error.status === HttpStatus.BAD_GATEWAY) {
        this.popupService.warning(Resources.Messages.ElServicioAfipNoSeEncuentraDisponible, Resources.Labels.ErrorAfip);
        super.abrirModalTarjeta(esContinuar);
      }
    }
    );
  }

  private mapValoresCpeAfip(datosCPE: DatosCpeAfipDataView): ValuesCpeAfipDataView {
    return {
      ctg: datosCPE.ctg,
      cartaPorte: datosCPE.cartaPorte,
      idTitular: datosCPE.titular.id
    };
  }

  private mapearRoles(roles: any[]) {
    const rolesPrimerOrden: EntityWithDescription[] = [];
    const rolesSegundoOrden: EntityWithDescription[] = [];

    for (const key in roles) {
      if (roles.hasOwnProperty(key)) {
        if (roles[key].orden === 1) {
          rolesPrimerOrden.push(new EntityWithDescription(+key, roles[key].nombre));
        } else {
          rolesSegundoOrden.push(new EntityWithDescription(+key, roles[key].nombre));
        }
      }
    }

    this.rolesAAutorizar = [];
    if (rolesSegundoOrden.length) {
      this.rolesAAutorizar.push(rolesSegundoOrden);
    }
    if (rolesPrimerOrden.length) {
      this.rolesAAutorizar.push(rolesPrimerOrden);
    }
  }

  onAutorizacionCompletada(autorizaciones: Autorizacion[]) {
    this.autorizaciones = this.autorizaciones.concat(autorizaciones);
    if (this.autorizaciones && this.rolesAAutorizar.every(r => this.autorizaciones.some(a => r.some(rol => rol.id === a.idRol)))) {
      this.aceptar();
    }
  }

  dejarPendiente(): void {
    const command = this.mapControlsToDejarPendienteCommand();
    command.observacionDelMotivo = this.modalMotivo.getObservacion();
    this.botonesDeshabilitados = true;
    this.controlarDescargaCamionCerealesService.DejarPendiente(command)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(_ => {
        this.botonesDeshabilitados = false;
        this.popupService.info(Resources.Messages.LaDescargaDeCerealesQuedoEnEstadoPendiente, Resources.Labels.Notificacion);
        if (this.esModificacion) {
          this.destroyedByNavigation = true;
          setTimeout(() => this.navigationService.navigateBack(), 1000);
        } else {
          this.resetForm();
          this.datosDocumento.resetForm();
        }
      },
        () => {
          this.botonesDeshabilitados = false;
        });
  }

  private mapControlsToCommand(): ControlarDescargaCerealesCommand {

    const idCircuito = this.circuito.id;
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte = this.movimientoProvieneDeCupoPrecargado ?
    String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte')) :
    String(this.fcService.getValue('documentoPorte.numeroDocumentoPorteInf'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorteInf', numeroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, { onlySelf: true });
    this.setMascara();

    const command = new ControlarDescargaCerealesCommand(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);

    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  private armaBuscarTurnoCircularQuery(controlarDescargaCerealesCommand: ControlarDescargaCerealesCommand): BuscarTurnoCircularQuery {
    const query = new BuscarTurnoCircularQuery;
    query.CTG = controlarDescargaCerealesCommand.codigoTrazabilidadGrano;
    query.patente = controlarDescargaCerealesCommand.patenteCamion;
    query.productoId = controlarDescargaCerealesCommand.idProducto;
    query.idTipoDocumentoPorte = controlarDescargaCerealesCommand.idTipoCartaPorte;
    return query;
  }

  mapControlDatosDocumentoToCommand(command: ControlarDescargaCerealesCommand): void {
    command.autorizaciones = this.autorizaciones;
    command.patenteCamion = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
    command.patenteAcoplado = String(this.fcService.getValue('datosDocumento.patentes').patenteAcoplado);
    command.fechaCarga = String(this.fcService.getValue('datosDocumento.fechaCarga'));
    command.fechaVencimiento = String(this.fcService.getValue('datosDocumento.fechaVencimiento'));
    command.numeroCEE = Number(this.fcService.getValue('datosDocumento.numeroCEE'));
    command.idProducto = Number(this.fcService.getValue('datosDocumento.producto'));
    command.idTipoGrano = Number(this.fcService.getValue('datosDocumento.tipoGrano'));
    command.idTitularCartaPorte = Number(this.fcService.getValue('datosDocumento.titularCartaPorte'));
    command.idVendedor = Number(this.fcService.getValue('datosDocumento.vendedor'));
    command.numeroEstablecimiento = Number(this.fcService.getValue('datosDocumento.establecimiento.numeroEstablecimiento'));
    if (this.fcService.getValue('datosDocumento.sustentabilidad') || command.idProducto === Productos.SojaEPA) {
      command.idCampoEpaSustentable = Number(this.fcService.getValue('datosDocumento.campoEpa'));
    }
    command.idCosecha = Number(this.fcService.getValue('datosDocumento.cosecha'));
    command.idIntermediario = Number(this.fcService.getValue('datosDocumento.intermediario'));
    command.idRemitenteComercial = Number(this.fcService.getValue('datosDocumento.remitenteComercial'));
    command.idCorredorComprador = Number(this.fcService.getValue('datosDocumento.corredorComprador'));
    command.fleteCargoLdc = Number(this.fcService.getValue('datosDocumento.fleteCargoLdc'));
    command.idMercadoTermino = Number(this.fcService.getValue('datosDocumento.mercadoTermino'));
    command.idTipoPesada = Number(this.fcService.getValue('datosDocumento.tipoPesada'));
    command.idCorredorVendedor = Number(this.fcService.getValue('datosDocumento.corredorVendedor'));
    command.kilometrosRecorridos = Number(this.fcService.getValue('datosDocumento.kilometrosRecorridos'));
    command.idEntregador = Number(this.fcService.getValue('datosDocumento.entregador'));
    command.tarifaReferencia = Number(this.fcService.getValue('datosDocumento.tarifaReferencia'));
    command.idDestinatario = Number(this.fcService.getValue('datosDocumento.destinatario'));
    command.tarifaTN = Number(this.fcService.getValue('datosDocumento.tarifaTN'));
    command.idIntermediarioFlete = Number(this.fcService.getValue('datosDocumento.intermediarioFlete'));
    command.kgBruto = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara'));
    command.idTipoCartaPorte = Number(this.fcService.getValue('datosDocumento.tipoCartaPorte'));
    command.idFinalidad = Number(this.fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia = Number(this.fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen = Number(this.fcService.getValue('datosDocumento.sedeOrigen'));
    command.idSedeDestino = Number(this.fcService.getValue('datosDocumento.sedeDestino'));
    command.sustentabilidad = Boolean(this.fcService.getValue('datosDocumento.sustentabilidad'));
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    command.idCodigoCupo = this.fcService.getValue('datosDocumento.idCodigoCupo');
    command.codigoCupo = this.fcService.getValue('datosDocumento.codigoCupo');
    command.idMotivoCupo = this.fcService.getValue('datosDocumento.motivoCupo');

    if (this.datosDocumento &&
      this.datosDocumento.cupo &&
      this.datosDocumento.cupo.estadoInicial) {
      command.idEstadoInicialCupo = this.datosDocumento.cupo.estadoInicial.id;
    }

    const ctgValues = this.fcService.getValue('datosDocumento.confirmacionArriboCtg');
    if (ctgValues) {
      if (ctgValues.transportista) {
        command.idTransportista = Number(ctgValues.transportista.id);
        command.codigoFiscalTransportista = ctgValues.transportista.codigo;
      }
      if (ctgValues.chofer) {
        command.idChofer = Number(ctgValues.chofer.id);
      }
      command.codigoTrazabilidadGrano = this.esCartaPorteElectronica &&
        this.circuitoContemplaCupo &&
        this.movimientoProvieneDeCupoPrecargado ? Number(this.fcService.getValue('documentoPorte.ctg')) :
        Number(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.ctg'));

      command.codigoCancelacionCtg = ctgValues.codigoCancelacionCtg;
      command.aceptarSinConfirmarCtg = Boolean(ctgValues.aceptarSinConfirmarCtg);
      command.confirmadoManualmente = Boolean(ctgValues.confirmadoManualmente);

      command.esFleteCorto = Boolean(ctgValues.fleteCorto);
    }

    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
  }

  private mapControlsToDejarPendienteCommand(): DejarPendienteDescargaCamionCerealesCommand {
    return this.mapControlsToCommand() as DejarPendienteDescargaCamionCerealesCommand;
  }

  private activarAceptarSinConfirmarCtg() {
    this.habilitarControl('confirmacionArriboCtg.aceptarSinConfirmarCtg');
    if (!this.esCartaPorteElectronica) {
      this.habilitarControl('confirmacionArriboCtg.codigoCancelacionCtg');
    }
    if (this.esCartaPorteElectronica) {
      this.habilitarControl('confirmacionArriboCtg.confirmadoManualmente');
    }
  }

  openModalMotivo(): void {
    if (this.datosDejarPendienteValidos()) {
      const selectedValue = new MotivoEstadoMovimiento(MotivosEstadoMovimiento.Datos, 'Datos');
      this.modalMotivo.open(selectedValue, true);
    } else {
      this.datosDocumento.setFocus();
    }
  }

  openConsultarDatosAfip(): void {
    const ctgCtrl = this.form.get('datosDocumento.confirmacionArriboCtg.ctg');
    if (ctgCtrl && ctgCtrl.value) {
      this.showCTGData = true;
      this.consultarDatosAfip.abrir(ctgCtrl.value);
    } else {
      this.popupService.error(Resources.Messages.DebeIngresarUnNroDeCTGAConsultar);
    }
  }

  closeConsultarDatosAfip(): void {
    this.showCTGData = false;
  }

  buscarPreCargaMovimiento() {
    const nroDocPorteCtl = this.form.get('documentoPorte.numeroDocumentoPorte');
    const ctgCtl = this.form.get('documentoPorte.ctg');
    if (nroDocPorteCtl && nroDocPorteCtl.valid) {
      this.buscandoPrecargaMovimiento = true;
      this.movimientoService.getPreCargaMovimientoPorNroDocPorte(
        this.circuito.id, nroDocPorteCtl.value.replace('-', ''), '')
        .pipe(takeUntil(this.onDestroy))
        .subscribe((precargas: ModalSeleccionarMovimientoDataView[]) => {
          if (precargas && precargas.length !== 0) {
            this.movimientoPrecargado = true;
            if (precargas.length === 1) {
              this.onDocPorteSeleccionado(precargas[0]);
            } else {
              this.modalSeleccionarMovimiento.open(precargas);
            }
          } else {
            this.movimientoPrecargado = false;
            this.popupService.warning(Resources.Messages.ElDocumentoDePorteNoSeEncuentraCargadoONoCorrespondeAlCircuito);
          }
          this.buscandoPrecargaMovimiento = false;
        });
    } else if (ctgCtl && ctgCtl.valid) {
      this.buscandoPrecargaMovimiento = true;
      this.movimientoService.getPreCargaMovimientoPorNroDocPorte(
        this.circuito.id, '', ctgCtl.value.replace('-', ''))
        .pipe(takeUntil(this.onDestroy))
        .subscribe((precargas: ModalSeleccionarMovimientoDataView[]) => {
          if (precargas && precargas.length !== 0) {
            this.movimientoPrecargado = true;
            if (precargas.length === 1) {
              this.onDocPorteSeleccionado(precargas[0]);
            } else {
              this.modalSeleccionarMovimiento.open(precargas);
            }
          } else {
            this.movimientoPrecargado = false;
            this.popupService.warning(Resources.Messages.ElDocumentoDePorteNoSeEncuentraCargadoONoCorrespondeAlCircuito);
          }
          this.buscandoPrecargaMovimiento = false;
        });
    } else {
      this.popupService.error(Resources.Messages.VerificarLosDatosIngresados,
        Resources.Labels.Notificacion);
    }
  }

  onDocPorteSeleccionado(pregarcagaSeleccionada: ModalSeleccionarMovimientoDataView): void {
    this.movimientoService.getPreCargaMovimientoCerealPorId(pregarcagaSeleccionada.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((precarga: PreCargaMovimientoDataView) => {
        this.movimientoService.marcarMovimientoEnPuesto(precarga.id).pipe(takeUntil(this.onDestroy)).subscribe(() => {
          const docPorteAnterior = this.fcService.getValue('documentoPorte.numeroDocumentoPorteInf');
          this.eventsNotifierService.onParentFormHasBeenReseted();
          setTimeout(() => {
            this.fcService.setValue('documentoPorte.numeroDocumentoPorteInf', docPorteAnterior, { onlySelf: true });
            const tieneCupo = !!precarga.codigoCupo;
            this.confirmoCtg = precarga.confirmoCtg;
            const vendedorEsLDC = precarga.vendedor ? precarga.vendedor.id === Sociedades.LDC : false;
            const debeDeshabilitarSedeOrigen = (!vendedorEsLDC) || (tieneCupo && !vendedorEsLDC);
            const debeDeshabilitarTitular = (!this.esCartaPorteElectronica && tieneCupo && !!precarga.titular) ||
              (this.esCartaPorteElectronica);
            const debeDeshabilitarCodigoCancelacionCTG = this.esAlta && (precarga.confirmoCtg || precarga.sinConfirmarCtg)
              || this.esCartaPorteElectronica;
            const debeDeshabilitarNumeroCEE = this.esCartaPorteElectronica || this.esConsulta;
            this.disableCtgPorMovimientoQueVieneDeCupo = this.esAlta && precarga.confirmoCtg;
            this.disableCtgPapelPorMovimientoQueVieneDeCupo = this.esAlta && this.circuitoContemplaCupo;
            this.disableCtgPorMovimientoQueVieneDeCupoOesCPE = this.disableCtgPorMovimientoQueVieneDeCupo || this.esCartaPorteElectronica;

            this.idMovimiento = precarga.id;
            this.fcService.setValue('datosDocumento.idCodigoCupo', precarga.idCodigoCupo, { onlySelf: true });
            setTimeout(() => {
              this.fcService.setValue(`datosDocumento.conCupo`,
                precarga.codigoCupo ? true : false,
                { onlySelf: true }, !this.esModificacion);
              this.fcService.setValue('datosDocumento.codigoCupo', precarga.codigoCupo, { onlySelf: true }, !this.esModificacion);
            }, 0);
            this.fcService.setValue('datosDocumento.usuarioCupoSAN', precarga.usuarioCupoSAN, { onlySelf: true }, true);
            this.fcService.setValue('datosDocumento.estadoCupo', precarga.estadoCodigoCupo, { onlySelf: true });
            this.fcService.setValue('datosDocumento.turnoPlaya', precarga.turnoPlaya, { onlySelf: true });
            this.fcService.setValue('datosDocumento.titularCartaPorte', precarga.titular, { onlySelf: true },
              debeDeshabilitarTitular);
            this.fcService.setValue('datosDocumento.vendedor', precarga.vendedor, { onlySelf: true });
            this.fcService.setValue('datosDocumento.corredorComprador', precarga.corredorComprador, { onlySelf: true }, tieneCupo);
            this.fcService.setValue('datosDocumento.destinatario', precarga.destinatario, { onlySelf: true }, tieneCupo);
            this.fcService.setValue('datosDocumento.finalidad', precarga.finalidad, { onlySelf: true }, tieneCupo);
            this.fcService.setValue('datosDocumento.tarjeta', precarga.numeroTarjeta, { onlySelf: true });
            this.fcService.setValue('datosDocumento.estadoMovimiento', precarga.estadoMovimiento, { onlySelf: true });
            this.fcService.setValue('datosDocumento.motivoCupo', precarga.motivoCupo, { onlySelf: true }, tieneCupo);

            if (precarga.producto.id === Productos.SojaEPA) {
              this.fcService.setValue(`datosDocumento.campoEpa`, precarga.campoEpaSustentable, { onlySelf: true });
            } else if (precarga.campoEpaSustentable) {
              setTimeout(() => {
                this.fcService.setValue(`datosDocumento.sustentabilidad`, true, { onlySelf: true });
                this.fcService.setValue(`datosDocumento.campoEpa`, precarga.campoEpaSustentable, { onlySelf: true });
              }, 0);
            } else {
              setTimeout(() => {
                this.fcService.setValue(`datosDocumento.sustentabilidad`, false, { onlySelf: true });
              }, 0);
            }

            if (this.esCartaPorteElectronica && this.circuitoContemplaCupo) {
              this.fcService.setValue('documentoPorte.numeroDocumentoPorte', precarga.documentoPorte,
                { onlySelf: true }, this.disableCtgPorMovimientoQueVieneDeCupo);
              this.fcService.setValue('datosDocumento.confirmacionArriboCtg.ctg', '',
                { onlySelf: true }, this.disableCtgPapelPorMovimientoQueVieneDeCupo);
            } else {
              this.fcService.setValue('datosDocumento.confirmacionArriboCtg.ctg', precarga.ctg,
                { onlySelf: true }, this.disableCtgPapelPorMovimientoQueVieneDeCupo);
              this.fcService.setValue('documentoPorte.ctg', '', { onlySelf: true }, this.disableCtgPorMovimientoQueVieneDeCupo);
            }
            this.esCartaPorteElectronica && this.circuitoContemplaCupo ? this.fcService.setValue('documentoPorte.ctg',
              precarga.ctg, { onlySelf: true }, this.disableCtgPorMovimientoQueVieneDeCupo) :
              this.fcService.setValue('datosDocumento.confirmacionArriboCtg.ctg',
                precarga.ctg, { onlySelf: true }, this.disableCtgPapelPorMovimientoQueVieneDeCupo);
            this.fcService.setValue('datosDocumento.confirmacionArriboCtg.transportista',
              precarga.transportista, { onlySelf: true }, !this.esCartaPorteElectronica && !this.esConsulta);
            this.fcService.setValue('datosDocumento.confirmacionArriboCtg.chofer',
              precarga.chofer, { onlySelf: true }, !this.esCartaPorteElectronica && !this.esConsulta);
            this.fcService.setValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg',
              precarga.sinConfirmarCtg, { onlySelf: true }, this.disableCtgPorMovimientoQueVieneDeCupoOesCPE || this.esAutomatica);
            this.fcService.setValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente',
              precarga.confirmadoManualmente, { onlySelf: true }, this.disableCtgPorMovimientoQueVieneDeCupoOesCPE || this.esAutomatica);
            this.fcService.setValue('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg',
              precarga.codigoCancelacionCtg, { onlySelf: true }, debeDeshabilitarCodigoCancelacionCTG || this.esCartaPorteElectronica);
            this.fcService.setValue('datosDocumento.numeroCEE',
              precarga.numeroCEE, { onlySelf: true }, debeDeshabilitarNumeroCEE);
            this.fcService.setValue('datosDocumento.producto', precarga.producto, { onlySelf: true }, tieneCupo);
            this.fcService.setValue('datosDocumento.procedencia', precarga.procedencia, { onlySelf: true });
            this.fcService.setValue(`datosDocumento.cosecha`, precarga.cosecha, { onlySelf: true }, this.esConsulta);
            setTimeout(() => {
              this.fcService.setValue('datosDocumento.sedeOrigen',
                precarga.sedeVendedor, { onlySelf: true }, debeDeshabilitarSedeOrigen);
            }, 0);
            this.fcService.disableControl('documentoPorte');
            this.disableBotonBuscarPrecargaMovimiento = true;
            this.movimientoProvieneDeCupoPrecargado = true;
            this.datosDocumento.setFocusForPrecargaMovimiento();
          }, 0);
        });
      });
    this.comportamientoAfip();
  }

  cancelar() {
    const idMovimiento = this.movimiento ? this.movimiento.id : this.idMovimiento;
    if (idMovimiento) {
      this.movimientoService.desmarcarMovimientoEnPuesto(idMovimiento)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          super.cancelar();
          this.resetForm();
          this.datosDocumento.resetForm();
        });
    } else {
      super.cancelar();
      this.resetForm();
      this.datosDocumento.resetForm();
    }
  }

  onEsAfipAutomatico(esAutomatica: boolean): void {
    this.esAutomatica = esAutomatica;
  }

  setFocoAceptarYContinuar(): void {
    if (!this.esModificacion && this.terminal.usaAceptarYContinuar) {
      setTimeout(() => {
        this.btnAceptarYContinuar.nativeElement.focus();
      }, 0);
    } else {
      setTimeout(() => {
        this.btnAceptar.nativeElement.focus();
      }, 0);
    }
  }

  setFocoDejarPendiente(): void {
    setTimeout(() => {
      this.btnDejarPendiente.nativeElement.focus();
    }, 0);
  }

  blurConsultarDatosAfip(): void {
    if (!this.esModificacion) {
      setTimeout(() => {
        this.datosDocumento.setFocusForPrecargaMovimiento();
      }, 0);
    }
  }

  blurRechazar(): void {
    setTimeout(() => {
      this.datosDocumento.setFocusForPrecargaMovimiento();
    }, 0);
  }

  protected comportamientoAfip() {
    setTimeout(() => {
      this.consutarComportamientoAfip();
    }, 0);
  }

  protected consutarComportamientoAfip() {
    const numeroDocumentoPorteInf = this.fcService.getControl('documentoPorte.numeroDocumentoPorteInf');
    const numeroDocumentoPorte = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');
    const ctgElectronico = this.fcService.getControl('documentoPorte.ctg');
    const titularCartaPorte = this.fcService.getControl('datosDocumento.titularCartaPorte');
    const aceptarSinConfirmarCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    const codigoCancelacionCtg = this.form.get('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
    const numeroCEE = this.fcService.getControl('datosDocumento.numeroCEE');
    const ctg = this.form.get('datosDocumento.confirmacionArriboCtg.ctg');
    const transportista = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.transportista');
    const chofer = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.chofer');
    const procedencia = this.fcService.getControl('datosDocumento.procedencia');

    if (numeroDocumentoPorte && numeroDocumentoPorteInf && titularCartaPorte && aceptarSinConfirmarCtg && ctgElectronico
      && codigoCancelacionCtg && ctg && numeroCEE && confirmadoManualmente && transportista && chofer && procedencia) {
      if (!this.movimientoPrecargado && this.circuitoContemplaCupo && !this.esConsulta) {
        this.manipulacionControl(aceptarSinConfirmarCtg, { habilita: !this.esAutomatica, valor: false });
        this.manipulacionControl(confirmadoManualmente, { habilita: !this.esAutomatica, valor: false });
        this.manipulacionControl(codigoCancelacionCtg, { habilita: false, reset: false });
      }
      this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id).subscribe(IdComportamientoAfip => {
        if (IdComportamientoAfip === ComportamientoAfip.RegimenElectronico) {
          this.esCartaPorteElectronica = true;
          this.manipulacionControl(aceptarSinConfirmarCtg, {
            habilita: (!this.esAutomatica &&
              !this.circuitoContemplaCupo), valor: false
          });
          this.manipulacionControl(confirmadoManualmente, {
            habilita: (!this.esAutomatica &&
              !this.circuitoContemplaCupo), valor: false
          });
          this.manipulacionControl(numeroCEE, { habilita: false });
          this.manipulacionControl(ctgElectronico, { habilita: this.circuitoContemplaCupo && this.esAlta });
          this.manipulacionControl(numeroDocumentoPorte, { habilita: false , reset: true});
          this.manipulacionControl(
            ctg, {
            validaciones: Validators.compose([Validators.required, Validators.pattern('[0-9][0-9]{10,11}')]),
            clearValidaciones: true,
            habilita: !this.circuitoContemplaCupo
          });
          this.manipulacionControl(transportista, { habilita: true });
          this.manipulacionControl(chofer, { habilita: true });
          if (!this.esConsulta) {
            if (this.esAutomatica && numeroDocumentoPorteInf && titularCartaPorte) {
              this.manipulacionControl(titularCartaPorte, { habilita: false, reset: !this.esModificacion });
              this.manipulacionControl(numeroDocumentoPorteInf, {
                habilita: !this.circuitoContemplaCupo && !this.esAutomatica,
                reset: !this.circuitoContemplaCupo && !this.esModificacion
              });
            }
            this.manipulacionControl(numeroCEE, { reset: true });
            this.manipulacionControl(codigoCancelacionCtg, { reset: true, habilita: false });
          }
          if (this.movimiento) {
            this.manipulacionControl(ctg, { habilita: !this.movimiento.consultoAfip });
            this.manipulacionControl(numeroDocumentoPorteInf, { habilita: !this.movimiento.consultoAfip && !this.circuitoContemplaCupo });
            this.manipulacionControl(titularCartaPorte, { habilita: !this.movimiento.consultoAfip });
            if (this.confirmoCtg) {
              this.manipulacionControl(ctg, { habilita: false });
              this.manipulacionControl(titularCartaPorte, { habilita: false });
              this.manipulacionControl(numeroDocumentoPorteInf, { habilita: false });
            }
          }
          if (this.esConsulta) {
            this.manipulacionControl(numeroDocumentoPorteInf, { habilita: false });
            this.manipulacionControl(procedencia, { habilita: false });
            this.manipulacionControl(chofer, { habilita: false });
            this.manipulacionControl(transportista, { habilita: false });
            this.manipulacionControl(ctg, { habilita: false });
            this.manipulacionControl(titularCartaPorte, { habilita: false });
          }
        } else {
          this.esCartaPorteElectronica = false;
          this.manipulacionControl(ctg, {
            validaciones: Validators.compose([Validators.required,
            Validators.pattern('[1-9][0-9]{7,7}'),
            Validators.min(1)]),
            clearValidaciones: true,
            habilita: true
          });
          this.manipulacionControl(confirmadoManualmente, { valor: false });
          if (!this.esConsulta) {
            if (this.esAutomatica && numeroDocumentoPorteInf && titularCartaPorte && !this.esNavegacion) {
              this.manipulacionControl(numeroDocumentoPorteInf, { habilita: true, reset: !this.circuitoContemplaCupo });
              this.manipulacionControl(titularCartaPorte, { habilita: true, reset: true });
            }
            this.manipulacionControl(numeroCEE, { habilita: true });
            this.manipulacionControl(codigoCancelacionCtg, { habilita: !this.esAutomatica, reset: true });
            this.manipulacionControl(aceptarSinConfirmarCtg, { habilita: !this.esAutomatica });
            this.manipulacionControl(numeroDocumentoPorteInf, { habilita: true });
            this.manipulacionControl(titularCartaPorte, { habilita: true });
            this.manipulacionControl(transportista, { habilita: true });
            this.manipulacionControl(chofer, { habilita: true });
          }
          if (this.esConsulta) {
            this.manipulacionControl(ctg, { habilita: false });
            this.manipulacionControl(numeroDocumentoPorteInf, { habilita: false });
          }
          this.manipulacionControl(ctgElectronico, { habilita: false, reset: this.esAlta });
          this.manipulacionControl(numeroDocumentoPorte, { habilita: this.circuitoContemplaCupo && this.esAlta , reset: this.esAlta});
        }
        this.setFocus();
      });
    }
  }
  onRecuperarDatoCpe() {
    const ctg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.ctg');
    if (ctg && ctg.valid
      && this.esCartaPorteElectronica
      && this.esAutomatica) {
      this.servicioAfip.getDataCpe(ctg.value, this.tipoDocumentoSeleccionado.id).subscribe(datosCPE => {
        this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.ctg');
        this.setDatosCpeAfip(datosCPE);
      });
    }
  }

  private setDatosCpeAfip(datosCPE: DatosCpeAfipDataView) {
    this.fcService.setValue('documentoPorte.numeroDocumentoPorteInf', datosCPE.cartaPorte);
    this.fcService.setValue('datosDocumento.titularCartaPorte', datosCPE.titular, { onlySelf: true });
  }

  manipulacionControl(control: AbstractControl, parametros: {
    validaciones?,
    habilita?,
    valor?,
    reset?,
    clearValidaciones?
  }) {
    if (control) {
      if (parametros.clearValidaciones !== undefined && parametros.clearValidaciones === true) { control.clearValidators(); }
      if (parametros.validaciones !== undefined) { control.setValidators(parametros.validaciones); }
      if (parametros.habilita !== undefined) { parametros.habilita ? control.enable() : control.disable(); }
      if (parametros.valor !== undefined) { control.setValue(parametros.valor); }
      if (parametros.reset !== undefined && parametros.reset === true) { control.reset(); }
      control.updateValueAndValidity();
    }
  }
}
