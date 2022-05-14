import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DetalleAdministrarTipoDocumentoPorteTipoProductoComponent } from './detalle-administrar-tipo-documento-porte-tipo-producto/detalle-administrar-tipo-documento-porte-tipo-producto.component';
import { FiltroAdministrarTipoDocumentoPorteTipoProductoComponent } from './filtro-administrar-tipo-documento-porte-tipo-producto/filtro-administrar-tipo-documento-porte-tipo-producto.component';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarTipoDocumentoPorteTipoProductoDataView } from '../../shared/data-models/administrar-tipo-documento-porte-tipo-producto-data-view';
import { TipoDocumentoPorteTipoProductoCommand, CrearTipoDocumentoPorteTipoProductoCommand, ModificarTipoDocumentoPorteTipoProductoCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-documento-porte-tipo-producto-command';
import { TipoDocumentoPorteTipoProductoDataView } from '../../shared/data-models/tipo-documento-porte-tipo-producto-data-view';
import { AdministrarTipoDocumentoPorteTipoProductoService } from './administrar-tipo-documento-porte-tipo-producto.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-tipo-documento-porte-tipo-producto',
  templateUrl: './administrar-tipo-documento-porte-tipo-producto.component.html',
  styleUrls: ['./administrar-tipo-documento-porte-tipo-producto.component.css']
})

export class AdministrarTipoDocumentoPorteTipoProductoComponent extends
  AdministrableFormComponent<Array<AdministrarTipoDocumentoPorteTipoProductoDataView>,
                                   TipoDocumentoPorteTipoProductoCommand,
                                   CrearTipoDocumentoPorteTipoProductoCommand,
                                   ModificarTipoDocumentoPorteTipoProductoCommand,
                                   TipoDocumentoPorteTipoProductoDataView> implements OnInit, OnDestroy {

@ViewChild('detalle') detalle: DetalleAdministrarTipoDocumentoPorteTipoProductoComponent;
@ViewChild('filtro') filtro: FiltroAdministrarTipoDocumentoPorteTipoProductoComponent;

  constructor(service: AdministrarTipoDocumentoPorteTipoProductoService,
              searchFormActionsNotifierService: SearchFormActionsNotifierService,
              popupService: PopupService,
              fcService: FormComponentService,
    private readonly fb: FormBuilder,
    private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarTipoDocumentoPorteTipoProductoConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarTipoDocumentoPorteTipoProductoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarTipoDocumentoPorteTipoProductoModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarTipoDocumentoPorteTipoProductoExportarAExcel;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.TipoDocumentoPorteTipoProducto);
  }
  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.TipoDocumentoPorteTipoProducto);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): TipoDocumentoPorteTipoProductoCommand {
    const command = new TipoDocumentoPorteTipoProductoCommand();
    command.id = this.fcService.getValue('detalle.id');
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idTipoDocumentoPorte = this.fcService.getValue('detalle.tipoDocumentoPorte');
    command.idTipoProducto = this.fcService.getValue('detalle.tipoProducto');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtro.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtro.tipoDocumentoPorte', 'tipoDocumentoPorte');
    this.subscribeToFilterControlChanges('filtro.tipoProducto', 'tipoProducto');
    const habilitadoControl = this.form.get('filtro.habilitado');
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

  fillControlsWithData(data: TipoDocumentoPorteTipoProductoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, true);
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.tipoDocumentoPorte', data.tipoDocumentoPorte, {onlySelf: true}, true);
    this.fcService.setValue('detalle.tipoProducto', data.tipoProducto, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtro: this.fb.group({
        terminal: {value: '', disabled: false},
        tipoDocumentoPorte: {value: '', disabled: false},
        tipoProducto: {value: '', disabled: false},
        habilitado: {value: '', disabled: false},
      }),
      detalle: this.fb.group({
        terminal: [{value: '', disabled: false}, Validators.required],
        tipoDocumentoPorte: [{value: '', disabled: false}, Validators.required],
        tipoProducto: [{value: '', disabled: false}, Validators.required],
        habilitado: {value: true, disabled: false}
      })
    });
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
        prop: 'terminal.descripcion'
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocumentoPorte.descripcion'
      },
      {
        name: Resources.Labels.TipoProducto,
        prop: 'tipoProducto.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado'
      }
    ];
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
  }

  protected clickAdd() {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtro.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.fcService.setValue('detalle.habilitado', true, {onlySelf: true}, true);
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
    this.excelExportService.exportDataGridAsExcel([dataGrid],
                                                  'Tipos de Documentos Porte por Tipo de Productos',
                                                  ['Tipos de Documentos Porte']);
  }

}
