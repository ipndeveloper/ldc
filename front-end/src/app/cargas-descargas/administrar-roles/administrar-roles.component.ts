import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { Rol } from '../../shared/data-models/rol';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarRolesService } from './administrar-roles.service';
import { OpcionesSiNo, Permission, TablasTransporte } from '../../shared/enums/enums';
import { Resources } from '../../../locale/artifacts/resources';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { DetalleAdministrarRolesComponent } from './detalle-administrar-roles/detalle-administrar-roles.component';
import { FiltroAdministrarRolesComponent } from './filtro-administrar-roles/filtro-administrar-roles.component';
import { Collection } from '../../core/models/collection';
import { Dictionary } from '../../core/models/dictionary';
import { AdministrarRolessDataView as AdministrarRolesDataView } from '../../shared/data-models/administrar-roles-data-view';
import { RolCommand, CrearRolCommand, ModificarRolCommand } from '../../shared/data-models/commands/cargas-descargas/rol-command';

@Component({
  selector: 'yrd-administrar-roles',
  templateUrl: './administrar-roles.component.html',
  styleUrls: ['./administrar-roles.component.css']
})
export class AdministrarRolesComponent extends
  SearchFormComponent<Array<Rol>> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarRolesComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarRolesComponent;

  private readonly onDestroy = new Subject();
  form: FormGroup;
  esConsulta = false;
  editId: number;
  disableButtons = true;
  selectedRow: any;
  idTablaTransporte = TablasTransporte.Rol;
  Permission = Permission;

  constructor(public readonly service: AdministrarRolesService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService) {
    super(service, searchFormActionsNotifierService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarRolesConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarRolesAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarRolesModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarRolesEliminar;
  }

  ngOnInit() {
    this.init();
    this.subscribeToActionEventsPrivate();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private init() {
    this.filters = new Dictionary<string>();
    this.createForm();
    this.subscribeFilterChanges();
    this.setearValoresPorDefecto();
    this.setGridColumns();
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        descripcion: {value: '', disabled: false},
        habilitado: {value: '', disabled: false}
      }),
      detalle: this.fb.group({
        descripcion: [{value: '', disabled: false}, Validators.required],
        habilitado: [{value: '', disabled: false}, Validators.required],
        permisos: [{value: '', disabled: false}],
      })
    });

    this.fcService.initialize(this.form);
  }

  private setearValoresPorDefecto() {
    this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
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
        name: Resources.Labels.Descripcion,
        prop: 'descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado'
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
  }

  public clickClear() {
    this.form.reset({emitEvent: true});
    this.selectedRow = null;
    this.init();
  }

  private clickAdd() {
    this.disableButtons = false;
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(true, 'filtros');

    this.fcService.setValue('detalle.habilitado', true, {onlySelf: true}, true);

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
    this.detalle.clearPermisos();
  }

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarRolCommand;
        command.id = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearRolCommand;
        this.saveNewItem(command);
      }
    }
  }

  private mapControlsToCommand(): RolCommand {

    const command = new RolCommand();
    command.descripcion = this.fcService.getValue('detalle.descripcion');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.permisos = this.fcService.getValue('detalle.permisos');

    return command;
  }

  private saveNewItem(command: CrearRolCommand) {
    this.runAction(this.service.crear(command),
                   Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Rol),
                   Resources.Labels.Agregar);
  }

  private saveEditItem(command: ModificarRolCommand) {
    this.runAction(this.service.modificar(command),
                   Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Rol),
                   Resources.Labels.Modificar);
  }

  private runAction(action: Observable<void>, messageSuccess: string, titleSuccess: string): void {
    action.pipe(takeUntil(this.onDestroy))
          .subscribe(() => {
            this.cancelar();
            this.popupService.success(messageSuccess, titleSuccess);
            this.notificationActionsService.onRefreshGrid();
            this.setDisabledGroup(false, 'filtros');
            this.filtro.setFocus();
          });
  }

  private clickSearch() {
    this.selectedRow = null;
    this.editId = 0;
  }

  private subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.descripcion', 'descripcion');
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
      this.service.eliminar(+row.id).subscribe(() => { this.search(); });
    }
  }

  private clickView(row: any) {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, false));
    }
  }

  private fillControls(data: AdministrarRolesDataView, edit: boolean) {
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
    this.fcService.setValue('detalle.descripcion', data.descripcion, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, this.esConsulta);
    this.detalle.setPermisos(data.permisos);
  }

}
