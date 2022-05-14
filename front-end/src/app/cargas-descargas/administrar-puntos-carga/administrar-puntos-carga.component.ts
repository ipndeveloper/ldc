import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { DetalleAdministrarPuntosCargaComponent } from './detalle-administrar-puntos-carga/detalle-administrar-puntos-carga.component';
import { FiltroAdministrarPuntosCargaComponent } from './filtro-administrar-puntos-carga/filtro-administrar-puntos-carga.component';
import { AdministrarPuntosCargadataView } from '../../shared/data-models/administrar-puntos-carga-data-view';
import { PuntoCargaCommand, CrearPuntoCargaCommand, ModificarPuntoCargaCommand } from '../../shared/data-models/commands/cargas-descargas/punto-carga-command';
import { PuntoCarga } from '../../shared/data-models/punto-carga';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { AdministrarPuntosCargaService } from './administrar-puntos-carga.service';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-administrar-puntos-carga',
  templateUrl: './administrar-puntos-carga.component.html',
  styleUrls: ['./administrar-puntos-carga.component.css']
})
export class AdministrarPuntosCargaComponent
                                  extends AdministrableFormComponent<AdministrarPuntosCargadataView[],
                                                                      PuntoCargaCommand,
                                                                      CrearPuntoCargaCommand,
                                                                      ModificarPuntoCargaCommand,
                                                                      PuntoCarga> implements OnInit, OnDestroy {
@ViewChild('detalle') detalle: DetalleAdministrarPuntosCargaComponent;
@ViewChild('filtro') filtro: FiltroAdministrarPuntosCargaComponent;

constructor(service: AdministrarPuntosCargaService,
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

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarPuntosCargaConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarPuntosCargaAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarPuntosCargaModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarPuntosCargaExportarAExcel;
}

public init() {
  super.init();
  this.setearValoresPorDefecto();
}

ngOnDestroy(): void {
  this.onDestroy.next();
  this.onDestroy.unsubscribe();
}

createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: false }],
        habilitado: [{ value: '', disabled: false }, Validators.required],
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: true }, Validators.required],
        puntoCarga: [{ value: '', disabled: true }, Validators.required],
        capacidadMaxima: [{value: '', disabled: true}, Validators.required],
        habilitado: [{ value: '', disabled: true }, Validators.required],
      })
    });
   this.fcService.initialize(this.form);
}

private setearValoresPorDefecto() {
  this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
}

public setGridColumns(): void {
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
      name: Resources.Labels.PuntoCarga,
      prop: 'puntoCarga'
    },
    {
      name: Resources.Labels.CapacidadMaxima,
      prop: 'capacidadMaxima'
    },
    {
      name: Resources.Labels.Habilitado,
      prop: 'habilitado'
    }
  ];
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
  this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Puntos de Carga', ['Puntos de carga']);
}

protected clickAdd() {
  super.clickAdd();
  this.prepareForm();
}

private prepareForm() {
  this.fcService.disableControl('detalle.habilitado');
  this.fcService.setValue('detalle.habilitado', true, {onlySelf: true});
}

public setFocusFiltro(): void {
  setTimeout(() => {this.filtro.setFocus(); }, 0);
}

public setFocusDetalle(): void {
  setTimeout(() => {this.detalle.setFocus(); }, 0);
}

public fillControlsWithData(data: PuntoCarga, isView: boolean): void {
  this.fcService.setValue('detalle.puntoCarga', data.descripcion, {onlySelf: true}, isView);
  this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
  this.fcService.setValue('detalle.capacidadMaxima', data.capacidadMaxima, {onlySelf: true});
  this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
}

public clearForm(): void {
  this.form.reset();
}

public subscribeFilterChanges(): void {
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

mapControlsToCommand(): PuntoCargaCommand {
    const command = new PuntoCargaCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.descripcion =  this.fcService.getValue('detalle.puntoCarga');
    command.habilitado =  this.fcService.getValue('detalle.habilitado');
    command.capacidadMaxima = this.fcService.getValue('detalle.capacidadMaxima');

    return command;
}

getCreateSuccessMessage(): string {
  return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.PuntoCarga);
}

getUpdateSuccessMessage(): string {
  return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.PuntoCarga);
}

}
