import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { AdministrarNotificacionesDataView } from '../../shared/data-models/administrar-notificaciones-data-view';
import { MailTemplateService } from './mail-template.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Subject } from 'rxjs';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { DetalleAdministrarNotificacionesComponent } from './detalle-administrar-notificaciones/detalle-administrar-notificaciones.component';
import { Collection } from '../../core/models/collection';
import { ModificarMailTemplateCommand, MailTemplateCommand, CrearMailTemplateCommand, DestinatarioCommand } from '../../shared/data-models/commands/cargas-descargas/mail-template-command';
import { MailTemplateDataView } from '../../shared/data-models/mail-template-data-view';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarNotificacionesComponent } from './filtro-administrar-notificaciones/filtro-administrar-notificaciones.component';
import { Permission } from '../../shared/enums/enums';

@Component({
  selector: 'yrd-administrar-notificaciones',
  templateUrl: './administrar-notificaciones.component.html',
  styleUrls: ['./administrar-notificaciones.component.css']
})
export class AdministrarNotificacionesComponent
     extends SearchFormComponent<Array<AdministrarNotificacionesDataView>>
  implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarNotificacionesComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarNotificacionesComponent;
  private readonly onDestroy = new Subject();
  readonly Permission = Permission;
  editId: number;
  disableButtons = true;
  selectedRow: any;
  esConsulta = false;

  constructor(public readonly service: MailTemplateService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly excelService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarNotificacionesConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarNotificacionesAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarNotificacionesModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarNotificacionesExportarAExcel;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarNotificacionesEliminar;
  }

  ngOnInit(): void {
    this.init();
    this.subscribeToActionEventsPrivate();
  }

  private init(): void {
    this.filters = new Dictionary<string>();
    this.createForm();
    this.setDisabledGroup(true, 'detalle');
    this.setDisabledGroup(false, 'filtros');
    this.setGridColumns();
    this.subscribeFilterChanges();
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  private createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: {value: '', disabled: false},
        tipoNotificacion: {value: '', disabled: false},
        usuario: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        terminal: [{value: '', disabled: false}, Validators.required],
        tipoNotificacion: [{value: '', disabled: false}, Validators.required],
        motivo: [{value: '', disabled: false}],
        estado: [{value: '', disabled: false}],
        asunto: [{value: '', disabled: false}, Validators.required],
        cuerpo: [{value: '', disabled: false}, Validators.required],
        variableTemplate: {value: [], disabled: false},
        datosDestinatarios: this.fb.group({
          datosModalDestinatario: this.fb.group({
            idTipo: {value: '', disabled: false},
            rol: {value: '', disabled: false},
            usuario: {value: '', disabled: false},
            mail: {value: '', disabled: false},
          }),
          destinatarios: this.fb.array([])
        })
      })
    });

    this.fcService.initialize(this.form);
  }

  private setGridColumns(): void {
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
        name: Resources.Labels.Notificacion,
        prop: 'tipoNotificacion'
      },
      {
        name: Resources.Labels.Motivo,
        prop: 'motivo'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      },
      {
        name: Resources.Labels.Subject,
        prop: 'asunto'
      },
    ];
  }

  private subscribeToActionEventsPrivate(): void {
    this.notificationActionsService.clickSearch
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickSearch());

    this.notificationActionsService.clickAdd
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickAdd());

    this.notificationActionsService.clickDelete
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickDelete(row));

    this.notificationActionsService.clickEdit
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickEdit(row));

    this.notificationActionsService.clickView
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickView(row));

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());
  }

  public clickClear(): void {
    this.form.reset({emitEvent: true});
    this.selectedRow = null;
    this.init();
  }

  private clickExcelExport(data): void {
    this.excelService.exportDataGridAsExcel([data], 'Administrar Notificaciones', ['Administrar Notificaciones']);
  }

  private clickDelete(row: any) {
    if (row) {
      this.service.eliminar(+row.id).subscribe(() => { this.search(); });
    }
  }

  private clickAdd(): void {
    this.disableButtons = false;
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(true, 'filtros');
    this.esConsulta = false;
    this.editId = 0;
    this.detalle.setFocus();
  }

  private setDisabledGroup(disabled: boolean, groupName: string): void {
    const formGroup = this.form.get(groupName);
    if (formGroup) {
      if (disabled) {
        formGroup.disable(({ onlySelf: true, emitEvent: false }));
      } else {
        formGroup.enable(({ onlySelf: true, emitEvent: false }));
      }
    }
  }

  private clickSelectedRow(row: any): void {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  public onClickCancelar(): void {
    this.cancelar();
  }

  private cancelar(): void {
    this.disableButtons = true;
    this.clearForm();
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(false, 'filtros');
    this.editId = 0;
    this.filtro.setFocus();
  }

  private clearForm(): void {
    this.form.controls.detalle.reset();
    this.limpiarGrillaDestinatarios();
  }

  limpiarGrillaDestinatarios(): void {
    const control = this.fcService.getControl('detalle.datosDestinatarios.destinatarios');
    if (control) {
      const faControl = control as FormArray;
      while (faControl.length !== 0) {
        faControl.removeAt(0);
      }
    }
    this.detalle.refreshGrid();
  }

  onClickAceptar(): void {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    const destinatarios = this.fcService.getValue('detalle.datosDestinatarios.destinatarios') as any[];
    const validDestinatarios = destinatarios && ((destinatarios.length > 0 && !this.detalle.disableActionsDatos)
                                                 || this.detalle.disableActionsDatos);
    if (!validDestinatarios) {
      this.popupService.error(Resources.Messages.DebeIngresarAlMenosUnDestinatario);
    }

    if (this.fcService.isValidForm() && validDestinatarios) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarMailTemplateCommand;
        command.id = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearMailTemplateCommand;
        this.saveNewItem(command);
      }
    }
  }

  private mapControlsToCommand(): MailTemplateCommand {
    const command = new MailTemplateCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idTipoNotificacion = this.fcService.getValue('detalle.tipoNotificacion');
    command.idMotivo = this.fcService.getValue('detalle.motivo');
    command.idEstado = this.fcService.getValue('detalle.estado');
    command.asunto = this.fcService.getValue('detalle.asunto');
    command.cuerpo = this.fcService.getValue('detalle.cuerpo');
    command.destinatarios = this.mapDestinatariosToCommand();

    return command;
  }

  private mapDestinatariosToCommand(): DestinatarioCommand[] {
    const result: DestinatarioCommand[] = [];

    const destinatarios = this.form.getRawValue().detalle.datosDestinatarios.destinatarios as any[];
    if (destinatarios) {
      destinatarios.forEach(dest => {
        result.push({
          id: dest.id,
          idTipo: dest.idTipo,
          idRol: dest.rol ? dest.rol.id : undefined,
          idUsuario: dest.usuario ? dest.usuario.id : undefined,
          mail: dest.mail
        });
      });
    }

    return result;
  }

  private saveNewItem(command: CrearMailTemplateCommand): void {
    this.service.crear(command)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.cancelar();
        this.popupService.success(Resources.Messages.LaNuevaNotificacionFueAgregadaConExito, Resources.Labels.Agregar);
        this.notificationActionsService.onRefreshGrid();
        this.setDisabledGroup(false, 'filtros');
        this.filtro.setFocus();
      });
  }

  private saveEditItem(command: ModificarMailTemplateCommand): void {
    this.service.modificar(command)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.cancelar();
        this.popupService.success(Resources.Messages.LaEdicionDeLaNotificacionFueGuardadaConExito, Resources.Labels.Modificar);
        this.notificationActionsService.onRefreshGrid();
        this.setDisabledGroup(false, 'filtros');
        this.filtro.setFocus();
      });
  }

  private clickSearch(): void {
    this.selectedRow = null;
    this.editId = 0;
  }

  private subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.tipoNotificacion', 'tipoNotificacion');
    this.subscribeToFilterControlChanges('filtros.usuario', 'usuario');
  }

  private subscribeToFilterControlChanges(token: string, keyDict: string): void {
    const filterControl = this.form.get(token);
    if (filterControl) {
      filterControl.valueChanges.subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  private clickEdit(row): void {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, true));
    }
  }

  private clickView(row): void {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, false));
    }
  }

  private fillControls(data: MailTemplateDataView, edit: boolean): void {
    this.disableButtons = false;
    this.setDisabledGroup(true, 'filtros');
    if (edit) {
      this.setDisabledGroup(this.disableButtons, 'detalle');
      this.esConsulta = false;
      this.editId = data.id;
      this.detalle.setFocus();
    } else {
      this.setDisabledGroup(true, 'detalle');
      this.esConsulta = true;
      this.editId = 0;
    }

    this.fcService.setValue('detalle.id', data.id, {onlySelf: true});
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.tipoNotificacion', data.tipoNotificacion, {onlySelf: true}, true);
    this.fcService.setValue('detalle.motivo', data.motivo, {onlySelf: true}, true);
    this.fcService.setValue('detalle.estado', data.estado, {onlySelf: true}, true);
    this.fcService.setValue('detalle.asunto', data.asunto, {onlySelf: true});
    this.fcService.setValue('detalle.cuerpo', data.cuerpo, {onlySelf: true});
    this.detalle.setDestinatarios(data.destinatarios);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }
}
