import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarProductosHablitadosPorTerminalDataView } from '../../shared/data-models/administrar-productos-habilitados-por-terminal-data-view';
import { DetalleAdministrarProductosHabilitadosPorTerminalComponent } from './detalle-administrar-productos-habilitados-por-terminal/detalle-administrar-productos-habilitados-por-terminal.component';
import { FiltroAdministrarProductosHabilitadosPorTerminalComponent } from './filtro-administrar-productos-habilitados-por-terminal/filtro-administrar-productos-habilitados-por-terminal.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { AdministrarProductosHabilitadosPorTerminalService } from './administrar-productos-habilitados-por-terminal.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { ProductosHablitadosPorTerminalDataView } from '../../shared/data-models/productos-hablitados-por-terminal-data-view';
import { catchError, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductoHabilitadoPorTerminalCommand, CrearProductoHabilitadoPorTerminalCommand, ModificarProductoHabilitadoPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/producto-habilitado-por-terminal-command';

@Component({
  selector: 'yrd-administrar-productos-habilitados-por-terminal',
  templateUrl: './administrar-productos-habilitados-por-terminal.component.html',
  styleUrls: ['./administrar-productos-habilitados-por-terminal.component.css']
})
export class AdministrarProductosHabilitadosPorTerminalComponent
        extends AdministrableFormComponent<Array<AdministrarProductosHablitadosPorTerminalDataView>,
                                  ProductoHabilitadoPorTerminalCommand,
                                  CrearProductoHabilitadoPorTerminalCommand,
                                  ModificarProductoHabilitadoPorTerminalCommand,
                                  ProductosHablitadosPorTerminalDataView>
        implements OnInit, AfterViewInit  {

  @ViewChild('detalle') detalle: DetalleAdministrarProductosHabilitadosPorTerminalComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarProductosHabilitadosPorTerminalComponent;
  esModificacion: boolean;

  constructor(public readonly service: AdministrarProductosHabilitadosPorTerminalService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              public readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarProductosHabilitadosPorTerminalConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarProductosHabilitadosPorTerminalAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarProductosHabilitadosPorTerminalModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarProductosHabilitadosPorTerminalAExcel;
  }

  public ngOnInit() {
    super.ngOnInit();
    this.setearValoresPorDefectoFiltros();
    this.esModificacion = false;
  }

  ngAfterViewInit(): void {
    this.subscribeDetailChanges();
  }

  private subscribeDetailChanges(): void {
    const imprimeObleaCtrl = this.form.get('detalle.imprimeOblea');
    const cantidadCopiasObleaCtrl = this.form.get('detalle.cantidadCopiasOblea');
    if (imprimeObleaCtrl && cantidadCopiasObleaCtrl) {
      imprimeObleaCtrl.valueChanges.subscribe((imprimeOblea: boolean) => {
        if (imprimeOblea) {
          cantidadCopiasObleaCtrl.enable();
          cantidadCopiasObleaCtrl.setValidators([Validators.required, Validators.min(1)]);
          cantidadCopiasObleaCtrl.updateValueAndValidity();
        } else {
          cantidadCopiasObleaCtrl.clearValidators();
          cantidadCopiasObleaCtrl.setValue('');
          cantidadCopiasObleaCtrl.updateValueAndValidity();
          cantidadCopiasObleaCtrl.disable();
        }
      });
    }
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: false }],
        habilitado: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: false }, Validators.required],
        cosechaPorDefecto: [{ value: '', disabled: false }],
        producto: [{ value: undefined, disabled: false }, Validators.required],
        habilitado: [{ value: '', disabled: false }, Validators.required],
        grupoAnalisisDefecto: [{ value: '', disabled: false }],
        silos: [{ value: '', disabled: false }],
        gradoPorDefecto: [{ value: '', disabled: false }],
        rubros: this.fb.array([]),
        leyendaNormaCalidad: [{ value: '', disabled: false }, Validators.maxLength(50)],
        imprimeOblea: { value: false, disabled: true },
        cantidadCopiasOblea: { value: '', disabled: true },
        gestionaCot: { value: false, disabled: true },
        usaSustentabilidad: { value: false, disabled: true },
        datosModalRubro: this.fb.group({
          id: [{ value: '', disabled: false }],
          rubroCalidad: [{ value: '', disabled: false }],
          orden: [{ value: '', disabled: false }],
          minimo: [{ value: '', disabled: false }, Validators.min(0.01)],
          maximo: [{ value: '', disabled: false }, Validators.min(0.01)],
          requeridoSAN: [{ value: '', disabled: true }],
          requeridoPlanta: [{ value: '', disabled: false }],
          esRequeridoSAN: [{ value: '', disabled: true }],
          esRequeridoPlanta: [{ value: '', disabled: false }]
        })
      }),
    });
    this.fcService.initialize(this.form);
  }
  setGridColumns(): void {
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
        name: Resources.Labels.Terminal,
        prop: 'terminal.descripcion'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      },
    ];
  }

  public subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
    .pipe( takeUntil(this.onDestroy))
    .subscribe(rows =>
      this.clickExcelExport(rows)
    );
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Caracteristicas', ['Caracteristicas']);
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    const habilitadoControl = this.form.get('filtros.habilitado');
    if (habilitadoControl) {
      habilitadoControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['habilitado'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['habilitado'] = null;
        }
      });
    }
  }

  protected clickView(row: AdministrarProductosHablitadosPorTerminalDataView) {
    if (row) {
      this.fcService.disableControl('detalle.silos');
      this.fcService.disableControl('detalle.gradoPorDefecto');
      this.fcService.disableControl('detalle.rubros');
      this.isLoading = true;
      this.esConsulta = true;
      this.esModificacion = false;
      this.service.getProductoPorTerminal(row.producto.id, row.terminal.id)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe((data: ProductosHablitadosPorTerminalDataView) => {
          this.fillControls(data, true);
          this.isLoading = false;
        });
    }
  }

  protected clickEdit(row: AdministrarProductosHablitadosPorTerminalDataView) {
    if (row) {
      this.isLoading = true;
      this.esConsulta = false;
      this.esModificacion = true;
      this.service.getProductoPorTerminal(row.producto.id, row.terminal.id)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe((data: ProductosHablitadosPorTerminalDataView) => {
          this.fillControls(data, false);
          this.editId = 1;
          this.isLoading = false;
        });
    }
  }

  protected clickAdd() {
    this.esConsulta = false;
    this.esModificacion = false;
    super.clickAdd();
    this.fcService.setValue('detalle.habilitado', true);
    this.fcService.setValue('detalle.gestionaCot', true);
    this.fcService.setValue('detalle.imprimeOblea', false);
    this.fcService.disableControl('detalle.habilitado');
    this.fcService.disableControl('detalle.usaSustentabilidad');
  }

  setFocusFiltro(): void {
    setTimeout(() => { this.filtro.setFocus(); }, 0);
  }

  setFocusDetalle(): void {
    if (this.esModificacion) {
      setTimeout(() => { this.detalle.setFocusHabilitado(); }, 0);
    } else {
      setTimeout(() => { this.detalle.setFocusTerminal(); }, 0);
    }
  }

  fillControlsWithData(data: ProductosHablitadosPorTerminalDataView, isView: boolean): void {
    this.fcService.setValue('detalle.grupoAnalisisDefecto', data.grupoAnalisisDefecto, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.producto', data.producto, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.cosechaPorDefecto', data.cosechaPorDefecto, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.leyendaNormaCalidad', data.leyendaNormaCalidad, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.imprimeOblea', data.imprimeOblea, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.cantidadCopiasOblea', data.cantidadCopiasOblea, { onlySelf: true }, isView || !data.imprimeOblea);
    this.fcService.setValue('detalle.gestionaCot', data.gestionaCot, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.usaSustentabilidad', data.usaSustentabilidad, {onlySelf: true}, isView);

    this.detalle.setListaGrados(data.gradosNoSeleccionados);
    this.detalle.setListaSilos(data.silosNoSeleccionados);
    setTimeout(() => {
      this.detalle.setGrado(data.gradosSeleccionados);
      this.detalle.setSilos(data.silosSeleccionados);
    }, 0);
    this.detalle.setRubrosPorTerminal(data.rubros);
    this.verficarDeterminaGrado(data.gradosSeleccionados);
  }

  private verficarDeterminaGrado(grados: Array<number>) {
    if (grados.length > 0) {
      this.detalle.determinaGrado = true;
    }
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  public cancelar() {
    super.cancelar();
    this.detalle.clearGrados();
    this.detalle.clearSilos();
    this.detalle.clearRubros();
  }

  mapControlsToCommand(): ProductoHabilitadoPorTerminalCommand {
    const command = new CrearProductoHabilitadoPorTerminalCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idProducto = this.fcService.getValue('detalle.producto');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.IdGrupoAnalisisDefecto = this.fcService.getValue('detalle.grupoAnalisisDefecto');
    command.rubrosCalidad = this.fcService.getValue('detalle.rubros');
    command.silos = this.fcService.getValue('detalle.silos');
    command.grados = this.fcService.getValue('detalle.gradoPorDefecto');
    command.idCosechaPorDefecto = this.fcService.getValue('detalle.cosechaPorDefecto');
    command.leyendaNormaCalidad = this.fcService.getValue('detalle.leyendaNormaCalidad');
    command.imprimeOblea = this.fcService.getValue('detalle.imprimeOblea');
    command.cantidadCopiasOblea = this.fcService.getValue('detalle.cantidadCopiasOblea');
    command.gestionaCot = this.fcService.getValue('detalle.gestionaCot');
    command.usaSustentabilidad = this.fcService.getValue('detalle.usaSustentabilidad');

    return command;
  }
  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Producto);
  }
  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Producto);
  }
}
