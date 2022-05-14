import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject, Subscription, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as HttpStatus from 'http-status-codes';

import { PopupService } from '../../core/services/popupService/popup.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { AuthService } from '../../core/services/session/auth.service';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { Terminal } from '../../shared/data-models/terminal';
import { Movimiento } from '../../shared/data-models/movimiento';
import { TipoProducto, tiposProducto } from '../../shared/data-models/tipo-producto';
import { DescargaEventsNotifierService } from '../shared/services/descarga-events-notifier.service';
import { MovimientoPesaje } from '../registrar-peso/movimiento-pesaje';
import { MovimientoPesajeFueraDeCircuitoService } from '../modificaciones/modificar-pesos-fuera-de-circuito/movimiento-pesaje-fuera-de-circuito.service';
import { TiposProducto, TiposTransporte, TiposMovimiento, Actividades, ComportamientoAfip } from '../../shared/enums/enums';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { tiposTransportes } from '../../shared/data-models/tipo-transporte';
import { Command, CommandService } from '../../shared/command-service/command.service';
import { MovimientoCarga } from '../../shared/data-models/movimiento-carga';
import { DatosDocumentoControlarCargaCamionComponent } from '../controlar-carga-camion/datos-documento-controlar-carga-camion/datos-documento-controlar-carga-camion.component';
import { DatosDocumentoControlarCargaCamionInsumoVarioComponent } from '../controlar-carga-camion-varios/datos-documento-controlar-carga-camion-varios/datos-documento-controlar-carga-camion-Insumo-vario.component';
import { CircuitoService } from '../shared/services/circuito.service';
import { Resources } from '../../../locale/artifacts/resources';
import { MuestraTabCalidadDataView } from '../../shared/data-models/muestra-tab-calidad-data-view';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { Titular } from '../../shared/data-models/titular';

@Component({
  selector: 'yrd-consulta-movimiento',
  templateUrl: './consulta-movimiento.component.html',
  styleUrls: ['./consulta-movimiento.component.css']
})
export class ConsultaMovimientoComponent implements OnInit, OnDestroy, AfterViewInit {

  consultaCamionDescargaForm: FormGroup;
  GestionarMovimientosPath = 'GestionarMovimientos';
  ConsultaMovimientoPath = 'ConsultaCamionDescarga';
  protected readonly onDestroy = new Subject();
  circuito: Circuito;
  terminal: Terminal;
  idActividad: number;
  movimiento: Movimiento;
  movimientoCarga: MovimientoCarga;
  movimientoPesaje: MovimientoPesaje;
  idMovimiento: number;
  idTipoMovimiento: number;
  tipoProductoSeleccionada: TipoProducto;
  idTipoProducto: number;
  idTipoTransporte: number;
  showCalidadAnterior = false;
  esCamion = false;
  subscription: Subscription;
  circuitoContemplaCupo = false;
  debeMostrarTabCalidad = false;
  esCalidadCarga = false;
  esCartaPorteElectronica = false;
  tipoDocumentoSeleccionado: TipoDocumentoPorte;
  confirmoCtg = false;
  get esCarga(): boolean {

    return this.idTipoMovimiento === TiposMovimiento.Carga;
  }

  get esDescarga(): boolean {
    return this.idTipoMovimiento === TiposMovimiento.Descarga;
  }

  @ViewChild('datosDocumentoCarga') datosDocumentoCarga: DatosDocumentoControlarCargaCamionComponent;
  @ViewChild('datosDocumentoCargaInsumoVario') datosDocumentoCargaInsumoVario: DatosDocumentoControlarCargaCamionInsumoVarioComponent;

