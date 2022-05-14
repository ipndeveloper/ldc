import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { AdministrarCaracteristicasDataView } from '../../shared/data-models/administrar-caracteristicas-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarCaracteristicasService } from './administrar-caracteristicas.service';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { takeUntil, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { CaracteristicaCircuitoCommand, ModificarCaracteristicaCircuitoCommand, CrearCaracteristicaCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/caracteristica-circuito-command';
import { CaracteristicaPorCircuitoDataView } from '../../shared/data-models/caracteristica-por-circuito-data-view';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { DetalleAdministrarCaracteristicasComponent } from './detalle-administrar-caracteristicas/detalle-administrar-caracteristicas.component';
import { FiltroAdministrarCaracteristicasComponent } from './filtro-administrar-caracteristicas/filtro-administrar-caracteristicas.component';
import { Collection } from '../../core/models/collection';
import { Caracteristica } from '../../shared/data-models/caracteristica';

@Component({
  selector: 'yrd-administrar-caracteristicas',
  templateUrl: './administrar-caracteristicas.component.html',
  styleUrls: ['./administrar-caracteristicas.component.css']
})
export class AdministrarCaracteristicasComponent
     extends SearchFormComponent<Array<AdministrarCaracteristicasDataView>>
  implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  disableButtons = true;
  private readonly onDestroy = new Subject();
  selectedRow: any;
  esConsulta: boolean;
  esModificacion: boolean;
  editId: number;
  command: CaracteristicaCircuitoCommand;
  caracteristicaCircuitoList: Caracteristica[];
  isLoading = false;

  @ViewChild('detalle') detalle: DetalleAdministrarCaracteristicasComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarCaracteristicasComponent;

  constructor(public readonly service: AdministrarCaracteristicasService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              private readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarCaracteristicasConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarCaracteristicasAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarCaracteristicasModificar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarCaracteristicasEliminar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarCaracteristicasExportarAExcel;
  }

  ngOnInit() {
    this.init();
    this.subscribeToActionEventsPrivate();
  }

  ngAfterViewInit() {
    this.filtro.setFocus();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private init() {
    this.createForm();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.setFilters();
    this.editId = 0;
    this.setDefaultValueCtrlHabilitado();
  }

  private setDefaultValueCtrlHabilitado() {
    const estaHabilitado = this.form.get('filtros.estaHabilitado');
    if (estaHabilitado) {
      estaHabilitado.setValue({id: OpcionesSiNo.Si});
    }
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        circuito: { value: undefined },
        actividad: { value: undefined },
        caracteristica: { value: undefined },
        estaHabilitado: { value: true },
      }),
      detalle: this.fb.group({
        circuito: [{ value: undefined }, Validators.required],
        actividadCircuito: [{ value: undefined }, Validators.required],
        caracteristicaCircuito: [{ value: undefined }, Validators.required],
        habilitado: { value: true }
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
        name: Resources.Labels.Circuito,
        prop: 'circuito'
      },
      {
        name: Resources.Labels.Actividad,
        prop: 'actividad'
      },
      {
        name: Resources.Labels.Caracteristica,
        prop: 'caracteristica'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado'
      }
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('circuito', '');
    this.filters.add('actividad', '');
    this.filters.add('caracteristica', '');
    this.filters.add('estaHabilitado', '');
  }

  private subscribeToFiltersChanges() {
    const circuito = this.form.get('filtros.circuito');
    const actividad = this.form.get('filtros.actividad');
    const caracteristica = this.form.get('filtros.caracteristica');
    const estaHabilitado = this.form.get('filtros.estaHabilitado');

    if (circuito && actividad && caracteristica && estaHabilitado) {
      circuito.valueChanges.subscribe((value) => {
        this.filters['circuito'] = value;
      });
      actividad.valueChanges.subscribe((value) => {
        this.filters['actividad'] = value;
      });
      caracteristica.valueChanges.subscribe((value) => {
        this.filters['caracteristica'] = value;
      });
      estaHabilitado.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
        if (value && value.id !== OpcionesSiNo.Todos) {
          return this.filters['estaHabilitado'] = value.id ? value.id === OpcionesSiNo.Si : null;
        } else {
          return this.filters['estaHabilitado'] = null;
        }
      });
    }
  }

  private clickView(row) {
    this.esConsulta = true;
    this.esModificacion = false;
    this.prepareForm(row);
  }

  private clickAdd() {
    this.disableButtons = false;
    this.esConsulta = false;
    this.esModificacion = false;
    this.deshabilitarControles(this.esModificacion);
    this.detalle.clearCaracteristicas();
    this.detalle.setFocusCircuito();
  }

  private clickEdit(row) {
    this.esConsulta = false;
    this.esModificacion = true;
    this.prepareForm(row);
    this.detalle.setFocusHabilitado();
  }

  private prepareForm(row) {
    this.disableButtons = false;
    this.deshabilitarControles(this.esModificacion);
    this.getCaracteristica(row);
  }

  private getCaracteristica(row) {
    if (row) {
      this.service.getCaracteristicaCircuito(+row.id).subscribe(data => {
        this.loadCaracteristica(data);
      });
    }
  }


  private clickSelectedRow(row: any) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickAdd
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickAdd());

    this.notificationActionsService.clickEdit
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickEdit(row));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickView
    .pipe(takeUntil(this.onDestroy))
    .subscribe(row => this.clickView(row));

    this.notificationActionsService.clickClear
    .pipe(takeUntil(this.onDestroy))
    .subscribe(() => this.clickClear());

    this.notificationActionsService.clickExcelExport
    .pipe( takeUntil(this.onDestroy))
    .subscribe(rows =>
      this.clickExcelExport(rows)
    );

    this.notificationActionsService.clickDelete
    .pipe(takeUntil(this.onDestroy))
    .subscribe(row => this.clickDelete(row));
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Caracteristicas', ['Caracteristicas']);
  }

  public clickClear() {
    this.form.controls.filtros.reset();
    this.limpiar();
  }

  private limpiar() {
    this.selectedRow = null;
    this.cancelar();
    this.detalle.clearCaracteristicas();
  }

  onClickAceptar() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    if (this.fcService.isValidForm()) {
      if (this.esModificacion) {
        this.command = this.mapControlsToCommand() as ModificarCaracteristicaCircuitoCommand;
        this.runAction(this.service.modificar(this.command),
                      Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Caracteristica),
                      Resources.Labels.Modificacion);
      } else {
        this.command = this.mapControlsToCommand() as CrearCaracteristicaCircuitoCommand;
        this.runAction(this.service.crear(this.command),
                      Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Caracteristica),
                      Resources.Labels.Agregar);
        }}
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
            this.notificationActionsService.onRefreshGrid();
            this.popupService.success(messageSuccess, titleSuccess);
            this.limpiar();
          });
  }

  protected clickDelete(row: any) {
    if (row) {
      this.isLoading = true;
      this.service.eliminar(+row.id)
        .pipe(catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        }))
        .subscribe(() => {
          this.popupService.success(Resources.Messages.ElRegistroFueEliminadoExitosamente);
          this.isLoading = false;
          this.filtro.setFocus();
          this.search();
        });
    }
  }

  onClickCancelar() {
    this.cancelar();
  }

  private cancelar() {
    this.form.enable();
    this.disableButtons = true;
    this.form.controls.detalle.reset();
    this.editId = 0;
    this.filtro.setFocus();
  }

  private deshabilitarControles(esModificacion: boolean) {
    this.setDisabledGroup(true, 'filtros');
    if (esModificacion) {
      this.setDisabledGroup(true, 'detalle');
    } else {
      this.setDisabledGroup(false, 'detalle');
    }
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

  private mapControlsToCommand(): CaracteristicaCircuitoCommand {
    const command = new CaracteristicaCircuitoCommand();
      command.id = this.editId;
      command.IdCircuito = this.fcService.getValue('detalle.circuito');
      command.IdActividad = this.fcService.getValue('detalle.actividadCircuito');
      command.IdCaracteristica = this.fcService.getValue('detalle.caracteristicaCircuito');
      command.habilitado = this.fcService.getValue('detalle.habilitado');

    return command;
  }

  private loadCaracteristica(data: CaracteristicaPorCircuitoDataView) {
    this.editId = data.id;
    this.setDataCaracteristicaPorCircuito(data);
    this.fcService.setValue('detalle.circuito', data.circuito, {onlySelf: true}, true);
    this.fcService.setValue('detalle.actividadCircuito', data.actividad, {onlySelf: true}, true);
    this.fcService.setValue('detalle.caracteristicaCircuito', data.caracteristica, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, !this.esModificacion);
  }

  private setDataCaracteristicaPorCircuito(data: CaracteristicaPorCircuitoDataView) {
    this.caracteristicaCircuitoList = [];
    this.caracteristicaCircuitoList.push(data.caracteristica);
    this.detalle.setCaracteristicas(this.caracteristicaCircuitoList);
  }

}
