import { Component, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { RestriccionPorPuestoTrabajoCommand, CrearRestriccionPorPuestoTrabajoCommand, ModificarRestriccionPorPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/restriccion-por-puesto-trabajo-command';
import { AdministrarRestriccionesPorPuestoTrabajoDataView } from '../../shared/data-models/administrar-restricciones-por-puesto-trabajo-data-view';
import { FormBuilder, Validators } from '@angular/forms';
import { AdministrarRestriccionesPorPuestoTrabajoService } from './administrar-restricciones-por-puesto-trabajo.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../locale/artifacts/resources';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { takeUntil } from 'rxjs/operators';
import { Dictionary } from '../../core/models/dictionary';
import { DetalleAdministrarRestriccionesPorPuestoTrabajoComponent } from './detalle-administrar-restricciones-por-puesto-trabajo/detalle-administrar-restricciones-por-puesto-trabajo.component';
import { FiltroAdministrarRestriccionesPorPuestoTrabajoComponent } from './filtro-administrar-restricciones-por-puesto-trabajo/filtro-administrar-restricciones-por-puesto-trabajo.component';
import { PuestoTrabajo } from '../../shared/data-models/puesto-trabajo';
import { Permission } from '../../shared/enums/enums';

@Component({
  selector: 'yrd-administrar-restricciones-por-puesto-trabajo',
  templateUrl: './administrar-restricciones-por-puesto-trabajo.component.html',
  styleUrls: ['./administrar-restricciones-por-puesto-trabajo.component.css']
})
export class AdministrarRestriccionesPorPuestoTrabajoComponent
     extends AdministrableFormComponent<AdministrarRestriccionesPorPuestoTrabajoDataView[],
                                        RestriccionPorPuestoTrabajoCommand,
                                        CrearRestriccionPorPuestoTrabajoCommand,
                                        ModificarRestriccionPorPuestoTrabajoCommand,
                                        AdministrarRestriccionesPorPuestoTrabajoDataView> {

  @ViewChild('detalleAdministrarRestricciones') detalleAdministrarRestricciones: DetalleAdministrarRestriccionesPorPuestoTrabajoComponent;
  @ViewChild('filtroAdministrarRestricciones') filtroAdministrarRestricciones: FiltroAdministrarRestriccionesPorPuestoTrabajoComponent;
  command: RestriccionPorPuestoTrabajoCommand;
  esModificacion: boolean;
  deleteCommandDictionary: Dictionary<string>;
  puestoTrabajoList: PuestoTrabajo[];
  Permission = Permission;

  constructor(public readonly service: AdministrarRestriccionesPorPuestoTrabajoService,
              public readonly notificacionService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              public readonly fcService: FormComponentService,
              private readonly fb: FormBuilder) {
    super(service, notificacionService, popupService, fcService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarRestriccionesPorPuestoTrabajoConsultar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarRestriccionesPorPuestoTrabajoModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarRestriccionesPorPuestoTrabajoEliminar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarRestriccionesPorPuestoTrabajoAgregar;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        permiso: { value: '' },
        terminal: { value: '' },
        puestoTrabajo: { value: '', disabled: true }
      }),
      detalle: this.fb.group({
        permiso: ['', Validators.required],
        terminal: ['', Validators.required],
        puestoTrabajo: [{ value: '', disabled: true }, Validators.required],
      })
    });
    this.fcService.initialize(this.form);
  }

  protected init() {
    super.init();
    this.subscribeCambioTerminal();
  }

  private subscribeCambioTerminal() {
    setTimeout(() => {
      if (this.filtroAdministrarRestricciones && this.detalleAdministrarRestricciones) {
        this.filtroAdministrarRestricciones.subscribeCambioTerminal();
        this.detalleAdministrarRestricciones.subscribeCambioTerminal();
      }
    }, 0);
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
        prop: 'terminal.descripcion'

      },
      {
        name: Resources.Labels.PuestoTrabajo,
        prop: 'puestoTrabajo.descripcion'
      },
      {
        name: Resources.Labels.Permiso,
        prop: 'permiso.descripcion'
      }
    ];
  }

  public subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();
    this.notificationActionsService.clickDelete
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickRemove(row)
      );
  }

  public clickRemove(row) {
    if (row) {
      this.deleteCommandDictionary = new Dictionary<string>();
      this.deleteCommandDictionary['IdPermiso'] = row.permiso.id;
      this.deleteCommandDictionary['IdPuestoTrabajo'] = row.puestoTrabajo.id;
      this.runAction(this.service.deleteComplexId(this.deleteCommandDictionary),
        this.getDeleteSuccessMessage(),
        Resources.Labels.Eliminar);
    }
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtroAdministrarRestricciones.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalleAdministrarRestricciones.setFocus(), 0);
  }

  fillControlsWithData(data: AdministrarRestriccionesPorPuestoTrabajoDataView, isView: boolean): void {
    this.setDataPuestoTrabajo(data);
    this.editId = data.puestoTrabajo.id;
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.permiso', data.permiso, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.puestoTrabajo', data.puestoTrabajo, { onlySelf: true }, isView);

  }

  private setDataPuestoTrabajo(data: AdministrarRestriccionesPorPuestoTrabajoDataView) {
    this.puestoTrabajoList = [];
    this.puestoTrabajoList.push(data.puestoTrabajo);
    this.detalleAdministrarRestricciones.setPuestosTrabajo(this.puestoTrabajoList);
  }

  cancelar() {
    super.cancelar();
    this.esModificacion = false;
    this.fcService.disableControl('filtros.puestoTrabajo');
  }

  clearForm(): void {
    this.form.reset();
  }

  public clickView(row: any) {
    this.esModificacion = false;
    this.esConsulta = true;
    this.loadPermisoPorPuesto(row, true);
  }

  public clickEdit(row: any) {
    this.esModificacion = true;
    this.esConsulta = false;
    this.loadPermisoPorPuesto(row, false);
  }

  private disableControls(): void {
    this.fcService.disableControl('detalle.puestoTrabajo');
    this.fcService.disableControl('detalle.terminal');
  }

  private loadPermisoPorPuesto(row: any, esConsulta: boolean): void {
    if (row) {
      this.service.getPermisoPorPuesto(+row.puestoTrabajo.id, +row.permiso.id)
        .subscribe((data: AdministrarRestriccionesPorPuestoTrabajoDataView[]) => {
          this.fillControls(data[0], esConsulta);
          if (!this.esConsulta) {
            this.disableControls();
          }
        });
    }
  }

  subscribeFilterChanges(): void {
    const permiso = this.form.get('filtros.permiso');
    const terminal = this.form.get('filtros.terminal');
    const puestoTrabajo = this.form.get('filtros.puestoTrabajo');

    if (permiso && terminal && puestoTrabajo) {
      permiso.valueChanges.subscribe((value) => {
        this.filters['permiso'] = value;
      });
      terminal.valueChanges.subscribe((value) => {
        this.filters['terminal'] = value;
      });
      puestoTrabajo.valueChanges.subscribe((value) => {
        this.filters['puestoTrabajo'] = value;
      });
    }
  }

  mapControlsToCommand(): RestriccionPorPuestoTrabajoCommand {

    if (this.esModificacion) {
      const command = new ModificarRestriccionPorPuestoTrabajoCommand();
      command.IdPuestoTrabajo = this.fcService.getValue('detalle.puestoTrabajo');
      command.IdPermiso = this.selectedRow[0].permiso.id;
      command.IdNuevoPermiso = this.fcService.getValue('detalle.permiso');
      return command;
    } else {
      const command = new CrearRestriccionPorPuestoTrabajoCommand();
      command.IdPuestoTrabajo = this.fcService.getValue('detalle.puestoTrabajo');
      command.IdPermiso = this.fcService.getValue('detalle.permiso');
      return command;
    }
  }
  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Permiso);
  }
  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Permiso);
  }
  getDeleteSuccessMessage(): string {
    return Resources.Messages.ElXFueEliminadoConExito.format(Resources.Labels.Permiso);
  }
}
