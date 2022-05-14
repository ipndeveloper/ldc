import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarParametrosPorProductoService } from './administrar-parametros-por-producto.service';
import { Resources } from '../../../locale/artifacts/resources';
import { Permission, TiposProducto, TiposCoeficienteConversionLitros } from '../../shared/enums/enums';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarParametrosPorProductoDataView } from '../../shared/data-models/administrar-parametros-por-producto-data-view';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ProductoCommand, CrearProductoCommand, ModificarProductoCommand } from '../../shared/data-models/commands/cargas-descargas/producto-command';
import { ProductoDataView } from '../../shared/data-models/producto-data-view';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FiltroAdministrarParametrosPorProductoComponent } from './filtro-administrar-parametros-por-producto/filtro-administrar-parametros-por-producto.component';
import { DetalleAdministrarParametrosPorProductoComponent } from './detalle-administrar-parametros-por-producto/detalle-administrar-parametros-por-producto.component';
import { Dictionary } from '../../core/models/dictionary';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-administrar-parametros-por-producto',
  templateUrl: './administrar-parametros-por-producto.component.html',
  styleUrls: ['./administrar-parametros-por-producto.component.css']
})

export class AdministrarParametrosPorProductoComponent extends
              AdministrableFormComponent<Array<AdministrarParametrosPorProductoDataView>,
                                          ProductoCommand,
                                          CrearProductoCommand,
                                          ModificarProductoCommand,
                                          ProductoDataView> implements OnInit, OnDestroy {
  Permission = Permission;

  @ViewChild('filtro') filtro: FiltroAdministrarParametrosPorProductoComponent;
  @ViewChild('detalle') detalle: DetalleAdministrarParametrosPorProductoComponent;

  disableFiltros = true;
  form: FormGroup;

  constructor(public readonly service: AdministrarParametrosPorProductoService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              private readonly fb: FormBuilder,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarParametrosPorProductoConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarParametrosPorProductoAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarParametrosPorProductoModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarParametrosPorProductoExportarAExcel;
  }

  ngOnInit(): void {
    this.filters = new Dictionary;
    this.createForm();
    this.subscribeFilterChanges();
    this.subscribeDetalleChanges();
    this.setGridColumns();
    this.subscribeToActionEventsAdministration();
    this.setFocusFiltro();
  }

  private subscribeDetalleChanges(): void {
    const tipoProductoDescargaCtrl = this.fcService.getControl('detalle.tipoProductoDescarga');
    if (tipoProductoDescargaCtrl) {
      tipoProductoDescargaCtrl.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
        .subscribe((tipoProducto: EntityWithDescription) => {
          if (!this.isLoading) {
            this.fcService.setValue('detalle.analisisPorTecnologia', false, {onlySelf: true});
            if (tipoProducto && tipoProducto.id === TiposProducto.Cereal) {
              this.fcService.enableControl('detalle.analisisPorTecnologia');
            } else {
              this.fcService.disableControl('detalle.analisisPorTecnologia');
            }
          }
        });
    }
    const tipoCoeficienteConversionLitrosCtrl = this.fcService.getControl('detalle.tipoCoeficienteConversionLitros');
    if (tipoCoeficienteConversionLitrosCtrl) {
      tipoCoeficienteConversionLitrosCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy), distinctUntilChanged())
      .subscribe((tipoCoeficienteConversionLitros: number) => {
        if (!this.isLoading) {
          this.fcService.setValue('detalle.coeficienteConversionLitros', '', {onlySelf: true});
          if (tipoCoeficienteConversionLitros && tipoCoeficienteConversionLitros === TiposCoeficienteConversionLitros.Fijo) {
            this.fcService.enableControl('detalle.coeficienteConversionLitros');
          } else {
            this.fcService.disableControl('detalle.coeficienteConversionLitros');
          }
        }
      });
    }
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        producto: [{ value: '', disabled: false }]
      }),
      detalle: this.fb.group({
        producto: [{ value: '', disabled: true }, Validators.required],
        tipoProductoDescarga: [{ value: '', disabled: true }, Validators.required],
        tipoProductoCarga: [{ value: '', disabled: true }, Validators.required],
        analisisPorTecnologia: { value: '', disabled: true },
        valorLimiteHumedadParaRechazo: [{ value: '', disabled: true }, Validators.min(0.01)],
        tipoCoeficienteConversionLitros: { value: '', disabled: true },
        coeficienteConversionLitros: [{ value: '', disabled: true }, Validators.min(0.01)],
        equivalenciaArchestra: [{ value: '', disabled: true }]
      })
    });

    this.fcService.initialize(this.form);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Producto);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Producto);
  }

  clearForm() {
    this.form.controls.detalle.reset();
  }

  fillControlsWithData(data: ProductoDataView, isView: boolean) {
    this.fcService.setValue('detalle.producto', data.producto, { onlySelf: true }, this.editId !== 0 || isView);
    this.fcService.setValue('detalle.tipoProductoDescarga', data.tipoProductoDescarga, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.tipoProductoCarga', data.tipoProductoCarga, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.analisisPorTecnologia', data.analisisPorTecnologia, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.valorLimiteHumedadParaRechazo', data.valorLimiteHumedadParaRechazo, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.tipoCoeficienteConversionLitros', data.tipoCoeficienteConversionLitros, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.coeficienteConversionLitros', data.coeficienteConversionLitros, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.equivalenciaArchestra', data.equivalenciaArchestra, { onlySelf: true }, isView);
  }

  setGridColumns() {
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
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Descarga,
        prop: 'tipoProductoDescarga'
      },
      {
        name: Resources.Labels.Carga,
        prop: 'tipoProductoCarga'
      },
      {
        name: Resources.Labels.AnalisisPorTecnologia,
        prop: 'analisisPorTecnologia'
      },
      {
        name: Resources.Messages.CoeficienteFijoConversionLitros,
        prop: 'coeficienteConversionLitros'
      },
      {
        name: Resources.Labels.LimiteHumedad,
        prop: 'valorLimiteHumedadParaRechazo'
      }
    ];
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.producto', 'producto');
  }

  mapControlsToCommand(): ProductoCommand {
    const command = new ProductoCommand();
    command.id = this.fcService.getValue('detalle.producto');
    command.idTipoProductoDescarga = this.fcService.getValue('detalle.tipoProductoDescarga');
    command.idTipoProductoCarga = this.fcService.getValue('detalle.tipoProductoCarga');
    command.requiereAnalisisPorTecnologia = this.fcService.getValue('detalle.analisisPorTecnologia');
    command.idTipoCoeficienteConversionLitros = this.fcService.getValue('detalle.tipoCoeficienteConversionLitros');
    command.coeficienteConversionLitros = this.fcService.getValue('detalle.coeficienteConversionLitros');
    command.codigoArchestra = this.fcService.getValue('detalle.equivalenciaArchestra');
    command.valorLimiteHumedadParaRechazo = this.fcService.getValue('detalle.valorLimiteHumedadParaRechazo');
    return command;
  }

  protected subscribeToActionEventsAdministration() {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Parametros Productos', ['Productos']);
  }

  onClickAceptar(): void {
    if (this.editId === 0) {
      const idProducto = this.fcService.getValue('detalle.producto');
      if (idProducto) {
        this.editId = idProducto;
      }
    }
    super.onClickAceptar();
  }
}
