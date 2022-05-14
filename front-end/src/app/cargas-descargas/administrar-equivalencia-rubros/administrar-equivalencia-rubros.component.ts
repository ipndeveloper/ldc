import { Component, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { DetalleAdministrarEquivalenciaRubrosComponent } from './detalle-administrar-equivalencia-rubros/detalle-administrar-equivalencia-rubros.component';
import { FiltroAdministrarEquivalenciaRubrosComponent } from './filtro-administrar-equivalencia-rubros/filtro-administrar-equivalencia-rubros.component';
import { AdministrarEquivalenciaRubrosService } from './administrar-equivalencia-rubros.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { EquivalenciaRubrosDataView } from '../../shared/data-models/equivalencia-rubros-data-view';
import { EquivalenciaRubrosCommand, CrearEquivalenciaRubrosCommand, ModificarEquivalenciaRubrosCommand } from '../../shared/data-models/commands/cargas-descargas/equivalencia-rubros-command';
import { AdministrarEquivalenciaRubrosDataView } from '../../shared/data-models/administrar-equivalencia-rubros-data-view';

@Component({
  selector: 'yrd-administrar-equivalencia-rubros',
  templateUrl: './administrar-equivalencia-rubros.component.html',
  styleUrls: ['./administrar-equivalencia-rubros.component.css']
})

export class AdministrarEquivalenciaRubrosComponent extends
  AdministrableFormComponent<Array<AdministrarEquivalenciaRubrosDataView>,
                             EquivalenciaRubrosCommand,
                             CrearEquivalenciaRubrosCommand,
                             ModificarEquivalenciaRubrosCommand,
                             EquivalenciaRubrosDataView> {

  @ViewChild('detalle') detalle: DetalleAdministrarEquivalenciaRubrosComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarEquivalenciaRubrosComponent;

  constructor(service: AdministrarEquivalenciaRubrosService,
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

  mapControlsToCommand(): EquivalenciaRubrosCommand {
    const command = new EquivalenciaRubrosCommand();
    command.id = this.fcService.getValue('detalle.id');
    command.idCamara = this.fcService.getValue('detalle.camara');
    command.idProducto = this.fcService.getValue('detalle.producto');
    command.idRubro = this.fcService.getValue('detalle.rubro');
    command.codigo = this.fcService.getValue('detalle.codigo');
    command.codigoTipo = this.fcService.getValue('detalle.codigoTipo');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtro.producto', 'producto');
    this.subscribeToFilterControlChanges('filtro.camara', 'camara');
    this.subscribeToFilterControlChanges('filtro.rubro', 'rubro');
    const habilitadoControl = this.form.get('filtro.habilitado');
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

  fillControlsWithData(data: EquivalenciaRubrosDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, true);
    this.fcService.setValue('detalle.camara', data.camara, {onlySelf: true}, true);
    this.fcService.setValue('detalle.rubro', data.rubro, {onlySelf: true}, true);
    this.fcService.setValue('detalle.producto', data.producto, {onlySelf: true}, true);
    this.fcService.setValue('detalle.codigo', data.codigo, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.codigoTipo', data.codigoTipo, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtro: this.fb.group({
        producto: {value: undefined, disabled: false},
        camara: {value: '', disabled: false},
        rubro: {value: '', disabled: false},
        habilitado: {value: true, disabled: false}
      }),
      detalle: this.fb.group({
        camara: [{value: '', disabled: false}, Validators.required],
        producto: [{value: undefined, disabled: false}, Validators.required],
        rubro: [{value: '', disabled: false}, Validators.required],
        codigo: [{value: null, disabled: false}, Validators.required],
        codigoTipo: [{value: null, disabled: false}, Validators.required],
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
        name: Resources.Labels.Camara,
        prop: 'camara'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Rubro,
        prop: 'rubro'
      },
      {
        name: Resources.Labels.CodigoTipo,
        prop: 'codigoTipo'
      },
      {
        name: Resources.Labels.Codigo,
        prop: 'codigo'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado'
      }
    ];
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectofiltro();
  }

  protected clickAdd() {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
  }

  private setearValoresPorDefectofiltro() {
    this.fcService.setValue('filtro.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
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
    this.excelExportService.exportDataGridAsExcel (
      [dataGrid],
      'Administrar equivalencia de los rubros a enviar a cámara',
      ['Equivalencia de los Rubros a enviar a cámara']
    );
  }
}
