import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ControlarDescargaCamionSubproductosService } from './controlar-descarga-camion-subproductos.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { AuthService } from '../../core/services/session/auth.service';
import { TipoProducto, tiposProducto } from '../../shared/data-models/tipo-producto';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { ModalMotivoComponent } from '../shared/modals/modal-motivo/modal-motivo.component';
import { ControlarDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';
import { DejarPendienteDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-subproductos-command';
import { CircuitoService } from '../shared/services/circuito.service';
import { Actividades, MotivosEstadoMovimiento, TiposProducto, Sociedades } from '../../shared/enums/enums';
import { MotivoEstadoMovimiento } from '../../shared/data-models/motivo-estado-movimiento';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { ControlarDescargasBaseComponent } from '../shared/controlar-descargas-base/controlar-descargas-base.component';
import { MovimientoCerealSubproducto } from '../../shared/data-models/movimiento-cereal-subproducto';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { ModalRechazarDescargaComponent } from '../shared/modals/modal-rechazar-descarga/modal-rechazar-descarga.component';
import { PreCargaMovimientoDataView } from '../../shared/data-models/precarga-movimiento-data-view';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Autorizacion } from '../shared/autorizacion/autorizacion';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { DatosDocumentoControlarDescargaSubproductosComponent } from './datos-documento-controlar-descarga-subproductos/datos-documento-controlar-descarga-subproductos.component';
import { ModalSeleccionarRemitoComponent } from '../shared/modal-seleccionar-remito/modal-seleccionar-remito.component';
import { ModalSeleccionarRemitoDataView } from '../../shared/data-models/modal-seleccionar-remito-data-view';

@Component({
  selector: 'yrd-controlar-descarga-camion-subproductos',
  templateUrl: './controlar-descarga-camion-subproductos.component.html',
  styleUrls: ['./controlar-descarga-camion-subproductos.component.css']
})
export class ControlarDescargaCamionSubproductosComponent extends ControlarDescargasBaseComponent {

  botonesDeshabilitados = false;
  buscandoPrecargaMovimiento = false;

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('modalMotivo') modalMotivo: ModalMotivoComponent;
  @ViewChild('modalRechazarDescarga') modalRechazarDescarga: ModalRechazarDescargaComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoControlarDescargaSubproductosComponent;
  @ViewChild('seleccionarRemito') modalSeleccionarRemito: ModalSeleccionarRemitoComponent;

  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  movimientoProvieneDeCupoPrecargado = false;
  disableBotonBuscarPrecargaMovimiento = false;

  constructor(popupService: PopupService,
              private readonly controlarDescargaCamionSubproductosService: ControlarDescargaCamionSubproductosService,
              private readonly fb: FormBuilder,
              circuitoService: CircuitoService,
              fcService: FormComponentService,
              navigationService: NavigationService,
              movimientoService: MovimientoService<MovimientoCerealSubproducto>,
              authService: AuthService,
              eventsNotifierService: DescargaEventsNotifierService,
              protected readonly commandService: CommandService) {
      super(popupService,
            navigationService,
            movimientoService,
            circuitoService,
            fcService,
            authService,
            eventsNotifierService,
            commandService);
      this.idActividad = Actividades.ControlarDescargaCamionSubproductos;
      this.tipoTransporte = EntitiesTiposTransporte.Camion;
      this.ControlPath = 'ControlarDescargaCamionSubproductos';
      const userContext = this.authService.getUserContext();
      if (userContext) {
        this.terminal = userContext.terminal;
      }
  }

  get esAlta(): boolean {
    return this.idActividad === Actividades.ControlarDescargaCamionSubproductos ||
           this.idActividad === Actividades.ControlarDescargaCamionNoGranos;
  }

  recreateSubscriptions() {
    this.fcService.initialize(this.form);
    this.subscribeToControlChanges();
    this.subscribeNavigation();
    this.subscribeFormInteraction();
    setTimeout(() => {
      if (!this.esNavegacion) {
        this.tipoProductoSeleccionada = {id: 99};
        this.fcService.setValue(`circuito.tipoProducto`, tiposProducto[2]);
      }
    }, 0);
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
    }
  }

  protected createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: 'Descarga', disabled: true },
        tipoTransporte: { value: 'Camión', disabled: true },
        tipoProducto: { value: '', disabled: false }
      }),

      documentoPorte: this.fb.group({
        tipoDocumentoPorte: ['', Validators.required],
        numeroDocumentoPorte: [{ value: '', disabled: this.esConsulta }, {
          validators: [
            Validators.required
          ],
          updateOn: 'blur'}]
      })
    });
    this.documentoPorte.setFocus();
    this.autorizaciones = [];
  }

  protected loadMovimiento(movimiento: MovimientoCerealSubproducto) {
    if (this.esNavegacion) {
      this.fcService.setValue(`circuito.tipoProducto`, movimiento.tipoProducto);
    }
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, movimiento.nroDocumentoPorte, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, {onlySelf: true}, true);
    setTimeout(() => {
      this.fcService.setValue(`circuito.tipoProducto`, movimiento.tipoProducto, {onlySelf: true}, true);
    }, 250);
    this.eventsNotifierService.onMovimientoRetrieved(movimiento);
  }

  protected subscribeToControlChanges() {
    super.subscribeToControlChanges();
    this.subscribeCambioTipoProducto();
  }

  private subscribeCambioTipoProducto() {
    const tipoProducto = this.form.get('circuito.tipoProducto');

    if (tipoProducto) {
      tipoProducto.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged((x, y) => (x && y) ? x.id === y.id : false))
        .subscribe((value: TipoProducto) => {
          if (value && this.tipoProductoSeleccionada && this.tipoProductoSeleccionada.id !== value.id) {
            this.tipoProductoSeleccionada = value;
            this.idActividad = this.obtenerIdActividad(value.id);
            this.fcService.setValue('datosDocumento.producto', undefined, {onlySelf: true, emitEvent: false} );
            this.getCircuito();
          }
        });
    }
  }
