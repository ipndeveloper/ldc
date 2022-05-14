import { Component, ViewChild, OnInit } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { CrearCondicionManipuleoCommand, CondicionManipuleoCommand, ModificarCondicionManipuleoCommand } from '../../shared/data-models/commands/cargas-descargas/condicion-manipuleo-command';
import { GestionarManipuleoGridDataView } from '../../shared/data-models/gestionar-manipuleo-grid-data-view';
import { DatosEdicionGestionarManipuleoComponent } from './datos-edicion/datos-edicion-gestionar-manipuleo.component';
import { FiltroBusquedaGestionarManipuleoComponent } from './filtro-busqueda/filtro-busqueda-gestionar-manipuleo.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission, TiposMovimiento } from '../../shared/enums/enums';
import { searchValidator } from '../../core/shared/super/search.validator';
import { Resources } from '../../../locale/artifacts/resources';
import { GestionarManipuleoDataView } from '../../shared/data-models/gestionar-manipuleo-data-view';
import { takeUntil, distinctUntilChanged, catchError } from 'rxjs/operators';
import { GestionarManipuleoService } from './gestionar-manipuleo.service';
import { EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { Collection } from '../../core/models/collection';
import { Observable } from 'rxjs';
import { EliminarCondicionManipuleoCommand } from '../../shared/data-models/commands/cargas-descargas/eliminar-condicion-manipuleo-command';
import { Producto } from '../../shared/data-models/producto';

@Component({
  selector: 'yrd-gestionar-manipuleo',
  templateUrl: './gestionar-manipuleo.component.html',
  styleUrls: ['./gestionar-manipuleo.component.css']
})
export class GestionarManipuleoComponent
  extends AdministrableFormComponent<Array<GestionarManipuleoGridDataView>,
                                           CondicionManipuleoCommand,
                                           CrearCondicionManipuleoCommand,
                                           ModificarCondicionManipuleoCommand,
                                           GestionarManipuleoDataView>
  implements OnInit {

  @ViewChild('datosEdicionManipuleo') datosEdicionGestionarManipuleo: DatosEdicionGestionarManipuleoComponent;
  @ViewChild('filtrosGestionarManipuleo') filtrosGestionarManipuleo: FiltroBusquedaGestionarManipuleoComponent;
  Permission = Permission;
  ingresaMaximoProteina: boolean;
  ingresaMaximoHumedad: boolean;

  constructor(public readonly service: GestionarManipuleoService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              private readonly fb: FormBuilder,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Eliminar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Agregar] = Permission.GestionarManipuleoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.GestionarManipuleoModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.GestionarManipuleoEliminar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarManipuleoExportarAExcel;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscribeCambioProducto();
    this.subscribeCambioHumedadMaximo();
    this.subscribeCambioProteinaMaximo();
    this.fcService.setValue('filtros.tipoTransporte', EntitiesTiposTransporte.Camion);
    this.search();
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        producto: [{ value: undefined, disabled: false }, searchValidator()],
        tipoTransporte: { value: '', disabled: false },
        tipoMovimiento: { value: '', diabled: false }
      }),
      detalle: this.fb.group({
        tipoMovimiento: [{ value: '', disabled: true }, Validators.required],
        plataforma: [{ value: '', disabled: true }, Validators.required],
        puntoCarga: [{ value: '', disabled: true }, Validators.required],
        silo: [{ value: '', disabled: true }, Validators.required],
        grado: { value: '', disabled: true },
        tipoTransporte: [{ value: '', disabled: true }, Validators.required],
        producto: [{ value: undefined, disabled: true }, [Validators.required, searchValidator()]],
        proteinaMinimo: [{value: '', disabled: true }, Validators.compose([Validators.min(0), Validators.max(100)])],
        proteinaMaximo: [{value: '', disabled: true }, Validators.compose([Validators.min(0), Validators.max(100)])],
        estaHabilitado: { value: '', disabled: true },
        humedadMaximo: [{value: '', disabled: true}, Validators.compose([Validators.min(0), Validators.max(100)])],
        humedadMinimo: [{value: '', disabled: true}, Validators.compose([Validators.min(0), Validators.max(100)])]
      })
    });
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
      headerCheckboxable: true,
      checkboxable: true,
      width: 30
    },
    {
      name: 'Nro',
      prop: 'id'
    },
    {
      name: Resources.Labels.TipoMovimiento,
      prop: 'tipoMovimiento.descripcion'
    },
    {
      name: Resources.Labels.PlataformaPCarga,
      prop: 'plataforma',
      comparator: this.comparatorPlataforma.bind(this)
    },
    {
      name: Resources.Labels.TipoTransporte,
      prop: 'tipoTransporte'
    },
    {
      name: Resources.Labels.Habilitado,
      prop: 'estaHabilitado'
    },
    {
      name: Resources.Labels.DescripcionSilo,
      prop: 'silo'
    },
    {
      name: Resources.Labels.Producto,
      prop: 'producto'
    },
    {
      name: Resources.Labels.Grado,
      prop: 'grado'
    },
    {
      name: Resources.Labels.ProteinaMinimo,
      prop: 'proteinaMinimo'
    },
    {
      name: Resources.Labels.ProteinaMaximo,
      prop: 'proteinaMaximo'
    },
    {
      name: Resources.Labels.HumedadMinimo,
      prop: 'humedadMinimo'
    },
    {
      name: Resources.Labels.HumedadMaximo,
      prop: 'humedadMaximo'
    }
    ];
  }

  fillControlsWithData(data: GestionarManipuleoDataView, isView: boolean): void {
    this.fcService.setValue('detalle.tipoMovimiento', data.tipoMovimiento, { onlySelf: true }, this.editId !== 0);
    this.fcService.setValue('detalle.producto', data.producto, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.plataforma', data.plataforma, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.puntoCarga', data.puntoCarga, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.grado', data.grado, { onlySelf: true }, !data.producto.determinaGrado);
    this.fcService.setValue('detalle.tipoTransporte', data.tipoTransporte, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.estaHabilitado', data.estaHabilitado, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.silo', data.silo, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.proteinaMaximo', data.proteinaMaximo, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.humedadMaximo', data.humedadMaximo, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.humedadMinimo', data.humedadMinimo, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.proteinaMinimo', data.proteinaMinimo, { onlySelf: true }, isView);
  }

  setFocusFiltro(): void {
    setTimeout(() => {
      this.filtrosGestionarManipuleo.setFocus();
    }, 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => {
      this.datosEdicionGestionarManipuleo.setFocus();
    }, 0);
  }

  clearForm(): void {
    this.form.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.producto', 'producto');
    this.subscribeToFilterControlChanges('filtros.tipoTransporte', 'tipoTransporte');
    this.subscribeToFilterControlChanges('filtros.tipoMovimiento', 'tipoMovimiento');
  }

  mapControlsToCommand(): CondicionManipuleoCommand {
    const idProducto = Number(this.fcService.getValue('detalle.producto'));
    const idTipoMovimiento = Number(this.fcService.getValue('detalle.tipoMovimiento'));
    const idTipoTransporte = Number(this.fcService.getValue('detalle.tipoTransporte'));
    const idSilo = Number(this.fcService.getValue('detalle.silo'));
    const estaHabilitado = Boolean(this.fcService.getValue('detalle.estaHabilitado'));

    const command = new CondicionManipuleoCommand(idProducto, idTipoMovimiento, idTipoTransporte, idSilo, estaHabilitado);

    command.idPlataformaDescarga = Number(this.fcService.getValue('detalle.plataforma'));
    command.idPuntoCarga = Number(this.fcService.getValue('detalle.puntoCarga'));
    command.proteinaMaximo = Number(this.fcService.getValue('detalle.proteinaMaximo'));
    command.humedadMaximo = Number(this.fcService.getValue('detalle.humedadMaximo'));

    const humedadMinimo = this.form.get('detalle.humedadMinimo');
    const proteinaMinimo = this.form.get('detalle.proteinaMinimo');

    const gradoControl = this.form.get('detalle.grado');
    if (gradoControl && !gradoControl.disabled) {
      command.idGrado = Number(this.fcService.getValue('detalle.grado'));
    }

    if (humedadMinimo && proteinaMinimo) {
      command.proteinaMinimo = proteinaMinimo.value;
      command.humedadMinimo = humedadMinimo.value;
    }

    return command;
  }

  protected clickAdd(): void {
    super.clickAdd();
    this.fcService.setValue('detalle.estaHabilitado', true, { onlySelf: true }, true);
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaCondicionDeManipuleoFueAgregadaConExito;
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaCondicionDeManipuleoFueGuardadaConExito;
  }

  public onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);
    this.validarIngresoValorMaximo();

    if (this.validateProteinasHumedadChanges() && this.fcService.isValidForm()) {
      if (this.editId > 0) {
        const command = this.mapControlsToCommand() as ModificarCondicionManipuleoCommand;
        command['id'] = this.editId;
        this.saveEditItem(command);
      } else {
        const command = this.mapControlsToCommand() as CrearCondicionManipuleoCommand;
        this.saveNewItem(command);
      }
    }
  }

  protected clickEdit(row: any) {
    if (row) {
      this.validarModificarEliminar(row.id)
      .subscribe((esValido: boolean) => {
        if (esValido) {
          super.clickEdit(this.selectedRow[0]);
        } else {
          this.errorCamionEstaAsignado(Resources.Labels.Modificar, this.selectedRow[0].tipoMovimiento.id);
        }
      });
    }
  }

  protected clickDelete(row: any) {
    if (row) {
      this.isLoading = true;
      this.validarModificarEliminar(row.id)
        .subscribe((esValido: boolean) => {
          if (esValido) {
            const command = new EliminarCondicionManipuleoCommand(this.selectedRow[0].id);
            this.removeItem(command);
          } else {
            this.errorCamionEstaAsignado(Resources.Labels.Eliminar, this.selectedRow[0].tipoMovimiento.id);
          }
        });
    }
  }

  private removeItem(command: EliminarCondicionManipuleoCommand) {
    this.runAction(this.service.delete(command.id),
      Resources.Messages.ElRegistroFueEliminadoExitosamente,
      Resources.Labels.Eliminar);
  }

  protected runAction(action: Observable<any>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    action.pipe(
      takeUntil(this.onDestroy),
      catchError((caught: Observable<any>) => {
        this.isLoading = false;
        return caught;
      })
    ).subscribe(obs => {
      this.isLoading = false;
      this.mostarMensaje(obs, messageSuccess, titleSuccess);
      this.notificationActionsService.onRefreshGrid();
      this.disableButtons = true;
      this.setDisabledGroup(false, 'filtros');
      this.setDisabledGroup(this.disableButtons, 'detalle');
      this.form.controls.detalle.reset();
      this.setFocusFiltro();
      this.search();
    });
  }

  private comparatorPlataforma(propA: string, propB: string): number {
    const PlataformaA = parseInt(propA.replace( /^\D+/g, ''), 0);
    const PlataformaB = parseInt(propB.replace( /^\D+/g, ''), 0);
    if (PlataformaA < PlataformaB) {
      return -1;
    } else {
      return 1;
    }
  }

  private subscribeCambioProducto() {
    const producto = this.form.get('detalle.producto');
    if (producto) {
      producto.valueChanges.subscribe((value: Producto) => {
        if (value && value.imputaStock && value.determinaGrado) {
          this.fcService.enableControl('detalle.grado');
        } else {
          this.fcService.setValue('detalle.grado', undefined);
          this.fcService.disableControl('detalle.grado');
        }
      });
    }
  }

  private subscribeCambioHumedadMaximo() {
    const humedadMaximo = this.form.get('detalle.humedadMaximo');
    if (humedadMaximo) {
      humedadMaximo.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.validarIngresoValorMaximo();
      });
    }
  }

  private subscribeCambioProteinaMaximo() {
    const proteinaMaximo = this.form.get('detalle.proteinaMaximo');
    if (proteinaMaximo) {
      proteinaMaximo.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.validarIngresoValorMaximo();
      });
    }
  }

  private validarIngresoValorMaximo(): void {
    const proteinaMaximo  = this.form.get('detalle.proteinaMaximo');
    const humedadMaximo  = this.form.get('detalle.humedadMaximo');
    if (humedadMaximo  && proteinaMaximo) {
      proteinaMaximo.value ? this.ingresaMaximoProteina = true : this.ingresaMaximoProteina = false;
      humedadMaximo.value ? this.ingresaMaximoHumedad = true : this.ingresaMaximoHumedad = false;
    }
    this.updateValidators(this.ingresaMaximoProteina, 'detalle.proteinaMinimo');
    this.updateValidators(this.ingresaMaximoHumedad, 'detalle.humedadMinimo');
  }

  private updateValidators(required: boolean, control: string) {
    const ctrlValorMinimo = this.form.get(control);
    if (ctrlValorMinimo) {
      if (required) {
        ctrlValorMinimo.setValidators(Validators.required);
      } else {
        ctrlValorMinimo.clearValidators();
        ctrlValorMinimo.setValidators(Validators.compose([Validators.min(0), Validators.max(100)]));
      }
      ctrlValorMinimo.updateValueAndValidity();
    }
  }

  private validateProteinasHumedadChanges(): boolean {
    const proteinaMinimo = this.form.get('detalle.proteinaMinimo');
    const proteinaMaximo  = this.form.get('detalle.proteinaMaximo');
    const humedadMinimo = this.form.get('detalle.humedadMinimo');
    const humedadMaximo  = this.form.get('detalle.humedadMaximo');

    let proteinaOk = true;
    let humedadOk = true;

    if (proteinaMinimo && proteinaMaximo &&
      (proteinaMinimo.value || proteinaMaximo.value)) {
      const proteinaMinimoValue = Number(proteinaMinimo.value);
      const proteinaMaximoValue = Number(proteinaMaximo.value);
      proteinaOk = this.ValidarMinimoMaximo(proteinaMinimoValue, proteinaMaximoValue, Resources.Labels.ValoresProteinas);
    }

    if (humedadMinimo && humedadMaximo &&
      (humedadMinimo.value || humedadMaximo.value)) {
      const humedadMinimoValue = Number(humedadMinimo.value);
      const humedadMaximoValue = Number(humedadMaximo.value);
      humedadOk = this.ValidarMinimoMaximo(humedadMinimoValue, humedadMaximoValue, Resources.Labels.ValoresHumedad);
    }

    return humedadOk && proteinaOk;
  }

  private ValidarMinimoMaximo(minimo: number, maximo: number, titulo: string): boolean {
    if (minimo >= maximo) {
      this.popupService.error(Resources.Messages.ElPorcentajeDeValorMinimoDebeSerMenorAlPorcentajeDeValorMaximo, titulo);
      return false;
    }
    return true;
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Manipuleo', ['Gestión de Manipuleo']);
  }

  private validarModificarEliminar(id: number): Observable<boolean> {
    return this.service.validarCondicionManipuleoACambiarOEliminar(id);
  }

  private errorCamionEstaAsignado(actionTitle: string, idTipoMovimiento: number): void {
    let texto = Resources.Messages.ExistenCamionesAsignados;
    texto += idTipoMovimiento === TiposMovimiento.Carga ? ` al ${Resources.Labels.PuntoCarga}`
                                                        : ` a la ${Resources.Labels.Plataforma}`;
    this.popupService.error(`${texto} a ${actionTitle}.`, Resources.Labels.Error);
  }
}
