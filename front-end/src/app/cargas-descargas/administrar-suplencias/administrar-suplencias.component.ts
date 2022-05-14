import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarSuplenciasDataView } from '../../shared/data-models/administrar-suplencias-data-view';
import { SuplenciaCommand, CrearSuplenciaCommand, ModificarSuplenciaCommand } from '../../shared/data-models/commands/cargas-descargas/suplencia-command';
import { SuplenciaDataView } from '../../shared/data-models/suplencia-data-view';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { DetalleAdministrarSuplenciasComponent } from './detalle-administrar-suplencias/detalle-administrar-suplencias.component';
import { FiltroAdministrarSuplenciasComponent } from './filtro-administrar-suplencias/filtro-administrar-suplencias.component';
import { AdministrarSuplenciasService } from './administrar-suplencias.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-suplencias',
  templateUrl: './administrar-suplencias.component.html',
  styleUrls: ['./administrar-suplencias.component.css']
})
export class AdministrarSuplenciasComponent extends
  AdministrableFormComponent<Array<AdministrarSuplenciasDataView>,
                             SuplenciaCommand,
                             CrearSuplenciaCommand,
                             ModificarSuplenciaCommand,
                             SuplenciaDataView> implements OnInit, OnDestroy {

  Permission = Permission;

  @ViewChild('detalle') detalle: DetalleAdministrarSuplenciasComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarSuplenciasComponent;

  constructor(service: AdministrarSuplenciasService,
              searchFormActionsNotifierService: SearchFormActionsNotifierService,
              popupService: PopupService,
              fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService
              ) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarSuplenciasConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarSuplenciasAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarSuplenciasModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarSuplenciasExportarAExcel;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Suplencia);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Suplencia);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        usuarioOrigen: {value: '', disabled: false},
        usuarioDestino: {value: '', disabled: false},
        fechaDesde: {value: '', disabled: false},
        fechaHasta: {value: '', disabled: false},
        estaHabilitado: {value: '', disabled: false},
        vigente: {value: '', disabled: false},
      }),
      detalle: this.fb.group({
        usuarioOrigen: [{value: '', disabled: false}, Validators.required],
        usuarioDestino: [{value: '', disabled: false}, Validators.required],
        fechaDesde: [{value: '', disabled: false}, Validators.required],
        fechaHasta: [{value: '', disabled: false}, Validators.required],
        estaHabilitado: [{value: '', disabled: false}, Validators.required],
      })
    });
  }

  mapControlsToCommand(): SuplenciaCommand {
    const command = new SuplenciaCommand();
    command.idUsuarioOrigen = this.fcService.getValue('detalle.usuarioOrigen');
    command.idUsuarioDestino = this.fcService.getValue('detalle.usuarioDestino');
    command.fechaDesde = this.fcService.getValue('detalle.fechaDesde');
    command.fechaHasta = this.fcService.getValue('detalle.fechaHasta');
    command.estaHabilitado = this.fcService.getValue('detalle.estaHabilitado');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.usuarioOrigen', 'usuarioOrigen');
    this.subscribeToFilterControlChanges('filtros.usuarioDestino', 'usuarioDestino');
    this.subscribeToFilterControlChanges('filtros.fechaDesde', 'fechaDesde');
    this.subscribeToFilterControlChanges('filtros.fechaHasta', 'fechaHasta');

    const vigenteControl = this.form.get('filtros.vigente');
    if (vigenteControl) {
      vigenteControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['vigente'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['vigente'] = null;
        }
      });
    }

    const estaHabilitadoControl = this.form.get('filtros.estaHabilitado');
    if (estaHabilitadoControl) {
      estaHabilitadoControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['estaHabilitado'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['estaHabilitado'] = null;
        }
      });
    }
  }

  private fechaVigente(data: SuplenciaDataView): boolean {
    const fechaHoy = new Date(Date.now()).toLocalISOString();
    if (fechaHoy >= data.fechaDesde.toLocaleString() && fechaHoy <= data.fechaHasta.toLocaleString() ) {
        return true;
    }
    return false;
  }


  fillControlsWithData(data: SuplenciaDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, true);
    this.fcService.setValue('detalle.usuarioOrigen', data.usuarioOrigen, {onlySelf: true}, true);
    this.fcService.setValue('detalle.usuarioDestino', data.usuarioDestino, {onlySelf: true}, true);
    this.fcService.setValue('detalle.fechaDesde', data.fechaDesde, {onlySelf: true}, isView || this.fechaVigente(data));
    this.fcService.setValue('detalle.fechaHasta', data.fechaHasta, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.estaHabilitado', data.estaHabilitado, {onlySelf: true}, isView);
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
        name: Resources.Labels.UsuarioCreacion,
        prop: 'usuarioCreacion',
      },
      {
        name: Resources.Labels.UsuarioOrigen,
        prop: 'usuarioOrigen',
      },
      {
        name: Resources.Labels.UsuarioDestino,
        prop: 'usuarioDestino',
      },
      {
        name: Resources.Labels.FechaDesde,
        prop: 'fechaDesde',
      },
      {
        name: Resources.Labels.FechaHasta,
        prop: 'fechaHasta',
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado',
        width: 40
      },
    ];
  }

  protected init() {
    super.init();
    setTimeout(() => this.setearValoresPorDefectoFiltros(), 0);
  }

  protected clickAdd() {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.estaHabilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
    this.fcService.setValue('filtros.vigente', {id: OpcionesSiNo.Si}, {onlySelf: true});
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.fcService.setValue('detalle.estaHabilitado', true, {onlySelf: true}, true);
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Suplencias', ['Suplencias']);
  }

}
