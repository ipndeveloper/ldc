import { OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { conformToMask } from 'text-mask-core';
import * as HttpStatus from 'http-status-codes';

import { TipoProducto, tiposProducto } from '../../../shared/data-models/tipo-producto';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../services/movimiento.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { tiposTransportes, TipoTransporte, EntitiesTiposTransporte } from '../../../shared/data-models/tipo-transporte';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { CircuitoService } from '../services/circuito.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { AuthService } from '../../../core/services/session/auth.service';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { Actividades, Caracteristicas, Operaciones } from '../../../shared/enums/enums';
import { CommandService, Command } from '../../../shared/command-service/command.service';
import { TipoDocumentoPorte } from '../data-models/tipo-documento-porte';
import { ModalAsignarTarjetaComponent } from '../modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';

export abstract class ControlarDescargasBaseComponent implements OnInit, OnDestroy {

  form: FormGroup;
  protected onDestroy = new Subject();
  tipoProductoSeleccionada: TipoProducto;
  tipoDocumentoSeleccionado: TipoDocumentoPorte;
  tipoDocPorteRegex: Array<any>;
  esModificacion = false;
  esConsulta = false;
  idMovimiento: number;
  idActividad: number;
  tipoTransporte: TipoTransporte;
  GestionarControlPath = 'GestionarControl';
  GestionarMovimientosPath = 'GestionarMovimientos';
  ControlPath: string;
  circuito: Circuito;
  circuitoSoloControl: Circuito;
  terminal: Terminal;
  esNavegacion: boolean;
  circuitoContemplaCupo = false;
  subscription: Subscription;
  ingresoConCupo = false;
  ingresoSinCupo = false;
  esContinuar = false;
  idFinalidad = undefined;
  protected destroyedByNavigation = false;

  @ViewChild('modalAsignarTarjeta') modalAsignarTarjeta: ModalAsignarTarjetaComponent;

  get esModificacionDocPorte(): boolean {
    return this.idActividad === Actividades.ModificarDocPorteVagonesFueraDePuesto;
  }

  get esModificarControlFueraPuesto(): boolean {
    return this.idActividad === Actividades.ModificarControlFueraPuesto;
  }

  constructor(protected readonly popupService: PopupService,
    protected readonly navigationService: NavigationService,
    protected readonly movimientoService: MovimientoService,
    protected readonly circuitoService: CircuitoService,
    protected readonly fcService: FormComponentService,
    protected readonly authService: AuthService,
    protected readonly eventsNotifierService: DescargaEventsNotifierService,
    protected readonly commandService: CommandService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
    this.tipoTransporte = EntitiesTiposTransporte.Camion;
  }

  ngOnInit() {
    this.createForm();
    this.recreateSubscriptions();
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.abrirModalTarjeta(false);
        break;
      case 'Cancelar':
        this.cancelar();
        break;
      case 'AceptarYContinuar':
        this.abrirModalTarjeta(true);
        break;
    }
  }

  recreateSubscriptions() {
    this.fcService.initialize(this.form);
    this.subscribeToControlChanges();
    this.getCircuito();
    this.subscribeNavigation();
    this.subscribeFormInteraction();
  }

  protected subscribeFinalidad() {
    const finalidadCtrl = this.fcService.getControl('datosDocumento.finalidad');
    if (finalidadCtrl) {
      finalidadCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
        if (!this.idFinalidad && finalidadCtrl.value) {
          this.idFinalidad = finalidadCtrl.value.id;
        } else if (finalidadCtrl.value && this.idFinalidad !== finalidadCtrl.value.id ) {
          this.idFinalidad = finalidadCtrl.value.id;
          this.fcService.setValue('datosDocumento.sedeOrigen', '', { onlySelf: true });
          this.fcService.setValue('datosDocumento.sedeDestino', this.terminal.sede, { onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  protected abstract createForm(): void;

  protected abstract loadMovimiento(movimiento: Movimiento): void;

  protected subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params['idMovimiento']) {
          this.esNavegacion = true;
          this.esConsulta = params['esModificacion'] === 'false';
          this.esModificacion = params['esModificacion'] === 'true';
          if (params['operacion']) { this.esModificacion = params['operacion'] === '3'; }
          this.idMovimiento = params['idMovimiento'];

          const tipoTransporteEnviadoPorNavegacion = tiposTransportes.find(t => t.id === +params['idTipoTransporte']);
          if (tipoTransporteEnviadoPorNavegacion) {
            this.tipoTransporte = tipoTransporteEnviadoPorNavegacion;
          }

          if (params['idActividad']) {
            this.idActividad = +params['idActividad'];
          }

          if (params['idTipoProducto']) {
            const tipoProductoEnviadoPorNavegacion = tiposProducto.find(p => p.id === Number(params['idTipoProducto']));
            if (tipoProductoEnviadoPorNavegacion) {
              this.tipoProductoSeleccionada = tipoProductoEnviadoPorNavegacion;
            }
          }

          this.buscarMovimiento();
        }
      });
  }

  protected buscarMovimiento() {
    this.movimientoService.getMovimientoDescarga(this.idMovimiento, this.tipoProductoSeleccionada.id, this.tipoTransporte.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(movimiento => {
        if (movimiento) {
          this.loadMovimiento(movimiento);
        }
        this.getCircuito();
      });
  }

  protected prepareForm() {

  }

  protected buscarMovimientoPorDocPorte(nroDocPorte: string) {
    this.movimientoService.getMovimientoVagonPorNroDocPorte(this.tipoProductoSeleccionada.id, nroDocPorte, this.circuito.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(movimiento => {
        if (movimiento) {
          if (!this.esNavegacion) {
            this.navigationService.clearPathCache();
          }
          this.loadMovimiento(movimiento);
          this.form.controls.datosDocumento.disable();
          this.prepareForm();
        }
        this.getCircuito();
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
        }
      });
  }

  protected getCircuito() {
    const idTipoMovimiento = tiposMovimientos[1].id;
    const idTipoTransporte = tiposTransportes[0].id;
    const idTipoProducto = this.tipoProductoSeleccionada.id; // TODO: Llamar a los identifiers

    this.circuitoService.getCircuito(idTipoMovimiento, idTipoTransporte, idTipoProducto, [this.idActividad, Actividades.ValidacionCupo])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
        this.circuitoContemplaCupo = this.circuito.poseeActividad(Actividades.ValidacionCupo);
        this.postGetCircuito();
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
            Resources.Labels.Error,
            { timeOut: 10000 });
        }
      });
  }

  setHabilitacionConCupoSinCupo() {
    this.ingresoConCupo = this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.IngresoConCupo], this.idActividad);
    this.ingresoSinCupo = this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.IngresoSinCupo], this.idActividad);
    if ((!this.ingresoConCupo && !this.ingresoSinCupo) || this.esConsulta) {
      this.fcService.disableControl('datosDocumento.codigoCupo');
    } else if (this.fcService.getValue('datosDocumento.codigoCupo')) {
      this.fcService.enableControl('datosDocumento.codigoCupo');
    }
  }

  protected postGetCircuito() {
    this.setHabilitacionConCupoSinCupo();
  }

  aceptarContinuar() {
    this.esContinuar = true;
    this.aceptar();
  }

  protected aceptar() {
  }

  protected continuar(idMovimiento: number): void {
    this.esContinuar = !this.esContinuar;
    if (idMovimiento !== undefined && idMovimiento !== 0) {
      this.idMovimiento = idMovimiento;
      this.destroyedByNavigation = true;
      setTimeout(() =>
        this.navigationService.navigateByMovement(idMovimiento, this.ControlPath, this.setNavigationExtras(idMovimiento)), 1000);
    }
  }

  private setNavigationExtras(idMovimiento: number): NavigationExtras {
    return {
      queryParams: {
        'idMovimiento': idMovimiento,
        'operacion': Operaciones.Alta
      }
    };
  }

  cancelar() {
    if (this.esConsulta) {
      this.destroyedByNavigation = true;
      this.navigationService.navigateBack();
    } else {
      this.popupService.confirmOk(() => {
        this.popupService.warning(Resources.Messages.SeCanceloElIngresoDeLaDescarga, Resources.Labels.Cancelar);
        if (this.esNavegacion) {
          this.destroyedByNavigation = true;
          setTimeout(() => {
            if (this.navigationService.isFromGestionarTransporteCircuito()) {
              this.navigationService.navigateBackToSource();
            } else {
              this.navigationService.navigateBack();
            }
          }, 1000);
        }
        this.resetForm();
      }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
    }
  }

  protected resetForm(): void {
    this.fcService.resetForm({ emitEvent: true }, { circuito: { tipoProducto: this.tipoProductoSeleccionada } });
    this.createForm();
    this.recreateSubscriptions();

    setTimeout(() => {
      this.inhabilitarControl('establecimiento.numeroEstablecimiento');
    }, 500);
    setTimeout(() => {
      this.eventsNotifierService.onParentFormHasBeenReseted();
    }, 0);
  }

  protected subscribeFormInteraction() {
    this.eventsNotifierService.childFormIntanceReady
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([form, identifier]) => {
        if (identifier === 'datosDocumentoForm') {
          this.form.setControl('datosDocumento', form);
        }
        this.subscribeToBrutoTaraChanges();
        this.subscribeFinalidad();
      });
  }


  protected inhabilitarControl(controlName: string): void {
    const control = this.form.get('datosDocumento.' + controlName);
    if (control) {
      control.disable();
    }
  }

  protected habilitarControl(controlName: string): void {
    const control = this.form.get('datosDocumento.' + controlName);
    if (control && !this.esConsulta) {
      control.enable();
    }
  }

  onDescargaRechazada() {
    this.popupService.success(Resources.Messages.LaDescargaFueRechazada, Resources.Labels.Rechazar);
    this.destroyedByNavigation = true;
    // Para que el usuario alcance a ver la notificacion antes del navigate.
    setTimeout(() => {
      if (this.navigationService.isFromGestionarTransporteCircuito()) {
        this.navigationService.navigateBackToSource();
      } else {
        this.navigationService.navigateBack();
      }
    }, 1500);
  }


  protected verificarFechaVencimiento(esModificacion = false): boolean {
    const controlFechaVencimiento = this.fcService.getValue('datosDocumento.fechaVencimiento');
    if (!esModificacion && controlFechaVencimiento) {
      const fechaHoy = new Date();
      const fechaVencimiento = (new Date(controlFechaVencimiento + 'T23:59:59'));
      if (fechaVencimiento.getTime() < fechaHoy.getTime()) {
        this.popupService.error(Resources.Messages.FechaVencimientoMenorAHoy, 'Notificación');
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  abrirModalTarjeta(esContinuar: boolean) {
    this.esContinuar = esContinuar;
    if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
      !this.fcService.getValue('datosDocumento.tarjeta') &&
      this.terminal.utilizaTarjeta) {
      if (this.esContinuar) {
        this.popupService.confirmOk(() => {
          this.modalAsignarTarjeta.abrir();
        });
      } else {
        this.modalAsignarTarjeta.abrir();
      }
    } else {
      if (this.esContinuar) {
        this.popupService.confirmOk(() => {
          this.aceptar();
        });
      } else {
        this.aceptar();
      }
    }
  }

  onTarjetaAsignada() {
    this.fcService.setValue(`datosDocumento.tarjeta`,
      this.modalAsignarTarjeta.asignarTarjetaForm.controls.numeroTarjeta.value,
      { onlySelf: true });
    this.aceptar();
  }

  protected subscribeToControlChanges() {
    this.subscribeCambioTipoDocumento();
  }

  subscribeCambioTipoDocumento() {
    const tipoDocumento = this.form.get('documentoPorte.tipoDocumentoPorte');

    if (tipoDocumento) {
      tipoDocumento.valueChanges
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((tipo: TipoDocumentoPorte) => {
          this.tipoDocumentoSeleccionado = tipo;
          const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
          const nroDocPorteInf = this.form.get('documentoPorte.numeroDocumentoPorteInf');
          if (tipo && tipo.mascara && (!this.idMovimiento || this.idMovimiento > 0)) {
              if (nroDocPorte && (nroDocPorte.value || nroDocPorte.value === '' || nroDocPorte.value == null)) {
                this.validacionesNroPorte(nroDocPorte, tipo.mascara.length);
              }
              if (nroDocPorteInf && (nroDocPorteInf.value || nroDocPorteInf.value === '')) {
                this.validacionesNroPorte(nroDocPorteInf, tipo.mascara.length);
              }
            this.setTipoDocumentoPorteRegex();
            this.setMascara();
            this.comportamientoAfip();
          }
        });
    }
  }
  protected comportamientoAfip() { }

  protected setMascara() {
    const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (nroDocPorte && nroDocPorte.value && this.tipoDocPorteRegex) {
      const numeroSinMascara = nroDocPorte.value.replace(/[-]/, '');
      const numeroDoc = conformToMask(
        numeroSinMascara,
        this.tipoDocPorteRegex,
        { guide: false }
      );
      this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, numeroDoc.conformedValue, { onlySelf: true });
       this.fcService.setValue(`documentoPorte.numeroDocumentoPorteInf`, numeroDoc.conformedValue, { onlySelf: true });
    }
  }

  private setTipoDocumentoPorteRegex() {
    this.tipoDocPorteRegex = [];
    for (const char of this.tipoDocumentoSeleccionado.mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
  }

  private determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
    }
  }

  private calcularkilosNeto(): void {
    const kilosTara = this.form.get('datosDocumento.kilosBrutosTaraGroup.kilosTara');
    const kilosBruto = this.form.get('datosDocumento.kilosBrutosTaraGroup.kilosBruto');
    if (kilosTara && kilosBruto &&
      kilosTara.value != null && kilosTara.value !== undefined &&
      kilosBruto.value != null && kilosBruto.value !== undefined) {
      this.fcService.setValue('datosDocumento.kilosNeto', +kilosBruto.value - +kilosTara.value, { onlySelf: true });
    }
  }

  private subscribeToBrutoTaraChanges() {
    const kilosTara = this.form.get('datosDocumento.kilosBrutosTaraGroup.kilosTara');
    if (kilosTara) {
      kilosTara.valueChanges.pipe(takeUntil(this.onDestroy))
        .subscribe(value => this.determinarKilosNeto(value));
    }
    const kilosBruto = this.form.get('datosDocumento.kilosBrutosTaraGroup.kilosBruto');
    if (kilosBruto) {
      kilosBruto.valueChanges.pipe(takeUntil(this.onDestroy))
        .subscribe(value => this.determinarKilosNeto(value));
    }
  }

  protected datosDejarPendienteValidos(sup = false): boolean {
    const tipoDocPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
    const nroDocPorte = sup ? this.form.get('documentoPorte.numeroDocumentoPorte') :
      this.form.get('documentoPorte.numeroDocumentoPorteInf');
    if (tipoDocPorte && tipoDocPorte.invalid) {
      this.popupService.error(Resources.Messages.ElTipoDocumentoPorteEsObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }
    if (nroDocPorte && nroDocPorte.invalid) {
      this.popupService.error(Resources.Messages.ElNumeroDocumentoPorteEsObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }
    return true;
  }

  validacionesNroPorte(control: AbstractControl, limites: number) {
    control.clearValidators();
    control.setValidators([Validators.required,
    Validators.maxLength(limites),
    Validators.minLength(limites)]);
    control.updateValueAndValidity();
  }
}
