import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { GestionarDescargasEntregadorDataView } from '../../shared/data-models/gestionar-desgargas-entregador-data-view';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Dictionary } from '../../core/models/dictionary';
import { SearchDescargasCamionesService } from './services/search-descargas-camiones.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { CircuitoService } from '../shared/services/circuito.service';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Actividades, Operaciones, TiposTransporte, Permission, EstadosMovimiento, TiposMovimiento, ComportamientoAfip } from '../../shared/enums/enums';
import { EntitiesTiposMovimiento } from '../../shared/data-models/tipo-movimiento';
import { Resources } from '../../../locale/artifacts/resources';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { RegistrarDecisionEntregadorService } from './registrar-decision-entregador.service';
import { RegistrarDecisionEntregadorCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-decision-entregador-command';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-gestionar-descargas-por-entregador',
  templateUrl: './gestionar-descargas-por-entregador.component.html',
  styleUrls: ['./gestionar-descargas-por-entregador.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchDescargasCamionesService}]
})
export class GestionarDescargasPorEntregadorComponent
     extends SearchFormComponent<Array<GestionarDescargasEntregadorDataView>>
  implements OnInit, OnDestroy, AfterViewInit {

  private readonly GestionarDescargasEntregadoresPath = 'GestionarDescargasPorEntregador';
  private readonly RegistrarDecisionEntregadorCamionPath = 'RegistrarDecisionEntregadorCamion';
  private readonly RegistrarDecisionEntregadorVagonPath = 'RegistrarDecisionEntregadorVagon';
  private readonly ConsultaMovimientoPath = 'ConsultaMovimiento';
  private readonly onDestroy = new Subject();
  gestionarDescargasEntregadorForm: FormGroup;
  columns: any;
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  filters: Dictionary<string>;
  selectedRow: any;
  Permission = Permission;

  get registrarDecisionDeshabilitado(): boolean {
    if (this.selectedRow && this.selectedRow.length > 0) {
      const otroEstado = this.selectedRow.find((row: GestionarDescargasEntregadorDataView) => {
        if (row.idEstado !== EstadosMovimiento.PendienteEntregadorCalidad) { return true; }
      });
      if (otroEstado) { return true; }
      return false;
    }
    return true;
  }

  constructor(public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              public readonly searchDescargasCamionesService: SearchDescargasCamionesService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              private readonly excelExportService: ExcelService,
              private readonly circuitoService: CircuitoService,
              private readonly navigationService: NavigationService,
              private readonly registrarDecisionService: RegistrarDecisionEntregadorService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
      super(searchDescargasCamionesService, notificationActionsService, popupService);
      this.botonesHabilitados[BotonesEnum.Consultar] = true;
      this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

      this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarDescargasPorEntregadorConsultar;
      this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarDescargasPorEntregadorExportarAExcel;
  }

  ngOnInit() {
    this.filters = new Dictionary<any>();
    this.Init();
    this.createForm();
    this.subscribeToControlChanges();
    this.suscribeToEnCircuitoChanges();
    this.setValuesByDefault();
  }

  ngOnDestroy() {
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
          this.gestionarDescargasEntregadorForm.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        }
      });
  }

  private Init() {
    this.completeEstadoMovimientos();
    this.setGridColumns();
  }

  private setValuesByDefault() {
    this.setValue(`filtros.enCircuito`, true, {onlySelf: true});
    this.setValue(`filtros.idEstadoMovimiento`, {id: EstadosMovimiento.PendienteEntregadorCalidad}, {onlySelf: true});
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.gestionarDescargasEntregadorForm.get(controlName);
    if (control) {
      control.setValue(value, options);
    }
  }

  private subscribeToControlChanges() {
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }

  private suscribeToEnCircuitoChanges() {
    const enCircuitoCtrl = this.gestionarDescargasEntregadorForm.get('filtros.enCircuito');
    if (enCircuitoCtrl) {
      enCircuitoCtrl.valueChanges.subscribe((enCircuito: boolean) => {
        const fechaDesdeCtrl = this.gestionarDescargasEntregadorForm.get('filtros.fechaDesde');
        const fechaHastaCtrl = this.gestionarDescargasEntregadorForm.get('filtros.fechaHasta');
        const estadoMovimientoCtrl = this.gestionarDescargasEntregadorForm.get('filtros.idEstadoMovimiento');
        const patenteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.patente');
        const vagonCtrl = this.gestionarDescargasEntregadorForm.get('filtros.vagon');
        const tipoTransporteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.tipoTransporte');
        if (fechaDesdeCtrl && fechaHastaCtrl && estadoMovimientoCtrl && patenteCtrl && vagonCtrl && tipoTransporteCtrl) {
          if (enCircuito) {
            fechaDesdeCtrl.disable();
            fechaHastaCtrl.disable();
            fechaDesdeCtrl.clearValidators();
            fechaHastaCtrl.clearValidators();
            estadoMovimientoCtrl.enable();
            patenteCtrl.enable();
            vagonCtrl.enable();
            tipoTransporteCtrl.enable();
          } else {
            estadoMovimientoCtrl.disable();
            tipoTransporteCtrl.reset();
            tipoTransporteCtrl.disable();
            patenteCtrl.disable();
            vagonCtrl.disable();
            fechaDesdeCtrl.enable();
            fechaHastaCtrl.enable();
            fechaDesdeCtrl.setValidators(Validators.required);
            fechaHastaCtrl.setValidators(Validators.required);
            fechaDesdeCtrl.markAsTouched();
            fechaDesdeCtrl.updateValueAndValidity();
            fechaHastaCtrl.markAsTouched();
            fechaHastaCtrl.updateValueAndValidity();
          }
        }
      });
    }
  }

  private completeEstadoMovimientos() {
    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();
    this.estadoMovimientoFilters.idTipoMovimiento = EntitiesTiposMovimiento.Descarga.id;
    this.estadoMovimientoFilters.idsActividad = [];
    this.estadoMovimientoFilters.traeEstadosNoFinales = true;
  }

  private subscribeToFiltersChanges() {
    const patenteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.patente');
    const nroDocPorteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.nroDocPorte');
    const ctgCtrl = this.gestionarDescargasEntregadorForm.get('filtros.ctg');
    const tipoDocPorteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.tipoDocPorte');
    const turnoCtrl = this.gestionarDescargasEntregadorForm.get('filtros.turno');
    const estadoMovimientoCtrl = this.gestionarDescargasEntregadorForm.get('filtros.idEstadoMovimiento');
    const fechaDesdeCtrl = this.gestionarDescargasEntregadorForm.get('filtros.fechaDesde');
    const fechaHastaCtrl = this.gestionarDescargasEntregadorForm.get('filtros.fechaHasta');
    const enCircuitoCtrl = this.gestionarDescargasEntregadorForm.get('filtros.enCircuito');
    const tipoTransporteCtrl = this.gestionarDescargasEntregadorForm.get('filtros.tipoTransporte');
    const vagonCtrl = this.gestionarDescargasEntregadorForm.get('filtros.vagon');

    if (patenteCtrl && nroDocPorteCtrl && turnoCtrl && enCircuitoCtrl && ctgCtrl &&
        estadoMovimientoCtrl && tipoDocPorteCtrl && fechaDesdeCtrl && fechaHastaCtrl &&
        tipoTransporteCtrl && vagonCtrl) {
      patenteCtrl.valueChanges.subscribe((patenteValue: string) => {
        this.filters['patente'] = patenteValue;
      });
      nroDocPorteCtrl.valueChanges.subscribe((nroDocPorte: string) => {
        this.filters['nroDocPorte'] = nroDocPorte;
      });
      ctgCtrl.valueChanges.subscribe((ctg: string) => {
        this.filters['ctg'] = ctg;
      });
      vagonCtrl.valueChanges.subscribe((vagon: number) => {
        this.filters['vagon'] = vagon;
      });
      tipoTransporteCtrl.valueChanges.subscribe((value: TipoTransporte) => {
        this.filters['tipoTransporte'] = value;
        const numeroVagonCtl = this.gestionarDescargasEntregadorForm.get('filtros.vagon');
        const patenteCamionCtl = this.gestionarDescargasEntregadorForm.get('filtros.patente');

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
      tipoDocPorteCtrl.valueChanges.subscribe((tipoDocPorte: string) => {
        this.filters['tipoDocPorte'] = tipoDocPorte;
        this.consultarRegimenAfip(tipoDocPorte, ctgCtrl);
      });
      turnoCtrl.valueChanges.subscribe((turno: string) => {
        this.filters['turno'] = turno;
      });
      enCircuitoCtrl.valueChanges.subscribe((enCircuito: boolean) => {
        this.filters['enCircuito'] = enCircuito;
      });
      fechaDesdeCtrl.valueChanges.subscribe((fechaDesde: string) => {
        this.filters['fechaDesde'] = fechaDesde;
      });
      fechaHastaCtrl.valueChanges.subscribe((fechaHasta: string) => {
        this.filters['fechaHasta'] = fechaHasta;
      });
      estadoMovimientoCtrl.valueChanges.subscribe((estadoMovimientoValue: EstadoMovimiento) => {
        if (estadoMovimientoValue) {
          this.filters['idEstadoMovimientoSelected'] = estadoMovimientoValue.id;
        }
      });
    }
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
    this.selectedRow = null;
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.gestionarDescargasEntregadorForm.reset({emitEvent: true});
    this.selectedRow = null;
    this.Init();
  }


  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de descargas entregador', ['Gestión de descargas entregador']);
  }

  private createForm() {
    this.gestionarDescargasEntregadorForm = this.fb.group({
      filtros: this.fb.group({
        patente: { value: '', disabled: false },
        idEstadoMovimiento: { value: '', disabled: false },
        enCircuito: { value: '', disabled: false },
        tipoDocPorte: { value: '', disabled: false },
        nroDocPorte: [ '', { validators: [Validators.minLength(8), Validators.pattern(/^\d+$/)], updateOn: 'blur'}],
        ctg: { value: '', disabled: false },
        fechaDesde: { value: '', disabled: true },
        fechaHasta: { value: '', disabled: true },
        turno: { value: '', disabled: false },
        vagon: { value: '', disabled: false },
        tipoTransporte: { value: '', disabled: false },
      }),
    });
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
        name: Resources.Labels.DocumentoPorte,
        prop: 'tipoDocumentoPorte'
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'nroDocumentoPorte'
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
        name: Resources.Labels.Turno,
        prop: 'turno'
      },
      {
        name: Resources.Labels.Tarjeta,
        prop: 'tarjeta'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.Motivo,
        prop: 'motivo'
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Grado,
        prop: 'grado'
      }
    ];
  }

  private clickView(row) {
    const movimiento = row as GestionarDescargasEntregadorDataView;
    const extras: NavigationExtras = {
      queryParams: {
          'idMovimiento': movimiento.id,
          'idTipoProducto': movimiento.idTipoProducto,
          'idTipoTransporte': movimiento.idTipoTransporte,
          'idTipoMovimiento': TiposMovimiento.Descarga
      }
    };
    this.pageStateService.saveState(this.gestionarDescargasEntregadorForm.getRawValue(), this.route.toString());
    this.navigationService.navigate(this.GestionarDescargasEntregadoresPath, this.ConsultaMovimientoPath, extras);
  }

   // Valicacion 03
  private checkRegistrarDecision(row: GestionarDescargasEntregadorDataView): Observable<boolean> {
    return this.getActividadesParaCircuito(row[0].idCircuito, [Actividades.RegistrarDecisionEntregador])
      .pipe(
        map(circuito =>
          circuito.validarMovimientoById(row[0].id, row[0].idCircuito, row[0].idEstado)
        )
      );
  }

   // vaklidacion 03
  onClickRegistrarDecision() {
    if ( this.selectedRow && this.selectedRow.length === 1) {
      const movimiento = this.selectedRow[0] as GestionarDescargasEntregadorDataView;
      this.checkRegistrarDecision(this.selectedRow).subscribe(puedeRegistrarDecision => {
        if (!puedeRegistrarDecision) {
          // Validacion 02
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
            Resources.Labels.RegistrarDecision);
        } else {
          const navigationExtras: NavigationExtras = {
            queryParams: {
                'idMovimiento' : movimiento.id,
                'operacion': Operaciones.RegistroDecisionEntregador
            }
          };
          this.pageStateService.saveState(this.gestionarDescargasEntregadorForm.getRawValue(), this.route.toString());
          if (movimiento.idTipoTransporte === TiposTransporte.Camion) {
            this.navigationService.navigate(this.GestionarDescargasEntregadoresPath,
                                            this.RegistrarDecisionEntregadorCamionPath,
                                            navigationExtras);
          } else {
            this.navigationService.navigate(this.GestionarDescargasEntregadoresPath,
                                            this.RegistrarDecisionEntregadorVagonPath,
                                            navigationExtras);
          }
        }
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.RegistrarDecision);
    }
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

  private confirmAccion(): Promise<boolean> {
    return this.popupService.confirm(Resources.Messages.PorFavorVerificarLosDatosAntesDeContinuar, Resources.Labels.Confirmar);
  }

  onClickAptoDescarga() {
    this.registrarDecision(true);
  }

  onClickRechazar() {
    this.registrarDecision(false);
  }

  private registrarDecision(aceptado: boolean) {
    this.confirmAccion().then(respuesta => {
      if (respuesta) {
        const movimientos = this.selectedRow as GestionarDescargasEntregadorDataView[];
        const idsMovimiento: number[] = [];
        if (movimientos) {
          movimientos.forEach((movimiento: GestionarDescargasEntregadorDataView) => {
            idsMovimiento.push(movimiento.id);
          });
        }
        const command = new RegistrarDecisionEntregadorCommand();
        command.idsMovimiento = idsMovimiento;
        command.esAceptado = aceptado;

        this.registrarDecisionService.registrarDecisionEntregador(command).subscribe(() => {
          let message: string;
          if (command.idsMovimiento.length > 1) {
            message = Resources.Messages.LosMovimientosSeleccionadosAvanzaronAlSiguienteEstado;
          } else {
            message = Resources.Messages.ElMovimientoSeleccionadoAvanzoAlSiguienteEstado;
          }
          this.popupService.success(message, Resources.Messages.RegistrarDecisionEntregador);
          this.clear();
          this.notificationActionsService.onRefreshGrid();
        });
      }
    });
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || !tipoDocumento) {
          ctgCtrl.enable();
          return;
        }
        ctgCtrl.disable();
        ctgCtrl.reset();
      });
  }
}