  constructor(protected readonly popupService: PopupService,
    protected readonly navigationService: NavigationService,
    protected readonly movimientoService: MovimientoService,
    protected readonly circuitoService: CircuitoService,
    protected readonly fcService: FormComponentService,
    protected readonly fb: FormBuilder,
    protected readonly authService: AuthService,
    private readonly eventsNotifierService: DescargaEventsNotifierService,
    private readonly movimientoPesajeService: MovimientoPesajeFueraDeCircuitoService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
    private readonly commandService: CommandService) {
      const userContext = this.authService.getUserContext();
      if (userContext) {
        this.terminal = userContext.terminal;
      }
      this.subscription = this.commandService.commands.subscribe((c) => { this.handleCommand(c); });
     }

  ngOnInit() {
    this.createForm();
    this.fcService.initialize(this.consultaCamionDescargaForm);
    this.subscribeFormInteraction();
    this.subscribeNavigation();
  }

  ngAfterViewInit(): void {
    this.setFormDatosDocumentoCarga();
    this.getData();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
  }

  handleCommand(command: Command) {
    if (command.name === 'Cancelar') {
      this.salir();
    }
  }

  subscribeFormInteraction() {
    this.eventsNotifierService.childFormIntanceReady
      .pipe(takeUntil(this.onDestroy))
      .subscribe(([form, identifier]) => {
            switch (identifier) {
              case 'datosDocumentoForm' : {
                setTimeout(() => {
                  this.consultaCamionDescargaForm.setControl('datosDocumento', form );
                });
                break;
              }
              case 'consultarCalidadForm' : {
                this.consultaCamionDescargaForm.setControl('consultarCalidad', form );
                break;
              }
            }
      });
  }

  subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params['idMovimiento']) {
          this.idMovimiento = params['idMovimiento'];
          this.idTipoProducto = +params['idTipoProducto'];
          this.idTipoTransporte = +params['idTipoTransporte'];
          this.idTipoMovimiento = +params['idTipoMovimiento'];
          this.esCamion = this.idTipoTransporte === TiposTransporte.Camion;

          const tipoProducto = tiposProducto.find(t => t.id === this.idTipoProducto);
          if (tipoProducto) {
            this.tipoProductoSeleccionada = tipoProducto;
            this.fcService.setValue(`circuito.tipoProducto`, this.tipoProductoSeleccionada.descripcion, {onlySelf: true}, true);
          }

          if (this.terminal) {
            this.fcService.setValue(`circuito.terminal`, this.terminal.descripcion, {onlySelf: true}, true);
          }

          this.movimientoService.getDebeMostrarTabCalidad(this.idMovimiento)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((value: MuestraTabCalidadDataView) => {
            this.debeMostrarTabCalidad = value.muestraTabCalidad;
            this.esCalidadCarga = value.esCalidadCarga;
          });

        }
      });
  }

  private setFormDatosDocumentoCarga() {
    if (this.esCarga) {
      switch (this.idTipoProducto) {
        case TiposProducto.Cereal:
        case TiposProducto.NoGranos:
        case TiposProducto.SubProductos:
          this.consultaCamionDescargaForm.setControl('datosDocumento', this.datosDocumentoCarga.datosDocumentoForm);
          break;
        case TiposProducto.Varios:
        case TiposProducto.InsumosLiquidos:
        case TiposProducto.Insumos:
        case TiposProducto.Chatarra:
        default:
          this.consultaCamionDescargaForm.setControl('datosDocumento', this.datosDocumentoCargaInsumoVario.datosDocumentoForm);
          break;
      }
    }
  }

  private setActividad() {
    if (this.esCarga) {
        this.idActividad = Actividades.ControlarIngresoCargaCamion;
    } else {
      switch (this.idTipoProducto) {
        case TiposProducto.Cereal:
          this.idActividad = Actividades.ControlarDescargaCamionCereales;
          break;
        case TiposProducto.NoGranos:
          this.idActividad = Actividades.ControlarDescargaCamionNoGranos;
          break;
        case TiposProducto.SubProductos:
          this.idActividad = Actividades.ControlarDescargaCamionSubproductos;
          break;
        case TiposProducto.Varios:
          this.idActividad = Actividades.ControlarDescargaCamionTransportesVarios;
          break;
        case TiposProducto.Insumos:
        case TiposProducto.InsumosLiquidos:
          this.idActividad = Actividades.ControlarDescargaCamionInsumos;
          break;
      }
    }
  }

  private getData(): void {
    this.setActividad();
    if (this.esCarga) {
      this.buscarMovimiento(this.movimientoService.getMovimientoCarga(this.idMovimiento,
                                                                      this.tipoProductoSeleccionada.id));
    } else {
      this.buscarMovimiento(this.movimientoService.getMovimientoDescarga(this.idMovimiento,
                                                                         this.tipoProductoSeleccionada.id,
                                                                         this.idTipoTransporte));
    }
    this.getCircuito();
  }

  private buscarMovimiento(movimientoService: Observable<Movimiento>): void {
    movimientoService.pipe(takeUntil(this.onDestroy)).subscribe(movimiento => {
      this.movimiento = movimiento;
      this.confirmoCtg = movimiento.confirmoCtg;
      this.tipoDocumentoSeleccionado = movimiento.tipoDocumentoPorte;
      this.comportamientoAfip();
    });
  }

  private getCircuito(): void {
    this.circuitoService.getCircuito(this.esCarga ? TiposMovimiento.Carga : TiposMovimiento.Descarga,
                                     this.idTipoTransporte,
                                     this.tipoProductoSeleccionada.id,
                                     [this.idActividad, Actividades.ValidacionCupo])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
        this.circuitoContemplaCupo = this.circuito.poseeActividad(Actividades.ValidacionCupo);
      }, (error: HttpErrorResponse) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          this.popupService.error(Resources.Messages.ElCircuitoSeEncuentraDeshabilitadoONoExistePorFavorReviseLaParametrizacion,
                                  Resources.Labels.Error,
                                  {timeOut: 10000});
        }
      });
  }

  fillMovimiento(movimiento: Movimiento) {
    if (movimiento) {
      this.fillCircuito(movimiento.circuito);
      this.fillDocumentoPorte(movimiento.nroDocumentoPorte,
        movimiento.tipoDocumentoPorte,
        movimiento.codigoTrazabilidadGrano,
        movimiento.titular);
      this.fillEstado(movimiento.estado.descripcion, movimiento.fechaEntrada, movimiento.fechaOperacion, movimiento.fechaSalida );
      this.fillDatosPesaje(movimiento);
      this.eventsNotifierService.onMovimientoRetrieved(movimiento);
    }
  }

  private fillCircuito(circuito: Circuito) {
    const tipoMovimiento = tiposMovimientos.find(t => t.id === circuito.idTipoMovimiento);
    if (tipoMovimiento) {
      this.fcService.setValue(`circuito.tipoMovimiento`, tipoMovimiento.descripcion, { onlySelf: true });
    }
    const tipoTransporte = tiposTransportes.find(t => t.id === circuito.idTipoTransporte);
    if (tipoTransporte) {
      this.fcService.setValue(`circuito.tipoTransporte`, tipoTransporte.descripcion, { onlySelf: true });
    }
  }

  private fillDocumentoPorte(nroDocumentoPorte: string, tipoDocumentoPorte: TipoDocumentoPorte, numeroCTG?: number, titular?: Titular) {
    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, nroDocumentoPorte, {onlySelf: true}, true);
    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`, tipoDocumentoPorte, {onlySelf: true}, true);
    if (this.esCartaPorteElectronica) {
      this.fcService.setValue(`documentoPorte.ctg`, numeroCTG, {onlySelf: true}, true);
      this.fcService.setValue(`documentoPorte.titularCartaPorteCPE`, titular, {onlySelf: true}, true);
    }
  }

  private fillEstado(estadoMovimienoDescripcion: string | undefined, fechaEntrada: string, fechaOperacion: string, fechaSalida: string) {
     this.fcService.setValue(`estadoMovimiento.estadoMovimienoDescripcion`, estadoMovimienoDescripcion, {onlySelf: true}, true);
     this.fcService.setValue(`estadoMovimiento.fechaEntrada`, fechaEntrada, {onlySelf: true}, true);
     this.fcService.setValue(`estadoMovimiento.fechaOperacion`, fechaOperacion, {onlySelf: true}, true);
     this.fcService.setValue(`estadoMovimiento.fechaSalida`, fechaSalida, {onlySelf: true}, true);
  }

  private fillDatosPesaje(movimiento: Movimiento) {
    this.movimientoPesajeService.getMovimientoPesaje(movimiento.id, this.idTipoTransporte)
    .pipe(takeUntil(this.onDestroy))
    .subscribe((movimientoPesaje: MovimientoPesaje) => {
      if (movimientoPesaje) {
        this.movimientoPesaje = movimientoPesaje;
        this.fcService.setValue(`datosStock.datosPesaje.brutoDocPorte`, movimientoPesaje.kgPesoBrutoDocumento, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.taraDocPorte`, movimientoPesaje.kgPesoTaraDocumento, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosDocumento.kilosNeto`, movimientoPesaje.kgPesoNetoDocumento, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.brutoEsRepesaje`, movimientoPesaje.entradaEsRepesaje, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.taraEsRepesaje`, movimientoPesaje.salidaEsRepesaje, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.entradaManualAutomatico`,
                                movimientoPesaje.entradaManualAutomatico, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.salidaManualAutomatico`,
                                movimientoPesaje.salidaManualAutomatico, { onlySelf: true });

        this.fcService.setValue(`datosStock.datosPesaje.kilosBruto`, movimientoPesaje.kgPesoBruto, { onlySelf: true });
        this.fcService.setValue(`datosStock.datosPesaje.kilosTara`, movimientoPesaje.kgPesoTara, { onlySelf: true });

        let netoBalanza;
        let brutoDiferencia;
        let taraDiferencia;
        if (movimientoPesaje.kgPesoBruto && movimientoPesaje.kgPesoTara) {
          netoBalanza = movimientoPesaje.kgPesoBruto - movimientoPesaje.kgPesoTara;
          this.fcService.setValue(`datosStock.datosPesaje.netoBalanza`, netoBalanza, { onlySelf: true });
        }

        if (movimientoPesaje.kgPesoBruto && movimientoPesaje.kgPesoBrutoDocumento) {
          brutoDiferencia = movimientoPesaje.kgPesoBruto - movimientoPesaje.kgPesoBrutoDocumento;
          this.fcService.setValue(`datosStock.datosPesaje.brutoDiferencia`, brutoDiferencia, { onlySelf: true });
        }

        if (movimientoPesaje.kgPesoTaraDocumento && movimientoPesaje.kgPesoTara) {
          taraDiferencia = movimientoPesaje.kgPesoTara - movimientoPesaje.kgPesoTaraDocumento;
          this.fcService.setValue(`datosStock.datosPesaje.taraDiferencia`, taraDiferencia, { onlySelf: true });
        }

        if (movimientoPesaje.kgPesoBrutoDocumento && movimientoPesaje.kgPesoTaraDocumento) {
          const netoDocPorte = movimientoPesaje.kgPesoBrutoDocumento - movimientoPesaje.kgPesoTaraDocumento;
          this.fcService.setValue('datosStock.datosPesaje.netoDocPorte', netoDocPorte, { onlySelf: true });
        }

        if (brutoDiferencia !== undefined && taraDiferencia !== undefined) {
          this.fcService.setValue(`datosStock.datosPesaje.netoDiferencia`, brutoDiferencia - taraDiferencia, { onlySelf: true });
        }
      }
    });
  }

  openConsultarCalidadAnterior(): void {
    window.scroll(0, 0);
    this.showCalidadAnterior = true;
  }

  closeConsultarCalidadAnterior(): void {
    window.scroll(0, 0);
    this.showCalidadAnterior = false;
  }

  salir() {
    this.navigationService.navigateBack();
  }

  private createForm() {
    this.consultaCamionDescargaForm = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        numeroDocumentoPorte: { value: '', disabled: true },
        titularCartaPorteCPE: { value: '', disabled: true },
        ctg: { value: '', disabled: true },
      }),
      estadoMovimiento: this.fb.group({
        estadoMovimienoDescripcion: { value: null, disabled: false },
        fechaEntrada: { value: null, disabled: false },
        fechaOperacion: { value: null, disabled: false },
        fechaSalida: { value: null, disabled: false }
      }),
      datosStock: this.fb.group({
        datosPesaje: this.fb.group({
          brutoDocPorte:   { value: '', disabled: true },
          taraDocPorte:    { value: '', disabled: true },
          netoDocPorte:    { value: '', disabled: true },
          kilosBruto:      { value: '', disabled: true },
          kilosTara:       { value: '', disabled: true },
          netoBalanza:     { value: '', disabled: true },
          brutoDiferencia: { value: '', disabled: true },
          taraDiferencia:  { value: '', disabled: true },
          netoDiferencia:  { value: '', disabled: true },
          brutoEsRepesaje: { value: '', disabled: true },
          taraEsRepesaje:  { value: '', disabled: true },
          entradaManualAutomatico: { value: '', disabled: true },
          salidaManualAutomatico: { value: '', disabled: true }
        }),
        datosMermas: this.fb.group({
          mermas: this.fb.array([]),
          totalMermas: { value: '', disabled: true },
          mermasEspeciales: this.fb.array([])
        }),
        detalle: this.fb.group({
          netoDescarga: { value: '', disabled: true },
          coeficiente: { value: '', disabled: true },
          netoDescargaLitros: { value: '', disabled: true },
          destino: { value: '', disabled: true },
          nroTicketPesaje: { value: '', disabled: true },
          fechaStockSan: { value: '', disabled: true },
        }),
      }),
      decisionMovimiento: this.fb.group({
        decision: { value: '', disabled: true },
        coeficiente: { value: '', disabled: true },
        observacion: { value: '', disabled: true },
      })
    });
  }

  esTipoProductoNoGranoOSubProducto(): boolean {
    return this.tipoProductoSeleccionada.id === TiposProducto.NoGranos ||
            this.tipoProductoSeleccionada.id === TiposProducto.SubProductos;
  }

  esTipoProductoCereal(): boolean {
    return this.tipoProductoSeleccionada.id === TiposProducto.Cereal;
  }

  esTipoProductoVarios(): boolean {
    return this.tipoProductoSeleccionada.id ===  TiposProducto.Varios;
  }

  esTipoProductoInsumo(): boolean {
    return this.tipoProductoSeleccionada.id ===  TiposProducto.Insumos ||
            this.tipoProductoSeleccionada.id === TiposProducto.InsumosLiquidos;
  }

  esTipoProductoChatarra(): boolean {
    return this.tipoProductoSeleccionada.id ===  TiposProducto.Chatarra;
  }

  esTipoProductoDecomiso(): boolean {
    return this.tipoProductoSeleccionada.id === TiposProducto.Decomiso;
  }

  seDebeMostararDatosInsumos(): boolean {
    return this.esDescarga && this.esTipoProductoInsumo();
  }

  seDebeMostarDatosDocumentoControlarCargaCamion(): boolean {
    return this.esCarga && (this.esTipoProductoNoGranoOSubProducto() || this.esTipoProductoCereal());
  }

  seDebeMostardatosDocumentoControlarCargaCamionInsumoVario(): boolean {
    return this.esCarga && (this.esTipoProductoVarios() || this.esTipoProductoInsumo()
                            || this.esTipoProductoChatarra() || this.esTipoProductoDecomiso());
  }

  seDebeMostarTabCalidad(): boolean {
    return this.debeMostrarTabCalidad || this.esCalidadCarga;
  }
  protected comportamientoAfip() {
      this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoSeleccionado.id).subscribe(IdComportamientoAfip => {
        this.esCartaPorteElectronica = IdComportamientoAfip === ComportamientoAfip.RegimenElectronico;
        this.fillMovimiento(this.movimiento);
      });
  }
}
