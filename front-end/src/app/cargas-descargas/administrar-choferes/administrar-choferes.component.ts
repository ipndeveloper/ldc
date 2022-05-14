import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarChoferesDataView } from '../../shared/data-models/administrar-choferes-data-view';
import { ChoferCommand, CrearChoferCommand, ModificarChoferCommand } from '../../shared/data-models/commands/cargas-descargas/chofer-command';
import { ChoferDataView } from '../../shared/data-models/chofer-data-view';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { DetalleAdministrarChoferesComponent } from './detalle-administrar-choferes/detalle-administrar-choferes.component';
import { FiltroAdministrarChoferesComponent } from './filtro-administrar-choferes/filtro-administrar-choferes.component';
import { AdministrarChoferService } from './administrar-chofer.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-choferes',
  templateUrl: './administrar-choferes.component.html',
  styleUrls: ['./administrar-choferes.component.css']
})

export class AdministrarChoferesComponent extends
  AdministrableFormComponent<Array<AdministrarChoferesDataView>,
                             ChoferCommand,
                             CrearChoferCommand,
                             ModificarChoferCommand,
                             ChoferDataView> implements OnInit, OnDestroy {

  Permission = Permission;

  @ViewChild('detalle') detalle: DetalleAdministrarChoferesComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarChoferesComponent;
  cuilBuscador = '';

  constructor(service: AdministrarChoferService,
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

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarChoferesConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarChoferesAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarChoferesModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarChoferesExportarAExcel;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Chofer);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Chofer);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): ChoferCommand {
    const command = new ChoferCommand();
    command.cuil = this.fcService.getValue('detalle.cuil');
    this.cuilBuscador = command.cuil;
    command.razonSocial = this.fcService.getValue('detalle.apellidoYNombre');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.cuil', 'cuil');
    this.subscribeToFilterControlChanges('filtros.apellidoYNombre', 'apellidoYNombre');
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

  fillControlsWithData(data: ChoferDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.cuil', data.codigo, {onlySelf: true}, true);
    this.fcService.setValue('detalle.apellidoYNombre', data.descripcion, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        cuil: {value: '', disabled: false},
        apellidoYNombre: {value: '', disabled: false},
        habilitado: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        cuil: [{value: '', disabled: false}, Validators.required],
        apellidoYNombre: [{value: '', disabled: false}, Validators.required],
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
        name: Resources.Labels.Cuil,
        prop: 'cuil'
      },
      {
        name: Resources.Labels.ApellidoYNombre,
        prop: 'descripcion'
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

  protected search() {
    this.buscarPorCuil();
    super.search();
  }

  protected buscarPorCuil() {
    if (this.cuilBuscador) {
      this.fcService.setValue('filtros.cuil', this.cuilBuscador, {onlySelf: true});
      this.fcService.setValue('filtros.habilitado', null, {onlySelf: true});
      this.cuilBuscador = '';
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Choferes', ['Choferes']);
  }
}

