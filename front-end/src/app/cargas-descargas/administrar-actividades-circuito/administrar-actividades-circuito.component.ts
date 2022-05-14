import { Component, ViewChild } from '@angular/core';
import { AdministrarActividadesCircuitoDataView } from '../../shared/data-models/administrar-actividades-circuitos-data-view';
import { ActividadCircuitoCommand, ModificarActividadCircuitoCommand, CrearActividadCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/actividad-circuito-command';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { ActividadCircuitoDataView, ResultadoActividadCircuitoDataView } from '../../shared/data-models/actividad-circuito-data-view';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { FiltroAdministrarActividadesCircuitoComponent } from './filtro-administrar-actividades-circuito/filtro-administrar-actividades-circuito.component';
import { DetalleAdministrarActividadesCircuitoComponent } from './detalle-administrar-actividades-circuito/detalle-administrar-actividades-circuito.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { takeUntil } from 'rxjs/operators';
import { AdministrarActividadesCircuitoService } from './administrar-actividades-circuito.service';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-administrar-actividades-circuito',
  templateUrl: './administrar-actividades-circuito.component.html',
  styleUrls: ['./administrar-actividades-circuito.component.css']
})
export class AdministrarActividadesCircuitoComponent extends
  AdministrableFormComponent<AdministrarActividadesCircuitoDataView[],
                             ActividadCircuitoCommand,
                             CrearActividadCircuitoCommand,
                             ModificarActividadCircuitoCommand,
                             ActividadCircuitoDataView> {

  Permission = Permission;

  @ViewChild('detalle') detalle: DetalleAdministrarActividadesCircuitoComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarActividadesCircuitoComponent;

  constructor(service: AdministrarActividadesCircuitoService,
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
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarActividadesCircuitosConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarActividadesCircuitosAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarActividadesCircuitosModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarActividadesCircuitosEliminar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarActividadesCircuitosExportarAExcel;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        circuito: '',
        actividad: '',
        estadoInicial: '',
        estadoFinal: '',
        habilitado: ''
      }),
      detalle: this.fb.group({
        circuito: [{value: '', disabled: false}, Validators.required],
        estadoInicial: [{value: '', disabled: false}, Validators.required],
        actividad: [{value: '', disabled: false}, Validators.required],
        habilitado: [{value: '', disabled: false}, Validators.required],
        resultados: this.fb.array([])
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
        name: Resources.Labels.Circuito,
        prop: 'circuito'
      },
      {
        name: Resources.Labels.EstadoInicial,
        prop: 'estadoInicial'
      },
      {
        name: Resources.Labels.Actividad,
        prop: 'actividad'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      },
    ];
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: ActividadCircuitoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.circuito', data.circuito, {onlySelf: true}, true);
    this.fcService.setValue('detalle.estadoInicial', data.estadoInicial, {onlySelf: true}, true);
    this.fcService.setValue('detalle.actividad', data.actividad, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
    this.detalle.setearResultados(data.resultados, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.circuito', 'circuito');
    this.subscribeToFilterControlChanges('filtros.actividad', 'actividad');
    this.subscribeToFilterControlChanges('filtros.estadoInicial', 'estadoInicial');
    this.subscribeToFilterControlChanges('filtros.estadoFinal', 'estadoFinal');
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

  mapControlsToCommand(): ActividadCircuitoCommand {
    const command = new ActividadCircuitoCommand();
    command.idCircuito = this.fcService.getValue('detalle.circuito');
    command.idEstadoInicial = this.fcService.getValue('detalle.estadoInicial');
    command.idActividad = this.fcService.getValue('detalle.actividad');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    this.mapResultadosToCommand(command);
    return command;
  }

  private mapResultadosToCommand(command: ActividadCircuitoCommand) {
    command.resultados = [];
    this.fcService.getValue('detalle.resultados').forEach((resultado: ResultadoActividadCircuitoDataView) => {
      command.resultados.push({
        id: resultado.id,
        habilitado: resultado.habilitado,
        idEstadoFinal: resultado.estadoFinal ? resultado.estadoFinal.id : null,
        idResultado: resultado.resultado.id
      });
    });
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.ActividadCircuito);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.ActividadCircuito);
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
    this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
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

  private clickExcelExport(dataGrid: any) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Actividades de Circuitos', ['Actividades de Circuitos']);
  }

}
