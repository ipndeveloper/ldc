import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';

import { Circuito } from '../../shared/data-models/circuito/circuito';
import { BusquedaMovimientoPesajeComponent } from './busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.component';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { BusquedaMovimientoPesajeService } from './busqueda-movimiento-pesaje/busqueda-movimiento-pesaje.service';
import { MovimientoPesaje } from './movimiento-pesaje';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { tiposTransportes } from '../../shared/data-models/tipo-transporte';
import { Actividades, TiposProducto, Caracteristicas, MotivosErrorBalanza, EstadosMovimiento, Acciones, SentidosBalanza, ResultadosPesaje, TiposMovimiento, Operaciones } from '../../shared/enums/enums';
import { TipoProducto } from '../../shared/data-models/tipo-producto';
import { CircuitoService } from '../shared/services/circuito.service';
import { PesoRegistrado } from './peso-registrado';
import { RegistrarPesadaService } from './registrar-pesada.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { MotivoNoDescarga } from './situacion-entrada/lista-motivos-no-descarga/motivo-no-descarga';
import { MotivosNoDescargaService } from './situacion-entrada/lista-motivos-no-descarga/motivos-no-descarga.service';
import { Collection } from '../../core/models/collection';
import { Terminal } from '../../shared/data-models/terminal';
import { AuthService } from '../../core/services/session/auth.service';
import { Resources } from '../../../locale/artifacts/resources';
import { DatosPesajeComponent } from '../shared/datos-pesaje/datos-pesaje.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { MovimientoService } from '../shared/services/movimiento.service';
import { BalanzaService } from '../shared/services/balanza.service';
import { DispositivoService } from '../shared/services/dispositivo.service';
import { Autorizacion } from '../shared/autorizacion/autorizacion';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { RegistrarPesajeCamionCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-pesaje-camion-command';
import { CommandService, Command } from '../../shared/command-service/command.service';
import { ModalSituacionBalanzaComponent } from './modal-situacion-balanza/modal-situacion-balanza.component';
import { ConsultarStockDataView } from '../../shared/data-models/consulta-stock-data-view';
import { DesplegableCondicionManipuleoComponent } from './situacion-entrada/desplegable-condicion-manipuleo/desplegable-condicion-manipuleo.component';
import { NavigationService } from '../../core/services/navigationService/navigation.service';

@Component({
  selector: 'yrd-registrar-peso',
  templateUrl: './registrar-peso.component.html',
  styleUrls: ['./registrar-peso.component.css']
})
export class RegistrarPesoComponent implements OnInit, OnDestroy {
  @ViewChild('busquedaMovimiento') busquedaMovimientoPesaje: BusquedaMovimientoPesajeComponent;
  @ViewChild('datosPesajeComponent') datosPesajeComponent: DatosPesajeComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('modalSituacionEntrada') modalSituacionEntrada: ModalSituacionBalanzaComponent;
  @ViewChild('modalSituacionSalida') modalSituacionSalida: ModalSituacionBalanzaComponent;
  @ViewChild('botonResolverSituacion') botonResolverSituacion: ElementRef;
  @ViewChild('botonAceptar') botonAceptar: ElementRef;
  @ViewChild('desplegableCondicionManipuleo') desplegableCondicionManipuleo: DesplegableCondicionManipuleoComponent;
  registrarPesoForm: FormGroup;
  circuito: Circuito;
  movimiento?: MovimientoPesaje;
  esSuPrimeraVez: boolean;
  esAutomatico = false;
  completarTipoProducto = false;
  accionesHabilitadas: any[];
  pesaEntrada: boolean;
  esEntrada = true;
  esDescarga: boolean;
  LugarDescargaCargaActivado: boolean;
  terminal: Terminal;
  disableButtons = true;
  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  subscription: Subscription;
  idAccion: number;
  // banderas para controlar si se controló la situación
  disableAceptar = false;
  situacionControlada = false;
  pesoNeto?: number;
  stock: ConsultarStockDataView;
  private onDestroy = new Subject();
  esContinuar = false;
  basePath = 'RegistrarPeso';
  private destroyedByNavigation = false;
  esNavegacion = false;

  validationMessagesCondicionManipuleo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(this.lugarCargaDescarga),
    stockInsuficiente: Resources.Messages.StockInsuficiente
  };

  get esCarga(): boolean {
    return this.esDescarga != null ? !this.esDescarga : false;
  }

  get lugarCargaDescarga(): string {
    return this.esDescarga ? Resources.Labels.LugarDescarga
      : Resources.Labels.LugarCarga;
  }

  get esSalida(): boolean {
    return !this.esEntrada;
  }

  get textoDescargaCarga(): string {
    if (this.esDescarga != null) {
      return this.esDescarga ? Resources.Labels.Descarga : Resources.Labels.Carga;
    }
    return Resources.Labels.DescargaCarga;
  }

  get sentidoBalanza(): EntityWithDescription | null {
    if (this.busquedaMovimientoPesaje && this.busquedaMovimientoPesaje.sentidoBalanza) {
      return this.busquedaMovimientoPesaje.sentidoBalanza;
    }
    return null;
  }

  get motivosEntrada(): FormArray {
    return this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray;
  }

  get motivosSalida(): FormArray {
    return this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
  }

  get pesosTomados(): FormArray {
    return this.registrarPesoForm.get('datosPesaje.pesosTomados') as FormArray;
  }

  get pesaBruto(): Boolean {
    return (this.esDescarga && this.esEntrada) || (!this.esDescarga && !this.esEntrada);
  }

  constructor(private readonly fb: FormBuilder,
              private readonly popupService: PopupService,
              private readonly formComponentService: FormComponentService,
              private readonly movimientoPesajeService: BusquedaMovimientoPesajeService,
              private readonly movimientoService: MovimientoService,
              private readonly circuitoService: CircuitoService,
              private readonly registrarPesadaService: RegistrarPesadaService,
              private readonly motivosNoDescargaService: MotivosNoDescargaService,
              private readonly balanzaService: BalanzaService,
              private readonly authService: AuthService,
              private readonly dispositivoService: DispositivoService,
              protected readonly commandService: CommandService,
              private readonly navigationService: NavigationService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
    this.idAccion = Acciones.PesarCamion;
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
      case 'HabilitarBalanza':
        this.busquedaMovimientoPesaje.habilitarBalanza();
        break;
      case 'IdentificarCamion':
        this.busquedaMovimientoPesaje.onClickIdentificarCamion();
        break;
    }
  }

  private completeCircuito() {
    if (this.movimiento) {
      const idTipoMovimiento = this.movimiento.idTipoMovimiento;
      const idTipoTransporte = this.movimiento.idTipoTransporte;
      const tipoMovimiento = tiposMovimientos.find(t => t.id === idTipoMovimiento);
      const tipoTransporte = tiposTransportes.find(t => t.id === idTipoTransporte);
      const tipoProducto = new TipoProducto(this.movimiento.idTipoProducto, TiposProducto[this.movimiento.idTipoProducto as TiposProducto]);
      const idActividad = idTipoMovimiento === TiposMovimiento.Descarga ?
        (this.movimiento.pesaEntrada ? Actividades.CapturarPesoBruto : Actividades.CapturarPesoTara) :
        (this.movimiento.pesaEntrada ? Actividades.CapturarPesoTaraCarga : Actividades.CapturarPesoBrutoCarga);

      if (tipoMovimiento && tipoTransporte && this.terminal) {
        this.completarTipoProducto = true;

        this.formComponentService.setValue(`circuito.terminal`, this.terminal.descripcion, { onlySelf: true });
        this.formComponentService.setValue(`circuito.tipoMovimiento`, tipoMovimiento.descripcion, { onlySelf: true });
        this.formComponentService.setValue(`circuito.tipoProducto`, tipoProducto.descripcion, { onlySelf: true });
        this.formComponentService.setValue(`circuito.tipoTransporte`, tipoTransporte.descripcion, { onlySelf: true });

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
  }

  habilitarCaracteristicas() {
    // Habilitación de lugar descarga/carga
    const lugarDescargaCarga = this.registrarPesoForm.get('lugarDescargaCarga');
    if (lugarDescargaCarga) {
      if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignaLugarDescargaCarga]) &&
        this.movimiento && this.movimiento.producto.imputaStock &&
        this.movimiento.idEstado !== EstadosMovimiento.AptoBalanzaEntradaVueltaCargado) {
        this.registrarPesoForm.controls.lugarDescargaCarga.enable();
        this.LugarDescargaCargaActivado = true;
      } else {
        this.registrarPesoForm.controls.lugarDescargaCarga.disable();
        this.LugarDescargaCargaActivado = false;
      }
    }
  }

  private createForm() {
    this.registrarPesoForm = this.fb.group({
      lugarDescargaCarga: [{ value: '', disabled: true }, Validators.required],
      busquedaMovimiento: this.fb.group({
        patenteCamion: ['', Validators.required],
        tarjeta: [{ value: '', disabled: false }, Validators.required],
        sinTarjeta: [false],
        esEntrada: [this.sentidoBalanza, Validators.required]
      }),
      /*Seccion de Circuito*/
      circuito: this.fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        ctg: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        cosecha: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        turnoPlaya: { value: '', disabled: true },
        ordenCompra: { value: '', disabled: true },
        ordenCarga: { value: '', disabled: true },
        humedad: { value: '', disabled: true },
        proteina: { value: '', disabled: true },
        grado: { value: '', disabled: true },
        cantidadEstimada: { value: '', disabled: true },
        entregador: { value: '', disabled: true }
      }),
      datosPesaje: this.fb.group({
        idMovimiento: { value: '' },
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
        pesosTomados: this.fb.array([])
      }),
      situacionEntradaInformativa: this.fb.group({
        realizaDescargaCarga: { value: ResultadosPesaje.Exito, disabled: true },
        motivos: this.fb.array([])
      }),
      situacionSalidaInformativa: this.fb.group({
        realizaDescargaCarga: { value: ResultadosPesaje.Error, disabled: true },
        motivos: this.fb.array([])
      }),
      situacionEntrada: this.fb.group({
        realizaDescargaCarga: { value: ResultadosPesaje.Error, disabled: false },
        motivos: this.fb.array([]),
      }),
      situacionSalida: this.fb.group({
        realizaDescargaCarga: { value: ResultadosPesaje.Error, disabled: false },
        realizoDescargaCargaEnEntrada: { value: ResultadosPesaje.Exito, disabled: false },
        motivos: this.fb.array([]),
      })
    });

    this.formComponentService.initialize(this.registrarPesoForm);
    this.subscribirseCambiosControles();
    this.busquedaMovimientoPesaje.setFocus();
  }

  private subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((extras) => {
        if (extras.idMovimiento) {
          this.esNavegacion = true;
          this.movimientoPesajeService.getMovimientoPesajeCamionById(+extras.idMovimiento)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(movimiento => {
            if (movimiento) {
              this.formComponentService.setValue('busquedaMovimiento.patenteCamion', movimiento.patente);
              this.formComponentService.setValue('busquedaMovimiento.esEntrada',
                                                  movimiento.pesaEntrada ? new EntityWithDescription(SentidosBalanza.Entrada, 'Es Entrada')
                                                                         : new EntityWithDescription(SentidosBalanza.Salida, 'Es Salida'));
              if (this.terminal.utilizaTarjeta) {
                this.formComponentService.setValue('busquedaMovimiento.tarjeta', movimiento.tarjeta);
                if (movimiento.tarjeta === null || movimiento.tarjeta === undefined) {
                  this.formComponentService.setValue('busquedaMovimiento.sinTarjeta', true);
                }
              }
              this.completarBusquedaMovimiento(movimiento);
            } else {
              this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
              this.busquedaMovimientoPesaje.setFocusTarjeta();
            }
          }, () => this.busquedaMovimientoPesaje.setFocusTarjeta());
        }
      });
  }

  private subscribirseCambiosControles() {
    this.suscribirseCambiosControlBusqueda();
    this.suscribirseCambiosPesos();
    this.suscribirseCambiosMotivosNoDescargaCarga();
    this.suscribirseCambiosMotivosNoDescargoCargo();
    this.suscribirseCambiosEsEntrada();
  }

  private suscribirseCambiosEsEntrada() {
    const esEntradaCtrl = this.registrarPesoForm.get('busquedaMovimiento.esEntrada');

    if (esEntradaCtrl) {
      esEntradaCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: EntityWithDescription) => {
        this.esEntrada = (value.id === 1);
      });
    }
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
        this.disableAceptar = true;
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
        this.disableAceptar = true;
        if (kilosBruto.value) {
          netoBalanza.setValue(+kilosBruto.value - tb);
          netoBalanza.updateValueAndValidity();
        }
        if (taraDocPorte.value) {
          taraDiferencia.setValue(tb - +taraDocPorte.value);
          taraDiferencia.updateValueAndValidity();
          if (brutoDiferencia.value || brutoDiferencia.value === 0) {
            netoDiferencia.setValue(+brutoDiferencia.value - +taraDiferencia.value);
            netoDiferencia.updateValueAndValidity();
          }
        }
      });
    }
  }

  private suscribirseCambiosControlBusqueda() {
    const tarjeta = this.registrarPesoForm.get('busquedaMovimiento.tarjeta');
    const sinTarjeta = this.registrarPesoForm.get('busquedaMovimiento.sinTarjeta');

    if (sinTarjeta && tarjeta) {
      if (this.terminal.utilizaTarjeta) {
        sinTarjeta.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((valor: boolean) => {
          if (valor) {
            tarjeta.markAsPristine();
            tarjeta.disable();
            tarjeta.setValue('');
          } else {
            if (this.registrarPesoForm.controls.busquedaMovimiento.enabled && sinTarjeta.enabled) {
              tarjeta.enable();
            }
          }
        });
      } else {
        tarjeta.disable();
        sinTarjeta.disable();
      }
    }
  }

  completeMotivosPesajeBruto() {
    if (this.movimiento && this.pesaBruto) {
      const pesoBrutoDestino = this.formComponentService.getValue('datosPesaje.kilosBruto');
      let motivosNoDescargaCarga: FormArray;
      if (this.esEntrada) {
        motivosNoDescargaCarga = this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray;
      } else {
        motivosNoDescargaCarga = this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
        if (this.esCarga) {
          this.pesoNeto = this.formComponentService.getValue('datosPesaje.netoBalanza');
        }
      }
      const pesoBrutoOrigen = this.formComponentService.getValue('datosPesaje.brutoDocPorte');

      if (pesoBrutoDestino && motivosNoDescargaCarga) {
        this.motivosNoDescargaService.getMotivosPesaje(this.movimiento.idCircuito,
          this.esEntrada,
          pesoBrutoOrigen,
          pesoBrutoDestino,
          this.movimiento.kgPesoAnterior,
          this.movimiento.idEstado,
          this.movimiento.cantidadEstimada,
          this.movimiento.producto.admiteNetoNegativo,
          this.movimiento.kgPesoTara)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((datos: MotivoNoDescarga[]) => {
            datos.forEach(motivo => {
              const indiceMotivo = (motivosNoDescargaCarga.value as MotivoNoDescarga[]).findIndex(e => e.id === motivo.id);
              motivosNoDescargaCarga.at(indiceMotivo).setValue(motivo);
            });
          }
          );
      }
    }
  }

  completeMotivosPesajeTara() {
    if (this.movimiento && !this.pesaBruto) {
      const pesoTaraDestino = this.formComponentService.getValue('datosPesaje.kilosTara');
      let motivosNoDescargaCarga: FormArray;
      if (this.esEntrada) {
        motivosNoDescargaCarga = this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray;
      } else {
        motivosNoDescargaCarga = this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
      }
      const pesoTaraOrigen = this.formComponentService.getValue('datosPesaje.taraDocPorte');

      if (pesoTaraDestino && motivosNoDescargaCarga) {
        this.motivosNoDescargaService.getMotivosPesaje(this.movimiento.idCircuito,
          this.esEntrada,
          pesoTaraOrigen,
          pesoTaraDestino,
          this.movimiento.kgPesoAnterior,
          this.movimiento.idEstado)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((datos: MotivoNoDescarga[]) => {
            datos.forEach(motivo => {
              const indiceMotivo = (motivosNoDescargaCarga.value as MotivoNoDescarga[]).findIndex(e => e.id === motivo.id);
              motivosNoDescargaCarga.at(indiceMotivo).setValue(motivo);
            });

            this.setearHabilitacionBotonAceptar();
          }
          );
      }
    }
  }

  completeMotivosProductoCalidad(disponible: boolean) {
    if (this.movimiento &&
      this.movimiento.pesaEntrada &&
      this.movimiento.idTipoMovimiento === TiposMovimiento.Descarga &&
      this.movimiento.idTipoProducto !== TiposProducto.Varios) {
      this.disableAceptar = true;
      const motivosNoDescargaCarga = this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray;
      setTimeout(() => {
        if (motivosNoDescargaCarga &&
          this.LugarDescargaCargaActivado &&
          this.movimiento &&
          this.esEntrada) {
          const indice = (motivosNoDescargaCarga.value as MotivoNoDescarga[])
            .findIndex(e => e.id === MotivosErrorBalanza.ProductoCalidadIncorrecto);
          const motivo = motivosNoDescargaCarga.at(indice).value;
          motivo.checked = !disponible;
          motivosNoDescargaCarga.at(indice).setValue(motivo);
        }
        const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
        if (ctrlPesoBruto && ctrlPesoBruto.value &&
          (motivosNoDescargaCarga.value.filter(m => m.checked).length === 0 || this.situacionControlada)) {
          this.disableAceptar = false;
        }
      }, 500);
    }
  }

  private setMotivosIngreso(movimiento: MovimientoPesaje) {
    const motivosIngresoCtrl = this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray;
    const motivosSalidaCtrl = this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
    const motivosIngresoInformativosCtrl = this.registrarPesoForm.get('situacionEntradaInformativa.motivos') as FormArray;
    const realizoDescargaCargaEntrada = this.registrarPesoForm.get('situacionEntradaInformativa.realizaDescargaCarga');
    const realizoDescargaCargaSalida = this.registrarPesoForm.get('situacionSalidaInformativa.realizaDescargaCarga');

    const motivosSalidaInformativosCtrl = this.registrarPesoForm.get('situacionSalidaInformativa.motivos') as FormArray;

    if (realizoDescargaCargaEntrada &&
      realizoDescargaCargaSalida &&
      motivosIngresoCtrl &&
      motivosSalidaCtrl &&
      motivosIngresoInformativosCtrl &&
      motivosSalidaInformativosCtrl) {
      if (this.esEntrada) {
        // seteo los motivos de ingreso actuales e informo situación salida anterior
        let motivosCtr = movimiento.motivosIngreso.map(c => this.fb.control(c));
        this.clearMotivosArray(motivosIngresoCtrl);
        motivosCtr.forEach(m => motivosIngresoCtrl.push(m));
        motivosCtr = movimiento.motivosEgreso.map(c => this.fb.control(c));
        this.clearMotivosArray(motivosSalidaInformativosCtrl);
        motivosCtr.forEach(m => motivosSalidaInformativosCtrl.push(m));
        realizoDescargaCargaSalida.setValue(movimiento.cargoConError);
        motivosSalidaInformativosCtrl.disable();
      } else {
        // seteo los motivos de salida actuales e informo situación entrada anterior
        let motivosCtr = movimiento.motivosIngreso.map(c => this.fb.control(c));
        this.clearMotivosArray(motivosIngresoInformativosCtrl);
        motivosCtr.forEach(m => motivosIngresoInformativosCtrl.push(m));
        realizoDescargaCargaEntrada.setValue(movimiento.fueExitoso ? ResultadosPesaje.Exito : ResultadosPesaje.Error);
        this.clearMotivosArray(motivosSalidaCtrl);
        motivosCtr = movimiento.motivosEgreso.map(c => this.fb.control(c));
        motivosCtr.forEach(m => motivosSalidaCtrl.push(m));
        motivosIngresoInformativosCtrl.disable();
      }
    }
  }

  private setearHabilitacionBotonAceptar() {
    const motivos = this.esEntrada ? this.motivosEntrada : this.motivosSalida;
    let pesaje: AbstractControl | null = null;
    this.disableAceptar = true;
    if (this.esEntrada) {
      pesaje = this.esDescarga ? this.registrarPesoForm.get('datosPesaje.kilosBruto')
        : this.registrarPesoForm.get('datosPesaje.kilosTara');
    } else {
      pesaje = this.esDescarga ? this.registrarPesoForm.get('datosPesaje.kilosTara')
        : this.registrarPesoForm.get('datosPesaje.kilosBruto');
    }
    if (pesaje && pesaje.value) {
      if (motivos.value.filter(m => m.checked).length !== 0) {
        this.disableAceptar = !this.situacionControlada;
      } else {
        this.disableAceptar = false;
      }
    }
  }

  private clearMotivosArray(motivosArray: FormArray) {
    while (motivosArray.length !== 0) {
      motivosArray.removeAt(0);
    }
  }

  private suscribirseCambiosMotivosNoDescargaCarga() {
    const motivosNoDescarga = this.registrarPesoForm.get('situacionEntrada.motivos');
    const realizaDescargaCarga = this.registrarPesoForm.get('situacionEntrada.realizaDescargaCarga');
    const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const ctrlPesoTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const realizaDescargaCargaInformativaCtrl = this.registrarPesoForm.get('situacionEntradaInformativa.realizaDescargaCarga');

    if (motivosNoDescarga && realizaDescargaCarga && ctrlPesoBruto && ctrlPesoTara && realizaDescargaCargaInformativaCtrl) {
      motivosNoDescarga.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((motivos: MotivoNoDescarga[]) => {
        if (this.esEntrada) {
          if (motivos.length > 0) {
            if (motivos.find(e => e.esBloqueante && e.checked)) {
              realizaDescargaCarga.setValue(null);
              this.disableAceptar = true;
              this.botonResolverSituacion.nativeElement.focus();
            } else {
              realizaDescargaCarga.enable();
              if (motivos.find(e => e.checked)) {
                realizaDescargaCarga.setValue(null);
                this.disableAceptar = true;
                this.botonResolverSituacion.nativeElement.focus();
              } else {
                realizaDescargaCarga.setValue(ResultadosPesaje.Exito);
                if ((this.esDescarga && ctrlPesoBruto.value) || (!this.esDescarga && ctrlPesoTara.value)) {
                  this.disableAceptar = false;
                  this.botonAceptar.nativeElement.focus();
                }
              }
            }
          } else {
            realizaDescargaCarga.setValue(ResultadosPesaje.Error);
          }
        } else {
          if (motivos.length === 0) {
            realizaDescargaCargaInformativaCtrl.setValue(ResultadosPesaje.Exito);
          } else if (motivos.find(e => e.checked)) {
            realizaDescargaCargaInformativaCtrl.setValue(ResultadosPesaje.Error);
          }
        }
      });
    }
  }

  private suscribirseCambiosMotivosNoDescargoCargo() {
    const motivosNoDescargo = this.registrarPesoForm.get('situacionSalida.motivos');
    const realizaDescargaEnEntrada = this.registrarPesoForm.get('situacionSalida.realizoDescargaCargaEnEntrada');
    const realizoDescargaCarga = this.registrarPesoForm.get('situacionSalida.realizaDescargaCarga');
    const ctrlPesoTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');

    if (motivosNoDescargo && realizoDescargaCarga && realizaDescargaEnEntrada && ctrlPesoTara && ctrlPesoBruto) {
      motivosNoDescargo.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((motivos: MotivoNoDescarga[]) => {
        if (!this.esEntrada && this.movimiento) {
          if (this.movimiento.idEstado === EstadosMovimiento.AptoBalanzaSalida ||
            this.movimiento.idEstado === EstadosMovimiento.AptoControlCalidad) {
            realizoDescargaCarga.enable();
            realizaDescargaEnEntrada.setValue(ResultadosPesaje.Exito);
            if (motivos.filter(m => m.checked).length === 0 &&
              ((this.esDescarga && ctrlPesoTara.value) ||
                (!this.esDescarga && ctrlPesoBruto.value))) {
              realizoDescargaCarga.setValue(ResultadosPesaje.Exito);
              if ((this.esDescarga && ctrlPesoTara.value) || (!this.esDescarga && ctrlPesoBruto.value)) {
                this.disableAceptar = false;
                this.botonAceptar.nativeElement.focus();
              }
            } else {
              realizoDescargaCarga.setValue(null);
              if ((this.esDescarga && ctrlPesoTara.value) || (!this.esDescarga && ctrlPesoBruto.value)) {
                this.disableAceptar = true;
                this.botonResolverSituacion.nativeElement.focus();
              }
            }
          } else {
            if (motivos.filter(m => m.checked).length === 0) {
              realizoDescargaCarga.setValue(ResultadosPesaje.Error);
              this.disableAceptar = false;
              this.botonAceptar.nativeElement.focus();
            } else {
              if ((this.esDescarga && ctrlPesoTara.value) || (!this.esDescarga && ctrlPesoBruto.value)) {
                this.disableAceptar = true;
                this.botonResolverSituacion.nativeElement.focus();
              }
              realizoDescargaCarga.setValue(null);
            }
            realizaDescargaEnEntrada.setValue(ResultadosPesaje.Error);
          }
        }
      });
    }
  }

  getMovimientoPesaje() {
    const patenteCamionControl = this.registrarPesoForm.get('busquedaMovimiento.patenteCamion');
    const tarjetaControl = this.registrarPesoForm.get('busquedaMovimiento.tarjeta');
    const esEntradaControl = this.registrarPesoForm.get('busquedaMovimiento.esEntrada');

    if (patenteCamionControl && tarjetaControl && esEntradaControl) {
      tarjetaControl.markAsTouched();
      tarjetaControl.updateValueAndValidity();
      if ((patenteCamionControl.valid || patenteCamionControl.disable) && (tarjetaControl.disabled || tarjetaControl.valid)) {
        this.movimientoPesajeService.getMovimientoPesajeCamion(patenteCamionControl.value, tarjetaControl.value)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(movimiento => {
            if (movimiento) {
              this.completarBusquedaMovimiento(movimiento);
            } else {
              tarjetaControl.setValue('', { onlySelf: true });
              this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
              this.busquedaMovimientoPesaje.setFocusTarjeta();
            }
          },
            () => {
              tarjetaControl.setValue('', { onlySelf: true });
              this.busquedaMovimientoPesaje.setFocusTarjeta();
          });
      }
    }
  }

  private completarBusquedaMovimiento(movimiento: MovimientoPesaje): void {
    this.determinarAccionPesarCamionAutomatica();
    setTimeout(() => {
      if (!this.esNavegacion) {
        this.navigationService.clearPathCache();
      }
      this.movimientoService.marcarMovimientoEnPuesto(movimiento.id).pipe(takeUntil(this.onDestroy)).subscribe(() => {
        this.completarExistente(movimiento);

        this.movimientoService.getVersionDeMovimiento(movimiento.id).pipe(takeUntil(this.onDestroy)).subscribe((version: string) => {
          if (this.movimiento) {
            this.movimiento.version = version;
          }
          this.completeCircuito();
          this.setEnableFiltroBusqueda(false);
          this.autorizaciones = [];
          this.disableAceptar = true;
          this.situacionControlada = false;
          if (this.esNavegacion && this.busquedaMovimientoPesaje.esAutomatico) {
            this.disableButtons = true;
            this.busquedaMovimientoPesaje.setFocusHabilitarBalanza();
          } else {
            this.disableButtons = false;
            this.datosPesajeComponent.setFocusPesaje();
          }
          this.setValidationMessageLugarCargaDescarga();
        });
      });
    }, 0);
  }

  private setValidationMessageLugarCargaDescarga() {
    this.validationMessagesCondicionManipuleo = {
      required: Resources.Messages.ElCampoXEsRequerido.format(this.lugarCargaDescarga),
      stockInsuficiente: Resources.Messages.StockInsuficiente
    };
  }

  private determinarAccionPesarCamionAutomatica() {
    this.dispositivoService.consultarAccion(Acciones.PesarCamion).pipe(takeUntil(this.onDestroy)).subscribe(accion => {
      this.esAutomatico = accion.esAutomatica;

      const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
      const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');
      if (bruto && tara) {
        if (this.esAutomatico) {
          bruto.disable();
          tara.disable();
        } else {
          if ((this.pesaEntrada && this.esDescarga) || (!this.esEntrada && !this.esDescarga)) {
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
    enable ? this.registrarPesoForm.controls.busquedaMovimiento.enable({ onlySelf: false, emitEvent: true }) :
      this.registrarPesoForm.controls.busquedaMovimiento.disable({ onlySelf: false, emitEvent: true });
  }

  private validarSentidoBalanza() {
    const sentidoBalanza = this.registrarPesoForm.get('busquedaMovimiento.esEntrada');
    if (this.movimiento &&
      !this.movimiento.pesaEntrada &&
      sentidoBalanza &&
      sentidoBalanza.value &&
      sentidoBalanza.value.id === SentidosBalanza.Entrada) {
      sentidoBalanza.setValue(new EntityWithDescription(SentidosBalanza.Salida, 'Es Salida'));
      this.popupService.info(Resources.Messages.SeModificoSentidoBalanza);
    }
  }

  private completarExistente(movimiento: MovimientoPesaje) {
    this.movimiento = movimiento;
    this.validarSentidoBalanza();
    this.esSuPrimeraVez = this.movimiento.esSuPrimeraVez;
    this.esDescarga = movimiento.esDescarga;
    this.pesaEntrada = movimiento.pesaEntrada;
    this.movimiento.patente = this.formComponentService.getValue('busquedaMovimiento.patenteCamion');
    this.movimiento.tarjeta = this.formComponentService.getValue('busquedaMovimiento.tarjeta');
    const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    if (bruto && tara) {
      if (this.esAutomatico) {
        bruto.disable();
        tara.disable();
      } else {
        if ((this.pesaEntrada && this.esDescarga) || (!this.esEntrada && !this.esDescarga)) {
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

    this.formComponentService.setValue(`datosPesaje.brutoDocPorte`, movimiento.kgPesoBrutoDocumento, { onlySelf: true });
    this.formComponentService.setValue(`datosPesaje.netoDocPorte`, movimiento.kgPesoNetoDocumento, { onlySelf: true });
    this.formComponentService.setValue(`datosPesaje.taraDocPorte`, movimiento.kgPesoTaraDocumento, { onlySelf: true });

    if (!this.esEntrada) {
      const motivosNoDescargaCargaCtrl = this.registrarPesoForm.get('situacionEntrada.motivos');

      if (motivosNoDescargaCargaCtrl) {
        motivosNoDescargaCargaCtrl.disable();
      }
      if (this.esDescarga) {
        this.formComponentService.setValue(`datosPesaje.kilosBruto`, movimiento.kgPesoBruto, { onlySelf: false });
        this.formComponentService.setValue(`datosPesaje.brutoEsRepesaje`, movimiento.entradaEsRepesaje, { onlySelf: true });
      } else {
        this.formComponentService.setValue(`datosPesaje.kilosTara`, movimiento.kgPesoTara, { onlySelf: false });
        this.formComponentService.setValue(`datosPesaje.taraEsRepesaje`, movimiento.entradaEsRepesaje, { onlySelf: true });
      }
    }

    this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`, movimiento.tipoDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, movimiento.nroDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.ctg`, movimiento.ctg, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.turnoPlaya`, movimiento.turno, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estadoCupo`, movimiento.estadoCupo, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.producto`, movimiento.producto.descripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estado`, movimiento.estado, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.cosecha`, movimiento.cosecha, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.humedad`, movimiento.humedad, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.proteina`, movimiento.proteina, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.grado`, movimiento.gradoDescripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.cantidadEstimada`, movimiento.cantidadEstimada, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.ordenCompra`, movimiento.ordenCompra, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.entregador`, movimiento.entregador, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.ordenCarga`, movimiento.ordenCarga, { onlySelf: true });
    if (!this.esDescarga) {
      this.formComponentService.setValue(`lugarDescargaCarga`, { id: movimiento.idCondicionManipuleo });
    }

    this.setMotivosIngreso(movimiento);
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
    if (this.movimiento && this.movimiento.idEstado === EstadosMovimiento.AptoBalanzaSalida &&
      this.movimiento.producto && !this.movimiento.producto.admiteNetoNegativo) {
      return this.verificarPesoNeto();
    }
    return true;
  }

  private verificarPesoNeto(): boolean {
    const ctrlPesoBruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const ctrlPesoTara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const ctrlPesoNeto = this.registrarPesoForm.get('datosPesaje.netoBalanza');
    const ctrlAccionTomada = this.registrarPesoForm.get('situacionSalida.realizaDescargaCarga');

    if (ctrlAccionTomada &&
      ctrlAccionTomada.value === ResultadosPesaje.Exito &&
      ctrlPesoNeto &&
      ctrlPesoBruto &&
      ctrlPesoTara &&
      ctrlPesoNeto.value < 0) {
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

        this.dispositivoService.consultarAccion(Acciones.LiberarPlataformaBalanza).pipe(takeUntil(this.onDestroy)).subscribe(accion => {
          if (accion && accion.esAutomatica) {

            this.balanzaService.liberarBalanza(comando.id, this.esEntrada).pipe(takeUntil(this.onDestroy)).subscribe(() => {
              // Liberó balanza.

            }, (error: HttpErrorResponse) => {
              if (error.status === HttpStatus.BAD_GATEWAY) {
                this.popupService.error(error.error.message, 'Error de Conexión');
              }
            });
          }
        });
        if (this.esContinuar) {
          this.continuar();
        } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
          this.destroyedByNavigation = true;
          setTimeout(() => this.navigationService.navigateBackToSource(), 1500);
        }
        this.resetForm();
      }, (error: HttpErrorResponse) => {
        if (error.status !== HttpStatus.UNPROCESSABLE_ENTITY) {
          return;
        }

        if (error.error && error.error.data && error.error.data.validationData) {
          this.mapearRoles(error.error.data.validationData);
          this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
        }
      });
  }

  private continuar(): void {
    this.esContinuar = !this.esContinuar;
    if (this.movimiento) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'idMovimiento': this.movimiento.id,
          'operacion': Operaciones.Alta
        }
      };
      this.destroyedByNavigation = true;
      const idMovimiento = this.movimiento.id;
      setTimeout(() => this.navigationService.navigateByMovement(idMovimiento, this.basePath, navigationExtras), 1500);
    }
  }

  private mapearRoles(roles: any) {
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

  construirCommand(): RegistrarPesajeCamionCommand {
    if (this.movimiento) {
      const comando = new RegistrarPesajeCamionCommand(this.movimiento.id);

      let controlPeso: AbstractControl | null;

      comando.esAutomatico = this.esAutomatico;

      if (this.esEntrada) {
        const realizaDescargaCarga = this.registrarPesoForm.get('situacionEntrada.realizaDescargaCarga');
        if (realizaDescargaCarga && realizaDescargaCarga.value) {
          comando.fueExitoso = realizaDescargaCarga.value;
          const lugarEntregaControl = this.registrarPesoForm.get('lugarDescargaCarga');
          if (lugarEntregaControl && lugarEntregaControl.value) {
            comando.IdCondicionManipuleo = lugarEntregaControl.value.id;
          }
        }
        const motivos = this.registrarPesoForm.get('situacionEntrada.motivos');
        if (motivos) {
          comando.motivosNoDescargaCarga = motivos.value.filter(e => e.checked);
        }
      } else {
        const realizoDescargaCarga = this.registrarPesoForm.get('situacionSalida.realizaDescargaCarga');
        if (realizoDescargaCarga) {
          comando.fueExitoso = realizoDescargaCarga.value;
        }
        const motivos = this.registrarPesoForm.get('situacionSalida.motivos');
        if (motivos) {
          comando.motivosNoDescargaCarga = motivos.value.filter(e => e.checked);
        }
      }

      if (this.esAutomatico) {
        comando.pesadas = this.pesosTomados.getRawValue() as PesoRegistrado[];
      } else {
        if (this.pesaBruto) {
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
      comando.esDescarga = this.esDescarga;
      comando.version = this.movimiento.version;

      comando.autorizaciones = this.autorizaciones;
      return comando;
    } else {
      return new RegistrarPesajeCamionCommand(0);
    }
  }

  resolverSituacion() {
    if (this.esEntrada) {
      this.modalSituacionEntrada.open();
    } else {
      this.modalSituacionSalida.open();
    }
  }

  onAcceptedSituacionBalanza() {
    this.situacionControlada = true;
    if (this.esDescarga) {
      const realizaDescargaCarga = this.registrarPesoForm.get('situacionEntrada.realizaDescargaCarga');
      if (realizaDescargaCarga && realizaDescargaCarga.value === ResultadosPesaje.Error) {
        this.registrarPesoForm.controls.lugarDescargaCarga.disable();
      } else if (this.LugarDescargaCargaActivado &&
        realizaDescargaCarga &&
        realizaDescargaCarga.value === ResultadosPesaje.Exito) {
        this.registrarPesoForm.controls.lugarDescargaCarga.enable();
      }
    }
  }

  onClosingSituacionBalanza() {
    this.setearHabilitacionBotonAceptar();

    setTimeout(() => {
      if (this.disableAceptar) {
        this.botonResolverSituacion.nativeElement.focus();
      } else {
        this.botonAceptar.nativeElement.focus();
      }
    }, 0);
  }

  resetForm() {
    const bruto = this.registrarPesoForm.get('datosPesaje.kilosBruto');
    const tara = this.registrarPesoForm.get('datosPesaje.kilosTara');
    const tarjetaControl = this.registrarPesoForm.get('busquedaMovimiento.tarjeta');
    this.setEnableFiltroBusqueda(true);
    if (bruto && tara && tarjetaControl) {
      tara.disable();
      bruto.disable();
      this.busquedaMovimientoPesaje.resetForm();
    }
    this.disableButtons = true;
    this.movimiento = undefined;
    this.esAutomatico = false;
    this.situacionControlada = false;
    this.disableAceptar = true;
    this.pesoNeto = undefined;
    setTimeout(() => {
      this.busquedaMovimientoPesaje.setFocus();
    }, 500);

    this.createForm();
    this.busquedaMovimientoPesaje.determinarSentidoBalanza();
    const motivosNoDescarga = this.registrarPesoForm.get('situacionEntrada.motivos');
    if (motivosNoDescarga) {
      setTimeout(() => {
        motivosNoDescarga.updateValueAndValidity();
      }, 500);
    }
  }

  cancelar() {
    if (this.movimiento) {
      this.movimientoService.desmarcarMovimientoEnPuesto(this.movimiento.id).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.navigateBack();
        });
    } else {
      this.navigateBack();
    }
  }

  navigateBack() {
    if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateBack(), 1500);
    } else {
      this.resetForm();
    }
  }

  aceptarContinuar() {
    this.esContinuar = true;
    this.aceptar();
  }

  onAutorizacionCompletada(autorizaciones: Autorizacion[]) {
    this.autorizaciones = this.autorizaciones.concat(autorizaciones);
    if (this.autorizaciones && this.rolesAAutorizar.every(r => this.autorizaciones.some(a => r.some(rol => rol.id === a.idRol)))) {
      this.registrar();
    }
  }

  onStockDisponible(stock: ConsultarStockDataView) {
    const lugarDescargaCargaCtrl = this.registrarPesoForm.get('lugarDescargaCarga');
    if (stock && lugarDescargaCargaCtrl && lugarDescargaCargaCtrl.value) {
      if (this.movimiento && this.movimiento.idTipoMovimiento === TiposMovimiento.Carga) {
        if (stock.cantidadEstimada) {
          this.actualizarCantidadEstimada(stock.cantidadEstimada);
        }
        const motivosNoDescargaCarga = this.esEntrada ? this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray
          : this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
        if (motivosNoDescargaCarga) {

          const indiceStockInsuficiente = (motivosNoDescargaCarga.value as MotivoNoDescarga[])
            .findIndex(e => e.id === MotivosErrorBalanza.StockInsuficiente);

          const pesoNeto = this.formComponentService.getValue('datosPesaje.netoBalanza');

          const motivoStockInsuficiente = motivosNoDescargaCarga.at(indiceStockInsuficiente).value;

          if (this.esEntrada) {
            motivoStockInsuficiente.checked = stock.stockFisicoInsuficiente || stock.stockTitularInsuficiente;
          } else if (pesoNeto) {
            motivoStockInsuficiente.checked = stock.stockFisicoInsuficiente || stock.stockTitularInsuficiente;
          }

          motivosNoDescargaCarga.at(indiceStockInsuficiente).setValue(motivoStockInsuficiente);
        }
        this.setearHabilitacionBotonAceptar();
      }
    }
  }

  actualizarCantidadEstimada(cantidadEstimada: number) {
    if (this.movimiento) {
      this.formComponentService.setValue('datosMovimiento.cantidadEstimada', cantidadEstimada);
      this.movimiento.cantidadEstimada = cantidadEstimada;

      const motivosNoDescargaCarga = this.esEntrada ? this.registrarPesoForm.get('situacionEntrada.motivos') as FormArray
        : this.registrarPesoForm.get('situacionSalida.motivos') as FormArray;
      if (motivosNoDescargaCarga) {
        const indiceCantidadEstimada = (motivosNoDescargaCarga.value as MotivoNoDescarga[])
          .findIndex(e => e.id === MotivosErrorBalanza.ExcedeCantidadOrdenDeCarga);

        const pesoNeto = this.formComponentService.getValue('datosPesaje.netoBalanza');
        const motivoCantidadEstimada = motivosNoDescargaCarga.at(indiceCantidadEstimada).value;

        if (pesoNeto) {
          motivoCantidadEstimada.checked = this.movimiento.cantidadEstimada < pesoNeto;
        }

        motivosNoDescargaCarga.at(indiceCantidadEstimada).setValue(motivoCantidadEstimada);
        this.setearHabilitacionBotonAceptar();
      }
    }
  }

  onTomarPesaje(): void {
    this.disableAceptar = true;
    this.situacionControlada = false;
  }

  onHabilitarBalanzaClicked(): void {
    setTimeout(() => {
      this.disableButtons = false;
      this.datosPesajeComponent.setFocusPesaje();
    }, 0);
  }
}
