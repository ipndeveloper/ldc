import { OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { conformToMask } from 'text-mask-core';
import * as HttpStatus from 'http-status-codes';

import { Terminal } from '../../../shared/data-models/terminal';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { tiposProducto, TipoProducto } from '../../../shared/data-models/tipo-producto';
import { MovimientoCargaService } from './services/movimiento-carga.service';
import { Collection } from '../../../core/models/collection';
import { Resources } from '../../../../locale/artifacts/resources';
import { AuthService } from '../../../core/services/session/auth.service';
import { TipoDocumentoPorte } from '../data-models/tipo-documento-porte';
import { CircuitoService } from '../services/circuito.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { ModalAsignarTarjetaComponent } from '../modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { Actividades, TiposMovimiento, TiposTransporte, Caracteristicas, Operaciones } from '../../../shared/enums/enums';
import { MovimientoCarga } from '../../../shared/data-models/movimiento-carga';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../validators/fecha.validator';

export abstract class ControlarCargaBaseComponent<TOutput extends MovimientoCarga,
  TBaseCommand,
  TCreateCommand extends TBaseCommand,
  TUpdateCommand extends TBaseCommand>
  implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  disableAcceptButton = false;
  isLoading = false;
  protected onDestroy = new Subject();
  tipoDocPorteRegex: Array<any>;
  esConsulta = false;
  idMovimiento: number;
  idViaje: number;
  idActividad: number;
  idTipoTransporte: number;
  terminal: Terminal;
  esNavegacion: boolean;
  tipoProductoSeleccionada: TipoProducto;
  movimientoCarga: TOutput;
  GestionarControlPath = 'GestionarControl';
  CurrentPath: string;
  tipoDocumentoSeleccionado: TipoDocumentoPorte;
  circuito: Circuito;
  tipoTransporte: TipoTransporte;
  datosDocumentoCarga: FormGroup;
  esFueraCircuito: boolean;
  esContinuar = false;

  @ViewChild('modalAsignarTarjeta') modalAsignarTarjeta: ModalAsignarTarjetaComponent;

  get esModificacionOConsultaMovimiento() {
    return this.esModificacionMovimiento || this.idMovimiento ||
      this.idActividad === Actividades.ModificarControlIngreso;
  }

  get esModificacionFueraDePuesto() {
    return this.idActividad === Actividades.ModificarControlFueraPuesto;
  }

  get esModificacionMovimiento() {
    return this.esModificacionFueraDePuesto || this.esFueraCircuito;
  }

  get productoImputaStock() {
    if (this.movimientoCarga) {
      return this.movimientoCarga.producto.imputaStock;
    }
    return false;
  }

  get movimientoSanExitoso() {
    if (this.movimientoCarga) {
      return this.movimientoCarga.idInterfazSan !== null ? true : false;
    }
    return false;
  }

  constructor(protected readonly movimientoCargaService: MovimientoCargaService<TOutput,
    TBaseCommand,
    TCreateCommand,
    TUpdateCommand>,
    protected readonly circuitoService: CircuitoService,
    protected readonly popupService: PopupService,
    protected readonly navigationService: NavigationService,
    protected readonly fcService: FormComponentService,
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit() {
    this.createForm();
    this.subscribeCambioTipoDocumento();
    this.subscribeNavigation();
  }

  ngAfterViewInit(): void {
    this.setDatosDocumentoForm();
    this.setChildFormControl();
    setTimeout(() => this.setFocus(), 0);
  }

  protected abstract setFocus(): void;
  protected abstract mapControlsToCommand(): TBaseCommand;

  protected subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((params) => {
        if (params['idViaje'] || params['idMovimiento']) {
          this.esNavegacion = true;
          this.esConsulta = params['esModificacion'] === 'false';
          this.idViaje = params['idViaje'];
          this.idMovimiento = params['idMovimiento'];
          this.esFueraCircuito = params['esFueraCircuito'] === 'true';
          if (params['idTipoProducto']) {
            const tipoProductoEnviadoPorNavegacion = tiposProducto.find(p => p.id === Number(params['idTipoProducto']));
            if (tipoProductoEnviadoPorNavegacion) {
              this.tipoProductoSeleccionada = tipoProductoEnviadoPorNavegacion;
            }
            if (params['idActividad']) {
              this.idActividad = +params['idActividad'];
              this.getCircuito();
            }
          } else {
            this.disableAcceptButton = true;
            this.popupService.error(Resources.Messages.ElTipoProductoSeEncuentraDeshabilitadoONoEstaParametrizado,
              Resources.Labels.Error,
              { timeOut: 10000 });
          }
          this.tipoTransporte = new TipoTransporte(TiposTransporte.Camion);
          this.getData();
        }
      });
  }

  protected abstract setDatosDocumentoForm(): void;

  private setChildFormControl() {
    this.form.setControl('datosDocumento', this.datosDocumentoCarga);
  }

  protected getCircuito(): void {
    this.isLoading = true;
    this.circuitoService.getCircuito(TiposMovimiento.Carga, TiposTransporte.Camion, this.tipoProductoSeleccionada.id, [this.idActividad])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.disableAcceptButton = false;
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
        this.completarCircuitoDeMovimiento();
        this.loadCircuito();
        this.isLoading = false;
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.status === HttpStatus.NOT_FOUND) {
          this.disableAcceptButton = true;
          this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
            Resources.Labels.Error,
            { timeOut: 10000 });
        }
      });
  }

  protected getData(): void {
    if (this.esModificacionOConsultaMovimiento) {
      this.buscarMovimiento();
    } else {
      this.buscarViaje();
    }
  }

  private buscarMovimiento() {
    this.isLoading = true;
    this.movimientoCargaService.get(this.idMovimiento)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((movimientoCarga: TOutput) => {
        this.movimientoCarga = movimientoCarga;
        this.loadDatosMovimiento();
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  private buscarViaje() {
    this.isLoading = true;
    this.movimientoCargaService.getViajeCarga(this.idViaje)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((movimientoCarga: TOutput) => {
        this.movimientoCarga = movimientoCarga;
        this.completarCircuitoDeMovimiento();
        if (this.movimientoCarga.tipoDocumentoPorte) {
          this.fcService.setValue('documentoPorte.numeroDocumentoPorte', this.movimientoCarga.nroDocumentoPorte);
          this.fcService.setValue('documentoPorte.tipoDocumentoPorte', this.movimientoCarga.tipoDocumentoPorte);
        }
        if (this.movimientoCarga.productoHabilitadoTerminal !== true) {
          this.disableAcceptButton = true;
          this.popupService.error(Resources.Messages.ElProductNoSeEncuentraHabilitadoParaEstaTerminal,
            Resources.Labels.Error,
            { timeOut: 10000 });
        }
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      });
  }

  private completarCircuitoDeMovimiento() {
    if (this.circuito && this.movimientoCarga) {
      this.movimientoCarga.circuito = this.circuito;
    }
  }

  protected createForm(): void {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: Resources.Labels.Carga, disabled: true },
        tipoTransporte: { value: Resources.Labels.Camion, disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: '', disabled: true }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]]
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: ['', Validators.required],
        numeroDocumentoPorte: [{ value: '', disabled: false }, {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
        fechaEntrada: { value: '', disabled: true },
        fechaSalida: { value: '', disabled: true },
      })
    });
    this.fcService.initialize(this.form);
  }

  private loadCircuito(): void {
    const terminal = this.form.get('circuito.terminal');
    const tipoProducto = this.form.get('circuito.tipoProducto');
    if (terminal && tipoProducto) {
      terminal.setValue(this.terminal.descripcion);
      tipoProducto.setValue(this.tipoProductoSeleccionada.descripcion);
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private loadDatosMovimiento(): void {
    this.fcService.setValue(`circuito.tipoMovimiento`, this.movimientoCarga.tipoMovimiento.descripcion, { onlySelf: true });
    this.fcService.setValue(`circuito.terminal`, this.terminal.descripcion, { onlySelf: true });
    this.fcService.setValue(`circuito.tipoProducto`, this.movimientoCarga.tipoProducto.descripcion, { onlySelf: true });
    this.fcService.setValue(`circuito.tipoTransporte`, this.movimientoCarga.tipoTransporte.descripcion, { onlySelf: true });
    this.fcService.setValue('documentoPorte.numeroDocumentoPorte', this.movimientoCarga.nroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue('documentoPorte.tipoDocumentoPorte', this.movimientoCarga.tipoDocumentoPorte, { onlySelf: true });

    if (this.esFueraCircuito) {
      this.fcService.setValue('fechaPeriodoStockSan.fechaStock',
        this.movimientoCarga.fechaStockSan, { onlySelf: true }, !(this.productoImputaStock && this.movimientoSanExitoso));
      this.fcService.setValue('documentoPorte.fechaEntrada', this.movimientoCarga.fechaEntrada, { onlySelf: true });
      this.fcService.setValue('documentoPorte.fechaSalida', this.movimientoCarga.fechaSalida, { onlySelf: true });
    }
    const tipoProducto = tiposProducto.find(p => p.id === this.movimientoCarga.tipoProducto.id);
    if (tipoProducto) {
      this.tipoProductoSeleccionada = tipoProducto;
    }
  }

  public onClickAceptar(): void {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      if (this.esModificacionMovimiento) {
        const command = this.mapControlsToCommand() as TUpdateCommand;
        this.saveEditMovement(command);
      } else {
        this.abrirModalTarjeta();
      }
    } else {
      this.esContinuar = false;
    }
  }

  public onClickAceptarYContinuar(): void {
    this.esContinuar = true;
    this.popupService.confirmOk(() => {
      this.onClickAceptar();
    });
  }

  private saveEditMovement(command: TUpdateCommand): void {
    if (this.esModificacionFueraDePuesto) {
      this.saveEditItem(this.movimientoCargaService.updateFueraDePuesto(command));
    } else {
      this.saveEditItem(this.movimientoCargaService.updateFueraDeCircuito(command));
    }
  }

  abrirModalTarjeta(): void {
    const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) && !numeroTarjeta) {
      this.modalAsignarTarjeta.abrir();
    } else {
      this.saveNewItem(this.mapControlsToCommand() as TCreateCommand);
    }
  }

  onTarjetaAsignada(): void {
    this.fcService.setValue('datosDocumento.tarjeta',
      this.modalAsignarTarjeta.asignarTarjetaForm.controls.numeroTarjeta.value, { onlySelf: true });
    this.saveNewItem(this.mapControlsToCommand() as TCreateCommand);
  }

  public onClickCancelar(): void {
    if (this.esConsulta) {
      this.isLoading = true;
      this.navigateToPreviousPath();
    } else {
      this.popupService.confirmOk(() => {
        this.isLoading = true;
        this.popupService.warning(Resources.Messages.SeCanceloElIngresoDeLaCarga, Resources.Labels.Cancelar);
        this.navigateToPreviousPath();
      }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
    }
  }

  private navigateToPreviousPath(): void {
    setTimeout(() => this.navigationService.navigateBack(), 1000);
  }

  protected saveNewItem(command: TCreateCommand): void {
    this.runAction(this.movimientoCargaService.create(command),
      Resources.Messages.LaNuevaCargaFueGuardadaConExito,
      Resources.Labels.Agregar);
  }

  protected saveEditItem(service: Observable<number>): void {
    this.runAction(service,
      Resources.Messages.LaEdicionDeLaCargaFueGuardadaConExito,
      Resources.Labels.Modificar);
  }

  protected runAction(action: Observable<number>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    action.pipe(
      takeUntil(this.onDestroy)
    ).subscribe((commandResponse: number) => {
      this.popupService.success(messageSuccess, titleSuccess);
      if (this.esContinuar) {
        this.esContinuar = !this.esContinuar;
        this.idMovimiento = commandResponse;
        this.navigationService.navigateByMovement(commandResponse, this.CurrentPath, this.setNavigationExtras());
      } else {
        this.navigateToPreviousPath();
      }
    }, (error: HttpErrorResponse) => {
      if (error.error && error.error.data && error.error.data.validationData) {
        const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
        if (numeroTarjeta && error.error.data.validationData[numeroTarjeta]) {
          this.fcService.setValue(`datosDocumento.tarjeta`, '');
        }
      }
      this.esContinuar = false;
      this.isLoading = false;
    });
  }

  private setNavigationExtras(): NavigationExtras {
    return  { queryParams: {
        'idMovimiento' : this.idMovimiento,
        'operacion' : Operaciones.Alta
      }
    };
  }

  protected subscribeCambioTipoDocumento() {
    const tipoDocumento = this.form.get('documentoPorte.tipoDocumentoPorte');
    if (tipoDocumento) {
      tipoDocumento.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((tipo: TipoDocumentoPorte) => {
        this.tipoDocumentoSeleccionado = tipo;
        this.setMascaraPorTipoDocPorte();
        this.consultaRegimen();
      });
    }
  }

  protected setMascaraPorTipoDocPorte(): void {
    const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (this.tipoDocumentoSeleccionado && this.tipoDocumentoSeleccionado.mascara && nroDocPorte) {
      this.setTipoDocumentoPorteRegex();
      nroDocPorte.clearValidators();
      nroDocPorte.setValidators([Validators.maxLength(this.tipoDocumentoSeleccionado.mascara.length),
      Validators.minLength(this.tipoDocumentoSeleccionado.mascara.length),
      Validators.required]);
      this.setMascara();
    }
  }

  protected setMascara(): void {
    const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (nroDocPorte && nroDocPorte.value && this.tipoDocPorteRegex) {
      const numeroSinMascara = nroDocPorte.value.replace(/[-]/, '');
      const numeroDoc = conformToMask(
        numeroSinMascara,
        this.tipoDocPorteRegex,
        { guide: false }
      );
      nroDocPorte.setValue(numeroDoc.conformedValue);
    }
  }

  private setTipoDocumentoPorteRegex(): void {
    this.tipoDocPorteRegex = [];
    for (const char of this.tipoDocumentoSeleccionado.mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
  }

  consultaRegimen() {
  }
}
