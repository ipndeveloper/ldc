import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo } from '../../shared/enums/enums';
import { DetalleAdministrarPuestosDeTrabajoComponent } from './detalle-administrar-puestos-de-trabajo/detalle-administrar-puestos-de-trabajo.component';
import { FiltroAdministrarPuestosDeTrabajoComponent } from './filtro-administrar-puestos-de-trabajo/filtro-administrar-puestos-de-trabajo.component';
import { Subject, Observable } from 'rxjs';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil, catchError } from 'rxjs/operators';
import { Collection } from '../../core/models/collection';
import { AccionPuestoTrabajoDataView, DispositivoPuestoTrabajoDataView, PuestoTrabajoDataView } from '../../shared/data-models/puesto-trabajo-data-view';
import { ModificarPuestoTrabajoCommand, CrearPuestoTrabajoCommand, PuestoTrabajoCommand, AccionPuestoTrabajoCommand, DispositivoPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/puesto-trabajo-command';
import { AdministrarPuestoTrabajoDataView } from '../../shared/data-models/administrar-puestos-de-trabajo-data-view';
import { AdministrarPuestoDeTrabajoService } from './administrar-puesto-de-trabajo.service';
import { ExcelService } from '../../core/services/excelService/excel.service';

@Component({
  selector: 'yrd-administrar-puestos-de-trabajo',
  templateUrl: './administrar-puestos-de-trabajo.component.html',
  styleUrls: ['./administrar-puestos-de-trabajo.component.css']
})

export class AdministrarPuestosDeTrabajoComponent
     extends SearchFormComponent<Array<AdministrarPuestoTrabajoDataView>>
  implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarPuestosDeTrabajoComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarPuestosDeTrabajoComponent;

  readonly Permission = Permission;
  private readonly onDestroy = new Subject();
  editId: number;
  disableButtons = true;
  selectedRow: any;
  esConsulta = false;
  isLoading = false;

  constructor(public readonly service: AdministrarPuestoDeTrabajoService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarPuestosTrabajoConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarPuestosTrabajoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarPuestosTrabajoModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarPuestosTrabajoExportarAExcel;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarPuestosTrabajoEliminar;
  }

  ngOnInit() {
    this.init();
    this.subscribeToActionEventsPrivate();
  }

  private init() {
    this.filters = new Dictionary<string>();
    this.createForm();
    this.setGridColumns();
    this.subscribeFilterChanges();
    this.setearValoresPorDefecto();
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  private setearValoresPorDefecto() {
    this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: {value: '', disabled: false},
        tipoPuestoTrabajo: {value: '', disabled: false},
        habilitado: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        terminal: [{value: '', disabled: false}, Validators.required],
        tipoPuestoTrabajo: [{value: '', disabled: false}, Validators.required],
        nombre: [{value: '', disabled: false}, Validators.required],
        direccionIP: [{value: '', disabled: false}, Validators.required],
        habilitado: {value: false, disabled: false},
        utilizaTarjeta: {value: false, disabled: false},
        accionesPuestoTrabajo: this.fb.array([]),
        dispositivosPuestoTrabajo: this.fb.array([]),
        datosModalAccionPuestoTrabajo: this.fb.group({
          id: {value: '', disabled: false},
          accion: {value: '', disabled: false},
          automatico: {value: '', disabled: false},
          habilitado: {value: '', disabled: false},
        }),
        datosModalDispositivoPuestoTrabajo: this.fb.group({
          id: {value: '', disabled: false},
          tipoDispositivo: {value: '', disabled: false},
          dispositivo: {value: '', disabled: false},
          habilitado: {value: '', disabled: false},
        })
      })
    });

    this.fcService.initialize(this.form);
  }

  private setGridColumns() {
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
        name: Resources.Labels.TipoPuesto,
        prop: 'tipoPuestoTrabajo'
      },
      {
        name: Resources.Labels.Nombre,
        prop: 'nombre'
      },
      {
        name: Resources.Labels.DireccionIP,
        prop: 'direccionIP'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      },
    ];
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickSearch
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickSearch());

    this.notificationActionsService.clickAdd
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickAdd());

    this.notificationActionsService.clickEdit
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickEdit(row));

    this.notificationActionsService.clickDelete
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickDelete(row));

    this.notificationActionsService.clickView
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickView(row));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid => this.clickExcelExport(dataGrid));
  }

  private clickClear() {
    this.form.reset({emitEvent: true});
    this.selectedRow = null;
    this.init();
  }

  private clickAdd() {
    this.disableButtons = false;
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(true, 'filtros');
    this.setearValoresPorDefectoDetalle();
    this.esConsulta = false;
    this.editId = 0;
    this.detalle.setFocus();
  }

  private setearValoresPorDefectoDetalle() {
    this.fcService.setValue('detalle.habilitado', true, {onlySelf: true}, true);
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

  private clickSelectedRow(row: any) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  public onClickCancelar() {
    this.cancelar();
  }

  private cancelar() {
    this.disableButtons = true;
    this.clearForm();
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(false, 'filtros');
    this.editId = 0;
    this.filtro.setFocus();
  }

  private clearForm() {
    this.form.controls.detalle.reset();
    this.limpiarGrillaAccionesPuestoTrabajo();
    this.limpiarGrillaDispositivosPuestoTrabajo();
  }

  private limpiarGrillaAccionesPuestoTrabajo() {
    const control = this.fcService.getControl('detalle.accionesPuestoTrabajo');
    if (control) {
      const faControl = control as FormArray;
      while (faControl.length !== 0) {
        faControl.removeAt(0);
      }
    }
    this.detalle.refreshGridAcciones();
  }

  private limpiarGrillaDispositivosPuestoTrabajo() {
    const control = this.fcService.getControl('detalle.dispositivosPuestoTrabajo');
    if (control) {
      const faControl = control as FormArray;
      while (faControl.length !== 0) {
        faControl.removeAt(0);
      }
    }
    this.detalle.refreshGridDispositivos();
  }

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarPuestoTrabajoCommand;
        command.id = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearPuestoTrabajoCommand;
        this.saveNewItem(command);
      }
    }
  }

  private mapControlsToCommand(): PuestoTrabajoCommand {
    const command = new PuestoTrabajoCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.idTipoPuestoTrabajo = this.fcService.getValue('detalle.tipoPuestoTrabajo');
    command.direccionIP = this.fcService.getValue('detalle.direccionIP');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.utilizaTarjeta = this.fcService.getValue('detalle.utilizaTarjeta');
    command.accionesPuestoTrabajo = this.mapAccionesPuestoTrabajoToCommand();
    command.dispositivosPuestoTrabajo = this.mapDispositivosPuestoTrabajoToCommand();

    return command;
  }

  private mapAccionesPuestoTrabajoToCommand(): AccionPuestoTrabajoCommand[] {
    const result: AccionPuestoTrabajoCommand[] = [];

    const accionesPuestoTrabajo = this.form.getRawValue().detalle.accionesPuestoTrabajo as AccionPuestoTrabajoDataView[];
    if (accionesPuestoTrabajo) {
      accionesPuestoTrabajo.forEach(rt => {
        result.push({
          id: rt.id,
          idAccion: rt.accion.id,
          automatico: rt.automatico,
          habilitado: rt.habilitado
        });
      });
    }
    return result;
  }

  private mapDispositivosPuestoTrabajoToCommand(): DispositivoPuestoTrabajoCommand[] {
    const result: DispositivoPuestoTrabajoCommand[] = [];

    const dispositivosPuestoTrabajo = this.form.getRawValue().detalle.dispositivosPuestoTrabajo as DispositivoPuestoTrabajoDataView[];
    if (dispositivosPuestoTrabajo) {
      dispositivosPuestoTrabajo.forEach(rt => {
        result.push({
          id: rt.id,
          idTipoDispositivo: rt.tipoDispositivo.id,
          idDispositivo: rt.dispositivo.id,
          habilitado: rt.habilitado
        });
      });
    }
    return result;
  }

  private runAction(action: Observable<void>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    action.pipe(
        takeUntil(this.onDestroy),
        catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        })
      ).subscribe(() => {
        this.isLoading = false;
        this.cancelar();
        this.popupService.success(messageSuccess, titleSuccess);
        this.notificationActionsService.onRefreshGrid();
        this.setDisabledGroup(false, 'filtros');
        this.filtro.setFocus();
      });
  }

  private saveNewItem(command: CrearPuestoTrabajoCommand) {
    this.runAction(this.service.crear(command),
                   Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.PuestoTrabajo),
                   Resources.Labels.Agregar);
  }

  private saveEditItem(command: ModificarPuestoTrabajoCommand) {
    this.runAction(this.service.modificar(command),
                   Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.PuestoTrabajo),
                   Resources.Labels.Modificar);
  }

  private clickSearch() {
    this.selectedRow = null;
    this.editId = 0;
  }

  private subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.tipoPuestoTrabajo', 'tipoPuestoTrabajo');
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

  private subscribeToFilterControlChanges(token: string, keyDict: string): void {
    const filterControl = this.form.get(token);
    if (filterControl) {
      filterControl.valueChanges.subscribe((value: any) => {
        this.filters[keyDict] = value;
      });
    }
  }

  private clickEdit(row: any) {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, true));
    }
  }

  private clickDelete(row: any) {
    if (row) {
      this.service.eliminar(+row.id)
      .pipe(catchError(_ => this.filtro.setFocus()))
      .subscribe(() => {
        this.search();
        this.filtro.setFocus();
      });
    }
  }

  private clickView(row: any) {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, false));
    }
  }

  private fillControls(data: PuestoTrabajoDataView, edit: boolean) {
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
    this.fcService.setValue('detalle.nombre', data.nombre, {onlySelf: true});
    this.fcService.setValue('detalle.direccionIP', data.direccionIP, {onlySelf: true});
    this.fcService.setValue('detalle.tipoPuestoTrabajo', data.tipoPuestoTrabajo, {onlySelf: true});
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true});
    this.fcService.setValue('detalle.utilizaTarjeta', data.utilizaTarjeta, {onlySelf: true});
    this.detalle.setAccionesPuestoTrabajo(data.accionesPuestoTrabajo);
    this.detalle.setDispositivosPuestoTrabajo(data.dispositivosPuestoTrabajo);
  }

  private clickExcelExport(dataGrid: any) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Puestos de Trabajo', ['Puestos de Trabajo']);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }
}
