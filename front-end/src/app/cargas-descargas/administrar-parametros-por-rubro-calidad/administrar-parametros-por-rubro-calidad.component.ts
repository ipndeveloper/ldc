import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Permission, TablasTransporte } from '../../shared/enums/enums';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { ParametrosPorRubroCalidadDataView } from '../../shared/data-models/parametros-por-rubro-calidad-data-view';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { ParametrosPorRubroCalidadCommand, CrearParametrosPorRubroCalidadCommand, ModificarParametrosPorRubroCalidadCommand } from '../../shared/data-models/commands/cargas-descargas/parametros-por-rubro-calidad-command';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { DetalleParametrosPorRubroCalidadComponent } from './detalle-parametros-por-rubro-calidad/detalle-parametros-por-rubro-calidad.component';
import { AdministrarParametrosPorRubroCalidadService } from './administrar-parametros-por-rubro-calidad.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-parametros-por-rubro-calidad',
  templateUrl: './administrar-parametros-por-rubro-calidad.component.html',
  styleUrls: ['./administrar-parametros-por-rubro-calidad.component.css']
})
export class AdministrarParametrosPorRubroCalidadComponent
     extends AdministrableFormComponent<Array<ParametrosPorRubroCalidadDataView>,
                                        ParametrosPorRubroCalidadCommand,
                                        CrearParametrosPorRubroCalidadCommand,
                                        ModificarParametrosPorRubroCalidadCommand,
                                        ParametrosPorRubroCalidadDataView>
  implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleParametrosPorRubroCalidadComponent;

  Permission = Permission;
  idTablaTransporte = TablasTransporte.RubrosCalidad;

  constructor(protected readonly administrarParametrosPorRubroCalidadService: AdministrarParametrosPorRubroCalidadService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(administrarParametrosPorRubroCalidadService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarEquivalenciasArchestraRubroCalidadConsultar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarEquivalenciasArchestraRubroCalidadModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarEquivalenciasArchestraRubroCalidadExportarAExcel;
  }

  protected init(): void {
    this.initForm();
    this.setGridColumns();
    this.search();
  }

  createForm(): void {
    this.form = this.fb.group({
      detalle: this.fb.group({
        nombre: [{ value: '', disabled: true }, Validators.required],
        codigoArchestra: [{ value: '', disabled: true }, Validators.required]
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
        name: Resources.Labels.Nombre,
        prop: 'nombre',
        width: 100
      },
      {
        name: Resources.Labels.EquivalenciaArchestra,
        prop: 'codigoArchestra',
        width: 100
      }
    ];
  }

  setFocusFiltro(): void { }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: ParametrosPorRubroCalidadDataView, isView: boolean): void {
    this.fcService.setValue('detalle.nombre', { id: data.id }, { onlySelf: true }, true);
    this.fcService.setValue('detalle.codigoArchestra', data.codigoArchestra, { onlySelf: true }, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void { }

  mapControlsToCommand(): ParametrosPorRubroCalidadCommand {
    const command = new ParametrosPorRubroCalidadCommand();
    command.codigoArchestra = this.fcService.getValue('detalle.codigoArchestra');
    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.RubroCalidad);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.RubroCalidad);
  }

  protected subscribeToActionEventsAdministration(): void {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.refreshGrid
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  private clickExcelExport(dataGrid): void {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Parametros Por Rubro Calidad', ['RubroCalidad']);
  }
}
