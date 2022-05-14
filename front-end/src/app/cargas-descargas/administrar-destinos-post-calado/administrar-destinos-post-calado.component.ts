import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { DetalleAdministrarDestinosPostCaladoComponent } from './detalle-administrar-destinos-post-calado/detalle-administrar-destinos-post-calado.component';
import { FiltroAdministrarDestinosPostCaladoComponent } from './filtro-administrar-destinos-post-calado/filtro-administrar-destinos-post-calado.component';
import { AdministrarDestinoPostCaladoDataView } from '../../shared/data-models/administrar-destinos-post-calado-data-view';
import { DestinoPostCaladoCommand, CrearDestinoPostCaladoCommand, ModificarDestinoPostCaladoCommand } from '../../shared/data-models/commands/cargas-descargas/destino-post-calado-command';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { DestinoPostCaladoDataView } from '../../shared/data-models/destino-post-calado-data-view';
import { AdministrarDestinosPostCaladoService } from './administrar-destinos-post-calado.service';

@Component({
  selector: 'yrd-administrar-destinos-post-calado',
  templateUrl: './administrar-destinos-post-calado.component.html',
  styleUrls: ['./administrar-destinos-post-calado.component.css']
})

export class AdministrarDestinosPostCaladoComponent extends
  AdministrableFormComponent<Array<AdministrarDestinoPostCaladoDataView>,
                             DestinoPostCaladoCommand,
                             CrearDestinoPostCaladoCommand,
                             ModificarDestinoPostCaladoCommand,
                             DestinoPostCaladoDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarDestinosPostCaladoComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarDestinosPostCaladoComponent;

  constructor(service: AdministrarDestinosPostCaladoService,
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

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarDestinosPostCaladoConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarDestinosPostCaladoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarDestinosPostCaladoModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarDestinosPostCaladoExportarAExcel;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.DestinoPostCalado);
  }
  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.DestinoPostCalado);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): DestinoPostCaladoCommand {
    const command = new DestinoPostCaladoCommand();
    command.id = this.fcService.getValue('detalle.id');
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.destino = this.fcService.getValue('detalle.destino');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    return command;
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

  fillControlsWithData(data: DestinoPostCaladoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.destino', data.destino, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: {value: '', disabled: false},
        habilitado: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        terminal: [{value: '', disabled: false}, Validators.required],
        destino: [{value: '', disabled: false}, Validators.required],
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
        prop: 'terminal'
      },
      {
        name: Resources.Labels.Destino,
        prop: 'destino'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
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
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Destinos Post Calado', ['Destinos Post Calado']);
  }
}
