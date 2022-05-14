import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { BotonesEnum, SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { Dictionary } from '../../core/models/dictionary';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { GestionarMovimientoDataView } from '../../shared/data-models/gestionar-movimientos/gestionar-movimiento-data-view';
import { TipoMovimiento, tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { Actividades, TiposProducto, Operaciones, TiposTransporte, Permission, TiposMovimiento, TiposDocumentoPorte } from '../../shared/enums/enums';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { ConsultaSanService } from './consulta-san.service';
import { FiltroBusquedaMovimientosComponent } from './filtro-busqueda-movimientos/filtro-busqueda-movimientos.component';
import { SearchMovimientosService } from './search-movimientos.service';
import { EstadoMovimientoSan } from '../../shared/data-models/gestionar-movimientos/estado-movimiento-san';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { Terminal } from '../../shared/data-models/terminal';
import { AuthService } from '../../core/services/session/auth.service';

@Component({
  selector: 'yrd-gestionar-movimientos',
  templateUrl: './gestionar-movimientos.component.html',
  styleUrls: ['./gestionar-movimientos.component.css']
})

export class GestionarMovimientosComponent extends SearchFormComponent<Array<GestionarMovimientoDataView>>
  implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('filtroComponent') filtroComponent: FiltroBusquedaMovimientosComponent;

  form: FormGroup;
  filters: Dictionary<string>;
  selectedRow: any;
  Permission = Permission;
  idPorte: number;
  GestionarMovimientosPath = 'GestionarMovimientos';
  ConsultaCamionDescargaPath = 'ConsultaMovimiento';
  ModificarControlDescargaCamionCerealesPath = 'ModificarControlDescargaCamionCereales';
  ModificarControlDescargaCamionTransportesVariosPath = 'ModificarControlDescargaCamionTransportesVarios';
  ModificarControlDescargaCamionInsumosVariosPath = 'ModificarControlDescargaCamionInsumosVarios';
  ModificarControlDescargaCamionSubProductosNoGranosPath = 'ModificarControlDescargaCamionSubProductosNoGranos';
  ModificarControlDescargaVagonCerealesPath = 'ModificarControlDescargaVagonCereales';
  ModificarControlDescargaVagonNoGranosPath = 'ModificarControlDescargaVagonNoGranos';
  ModificarPesosFueraCircuitoPath = 'ModificarPesosFueraDeCircuito';
  ModificarProductoFueraCircuitoPath = 'ModificarProductoFueraCircuito';
  ModificarCalidadFueraCircuitoPath = 'ModificarCalidadCalado';
  ModificarControlCargaCamionPath = 'ControlarCargaCamion';
  ModificarControlCargaCamionVariosPath = 'ControlarCargaCamionVarios';
  ModificarDatosOrdenCargaCamionPath = 'ModificarDatosOrdenCargaCamion';
  ModificarDatosOrdenCargaCamionVariosPath = 'ModificarDatosOrdenCargaCamionVarios';
  estadosValidosParaModificarFueraCircuito: number[];
  estadosValidosParaModificarPesoFueraCircuito: number[];
  estadosValidosParaModificarProductoFueraCircuito: number[];
  estadosValidosParaModificarCalidadFueraCircuito: number[];
  private readonly onDestroy = new Subject();
  terminal: Terminal;
  esMovimientoCarga = false;
  private destroyedByNavigation = false;

  constructor(private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              searchMovimientosService: SearchMovimientosService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly navigationService: NavigationService,
              private readonly estadoMovimientoService: EstadoMovimientoService,
              private readonly consultaSanService: ConsultaSanService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService) {
    super(searchMovimientosService, notificationActionsService, popupService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarMovimientosConsultar;
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
   }

  ngOnInit() {
    this.setFilters();
    this.Init();
  }

  ngAfterViewInit() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((_: any) => {
        const prevState = this.pageStateService.getState(this.route.toString());
        if (prevState) {
          this.form.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        }
      });
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
    this.onDestroy.next();
    this.onDestroy.complete();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  private Init() {
    this.createForm();
    this.setGridColumns();
    this.subscribeToActionEventsPrivate();
    this.subscribeToFiltersChanges();
    this.subscribeCambioOpcionFiltro();

    this.estadosValidosParaModificarFueraCircuito =
      this.completarEstadosValidosParaAccion(Actividades.ModificarControlFueraCircuito);

    this.estadosValidosParaModificarPesoFueraCircuito =
      this.completarEstadosValidosParaAccion(Actividades.ModificarPesosFueraCircuito);

    this.estadosValidosParaModificarCalidadFueraCircuito =
      this.completarEstadosValidosParaAccion(Actividades.ModificarCalidadFueraCircuito);

    this.estadosValidosParaModificarProductoFueraCircuito =
      this.completarEstadosValidosParaAccion(Actividades.ModificarProductoFueraCircuito);

    this.fcService.initialize(this.form);

    this.valorPorDefectoFiltro();
  }

  private valorPorDefectoFiltro() {
    this.fcService.setValue('filtros.tipoDocPorte', {id: TiposDocumentoPorte.CartaDePorteCamion}, {onlySelf: true});
    this.destroyedByNavigation = false;
    setTimeout(() => {
      this.fcService.setValue('filtros.opcionFiltro', 1, {onlySelf: true});
    }, 0);
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.FechaOperacion,
        prop: 'fechaOperacion'
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocumentoPorte',
        canAutoResize: false,
        draggable: false,
        resizable: false,
        width: 130
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'numeroDocumentoPorte',
        canAutoResize: false,
        draggable: false,
        resizable: false,
        width: 130
      },
      {
        name: Resources.Labels.CodigoTrazabilidadGrano,
        prop: 'ctg',
        canAutoResize: false,
        draggable: false,
        resizable: false,
        width: 120
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.Tarjeta,
        prop: 'tarjeta'
      },
      {
        name: Resources.Labels.Turno,
        prop: 'turno'
      },
      {
        name: Resources.Labels.PatenteCamion,
        prop: 'patenteCamion'
      },
      {
        name: Resources.Labels.Vagon,
        prop: 'vagon'
      },
      {
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaEntrada'
      },
      {
        name: Resources.Labels.FechaSalida,
        prop: 'fechaSalida'
      }
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters['opcionFiltro'] = 1;
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickView
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickView(row)
      );

    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickClear()
      );
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }

    const movimiento = row as GestionarMovimientoDataView;
    this.esMovimientoCarga = movimiento && movimiento[0] && movimiento[0].idTipoMovimiento === TiposMovimiento.Carga;
  }

  private clickClear() {
    this.onDestroy.next();
    this.clear();
  }

  public clear() {
    this.fcService.resetForm({ emitEvent: true });
    this.selectedRow = null;
    this.setFilters();
    this.Init();
  }

  private clickView(row) {
    const movimiento = row as GestionarMovimientoDataView;
    const extras: NavigationExtras = {
      queryParams: {
          'idMovimiento' : movimiento.id,
          'idTipoProducto' : movimiento.idTipoProducto,
          'idTipoMovimiento': movimiento.idTipoMovimiento,
          'idTipoTransporte': movimiento.idTipoTransporte,
          'esConsulta': true,
          'operacion': Operaciones.Consulta
      }
    };
    this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
    this.destroyedByNavigation = true;
    this.navigationService.navigate(this.GestionarMovimientosPath, this.ConsultaCamionDescargaPath, extras);
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        tipoDocPorte: { value: '', disabled: false },
        nroDocPorte: [{ value: '', disabled: false },
          { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur' }],
        fechaOperacionDesde: [{ value: '', disabled: true }, Validators.required],
        fechaOperacionHasta: [{ value: '', disabled: true }, Validators.required],
        tipoMovimiento: { value: { id: -1 }, disabled: true },
        tipoTransporte: { value: { id: -1 }, disabled: true },
        patente: { value: '', disabled: true },
        vagon: { value: '', disabled: true },
        tarjeta: { value: '', disabled: true },
        opcionFiltro: { value: 1, disabled: false }
      })
    });
  }

  onClickModificarControl(modificarDatosOrdenCarga: boolean = false): void {
    if (this.selectedRow.length !== 1) {
      return;
    }

    const movimiento = this.selectedRow[0] as GestionarMovimientoDataView;

    if (!this.estadosValidosParaModificarFueraCircuito.some(e => e === movimiento.idEstadoMovimiento)) {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
      return;
    }

    this.consultaSanService.leerEstadoDeStockEnSan(movimiento.id)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(stockMovimientoSan => {

      const resultadoValidacionStock =
        this.ValidarEstadoStock(stockMovimientoSan.fechaStockSan, stockMovimientoSan.fechaStockSanRecibida, stockMovimientoSan.imputaStock);
      if (!resultadoValidacionStock) {
        return;
      }

      this.consultaSanService.leerEstadoDeMovimientoEnSan(movimiento.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(estadoMovimientoSan => {

        const resultadoValidacionEstadoMovimiento = this.ValidarEstadoMovimientoDatosGenerales( estadoMovimientoSan,
                                                                                                movimiento.idTipoMovimiento);
        if (!resultadoValidacionEstadoMovimiento) {
          return;
        }

        const extras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'esFueraCircuito' : true,
              'idTipoProducto': movimiento.idTipoProducto,
              'idTipoTransporte': movimiento.idTipoTransporte,
              'idTipoMovimiento': movimiento.idTipoMovimiento,
              'debeDeshabilitarControlesPorMovimientoAplicadoEnSan': estadoMovimientoSan.cantidadAplicada > 0,
          }
        };
        this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
        if (movimiento.idTipoMovimiento === TiposMovimiento.Carga) {
          if (modificarDatosOrdenCarga) {
            this.navigateCargaCamionOrdenDeCarga(movimiento, extras);
          } else {
            this.navigateCargaCamion(movimiento, extras);
          }
        } else {
          if (movimiento.idTipoTransporte === TiposTransporte.Camion) {
            switch (movimiento.idTipoProducto) {
              case TiposProducto.Cereal:
                this.destroyedByNavigation = true;
                this.navigationService.navigate(this.GestionarMovimientosPath,
                  this.ModificarControlDescargaCamionCerealesPath,
                  extras);
                break;
              case TiposProducto.NoGranos:
              case TiposProducto.SubProductos:
                this.destroyedByNavigation = true;
                this.navigationService.navigate(this.GestionarMovimientosPath,
                  this.ModificarControlDescargaCamionSubProductosNoGranosPath,
                  extras);
                break;
              case TiposProducto.Varios:
              case TiposProducto.Insumos:
              case TiposProducto.InsumosLiquidos:
                this.destroyedByNavigation = true;
                this.navigationService.navigate(this.GestionarMovimientosPath,
                  this.ModificarControlDescargaCamionInsumosVariosPath,
                  extras);
                break;
            }
          } else {
            switch (movimiento.idTipoProducto) {
              case TiposProducto.Cereal:
                this.destroyedByNavigation = true;
                this.navigationService.navigate(this.GestionarMovimientosPath,
                  this.ModificarControlDescargaVagonCerealesPath,
                  extras);
                break;
              case TiposProducto.NoGranos:
                this.destroyedByNavigation = true;
                this.navigationService.navigate(this.GestionarMovimientosPath,
                  this.ModificarControlDescargaVagonNoGranosPath,
                  extras);
                break;
            }
          }
        }
      });
    });
  }

  private navigateCargaCamion(movimiento: GestionarMovimientoDataView, navigationExtras: NavigationExtras): void {
    switch (movimiento.idTipoProducto) {
      case TiposProducto.Cereal:
      case TiposProducto.NoGranos:
      case TiposProducto.SubProductos:
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarMovimientosPath,
                                        this.ModificarControlCargaCamionPath,
                                        navigationExtras);
        break;
    case TiposProducto.Varios:
    case TiposProducto.Insumos:
    default:
      this.destroyedByNavigation = true;
      this.navigationService.navigate(this.GestionarMovimientosPath,
                                      this.ModificarControlCargaCamionVariosPath,
                                      navigationExtras);
      break;
    }
  }

  private navigateCargaCamionOrdenDeCarga(movimiento: GestionarMovimientoDataView, navigationExtras: NavigationExtras): void {
    switch (movimiento.idTipoProducto) {
      case TiposProducto.Cereal:
      case TiposProducto.NoGranos:
      case TiposProducto.SubProductos:
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarMovimientosPath,
                                        this.ModificarDatosOrdenCargaCamionPath,
                                        navigationExtras);
        break;
    case TiposProducto.Varios:
    case TiposProducto.Insumos:
    default:
      this.destroyedByNavigation = true;
      this.navigationService.navigate(this.GestionarMovimientosPath,
                                      this.ModificarDatosOrdenCargaCamionVariosPath,
                                      navigationExtras);
      break;
    }
  }

  onClickModificarBalanza(): void {
    if (this.selectedRow.length !== 1) {
      return;
    }
    const movimiento = this.selectedRow[0] as GestionarMovimientoDataView;

    if (!this.estadosValidosParaModificarPesoFueraCircuito.some(e => e === movimiento.idEstadoMovimiento)) {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
      return;
    }

     this.consultaSanService.leerEstadoDeStockEnSan(movimiento.id)
     .pipe(takeUntil(this.onDestroy))
     .subscribe(stockMovimientoSan => {

      const resultadoValidacionStock =
        this.ValidarEstadoStock(stockMovimientoSan.fechaStockSan, stockMovimientoSan.fechaStockSanRecibida, stockMovimientoSan.imputaStock);
       if (!resultadoValidacionStock) {
        return;
      }

       this.consultaSanService.leerEstadoDeMovimientoEnSan(movimiento.id)
       .pipe(takeUntil(this.onDestroy))
       .subscribe(estadoMovimientoSan => {

        const resultadoValidacionEstadoMovimiento = this.ValidarEstadoMovimientoDatosBalanza(estadoMovimientoSan);
        if (!resultadoValidacionEstadoMovimiento) {
          return;
        }
        const extras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'idTipoTransporte' : movimiento.idTipoTransporte,
          }
        };
        this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarMovimientosPath, this.ModificarPesosFueraCircuitoPath, extras);
       });
     });
  }

  onClickModificarProducto(): void {
    if (this.selectedRow.length !== 1) {
      return;
    }
    const movimiento = this.selectedRow[0] as GestionarMovimientoDataView;

    if (!this.estadosValidosParaModificarProductoFueraCircuito.some(e => e === movimiento.idEstadoMovimiento)) {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
      return;
    }

    this.consultaSanService.leerEstadoDeStockEnSan(movimiento.id)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(stockMovimientoSan => {

      const resultadoValidacionStock =
        this.ValidarEstadoStock(stockMovimientoSan.fechaStockSan, stockMovimientoSan.fechaStockSanRecibida, stockMovimientoSan.imputaStock);
      if (!resultadoValidacionStock) {
        return;
      }

      this.consultaSanService.leerEstadoDeMovimientoEnSan(movimiento.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(estadoMovimientoSan => {

        const resultadoValidacionEstadoMovimiento = this.ValidarEstadoMovimientoDatosProducto(estadoMovimientoSan);
        if (!resultadoValidacionEstadoMovimiento) {
          return;
        }

        const extras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'idTipoProducto': movimiento.idTipoProducto,
              'idTipoTransporte': movimiento.idTipoTransporte,
              'idTipoMovimiento': movimiento.idTipoMovimiento
          }
        };
        this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarMovimientosPath, this.ModificarProductoFueraCircuitoPath, extras);
      });
    });
  }

  onClickModificarCalidad(): void {
    if (this.selectedRow.length !== 1) {
      return;
    }
    const movimiento = this.selectedRow[0] as GestionarMovimientoDataView;

    if (movimiento.idTipoProducto === TiposProducto.Varios) {
      this.popupService.error(Resources.Messages.NoSePuedeModificarLaCalidadDeUnMovimientoConProductoDelTipoVarios,
        Resources.Labels.Error);
      return;
    }

    if (!this.estadosValidosParaModificarCalidadFueraCircuito.some(e => e === movimiento.idEstadoMovimiento)) {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion,
        Resources.Labels.Error);
      return;
    }

    this.consultaSanService.leerEstadoDeStockEnSan(movimiento.id)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(stockMovimientoSan => {

      const resultadoValidacionStock =
        this.ValidarEstadoStock(stockMovimientoSan.fechaStockSan, stockMovimientoSan.fechaStockSanRecibida, stockMovimientoSan.imputaStock);
      if (!resultadoValidacionStock) {
        return;
      }

      this.consultaSanService.leerEstadoDeMovimientoEnSan(movimiento.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(estadoMovimientoSan => {

        const resultadoValidacionEstadoMovimiento = this.ValidarEstadoMovimientoDatosCalidad(estadoMovimientoSan);
        if (!resultadoValidacionEstadoMovimiento) {
          return;
        }

        const extras: NavigationExtras = {
          queryParams: {
            'idMovimiento': movimiento.id,
            'esFueraCircuito': true,
            'operacion': Operaciones.Modificacion
          }
        };
        this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarMovimientosPath, this.ModificarCalidadFueraCircuitoPath, extras);

      });
    });
  }

  private ValidarEstadoStock(fechaStockSan: Date, fechaStockSanRecibida: Date, imputaStock: boolean): boolean {

    if (imputaStock && new Date(fechaStockSan) < new Date(fechaStockSanRecibida)) {

      const mensaje = Resources.Messages.ModificacionFueraDeCircuitoPeriodoStockCerrado
        .format(fechaStockSanRecibida.toString());

      this.popupService.error(mensaje);
      return false;
    }

    return true;
  }
  private ValidarEstadoMovimientoDatosGenerales(estadoMovimientoSan: EstadoMovimientoSan, idTipoMovimiento: number): boolean {

    if (estadoMovimientoSan.fueEmitidoFormularioF1116) {

      const mensaje = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseMovimientoAplicadoYF1116Emitido
        .format(estadoMovimientoSan.cantidadAplicada.toString(),
                estadoMovimientoSan.cantidadLiquidada.toString(),
                estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO');

      this.popupService.error(mensaje);
      return false;
    }

    if (estadoMovimientoSan.cantidadAplicada > 0) {
      let mensaje: string;

      if (idTipoMovimiento === TiposMovimiento.Descarga) {
         mensaje = Resources.Messages.ModificacionFueraDeCircuitoPodranModificarseCiertosCamposDelMovimiento
          .format(estadoMovimientoSan.cantidadAplicada.toString(),
                  estadoMovimientoSan.cantidadLiquidada.toString(),
                  estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO');

      } else {
        mensaje = Resources.Messages.ModificacionFueraDeCircuitoCargaNoPodranModificarseCiertosCamposDelMovimiento
          .format(estadoMovimientoSan.cantidadAplicada.toString(),
                  estadoMovimientoSan.cantidadLiquidada.toString(),
                  estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO');
      }

      this.popupService.warning(mensaje);
      return true;
    }

    return true;
  }
  private ValidarEstadoMovimientoDatosCalidad(estadoMovimientoSan: EstadoMovimientoSan): boolean {

    if (estadoMovimientoSan.fueEmitidoFormularioF1116 ||
        estadoMovimientoSan.cantidadAplicada > 0 ||
        estadoMovimientoSan.cantidadLiquidada > 0) {

      const mensaje = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseCalidadMovimiento
        .format(estadoMovimientoSan.cantidadAplicada.toString(),
                estadoMovimientoSan.cantidadLiquidada.toString(),
                estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO');

      this.popupService.error(mensaje);
      return false;
    }
    return true;
  }
  private ValidarEstadoMovimientoDatosProducto(estadoMovimientoSan: EstadoMovimientoSan): boolean {

    if (estadoMovimientoSan.fueEmitidoFormularioF1116 ||
        estadoMovimientoSan.cantidadAplicada > 0 ||
        estadoMovimientoSan.cantidadLiquidada > 0) {

      const mensaje = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseProductoMovimiento
        .format(estadoMovimientoSan.cantidadAplicada.toString(),
                estadoMovimientoSan.cantidadLiquidada.toString(),
                estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO');

      this.popupService.error(mensaje);
      return false;
    }
    return true;
  }
  private ValidarEstadoMovimientoDatosBalanza(estadoMovimientoSan: EstadoMovimientoSan): boolean {

    if (estadoMovimientoSan.fueEmitidoFormularioF1116 ||
        (estadoMovimientoSan.kgPesoNeto != null && estadoMovimientoSan.cantidadAplicada > 0) ||
        (estadoMovimientoSan.kgPesoNeto != null && estadoMovimientoSan.cantidadLiquidada > 0)) {

      const mensaje = Resources.Messages.ModificacionFueraDeCircuitoNoPodraModificarseDatosPesaje
        .format(estadoMovimientoSan.cantidadAplicada.toString(),
                estadoMovimientoSan.cantidadLiquidada.toString(),
                estadoMovimientoSan.fueEmitidoFormularioF1116 ? 'SI' : 'NO',
                estadoMovimientoSan.kgPesoNeto.toString());

      this.popupService.error(mensaje);
      return false;
    }
    return true;
  }

  private completarEstadosValidosParaAccion(actividad: number): number[] {
    const estadosValidos = new Array<number>();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[1].id,
                                [actividad])
                                .pipe(takeUntil(this.onDestroy))
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    return estadosValidos;
  }

  private subscribeCambioOpcionFiltro() {
    const opcionFiltro = this.form.get('filtros.opcionFiltro');
    if (opcionFiltro) {
      this.subscribeChangeDesplegablePorte();
      opcionFiltro.valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe((value: number) => {
        if (value === 1 || value === null) {
          this.filters['opcionFiltro'] = value;
          this.activarOpcionFiltroDocumento();
          this.desactivarOpcionFiltroCircuito();
          this.desactivarOpcionFiltroFueraCircuito();
        } else if (value === 2) {
          this.filters['opcionFiltro'] = value;
          this.desactivarOpcionFiltroDocumento();
          this.activarOpcionFiltroCircuito();
          this.desactivarOpcionFiltroFueraCircuito();
        } else if (value === 3) {
          this.filters['opcionFiltro'] = value;
          this.desactivarOpcionFiltroDocumento();
          this.desactivarOpcionFiltroCircuito();
          this.activarOpcionFiltroFueraCircuito();
        }
      });
    }
  }

  private activarOpcionFiltroDocumento() {
    this.fcService.enableControl('filtros.tipoDocPorte');
    this.fcService.enableControl('filtros.nroDocPorte');
    this.fcService.setValue('filtros.tipoDocPorte', {id: this.idPorte}, {onlySelf: true});
  }

  private desactivarOpcionFiltroDocumento() {
    const tipoDocPorte = this.form.get('filtros.tipoDocPorte');
    const nroDocPorte = this.form.get('filtros.nroDocPorte');
    if (tipoDocPorte && nroDocPorte) {
      tipoDocPorte.setValue('', {onlySelf: true, emitEvent: false});
      nroDocPorte.setValue('', {onlySelf: true, emitEvent: false});
      tipoDocPorte.disable();
      nroDocPorte.disable();
    }
  }


  private activarOpcionFiltroCircuito() {
    this.fcService.enableControl('filtros.patente');
    this.fcService.enableControl('filtros.vagon');
    if (this.terminal.utilizaTarjeta) {
      this.fcService.enableControl('filtros.tarjeta');
    }
  }

  private desactivarOpcionFiltroCircuito() {
    const patente = this.form.get('filtros.patente');
    const vagon = this.form.get('filtros.vagon');
    const tarjeta = this.form.get('filtros.tarjeta');
    if (patente && vagon && tarjeta) {
      patente.setValue('', {onlySelf: true, emitEvent: false});
      vagon.setValue('', {onlySelf: true, emitEvent: false});
      tarjeta.setValue('', {onlySelf: true, emitEvent: false});
      patente.disable();
      vagon.disable();
      tarjeta.disable();
    }
  }

  private activarOpcionFiltroFueraCircuito() {
    this.fcService.enableControl('filtros.tipoMovimiento');
    this.fcService.enableControl('filtros.tipoTransporte');
    this.fcService.enableControl('filtros.fechaOperacionDesde');
    this.fcService.enableControl('filtros.fechaOperacionHasta');
  }

  private desactivarOpcionFiltroFueraCircuito() {
    const tipoMovimiento = this.form.get('filtros.tipoMovimiento');
    const tipoTransporte = this.form.get('filtros.tipoTransporte');
    const fechaOperacionDesde = this.form.get('filtros.fechaOperacionDesde');
    const fechaOperacionHasta = this.form.get('filtros.fechaOperacionHasta');
    if (tipoMovimiento && tipoTransporte && fechaOperacionDesde && fechaOperacionHasta) {
      fechaOperacionDesde.setValue('', {onlySelf: true, emitEvent: false});
      fechaOperacionHasta.setValue('', {onlySelf: true, emitEvent: false});
      tipoMovimiento.disable();
      tipoTransporte.disable();
      fechaOperacionDesde.disable();
      fechaOperacionHasta.disable();
    }
  }

  private subscribeToFiltersChanges() {
    const tipoDocumentoCtrl = this.form.get('filtros.tipoDocPorte');
    const nroDocumentoCtrl  = this.form.get('filtros.nroDocPorte');
    const fechaOperacionDesdeCtrl = this.form.get('filtros.fechaOperacionDesde');
    const fechaOperacionHastaCtrl  = this.form.get('filtros.fechaOperacionHasta');
    const tipoMovimientoCtrl  = this.form.get('filtros.tipoMovimiento');
    const tipoTransporteCtrl = this.form.get('filtros.tipoTransporte');
    const patenteCtrl = this.form.get('filtros.patente');
    const vagonCtrl = this.form.get('filtros.vagon');
    const tarjetaCtrl = this.form.get('filtros.tarjeta');

    if (tipoDocumentoCtrl && nroDocumentoCtrl && fechaOperacionDesdeCtrl
       && fechaOperacionHastaCtrl && tipoMovimientoCtrl && tipoTransporteCtrl
       && patenteCtrl && vagonCtrl && tarjetaCtrl ) {
      tipoDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: TipoDocumentoPorte) => {
        this.filters['tipoDocumento'] = value ? value.id : null;
      });
      nroDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['nroDocumento'] = value;
      });
      fechaOperacionDesdeCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['fechaOperacionDesde'] = value;
      });
      fechaOperacionHastaCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['fechaOperacionHasta'] = value;
      });
      tipoMovimientoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: TipoMovimiento) => {
        this.filters['tipoMovimiento'] = (value && value.id) ? value.id : -1;
      });
      tipoTransporteCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: TipoTransporte) => {
        this.filters['tipoTransporte'] = (value && value.id) ? value.id : -1;
      });
      patenteCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['patente'] = value;
      });
      vagonCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['vagon'] = value;
      });
      tarjetaCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['tarjeta'] = value;
      });
    }
  }

  private subscribeChangeDesplegablePorte() {
    const tipoPorteCtrl = this.form.get('filtros.tipoDocPorte');
    if (tipoPorteCtrl) {
      tipoPorteCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((tipoDocPorte: TipoDocumentoPorte) => {
        if (tipoDocPorte && tipoDocPorte.id) {
          this.idPorte = tipoDocPorte.id;
        }
      });
    }
  }
}
