import { Component, OnInit, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarGrupoProductoDataView } from '../../shared/data-models/administrar-grupo-producto-data-view';
import { GrupoProductoModificacionFueraCircuitoDataView } from '../../shared/data-models/grupo-producto-modificacion-fuera-circuito-data-view';
import {
  GrupoProductoModificacionFueraCircuitoCommand,
  CrearGrupoProductoModificacionFueraCircuitoCommand,
  ModificarGrupoProductoModificacionFueraCircuitoCommand
} from '../../shared/data-models/commands/cargas-descargas/grupo-producto-modificacion-fuera-circuito-command';
import { FiltroAdministrarGrupoProductoComponent } from './filtro-administrar-grupo-producto/filtro-administrar-grupo-producto.component';
import { DetalleAdministrarGrupoProductoComponent } from './detalle-administrar-grupo-producto/detalle-administrar-grupo-producto.component';
import { AdministrarGrupoProductoService } from './administrar-grupo-producto.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';

@Component({
  selector: 'yrd-administrar-grupo-producto',
  templateUrl: './administrar-grupo-producto.component.html',
  styleUrls: ['./administrar-grupo-producto.component.css']
})
export class AdministrarGrupoProductoComponent
  extends AdministrableFormComponent<
    AdministrarGrupoProductoDataView[],
    GrupoProductoModificacionFueraCircuitoCommand,
    CrearGrupoProductoModificacionFueraCircuitoCommand,
    ModificarGrupoProductoModificacionFueraCircuitoCommand,
    GrupoProductoModificacionFueraCircuitoDataView
  >
  implements OnInit {

  @ViewChild('filtro') filtro: FiltroAdministrarGrupoProductoComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarGrupoProductoComponent;

  constructor(
    service: AdministrarGrupoProductoService,
    private readonly fb: FormBuilder,
    public readonly notificationActionsService: SearchFormActionsNotifierService,
    public readonly popupService: PopupService,
    protected readonly fcService: FormComponentService,
    private readonly excelExportService: ExcelService
  ) {
    super(service, notificationActionsService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = [
      Permission.AdministrarGrupoProductoModificacionFueraCircuito,
      Permission.AdministrarGrupoProductoModificacionFueraCircuitoConsultar];
    this.permisosBotones[BotonesEnum.Agregar] = [
      Permission.AdministrarTarjetasAgregar,
      Permission.AdministrarGrupoProductoModificacionFueraCircuitoAgregar];
    this.permisosBotones[BotonesEnum.Modificar] = [
      Permission.AdministrarTarjetasModificar,
      Permission.AdministrarGrupoProductoModificacionFueraCircuitoModificar];
    this.permisosBotones[BotonesEnum.ExportarAExcel] = [
      Permission.AdministrarTarjetasExportarAExcel,
      Permission.AdministrarGrupoProductoModificacionFueraCircuitoExportarAExcel];
  }

  ngOnInit() {
    super.ngOnInit();
    this.setearValoresPorDefectosFiltros();
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        descripcion: { value: '', disabled: false },
        tipoProducto: { value: '', disabled: false },
        habilitado: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        descripcion: [{ value: '', disabled: false }, Validators.required],
        tipoProducto: [{ value: '', disabled: true }],
        habilitado: [{ value: '', disabled: false }, Validators.required],
        productos: { value: [], disabled: true }
      })
    });
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
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      },
      {
        name: Resources.Labels.TipoProducto,
        prop: 'tipoProducto'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      }
    ];
  }

  private setearValoresPorDefectosFiltros(): any {
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: GrupoProductoModificacionFueraCircuitoDataView, isView: boolean): void {
    this.editId = data.id;
    this.fcService.setValue('detalle.descripcion', data.descripcion, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoProducto', data.tipoProducto, { onlySelf: true }, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, { onlySelf: true }, isView);

    this.detalle.setProductos(data.productos);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
    this.detalle.clearCheckboxLists();
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();
    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel(
      [dataGrid],
      'Administrar Grupo de Productos Modificación Fuera de Circuito',
      ['Grupo de Productos']);
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.tipoProducto', 'tipoProducto');
    this.subscribeToFilterControlChanges('filtros.descripcion', 'descripcion');

    const habilitado = this.form.get('filtros.habilitado');
    if (habilitado) {
      habilitado.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if (value && value.id !== OpcionesSiNo.Todos) {
          return (this.filters['habilitado'] = value.id ? value.id === OpcionesSiNo.Si : null);
        } else {
          return (this.filters['habilitado'] = null);
        }
      });
    }
  }

  mapControlsToCommand(): GrupoProductoModificacionFueraCircuitoCommand {
    const command = new GrupoProductoModificacionFueraCircuitoCommand();
    command.descripcion = this.fcService.getValue('detalle.descripcion');
    command.idTipoProducto = this.fcService.getValue('detalle.tipoProducto');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.idProductos = this.fcService.getValue('detalle.productos');

    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.GrupoProductos);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.GrupoProductos);
  }

  protected clickAdd() {
    super.clickAdd();
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true }, true);
    this.fcService.disableControl('detalle.habilitado');
  }
}
