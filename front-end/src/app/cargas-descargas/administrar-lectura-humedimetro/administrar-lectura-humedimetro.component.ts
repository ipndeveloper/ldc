import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarLecturaHumedimetroDataView } from '../../shared/data-models/administrar-lectura-humedimetro-data-view';
import {
  LecturaHumedimetroCommand,
  CrearLecturaHumedimetroCommand,
  ModificarLecturaHumedimetroCommand
} from '../../shared/data-models/commands/cargas-descargas/lectura-humedimetro-command';
import { AdministrarLecturaHumedimetroService } from './administrar-lectura-humedimetro.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo, Permission, TablasTransporte } from '../../shared/enums/enums';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarLecturaHumedimetroComponent } from './filtro-administrar-lectura-humedimetro/filtro-administrar-lectura-humedimetro.component';
import { DetalleAdministrarLecturaHumedimetroComponent } from './detalle-administrar-lectura-humedimetro/detalle-administrar-lectura-humedimetro.component';
import { LecturaHumedimetroDataView } from '../../shared/data-models/lectura-humedimetro-data-view';
import { RubrosCalidadService } from '../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { Rubro } from '../../shared/data-models/rubro';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-administrar-lectura-humedimetro',
  templateUrl: './administrar-lectura-humedimetro.component.html',
  styleUrls: ['./administrar-lectura-humedimetro.component.css']
})

export class AdministrarLecturaHumedimetroComponent
     extends AdministrableFormComponent<AdministrarLecturaHumedimetroDataView[],
                                        LecturaHumedimetroCommand,
                                        CrearLecturaHumedimetroCommand,
                                        ModificarLecturaHumedimetroCommand,
                                        LecturaHumedimetroDataView>
  implements OnInit {

  @ViewChild('filtro') filtro: FiltroAdministrarLecturaHumedimetroComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarLecturaHumedimetroComponent;

  rubros: Rubro[] = [];
  Permission = Permission;
  idTablaTransporte = TablasTransporte.TipoDispositivoPorProducto;
  private esAlta: boolean;
  private rubrosSeleccionadosParaCopia: EntityWithDescription[] = [];

  constructor(public readonly service: AdministrarLecturaHumedimetroService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService,
              private readonly rubroCalidadService: RubrosCalidadService) {
    super(service, notificationActionsService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.botonesHabilitados[BotonesEnum.Copiar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarLecturaHumedimetroConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarLecturaHumedimetroAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarLecturaHumedimetroModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarLecturaHumedimetroExportarAExcel;
    this.permisosBotones[BotonesEnum.Copiar] = Permission.AdministrarLecturaHumedimetroCopiar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarLecturaHumedimetroEliminar;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: { value: '', disabled: false },
        producto: { value: undefined, disabled: false },
        humedimetro: { value: '', disabled: false },
        estaHabilitado: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: false }, Validators.required],
        producto: [{ value: undefined, disabled: true }],
        humedimetro: [{ value: '', disabled: false }, Validators.required],
        estaHabilitado: [{ value: '', disabled: true }],
        rubros: [{ value: '', disabled: false }]
      })
    });
  }

  protected init() {
    super.init();
    this.subscribeProducto();
    this.setearValoresPorDefectosFiltros();
  }

  private setearValoresPorDefectosFiltros(): any {
    this.fcService.setValue('filtros.estaHabilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
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
        name: Resources.Labels.Humedimetro,
        prop: 'humedimetro.descripcion'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto.descripcion'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      }
    ];
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: LecturaHumedimetroDataView, isView: boolean): void {
    this.fcService.setValue('detalle.terminal', data.terminal, { onlySelf: true }, !this.esCopia);
    this.fcService.setValue('detalle.producto', data.producto, { onlySelf: true }, !this.esCopia);
    this.fcService.setValue('detalle.humedimetro', data.humedimetro, { onlySelf: true }, !this.esCopia);
    this.fcService.setValue('detalle.estaHabilitado', data.estaHabilitado, { onlySelf: true }, isView && !this.esCopia);
    this.rubros = isView ? data.rubrosCalidadSeleccionados : data.rubrosCalidad;
    if (this.esCopia) {
      this.rubrosSeleccionadosParaCopia = data.rubrosCalidadSeleccionados;
    } else {
      this.rubrosSeleccionadosParaCopia = [];
      setTimeout(() => this.detalle.setRubros(data.rubrosCalidadSeleccionados), 0);
    }
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
    this.detalle.clearCheckboxLists();
    this.rubros = [];
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();
    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Tarjeta', ['Tarjetas']);
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    this.subscribeToFilterControlChanges('filtros.producto', 'producto');
    this.subscribeToFilterControlChanges('filtros.humedimetro', 'humedimetro');

    const estaHabilitado = this.form.get('filtros.estaHabilitado');
    if (estaHabilitado) {
      estaHabilitado.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
        if (value && value.id !== OpcionesSiNo.Todos) {
          return (this.filters['estaHabilitado'] = value.id ? value.id === OpcionesSiNo.Si : null);
        } else {
          return (this.filters['estaHabilitado'] = null);
        }
      });
    }
  }

  mapControlsToCommand(): LecturaHumedimetroCommand {
    const command = new LecturaHumedimetroCommand();
    command.idTerminal = this.fcService.getValue('detalle.terminal');
    command.idProducto = this.fcService.getValue('detalle.producto');
    command.idTipoDispositivo = this.fcService.getValue('detalle.humedimetro');
    command.habilitado = this.fcService.getValue('detalle.estaHabilitado');
    command.idRubrosCalidad = this.fcService.getValue('detalle.rubros');

    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Humedimetro);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Humedimetro);
  }

  protected clickAdd() {
    super.clickAdd();
    this.fcService.setValue('detalle.estaHabilitado', true, { onlySelf: true }, true);
    this.fcService.disableControl('detalle.estaHabilitado');
    this.esAlta = true;
  }

  protected clickEdit(row) {
    super.clickEdit(row);
    this.fcService.disableControl('detalle.terminal');
    this.fcService.disableControl('detalle.humedimetro');
    this.fcService.disableControl('detalle.producto');
    this.esAlta = false;
  }

  protected clickCopy(row) {
    super.clickCopy(row);
    this.esAlta = true;
  }

  private subscribeProducto() {
    const productoControl = this.fcService.getControl('detalle.producto');
    if (productoControl) {
      productoControl.valueChanges.pipe(distinctUntilChanged())
                                  .subscribe((producto: EntityWithCode) => {
        if (producto && this.esAlta) {
          this.rubroCalidadService.getPorIdProducto(producto.id)
                                  .subscribe((rubros: Rubro[]) => {
            this.rubros = rubros;
            if (this.rubrosSeleccionadosParaCopia) {
              setTimeout(() => this.detalle.setRubros(this.rubrosSeleccionadosParaCopia), 0);
            }
          });
        }
      });
    }
  }
}
