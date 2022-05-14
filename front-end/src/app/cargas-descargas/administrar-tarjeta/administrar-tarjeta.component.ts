import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarTarjetaDataView } from '../../shared/data-models/administrar-tarjeta-data-view';
import { TarjetaCommand, CrearTarjetaCommand, ModificarTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/tarjeta-command';
import { AdministrarTarjetaService } from './administrar-tarjeta.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarTarjetaComponent } from './filtro-administrar-tarjeta/filtro-administrar-tarjeta.component';
import { DetalleAdministrarTarjetaComponent } from './detalle-administrar-tarjeta/detalle-administrar-tarjeta.component';
import { Collection } from '../../core/models/collection';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { rangoNumeroTarjetaValido } from '../shared/validators/rangoNumeroTarjetaValido.validator';
import { Observable } from 'rxjs';
import { ModalImportarExcelComponent } from './modal-importar-excel/modal-importar-excel.component';
import { ImportarExcelTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/importar-excel-tarjeta-command';

@Component({
  selector: 'yrd-administrar-tarjeta',
  templateUrl: './administrar-tarjeta.component.html',
  styleUrls: ['./administrar-tarjeta.component.css']
})
export class AdministrarTarjetaComponent
     extends AdministrableFormComponent<AdministrarTarjetaDataView[],
                                        TarjetaCommand,
                                        CrearTarjetaCommand,
                                        ModificarTarjetaCommand,
                                        AdministrarTarjetaDataView>
  implements OnInit {

  @ViewChild('filtro') filtro: FiltroAdministrarTarjetaComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarTarjetaComponent;
  @ViewChild('modalImportarExcel') modalImportarExcel: ModalImportarExcelComponent;

  Permission = Permission;

  constructor(public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              public readonly service: AdministrarTarjetaService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(service, notificationActionsService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarTarjetasConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarTarjetasAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarTarjetasModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarTarjetasExportarAExcel;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: { value: '', disabled: false },
        habilitada: { value: '', disabled: false },
        busquedaIndividual: { value: true, disabled: false },
        contiene: this.fb.group({
          prefijoTarjeta: { value: '', disabled: false },
          numeroTarjeta: [{ value: '', disabled: false }, Validators.required],
          sufijoTarjeta: { value: '', disabled: false }
        }),
        rango: this.fb.group({
          desde: this.fb.group({
            prefijoTarjeta: { value: '', disabled: true },
            numeroTarjeta: [{ value: '', disabled: true }, Validators.required],
            sufijoTarjeta: { value: '', disabled: true }
          }),
          hasta: this.fb.group({
            prefijoTarjeta: { value: '', disabled: true },
            numeroTarjeta: [{ value: '', disabled: true }, Validators.required],
            sufijoTarjeta: { value: '', disabled: true }
          })
        }, { validator: rangoNumeroTarjetaValido() })
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: true }, Validators.required],
        tipoTarjeta: [{ value: '', disabled: true }],
        habilitada: { value: '', disabled: true },
        altaIndividual: { value: true, disabled: true },
        individual: this.fb.group({
          prefijoTarjeta: { value: '', disabled: false },
          numeroTarjeta: [{ value: '', disabled: false }, Validators.required],
          sufijoTarjeta: { value: '', disabled: false }
        }),
        masiva: this.fb.group({
          desde: this.fb.group({
            prefijoTarjeta: { value: '', disabled: true },
            numeroTarjeta: [{ value: '', disabled: true }, Validators.required],
            sufijoTarjeta: { value: '', disabled: true }
          }),
          hasta: this.fb.group({
            prefijoTarjeta: { value: '', disabled: true },
            numeroTarjeta: [{ value: '', disabled: true }, Validators.required],
            sufijoTarjeta: { value: '', disabled: true }
          })
        }, { validator: rangoNumeroTarjetaValido() })
      }),
      datosImportacionExcel: this.fb.group({
        archivos: { value: [], disabled: false }
      })
    });
  }

  protected init(): void {
    super.init();
    this.setearValoresPorDefectosFiltros();
    this.subscribeDetailChanges();
  }

  private setearValoresPorDefectosFiltros(): void {
    this.fcService.setValue('filtros.habilitada', { id: OpcionesSiNo.Si });
    this.fcService.setValue('filtros.busquedaIndividual', true);
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: AdministrarTarjetaDataView, isView: boolean): void {
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, true);
    this.fcService.setValue('detalle.tipoTarjeta', data.tipoTarjeta, { onlySelf: true }, true);
    this.fcService.setValue('detalle.habilitada', data.habilitada, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.altaIndividual', true, { onlySelf: true }, true);
    this.fcService.setValue('detalle.individual.prefijoTarjeta', data.prefijo, { onlySelf: true }, true);
    this.fcService.setValue('detalle.individual.numeroTarjeta', data.numero, { onlySelf: true }, true);
    this.fcService.setValue('detalle.individual.sufijoTarjeta', data.sufijo, { onlySelf: true }, true);
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

  private clickExcelExport(dataGrid): void {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Tarjeta', ['Tarjetas']);
  }

  private subscribeDetailChanges(): void {
    const altaIndividual = this.fcService.getControl('detalle.altaIndividual');
    if (altaIndividual) {
      altaIndividual.valueChanges.pipe(
        takeUntil(this.onDestroy)
      ).subscribe((esAltaIndividual: boolean) => {
        if (esAltaIndividual != null) {
          this.setDisabledGroup(esAltaIndividual, 'detalle.masiva');
          this.setDisabledGroup(!esAltaIndividual, 'detalle.individual');
          if (!esAltaIndividual) {
            const masivaForm = this.fcService.getControl('detalle.masiva.hasta') as FormGroup;
            if (masivaForm) {
              masivaForm.controls.prefijoTarjeta.disable();
              masivaForm.controls.sufijoTarjeta.disable();
            }
          }
          this.limpiarDatosTarjeta(esAltaIndividual, false);
        }
      });
    }
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.contiene.prefijoTarjeta', 'prefijo');
    this.subscribeToFilterControlChanges('filtros.contiene.numeroTarjeta', 'numero');
    this.subscribeToFilterControlChanges('filtros.contiene.sufijoTarjeta', 'sufijo');
    this.subscribeToFilterControlChanges('filtros.rango.desde.prefijoTarjeta', 'prefijoDesde');
    this.subscribeToFilterControlChanges('filtros.rango.desde.numeroTarjeta', 'numeroDesde');
    this.subscribeToFilterControlChanges('filtros.rango.desde.sufijoTarjeta', 'sufijoDesde');
    this.subscribeToFilterControlChanges('filtros.rango.hasta.numeroTarjeta', 'numeroHasta');

    const habilitada = this.form.get('filtros.habilitada');
    if (habilitada) {
      habilitada.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((value: EntityWithDescription) => {
        if (value && value.id !== OpcionesSiNo.Todos) {
          return (this.filters['habilitada'] = value.id ? value.id === OpcionesSiNo.Si : null);
        } else {
          return (this.filters['habilitada'] = null);
        }
      });
    }

    const busquedaIndividual = this.fcService.getControl('filtros.busquedaIndividual');
    if (busquedaIndividual) {
      busquedaIndividual.valueChanges.pipe(
        takeUntil(this.onDestroy)
      ).subscribe((esBusquedaIndividual: boolean) => {
        if (esBusquedaIndividual != null) {
          this.setDisabledGroup(esBusquedaIndividual, 'filtros.rango');
          this.setDisabledGroup(!esBusquedaIndividual, 'filtros.contiene');
          if (!esBusquedaIndividual) {
            const rangoForm = this.fcService.getControl('filtros.rango.hasta') as FormGroup;
            if (rangoForm) {
              rangoForm.controls.prefijoTarjeta.disable();
              rangoForm.controls.sufijoTarjeta.disable();
            }
          }
          this.limpiarDatosTarjeta(esBusquedaIndividual, true);
        }
      });
    }
  }

  private limpiarDatosTarjeta(esBusquedaIndividual: boolean, esBusqueda: boolean): void {
    const fCNameIndividual = esBusqueda ? 'filtros.contiene' : 'detalle.individual';
    const fCNameRango = esBusqueda ? 'filtros.rango' : 'detalle.masiva';
    const formControl = esBusquedaIndividual ? this.form.get(fCNameRango)
                                             : this.form.get(fCNameIndividual);
    if (formControl) {
      formControl.reset();
    }
  }

  mapControlsToCommand(): TarjetaCommand {
    const command = new TarjetaCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.habilitada = this.fcService.getValue('detalle.habilitada');
    const esAltaIndividual = this.fcService.getValue('detalle.altaIndividual');
    if (esAltaIndividual) {
      command.prefijo = this.fcService.getValue('detalle.individual.prefijoTarjeta');
      command.numero = this.fcService.getValue('detalle.individual.numeroTarjeta');
      command.sufijo = this.fcService.getValue('detalle.individual.sufijoTarjeta');
    } else {
      command.prefijo = this.fcService.getValue('detalle.masiva.desde.prefijoTarjeta');
      command.numero = this.fcService.getValue('detalle.masiva.desde.numeroTarjeta');
      command.sufijo = this.fcService.getValue('detalle.masiva.desde.sufijoTarjeta');
      const masivaForm = this.fcService.getControl('detalle.masiva.hasta') as FormGroup;
      if (masivaForm) {
        command.numeroHasta = masivaForm.controls.numeroTarjeta.value;
      }
    }
    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Tarjeta);
  }

  getImportExcelSuccessMessage(): string {
    return Resources.Messages.SeAgregaronNuevasTarjetasConExito;
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
        name: Resources.Labels.Habilitado,
        prop: 'habilitada'
      }
    ];
  }

  protected onClickImportarExcel(): void {
    this.modalImportarExcel.open();
  }

  protected clickAdd(): void {
    super.clickAdd();
    this.fcService.setValue('detalle.habilitada', true, { onlySelf: true }, true);
    this.fcService.setValue('detalle.altaIndividual', true);
    this.fcService.disableControl('detalle.tipoTarjeta');
    this.fcService.disableControl('detalle.habilitada');
  }

  protected clickEdit(rows: any) {
    if (rows) {
      this.isLoading = true;
      const command = new ModificarTarjetaCommand();
      rows.forEach(r => {
        command.idsTarjetas.push(r.id);
      });
      this.service.update(command)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe(obs => {
          this.isLoading = false;
          super.mostarMensaje(obs, this.getUpdateSuccessMessage(), Resources.Labels.Modificar);
          this.cancelar();
          this.notificationActionsService.onRefreshGrid();
        });
    }
  }

  protected search(): void {
    if (this.fcService.isValidForm()) {
      super.search();
    } else {
      const errors = new Collection<string>();
      const filtroForm = this.fcService.getControl('filtros') as FormGroup;
      this.fcService.validateForm(filtroForm.controls, errors, 'filtros');
      this.fcService.showValidationError(errors);
    }
  }

  protected cancelar(): void {
    super.cancelar();
    let esBusquedaIndividual = this.fcService.getValue('filtros.busquedaIndividual');
    esBusquedaIndividual = esBusquedaIndividual === true;
    this.setDisabledGroup(esBusquedaIndividual, 'filtros.rango');
    this.setDisabledGroup(!esBusquedaIndividual, 'filtros.contiene');
    if (!esBusquedaIndividual) {
      const rangoForm = this.fcService.getControl('filtros.rango.hasta') as FormGroup;
      if (rangoForm) {
        rangoForm.controls.prefijoTarjeta.disable();
        rangoForm.controls.sufijoTarjeta.disable();
      }
    }
    this.limpiarDatosTarjeta(esBusquedaIndividual, true);
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
        super.mostarMensaje(obs, messageSuccess, titleSuccess);
        this.notificationActionsService.onRefreshGrid();
        this.cancelar();
      });
  }

  onAcceptedImportarArchivoExcel() {
    this.service.importarArchivoExcel(this.crearCommandImportacionExcel()).subscribe(res => {
      if (res.mensajeRepuesta) {
        const warnings = res.mensajeRepuesta.split('\n');
        for (let i = 0; i < warnings.length - 1; i++) {
          this.popupService.warning(warnings[i]);
        }
      }
      this.modalImportarExcel.close();
      this.popupService.success(this.getImportExcelSuccessMessage());
    });
  }

  private crearCommandImportacionExcel() {
    const command = new ImportarExcelTarjetaCommand();
    command.archivos = this.fcService.getValue('datosImportacionExcel.archivos');
    return command;
  }
}