//#region Carga del Command
  mapControlsToCommand(): ControlarDescargaCamionSubproductosCommand {

    const idCircuito = this.circuito.id;
    const idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    let numeroDocumentoPorte = String(this.fcService.getValue('documentoPorte.numeroDocumentoPorte'));

    numeroDocumentoPorte = numeroDocumentoPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroDocumentoPorte, {onlySelf: true});
    this.setMascara();

    const command = new ControlarDescargaCamionSubproductosCommand( idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte) ;

    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;
    command.idTipoProducto = Number(this.fcService.getValue('circuito.tipoProducto'));

    this.mapControlDatosDocumentoToCommand(command);

    return command;
  }

  mapControlDatosDocumentoToCommand(command: ControlarDescargaCamionSubproductosCommand): void {
    command.autorizaciones = this.autorizaciones;
    command.patenteCamion = String(this.fcService.getValue('datosDocumento.patentes').patenteCamion);
    command.patenteAcoplado = String(this.fcService.getValue('datosDocumento.patentes').patenteAcoplado);
    command.fechaCarga = String(this.fcService.getValue('datosDocumento.fechaCarga'));
    command.fechaVencimiento = String(this.fcService.getValue('datosDocumento.fechaVencimiento'));
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    command.idProducto = Number(this.fcService.getValue('datosDocumento.producto'));
    command.idTitular = Number(this.fcService.getValue('datosDocumento.titular'));
    command.idVendedor = Number(this.fcService.getValue('datosDocumento.vendedor'));
    command.idIntermediario = Number(this.fcService.getValue('datosDocumento.intermediario'));
    command.idRemitenteComercial = Number(this.fcService.getValue('datosDocumento.remitenteComercial'));
    command.idCorredor = Number(this.fcService.getValue('datosDocumento.corredor'));
    command.fleteCargoLdc = Number(this.fcService.getValue('datosDocumento.fleteCargoLdc'));
    command.idTipoPesada = Number(this.fcService.getValue('datosDocumento.tipoPesada'));
    command.idEntregador = Number(this.fcService.getValue('datosDocumento.entregador'));
    command.idDestinatario = Number(this.fcService.getValue('datosDocumento.destinatario'));
    command.kgBruto = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto'));
    command.kgTara = Number(this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara'));
    command.idFinalidad = Number(this.fcService.getValue('datosDocumento.finalidad'));
    command.idProcedencia = Number(this.fcService.getValue('datosDocumento.procedencia'));
    command.idSedeOrigen = Number(this.fcService.getValue('datosDocumento.sedeOrigen'));
    command.idDestino = Number(this.fcService.getValue('datosDocumento.destino'));
    command.idSedeDestino = Number(this.fcService.getValue('datosDocumento.sedeDestino'));
    command.idCosecha = Number(this.fcService.getValue('datosDocumento.cosecha'));
    const transportista = this.form.get('datosDocumento.transportista');
    if (transportista && transportista.value) {
      command.idTransportista = transportista.value.id ? transportista.value.id : undefined;
      command.codigoFiscalTransportista = transportista.value.codigoFiscal;
    }
    command.idChofer = Number(this.fcService.getValue('datosDocumento.chofer'));
    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
  }

  private mapControlsToDejarPendienteCommand(): DejarPendienteDescargaCamionSubproductosCommand {
    return this.mapControlsToCommand() as DejarPendienteDescargaCamionSubproductosCommand;
  }
//#endregion

aceptar() {
    if (this.fcService.isValidForm() && this.verificarFechaVencimiento()) {
      const command = this.mapControlsToCommand();
      this.botonesDeshabilitados = true;
      this.controlarDescargaCamionSubproductosService.RegistrarMovimiento(command).pipe(
        takeUntil(this.onDestroy)
      ).subscribe((commandResponse: number) => {
        this.botonesDeshabilitados = false;
        if (this.fcService.getValue('circuito.tipoProducto') === TiposProducto.SubProductos) {
          this.popupService.success(Resources.Messages.DescargaSubproductosGuardada, Resources.Labels.Aceptar);
        } else {
          this.popupService.success(Resources.Messages.DescargaNoGranoGuardada, Resources.Labels.Aceptar);
        }
        if (this.esContinuar) {
          this.continuar(commandResponse);
        } else {
          if (this.esNavegacion) {
            this.destroyedByNavigation = true;
            setTimeout(() => {
              if (this.navigationService.isFromGestionarTransporteCircuito()) {
                this.navigationService.navigateBackToSource();
              } else {
                this.navigationService.navigateBack();
              }
            }, 1500);
          }
        }
        this.resetForm();
      },  (error: HttpErrorResponse)  =>  {
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
      } );
     } else {
       // Valido todos los controles que no cumplen con su validacion
       const errors = new Collection<string>();
       this.fcService.validateForm(this.form.controls, errors, '');
       this.fcService.showValidationError(errors);
    }
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

  openModalMotivo() {
    if (this.datosDejarPendienteValidos(true)) {
      const selectedValue = new MotivoEstadoMovimiento(MotivosEstadoMovimiento.Datos, 'Datos');
      this.modalMotivo.open(selectedValue, true);
    } else {
      this.documentoPorte.setFocus();
    }
  }

  dejarPendiente() {
    const command = this.mapControlsToDejarPendienteCommand();
    command.observacionDelMotivo = this.modalMotivo.getObservacion();

    this.botonesDeshabilitados = true;
    this.controlarDescargaCamionSubproductosService.DejarPendiente(command).subscribe(() => {
      this.botonesDeshabilitados = false;
      this.popupService.info('La descarga quedó en estado Pendiente.', Resources.Labels.Notificacion);
      if (this.esNavegacion) {
        this.destroyedByNavigation = true;
        setTimeout(() => {
          if (this.navigationService.isFromGestionarTransporteCircuito()) {
            this.navigationService.navigateBackToSource();
          } else {
            this.navigationService.navigateBack();
          }
        }, 1500);
      }
      this.resetForm();
    }, () => this.botonesDeshabilitados = false);
  }

  protected resetForm() {
    this.movimientoProvieneDeCupoPrecargado = false;
    this.disableBotonBuscarPrecargaMovimiento = false;
    super.resetForm();
  }

  buscarPreCargaMovimiento() {
    const nroDocPorteCtl = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (nroDocPorteCtl && nroDocPorteCtl.valid) {
      this.buscandoPrecargaMovimiento = true;
      this.movimientoService.getPreCargaMovimientoSubproductoPorNroDocPorte(this.circuito.id, nroDocPorteCtl.value.replace('-', ''))
        .pipe(takeUntil(this.onDestroy))
        .subscribe((precargas: ModalSeleccionarRemitoDataView[]) => {
          if (precargas && precargas.length !== 0) {
            if (precargas.length === 1) {
              this.onRemitoSeleccionado(precargas[0]);
            } else {
              this.modalSeleccionarRemito.open(precargas);
            }
          } else {
            this.popupService.warning(Resources.Messages.ElDocumentoDePorteNoSeEncuentraCargadoONoCorrespondeAlCircuito);
          }
          this.buscandoPrecargaMovimiento = false;
        });
    } else {
      this.popupService.error(Resources.Messages.VerificarLosDatosIngresados,
                              Resources.Labels.Notificacion);
    }
  }

  onModalSeleccionarRemitoCerrado(): void {
    this.documentoPorte.setFocus();
  }

  onRemitoSeleccionado(precargaSubproducto: ModalSeleccionarRemitoDataView): void {
    this.movimientoService.getPreCargaMovimientoSubproductoPorId(precargaSubproducto.id)
                          .pipe(takeUntil(this.onDestroy))
                          .subscribe((precarga: PreCargaMovimientoDataView) => {
      this.movimientoService.marcarMovimientoEnPuesto(precarga.id)
                            .pipe(takeUntil(this.onDestroy))
                            .subscribe(() => {
        const docPorteAnterior = this.fcService.getValue('documentoPorte.numeroDocumentoPorte');

        this.eventsNotifierService.onParentFormHasBeenReseted();

        setTimeout(() => {
          const tieneCupo = !!precarga.codigoCupo;
          const vendedorEsLDC = precarga.vendedor ? precarga.vendedor.id === Sociedades.LDC : false;
          const debeDeshabilitarSedeOrigen = tieneCupo || !vendedorEsLDC;

          this.idMovimiento = precarga.id;

          this.fcService.setValue('circuito.tipoProducto', {id: precarga.idTipoProducto}, {onlySelf: true});
          this.fcService.setValue('datosDocumento.idCodigoCupo', precarga.idCodigoCupo, { onlySelf: true });
          this.fcService.setValue('datosDocumento.codigoCupo', precarga.codigoCupo, { onlySelf: true });
          this.fcService.setValue('datosDocumento.usuarioCupoSAN', precarga.usuarioCupoSAN, { onlySelf: true }, true);
          this.fcService.setValue('datosDocumento.estadoCupo', precarga.estadoCodigoCupo, { onlySelf: true });
          this.fcService.setValue('datosDocumento.turnoPlaya', precarga.turnoPlaya, { onlySelf: true });
          this.fcService.setValue('datosDocumento.titularCartaPorte', precarga.titular, { onlySelf: true },
            tieneCupo && !!precarga.titular);
          this.fcService.setValue('datosDocumento.vendedor', precarga.vendedor, { onlySelf: true });
          this.fcService.setValue('datosDocumento.corredor', precarga.corredorComprador, { onlySelf: true }, tieneCupo);
          this.fcService.setValue('datosDocumento.destinatario', precarga.destinatario, { onlySelf: true }, tieneCupo);
          this.fcService.setValue('datosDocumento.procedencia', precarga.procedencia, { onlySelf: true });
          this.fcService.setValue('datosDocumento.tarjeta', precarga.numeroTarjeta, { onlySelf: true });
          this.fcService.setValue('datosDocumento.estadoMovimiento', precarga.estadoMovimiento, { onlySelf: true });
          this.fcService.setValue(`datosDocumento.cosecha`, precarga.cosecha, {onlySelf: true}, this.esConsulta);
          setTimeout(() => {
            this.fcService.setValue('datosDocumento.finalidad', precarga.finalidad, { onlySelf: true }, tieneCupo);
            this.fcService.setValue('documentoPorte.numeroDocumentoPorte', docPorteAnterior, {onlySelf: true});
            this.fcService.disableControl('documentoPorte');
            this.fcService.disableControl('circuito');
            this.fcService.enableControl('datosDocumento.patentes');
            this.fcService.setValue('datosDocumento.producto', precarga.producto, { onlySelf: true }, tieneCupo);
            this.disableBotonBuscarPrecargaMovimiento = true;
            this.movimientoProvieneDeCupoPrecargado = true;
            this.datosDocumento.setFocus();
            this.fcService.setValue(`datosDocumento.motivoCupo`, precarga.motivoCupo, {onlySelf: true}, tieneCupo);
            this.fcService.setValue('datosDocumento.sedeOrigen', precarga.sedeVendedor, { onlySelf: true }, debeDeshabilitarSedeOrigen);
          }, 0);
        }, 0);
      });
    });
  }

  cancelar() {
    if (this.idMovimiento) {
      this.movimientoService.desmarcarMovimientoEnPuesto(this.idMovimiento)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => super.cancelar());
    } else {
      super.cancelar();
    }
  }

  protected postGetCircuito() {
    setTimeout(() => {
      if (this.circuitoContemplaCupo &&
          !this.buscandoPrecargaMovimiento &&
          !this.movimientoProvieneDeCupoPrecargado &&
          !this.esModificacion) {
        this.fcService.disableControl('datosDocumento');
      }
    }, 0);
  }

  private obtenerIdActividad(tipoProducto: number): number {
    return tipoProducto === TiposProducto.SubProductos ? Actividades.ControlarDescargaCamionSubproductos
                                                       : Actividades.ControlarDescargaCamionNoGranos;
  }
}
