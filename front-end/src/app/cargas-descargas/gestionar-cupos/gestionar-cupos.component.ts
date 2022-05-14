import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Permission, Actividades, EstadosMovimiento, ComportamientoAfip } from '../../shared/enums/enums';
import { FiltroGestionarCuposComponent } from './filtro-gestionar-cupos/filtro-gestionar-cupos.component';
import { Subject } from 'rxjs';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { GestionarCuposDataView } from '../../shared/data-models/gestionar-cupos-data-view';
import { GestionarCuposService } from './gestionar-cupos.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { AnularCupoCommand } from '../../shared/data-models/commands/cargas-descargas/anular-cupo-command';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { AnularCuposService } from './anular-cupos.service';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { MovimientoService } from '../shared/services/movimiento.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Dictionary } from '../../core/models/dictionary';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-gestionar-cupos',
  templateUrl: './gestionar-cupos.component.html',
  styleUrls: ['./gestionar-cupos.component.css']
})

export class GestionarCuposComponent extends SearchFormComponent<Array<GestionarCuposDataView>>
implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filtro') filtro: FiltroGestionarCuposComponent;
  @ViewChild('modalConfirmacionAnulacion') modalConfirmacionAnulacion: ModalComponent;
  Permission = Permission;
  deseaConfirmarEstaAccionMessage = Resources.Messages.DeseaConfirmarEstaAccion;
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  circuito: Circuito;
  estadosValidosParaModificarValidacionCupo: number[];
  estadosValidosParaModificarFueraPuesto: number[];
  estadosValidosParaAnular: number[];
  ModificarCupoPath = 'ModificarValidacionCupo';
  GestionarCuposPath = 'GestionarCupos';
  onDestroy = new Subject();
  selectedRow: any;

  constructor(notificationActionsService: SearchFormActionsNotifierService,
              service: GestionarCuposService,
              private readonly anularCuposService: AnularCuposService,
              public readonly popupService: PopupService,
              private readonly excelExportService: ExcelService,
              private readonly navigationService: NavigationService,
              private readonly fb: FormBuilder,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly movimientoService: MovimientoService,
              private readonly estadoMovimientoService: EstadoMovimientoService,
              private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    super(service, notificationActionsService, popupService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarCuposConsultar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.GestionarCuposModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarCuposExportarAExcel;
  }

  ngOnInit() {
    this.setFilters();
    this.init();
    this.subscribeToActionEventsPrivate();
  }

  private init() {
    this.createForm();
    this.completeEstadoMovimientos();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.estadosValidosParaModificarValidacionCupo = this.completarestadosValidosParaModificar(Actividades.ModificarValidacionCupo);
    this.estadosValidosParaModificarFueraPuesto = this.completarestadosValidosParaModificar(Actividades.ModificarValidacionCupoFueraPuesto);
    this.estadosValidosParaAnular = this.completarestadosValidosParaModificar(Actividades.AnularValidacionCupo);
  }

  ngAfterViewInit() {
    this.filtro.setFocus();
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((_: any) => {
        const prevState = this.pageStateService.getState(this.route.toString());
        if (prevState) {
          this.form.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        } else {
          this.setDefaultEstado();
        }
      });
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        tipoDocPorte: {value: '', disabled: false },
        nroDocPorte: {value: '', disabled: false },
        ctg: {value: '', disabled: false },
        fechaCupo: { value: '', disabled: false },
        producto: { value: undefined, disabled: false },
        turno: { value: '', disabled: false  },
        motivo: { value: '', disabled: false  },
        codigoCupo: { value: '', disabled: false  },
        estadoCupo: { value: '', disabled: false },
        estado: { value: '', disabled: false },
      })
    });
  }

  private completarestadosValidosParaModificar(actividad: number): number[] {
    const estadosValidos = new Array<number>();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[1].id,
                                [actividad])
                                .subscribe(estados => {
                                  estados.forEach(estado => estadosValidos.push(estado.id));
                                });
    return estadosValidos;
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
        headerCheckboxable: false,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaIngreso'
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocPorte'
      },
      {
        name: Resources.Labels.DocumentoPorte,
        prop: 'nroDocPorte'
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
        name: Resources.Labels.Motivo,
        prop: 'motivo'
      },
      {
        name: Resources.Labels.CodigoCupo,
        prop: 'codigoCupo'
      },
      {
        name: Resources.Labels.EstadoCupo,
        prop: 'estadoCupo'
      },
      {
        name: Resources.Labels.Turno,
        prop: 'turno'
      },
      {
        name: Resources.Labels.Vendedor,
        prop: 'vendedor'
      },
      {
        name: Resources.Labels.Corredor,
        prop: 'corredor'
      },
      {
        name: Resources.Labels.Destinatario,
        prop: 'destinatario'
      }
    ];
  }

  private setFilters(): void {
    this.filters = new Dictionary<string>();
  }

  private setDefaultEstado(): void {
    const estadoCtrl = this.form.get('filtros.estado');
    if (estadoCtrl) {
      const pendienteSupervisorCupo = new EntityWithDescription(EstadosMovimiento.PendienteCupo);
      estadoCtrl.setValue(pendienteSupervisorCupo, { onlySelf: true });
    }
  }

  private subscribeToFiltersChanges() {
    const fechaCupo = this.form.get('filtros.fechaCupo');
    const tipoDocPorte = this.form.get('filtros.tipoDocPorte');
    const documentoPorte = this.form.get('filtros.nroDocPorte');
    const ctg = this.form.get('filtros.ctg');
    const producto = this.form.get('filtros.producto');
    const motivo = this.form.get('filtros.motivo');
    const codigoCupo = this.form.get('filtros.codigoCupo');
    const estadoCupo = this.form.get('filtros.estadoCupo');
    const turno = this.form.get('filtros.turno');
    const estado = this.form.get('filtros.estado');

    if (fechaCupo && tipoDocPorte && documentoPorte && producto && motivo && codigoCupo &&
      estadoCupo && turno && estado && ctg) {
        fechaCupo.valueChanges.subscribe((value: string) => {
        this.filters['fechaCupo'] = value;
      });
      tipoDocPorte.valueChanges.subscribe((value) => {
        this.filters['tipoDocPorte'] = value;
        if (value) { this.consultarRegimenAfip(value, ctg); }
      });
      documentoPorte.valueChanges.subscribe((value) => {
        this.filters['documentoPorte'] = value;
      });
      ctg.valueChanges.subscribe((value) => {
        this.filters['ctg'] = value;
      });
      producto.valueChanges.subscribe((value) => {
        this.filters['producto'] = value;
      });
      motivo.valueChanges.subscribe((value) => {
        this.filters['motivo'] = value;
      });
      codigoCupo.valueChanges.subscribe((value) => {
        this.filters['codigoCupo'] = value;
      });
      estadoCupo.valueChanges.subscribe((value) => {
        this.filters['estadoCupo'] = value;
      });
      turno.valueChanges.subscribe((value) => {
        this.filters['turno'] = value;
      });
      estado.valueChanges.subscribe((value) => {
        this.filters['estado'] = value;
      });
    }

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

  private clickView(row) {
    this.editViewAction(row, false);
  }

  private clickEdit(row: GestionarCuposDataView) {
    this.movimientoService.movimientoEstaEnPuesto(row.id).subscribe(enPuesto => {
      if (enPuesto) {
        this.popupService.error(Resources.Messages.NoEsPosibleModificarMovimientoEnPuesto, Resources.Labels.Modificar);
        return;
      }

      if (this.estadosValidosParaModificarValidacionCupo.some(e => e === row.idEstado)) {
        this.editViewAction(row, true);
      } else if (this.estadosValidosParaModificarFueraPuesto.some(e => e === row.idEstado)) {
        this.editViewActionFueraPuesto(row);
      } else {
        this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
      }
    });
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de cupos', ['Gestión de cupos']);
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.form.reset({ emitEvent: true });
    this.selectedRow = null;
    this.init();
    this.setDefaultEstado();
  }

  private editViewAction(row: GestionarCuposDataView, esIngreso: boolean) {
    if (row) {
      const movimiento = row as GestionarCuposDataView;
      const navigationExtras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'esModificacion' : esIngreso,
              'idTipoProducto' : movimiento.idTipoProducto,
              'idActividad' : Actividades.ModificarValidacionCupo
          }
      };
      this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
      this.navigationService.navigate(this.GestionarCuposPath,
        this.ModificarCupoPath,
        navigationExtras);
      }
  }

  private editViewActionFueraPuesto(row: GestionarCuposDataView) {
    if (row) {
      const movimiento = row as GestionarCuposDataView;
      const navigationExtras: NavigationExtras = {
          queryParams: {
              'idMovimiento' : movimiento.id,
              'esModificacion' : true,
              'idTipoProducto' : movimiento.idTipoProducto,
              'idActividad' : Actividades.ModificarValidacionCupoFueraPuesto
          }
      };
      this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
      this.navigationService.navigate(this.GestionarCuposPath,
        this.ModificarCupoPath,
        navigationExtras);
      }
    }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== undefined) {
      this.selectedRow = row;
    }
  }

  private completeEstadoMovimientos() {

    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();

    this.estadoMovimientoFilters.idTipoMovimiento = tiposMovimientos[1].id;
    this.estadoMovimientoFilters.idsActividad = [Actividades.ModificarValidacionCupoFueraPuesto,
                                                 Actividades.ModificarValidacionCupo,
                                                 Actividades.AnularValidacionCupo];
    this.estadoMovimientoFilters.traeEstadosNoFinales = true;
  }

  openConfirmacionAnulacion() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      const row = this.selectedRow[0] as GestionarCuposDataView;
      if (this.estadosValidosParaAnular.some(e => e === row.idEstado)) {
        this.modalConfirmacionAnulacion.open();
      } else {
        this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
          Resources.Labels.AnularValidacionCupo);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.RegistrarDecision);
    }
  }

  anular(observaciones?: string) {
    const command = new AnularCupoCommand();
    command.id = this.selectedRow[0].id;
    command.observaciones = String(observaciones);
    this.anularCuposService.registrarAnulacion(command).subscribe(() => {
      this.popupService.success(Resources.Messages.LaAnulacionDelCupoSeRealizoConExito, Resources.Labels.AnularValidacionCupo);
      this.clear();
      this.notificationActionsService.onRefreshGrid();
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

