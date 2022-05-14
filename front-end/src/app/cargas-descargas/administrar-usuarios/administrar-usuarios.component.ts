import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, OpcionesSiNo, TablasTransporte } from '../../shared/enums/enums';
import { FiltroAdministrarUsuariosComponent } from './filtro-administrar-usuarios/filtro-administrar-usuarios.component';
import { DetalleAdministrarUsuariosComponent } from './detalle-administrar-usuarios/detalle-administrar-usuarios.component';
import { AdministrarUsuariosDataView } from '../../shared/data-models/administrar-usuarios-data-view';
import { Subject, Observable } from 'rxjs';
import { AdministrarUsuarioService } from './administrar-usuario.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { takeUntil, catchError, distinctUntilChanged } from 'rxjs/operators';
import { CrearUsuarioCommand, UsuarioCommand, RolTerminalCommand, ModificarUsuarioCommand, ImpresoraCommand } from '../../shared/data-models/commands/cargas-descargas/usuario.command';
import { RolTerminalDataView, UsuarioDataView, ImpresoraUsuarioDataView, UsuarioADDataView } from '../../shared/data-models/usuario-data-view';

@Component({
  selector: 'yrd-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css']
})

export class AdministrarUsuariosComponent
     extends SearchFormComponent<Array<AdministrarUsuariosDataView>>
  implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarUsuariosComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarUsuariosComponent;

  private readonly onDestroy = new Subject();
  editId: number;
  disableButtons = true;
  selectedRow: any;
  esConsulta = false;
  isLoading = false;
  buscandoEnAD = false;
  Permission = Permission;
  esCopia = false;
  idTablaTransporte = TablasTransporte.Usuario;

  constructor(public readonly service: AdministrarUsuarioService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService) {
    super(service, searchFormActionsNotifierService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Copiar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarUsuariosConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarUsuariosAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarUsuariosModificar;
    this.permisosBotones[BotonesEnum.Copiar] = Permission.AdministrarUsuariosCopiar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarUsuariosEliminar;
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
    this.subscribeToNombreADValueChanges();
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  private subscribeToNombreADValueChanges() {
    const ctlNombreAD = this.form.get('detalle.nombreAD');
    if (ctlNombreAD) {
      ctlNombreAD.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
        .subscribe((nombreAD: string) => {
          if (!this.editId && !this.esConsulta) {
            if (nombreAD) {
              this.buscandoEnAD = true;
              this.service.buscarUsuarioEnActiveDirectory(nombreAD).subscribe((datos: UsuarioADDataView) => {
                if (datos) {
                  this.fcService.setValue('detalle.nombre', datos.nombre, { onlySelf: true });
                  this.fcService.setValue('detalle.apellido', datos.apellido, { onlySelf: true });
                  this.fcService.setValue('detalle.mail', datos.mail, { onlySelf: true });
                } else {
                  this.popupService.error(Resources.Messages.ElNombreDeADIngresadoNoCorrespondeAUnUsuario, Resources.Labels.Error);
                  this.clearDatosAD();
                }
                this.buscandoEnAD = false;
              });
            } else {
              this.clearDatosAD();
            }
          }
        });
    }
  }

  private clearDatosAD() {
    this.fcService.setValue('detalle.nombre', '', { onlySelf: true });
    this.fcService.setValue('detalle.apellido', '', { onlySelf: true });
    this.fcService.setValue('detalle.mail', '', { onlySelf: true });
  }

  private setearValoresPorDefecto() {
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        usuario: { value: '', disabled: false },
        habilitado: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        nombreAD: [{ value: '', disabled: true }, { validators: [Validators.required], updateOn: 'blur' }],
        nombre: [{ value: '', disabled: true }, Validators.required],
        apellido: [{ value: '', disabled: true }, Validators.required],
        mail: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
        habilitado: { value: false, disabled: true },
        rolesTerminal: this.fb.array([]),
        datosModalRolTerminal: this.fb.group({
          id: { value: '', disabled: true },
          terminal: { value: '', disabled: true },
          rol: { value: '', disabled: true },
          habilitado: { value: '', disabled: true },
        }),
        impresoras: this.fb.array([]),
        datosModalImpresora: this.fb.group({
          id: { value: '', disabled: true },
          impresora: { value: '', disabled: true },
          habilitado: { value: '', disabled: true },
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
        name: Resources.Labels.NombreAD,
        prop: 'nombreAD'
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
        name: Resources.Labels.Mail,
        prop: 'mail'
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

    this.notificationActionsService.clickView
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickView(row));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());

    this.notificationActionsService.clickCopy
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickCopy(row));

    this.notificationActionsService.clickDelete
        .pipe(takeUntil(this.onDestroy))
        .subscribe(row => this.clickDelete(row));
  }

  private clickClear() {
    this.form.reset({ emitEvent: true });
    this.selectedRow = null;
    this.esCopia = false;
    this.init();
  }

  private clickAdd() {
    this.disableButtons = false;
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(true, 'filtros');
    this.setearValoresPorDefectoDetalle();
    this.esConsulta = false;
    this.esCopia = false;
    this.editId = 0;
    this.detalle.setFocus();
  }

  private setearValoresPorDefectoDetalle() {
    this.fcService.disableControl('detalle.nombre');
    this.fcService.disableControl('detalle.apellido');
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true }, true);
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
    this.esCopia = false;
    this.disableButtons = true;
    this.clearForm();
    this.setDisabledGroup(this.disableButtons, 'detalle');
    this.setDisabledGroup(false, 'filtros');
    this.editId = 0;
    this.filtro.setFocus();
  }

  private clearForm() {
    this.form.controls.detalle.reset();
    this.limpiarFormArray('detalle.rolesTerminal');
    this.limpiarFormArray('detalle.impresoras');
  }

  private limpiarFormArray(accesor: string) {
    const control = this.fcService.getControl(accesor);
    if (control) {
      const faControl = control as FormArray;
      while (faControl.length !== 0) {
        faControl.removeAt(0);
      }
    }
    this.detalle.refreshGrid();
  }

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    const rolesTerminal = this.fcService.getValue('detalle.rolesTerminal') as RolTerminalDataView[];
    const validRolesTerminal = rolesTerminal && rolesTerminal.length > 0;
    if (!validRolesTerminal) {
      this.popupService.error(Resources.Messages.DebeIngresarAlMenosUnRol);
    }

    if (this.fcService.isValidForm() && validRolesTerminal) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarUsuarioCommand;
        command.id = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearUsuarioCommand;
        this.saveNewItem(command);
      }
    }
  }

  private clickDelete(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.delete(+row.id)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe(() => {
          this.popupService.success(Resources.Messages.ElRegistroFueEliminadoExitosamente);
          this.isLoading = false;
          this.search();
        });
    }
  }

  private mapControlsToCommand(): UsuarioCommand {
    const command = new UsuarioCommand();
    command.nombreAD = this.fcService.getValue('detalle.nombreAD');
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.apellido = this.fcService.getValue('detalle.apellido');
    command.mail = this.fcService.getValue('detalle.mail');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.rolesTerminal = this.mapRolesTerminalToCommand();
    command.impresoras = this.mapImpresorasToCommand();

    return command;
  }

  private mapRolesTerminalToCommand(): RolTerminalCommand[] {
    const result: RolTerminalCommand[] = [];

    const rolesTerminal = this.form.getRawValue().detalle.rolesTerminal as RolTerminalDataView[];
    if (rolesTerminal) {
      rolesTerminal.forEach(rt => {
        result.push({
          id: rt.id,
          idTerminal: rt.terminal.id,
          idRol: rt.rol.id,
          habilitado: rt.habilitado
        });
      });
    }
    return result;
  }

  private mapImpresorasToCommand(): ImpresoraCommand[] {
    const result: ImpresoraCommand[] = [];

    const impresoras = this.form.getRawValue().detalle.impresoras as ImpresoraUsuarioDataView[];
    if (impresoras) {
      impresoras.forEach(imp => {
        result.push({
          id: imp.id,
          idImpresora: imp.impresora.id,
          habilitado: imp.habilitado
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
        this.esCopia = false;
        this.cancelar();
        this.popupService.success(messageSuccess, titleSuccess);
        this.notificationActionsService.onRefreshGrid();
        this.setDisabledGroup(false, 'filtros');
        this.filtro.setFocus();
      });
  }

  private saveNewItem(command: CrearUsuarioCommand) {
    this.runAction(this.service.crear(command),
                   Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Usuario),
                   Resources.Labels.Agregar);
  }

  private saveEditItem(command: ModificarUsuarioCommand) {
    this.runAction(this.service.modificar(command),
                   Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Usuario),
                   Resources.Labels.Modificar);
  }

  private clickSearch() {
    this.selectedRow = null;
    this.editId = 0;
  }

  private subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.usuario', 'nombre');
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

  private clickView(row: any) {
    if (row) {
      this.service.get(+row.id).subscribe(datos => this.fillControls(datos, false));
    }
  }

  private clickCopy(row: any) {
    if (row) {
      this.service.get(+row.id).subscribe(datos => {
        this.esCopia = true;
        this.fillControls(datos, true);
      });
    }
  }

  private fillControls(data: UsuarioDataView, edit: boolean) {
    this.disableButtons = false;
    this.setDisabledGroup(true, 'filtros');
    if (edit) {
      if (this.esCopia) {
        data.id = 0;
        data.nombreAD = '';
        data.nombre = '';
        data.apellido = '';
        data.mail = '';
        data.habilitado = false;
      }
      this.setDisabledGroup(this.disableButtons, 'detalle');
      this.esConsulta = false;
      this.editId = data.id;
      this.detalle.setFocus();
    } else {
      this.setDisabledGroup(true, 'detalle');
      this.esConsulta = true;
      this.editId = 0;
    }

    this.fcService.setValue('detalle.id', data.id, { onlySelf: true });
    this.fcService.setValue('detalle.nombreAD', data.nombreAD, { onlySelf: true });
    this.fcService.setValue('detalle.nombre', data.nombre, { onlySelf: true }, true);
    this.fcService.setValue('detalle.apellido', data.apellido, { onlySelf: true }, true);
    this.fcService.setValue('detalle.mail', data.mail, { onlySelf: true });
    this.fcService.setValue('detalle.habilitado', data.habilitado, { onlySelf: true });
    this.detalle.setRolesTerminal(data.rolesTerminal);
    this.detalle.setImpresoras(data.impresoras);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

}
