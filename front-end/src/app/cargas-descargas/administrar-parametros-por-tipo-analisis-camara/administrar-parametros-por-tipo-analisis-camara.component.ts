import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { AdministrarParametrosPorTipoAnalisisCamaraService } from './administrar-parametros-por-tipo-analisis-camara.service';
import { Permission } from '../../shared/enums/enums';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarParametrosPorTipoAnalisisCamaraDataView } from '../../shared/data-models/administrar-parametros-por-tipo-analisis-camara-data-view';
import { FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent } from './filtro-administrar-parametros-por-tipo-analisis-camara/filtro-administrar-parametros-por-tipo-analisis-camara.component';
import { DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent } from './detalle-administrar-parametros-por-tipo-analisis-camara/detalle-administrar-parametros-por-tipo-analisis-camara.component';
import { CrearTipoAnalisisCamaraCommand, ModificarParametrosGrupoRubroCalidadAnalisisCommand, TipoAnalisisCamaraCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-analisis-camara-command';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ParametrosPorTipoAnalisisCamaraDataView } from '../../shared/data-models/parametros-por-tipo-analisis-camara-data-view';

@Component({
  selector: 'yrd-administrar-parametros-por-tipo-analisis-camara',
  templateUrl: './administrar-parametros-por-tipo-analisis-camara.component.html',
  styleUrls: ['./administrar-parametros-por-tipo-analisis-camara.component.css']
})
export class AdministrarParametrosPorTipoAnalisisCamaraComponent
     extends AdministrableFormComponent<Array<AdministrarParametrosPorTipoAnalisisCamaraDataView>,
                                              TipoAnalisisCamaraCommand,
                                              CrearTipoAnalisisCamaraCommand,
                                              ModificarParametrosGrupoRubroCalidadAnalisisCommand,
                                              ParametrosPorTipoAnalisisCamaraDataView> {

  @ViewChild('filtro') filtro: FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarParametrosPorTipoAnalisisCamaraComponent;
  @ViewChild('botonCancelar') botonCancelar: ElementRef;

  form: FormGroup;
  disableFiltros = true;
  Permission = Permission;

  constructor(public readonly service: AdministrarParametrosPorTipoAnalisisCamaraService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              private readonly fb: FormBuilder,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Consultar] = true;

    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarParametrosPorTipoAnalisisCamaraModificar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarParametrosPorTipoAnalisisCamaraAgregar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarParametrosPorTipoAnalisisCamaraExportarAExcel;
    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarParametrosPorTipoAnalisisCamaraConsultar;
  }

  protected init(): void {
    super.init();
    this.subscribeDetalleChanges();
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: undefined, disabled: false }],
        producto: [{ value: undefined, disabled: false }],
        tipoAnalisis: [{ value: undefined, disabled: false }]
      }),
      detalle: this.fb.group({
        terminal: [{ value: undefined, disabled: true }, Validators.required],
        producto: [{ value: undefined, disabled: true }, Validators.required],
        tipoAnalisis: [{ value: undefined, disabled: true }, Validators.required],
        esEspecial: [{ value: '', disabled: true }],
        codigoCamara: [{ value: '', disabled: true }]
      })
    });
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.TipoAnalisis);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.TipoAnalisis);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  fillControlsWithData(data: ParametrosPorTipoAnalisisCamaraDataView, isView: boolean) {
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, isView || this.editId !== 0);
    this.fcService.setValue('detalle.producto', data.producto, { onlySelf: true }, isView || this.editId !== 0);
    this.fcService.setValue('detalle.tipoAnalisis', data.tipoAnalisis, { onlySelf: true }, isView || this.editId !== 0);
    this.fcService.setValue('detalle.esEspecial', data.esEspecial, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.codigoCamara', data.codigoCamara, { onlySelf: true }, isView);
  }

  setGridColumns() {
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
        prop: 'terminal'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.TipoAnalisis,
        prop: 'tipoAnalisis'
      },
      {
        name: Resources.Labels.EsEspecial,
        prop: 'esEspecial'
      },
      {
        name: Resources.Labels.CodigoCamara,
        prop: 'codigoCamara'
      },
    ];
  }

  protected saveNewItem(command: TipoAnalisisCamaraCommand) {
    this.runAction(this.service.update(command),
                   this.getCreateSuccessMessage(),
                   Resources.Labels.Agregar);
  }

  mapControlsToCommand(): TipoAnalisisCamaraCommand {
    const command = new TipoAnalisisCamaraCommand();
    command.id = this.fcService.getValue('detalle.tipoAnalisis');
    command.esEspecial = this.fcService.getValue('detalle.esEspecial');
    command.codigoCamara = this.fcService.getValue('detalle.codigoCamara');
    return command;
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Parámetros por Tipo Análisis Camara', ['Productos']);
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.producto', 'idProducto');
    this.subscribeToFilterControlChanges('filtros.terminal', 'idTerminal');
    this.subscribeToFilterControlChanges('filtros.tipoAnalisis', 'idTipoAnalisis');
  }

  private subscribeDetalleChanges(): void {
    const esEspecialCtrl = this.fcService.getControl('detalle.esEspecial');
    if (esEspecialCtrl) {
      esEspecialCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
      .subscribe((esEspecial: boolean) => {
        const codigoCamara = this.fcService.getControl('detalle.codigoCamara');
        if (codigoCamara && !this.esConsulta) {
          if (!esEspecial) {
            codigoCamara.setValidators([Validators.required, Validators.min(1)]);
            this.fcService.enableControl('detalle.codigoCamara');
          } else {
            codigoCamara.clearValidators();
            this.fcService.disableControl('detalle.codigoCamara');
            this.fcService.setValue('detalle.codigoCamara', '');
          }
        }
      });
    }
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    if (this.esConsulta) {
      setTimeout(() => this.botonCancelar.nativeElement.focus(), 5);
    } else {
      setTimeout(() => this.detalle.setFocus(), 0);
    }
  }
}
