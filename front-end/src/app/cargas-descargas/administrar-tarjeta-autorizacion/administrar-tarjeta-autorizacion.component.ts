import { Component, ViewChild, OnInit } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FiltroAdministrarTarjetaAutorizacionComponent } from './filtro-administrar-tarjeta-autorizacion/filtro-administrar-tarjeta-autorizacion.component';
import { DetalleAdministrarTarjetaAutorizacionComponent } from './detalle-administrar-tarjeta-autorizacion/detalle-administrar-tarjeta-autorizacion.component';
import { AdministrarTarjetaAutorizacionService } from './administrar-tarjeta-autorizacion.service';
import { AdministrarTarjetaAutorizacionDataView } from '../../shared/data-models/administrar-tarjeta-autorizacion-data-view';
import { TarjetaAutorizacionCommand, CrearTarjetaAutorizacionCommand, ModificarTarjetaAutorizacionCommand } from '../../shared/data-models/commands/cargas-descargas/tarjeta-autorizacion-command';
import { searchValidator } from '../../core/shared/super/search.validator';

@Component({
  selector: 'yrd-administrar-tarjeta-autorizacion',
  templateUrl: './administrar-tarjeta-autorizacion.component.html',
  styleUrls: ['./administrar-tarjeta-autorizacion.component.css']
})
export class AdministrarTarjetaAutorizacionComponent
     extends AdministrableFormComponent<AdministrarTarjetaAutorizacionDataView[],
                                        TarjetaAutorizacionCommand,
                                        CrearTarjetaAutorizacionCommand,
                                        ModificarTarjetaAutorizacionCommand,
                                        AdministrarTarjetaAutorizacionDataView>
  implements OnInit {

  @ViewChild('filtro') filtro: FiltroAdministrarTarjetaAutorizacionComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarTarjetaAutorizacionComponent;

  constructor(public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly service: AdministrarTarjetaAutorizacionService,
              protected readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService,
              private readonly fb: FormBuilder) {
    super(service, notificationActionsService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarTarjetasAutorizacionConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarTarjetasAutorizacionAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarTarjetasAutorizacionModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarTarjetasAutorizacionExportarAExcel;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarTarjetasAutorizacionEliminar;
  }

  protected init(): void {
    super.init();
    this.setearValoresPorDefectosFiltros();
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: { value: '', disabled: false },
        numero: { value: '', disabled: false },
        habilitada: { value: '', disabled: false },
        usuario: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: false }, Validators.required],
        tipoTarjeta: [{ value: '', disabled: true }],
        numero: [{ value: '', disabled: false }, Validators.required],
        habilitada: { value: '', disabled: true },
        usuario: [{ value: '', disabled: false }, [Validators.required, searchValidator()]],
      })
    });
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: AdministrarTarjetaAutorizacionDataView, isView: boolean): void {
    this.editId = data.id;
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoTarjeta', data.tipoTarjeta, { onlySelf: true }, true);
    this.fcService.setValue('detalle.numero', data.numero, { onlySelf: true }, true);
    this.fcService.setValue('detalle.habilitada', data.habilitada, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.usuario', data.usuario, { onlySelf: true }, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  protected subscribeToActionEventsAdministration(): void {
    super.subscribeToActionEventsAdministration();
    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.numero', 'numero');
    this.subscribeToFilterControlChanges('filtros.usuario', 'usuario');

    const habilitada = this.form.get('filtros.habilitada');
    if (habilitada) {
      habilitada.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if (value && value.id !== OpcionesSiNo.Todos) {
          return (this.filters['habilitada'] = value.id ? value.id === OpcionesSiNo.Si : null);
        } else {
          return (this.filters['habilitada'] = null);
        }
      });
    }
  }

  mapControlsToCommand(): TarjetaAutorizacionCommand {
    const command = new TarjetaAutorizacionCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.numero = this.fcService.getValue('detalle.numero');
    command.habilitada = this.fcService.getValue('detalle.habilitada');
    command.idUsuario = this.fcService.getValue('detalle.usuario');

    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Tarjeta);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Tarjeta);
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
        name: Resources.Labels.CodigoTarjeta,
        prop: 'numero'
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'usuario'
      },
      {
        name: Resources.Labels.Nombre,
        prop: 'nombre'
      },
      {
        name: Resources.Labels.Apellido,
        prop: 'apellido'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitada'
      }
    ];
  }

  protected clickAdd(): void {
    super.clickAdd();
    this.fcService.setValue('detalle.habilitada', true, { onlySelf: true }, true);
    this.fcService.disableControl('detalle.tipoTarjeta');
    this.fcService.disableControl('detalle.apellidoNombre');
    this.fcService.disableControl('detalle.habilitada');
  }

  protected clickEdit(row): void {
    super.clickEdit(row);
    this.fcService.disableControl('detalle.tipoTarjeta');
  }

  private clickExcelExport(dataGrid): void {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Tarjeta', ['Tarjetas']);
  }

  private setearValoresPorDefectosFiltros(): void {
    this.fcService.setValue('filtros.habilitada', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }
}
