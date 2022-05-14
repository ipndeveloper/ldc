import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as HttpStatus from 'http-status-codes';

import { MovimientoControlSalida } from '../../shared/data-models/movimiento-control-salida';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { PopupService } from '../../core/services/popupService/popup.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { Actividades, Caracteristicas, TiposProducto, EstadosMovimiento, TiposTransporte, Acciones, ComportamientoAfip } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { ControlarSalidaService } from './controlar-salida.service';
import { RegistrarSalidaConDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-con-descarga-command';
import { RegistrarSalidaSinDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-sin-descarga-command';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { ChecklistControlPatrimonialService } from '../checklist-control-patrimonial/checklist-control-patrimonial.service';
import { ModalChecklistControlPatrimonialComponent } from './modal-checklist-control-patrimonial/modal-checklist-control-patrimonial.component';
import { RegistrarSalidaConCargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-con-carga-command';
import { EntitiesTiposMovimiento } from '../../shared/data-models/tipo-movimiento';
import { DatosMovimientoControlSalidaComponent } from './datos-movimiento-control-salida/datos-movimiento-control-salida.component';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { AuthService } from '../../core/services/session/auth.service';
import { Terminal } from '../../shared/data-models/terminal';
import { ModalConfirmarImpresionComponent } from '../shared/modals/modal-confirmar-impresion/modal-confirmar-impresion.component';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { searchValidator } from '../../core/shared/super/search.validator';
import { Collection } from '../../core/models/collection';

@Component({
  selector: 'yrd-controlar-salida',
  templateUrl: './controlar-salida.component.html',
  styleUrls: ['./controlar-salida.component.css'],
  providers: [ControlarSalidaService]
})
export class ControlarSalidaComponent implements OnInit, OnDestroy {

  @ViewChild('datosMovimiento') datosMovimientoComponent: DatosMovimientoControlSalidaComponent;
  @ViewChild('modalConfirmacionRechazo') modalConfirmacionRechazo: ModalComponent;
  @ViewChild('modalProvinciaLocalidadDistintas') modalProvinciaLocalidadDistintas: ModalComponent;
  @ViewChild('modalChecklistControlPatrimonial') ModalChecklistControlPatrimonial: ModalChecklistControlPatrimonialComponent;
  @ViewChild('modalConfirmarImpresionRemito') ModalConfirmarImpresionRemito: ModalConfirmarImpresionComponent;
  @ViewChild('modalConfirmarImpresionCPE') ModalConfirmarImpresionCPE: ModalConfirmarImpresionComponent;

  controlarSalidaForm: FormGroup;
  movimiento: MovimientoControlSalida;
  circuito: Circuito;
  disableRechazonConCTG = true;
  disableRechazoSinCTG = true;
  ImprimeEnReimpresionRemito = false;
  ImprimeEnReimpresionCPE = false;
  disableCerrarCircuitoPorRechazo = true;
  DeseaConfirmarLaPlantaSeleccionada = Resources.Messages.DeseaConfirmarLaPlantaSeleccionada;
  deseaConfirmarEstaAccionMessage = Resources.Messages.DeseaConfirmarEstaAccion;
  localidadProvinciaIngresadasDistintasAOrdenCargaMessage = Resources.Messages.localidadProvinciaIngresadasDistintasAOrdenCarga;
  checklistControlPatrimonialMessage = Resources.Messages.ChecklistControlPatrimonial;
  disableButtons: boolean;
  rechazarConCTG: boolean;
  subscription: Subscription;
  esDescargaExitosa = false;
  esCarga = false;
  confirmarImpresionRemito = false;
  esCartaPorte = false;
  private esContinuar = false;
  basePath = 'ControlarSalida';
  modalRemitoAbierto = false;
  modalCPEAbierto = false;
  terminal: Terminal;
  maximo = 12;
  esAutomatica = false;
  tipoDocPorteRegex: Array<any> = [];
  readonly deseaImprimirElDocumentoEnEsteMomento = Resources.Messages.DeseaImprimirElDocumentoEnEsteMomento;
  private onDestroy = new Subject();
  private destroyedByNavigation = false;
  private esNavegacion = false;
  esRegimenElectronico = false;
  falloAfip = false;
  largoNroPorte = 14;
  cuit = 0;

  constructor(private readonly fb: FormBuilder,
    private readonly formComponentService: FormComponentService,
    private readonly popupService: PopupService,
    private readonly circuitoService: CircuitoService,
    private readonly controlarSalidaService: ControlarSalidaService,
    private readonly checklistCPService: ChecklistControlPatrimonialService,
    protected readonly commandService: CommandService,
    private readonly dispositivoService: DispositivoService,
    private readonly navigationService: NavigationService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
    private readonly authService: AuthService) {
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit() {
    this.consultarEstadoWsAfip();
    this.createForm();
    this.setEnableCorredorVendedor();
    this.subscribeNavigation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.aceptar();
        break;
      case 'Cancelar':
        this.cancelar();
        break;
    }
  }

  private createForm() {
    this.controlarSalidaForm = this.fb.group({
      filtroMovimiento: this.fb.group({
        patenteCamion: [''],
        tarjeta: [''],
        sinTarjeta: [false],
        tipoTransporte: [''],
        numeroVagon: ['']
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        ctg: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        nroCupo: { value: '', disabled: true },
        titular: { value: '', disabled: true },
        vendedor: { value: '', disabled: true },
        entregador: { value: '', disabled: true },
        patente: { value: '', disabled: true },
        turnoPlaya: { value: '', disabled: true },
        fechaHoraEntrada: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        numeroVagon: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        numeroViaje: { value: '', disabled: true },
        numeroTramiteCOT: { value: '', disabled: true },
        numeroCOT: [{ value: '', disabled: true }, [Validators.min(1)]],
        numeroCTG: [{ value: '', disabled: true }],
        codigoCupo: [{ value: '', disabled: true }, [Validators.maxLength(30)]],
        observaciones: [{ value: '', disabled: true }],
        numeroDocumentoPorte: [{ value: '', disabled: this.esAutomatica }],
        planta: [{ value: '', disabled: false }],
        corredorVendedor: [undefined, searchValidator()],
        establecimientoDestinoRazonSocial: { value: '', disabled: true },
        destinatarioRazonSocial: { value: '', disabled: true },
      }),
      modalImprimeRemito: this.fb.group({
        impresora: this.fb.control('')
      }),
      modalImprimeCPE: this.fb.group({
        impresora: this.fb.control('')
      })
    });

    this.formComponentService.initialize(this.controlarSalidaForm);
    this.disableButtons = true;
  }

  completeDataControlSalida(movimiento: MovimientoControlSalida | null) {
    if (movimiento) {
      if (!this.esNavegacion) {
        this.navigationService.clearPathCache();
      }
      this.completeCircuito(movimiento).pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.completeMovimiento(movimiento);
        if (this.movimiento) {
          if (!this.esCarga) {
            this.esDescargaExitosa = this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaConDescarga);
          } else if (this.esRegimenElectronico) {
            if (movimiento.idImpresoraDefault) {
              this.formComponentService.setValue('modalImprimeCPE.impresora', { id: movimiento.idImpresoraDefault });
            }
          } else if (this.confirmarImpresionRemito) {
            if (movimiento.idImpresoraDefault) {
              this.formComponentService.setValue('modalImprimeRemito.impresora', { id: movimiento.idImpresoraDefault });
            }
            setTimeout(() => this.datosMovimientoComponent.observaciones.setFocus(), 0);
          }
          this.setEnableRechazoConCTG();
          this.setEnableRechazoSinCTG();
          this.setEnableCerrarCircuitoPorRechazo();
          this.setEnableFiltroBusqueda(false);
          this.disableButtons = false;
        }
      });
      if (movimiento && movimiento.establecimientoDestino && movimiento.establecimientoDestino.trim() !== '') {
        // tslint:disable-next-line: radix
        this.cuit = parseInt(movimiento.establecimientoDestino.trim());
      }
    } else {
      this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
    }
  }

  private consultarEstadoWsAfip() {
    this.dispositivoService.consultarAccion(Acciones.WSAFIP).subscribe(result => {
      this.esAutomatica = result.esAutomatica;
    });
  }

  private completeCircuito(movimiento: MovimientoControlSalida) {
    const idsActividad = [Actividades.RegistrarSalidaConDescarga, Actividades.RegistrarSalidaSinDescarga,
    Actividades.RegistrarSalidaConCarga, Actividades.RegistrarSalidaSinCarga];
    return this.circuitoService.getCircuitoByIdByIdsActividad(movimiento.circuito.id, idsActividad)
      .pipe(
        takeUntil(this.onDestroy),
        map(datos => {
          this.circuito = new Circuito();
          const nroPorte = this.formComponentService.getControl('datosMovimiento.numeroDocumentoPorte');
          const CTG = this.formComponentService.getControl('datosMovimiento.numeroCTG');

          Object.assign(this.circuito, datos);
          if (this.circuito.idTipoMovimiento === EntitiesTiposMovimiento.Carga.id) {
            this.esCarga = true;
            if (nroPorte && CTG) {
              this.manipulacionControl(nroPorte, {
                clearValidaciones: true,
                validaciones: [
                  Validators.required,
                  Validators.maxLength(this.largoNroPorte),
                  Validators.minLength(this.largoNroPorte)]
              });
              this.manipulacionControl(CTG, {
                clearValidaciones: true,
                validaciones: [
                  Validators.required,
                  Validators.maxLength(this.maximo),
                  Validators.minLength(this.maximo - 1),
                  Validators.pattern('[0-9][0-9]{10,12}')
                ]
              });
              setTimeout(() => {
                if (!this.esRegimenElectronico) {
                  this.maximo = 8;
                  this.manipulacionControl(nroPorte, { clearValidaciones: true, });
                  this.manipulacionControl(CTG, { clearValidaciones: true,   validaciones: [
                    Validators.required,
                    Validators.maxLength(this.maximo),
                    Validators.minLength(this.maximo)
                  ]});
                }
              }, 1500);
            }
            if (movimiento.estado.id === EstadosMovimiento.AptoControlSalida) {
              this.confirmarImpresionRemito = this.circuito.debeActivarCaracteristica([Caracteristicas.ImprimirRemitoPreimpreso]);
              this.esCartaPorte = this.circuito.debeActivarCaracteristica([Caracteristicas.ImprimirCartaPorte]);
            }
          } else {
            if (nroPorte && CTG) {
              this.manipulacionControl(nroPorte, { clearValidaciones: true, });
              this.manipulacionControl(CTG, { clearValidaciones: true, });
            }
          }
        })
      );
  }

  private completeMovimiento(movimiento: MovimientoControlSalida) {
    if (!this.validarMovimiento(movimiento)) {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaAlgunaActividad);
      return;
    }
    this.movimiento = movimiento;
    if (movimiento && movimiento.tipoDocumentoPorte) {
      this.setTipoDocumentoPorteRegex(movimiento.mascara);
      this.obtenerRegimenDocumento();
    }
  }

  private obtenerRegimenDocumento() {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(this.movimiento.tipoDocumentoPorte.id)
      .subscribe(IdRegimenTipoDoc => {
        this.esRegimenElectronico = IdRegimenTipoDoc === ComportamientoAfip.RegimenElectronico;
        this.maximo = this.esRegimenElectronico ? 12 : 8;
        this.setEnableCorredorVendedor();
        this.setEnablePlanta();
    });
  }

  private validarMovimiento(movimiento: MovimientoControlSalida): boolean {
    return this.circuito.validarMovimiento(movimiento);
  }

  private setEnableRechazoConCTG() {
    if (!this.esCarga) {
      this.disableRechazonConCTG = !this.circuito.debeActivarCaracteristica([Caracteristicas.ConRechazoCTG]);
    }
  }

  private setEnableCerrarCircuitoPorRechazo() {
    this.disableCerrarCircuitoPorRechazo = !this.circuito.debeActivarCaracteristica([Caracteristicas.SinRechazoCTG]);
  }

  private setEnableRechazoSinCTG() {
    if (!this.esCarga) {
      this.disableRechazoSinCTG = !this.circuito.debeActivarCaracteristica([Caracteristicas.SinRechazoCTG]);
    }
  }

  private setEnableCorredorVendedor(): void {
    const debeHabilitarCorredorVendedor = this.esRegimenElectronico &&
                                          (this.movimiento.intermediario.id !== 0 ||
                                          this.movimiento.remitenteComercial.id !== 0) &&
                                          this.esAutomatica;
    const corredorVendedorCtrl = this.formComponentService.getControl('datosMovimiento.corredorVendedor');
    if (corredorVendedorCtrl) {
      this.formComponentService.setValue('datosMovimiento.corredorVendedor', undefined, { onlySelf: true }, !debeHabilitarCorredorVendedor);
      corredorVendedorCtrl.setValidators(Validators.required);
    }
  }

  private setEnablePlanta(): void {
    const debeHabilitarPlanta = this.esRegimenElectronico &&
                                !this.falloAfip && this.esAutomatica;
    const plantaCtrl = this.formComponentService.getControl('datosMovimiento.planta');
    if (plantaCtrl) {
      debeHabilitarPlanta ? plantaCtrl.enable() : plantaCtrl.disable();
      debeHabilitarPlanta ? plantaCtrl.setValidators(Validators.required) : plantaCtrl.disable();
    }
  }

  private setEnableFiltroBusqueda(enable: boolean) {
    enable ? this.controlarSalidaForm.controls.filtroMovimiento.enable() : this.controlarSalidaForm.controls.filtroMovimiento.disable();
  }

  aceptarContinuar() {
    this.esContinuar = true;
    this.aceptar();
  }

  aceptar() {
    if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaConDescarga)) {
      const command = this.mapControlsToRegistrarSalidaConDescargaCommand();
      this.controlarSalidaService.registrarSalidaConDescarga(command).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.popupService.success(Resources.Messages.RegistroSalidaConDescargaGuardado, Resources.Labels.Aceptar, { timeOut: 30000 });
          if (this.esContinuar) {
            this.continuar();
          } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
            this.destroyedByNavigation = true;
            setTimeout(() => this.navigationService.navigateBackToSource(), 1500);
          }
          this.resetForm();
        });
    } else if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaConCarga)) {
      if (this.controlarSalidaForm.invalid) {
        const errors = new Collection<string>();
        this.formComponentService.validateForm(this.controlarSalidaForm.controls, errors, '');
        this.formComponentService.showValidationError(errors);
        return;
      }
      this.registraSalidaConCargaMapControls();
    } else {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaControlSalidaExitoso);
    }
  }

  private continuar(): void {
    this.esContinuar = !this.esContinuar;
    if (this.movimiento) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'idMovimiento': this.movimiento.id
        }
      };
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateByMovement(this.movimiento.id, this.basePath, navigationExtras), 1000);
    }
  }

  private ErrorhabilitarCargaManual() {
    this.falloAfip = true;
    this.formComponentService.enableControl('datosMovimiento.numeroCTG');
    this.formComponentService.enableControl('datosMovimiento.numeroDocumentoPorte');
    this.formComponentService.disableControl('datosMovimiento.corredorVendedor');
    this.formComponentService.resetForm('datosMovimiento.corredorVendedor');
    this.formComponentService.disableControl('datosMovimiento.planta');
    this.formComponentService.resetForm('datosMovimiento.planta');
  }

  private mapControlsToRegistrarSalidaConDescargaCommand(): RegistrarSalidaConDescargaCommand {
    const idMovimiento = this.movimiento.id;
    const command = new RegistrarSalidaConDescargaCommand(idMovimiento);
    command.sinTarjeta = this.formComponentService.getValue('filtroMovimiento.sinTarjeta');
    return command;
  }

  private mapControlsToRegistrarSalidaConCargaCommand(): RegistrarSalidaConCargaCommand {
    const idMovimiento = this.movimiento.id;
    const command = new RegistrarSalidaConCargaCommand(idMovimiento);
    command.sinTarjeta = this.formComponentService.getValue('filtroMovimiento.sinTarjeta');
    command.imprimeEnReimpresion = this.ImprimeEnReimpresionRemito;

    if (this.esRegimenElectronico) {
      command.observaciones = this.formComponentService.getValue('datosMovimiento.observaciones');
      command.idImpresora = this.formComponentService.getValue('modalImprimeCPE.impresora');
      command.idCorredorVendedor = Number(this.formComponentService.getValue('datosMovimiento.corredorVendedor'));
      command.nroDocumento = this.formComponentService.getValue('datosMovimiento.numeroDocumentoPorte');
      command.imprimeEnReimpresionCPE = this.ImprimeEnReimpresionCPE;
      this.obtenerValuePlanta(command);
    } else if (this.confirmarImpresionRemito || this.esCartaPorte) {
      command.observaciones = this.formComponentService.getValue('datosMovimiento.observaciones');
      command.idImpresora = this.formComponentService.getValue('modalImprimeRemito.impresora');
    }
    if (this.movimiento.tipoProducto.id === TiposProducto.Cereal) {
      command.numeroCTG = Number(this.formComponentService.getValue('datosMovimiento.numeroCTG'));
      command.codigoCupo = this.formComponentService.getValue('datosMovimiento.codigoCupo');
      command.numeroTramiteCOT = null;
    }

    command.numeroTramiteCOT = this.formComponentService.getValue('datosMovimiento.numeroTramiteCOT');
    command.numeroCOT = this.formComponentService.getValue('datosMovimiento.numeroCOT');
    return command;
  }

  obtenerValuePlanta(command: RegistrarSalidaConCargaCommand) {
    const plantaCtrl = this.formComponentService.getControl('datosMovimiento.planta');
    if (plantaCtrl && plantaCtrl.value) {
      const planta = plantaCtrl.value;
      command.codLocalidadAfip = planta.codLocalidad;
      command.codProvinciaAfip = planta.codProvincia;
      command.nroPlantaAfip = planta.nroPlanta;
    }
  }

  rechazar(observaciones?: string) {
    const command = this.mapControlsToRegistrarSalidaSinDescargaCommand();
    command.observaciones = observaciones;
    if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaSinDescarga)) {
      this.controlarSalidaService.registrarSalidaSinDescarga(command).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.popupService.success(Resources.Messages.RegistroSalidaSinDescargaGuardado, Resources.Labels.Rechazar);
          if (this.esContinuar) {
            this.continuar();
          } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
            setTimeout(() => this.navigationService.navigateBackToSource(), 1000);
          }
          this.resetForm();
        });
    } else if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaSinCarga)) {
      this.controlarSalidaService.registrarSalidaSinCarga(command).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.popupService.success(Resources.Messages.RegistroSalidaSinCargaGuardado, Resources.Labels.Aceptar);
          if (this.esContinuar) {
            this.continuar();
          } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
            setTimeout(() => this.navigationService.navigateBackToSource(), 1000);
          }
          this.resetForm();
        }, (error: HttpErrorResponse) => {
          if (error.status === HttpStatus.BAD_GATEWAY) {
            if (this.movimiento.tipoProducto.id === TiposProducto.Cereal) {
              this.ErrorhabilitarCargaManual();
            }
          }
        });
    }
  }

  private mapControlsToRegistrarSalidaSinDescargaCommand(): RegistrarSalidaSinDescargaCommand {
    const idMovimiento = this.movimiento.id;
    const sinTarjeta = this.formComponentService.getValue('filtroMovimiento.sinTarjeta');
    return new RegistrarSalidaSinDescargaCommand(idMovimiento, this.rechazarConCTG, sinTarjeta);
  }

  openConfirmacionRechazo(rechazarConCTG: boolean) {
    this.rechazarConCTG = rechazarConCTG;
    if (this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaSinDescarga)
      || this.circuito.validarMovimientoActividad(this.movimiento, Actividades.RegistrarSalidaSinCarga)) {
      this.modalConfirmacionRechazo.open();
    } else {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaCerrarCircuitoPorRechazo);
    }
  }

  openChecklistControlPatrimonial() {
    this.checklistCPService.getMovimiento(null, this.movimiento.id).pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        if (!datos || datos.sinControlesPatrimoniales) {
          this.popupService.error(Resources.Messages.ElCamionIdentificadoNoTieneDefinidoUnChecklistDeControlPatrimonial);
        } else {
          this.ModalChecklistControlPatrimonial.open(datos.checklist);
        }
      });
  }

  cancelar() {
    if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
      this.destroyedByNavigation = true;
      this.navigationService.navigateBackToSource();
    }
    this.resetForm();
  }

  private resetForm() {
    this.setEnableFiltroBusqueda(true);
    this.maximo = 12;
    this.falloAfip = false;
    this.esDescargaExitosa = false;
    this.esCarga = false;
    this.disableButtons = true;
    this.disableRechazonConCTG = true;
    this.esNavegacion = false;
    this.esRegimenElectronico = false;
    this.esAutomatica = false;
    this.formComponentService.resetForm({ emitEvent: true });
    this.formComponentService.disableControl('datosMovimiento.numeroCTG');
    this.formComponentService.disableControl('datosMovimiento.numeroTramiteCOT');
    this.formComponentService.disableControl('datosMovimiento.numeroCOT');
    if (!this.terminal.utilizaTarjeta) {
      this.formComponentService.disableControl('filtroMovimiento.sinTarjeta');
      this.formComponentService.disableControl('filtroMovimiento.tarjeta');
    }
    this.consultarEstadoWsAfip();
  }

  confirmaImpresionRemito(confirma: boolean) {
    if (this.modalRemitoAbierto) {
      this.ImprimeEnReimpresionRemito = !confirma;
      this.registrarSalidaConCarga();
    }
  }

  confirmaImpresionCPE(confirma: boolean) {
    if (this.modalCPEAbierto) {
      this.ImprimeEnReimpresionCPE = !confirma;
      this.registrarSalidaConCarga();
    }
  }

  registraSalidaConCargaMapControls() {
    const command = this.mapControlsToRegistrarSalidaConCargaCommand();
    if (command.codLocalidadAfip && command.codProvinciaAfip &&
       (command.codLocalidadAfip !== parseInt(this.movimiento.codAfipLocalidadDestino, 10) ||
        command.codProvinciaAfip !== parseInt(this.movimiento.codAfipProvinciaDestino, 10))) {
      this.modalProvinciaLocalidadDistintas.open();
    } else {
      this.verificarImpresiones();
    }
  }

  public verificarImpresiones() {
    if (this.confirmarImpresionRemito && !this.esRegimenElectronico) {
      this.modalRemitoAbierto = true;
      this.ModalConfirmarImpresionRemito.open();
    } else if (this.esRegimenElectronico && !this.falloAfip && this.esAutomatica) {
      this.modalCPEAbierto = true;
      this.ModalConfirmarImpresionCPE.open();
    } else {
      this.registrarSalidaConCarga();
    }
  }

  public registrarSalidaConCarga() {
    const command = this.mapControlsToRegistrarSalidaConCargaCommand();

    this.controlarSalidaService.registrarSalidaConCarga(command).pipe(takeUntil(this.onDestroy))
        .subscribe(res => {
          const mensajeAmostrar = res && res.mensajeRepuesta ? res.mensajeRepuesta : '';
          this.popupService.success(Resources.Messages.RegistroSalidaConCargaGuardado + mensajeAmostrar,
            Resources.Labels.Aceptar, { timeOut: 30000 });
          if (this.esContinuar) {
            this.continuar();
          } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
            this.destroyedByNavigation = true;
            setTimeout(() => this.navigationService.navigateBackToSource(), 1500);
          }
          this.resetForm();
        }, (error: HttpErrorResponse) => {
          if (error.status === HttpStatus.BAD_GATEWAY) {
            if (this.movimiento.tipoProducto.id === TiposProducto.Cereal) {
              this.ErrorhabilitarCargaManual();
            }
          }
        });

  }

  private subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params.idMovimiento) {
          this.controlarSalidaService.getMovimientoControlSalidaPorIdMovimiento(params.idMovimiento)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(movimiento => {
              if (movimiento) {
                this.esNavegacion = true;

                setTimeout(() => {
                  const tipoTransporte: TiposTransporte = movimiento.patenteCamion ? TiposTransporte.Camion : TiposTransporte.Tren;
                  this.formComponentService.setValue(`filtroMovimiento.tipoTransporte`, { id: tipoTransporte }, { onlySelf: true });

                  if (movimiento.patenteCamion) {
                    this.formComponentService.setValue(`filtroMovimiento.patenteCamion`, movimiento.patenteCamion, { onlySelf: true });
                  } else {
                    this.formComponentService.setValue(`filtroMovimiento.numeroVagon`, movimiento.numeroVagon, { onlySelf: true });
                  }
                }, 0);

                if (this.terminal.utilizaTarjeta) {
                  this.formComponentService.setValue(`filtroMovimiento.tarjeta`, movimiento.nroTarjeta, { onlySelf: true });
                }
                this.completeDataControlSalida(movimiento);
              }
            });
        }
      });
  }

  private setTipoDocumentoPorteRegex(mascara: string) {
    this.largoNroPorte = mascara.length;
    for (const char of mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
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
