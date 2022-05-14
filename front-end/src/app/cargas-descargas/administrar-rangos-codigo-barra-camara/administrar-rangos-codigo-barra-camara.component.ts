import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { DetalleAdministrarRangosCodigoBarraCamaraComponent } from './detalle-administrar-rangos-codigo-barra-camara/detalle-administrar-rangos-codigo-barra-camara.component';
import { FiltroAdministrarRangosCodigoBarraCamaraComponent } from './filtro-administrar-rangos-codigo-barra-camara/filtro-administrar-rangos-codigo-barra-camara.component';
import { AdministrarRangosCodigoBarraCamaraService } from './administrar-rangos-codigo-barra-camara.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { RangosCodigoBarraCamaraCommand, CrearRangosCodigoBarraCamaraCommand, ModificarRangosCodigoBarraCamaraCommand } from '../../shared/data-models/commands/cargas-descargas/rangos-codigo-barra-camara-command';
import { AdministrarRangosCodigoBarraCamaraDataView } from '../../shared/data-models/administrar-rangos-codigo-barra-camara-data-view';
import { numberLessThan, dateLessThan } from './administrar-rangos-codigo-barra-camara.validator';

@Component({
  selector: 'yrd-administrar-rangos-codigo-barra-camara',
  templateUrl: './administrar-rangos-codigo-barra-camara.component.html',
  styleUrls: ['./administrar-rangos-codigo-barra-camara.component.css']
})
export class AdministrarRangosCodigoBarraCamaraComponent extends
  AdministrableFormComponent<AdministrarRangosCodigoBarraCamaraDataView[],
                             RangosCodigoBarraCamaraCommand,
                             CrearRangosCodigoBarraCamaraCommand,
                             ModificarRangosCodigoBarraCamaraCommand,
                             AdministrarRangosCodigoBarraCamaraDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarRangosCodigoBarraCamaraComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarRangosCodigoBarraCamaraComponent;

  constructor(service: AdministrarRangosCodigoBarraCamaraService,
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

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarRangosCodigoBarraCamaraConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarRangosCodigoBarraCamaraAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarRangosCodigoBarraCamaraModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarRangosCodigoBarraCamaraExportarAExcel;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Circuito);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Circuito);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): RangosCodigoBarraCamaraCommand {
    const command = new RangosCodigoBarraCamaraCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.fechaDesde = this.fcService.getValue('detalle.fechas.fechaDesde');
    command.fechaHasta = this.fcService.getValue('detalle.fechas.fechaHasta');
    command.codigoBarrasMinimo = this.fcService.getValue('detalle.codigos.codigoDesde');
    command.codigoBarrasMaximo = this.fcService.getValue('detalle.codigos.codigoHasta');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
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
  }

  fillControlsWithData(data: AdministrarRangosCodigoBarraCamaraDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.fechas.fechaDesde', data.fechaDesde, {onlySelf: true}, true);
    this.fcService.setValue('detalle.fechas.fechaHasta', data.fechaHasta, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.codigos.codigoDesde', data.codigoBarrasMinimo, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.codigos.codigoHasta', data.codigoBarrasMaximo, {onlySelf: true}, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: {value: '', disabled: false},
        vigente: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        terminal: [{value: '', disabled: false}, Validators.required],
        fechas: this.fb.group({
          fechaDesde: [{value: '', disabled: false}, Validators.required],
          fechaHasta: [{value: '', disabled: false}, Validators.required],
        }, { validator: dateLessThan('fechaDesde', 'fechaHasta') }),
        codigos: this.fb.group({
          codigoDesde: [{value: '', disabled: false}, Validators.required],
          codigoHasta: [{value: '', disabled: false}, Validators.required],
        }, { validator: numberLessThan('codigoDesde', 'codigoHasta') })
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
        prop: 'terminal.descripcion'
      },
      {
        name: Resources.Labels.FechaDesde,
        prop: 'fechaDesde'
      },
      {
        name: Resources.Labels.FechaHasta,
        prop: 'fechaHasta'
      },
      {
        name: Resources.Labels.CodigoDesde,
        prop: 'codigoBarrasMinimo'
      },
      {
        name: Resources.Labels.CodigoHasta,
        prop: 'codigoBarrasMaximo'
      }
    ];
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.vigente', {id: OpcionesSiNo.Si}, {onlySelf: true});
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Rangos de Código de Barras de Cámara', ['Rangos']);
  }
}
