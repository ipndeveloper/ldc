import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrarImpresorasDataView } from '../../shared/data-models/administrar-impresoras-data-view';
import { ImpresoraCommand, CrearImpresoraCommand, ModificarImpresoraCommand } from '../../shared/data-models/commands/cargas-descargas/impresora-command';
import { ImpresoraDataView } from '../../shared/data-models/impresora-data-view';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { FiltroAdministrarImpresorasComponent } from './filtro-administrar-impresoras/filtro-administrar-impresoras.component';
import { DetalleAdministrarImpresorasComponent } from './detalle-administrar-impresoras/detalle-administrar-impresoras.component';
import { AdministrarImpresoraService } from './administrar-impresora.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-impresoras',
  templateUrl: './administrar-impresoras.component.html',
  styleUrls: ['./administrar-impresoras.component.css']
})
export class AdministrarImpresorasComponent extends
  AdministrableFormComponent<Array<AdministrarImpresorasDataView>,
                             ImpresoraCommand,
                             CrearImpresoraCommand,
                             ModificarImpresoraCommand,
                             ImpresoraDataView> implements OnInit, OnDestroy {

  Permission = Permission;

  @ViewChild('detalle') detalle: DetalleAdministrarImpresorasComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarImpresorasComponent;

  constructor(service: AdministrarImpresoraService,
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

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarImpresorasConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarImpresorasAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarImpresorasModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarImpresorasExportarAExcel;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarImpresorasEliminar;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Impresora);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Impresora);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): ImpresoraCommand {
    const command = new ImpresoraCommand();
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.uncPath = this.fcService.getValue('detalle.uncPath');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.idsTipoReporte = this.fcService.getValue('detalle.tiposReporte');
    return command;
  }

  subscribeFilterChanges(): void {
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

  fillControlsWithData(data: ImpresoraDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.nombre', data.nombre, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.uncPath', data.uncPath, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        habilitado: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        nombre: [{value: '', disabled: false}, Validators.required],
        uncPath: [{value: '', disabled: false}, Validators.required],
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
        name: Resources.Labels.Nombre,
        prop: 'nombre',
        width: 200
      },
      {
        name: Resources.Labels.UncPath,
        prop: 'uncPath',
        width: 200
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado',
        width: 10
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
    this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.fcService.setValue('detalle.habilitado', true, {onlySelf: true}, true);
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid => this.clickExcelExport(dataGrid));
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Impresoras', ['Impresoras']);
  }
}

