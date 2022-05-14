import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { GestionarTrabajosGeneracionArchivosMuestraDataView } from '../../shared/data-models/gestionar-trabajos-generacion-archivos-muestra-data-view';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { EstadoMuestra } from '../../shared/data-models/estado-muestra';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { FiltroBusquedaTrabajosArchivosMuestraComponent } from './filtro-busqueda-trabajos-archivos-muestra/filtro-busqueda-trabajos-archivos-muestra.component';
import { SearchTrabajosArchivosMuestraService } from './services/search-trabajos-archivos-muestra.service';
import { GestionarTrabajosArchivosMuestraService } from './services/gestionar-trabajos-archivos-muestra.service';
import { ReintentarTrabajoGeneracionArchivoMuestrasCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-trabajo-generacion-archivo-muestras-command';
import { DescartarTrabajoGeneracionArchivoMuestrasCommand } from '../../shared/data-models/commands/cargas-descargas/descartar-trabajo-generacion-archivo-muestras-command';
import { EstadoTrabajoGeneracionArchivoMuestra } from '../../shared/data-models/estado-trabajo-generacion-archivo-muestra';
import { ModalAgregarTrabajoGeneracionArchivosMuestraComponent } from '../shared/modals/modal-agregar-trabajo-generacion-archivos-muestra/modal-agregar-trabajo-generacion-archivos-muestra.component';
import { AgregarTrabajoGeneracionArchivoMuestrasCommand } from '../../shared/data-models/commands/cargas-descargas/agregar-trabajo-generacion-archivo-muestras-command';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FileService, FileType, FileExtension, FileName } from '../../core/services/file/file.service';
import { ModalMostrarMensajeComponent } from '../shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';
import { ParametrosTerminalService } from '../shared/services/parametros-terminal.service';
import { Permission } from '../../shared/enums/enums';

@Component({
  selector: 'yrd-gestionar-trabajos-archivos-muestra',
  templateUrl: './gestionar-trabajos-archivos-muestra.component.html',
  styleUrls: ['./gestionar-trabajos-archivos-muestra.component.css'],
  providers: [{provide: SearchFormService, useClass: SearchTrabajosArchivosMuestraService}, SearchTrabajosArchivosMuestraService]
})

