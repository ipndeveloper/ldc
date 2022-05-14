import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Resources } from '../../../locale/artifacts/resources';
import { BotonesEnum, SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { Dictionary } from '../../core/models/dictionary';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AuthService } from '../../core/services/session/auth.service';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Permission, Actividades, TiposTransporte, EstadosMovimiento, Operaciones, ComportamientoAfip } from '../../shared/enums/enums';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { GestionarTransportesCircuitoDataView } from './gestionar-transportes-circuito-data-view';
import { GestionarTransportesCircuitoService } from './gestionar-transportes-circuito.service';

@Component({
  selector: 'yrd-gestionar-transportes-circuito',
  templateUrl: './gestionar-transportes-circuito.component.html',
  styleUrls: ['./gestionar-transportes-circuito.component.css']
})
export class GestionarTransportesCircuitoComponent
  extends SearchFormComponent<Array<GestionarTransportesCircuitoDataView>>
  implements OnInit, AfterViewInit, OnDestroy {

  Permission = Permission;
  form: FormGroup;
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  filters: Dictionary<string>;
  selectedRow: any;
  private readonly onDestroy = new Subject<boolean>();
  private readonly gestionarTransporteEnCircuitoPath = 'GestionarTransportesCircuito';
  private readonly consultaMovimientoPath = 'ConsultaMovimiento';
  private destroyedByNavigation = false;

  constructor(public readonly service: GestionarTransportesCircuitoService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService,
              private readonly navigationService: NavigationService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    super(service, notificationActionsService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarTransporteCircuitoConsultar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarTransporteCircuitoExportarAExcel;
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
    this.setValuesByDefault();
    this.search();
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

  private setValuesByDefault() {
    this.setValue(`filtros.estadoMovimiento`, new EstadoMovimiento(-1));
    this.setValue(`filtros.motivoEstadoMovimiento`, undefined);
  }

  private setValue(controlName: string, value: any) {
    const control = this.form.get(controlName);
    if (control) {
      control.setValue(value, { onlySelf: true });
    }
  }

  private completeEstadoMovimientos(idTipoMovimiento?: number) {
    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();
    this.estadoMovimientoFilters.idTipoMovimiento = idTipoMovimiento;
    this.estadoMovimientoFilters.idsActividad = [
      Actividades.ModificarControlIngreso,
      Actividades.RegistrarSalidaConCarga,
      Actividades.RegistrarSalidaConDescarga,
      Actividades.CapturarPesoBruto,
      Actividades.IngresarCalidadCalado,
      Actividades.RegistrarSalidaSinDescarga,
      Actividades.ModificarCalidad,
      Actividades.RegistrarDecisionEntregador,
      Actividades.CapturarPesoTara,
      Actividades.CapturarPesoTaraCarga,
      Actividades.ControlarCalidad,
      Actividades.RegistrarSalidaSinCarga,
      Actividades.CapturarPesoBrutoCarga,
      Actividades.RegistrarAprobacion
    ];
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
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaEntrada',
        comparator: this.comparatorFechaInicio.bind(this)
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado.descripcion'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
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
        name: Resources.Labels.CamionVagon,
        prop: 'camionVagon'
      },
      {
        name: Resources.Labels.Tarjeta,
        prop: 'tarjeta'
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
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

  onClickContinuarCircuito(): void {
    const movimiento = this.selectedRow[0] as GestionarTransportesCircuitoDataView;
    if (movimiento) {
      this.popupService.confirmOk(() => {
        this.continuarCircuito(movimiento);
      }, this.armarMensajeDeConfirmar(movimiento), Resources.Labels.Confirmar);
    }

  }

  private armarMensajeDeConfirmar(movimiento: GestionarTransportesCircuitoDataView): string {
    let mensaje = !movimiento.camionVagon ? Resources.Messages.EstaContinuandoElCircuitoDelMovimiento :
      movimiento.idTipoTransporte === TiposTransporte.Camion ?
      Resources.Messages.EstaContinuandoElCircuitoDelMovimientoConPatenteX.format(movimiento.camionVagon)
      : Resources.Messages.EstaContinuandoElCircuitoDelMovimientoConNumeroDeVagonX.format(movimiento.camionVagon);

    if (movimiento.tarjeta) {
      mensaje += ` y ${Resources.Labels.Tarjeta}: ${movimiento.tarjeta}`;
    }

    return `${mensaje}. ${Resources.Messages.DeseaContinuar}`;
  }

  private continuarCircuito(movimiento: GestionarTransportesCircuitoDataView): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'idMovimiento': movimiento.id,
        'operacion': Operaciones.Alta
      }
    };
    if (navigationExtras.queryParams) {
      switch (movimiento.estado.id) {
        case (EstadosMovimiento.PendienteControl):
          navigationExtras.queryParams.operacion = Operaciones.Modificacion;
          navigationExtras.queryParams.idTipoProducto = movimiento.idTipoProducto;
          navigationExtras.queryParams.idTipoTransporte = movimiento.idTipoTransporte;
          break;
        case (EstadosMovimiento.PendienteEntregadorCalidad):
          navigationExtras.queryParams.operacion = Operaciones.RegistroDecisionEntregador;
          break;
        case (EstadosMovimiento.PendienteSupervisorCalidad):
          navigationExtras.queryParams.operacion = Operaciones.Modificacion;
          break;
      }
    }
    this.destroyedByNavigation = true;
    this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
    this.navigationService.navigateByMovement(movimiento.id, this.gestionarTransporteEnCircuitoPath, navigationExtras, true);
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
    this.form.reset({ emitEvent: true });
    this.selectedRow = null;
    this.Init();
    this.search();
  }

  private clickView(row) {
    if (row) {
      const movimiento = row as GestionarTransportesCircuitoDataView;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          'idMovimiento' : movimiento.id,
          'idTipoProducto' : movimiento.idTipoProducto,
          'idTipoMovimiento': movimiento.idTipoMovimiento,
          'idTipoTransporte': movimiento.idTipoTransporte
        }
      };
      this.destroyedByNavigation = true;
      this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
      this.navigationService.navigate(this.gestionarTransporteEnCircuitoPath, this.consultaMovimientoPath, navigationExtras);
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Transportes en Circuito', ['Movimientos']);
  }

  private subscribeToFiltersChanges() {
    const tipoDocumentoCtrl = this.form.get('filtros.tipoDocPorte');
    const nroDocumentoCtrl = this.form.get('filtros.nroDocPorte');
    const ctgCtrl = this.form.get('filtros.ctg');
    const productoCtrl = this.form.get('filtros.producto');
    const tipoMovimientoCtrl = this.form.get('filtros.tipoMovimiento');
    const tarjetaCtrl = this.form.get('filtros.tarjeta');
    const estadoCtrl = this.form.get('filtros.estadoMovimiento');
    const tipoTransporteCtrl = this.form.get('filtros.tipoTransporte');
    const vagonCtrl = this.form.get('filtros.Vagon');
    const patenteCamionCtrl = this.form.get('filtros.patenteCamion');
    const fechaEntradaCtrl = this.form.get('filtros.fechaEntrada');

    if (tipoDocumentoCtrl && nroDocumentoCtrl && tarjetaCtrl && productoCtrl && tipoMovimientoCtrl &&
      estadoCtrl && vagonCtrl && fechaEntradaCtrl && tipoTransporteCtrl && patenteCamionCtrl && ctgCtrl) {
      tipoDocumentoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
        this.filters['tipo-documento'] = value;
        this.consultarRegimenAfip(value, ctgCtrl);
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
      estadoCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: EstadoMovimiento) => {
        this.filters['estado'] = value;
      });
      vagonCtrl.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: number) => {
        this.filters['Vagon'] = value;
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
        const numeroVagonCtl = this.form.get('filtros.Vagon');
        const patenteCamionCtl = this.form.get('filtros.patenteCamion');

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
            } else {
              patenteCamionCtl.enable();
              numeroVagonCtl.enable();
            }
          } else {
            patenteCamionCtl.enable();
            numeroVagonCtl.enable();
          }
        }
      });
    }
  }

  private createForm() {
    const userContext = this.authService.getUserContext();
    let utilizarTarjeta = true;
    if (userContext) {
      utilizarTarjeta = userContext.terminal.utilizaTarjeta;
    }
    this.form = this.fb.group({
      filtros: this.fb.group({
        tipoDocPorte: '',
        nroDocPorte: ['', { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur' }],
        ctg: '',
        producto: { value: undefined, disabled: false },
        tipoMovimiento: '',
        tarjeta: [{ value: '', disabled: !utilizarTarjeta }, Validators.pattern('^[0-9]*$')],
        estadoMovimiento: '',
        tipoTransporte: '',
        Vagon: '',
        patenteCamion: '',
        fechaEntrada: null,
      }),
    });
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined)) {
          ctgCtrl.enable();
          return;
        }
        ctgCtrl.disable();
        ctgCtrl.reset();
      });
  }
}
