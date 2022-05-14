import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarEventoDataView } from '../../shared/data-models/adminstrar-evento-data-view';
import { CrearEventoCommand, EventoCommand, ModificarEventoCommand } from '../../shared/data-models/commands/cargas-descargas/evento-command';
import { EventoDataView } from '../../shared/data-models/evento-data-view';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { AdministrarEventoService } from './administrar-evento.service';
import { DetalleAdministrarEventosComponent } from './detalle-administrar-eventos/detalle-administrar-eventos.component';
import { FiltroAdministrarEventosComponent } from './filtro-administrar-eventos/filtro-administrar-eventos.component';

@Component({
  selector: 'yrd-administrar-eventos',
  templateUrl: './administrar-eventos.component.html',
  styleUrls: ['./administrar-eventos.component.css']
})
export class AdministrarEventosComponent
  extends AdministrableFormComponent<Array<AdministrarEventoDataView>,
                                        EventoCommand,
                                        CrearEventoCommand,
                                        ModificarEventoCommand,
                                        EventoDataView> {

  @ViewChild('detalle') detalle: DetalleAdministrarEventosComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarEventosComponent;

  constructor(protected readonly service: AdministrarEventoService,
              protected readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {

    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarEventosConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarEventosAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarEventosModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarEventosExportarAExcel;
    }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
    this.subscribeCheckNotificaArchestra();
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Evento);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Evento);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }
  mapControlsToCommand(): EventoCommand {
    const command = new EventoCommand();
    command.idTipoEvento = this.fcService.getValue('detalle.tipoEvento');
    command.requiereAccion = this.fcService.getValue('detalle.requiereAccion') === OpcionesSiNo.Si;
    command.mensajeArchestra = this.fcService.getValue('detalle.mensajeArchestra');
    command.mensajeDashboard = this.fcService.getValue('detalle.mensajeDashboard');
    command.enviaArchestra = this.fcService.getValue('detalle.enviaArchestra');
    command.enviaDashboard = this.fcService.getValue('detalle.enviaDashboard');
    command.enviaEmail = this.fcService.getValue('detalle.enviaEmail');

    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.tipoEvento', 'tipoEvento');
    this.subscribeToFilterControlChanges('filtros.mensajeDashboard', 'mensajeDashboard');
    const requiereAccionControl = this.form.get('filtros.requiereAccion');
    if (requiereAccionControl) {
      requiereAccionControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['requiereAccion'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['requiereAccion'] = null;
        }
      });
    }
  }

  fillControlsWithData(data: EventoDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.idTipoEvento', data.idTipoEvento, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.requiereAccion',
                            data.requiereAccion ? {id: OpcionesSiNo.Si} : {id: OpcionesSiNo.No}, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.tipoEvento', data.tipoEvento, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.mensajeDashboard', data.mensajeDashboard, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.mensajeArchestra', data.mensajeArchestra, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.enviaEmail', data.enviaEmail, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.enviaDashboard', data.enviaDashboard, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.enviaArchestra', data.enviaArchestra, { onlySelf: true }, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        tipoEvento: [{ value: '', disabled: false }],
        requiereAccion: [{ value: '', disabled: false }],
        mensajeDashboard: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        id: [{value: ''}],
        tipoEvento: [{ value: '', disabled: false }, Validators.required],
        accion: [{value: '', disabled: false}],
        requiereAccion: [{ value: '', disabled: false }],
        mensajeDashboard: [{ value: '', disabled: false }, Validators.required],
        mensajeArchestra: [{ value: '', disabled: false }],
        enviaDashboard: [{ value: '', disabled: false }],
        enviaArchestra: [{ value: '', disabled: true }],
        enviaEmail: [{value: '', disabled: true}]
      })
    });
  }
  public setGridColumns() {
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
        name: Resources.Labels.TipoEvento,
        prop: 'tipoEvento'
      },
      {
        name: Resources.Labels.RequiereAccion,
        prop: 'accion'
      },
      {
        name: Resources.Labels.MensajeDashboard,
        prop: 'mensajeDashboard'
      },
      {
        name: Resources.Labels.MensajeArchestra,
        prop: 'mensajeArchestra'
      },
      {
        name: Resources.Labels.Dashboard,
        prop: 'enviaDashboard'
      },
      {
        name: Resources.Labels.Archestra,
        prop: 'enviaArchestra'
      },
      {
        name: Resources.Labels.Correo,
        prop: 'enviaEmail'
      }
    ];
  }

  protected subscribeCheckNotificaArchestra() {
    const notificaArchestra = this.form.get('detalle.enviaArchestra');
    const mensajeArchestra = this.form.get('detalle.mensajeArchestra');

    if (notificaArchestra) {
      notificaArchestra.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
        if (mensajeArchestra) {
          if (value && value === true && !this.esConsulta) {
            mensajeArchestra.setValidators(Validators.required);
          } else {
          mensajeArchestra.setValidators(null);
          }
        mensajeArchestra.updateValueAndValidity();
        }
      });
    }
  }
  protected clickAdd() {
    super.clickAdd();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.requiereAccion', { id: OpcionesSiNo.Si }, { onlySelf: true });
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Eventos', ['Eventeos']);
  }
}