export class GestionarTrabajosArchivosMuestraComponent
  extends SearchFormComponent<Array<GestionarTrabajosGeneracionArchivosMuestraDataView>>
  implements OnInit, OnDestroy {

  Permission = Permission;

  gestionarTareasProgramadasForm: FormGroup;
  columns: any;
  selectedRow: any;
  cantidadDiasFiltro: number;
  usaMuestraIntacta: boolean;
  fileType: FileType;
  fileExtension: FileExtension;
  fileName: FileName;
  private readonly onDestroy = new Subject();
  @ViewChild('filtroBusquedaTareasProgramadas')
    filtroBusquedaTrabajosGeneracionArchivosMuestra: FiltroBusquedaTrabajosArchivosMuestraComponent;
  @ViewChild('modalGenerarArchivosMuestra') modalGenerarArchivosMuestra: ModalAgregarTrabajoGeneracionArchivosMuestraComponent;
  @ViewChild('modalError') modalError: ModalMostrarMensajeComponent;

  constructor(private readonly fb: FormBuilder,
    searchTrabajosGeneracionArchivosMuestraService: SearchTrabajosArchivosMuestraService,
    public readonly notificationActionsService: SearchFormActionsNotifierService,
    public readonly gestionarTrabajosGeneracionArchivosMuestraService: GestionarTrabajosArchivosMuestraService,
    private readonly dropdownNotificationService:  DropdownNotificationService<EstadoMuestra>,
    private readonly excelExportService: ExcelService,
    public readonly popupService: PopupService,
    public readonly parametrosTerminalService: ParametrosTerminalService,
    public readonly fileService: FileService) {
    super(searchTrabajosGeneracionArchivosMuestraService, notificationActionsService, popupService);
    this.botonesHabilitados = new Dictionary<boolean>();
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
  }

  ngOnInit() {
    this.getParametrosTerminal();
    this.setFilters();
    this.init();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private init() {
    this.createForm();
    this.subscribeToActionEventsPrivate();
    this.subscribeToFiltersChanges();
    this.subscribeToDropDownEvents();
    this.setGridColumns();
    this.setValuesByDefault();
  }

  getParametrosTerminal() {
    this.parametrosTerminalService.getParametros().subscribe(parametros => {
      if (parametros) {
        this.cantidadDiasFiltro = parametros.diferenciaDiasFiltroGeneracionArchivoMuestra;
        this.fileType = parametros.usaMuestraIntacta ? FileType.TXT : FileType.ZIP;
        this.fileExtension = parametros.usaMuestraIntacta ? FileExtension.TXT : FileExtension.ZIP;
        this.fileName = parametros.usaMuestraIntacta ? FileName.INTACTARR2 : FileName.ARCHIVOMUESTRA;
      }
    });
  }


  private createForm() {
    this.gestionarTareasProgramadasForm = this.fb.group({
      filtros: this.fb.group({
        fechaDesde: ['', Validators.required],
        fechaHasta: ['', Validators.required],
        estado: ''
      })
    });
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('fechaDesde', '');
    this.filters.add('fechaHasta', '');
    this.filters.add('idEstado', '');
    this.filters.add('allEstadoTrabajo', '');
    this.filters.add('parametroDiasFiltro', '');
  }

  onClickGeneracionManual() {
    this.modalGenerarArchivosMuestra.open();
  }


  onClickReintentar() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      const movimiento = this.selectedRow as GestionarTrabajosGeneracionArchivosMuestraDataView;
      if (movimiento[0]) {
        const command = new ReintentarTrabajoGeneracionArchivoMuestrasCommand(movimiento[0].id);
        this.gestionarTrabajosGeneracionArchivosMuestraService.reintentar(command).subscribe(() =>
        this.popupService.success(Resources.Messages.ReintentoExitoso));
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Reintentar);
    }
  }


  onClickDescargarArchivo() {
    if (this.selectedRow  && this.selectedRow.length === 1) {
      const trabajoGeneracionArchivoMuestra = this.selectedRow as GestionarTrabajosGeneracionArchivosMuestraDataView;
      if (trabajoGeneracionArchivoMuestra[0] && trabajoGeneracionArchivoMuestra[0].idArchivo) {
        this.fileService.get(trabajoGeneracionArchivoMuestra[0].idArchivo).subscribe((archivo: any) => {
          if (archivo) {
            this.fileService.download(archivo, this.fileName, this.fileType, this.fileExtension);
            this.popupService.success(Resources.Messages.DescargaDeArchivoExitoso);
          }
        });
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.DescargarArchivo);
    }
  }

  onClickVerError() {
    if (this.selectedRow  && this.selectedRow.length === 1) {
      if (!this.selectedRow[0].descripcionError) {
        this.popupService.error(Resources.Messages.TrabajoGeneracionArchivoMuestraSinError);
      } else {
        this.modalError.open(this.selectedRow[0].descripcionError);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.VerError);
    }
  }

  onClickDescartar() {
    if (this.selectedRow  && this.selectedRow.length === 1) {
      const movimiento = this.selectedRow as GestionarTrabajosGeneracionArchivosMuestraDataView;
      if (movimiento[0]) {
        const command = new DescartarTrabajoGeneracionArchivoMuestrasCommand(movimiento[0].id);
        this.gestionarTrabajosGeneracionArchivosMuestraService.descartar(command).subscribe(() =>
        this.popupService.success(Resources.Messages.DescarteExitoso));
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Descartar);
    }
  }

  onClickGenerar(command: AgregarTrabajoGeneracionArchivoMuestrasCommand) {
    this.gestionarTrabajosGeneracionArchivosMuestraService.agregar(command).subscribe(() => {
      this.popupService.success(Resources.Messages.TrabajoGeneracionArchivoMuestraCreado);
    });
  }

  onClickActualizarLista() {
    this.refresh();
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
        name: Resources.Labels.FechaGeneracion,
        prop: 'fechaGeneracion'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.ModoAutomaticoManual,
        prop: 'modoAutomatico'
      },
      {
        name: Resources.Labels.EnvioMailAutomaticoManual,
        prop: 'envioEmailAutomatico'
      },
      {
        name: Resources.Labels.FechaHoraProgramada,
        prop: 'fechahoraProgramada'
      },
      {
        name: Resources.Labels.DescripcionTarea,
        prop: 'descripcionTarea'
      }
    ];
  }

  private subscribeToFiltersChanges() {
    const fechaDesdeCtrl = this.gestionarTareasProgramadasForm.get('filtros.fechaDesde');
    const fechaHastaCtrl = this.gestionarTareasProgramadasForm.get('filtros.fechaHasta');
    const estadoCtrl  = this.gestionarTareasProgramadasForm.get('filtros.estado');

    if (estadoCtrl && fechaDesdeCtrl && fechaHastaCtrl) {
      fechaDesdeCtrl.valueChanges.subscribe((fechaDesdeValue: string) => {
        this.filters['fechaDesde'] = fechaDesdeValue;
      });
      fechaHastaCtrl.valueChanges.subscribe((fechaHastaValue: string) => {
        this.filters['fechaHasta'] = fechaHastaValue;
      });
      estadoCtrl.valueChanges.subscribe((estadoValue: EstadoTrabajoGeneracionArchivoMuestra) => {
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
        const fechaDesdeCtrl = this.gestionarTareasProgramadasForm.get('filtros.fechaDesde');
        const fechaHastaCtrl = this.gestionarTareasProgramadasForm.get('filtros.fechaHasta');
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
      .subscribe(entities =>
        this.filters['allEstadoTrabajo'] = entities
      );
  }

  private setValuesByDefault() {
    this.setValue(`filtros.estado`, new EstadoTrabajoGeneracionArchivoMuestra(-1, Resources.Labels.Todos) , {onlySelf: true});
    setTimeout(() => {
      this.filters['parametroDiasFiltro'] = this.cantidadDiasFiltro;
    }, 500);
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.gestionarTareasProgramadasForm.get(controlName);
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión archivos muestras',
                                                            ['Gestión archivos muestras']);
  }


  private clear() {
    this.gestionarTareasProgramadasForm.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.init();
  }

  private refresh() {
    this.notificationActionsService.onRefreshGrid();
    this.filtroBusquedaTrabajosGeneracionArchivosMuestra.setFocus();
  }
}
