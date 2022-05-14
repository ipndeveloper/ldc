import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { GestionarControlDataView } from './gestionar-control-data-view';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchControlService } from './services/search-control.service';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { Actividades, TiposTransporte, TiposProducto, Permission, ComportamientoAfip } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { ModalAsignarTarjetaComponent } from '../shared/modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { ModalRechazarDescargaComponent } from '../shared/modals/modal-rechazar-descarga/modal-rechazar-descarga.component';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { CircuitoService } from '../shared/services/circuito.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { AuthService } from '../../core/services/session/auth.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-gestionar-control',
  templateUrl: './gestionar-control.component.html',
  styleUrls: ['./gestionar-control.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchControlService}]
})

export class GestionarControlComponent
     extends SearchFormComponent<Array<GestionarControlDataView>>
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modalAsignarTarjeta') modalAsignarTarjeta: ModalAsignarTarjetaComponent;
  @ViewChild('modalRechazarDescarga') modalRechazarDescarga: ModalRechazarDescargaComponent;

  private readonly onDestroy = new Subject();
  private circuito: Circuito;
  Permission = Permission;
  gestionarControlForm: FormGroup;
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  filters: Dictionary<string>;
  selectedRow: any;
  estadosValidosParaModificarControlIngreso: number[];
  estadosValidosParaModificarFueraPuesto: number[];
  estadosValidosParaModificarFueraCircuito: number[];
  ConsultarModificarControlarDescargaCamionCerealesPath = 'ConsultarModificarControlarDescargaCamionCereales';
  ConsultarModificarControlarDescargaVagonCerealesPath = 'ConsultarModificarControlarDescargaVagonCereales';
  ConsultarModificarControlarDescargaVagonNoGranosPath = 'ConsultarModificarControlarDescargaVagonNoGranos';
  GestionarControlPath = 'GestionarControl';
  ConsultarModificarControlarDescargaCamionTransportesVariosPath = 'ConsultarModificarControlarDescargaCamionTransportesVarios';
  ConsultarModificarControlarDescargaCamionSubproductosPath = 'ConsultarModificarControlarDescargaCamionSubproductos';
  ConsultarModificarControlarDescargaCamionInsumosVariosPath = 'ConsultarModificarControlarDescargaCamionInsumosVarios';
  ModificarControlDescargaCamionCerealesPath = 'ModificarControlDescargaCamionCereales';
  ModificarControlDescargaCamionTransportesVariosPath = 'ModificarControlDescargaCamionTransportesVarios';
  ModificarControlDescargaCamionSubProductosNoGranosPath = 'ModificarControlDescargaCamionSubProductosNoGranos';
  ModificarControlDescargaCamionInsumosVariosPath = 'ModificarControlDescargaCamionInsumosVarios';
  controlarCargaPath = 'ControlarCargaCamionCerealSubproductosNoGranos';
  IngresarCargaCamionPath = 'ControlarCargaCamion';
  IngresarCargaCamionVariosPath = 'ControlarCargaCamionVarios';
  usarTarjeta = true;
  private destroyedByNavigation = false;

  constructor(searchControlService: SearchControlService,
              notificationActionsService: SearchFormActionsNotifierService,
              popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly estadoMovimientoService: EstadoMovimientoService,
              private readonly excelExportService: ExcelService,
              private readonly navigationService: NavigationService,
              private readonly movimientoService: MovimientoService,
              private readonly circuitoService: CircuitoService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {

      super(searchControlService, notificationActionsService, popupService);

      this.botonesHabilitados[BotonesEnum.Consultar] = true;
      this.botonesHabilitados[BotonesEnum.Modificar] = true;
      this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

      this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarControlConsultar;
      this.permisosBotones[BotonesEnum.Modificar] = Permission.GestionarControlModificar;
      this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarControlExportarAExcel;
      const userContext = this.authService.getUserContext();
      if (userContext) {
        this.usarTarjeta = userContext.terminal.utilizaTarjeta;
      }
  }

  ngOnInit() {
    this.setFilters();
    this.Init();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
    this.onDestroy.next(true);
    this.onDestroy.complete();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  private Init() {
    this.createForm();
    this.completeEstadoMovimientos();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
    this.estadosValidosParaModificarControlIngreso = this.completarestadosValidosParaModificar(Actividades.ModificarControlIngreso);
    this.estadosValidosParaModificarFueraPuesto = this.completarestadosValidosParaModificar(Actividades.ModificarControlFueraPuesto);
    this.setValuesByDefault();
  }

  ngAfterViewInit() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((_: any) => {
        const prevState = this.pageStateService.getState(this.route.toString());
        if (prevState) {
          this.gestionarControlForm.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        }
      });
  }

  private completarestadosValidosParaModificar(actividad: number): number[] {
    const estadosValidos = new Array<number>();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[1].id,
                                [actividad])
                                .pipe(takeUntil(this.onDestroy))
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[0].id,
                                [actividad])
                                .pipe(takeUntil(this.onDestroy))
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    return estadosValidos;
  }

  private setValuesByDefault() {
    this.setValue(`filtros.estadoMovimiento`, new EstadoMovimiento(-1) , {onlySelf: true});
    this.setValue(`filtros.motivoEstadoMovimiento`, undefined , {onlySelf: true});
    this.destroyedByNavigation = false;
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.gestionarControlForm.get(controlName);
    if (control) {
      control.setValue(value, options);
    }
  }

  private completeEstadoMovimientos(idTipoMovimiento?: number) {

    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();

    this.estadoMovimientoFilters.idTipoMovimiento = idTipoMovimiento;
    this.estadoMovimientoFilters.idsActividad = [
      Actividades.ModificarControlIngreso,
      Actividades.ModificarControlFueraPuesto,
      Actividades.ModificarControlFueraCircuito,
      Actividades.AsignarTarjeta,
      Actividades.RechazarDescarga,
      Actividades.RegistrarSalidaConCarga,
      Actividades.RegistrarSalidaConDescarga
    ];
  }

  private setGridColumns() {
    this.columns = [
      { prop: 'selected',
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
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaEntrada',
        comparator: this.comparatorFechaInicio.bind(this)
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocumentoPorte'
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'numeroDocumentoPorte'
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg'
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
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.CamionVagon,
        prop: 'camionVagon'
      }
    ];
  }

  private comparatorFechaInicio(propA: string, propB: string): number {
    const date1 = this.createDate(propA);
    const date2 = this.createDate(propB);
    if (date1 < date2) {
      return -1;
    } else {
      return 1;
    }
  }

  private createDate(prop: string): Date {
    const data = prop.split(new RegExp('/|:| ')).map(d => Number(d));
    return new Date(data[2], data[1], data[0], data[3], data[4]);
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickView
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickView(row)
      );

    this.notificationActionsService.clickEdit
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickEdit(row)
      );

    this.notificationActionsService.clickExcelExport
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(rows =>
        this.clickExcelExport(rows)
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

  onClickAsignarTarjeta() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      this.validarMovimiento(this.selectedRow[0], Actividades.AsignarTarjeta)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(valid => {
        if (valid) {
          this.modalAsignarTarjeta.abrir(this.selectedRow[0].id);
        } else {
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion);
        }
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.AsignarTarjeta);
    }
  }

  onClickRechazarDescarga() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      this.validarMovimiento(this.selectedRow[0], Actividades.RechazarDescarga)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(valid => {
        if (valid) {
          this.modalRechazarDescarga.abrir(this.selectedRow[0].id);
        } else {
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion);
        }
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Rechazar);
    }
  }

  onClickModificarDocPorteVagones() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      this.validarMovimiento(this.selectedRow[0], Actividades.ModificarDocPorteVagonesFueraDePuesto)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(valid => {
        if (valid) {
          const movimiento = this.selectedRow[0] as GestionarControlDataView;

          this.movimientoService.movimientosDocPorteEstanEnPuesto(movimiento.numeroDocumentoPorte)
          .pipe(takeUntil(this.onDestroy))
          .subscribe(enPuesto => {
            if (enPuesto) {
              this.popupService.error(
                Resources.Messages.NoEsPosibleModificarYaQueExisteAlMenosUnMovimientoQueEstaSiendoModificadoEnAlgunPuesto,
                Resources.Labels.Modificar);
              return;
            }

            const navigationExtras: NavigationExtras = {
              queryParams: {
                  'idMovimiento': movimiento.id,
                  'esModificacion': true,
                  'idTipoProducto': movimiento.idTipoProducto,
                  'idTipoTransporte': movimiento.idTipoTransporte,
                  'idActividad': Actividades.ModificarDocPorteVagonesFueraDePuesto
              }
            };
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.navigateVagon(movimiento.idTipoProducto, navigationExtras);
          });

        } else {
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion);
        }

      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Error);
    }
  }

  private navigateVagon(idTipoProducto: number, navigationExtras: NavigationExtras) {
    switch (idTipoProducto) {
      case TiposProducto.Cereal:
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarControlPath,
                                        this.ConsultarModificarControlarDescargaVagonCerealesPath,
                                        navigationExtras);
        break;
      case TiposProducto.NoGranos:
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarControlPath,
                                        this.ConsultarModificarControlarDescargaVagonNoGranosPath,
                                        navigationExtras);
        break;
      default:
        break;
    }
  }

  onTarjetaAsignada() {
    this.popupService.success(Resources.Messages.LaTarjetaFueAsignada, Resources.Labels.AsignarTarjeta);
    this.search();
  }

  onDescargaRechazada() {
    this.notificationActionsService.onRefreshGrid();
    this.popupService.success(Resources.Messages.LaDescargaFueRechazada, Resources.Labels.Rechazar);
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.gestionarControlForm.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.Init();
  }

  private clickView(row) {
    this.editViewAction(row, false);
  }

  private editViewAction(row: GestionarControlDataView, esModificacion: boolean) {
    if ( row ) {
      const movimiento = row as GestionarControlDataView;
      const navigationExtras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'esModificacion' : esModificacion,
              'idTipoProducto' : movimiento.idTipoProducto,
              'idTipoTransporte' : movimiento.idTipoTransporte,
              'idActividad': Actividades.ModificarControlIngreso
          }
      };
      this.getCircuito(movimiento.idCircuito, [Actividades.ModificarControlIngreso])
      .pipe(map((circuito) => { this.circuito = circuito;
                              return this.circuito; }))
      .subscribe(() => { this.verificarNavegacionConsulta(movimiento, navigationExtras); });

      this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
      this.destroyedByNavigation = true;
      this.navigationService.navigate(this.GestionarControlPath,
                                      this.controlarCargaPath,
                                      navigationExtras);
  }
}

  private verificarNavegacionConsulta(movimiento: GestionarControlDataView, navigationExtras: NavigationExtras): void {
    if (movimiento.idTipoTransporte === TiposTransporte.Camion ) {
      if (this.circuito.idTipoMovimiento === tiposMovimientos[1].id) {
        switch (movimiento.idTipoProducto) {
          case TiposProducto.Cereal:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ConsultarModificarControlarDescargaCamionCerealesPath,
              navigationExtras);
            break;
          case TiposProducto.NoGranos:
          case TiposProducto.SubProductos:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ConsultarModificarControlarDescargaCamionSubproductosPath,
              navigationExtras);
            break;
          case TiposProducto.Varios:
          case TiposProducto.InsumosLiquidos:
          case TiposProducto.Insumos:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ConsultarModificarControlarDescargaCamionInsumosVariosPath,
              navigationExtras);
            break;
        }
      } else {
        this.navigateCargaCamion(movimiento, navigationExtras);
      }
    } else {
      this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
      this.destroyedByNavigation = true;
      this.navigateVagon(movimiento.idTipoProducto, navigationExtras);
    }
  }

  private navigateCargaCamion(movimiento: GestionarControlDataView, navigationExtras: NavigationExtras): void {
    switch (movimiento.idTipoProducto) {
      case TiposProducto.Cereal:
      case TiposProducto.NoGranos:
      case TiposProducto.SubProductos:
        this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
        this.destroyedByNavigation = true;
        this.navigationService.navigate(this.GestionarControlPath,
                                        this.IngresarCargaCamionPath,
                                        navigationExtras);
        break;
    case TiposProducto.Varios:
    case TiposProducto.Insumos:
    default:
      this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
      this.destroyedByNavigation = true;
      this.navigationService.navigate(this.GestionarControlPath,
                                      this.IngresarCargaCamionVariosPath,
                                      navigationExtras);
        break;
    }
  }

  private editarFueraPuestoAction(row, esFueraCircuito: boolean, esRegimenPapel: boolean) {
    if ( row ) {
      const movimiento = row as GestionarControlDataView;
      let actividadId;
      if (esRegimenPapel) {
        actividadId = esFueraCircuito ? Actividades.ModificarControlFueraCircuito : Actividades.ModificarControlFueraPuesto;
      } else {
        actividadId = Actividades.ModificarDocPorteVagonesFueraDePuesto;
      }
      const navigationExtras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'esFueraCircuito' : esFueraCircuito,
              'idTipoProducto' : movimiento.idTipoProducto,
              'idTipoTransporte': movimiento.idTipoTransporte,
              'idActividad': actividadId
          }
      };
      this.getCircuito(movimiento.idCircuito, [Actividades.ModificarControlFueraPuesto])
      .pipe(map((circuito) => {
              this.circuito = circuito;
              return this.circuito; }))
      .subscribe(() => { this.verificarNavegacionFueraDePuesto(movimiento, navigationExtras); });
    }
  }

  private verificarNavegacionFueraDePuesto(movimiento: GestionarControlDataView, navigationExtras: NavigationExtras): void {
    if (movimiento.idTipoTransporte === TiposTransporte.Camion) {
      if (this.circuito.idTipoMovimiento === tiposMovimientos[1].id) {
        switch (movimiento.idTipoProducto) {
          case TiposProducto.Cereal:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ModificarControlDescargaCamionCerealesPath,
              navigationExtras);
            break;
          case TiposProducto.NoGranos:
          case TiposProducto.SubProductos:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ModificarControlDescargaCamionSubProductosNoGranosPath,
              navigationExtras);
            break;
          case TiposProducto.Varios:
          case TiposProducto.InsumosLiquidos:
          case TiposProducto.Insumos:
            this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
            this.destroyedByNavigation = true;
            this.navigationService.navigate(this.GestionarControlPath,
              this.ModificarControlDescargaCamionInsumosVariosPath,
              navigationExtras);
            break;
        }
      } else {
        this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
        this.navigateCargaCamion(movimiento, navigationExtras);
      }
    } else {
      this.pageStateService.saveState(this.gestionarControlForm.getRawValue(), this.route.toString());
      this.navigateVagon(movimiento.idTipoProducto, navigationExtras);
    }
  }

  private clickEdit(row: GestionarControlDataView) {
    if (row) {
      this.movimientoService.movimientoEstaEnPuesto(row.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(enPuesto => {
        if (enPuesto) {
          this.popupService.error(Resources.Messages.NoEsPosibleModificarMovimientoEnPuesto, Resources.Labels.Modificar);
          return;
        }

        if (this.estadosValidosParaModificarControlIngreso.some(e => e === row.idEstadoMovimiento)) {
          this.editViewAction(row, true);
        } else if (this.estadosValidosParaModificarFueraPuesto.some(e => e === row.idEstadoMovimiento)) {
          this.editarFueraPuestoAction(row, false, row.esRegimenPapel);
        } else {
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
        }
      });
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Control', ['Gestión de Control']);
  }

  private subscribeToFiltersChanges() {
    const tipoDocumentoCtrl = this.gestionarControlForm.get('filtros.tipoDocPorte');
    const nroDocumentoCtrl = this.gestionarControlForm.get('filtros.nroDocPorte');
    const ctgCtrl = this.gestionarControlForm.get('filtros.ctg');
    const tarjetaCtrl = this.gestionarControlForm.get('filtros.tarjeta');
    const productoCtrl = this.gestionarControlForm.get('filtros.producto');
    const motivoCtrl = this.gestionarControlForm.get('filtros.motivoEstadoMovimiento');
    const estadoCtrl = this.gestionarControlForm.get('filtros.estadoMovimiento');
    const vagonCtrl = this.gestionarControlForm.get('filtros.numeroVagon');
    const fechaEntradaCtrl = this.gestionarControlForm.get('filtros.fechaEntrada');
    const tipoTransporteCtrl = this.gestionarControlForm.get('filtros.tipoTransporte');
    const patenteCamionCtrl = this.gestionarControlForm.get('filtros.patenteCamion');
    const tipoMovimientoCtrl = this.gestionarControlForm.get('filtros.tipoMovimiento');

    if (tipoDocumentoCtrl && nroDocumentoCtrl && tarjetaCtrl && productoCtrl && tipoMovimientoCtrl && ctgCtrl &&
        motivoCtrl && estadoCtrl && vagonCtrl && fechaEntradaCtrl && tipoTransporteCtrl && patenteCamionCtrl) {
      tipoDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['tipo-documento'] = value;
        if (value) { this.consultarRegimenAfip(value, ctgCtrl); }
      });
      nroDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['nro-documento'] = value;
      });
      ctgCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['ctg'] = value;
      });
      tarjetaCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['tarjeta'] = value;
      });
      productoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['producto'] = value;
      });
      motivoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['motivo'] = value;
      });
      estadoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: EstadoMovimiento) => {
        this.filters['estado'] = value;
      });
      vagonCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: number) => {
        this.filters['numeroVagon'] = value;
      });
      patenteCamionCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['patenteCamion'] = value;
      });
      fechaEntradaCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: Date) => {
        this.filters['fechaEntrada'] = value;
      });
      tipoMovimientoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: EntityWithDescription) => {
        this.filters['tipoMovimiento'] = value;
        this.completeEstadoMovimientos(value ? value.id : undefined);
      });
      tipoTransporteCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: TipoTransporte) => {
        this.filters['tipoTransporte'] = value;
        const numeroVagonCtl = this.gestionarControlForm.get('filtros.numeroVagon');
        const patenteCamionCtl = this.gestionarControlForm.get('filtros.patenteCamion');

        if (numeroVagonCtl && patenteCamionCtl) {
          if (value) {
            if (value.id === TiposTransporte.Camion) {
              numeroVagonCtl.setValue('');
              numeroVagonCtl.disable();
              patenteCamionCtl.enable();
            } else if (value.id === TiposTransporte.Tren) {
              patenteCamionCtl.setValue('');
              patenteCamionCtl.disable();
              numeroVagonCtl.enable();
            }
          } else {
            patenteCamionCtl.enable();
            numeroVagonCtl.enable();
          }
        }
      });
      this.filters['idsActividad'] = this.estadoMovimientoFilters.idsActividad;
    }
  }

  private createForm() {
    this.gestionarControlForm = this.fb.group({
      filtros: this.fb.group({
        tipoDocPorte: '',
        nroDocPorte: ['', { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur'}],
        ctg: '',
        producto: { value: undefined, disabled: false },
        tarjeta: [{ value: '', disabled: !this.usarTarjeta }, Validators.pattern('^[0-9]*$')],
        motivoEstadoMovimiento: '',
        estadoMovimiento: '',
        numeroVagon: '',
        fechaEntrada: null,
        tipoTransporte: '',
        patenteCamion: '',
        tipoMovimiento: ''
      }),
    });
  }

  private validarMovimiento(movimiento: GestionarControlDataView, idActividadToValidate: number): Observable<boolean> {
    if (!this.circuito || this.circuito.id !== movimiento.idCircuito) {
      return this.getCircuito(movimiento.idCircuito, [Actividades.RechazarDescarga,
                                                      Actividades.AsignarTarjeta,
                                                      Actividades.ModificarDocPorteVagonesFueraDePuesto])
        .pipe(takeUntil(this.onDestroy),
          map((circuito) => {
            this.circuito = new Circuito();
            Object.assign(this.circuito, circuito);
            return this.circuito.validarEstadoActividad(movimiento.idEstadoMovimiento, idActividadToValidate);
          })
        );
    } else {
      return of(this.circuito.validarEstadoActividad(movimiento.idEstadoMovimiento, idActividadToValidate));
    }
  }

  private getCircuito(idCircuito: number, idsActividad: Actividades[]): Observable<Circuito>  {
    return this.circuitoService.getCircuitoByIdByIdsActividad(idCircuito, idsActividad);
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined) || tipoDocumento === null) {
          ctgCtrl.enable();
          return;
        }
        ctgCtrl.disable();
        ctgCtrl.reset();
      });
  }
}
