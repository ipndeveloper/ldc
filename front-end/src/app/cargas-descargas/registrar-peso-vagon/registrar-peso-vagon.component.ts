import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationExtras } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Circuito } from '../../shared/data-models/circuito/circuito';
import { MovimientoPesaje } from '../registrar-peso/movimiento-pesaje';
import { Terminal } from '../../shared/data-models/terminal';
import { Autorizacion } from '../shared/autorizacion/autorizacion';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { BusquedaMovimientoPesajeVagonComponent } from './busqueda-movimiento-pesaje-vagon/busqueda-movimiento-pesaje-vagon.component';
import { DatosPesajeComponent } from '../shared/datos-pesaje/datos-pesaje.component';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { AuthService } from '../../core/services/session/auth.service';
import { BusquedaMovimientoPesajeService } from '../registrar-peso/busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { RegistrarPesadaVagonService } from './registrar-pesada-vagon.service';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { Actividades, Caracteristicas, Acciones, TiposDispositivo, EstadosMovimiento, Operaciones } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { RegistrarPesajeVagonCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-pesaje-vagon-command';
import { PesoRegistrado } from '../registrar-peso/peso-registrado';
import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';

@Component({
  selector: 'yrd-registrar-peso-vagon',
  templateUrl: './registrar-peso-vagon.component.html',
  styleUrls: ['./registrar-peso-vagon.component.css']
})
export class RegistrarPesoVagonComponent implements OnInit, OnDestroy {
  registrarPesoForm: FormGroup;
  circuito: Circuito;
  movimiento?: MovimientoPesaje;
  esAutomatico = false;
  accionesHabilitadas: any[];
  pesaEntrada: boolean;
  LugarDescargaCargaActivado: boolean;
  esEntrada = true;
  terminal: Terminal;
  disableButtons = true;
  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  formComponentService: FormComponentService;
  subscription: Subscription;
  idAccion: number;
  protected readonly onDestroy = new Subject();
  @ViewChild('busquedaMovimiento') busquedaMovimientoPesaje: BusquedaMovimientoPesajeVagonComponent;
  @ViewChild('datosPesajeComponent') datosPesajeComponent: DatosPesajeComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @Input() balanza: DispositivoDataView;
  @Input() ordenBalanza: number;
  esContinuar = false;
  basePath = 'RegistrarPesoVagon';
  tarjeta = true;
  private esNavegacion = false;
  private destroyedByNavigation = false;

  get controls() {
    return this.registrarPesoForm.controls;
  }

  get pesosTomados(): FormArray {
    return this.registrarPesoForm.get('datosPesaje.pesosTomados') as FormArray;
  }

