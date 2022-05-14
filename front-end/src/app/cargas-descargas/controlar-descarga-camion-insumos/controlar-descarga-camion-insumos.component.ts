import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { ControlarDescargasBaseComponent } from '../shared/controlar-descargas-base/controlar-descargas-base.component';
import { CircuitoComponent } from '../shared/circuito/circuito.component';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { ModalMotivoComponent } from '../shared/modals/modal-motivo/modal-motivo.component';
import { ModalRechazarDescargaComponent } from '../shared/modals/modal-rechazar-descarga/modal-rechazar-descarga.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { AuthService } from '../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { Actividades, TiposTransporte, Permission, TiposMovimiento, MotivosEstadoMovimiento, TiposProducto } from '../../shared/enums/enums';
import { Collection } from '../../core/models/collection';
import { EntitiesTiposProducto, TipoProducto } from '../../shared/data-models/tipo-producto';
import { EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { EntitiesTiposMovimiento } from '../../shared/data-models/tipo-movimiento';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { Resources } from '../../../locale/artifacts/resources';
import { ControlarDescargaCamionInsumosService } from './controlar-descarga-camion-insumos.service';
import { Movimiento } from '../../shared/data-models/movimiento';
import { MotivoEstadoMovimiento } from '../../shared/data-models/motivo-estado-movimiento';
import { ControlarDescargaCamionInsumosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-command';
import { DejarPendienteDescargaCamionInsumosCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-insumos-command';
import { ControlarDescargaCamionInsumosVariosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-insumos-varios-command';

@Component({
  selector: 'yrd-controlar-descarga-camion-insumos',
  templateUrl: './controlar-descarga-camion-insumos.component.html',
  styleUrls: ['./controlar-descarga-camion-insumos.component.css']
})
export class ControlarDescargaCamionInsumosComponent
     extends ControlarDescargasBaseComponent
  implements OnInit {

  @ViewChild('circuito') circuitoComponent: CircuitoComponent;
  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('modalMotivo') modalMotivo: ModalMotivoComponent;
  @ViewChild('modalRechazarDescarga') modalRechazarDescarga: ModalRechazarDescargaComponent;
  nroDocModificado: string;

  get esVarios(): boolean {
    return this.tipoProductoSeleccionada.id === TiposProducto.Varios;
  }

  get esAlta(): boolean {
    return this.idActividad === Actividades.ControlarDescargaCamionInsumos ||
           this.idActividad === Actividades.ControlarDescargaCamionTransportesVarios;
  }

  constructor(protected readonly popupService: PopupService,
              protected readonly commandService: CommandService,
              private readonly controlarDescargaCamionInsumosService: ControlarDescargaCamionInsumosService,
              private readonly fb: FormBuilder,
              protected readonly circuitoService: CircuitoService,
              protected readonly fcService: FormComponentService,
              protected readonly navigationService: NavigationService,
              protected readonly movimientoService: MovimientoService,
              protected readonly authService: AuthService,
              protected readonly eventsNotifierService: DescargaEventsNotifierService) {

    super(popupService,
          navigationService,
          movimientoService,
          circuitoService,
          fcService,
          authService,
          eventsNotifierService,
          commandService);

    this.tipoProductoSeleccionada = EntitiesTiposProducto.Insumos;
    this.ControlPath = Permission.ControlarDescargaCamionInsumosVarios;
    this.idActividad = Actividades.ControlarDescargaCamionInsumos;
    this.tipoTransporte = EntitiesTiposTransporte.Camion;
  }

  handleCommand(command: Command): void {
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

  aceptar(): void {
    if (this.fcService.isValidForm()) {
      const command = this.mapControlsToRegistrarCommand();
      this.controlarDescargaCamionInsumosService.registrarMovimiento(command, this.esVarios)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((commandResponse: number) => {
          this.popupService.success(Resources.Messages.SeAceptoElIngresoDeLaDescarga, Resources.Labels.Aceptar);
          if (this.esContinuar) {
            this.continuar(commandResponse);
          } else if (this.esNavegacion) {
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
      }, (error: HttpErrorResponse)  =>  {
        if (error.error && error.error.data && error.error.data.validationData) {
        const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
        if (numeroTarjeta && error.error.data.validationData[numeroTarjeta]) {
          this.fcService.setValue(`datosDocumento.tarjeta`, '', { onlySelf: true });
        }
      }});
     } else {
       const errors = new Collection<string>();
       this.fcService.validateForm(this.form.controls, errors, '');
       this.fcService.showValidationError(errors);
    }
  }

  openModalMotivo(): void {
    if (this.datosDejarPendienteValidos(true)) {
      const selectedValue = new MotivoEstadoMovimiento(MotivosEstadoMovimiento.Datos, 'Datos');
      this.modalMotivo.open(selectedValue, true);
    } else {
      this.documentoPorte.setFocus();
    }
  }

  dejarPendiente(): void {
      const command = this.mapControlsToDejarPendienteCommand();
      command.observacionDelMotivo = this.modalMotivo.getObservacion();

      this.controlarDescargaCamionInsumosService.dejarPendiente(command, this.esVarios)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.popupService.info(Resources.Messages.LaDescargaDeInsumosQuedoEnEstadoPendiente,
                                Resources.Labels.Notificacion);
        if (this.esNavegacion) {
          setTimeout(() => {
            if (this.navigationService.isFromGestionarTransporteCircuito()) {
              this.navigationService.navigateBackToSource();
            } else {
              this.navigationService.navigateBack();
            }
          }, 1000);
        }
        this.resetForm();
      });
  }

  protected createForm(): void {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: [{ value: this.terminal.descripcion, disabled: true }],
        tipoMovimiento: [{ value: EntitiesTiposMovimiento.Descarga.descripcion, disabled: true }],
        tipoTransporte: [{ value: EntitiesTiposTransporte.Camion.descripcion, disabled: true }],
        tipoProducto: [{ value: this.tipoProductoSeleccionada, disabled: false }]
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: [{ value: '', disabled: false }, Validators.required],
        numeroDocumentoPorte: [{ value: this.nroDocModificado, disabled: false }, { updateOn: 'blur' }]
      }),
    });

    this.documentoPorte.setFocus();
  }

  protected subscribeToControlChanges(): void {
    super.subscribeToControlChanges();
    this.subscribeCambioTipoProducto();
  }

  protected buscarMovimiento(): void {
    this.movimientoService.getMovimientoDescarga(this.idMovimiento, this.tipoProductoSeleccionada.id, this.tipoTransporte.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(movimiento => {
        if (movimiento) {
          this.loadMovimiento(movimiento);
        }
      });
  }

  protected getCircuito(): void {
    this.circuitoService.getCircuito(TiposMovimiento.Descarga, TiposTransporte.Camion, this.tipoProductoSeleccionada.id, [this.idActividad])
        .pipe(takeUntil(this.onDestroy))
        .subscribe(datos => {
          this.circuito = new Circuito();
          Object.assign(this.circuito, datos);
        }, (error: HttpErrorResponse) => {
          if (error.status === HttpStatus.NOT_FOUND) {
            this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
                                    Resources.Labels.Error,
                                    {timeOut: 10000});
          }
        });
  }

  protected loadMovimiento(movimiento: Movimiento): void {
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`,  movimiento.nroDocumentoPorte, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, {onlySelf: true}, true);

    setTimeout(() => {
      this.fcService.setValue(`circuito.tipoProducto`, { id: movimiento.circuito.idTipoProducto }, {onlySelf: true}, true);
      setTimeout(() => {
        this.eventsNotifierService.onMovimientoRetrieved(movimiento);
      }, 0);
    }, 0);
  }

  protected resetForm(): void {
    super.resetForm();
    this.fcService.setValue('circuito.terminal', this.terminal.descripcion, { onlySelf: true }, true);
    this.fcService.setValue('circuito.tipoMovimiento', EntitiesTiposMovimiento.Descarga.descripcion, { onlySelf: true }, true);
    this.fcService.setValue('circuito.tipoTransporte', EntitiesTiposTransporte.Camion.descripcion, { onlySelf: true }, true);
  }

  private mapControlsToDejarPendienteCommand(): DejarPendienteDescargaCamionInsumosCommand {
    return this.mapControlsToRegistrarCommand() as DejarPendienteDescargaCamionInsumosCommand;
  }

  private subscribeCambioTipoProducto(): void {
    const tipoProducto = this.form.get('circuito.tipoProducto');

    if (tipoProducto) {
      tipoProducto.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
        .subscribe((value: TipoProducto) => {
          if (value) {
            this.tipoProductoSeleccionada = value;
            if (!this.esModificacion && !this.esConsulta) {
              if (this.esVarios) {
                this.idActividad = Actividades.ControlarDescargaCamionTransportesVarios;
              } else {
                this.idActividad = Actividades.ControlarDescargaCamionInsumos;
              }
            }
            this.fcService.setValue('datosDocumento.producto', undefined, { onlySelf: true, emitEvent: false });
            this.getCircuito();
          }
        });
    }
  }

  private mapControlsToRegistrarCommand(): ControlarDescargaCamionInsumosVariosCommand {
    const idTipoDocumentoPorte = this.fcService.getValue('documentoPorte.tipoDocumentoPorte') as number;
    let numeroCartaPorte = this.fcService.getValue('documentoPorte.numeroDocumentoPorte');
    numeroCartaPorte = numeroCartaPorte.replace(/ /g, '');
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', numeroCartaPorte, {onlySelf: true});
    this.setMascara();
    const command = new ControlarDescargaCamionInsumosVariosCommand(this.circuito.id, idTipoDocumentoPorte, numeroCartaPorte);
    command.id = this.idMovimiento;
    command.esModificacion = this.esModificacion;
    if (this.esVarios) {
      this.mapControlDatosDocumentoToCommand(command);
    } else {
      this.mapControlDatosDocumentoInsumosToCommand(command as ControlarDescargaCamionInsumosCommand);
    }
    return command;
  }

  private mapControlDatosDocumentoToCommand(command: ControlarDescargaCamionInsumosVariosCommand): void {
    command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    command.patenteCamion = this.fcService.getValue('datosDocumento.patentes.patenteCamion');
    command.idProducto = this.fcService.getValue('datosDocumento.producto');
    command.kgBruto = this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosBruto');
    command.kgTara = this.fcService.getValue('datosDocumento.kilosBrutosTaraGroup.kilosTara');
    command.observaciones = this.fcService.getValue('datosDocumento.observaciones');
    command.idVendedor = this.fcService.getValue('datosDocumento.vendedor');
  }

  private mapControlDatosDocumentoInsumosToCommand(command: ControlarDescargaCamionInsumosCommand): void {
    this.mapControlDatosDocumentoToCommand(command);
    command.idDestinatario = this.fcService.getValue('datosDocumento.destinatario');
    command.idFinalidad = this.fcService.getValue('datosDocumento.finalidad');
    command.idSedeVendedor = this.fcService.getValue('datosDocumento.sedeVendedor');
    command.idSedeDestinatario = this.fcService.getValue('datosDocumento.sedeDestinatario');
    command.idProcedencia = this.fcService.getValue('datosDocumento.procedencia');

    const transportista = this.fcService.getControl('datosDocumento.transportista');
    if (transportista && transportista.value) {
      command.idTransportista = transportista.value.id;
      command.codigoFiscalTransportista = transportista.value.codigoFiscal;
    }
  }
}
