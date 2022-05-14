import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { GestionarMuestrasDataView } from '../../shared/data-models/gestionar-muestras-data-view';
import { SearchMuestrasService } from './services/search-muestras.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { EstadoMuestra } from '../../shared/data-models/estado-muestra';
import { Resources } from '../../../locale/artifacts/resources';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EstadosMuestra, Permission } from '../../shared/enums/enums';
import { GestionarMuestrasService } from './services/gestionar-muestras.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { FiltroBusquedaMuestrasComponent } from './filtro-busqueda-muestras/filtro-busqueda-muestras.component';
import { AutorizarMuestrasAgilService } from './services/autorizar-muestras-agil.service';
import { AutorizarMuestraAgilCommand } from '../../shared/data-models/commands/cargas-descargas/autorizar-muestra-agil-command';
import { ModalAutorizarMuestraAgilComponent } from '../shared/modals/modal-autorizar-muestra-agil/modal-autorizar-muestra-agil.component';
import { CambiarCodigoBarrasMuestraCommand } from '../../shared/data-models/commands/cargas-descargas/cambiar-codigo-barras-muestra-command';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { ModalCambiarCodigoBarrasComponent } from '../shared/modals/modal-cambiar-codigo-barras/modal-cambiar-codigo-barras.component';

