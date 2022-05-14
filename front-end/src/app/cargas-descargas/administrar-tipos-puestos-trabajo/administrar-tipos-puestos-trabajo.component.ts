import { Component, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarTiposPuestosTrabajoService } from './administrar-tipos-puestos-trabajo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { AdministrarTiposPuestosTrabajoDataView } from '../../shared/data-models/administrar-tipos-puestos-trabajo-data-view';
import { TipoPuestoTrabajoCommand, CrearTipoPuestoTrabajoCommand, ModificarTipoPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-puesto-trabajo-command';
import { DetalleAdministrarTiposPuestosTrabajoComponent } from './detalle-administrar-tipos-puestos-trabajo/detalle-administrar-tipos-puestos-trabajo.component';
import { FiltroAdministrarTiposPuestosTrabajoComponent } from './filtro-administrar-tipos-puestos-trabajo/filtro-administrar-tipos-puestos-trabajo.component';
import { TiposPuestosTrabajoDataView } from '../../shared/data-models/tipos-puestos-trabajo-data-view';

@Component({
  selector: 'yrd-administrar-tipos-puestos-trabajo',
  templateUrl: './administrar-tipos-puestos-trabajo.component.html',
  styleUrls: ['./administrar-tipos-puestos-trabajo.component.css']
})
export class AdministrarTiposPuestosTrabajoComponent
     extends AdministrableFormComponent<Array<AdministrarTiposPuestosTrabajoDataView>,
                                              TipoPuestoTrabajoCommand,
                                              CrearTipoPuestoTrabajoCommand,
                                              ModificarTipoPuestoTrabajoCommand,
                                              TiposPuestosTrabajoDataView> {

  @ViewChild('detalle') detalle: DetalleAdministrarTiposPuestosTrabajoComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarTiposPuestosTrabajoComponent;

  constructor(readonly popupService: PopupService,
              protected readonly service: AdministrarTiposPuestosTrabajoService,
              protected readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarTiposPuestosTrabajoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarTiposPuestosTrabajoModificar;
    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarTiposPuestosTrabajoConsultar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarTiposPuestosTrabajoExportarAExcel;
  }

  setFocusFiltro(): void {
    if (this.filtro) {
      this.filtro.setFocus();
    }
  }

  setFocusDetalle(): void {
    if (this.detalle) {
      this.detalle.setFocus();
    }
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.tipoPuestoTrabajo', 'tipoPuestoTrabajo');
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        tipoPuestoTrabajo: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        descripcion: [{ value: '', disabled: true }, Validators.required]
      })
    });
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): TipoPuestoTrabajoCommand {
    const command = new TipoPuestoTrabajoCommand();
    command.id = this.fcService.getValue('detalle.id');
    command.nombre = this.fcService.getValue('detalle.descripcion');
    return command;
  }

  fillControlsWithData(data: TiposPuestosTrabajoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id);
    this.fcService.setValue('detalle.descripcion', data.descripcion, { onlySelf: true }, isView);
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
      }
    ];
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.TipoPuesto);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.TipoPuesto);
  }

  protected subscribeToActionEventsAdministration(): void {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid => this.clickExcelExport(dataGrid));
  }

  private clickExcelExport(dataGrid: any): void {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Tipos de Puestos de Trabajo', ['Tipos de Puestos de Trabajo']);
  }

}
