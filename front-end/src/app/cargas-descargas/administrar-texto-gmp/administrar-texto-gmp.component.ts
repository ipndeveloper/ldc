import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarLeyendaGmpDataView } from '../../shared/data-models/administrar-leyenda-gmp-data-view';
import { CrearLeyendaGmpPorSociedadCommand, LeyendaGmpPorSociedadCommand, ModificarLeyendaGmpPorSociedadCommand } from '../../shared/data-models/commands/cargas-descargas/leyenda-gmp-por-sociedad-command';
import { LeyendaGmpDataView } from '../../shared/data-models/leyenda-gmp-data-view';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { AdministrarTextoGmpService } from './administrar-texto-gmp.service';
import { DetalleAdministrarTextoGmpComponent } from './detalle-administrar-texto-gmp/detalle-administrar-texto-gmp.component';
import { FiltroAdministrarTextoGmpComponent } from './filtro-administrar-texto-gmp/filtro-administrar-texto-gmp.component';
import { Collection } from '../../core/models/collection';

@Component({
  selector: 'yrd-administrar-texto-gmp',
  templateUrl: './administrar-texto-gmp.component.html',
  styleUrls: ['./administrar-texto-gmp.component.css']
})
export class AdministrarTextoGmpComponent
  extends AdministrableFormComponent<Array<AdministrarLeyendaGmpDataView>,
                                     LeyendaGmpPorSociedadCommand,
                                     CrearLeyendaGmpPorSociedadCommand,
                                     ModificarLeyendaGmpPorSociedadCommand,
                                     LeyendaGmpDataView> {

  @ViewChild('detalle') detalle: DetalleAdministrarTextoGmpComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarTextoGmpComponent;

  constructor(public readonly service: AdministrarTextoGmpService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              public readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarLeyendaGmpPorSociedadConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarLeyendaGmpPorSociedadAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarLeyendaGmpPorSociedadModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarLeyendaGmpPorSociedadExportarAExcel;
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: false }],
        sociedad: [{ value: '', disabled: false }],
        producto: [{ value: undefined, disabled: false }],
        habilitado: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: true }, Validators.required],
        sociedad: [{ value: '', disabled: true }, Validators.required],
        producto: [{ value: undefined, disabled: true }, Validators.required],
        habilitado: [{ value: true, disabled: false }],
        leyendaGmp: [{ value: '', disabled: true }, Validators.required]
      }),
    });
    this.fcService.initialize(this.form);
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
        name: Resources.Labels.Terminal,
        prop: 'terminal'
      },
      {
        name: Resources.Labels.Sociedad,
        prop: 'sociedad'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      },
    ];
  }

  setFocusDetalle(): void {
    if (this.editId !== 0) {
      setTimeout(() => { this.detalle.setFocusHabilitado(); }, 0);
    } else {
      setTimeout(() => { this.detalle.setFocusTerminal(); }, 0);
    }
  }

  fillControlsWithData(data: LeyendaGmpDataView, isView: boolean): void {
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.sociedad', data.sociedad, {onlySelf: true}, true);
    this.fcService.setValue('detalle.producto', data.producto, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.leyendaGmp', data.leyendaGmp, {onlySelf: true}, isView);
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.sociedad', 'sociedad');
    this.subscribeToFilterControlChanges('filtros.producto', 'producto');
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

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarLeyendaGmpPorSociedadCommand;
        command.id = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearLeyendaGmpPorSociedadCommand;
        this.saveNewItem(command);
      }
    }
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  protected clickAdd() {
    super.clickAdd();
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true }, false);
  }

  setFocusFiltro(): void {
    setTimeout(() => { this.filtro.setFocus(); }, 0);
  }

  mapControlsToCommand(): LeyendaGmpPorSociedadCommand {
    const command = new CrearLeyendaGmpPorSociedadCommand();
    command.id = this.editId;
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idSociedad = this.fcService.getValue('detalle.sociedad');
    command.idProducto = this.fcService.getValue('detalle.producto');
    command.leyendaGmp = this.fcService.getValue('detalle.leyendaGmp');
    command.habilitado = this.fcService.getValue('detalle.habilitado');

    return command;
  }

  public subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
    .pipe(takeUntil(this.onDestroy))
    .subscribe(rows =>
      this.clickExcelExport(rows)
    );
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Texto GMP', ['Texto GMP']);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Descripcion);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Descripcion);
  }
}
