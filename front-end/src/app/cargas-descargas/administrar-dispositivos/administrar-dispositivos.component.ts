import { Component, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarDispositivosDataView } from '../../shared/data-models/administrar-dispositivos-data-view';
import { DispositivoCommand, CrearDispositivoCommand, ModificarDispositivoCommand } from '../../shared/data-models/commands/cargas-descargas/dispositivo-command';
import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { Permission, OpcionesSiNo, TiposDispositivo } from '../../shared/enums/enums';
import { DetalleAdministrarDispositivosComponent } from './detalle-administrar-dispositivos/detalle-administrar-dispositivos.component';
import { FiltroAdministrarDispositivosComponent } from './filtro-administrar-dispositivos/filtro-administrar-dispositivos.component';
import { AdministrarDispositivoService } from './administrar-dispositivo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-dispositivos',
  templateUrl: './administrar-dispositivos.component.html',
  styleUrls: ['./administrar-dispositivos.component.css']
})

export class AdministrarDispositivosComponent
     extends AdministrableFormComponent<Array<AdministrarDispositivosDataView>,
                                        DispositivoCommand,
                                        CrearDispositivoCommand,
                                        ModificarDispositivoCommand,
                                        DispositivoDataView> {
  habilitaBalancero: boolean;
  @ViewChild('detalle') detalle: DetalleAdministrarDispositivosComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarDispositivosComponent;

  constructor(protected readonly service: AdministrarDispositivoService,
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
    this.botonesHabilitados[BotonesEnum.Copiar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarDispositivosConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarDispositivosAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarDispositivosModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarDispositivosExportarAExcel;
    this.permisosBotones[BotonesEnum.Copiar] = Permission.AdministrarDispositivosCopiar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarDispositivosEliminar;
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
    this.suscribeCambiosTipoDispositivo();
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Dispositivo);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Dispositivo);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  mapControlsToCommand(): DispositivoCommand {
    const command = new DispositivoCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idTipoDispositivo = this.fcService.getValue('detalle.tipoDispositivo');
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.numeroSerie = this.fcService.getValue('detalle.numeroSerie');
    command.pathArchestra = this.fcService.getValue('detalle.pathArchestra');
    command.idSentidoBalanza = this.fcService.getValue('detalle.sentidoBalanza');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.sinBalancero = this.fcService.getValue('detalle.sinBalancero');

    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.tipoDispositivo', 'tipoDispositivo');
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

  fillControlsWithData(data: DispositivoDataView, isView: boolean) {
    this.fcService.setValue('detalle.id', data.id, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, isView || !this.esCopia);
    this.fcService.setValue('detalle.nombre', data.nombre, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.sentidoBalanza', data.sentidoBalanza, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoDispositivo', data.tipoDispositivo, { onlySelf: true }, isView  || !this.esCopia);
    this.fcService.setValue('detalle.numeroSerie', data.numeroSerie, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.pathArchestra', data.pathArchestra, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.sinBalancero', data.sinBalancero, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.habilitado', data.estaActivo, { onlySelf: true }, isView);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: false }],
        habilitado: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: false }, Validators.required],
        nombre: [{ value: '', disabled: false }, Validators.required],
        tipoDispositivo: [{ value: '', disabled: false }, Validators.required],
        numeroSerie: [{ value: '', disabled: false }],
        pathArchestra: [{ value: '', disabled: false }],
        sentidoBalanza: [{ value: '', disabled: true }],
        sinBalancero: [{value: '', disabled: false}],
        habilitado: [{ value: '', disabled: false }]
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
        name: Resources.Labels.Terminal,
        prop: 'terminal'
      },
      {
        name: Resources.Labels.TipoDispositivo,
        prop: 'tipoDispositivo'
      },
      {
        name: Resources.Labels.Nombre,
        prop: 'nombre'
      },
      {
        name: Resources.Labels.SinBalancero,
        prop: 'sinBalancero'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      }
    ];
  }

  suscribeCambiosTipoDispositivo() {
    const tipoDipsositivo = this.form.get('detalle.tipoDispositivo');
    const sentidoBalanza = this.form.get('detalle.sentidoBalanza');
    const sinBalancero = this.form.get('detalle.sinBalancero');

    if (tipoDipsositivo) {
      tipoDipsositivo.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
        if (sentidoBalanza) {
          if (value && value.id === TiposDispositivo.BalanzaCamion) {
            if (!this.esConsulta) {
              sentidoBalanza.enable();
              sentidoBalanza.setValidators(Validators.required);
            }
          } else {
            sentidoBalanza.setValue('');
            sentidoBalanza.clearValidators();
            sentidoBalanza.disable();
          }
          sentidoBalanza.updateValueAndValidity();
        }
        if (sinBalancero) {
          if (value && (value.id === TiposDispositivo.BalanzaCamion ||
              value.id === TiposDispositivo.BalanzaVagon1 ||
              value.id === TiposDispositivo.BalanzaVagon2) && !this.esConsulta) {
                sinBalancero.enable();
                this.habilitaBalancero = true;
          } else {
                this.habilitaBalancero = false;
          }
            this.habilitaBalancero = true;
            sinBalancero.updateValueAndValidity();
          }
      });
    }
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
    this.fcService.setValue('detalle.sentidoBalanza', '', { onlySelf: true }, true);
    this.fcService.setValue('detalle.sinBalancero', false, { onlySelf: true }, true);
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Dispositivos', ['Dispositivos']);
  }
}