  readonly validationMessagesCondicionManipuleo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.LugarDescarga),
  };

  constructor(private readonly fb: FormBuilder,
              private readonly popupService: PopupService,
              private readonly movimientoPesajeService: BusquedaMovimientoPesajeService,
              private readonly movimientoService: MovimientoService,
              private readonly circuitoService: CircuitoService,
              private readonly registrarPesadaService: RegistrarPesadaVagonService,
              private readonly authService: AuthService,
              private readonly dispositivoService: DispositivoService,
              protected readonly commandService: CommandService,
              private readonly navigationService: NavigationService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    this.formComponentService = new FormComponentService(this.popupService);
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
  }

  ngOnInit() {
    this.createForm();
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
      case 'TomarPeso':
        this.datosPesajeComponent.tomarPeso();
        break;
      case 'IdentificarCamion':
        this.busquedaMovimientoPesaje.onClickIdentificarVagon();
        break;
    }
  }

  public setValue(controlName: string, value: any, options: any, disable?: boolean) {
    const control = this.registrarPesoForm.get(controlName);
    if (control) {
      control.patchValue(value, options);
      control.reset(value, options);
      control.setValue(value, options);
      if (disable === true) {
        control.disable();
      } else if (disable === false) {
        control.enable();
      }
    }
  }

  private completeCircuito() {
    if (this.movimiento) {
      const idActividad = this.movimiento.pesaEntrada ? Actividades.CapturarPesoBruto : Actividades.CapturarPesoTara;

      const idsActividad = [idActividad];
        this.circuitoService.getCircuitoByIdByIdsActividad(this.movimiento.idCircuito, idsActividad)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(datos => {
            this.circuito = new Circuito();
            Object.assign(this.circuito, datos);
            this.habilitarCaracteristicas();
          });
    }
  }

  habilitarCaracteristicas() {
    // Habilitación de lugar descarga/carga
    const lugarDescargaCarga = this.registrarPesoForm.get('lugarDescargaCarga');
    if (lugarDescargaCarga) {
      if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignaLugarDescargaCarga]) &&
      this.movimiento && this.movimiento.producto.imputaStock) {
        this.LugarDescargaCargaActivado = true;
        lugarDescargaCarga.enable();
      } else {
        this.LugarDescargaCargaActivado = false;
        lugarDescargaCarga.disable();
      }
    }
  }

  private createForm() {
    const utilizaTarjeta = (this.terminal) ? this.terminal.utilizaTarjeta : false;
    this.registrarPesoForm = this.fb.group({
      busquedaMovimiento: this.fb.group({
        numeroVagon: ['', Validators.required],
        tarjeta: [{value: '', disabled: !utilizaTarjeta}]
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        ctg: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        entregador: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        humedad: { value: '', disabled: true },
        proteina: { value: '', disabled: true },
        grado: { value: '', disabled: true }
      }),
      datosPesaje: this.fb.group({
        idMovimiento: { value: ''},
        brutoDocPorte: { value: '', disabled: true },
        taraDocPorte: { value: '', disabled: true },
        netoDocPorte: { value: '', disabled: true },
        kilosBruto: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(2147483647)])
        ],
        kilosTara: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(2147483647)])
        ],
        netoBalanza: { value: '', disabled: true },
        brutoDiferencia: { value: '', disabled: true },
        taraDiferencia: { value: '', disabled: true },
        netoDiferencia: { value: '', disabled: true },
        brutoEsRepesaje: { value: false, disabled: true },
        taraEsRepesaje: { value: false, disabled: true },
        entradaManualAutomatico: { value: '', disabled: true },
        salidaManualAutomatico: { value: '', disabled: true },
        pesosTomados: this.fb.array([]),
      }),
      lugarDescargaCarga:  [{value: '', disabled: true}, Validators.required]
    });

    this.subscribirseCambiosControles();
    this.formComponentService.initialize(this.registrarPesoForm);
  }

  private subscribirseCambiosControles() {
    this.suscribirseCambiosPesos();
  }

  private subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params.idMovimiento) {
          this.movimientoPesajeService.getMovimientoPesajeVagonById(params.idMovimiento)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(movimiento => {
              if (movimiento) {
                this.esNavegacion = true;
                this.formComponentService.setValue(`busquedaMovimiento.numeroVagon`, movimiento.numeroVagon, { onlySelf: true });
                if (this.terminal.utilizaTarjeta) {
                  this.formComponentService.setValue('busquedaMovimiento.tarjeta', movimiento.tarjeta);
                  if (movimiento.tarjeta === null || movimiento.tarjeta === undefined) {
                    this.formComponentService.setValue('busquedaMovimiento.sinTarjeta', true);
                  }
                }
                this.completarDatosMovimiento(movimiento);
              } else {
                this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
                this.busquedaMovimientoPesaje.setFocusTarjeta();
              }
            });
        }
      });
  }


  private suscribirseCambiosPesos() {
    const kilosBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const kilosTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const netoBalanza = this.registrarPesoForm.get('datosPesaje.netoBalanza');
    const brutoDocPorte = this.registrarPesoForm.get('datosPesaje.brutoDocPorte');
    const taraDocPorte = this.registrarPesoForm.get('datosPesaje.taraDocPorte');
    const netoDocPorte = this.registrarPesoForm.get('datosPesaje.netoDocPorte');
    const brutoDiferencia = this.registrarPesoForm.get('datosPesaje.brutoDiferencia');
    const taraDiferencia = this.registrarPesoForm.get('datosPesaje.taraDiferencia');
    const netoDiferencia = this.registrarPesoForm.get('datosPesaje.netoDiferencia');

    if (kilosBruto && kilosTara && netoBalanza
        && brutoDocPorte && taraDocPorte && netoDocPorte
        && brutoDiferencia && taraDiferencia && netoDiferencia) {
          kilosBruto.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((bb: number) => {
        if (kilosTara.value) {
          netoBalanza.setValue(bb - +kilosTara.value);
          netoBalanza.updateValueAndValidity();
        }
        if (brutoDocPorte.value) {
          brutoDiferencia.setValue(bb - +brutoDocPorte.value);
          brutoDiferencia.updateValueAndValidity();
          if (taraDiferencia.value || taraDiferencia.value === 0) {
            netoDiferencia.setValue(+brutoDiferencia.value - +taraDiferencia.value);
            netoDiferencia.updateValueAndValidity();
          }
        }
      });

      kilosTara.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((tb: number) => {
        if (kilosBruto.value) {
          netoBalanza.setValue(+kilosBruto.value - tb);
          netoBalanza.updateValueAndValidity();
        }
        if (taraDocPorte.value) {
          taraDiferencia.setValue(tb - +taraDocPorte.value );
          taraDiferencia.updateValueAndValidity();
          if (brutoDiferencia.value || brutoDiferencia.value === 0) {
            netoDiferencia.setValue(+brutoDiferencia.value - +taraDiferencia.value);
            netoDiferencia.updateValueAndValidity();
          }
        }
      });
    }
  }

  setFocus() {
    this.busquedaMovimientoPesaje.setFocusVagon();
  }

  getMovimientoPesaje() {
    if (this.terminal.utilizaTarjeta === true) {
      this.getMovimientoPesajeConTarjeta();
    } else {
      this.getMovimientoPesajeSinTarjeta();
    }
  }

  getMovimientoPesajeSinTarjeta() {
    const numeroVagonControl = this.registrarPesoForm.get('busquedaMovimiento.numeroVagon');

    if (numeroVagonControl) {

      if ((numeroVagonControl.valid || numeroVagonControl.disable)) {
        this.movimientoPesajeService.getMovimientoPesajeVagon(numeroVagonControl.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(movimiento => {
            if (movimiento) {
              this.completarDatosMovimiento(movimiento);
            } else {
              this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
              this.busquedaMovimientoPesaje.setFocusTarjeta();
            }
          }, () => {
            this.busquedaMovimientoPesaje.setFocusTarjeta();
        });
      }
    }
  }

  getMovimientoPesajeConTarjeta() {
    const numeroVagonControl = this.registrarPesoForm.get('busquedaMovimiento.numeroVagon');
    const tarjetaControl = this.registrarPesoForm.get('busquedaMovimiento.tarjeta');

    if (numeroVagonControl && tarjetaControl) {
      tarjetaControl.markAsTouched();
      tarjetaControl.updateValueAndValidity();

      if ((numeroVagonControl.valid || numeroVagonControl.disable) && (tarjetaControl.disabled || tarjetaControl.valid)) {
        this.movimientoPesajeService.getMovimientoPesajeVagon(numeroVagonControl.value, tarjetaControl.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(movimiento => {
            if (movimiento) {
              this.completarDatosMovimiento(movimiento);
            } else {
              tarjetaControl.setValue('', { onlySelf: true });
              this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
              this.busquedaMovimientoPesaje.setFocusTarjeta();
            }
          }, () => {
            tarjetaControl.setValue('', { onlySelf: true });
            this.busquedaMovimientoPesaje.setFocusTarjeta();
        });
      }
    }
  }

  completarDatosMovimiento(movimiento) {
    if (!this.esNavegacion)  {
      this.navigationService.clearPathCache();
    }
    this.pesaEntrada = movimiento.pesaEntrada;
    this.determinarAccionPesarCamionAutomatica();
    setTimeout(() => {
      this.movimientoService.marcarMovimientoEnPuesto(movimiento.id).pipe(takeUntil(this.onDestroy))
      .subscribe(() => {

        this.completarExistente(movimiento);

        this.movimientoService.getVersionDeMovimiento(movimiento.id).pipe(takeUntil(this.onDestroy))
        .subscribe((version: string) => {
          if (this.movimiento) {
            this.movimiento.version = version;
          }
          this.completeCircuito();
          this.setEnableFiltroBusqueda(false);
          this.autorizaciones = [];
          this.disableButtons = false;
          setTimeout(() => {
            this.datosPesajeComponent.setFocusPesaje();
          }, 250);
        });
      });
    }, 0);
  }

  private determinarAccionPesarCamionAutomatica(): void {
    this.idAccion = this.balanza.idTipoDispositivo === TiposDispositivo.BalanzaVagon1 ?
    Acciones.TomarPesoBalanzaVagon1 : Acciones.TomarPesoBalanzaVagon2;
    this.dispositivoService.consultarAccion(this.idAccion).pipe(takeUntil(this.onDestroy))
    .subscribe(accion => {
      this.esAutomatico = accion.esAutomatica;

      const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
      const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');
      if (bruto && tara) {
        if (this.esAutomatico) {
          bruto.disable();
          tara.disable();
        } else {
          if (this.pesaEntrada) {
            bruto.enable();
            bruto.setValue('');
            tara.disable();
          } else {
            tara.enable();
            tara.setValue('');
            bruto.disable();
          }
        }
      }
    });
  }

  private setEnableFiltroBusqueda(enable: boolean) {
    if (enable === true) {
      const numeroVagon = this.registrarPesoForm.get('busquedaMovimiento.numeroVagon');
      const tarjeta = this.registrarPesoForm.get('busquedaMovimiento.tarjeta');
      if (numeroVagon) {
        numeroVagon.enable({onlySelf: false,  emitEvent: true });
      }

      if (this.terminal && this.terminal.utilizaTarjeta === true && tarjeta) {
        tarjeta.enable({onlySelf: false,  emitEvent: true });
      }
    } else {
      this.registrarPesoForm.controls.busquedaMovimiento.disable({onlySelf: false, emitEvent: true });
    }

  }

  private completarExistente(movimiento: MovimientoPesaje) {
    this.movimiento = movimiento;
    this.pesaEntrada = movimiento.pesaEntrada;
    this.esEntrada = movimiento.pesaEntrada;

    this.formComponentService.setValue(`datosPesaje.brutoDocPorte`, movimiento.kgPesoBrutoDocumento, { onlySelf: true });
    this.formComponentService.setValue(`datosPesaje.netoDocPorte`, movimiento.kgPesoNetoDocumento, { onlySelf: true });
    this.formComponentService.setValue(`datosPesaje.taraDocPorte`, movimiento.kgPesoTaraDocumento, { onlySelf: true });

    if (!this.esEntrada) {
      this.formComponentService.setValue(`datosPesaje.brutoEsRepesaje`, movimiento.entradaEsRepesaje, { onlySelf: true });
      this.formComponentService.setValue(`datosPesaje.kilosBruto`, movimiento.kgPesoBruto, { onlySelf: false });
    }

    this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, movimiento.nroDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.ctg`, movimiento.ctg, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.entregador`, movimiento.entregador, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.producto`, movimiento.producto.descripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estado`, movimiento.estado, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.humedad`, movimiento.humedad, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.proteina`, movimiento.proteina, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.grado`, movimiento.gradoDescripcion, { onlySelf: true });
  }

  aceptarContinuar() {
    this.esContinuar = true;
    this.aceptar();
  }

  aceptar() {
    if (this.verificarPesosBalanza()) {
      if (this.formComponentService.isValidForm()) {
        this.confirmAceptar().then(respuesta => {
          if (respuesta) {
            this.registrar();
          }
        });
      } else {
        const errors = new Collection<string>();
        this.formComponentService.validateForm(this.registrarPesoForm.controls, errors, '');
        this.formComponentService.showValidationError(errors);
      }
    }

  }

  private verificarPesosBalanza(): boolean {
    if (!this.verificarControlPeso('datosPesaje.kilosBruto', 'Peso Bruto')) {
      return false;
    }
    if (!this.verificarControlPeso('datosPesaje.kilosTara', 'Peso Tara')) {
      return false;
    }
    if (!this.verificarControlPesoNeto()) {
      return false;
    }
    return true;
  }

  private verificarControlPesoNeto(): boolean {
    if (this.movimiento && this.movimiento.idEstado === EstadosMovimiento.AptoBalanzaSalida) {
      return this.verificarPesoNeto();
    }
    return true;
  }

  private verificarPesoNeto(): boolean {
    const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const ctrlPesoTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const ctrlPesoNeto = this.registrarPesoForm.get('datosPesaje.netoBalanza');

    if (ctrlPesoNeto && ctrlPesoBruto && ctrlPesoTara && ctrlPesoNeto.value < 0) {
       this.popupService.error(Resources.Messages.ElPesoNetoResultanteEsNegativo.format(
                                                              ctrlPesoBruto.value,
                                                              ctrlPesoTara.value,
                                                              ctrlPesoNeto.value, '0', '1', '2'), Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private verificarControlPeso(accessor: string, campo: string): boolean {
    const ctrlPeso = this.registrarPesoForm.get(accessor);
    if (ctrlPeso && ctrlPeso.enabled && (!ctrlPeso.value || +ctrlPeso.value === 0)) {
      this.popupService.error(Resources.Messages.ElCampoXDebeSerMayorAY.format(campo, '0'), Resources.Labels.Error);
      return false;
    }
    return true;
  }

  private registrar() {
    const comando = this.construirCommand();
    this.registrarPesadaService.Registrar(comando).pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.popupService.success(Resources.Messages.SeAceptoElRegistroDelPeso, Resources.Labels.Aceptar);
        if (this.esContinuar) {
          this.continuar();
        } else if (this.movimiento && this.movimiento.pesaEntrada) {
          this.getMovimientoPesaje();
          this.datosPesajeComponent.clearPesosTomadosArray();
        } else {
          this.navigateBack();
        }
      }, (error: HttpErrorResponse) => {
        if (error.error && error.error.data && error.error.data.validationData) {
          this.mapearRoles(error.error.data.validationData);
          this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
        }
      });
  }

  private continuar(): void {
    this.esContinuar = !this.esContinuar;
    if (this.movimiento) {
      const idMovimiento = this.movimiento.id;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'idMovimiento': idMovimiento,
          'operacion': Operaciones.Alta
        }
      };
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateByMovement(idMovimiento, this.basePath, navigationExtras), 1500);
    }
  }

  private mapearRoles(roles: any[]) {
    const rolesEntrada: EntityWithDescription[] = [];
    const rolesSalida: EntityWithDescription[] = [];

    for (const key in roles) {
      if (roles.hasOwnProperty(key)) {
        if (roles[key].orden === 1) {
          rolesEntrada.push(new EntityWithDescription(+key, roles[key].nombre));
        } else {
          rolesSalida.push(new EntityWithDescription(+key, roles[key].nombre));
        }
      }
    }

    this.rolesAAutorizar = [];
    if (rolesSalida.length) {
      this.rolesAAutorizar.push(rolesSalida);
    }
    if (rolesEntrada.length) {
      this.rolesAAutorizar.push(rolesEntrada);
    }
  }

  private confirmAceptar(): Promise<boolean> {
    return this.popupService.confirm(Resources.Messages.PorFavorVerificarLosDatosAntesDeContinuar, Resources.Labels.Confirmar);
  }

  construirCommand(): RegistrarPesajeVagonCommand {
    if (this.movimiento) {
      const comando = new RegistrarPesajeVagonCommand(this.movimiento.id);

      let controlPeso: AbstractControl | null;

      comando.esAutomatico = this.esAutomatico;
      comando.balanzaId = this.balanza.id;

      if (this.esEntrada) {
        const lugarEntregaControl = this.registrarPesoForm.get('lugarDescargaCarga');
          if (lugarEntregaControl) {
            comando.IdCondicionManipuleo = lugarEntregaControl.value.id;
        }
      }

      if (this.esAutomatico) {
        comando.pesadas = this.pesosTomados.getRawValue() as PesoRegistrado[];
      } else {
        if (this.movimiento.pesaEntrada) {
          controlPeso = this.registrarPesoForm.get('datosPesaje.kilosBruto');
        } else {
          controlPeso = this.registrarPesoForm.get('datosPesaje.kilosTara');
        }
        if (controlPeso) {
          const pesada = new PesoRegistrado();
          pesada.peso = controlPeso.value;
          pesada.fechaPesada = new Date(Date.now()).toLocalISOString();
          comando.pesadas.push(pesada);
        }
      }

      comando.esEntrada = this.esEntrada;
      comando.version = this.movimiento.version;
      comando.autorizaciones = this.autorizaciones;
      return comando;
    } else {
      return new RegistrarPesajeVagonCommand(0);
    }
  }

  resetForm() {
    const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const lugarDescargaCarga = this.registrarPesoForm.get('lugarDescargaCarga');
    this.setEnableFiltroBusqueda(true);
    if (bruto && tara && lugarDescargaCarga) {
      tara.disable();
      bruto.disable();
      lugarDescargaCarga.disable();
    }
    this.disableButtons = true;
    this.movimiento = undefined;
    this.esAutomatico = false;
    setTimeout(() => {
      this.busquedaMovimientoPesaje.setFocusVagon();
    }, 500);

    this.createForm();
  }

  cancelar() {
    if (this.movimiento) {
      this.movimientoService.desmarcarMovimientoEnPuesto(this.movimiento.id)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.navigateBack();
        });
    } else {
      this.navigateBack();
    }
  }

  onAutorizacionCompletada(autorizaciones: Autorizacion[]) {
    this.autorizaciones = this.autorizaciones.concat(autorizaciones);
    if (this.autorizaciones && this.rolesAAutorizar.every(r => this.autorizaciones.some(a => r.some(rol => rol.id === a.idRol)))) {
      this.registrar();
    }
  }

  private navigateBack(): void {
    if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateBackToSource(), 0);
    } else {
      this.resetForm();
    }
  }
}
