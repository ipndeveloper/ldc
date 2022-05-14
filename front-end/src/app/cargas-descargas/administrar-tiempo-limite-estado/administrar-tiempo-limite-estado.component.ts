import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdministrarTiempoLimiteEstadoService } from './administrar-tiempo-limite-estado.service';
import { AdministrarTiempoLimiteEstadoDataView } from '../../shared/data-models/administrar-tiempo-limite-estado-data-view';
import { TiempoLimiteEstadoCommand, CrearTiempoLimiteEstadoCommand, ModificarTiempoLimiteEstadoCommand } from '../../shared/data-models/commands/cargas-descargas/tiempo-limite-estado-command';
import { TiempoLimiteEstadoDataView } from '../../shared/data-models/tiempo-limite-estado-data-view';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { FiltroAdministrarTiempoLimiteEstadoComponent } from './filtro-administrar-tiempo-limite-estado/filtro-administrar-tiempo-limite-estado.component';
import { DetalleAdministrarTiempoLimiteEstadoComponent } from './detalle-administrar-tiempo-limite-estado/detalle-administrar-tiempo-limite-estado.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-tiempo-limite-estado',
  templateUrl: './administrar-tiempo-limite-estado.component.html',
  styleUrls: ['./administrar-tiempo-limite-estado.component.css']
})
export class AdministrarTiempoLimiteEstadoComponent
     extends AdministrableFormComponent<AdministrarTiempoLimiteEstadoDataView[],
                                        TiempoLimiteEstadoCommand,
                                        CrearTiempoLimiteEstadoCommand,
                                        ModificarTiempoLimiteEstadoCommand,
                                        TiempoLimiteEstadoDataView> {

  @ViewChild('filtro') filtro: FiltroAdministrarTiempoLimiteEstadoComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarTiempoLimiteEstadoComponent;

  constructor(readonly popupService: PopupService,
              readonly notificationActionsService: SearchFormActionsNotifierService,
              protected readonly fcService: FormComponentService,
              protected readonly service: AdministrarTiempoLimiteEstadoService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(service, notificationActionsService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarTiempoLimiteEstadoConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarTiempoLimiteEstadoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarTiempoLimiteEstadoModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarTiempoLimiteEstadoEliminar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarTiempoLimiteEstadoExportarAExcel;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        estado: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        estado: [{ value: '', disabled: true }, Validators.required],
        tiempoLimite: [{ value: '', disabled: true }, Validators.required]
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
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.TiempoLimite,
        prop: 'tiempoLimite'
      }
    ];
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: TiempoLimiteEstadoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.estado', data.estado, { onlySelf: true }, isView || this.editId !== 0);
    this.fcService.setValue('detalle.tiempoLimite', data.tiempoLimite, { onlySelf: true }, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.estado', 'estado');
  }

  mapControlsToCommand(): TiempoLimiteEstadoCommand {
    const command = new TiempoLimiteEstadoCommand();
    command.idEstado = this.fcService.getValue('detalle.estado');
    command.tiempoLimite = this.fcService.getValue('detalle.tiempoLimite');
    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.TiempoLimitePorEstado);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.TiempoLimitePorEstado);
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();
    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Tiempo Límite por Estado', ['Tiempo Límite por Estado']);
  }
}
