import { Component, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarPenalizacionesChoferDataView } from '../../shared/data-models/administrar-penalizaciones-choferes-data-view';
import { PenalizacionChoferCommand, CrearPenalizacionChoferCommand, ModificarPenalizacionChoferCommand } from '../../shared/data-models/commands/cargas-descargas/penalizacion-chofer-command';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { PenalizacionChoferDataView } from '../../shared/data-models/Penalizacion-Chofer-Data-View';
import { DetalleAdministrarPenalizacionChoferesComponent } from './detalle-administrar-penalizacion-choferes/detalle-administrar-penalizacion-choferes.component';
import { FiltroAdministrarPenalizacionChoferesComponent } from './filtro-administrar-penalizacion-choferes/filtro-administrar-penalizacion-choferes.component';
import { catchError, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/session/auth.service';
import { Terminal } from '../../shared/data-models/terminal';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { AdministrarPenalizacionChoferesService } from './administrar-penalizacion-choferes.service';

@Component({
  selector: 'yrd-administrar-penalizacion-choferes',
  templateUrl: './administrar-penalizacion-choferes.component.html',
  styleUrls: ['./administrar-penalizacion-choferes.component.css']
})
export class AdministrarPenalizacionChoferesComponent extends AdministrableFormComponent<Array<AdministrarPenalizacionesChoferDataView>,
                                                                                          PenalizacionChoferCommand,
                                                                                          CrearPenalizacionChoferCommand,
                                                                                          ModificarPenalizacionChoferCommand,
                                                                                          PenalizacionChoferDataView> {
  @ViewChild('detalle') detalle: DetalleAdministrarPenalizacionChoferesComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarPenalizacionChoferesComponent;
  terminal: Terminal;
  constructor(public readonly service: AdministrarPenalizacionChoferesService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              public readonly fcService: FormComponentService,
              private readonly authService: AuthService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarPenalizacionChoferesConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarPenalizacionChoferesAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarPenalizacionChoferesModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarPenalizacionChoferesExportarAExcel;

    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
    this.fcService.setValue('filtros.vigente', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
    .pipe( takeUntil(this.onDestroy))
    .subscribe(rows =>
      this.clickExcelExport(rows)
    );

  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        chofer: { value: '', disabled: false },
        apellidoYNombre: { value: '', disabled: false },
        habilitado: { value: '', disabled: false },
        vigente: { value: '', disabled: false },
      }),
      detalle: this.fb.group({
        chofer: [{ value: '', disabled: false }, Validators.required],
        responsablePenalizacion: [{ value: '', disabled: false }, Validators.required],
        motivoSancion: [{ value: '', disabled: false }, Validators.required],
        fechaDesde: [{ value: '', disabled: false }, Validators.required],
        fechaHasta: [{ value: '', disabled: false }, Validators.required],
        habilitado: [{ value: true, disabled: false }, Validators.required],
        responsableLevantamiento: { value: '', disabled: false }
      })
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
        name: Resources.Labels.Fecha,
        prop: 'fechaDesde'
      },
      {
        name: Resources.Labels.Cuil,
        prop: 'cuil'
      },
      {
        name: Resources.Labels.ApellidoYNombre,
        prop: 'apellidoYNombre'
      },
      {
        name: Resources.Labels.MotivoSancion,
        prop: 'motivoSancion'
      },
      {
        name: Resources.Labels.Responsable,
        prop: 'responsablePenalizacion'
      },
      {
        name: Resources.Labels.Terminal,
        prop: 'terminal'
      },
      {
        name: Resources.Labels.FechaExpiracion,
        prop: 'fechaExpiracion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      },
      {
        name: Resources.Labels.FechaLevanto,
        prop: 'fechaLevanto'
      },
      {
        name: Resources.Labels.Responsable,
        prop: 'responsableLevantamiento'
      }
    ];
  }

  clickAdd() {
    super.clickAdd();
    this.disableControls();
    this.setDefaultValueControlHabilitado();
  }

  clickView(row: any) {
    this.esConsulta = true;
    super.clickView(row);
  }

  onClickAceptar() {
    const fechaDesde = this.fcService.getValue('detalle.fechaDesde');
    const fechaHasta = this.fcService.getValue('detalle.fechaHasta');

    if (this.ValidarFechaDesdeHasta(fechaDesde, fechaHasta)) {
      super.onClickAceptar();
    }
  }

  protected clickEdit(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.get(+row.id)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe((data: PenalizacionChoferDataView) => {
          if (this.verificarTerminal(data)) {
            this.fillControls(data, false);
          } else {
            this.popupService.error(Resources.Messages.NoSePuedeModificarUnaPenalizacionDadaDeAltaEnOtraTerminal);
          }
          this.isLoading = false;
        });
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Caracteristicas', ['Caracteristicas']);
  }

  private verificarTerminal(data: PenalizacionChoferDataView) {
    return data.terminal === this.terminal.id;
  }

  private setDefaultValueControlHabilitado(): void {
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true });
  }

  private disableControls(): void {
    this.fcService.disableControl('detalle.habilitado');
    this.fcService.disableControl('detalle.responsableLevantamiento');
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: PenalizacionChoferDataView, isView: boolean): void {
    this.editId = data.id;
    this.fcService.setValue('detalle.chofer', data.chofer, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.responsablePenalizacion', data.responsablePenalizacion, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.motivoSancion', data.motivoSancion, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.fechaDesde', data.fechaDesde, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.fechaHasta', data.fechaHasta, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.responsableLevantamiento', data.responsableLevantamiento, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, { onlySelf: true }, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.chofer', 'chofer');
    this.subscribeToFilterControlChanges('filtros.apellidoYNombre', 'apellidoYNombre');
    this.subscribeToFilterControlChanges('filtros.cuil', 'cuil');
    this.subscribeToBooleanControlChanges('filtros.habilitado', 'habilitado');
    this.subscribeToBooleanControlChanges('filtros.vigente', 'vigente');
  }

  private subscribeToBooleanControlChanges(token: string, keyDict: string) {
    const control = this.form.get(token);
    if (control) {
      control.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters[keyDict] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters[keyDict] = null;
        }
      });
    }
  }

  mapControlsToCommand(): PenalizacionChoferCommand {
    const command = new PenalizacionChoferCommand();
    command.IdChofer = Number(this.fcService.getValue('detalle.chofer'));
    command.IdResponsablePenalizacion = Number(this.fcService.getValue('detalle.responsablePenalizacion'));
    command.FechaDesde = String(this.fcService.getValue('detalle.fechaDesde'));
    command.FechaHasta = String(this.fcService.getValue('detalle.fechaHasta'));
    command.MotivoSancion = String(this.fcService.getValue('detalle.motivoSancion'));
    command.IdResponsableLevantamiento = Number(this.fcService.getValue('detalle.responsableLevantamiento'));
    command.Habilitado = this.fcService.getValue('detalle.habilitado');

    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Penalizacion);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Penalizacion);
  }

}
