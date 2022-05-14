import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchCalidadCaladoService } from './services/search-calidad-calado/search-calidad-calado.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { Actividades, Operaciones, TiposTransporte, Permission, EstadosMovimiento } from '../../shared/enums/enums';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { GestionarCalidadCaladoDataView } from '../../shared/data-models/gestionar-calidad-calado-data-view';
import { CircuitoService } from '../shared/services/circuito.service';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SinRespuestaEntregadorCommand } from '../../shared/data-models/commands/cargas-descargas/sin-respuesta-entregador-command';
import { GestionarCalidadCaladoService } from './services/gestionar-calidad-calado/gestionar-calidad-calado.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { Resources } from '../../../locale/artifacts/resources';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { MovimientoService } from '../shared/services/movimiento.service';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { AuthService } from '../../core/services/session/auth.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';

@Component({
  selector: 'yrd-gestionar-calidad-calado',
  templateUrl: './gestionar-calidad-calado.component.html',
  styleUrls: ['./gestionar-calidad-calado.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchCalidadCaladoService}]
})

export class GestionarCalidadCaladoComponent
     extends SearchFormComponent<Array<GestionarCalidadCaladoDataView>>
  implements OnInit,
             OnDestroy,
             AfterViewInit {

  @ViewChild('modalConfirmacionSinRespuestaEntregador') modalConfirmacionSinRespuestaEntregador: ModalComponent;

  private readonly GestionarCalidadCaladoPath = 'GestionarCalidadCalado';
  private readonly ConsultarModificarCalidadCaladoCamionPath = 'ConsultarModificarCalidadCalado';
  private readonly ConsultarModificarCalidadCaladoVagonPath = 'ConsultarModificarCalidadCaladoVagon';
  private readonly ModificarCalidadFueraDePuestoPath = 'ModificarCalidadCalado';
  private readonly onDestroy = new Subject();
  Permission = Permission;
  deseaConfirmarEstaAccionMessage = Resources.Messages.DeseaConfirmarEstaAccion;
  gestionarCalidadCaladoForm: FormGroup;
  columns: any;
  estadosValidosParaModificarCalidadCalado: number[];
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  filters: Dictionary<string>;
  selectedRows: any = [];
  movimientoValido = false;
  readonly terminalUtilizaTarjeta: boolean;

  get sinRespuestaEntregadorDeshabilitado(): boolean {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const otroEstado = this.selectedRows.find((row: GestionarCalidadCaladoDataView) => {
        if (row.idEstado !== EstadosMovimiento.PendienteEntregadorCalidad) { return true; }
      });
      if (otroEstado) { return true; }
      return false;
    }
    return true;
  }

  constructor(searchCalidadCaladoService: SearchCalidadCaladoService,
              notificationActionsService: SearchFormActionsNotifierService,
              popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService,
              private readonly circuitoService: CircuitoService,
              private readonly gestionarCalidadCaladoService: GestionarCalidadCaladoService,
              private readonly movimientoService: MovimientoService,
              private readonly estadoMovimientoService: EstadoMovimientoService,
              private readonly navigationService: NavigationService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              authService: AuthService) {

      super(searchCalidadCaladoService, notificationActionsService, popupService);

      const userContext = authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
      this.botonesHabilitados[BotonesEnum.Consultar] = true;
      this.botonesHabilitados[BotonesEnum.Modificar] = true;
      this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

      this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarCalidadCaladoConsultar;
      this.permisosBotones[BotonesEnum.Modificar] = Permission.GestionarCalidadCaladoModificar;
      this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarCalidadCaladoExportarAExcel;
  }

  ngOnInit() {
    this.setFilters();
    this.Init();
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  ngAfterViewInit() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((_: any) => {
        const prevState = this.pageStateService.getState(this.route.toString());
        if (prevState) {
          this.gestionarCalidadCaladoForm.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        }
      });
  }

  private Init() {
    this.createForm();
    this.completeEstadoMovimientos();
    this.setGridColumns();
    this.subscribeToControlChanges();
    this.estadosValidosParaModificarCalidadCalado =
      this.completarEstadosValidosParaIngresarCalidadCalado(Actividades.IngresarCalidadCalado);
    this.setValuesByDefault();
  }

  private completarEstadosValidosParaIngresarCalidadCalado(actividad: number): number[] {
    const estadosValidos = new Array<number>();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[1].id,
                                [actividad])
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[0].id,
                                [actividad])
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    return estadosValidos;
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  private completeEstadoMovimientos(idTipoMovimiento?: number) {

    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();

    this.estadoMovimientoFilters.idTipoMovimiento = idTipoMovimiento;
    this.estadoMovimientoFilters.idsActividad = [
      Actividades.ModificarCalidad,
      Actividades.ModificarCalidadFueraDePuesto,
      Actividades.SinRespuestaEntregador,
      Actividades.ContinuarCircuitoPostLab,
      Actividades.RegistrarAprobacion,
      Actividades.RegistrarSalidaConCarga
    ];
  }

  private subscribeToControlChanges() {
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickSearch
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickSearch()
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickClear()
      );

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
  }

  private clickSearch() {
    this.selectedRows = [];
  }

  private clickClear() {
    this.clear();
  }

  private setValuesByDefault() {
    this.setValue(`filtros.patente`, '', {onlySelf: true});
    this.setValue(`filtros.tarjeta`, '', {onlySelf: true});
    this.setValue(`filtros.tipoTransporte`, '', {onlySelf: true});
    this.setValue(`filtros.vagon`, '', {onlySelf: true});
    this.setValue(`filtros.idEstadoMovimiento`, '', {onlySelf: true});
    this.setValue(`filtros.idEstadoMovimiento`, new EstadoMovimiento(-1, Resources.Labels.Todos) , {onlySelf: true});
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.gestionarCalidadCaladoForm.get(controlName);
    if (control) {
      control.setValue(value, options);
    }
  }

  private clickSelectedRow(row) {
    if (row !== 'undefined') {
      this.selectedRows = row;
    }
  }

  private clickView(row) {
    if ( row ) {
      const movimiento = row as GestionarCalidadCaladoDataView;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'idMovimiento' : movimiento.id,
          'operacion' : Operaciones.Consulta
        }
      };
      this.pageStateService.saveState(this.gestionarCalidadCaladoForm.getRawValue(), this.route.toString());
      this.navigateToIngresarCalidadCalado(row as GestionarCalidadCaladoDataView, navigationExtras);
    }
  }

  // vaklidacion 03
  private clickEdit(row: GestionarCalidadCaladoDataView) {
    if (row) {
      this.movimientoService.movimientoEstaEnPuesto(row.id).subscribe(enPuesto => {
        if (enPuesto) {
          this.popupService.error(Resources.Messages.NoEsPosibleModificarMovimientoEnPuesto, Resources.Labels.Modificar);
          return;
        }

        this.checkModificarCalidad(row).subscribe(respuestaModCalidad => {
          if (respuestaModCalidad) {
            this.modificarCalidad(row);
          } else {
            this.checkModificarCalidadFueraDePuesto(row).subscribe(respuestaFueraPuesto => {
              if (respuestaFueraPuesto) {
                this.modificarCalidadFueraDePuesto(row);
              } else {
                this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
                  Resources.Labels.Modificar);
              }
            });
          }
        });
      });
    }
  }

  public confirmacionSinRespuestaEntregador(observaciones?: string) {
    const movimientos = this.selectedRows as GestionarCalidadCaladoDataView[];
    const idsMovimiento: number[] = [];
    if (movimientos) {
      movimientos.forEach((movimiento: GestionarCalidadCaladoDataView) => {
        idsMovimiento.push(movimiento.id);
      });
    }
    const command = new SinRespuestaEntregadorCommand(idsMovimiento, observaciones);
    this.gestionarCalidadCaladoService.sinRespuestaEntregador(command).subscribe(() => {
      let message: string;
      if (command.idsMovimiento.length > 1) {
        message = Resources.Messages.LosMovimientosSeleccionadosAvanzaronAlSiguienteEstado;
      } else {
        message = Resources.Messages.ElMovimientoSeleccionadoAvanzoAlSiguienteEstado;
      }
      this.popupService.success(message, Resources.Messages.SinRespuestaDelEntregador);
      this.clear();
      this.notificationActionsService.onRefreshGrid();
    });
  }

  public clear() {
    this.gestionarCalidadCaladoForm.reset({ emitEvent: true });
    this.selectedRows = [];
    this.Init();
  }

  public onClickSinRespEntregador() {
    if (!this.sinRespuestaEntregadorDeshabilitado) {
       this.modalConfirmacionSinRespuestaEntregador.open();
    }
  }

  public onClickContinuarPostLab() {
    if (this.selectedRows && this.selectedRows.length === 1) {
      const movimiento = this.selectedRows[0] as GestionarCalidadCaladoDataView;
      this.checkContinuarPostLab(movimiento).subscribe(respuesta => {
        if (respuesta) {
          this.continuarCircuitoPostLab(movimiento);
        } else {
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
            Resources.Labels.ContinuarPostLab);
        }
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro,
        Resources.Labels.ContinuarPostLab);
    }
  }

  // Valicacion 04
  private checkContinuarPostLab(row: GestionarCalidadCaladoDataView): Observable<boolean> {
    return this.getActividadesParaCircuito(row.idCircuito, [Actividades.ContinuarCircuitoPostLab])
      .pipe(
        map(circuito =>
          circuito.validarMovimientoById(row.id, row.idCircuito, row.idEstado)
        )
      );
  }

  // Valicacion 03
  private checkModificarCalidad(row: GestionarCalidadCaladoDataView): Observable<boolean> {
    return this.getActividadesParaCircuito(row.idCircuito, [Actividades.ModificarCalidad])
      .pipe(
        map(circuito =>
          circuito.validarMovimientoById(row.id, row.idCircuito, row.idEstado)
        )
      );
  }

  private checkModificarCalidadFueraDePuesto(row: GestionarCalidadCaladoDataView): Observable<boolean> {
    return this.getActividadesParaCircuito(row.idCircuito, [Actividades.ModificarCalidadFueraDePuesto])
      .pipe(
        map(circuito =>
          circuito.validarMovimientoById(row.id, row.idCircuito, row.idEstado)
        )
      );
  }

  private continuarCircuitoPostLab(movimiento: GestionarCalidadCaladoDataView) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          'idMovimiento' : movimiento.id,
          'source' : 'ModificarCalidadCalado',
          'operacion': Operaciones.ContinuarCircuitoPostLab
      }
    };
    this.pageStateService.saveState(this.gestionarCalidadCaladoForm.getRawValue(), this.route.toString());
    this.navigateToIngresarCalidadCalado(movimiento, navigationExtras);
  }

  private navigateToIngresarCalidadCalado(movimiento: GestionarCalidadCaladoDataView, navigationExtras: NavigationExtras) {
    if (movimiento.idTipoTransporte === TiposTransporte.Camion) {
      this.navigationService.navigate(this.GestionarCalidadCaladoPath, this.ConsultarModificarCalidadCaladoCamionPath, navigationExtras);
    } else {
      this.navigationService.navigate(this.GestionarCalidadCaladoPath, this.ConsultarModificarCalidadCaladoVagonPath, navigationExtras);
    }
  }

  private modificarCalidad(movimiento: GestionarCalidadCaladoDataView) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'idMovimiento' : movimiento.id,
        'source' : 'ModificarCalidadCalado',
        'operacion': Operaciones.Modificacion
      }
    };
    this.pageStateService.saveState(this.gestionarCalidadCaladoForm.getRawValue(), this.route.toString());
    this.navigateToIngresarCalidadCalado(movimiento, navigationExtras);
  }

  private modificarCalidadFueraDePuesto(movimiento: GestionarCalidadCaladoDataView) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
          'idMovimiento' : movimiento.id,
          'source' : 'ModificarCalidadCalado',
          'operacion': Operaciones.Modificacion,
          'esFueraCircuito': false
      }
    };
    this.pageStateService.saveState(this.gestionarCalidadCaladoForm.getRawValue(), this.route.toString());
    this.navigationService.navigate(this.GestionarCalidadCaladoPath, this.ModificarCalidadFueraDePuestoPath, navigationExtras);
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Calado', ['Gestión de calado']);
  }

  private subscribeToFiltersChanges() {
    const patenteCtrl = this.gestionarCalidadCaladoForm.get('filtros.patente');
    const tarjetaCtrl  = this.gestionarCalidadCaladoForm.get('filtros.tarjeta');
    const vagonCtrl  = this.gestionarCalidadCaladoForm.get('filtros.vagon');
    const tipoTransporteCtrl  = this.gestionarCalidadCaladoForm.get('filtros.tipoTransporte');
    const tipoMovimientoCtrl = this.gestionarCalidadCaladoForm.get('filtros.tipoMovimiento');
    const estadoMovimientoCtrl  = this.gestionarCalidadCaladoForm.get('filtros.idEstadoMovimiento');

    if (!this.terminalUtilizaTarjeta && tarjetaCtrl != null) {
      tarjetaCtrl.disable();
    }
    if (patenteCtrl && tarjetaCtrl && estadoMovimientoCtrl && tipoTransporteCtrl && vagonCtrl && tipoMovimientoCtrl) {
      patenteCtrl.valueChanges.subscribe((patenteValue: string) => {
        this.filters['patente'] = patenteValue;
      });
      tarjetaCtrl.valueChanges.subscribe((tarjetaValue: string) => {
        this.filters['tarjeta'] = tarjetaValue;
      });
      vagonCtrl.valueChanges.subscribe((vagonValue: number) => {
        this.filters['vagon'] = vagonValue;
      });
      tipoTransporteCtrl.valueChanges.subscribe((value: TipoTransporte) => {
        this.filters['tipoTransporte'] = value;
        const numeroVagonCtl = this.gestionarCalidadCaladoForm.get('filtros.vagon');
        const patenteCamionCtl = this.gestionarCalidadCaladoForm.get('filtros.patente');

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
      tipoMovimientoCtrl.valueChanges.subscribe((value: EntityWithDescription) => {
        this.filters['tipoMovimiento'] = value;
        this.completeEstadoMovimientos(value ? value.id : undefined);
      });
      estadoMovimientoCtrl.valueChanges.subscribe((estadoMovimientoValue: EstadoMovimiento) => {
        if (estadoMovimientoValue) {
           this.filters['idEstadoMovimientoSelected'] = estadoMovimientoValue.id;
        }
      });
    }
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
        name: Resources.Labels.Tarjeta,
        prop: 'tarjeta',
        width: 70
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto',
        width: 50
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.FechaHoraCalado,
        prop: 'fechaHoraCalado',
        width: 70
      },
      {
        name: Resources.Labels.FechaHoraModificacion,
        prop: 'fechaHoraModificacion'
      },
      {
        name: Resources.Labels.DocumentoPorte,
        prop: 'tipoYDocumentoPorte'
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg',
        width: 90
      },
      {
        name: Resources.Labels.Entregador,
        prop: 'entregador'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.CamionVagon,
        prop: 'camionVagon',
        width: 50
      },
    ];
  }

  private createForm() {
    this.gestionarCalidadCaladoForm = this.fb.group({
      filtros: this.fb.group({
        patente: { value: '', disabled: false },
        tarjeta: [ { value: '', disabled: false }, Validators.pattern('^[0-9]*$')],
        vagon: { value: '', disabled: false },
        tipoTransporte: { value: '', disabled: false },
        tipoMovimiento: { value: '', disabled: false},
        idEstadoMovimiento: { value: '', disabled: false },
      }),
    });
  }

  private getActividadesParaCircuito(idCircuito: number, idsActividad: Actividades[]): Observable<Circuito> {
    return this.circuitoService.getCircuitoByIdByIdsActividad(idCircuito, idsActividad)
      .pipe(
        map(result => {
            const circuito = new Circuito();
            Object.assign(circuito, result);
            return circuito;
        })
      );
  }

}
