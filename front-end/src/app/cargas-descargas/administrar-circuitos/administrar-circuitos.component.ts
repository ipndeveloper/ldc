import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrarCircuitosDataView } from '../../shared/data-models/administrar-circuitos-data-view';
import { Permission, OpcionesSiNo, TablasTransporte } from '../../shared/enums/enums';
import { DetalleAdministrarCircuitosComponent } from './detalle-administrar-circuitos/detalle-administrar-circuitos.component';
import { FiltroAdministrarCircuitosComponent } from './filtro-administrar-circuitos/filtro-administrar-circuitos.component';
import { AdministrarCircuitoService } from './administrar-circuito.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';
import { CircuitoCommand, ModificarCircuitoCommand, CrearCircuitoCommand, MotivoErrorBalanzaCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/circuito-command';
import { CircuitoDataView } from '../../shared/data-models/circuito-data-view';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-circuitos',
  templateUrl: './administrar-circuitos.component.html',
  styleUrls: ['./administrar-circuitos.component.css']
})

export class AdministrarCircuitosComponent extends
  AdministrableFormComponent<Array<AdministrarCircuitosDataView>,
                             CircuitoCommand,
                             CrearCircuitoCommand,
                             ModificarCircuitoCommand,
                             CircuitoDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarCircuitosComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarCircuitosComponent;

  Permission = Permission;
  idTablaTransporte = TablasTransporte.Circuito;

  constructor(private readonly administrarCircuitosService: AdministrarCircuitoService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(administrarCircuitosService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Copiar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarCircuitosConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarCircuitosAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarCircuitosModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarCircuitosExportarAExcel;
    this.permisosBotones[BotonesEnum.Copiar] = Permission.AdministrarCircuitosCopiar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarCircuitosEliminar;
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
    this.detalle.clearCheckboxLists();
  }

  mapControlsToCommand(): CircuitoCommand {
    const command = new CircuitoCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idTipoTransporte = this.fcService.getValue('detalle.tipoTransporte');
    command.idTipoProducto = this.fcService.getValue('detalle.tipoProducto');
    command.idTipoMovimiento = this.fcService.getValue('detalle.tipoMovimiento');
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.idsFinalidades = this.fcService.getValue('detalle.finalidades');
    this.mapMotivosErrorBalanzaEntradaToCommand(command);
    this.mapMotivosErrorBalanzaSalidaToCommand(command);
    command.idCircuitoReferencia = this.ObtenerIdCircuitoReferencia();
    return command;
  }

  private mapMotivosErrorBalanzaEntradaToCommand(command: CircuitoCommand) {
    const idsMotivosEntradaSeleccionados = this.fcService.getValue('detalle.motivosErrorBalanzaEntrada') as number[];
    const motivosEntradaCommand: MotivoErrorBalanzaCircuitoCommand[] = [];
    this.detalle.motivosErrorBalanzaEntrada.forEach((motivo: EntityWithDescription) => {
      if (idsMotivosEntradaSeleccionados.some((id: number) => id === motivo.id)) {
        motivosEntradaCommand.push({
          id: motivo.id,
          habilitado: true
        });
      } else {
        motivosEntradaCommand.push({
          id: motivo.id,
          habilitado: false
        });
      }
    });
    command.motivosErrorBalanzaEntrada = motivosEntradaCommand;
  }

  private mapMotivosErrorBalanzaSalidaToCommand(command: CircuitoCommand) {
    const idsMotivosSalidaSeleccionados = this.fcService.getValue('detalle.motivosErrorBalanzaSalida') as number[];
    const motivosSalidaCommand: MotivoErrorBalanzaCircuitoCommand[] = [];
    this.detalle.motivosErrorBalanzaSalida.forEach((motivo: EntityWithDescription) => {
      if (idsMotivosSalidaSeleccionados.some((id: number) => id === motivo.id)) {
        motivosSalidaCommand.push({
          id: motivo.id,
          habilitado: true
        });
      } else {
        motivosSalidaCommand.push({
          id: motivo.id,
          habilitado: false
        });
      }
    });
    command.motivosErrorBalanzaSalida = motivosSalidaCommand;
  }

  private ObtenerIdCircuitoReferencia(): number {
    return this.esCopia ? this.fcService.getValue('detalle.idCircuitoReferencia') : null;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.tipoMovimiento', 'tipoMovimiento');
    this.subscribeToFilterControlChanges('filtros.tipoTransporte', 'tipoTransporte');
    this.subscribeToFilterControlChanges('filtros.tipoProducto', 'tipoProducto');
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

  fillControlsWithData(data: CircuitoDataView, isView: boolean) {
    this.fcService.setValue('detalle.nombre', data.nombre, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, true && !this.esCopia);
    this.fcService.setValue('detalle.tipoMovimiento', data.tipoMovimiento, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoTransporte', data.tipoTransporte, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoProducto', data.tipoProducto, { onlySelf: true }, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, { onlySelf: true }, isView && !this.esCopia);
    this.fcService.setValue('detalle.idCircuitoReferencia', data.id, { onlySelf: true }, true);

    this.detalle.setFinalidades(data.finalidades);
    this.detalle.setMotivosEntrada(data.motivosErrorBalanzaEntrada);
    this.detalle.setMotivosSalida(data.motivosErrorBalanzaSalida);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: { value: '', disabled: false },
        tipoMovimiento: { value: '', disabled: false },
        tipoTransporte: { value: '', disabled: false },
        tipoProducto: { value: '', disabled: false },
        habilitado: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: false }, Validators.required],
        tipoMovimiento: [{ value: '', disabled: false }, Validators.required],
        tipoTransporte: [{ value: '', disabled: false }, Validators.required],
        tipoProducto: [{ value: '', disabled: false }, Validators.required],
        nombre: [{ value: '', disabled: false }, Validators.required],
        habilitado: [{ value: false, disabled: false }],
        finalidades: [{ value: [], disabled: false }],
        motivosErrorBalanzaEntrada: [{ value: [], disabled: false }],
        motivosErrorBalanzaSalida: [{ value: [], disabled: false }],
        idCircuitoReferencia: [{ value: '', disabled: true }]
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
        prop: 'terminal',
        width: 70
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento',
        width: 40
      },
      {
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte',
        width: 50
      },
      {
        name: Resources.Labels.TipoProducto,
        prop: 'tipoProducto',
        width: 50
      },
      {
        name: Resources.Labels.Nombre,
        prop: 'nombre',
        width: 300
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado',
        width: 40
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
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true }, true);
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Circuitos', ['Circuitos']);
  }

  protected saveNewItem(command: CrearCircuitoCommand) {
    const messageLabel = this.esCopia ? Resources.Labels.Copiar
                                      : Resources.Labels.Agregar;

    const action = this.esCopia ? this.administrarCircuitosService.copy(command)
                                : this.administrarCircuitosService.create(command);

    this.runAction(action, this.getCreateSuccessMessage(), messageLabel);
  }
}