@Component({
  selector: 'yrd-gestionar-muestras',
  templateUrl: './gestionar-muestras.component.html',
  styleUrls: ['./gestionar-muestras.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchMuestrasService}]
})
export class GestionarMuestrasComponent extends SearchFormComponent<Array<GestionarMuestrasDataView>>
implements OnInit, OnDestroy {
  Permission = Permission;

  gestionarMuestrasForm: FormGroup;
  columns: any;
  selectedRow: any;
  private readonly onDestroy = new Subject();
  private estadosValidosPorAccion: Dictionary<Array<number>>;
  @ViewChild('modalCambiarCodigoBarras') modalCambiarCodigoBarras: ModalCambiarCodigoBarrasComponent;
  @ViewChild('modalAutorizarFormaAgil') modalAutorizarFormaAgil: ModalAutorizarMuestraAgilComponent;
  @ViewChild('filtroBusquedaMuestra') filtroBusquedaMuestra: FiltroBusquedaMuestrasComponent;

  constructor(private readonly fb: FormBuilder,
    searchMuestrasService: SearchMuestrasService,
    public readonly notificationActionsService: SearchFormActionsNotifierService,
    public readonly gestionarMuestrasService: GestionarMuestrasService,
    public readonly autorizarMuestrasAgilService: AutorizarMuestrasAgilService,
    private readonly dropdownNotificationService:  DropdownNotificationService<EstadoMuestra>,
    private readonly excelExportService: ExcelService,
    public readonly popupService: PopupService) {
    super(searchMuestrasService, notificationActionsService, popupService);
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
  }

  ngOnInit() {
    this.setFilters();
    this.init();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private init() {
    this.createForm();
    this.setEstadosValidosPorAccion();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
    this.subscribeToDropDownEvents();
    this.setValuesByDefault();
  }

  onClickDescartar() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if (this.validateEstadoMuestraParaAccion('descartar', this.selectedRow[0].idEstado)) {
      this.popupService.confirm(Resources.Messages.LaMuestraSeraDescartada)
        .then(confirmo => {
          if (confirmo) {
            this.gestionarMuestrasService.descartar(this.selectedRow[0].id).subscribe(() => {
              this.popupService.success(Resources.Messages.LaMuestraFueDescartada, Resources.Labels.Descartar);
              this.refresh();
            });
          }
        });
      } else {
        this.popupService.error(Resources.Messages.MuestraDebeEstarPendienteAutorizacionParaAccion, Resources.Labels.Descartar);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Descartar);
    }
  }

  onClickAutorizar() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if (this.validateEstadoMuestraParaAccion('autorizar', this.selectedRow[0].idEstado)) {
      this.popupService.confirm(Resources.Messages.LaMuestraSeraAutorizada)
        .then(confirmo => {
          if (confirmo) {
            this.gestionarMuestrasService.autorizar(this.selectedRow[0].id).subscribe(() => {
              this.popupService.success(Resources.Messages.LaMuestraFueAutorizada, Resources.Labels.Autorizar);
              this.refresh();
            });
          }
        });
      } else {
        this.popupService.error(Resources.Messages.MuestraDebeEstarPendienteAutorizacionParaAccion, Resources.Labels.Autorizar);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Autorizar);
    }
  }

  onClickCambiarCodigoBarras() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if (this.validateEstadoMuestraParaAccion('cambiarCodigoBarra', this.selectedRow[0].idEstado)) {
      this.modalCambiarCodigoBarras.open();
      } else {
        this.popupService.error(Resources.Messages.MuestraDebeEstarPendienteAutorizacionOAutorizadoEnvioParaAccion,
          Resources.Labels.CambiarCodBarra);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.CambiarCodBarra);
    }
  }

  onConfirmCambiarCodigoBarras(codigoBarras: string) {
    const command = new CambiarCodigoBarrasMuestraCommand(this.selectedRow[0].id, codigoBarras);
    this.gestionarMuestrasService.cambiarCodigoBarras(command).subscribe(() => {
      this.popupService.success(Resources.Messages.SeActualizoCodigoBarrasDeLaMuestra, Resources.Labels.CambiarCodBarra);
      this.modalCambiarCodigoBarras.close();
      this.refresh();
    });
  }

  onClickReversarEstado() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if (this.validateEstadoMuestraParaAccion('reversarEstadoMuestra', this.selectedRow[0].idEstado)) {
      this.popupService.confirm(Resources.Messages.LaMuestraSeraReversada)
        .then(confirmo => {
          if (confirmo) {
            this.gestionarMuestrasService.reversarEstado(this.selectedRow[0].id).subscribe(() => {
              this.popupService.success(Resources.Messages.LaMuestraFueReversada, Resources.Labels.ReversarEstadoMuestra);
              this.refresh();
            });
          }
        });
      } else {
        this.popupService.error(Resources.Messages.MuestraDebeEstarDescartadaParaAccion, Resources.Labels.ReversarEstadoMuestra);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.ReversarEstadoMuestra);
    }
  }

  onClickAutorizarFormaAgil() {
    this.modalAutorizarFormaAgil.open();
  }

  onAutorizarFormaAgil(codigoBarras: number) {
    const command = new AutorizarMuestraAgilCommand(codigoBarras);
    this.autorizarMuestrasAgilService.autorizar(command).subscribe(() => {
      this.popupService.success(Resources.Messages.LaMuestraFueAutorizada, Resources.Labels.AutorizarEnFormaAgil);
      this.modalAutorizarFormaAgil.clear();
    });
  }

  private createForm() {
    this.gestionarMuestrasForm = this.fb.group({
      filtros: this.fb.group({
        codigoBarras: ['', Validators.pattern('^[0-9]*$')],
        fechaDesde: ['', Validators.required],
        fechaHasta: ['', Validators.required],
        estado: ''
      })
    });
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('codigoBarras', '');
    this.filters.add('fechaDesde', '');
    this.filters.add('fechaHasta', '');
    this.filters.add('idEstado', '');
    this.filters.add('allEstadoMuestra', '');
  }

  private setEstadosValidosPorAccion() {
    this.estadosValidosPorAccion = new Dictionary<Array<number>>();
    this.estadosValidosPorAccion.add('descartar', [EstadosMuestra.PendienteAutorizacion]);
    this.estadosValidosPorAccion.add('autorizar', [EstadosMuestra.PendienteAutorizacion]);
    this.estadosValidosPorAccion.add('cambiarCodigoBarra', [EstadosMuestra.PendienteAutorizacion, EstadosMuestra.AutorizadoEnvioCamara]);
    this.estadosValidosPorAccion.add('reversarEstadoMuestra', [EstadosMuestra.Descartada]);
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
        name: Resources.Labels.TipoNumeroPorte,
        prop: 'tipoYDocumentoPorte'
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
        name: Resources.Labels.CodBarra,
        prop: 'codigoBarras'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaIngreso'
      },
      {
        name: Resources.Labels.EstadoMuestra,
        prop: 'estadoMuestra'
      },
      {
        name: Resources.Labels.Camara,
        prop: 'camara'
      },
      {
        name: Resources.Labels.TipoAnalisis,
        prop: 'tipoAnalisis'
      },
      {
        name: Resources.Labels.FechaAut,
        prop: 'fechaAutorizacion'
      },
      {
        name: Resources.Labels.FechaEnvio,
        prop: 'fechaEnvio'
      }// ,
      // {
      //   name: Resources.Labels.Ubicacion,
      //   prop: 'ubicacionFisica'
      // }
    ];
  }

  private subscribeToFiltersChanges() {
    const codigoBarrasCtrl = this.gestionarMuestrasForm.get('filtros.codigoBarras');
    const fechaDesdeCtrl = this.gestionarMuestrasForm.get('filtros.fechaDesde');
    const fechaHastaCtrl = this.gestionarMuestrasForm.get('filtros.fechaHasta');
    const estadoCtrl  = this.gestionarMuestrasForm.get('filtros.estado');

    if (codigoBarrasCtrl && estadoCtrl && fechaDesdeCtrl && fechaHastaCtrl) {
      codigoBarrasCtrl.valueChanges.subscribe((codigoBarrasValue: string) => {
        this.filters['codigoBarras'] = codigoBarrasValue;
      });
      fechaDesdeCtrl.valueChanges.subscribe((fechaDesdeValue: string) => {
        this.filters['fechaDesde'] = fechaDesdeValue;
      });
      fechaHastaCtrl.valueChanges.subscribe((fechaHastaValue: string) => {
        this.filters['fechaHasta'] = fechaHastaValue;
      });
      estadoCtrl.valueChanges.subscribe((estadoValue: EstadoMuestra) => {
        if (estadoValue) {
          this.filters['idEstado'] = estadoValue.id;
        }
      });
    }
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );

    this.notificationActionsService.invalidFilters
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() => {
        const fechaDesdeCtrl = this.gestionarMuestrasForm.get('filtros.fechaDesde');
        const fechaHastaCtrl = this.gestionarMuestrasForm.get('filtros.fechaHasta');
        if (fechaDesdeCtrl && fechaHastaCtrl) {
          fechaDesdeCtrl.markAsTouched();
          fechaHastaCtrl.markAsTouched();
          fechaDesdeCtrl.updateValueAndValidity();
          fechaHastaCtrl.updateValueAndValidity();
        }
      });

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clear()
      );

    this.notificationActionsService.clickSearch
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.selectedRow = null
      );

    this.notificationActionsService.clickExcelExport
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(rows =>
        this.clickExcelExport(rows)
      );
  }

  private subscribeToDropDownEvents() {
    this.dropdownNotificationService.allItemsWereSelected
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe( entities =>
        this.filters['allEstadoMuestra'] = entities
      );
  }

  private setValuesByDefault() {
    this.setValue(`filtros.estado`, new EstadoMuestra(-1, Resources.Labels.Todos) , {onlySelf: true});
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.gestionarMuestrasForm.get(controlName);
    if (control) {
      control.patchValue(value, options);
      control.reset(value, options);
      control.setValue(value, options);
    }
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Muestras', ['Gestión de Muestras']);
  }

  private validateEstadoMuestraParaAccion(accion: string, idEstado: number) {
    if (this.estadosValidosPorAccion.containsKey(accion)) {
      const item = this.estadosValidosPorAccion.item(accion);
      return  item.some(i => i === idEstado);
    }
    return false;
  }

  private clear() {
    this.gestionarMuestrasForm.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.init();
  }

  private refresh() {
    this.notificationActionsService.onRefreshGrid();
    this.filtroBusquedaMuestra.setFocus();
  }
}
