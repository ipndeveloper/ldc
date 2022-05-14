import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { MovimientoControlPesoItemDataView } from '../../shared/data-models/movimiento-control-peso-item-data-view';
import { SearchFormTemplateComponent } from '../../core/components/search-form-template/search-form-template.component';
import { DatosControlarPesajeEnBalanzaComponent } from './datos-controlar-pesaje-en-balanza/datos-controlar-pesaje-en-balanza.component';
import { FiltroControlPesajeEnBalanzaComponent } from './filtro-control-pesaje-en-balanza/filtro-control-pesaje-en-balanza.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Dictionary } from '../../core/models/dictionary';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ControlarPesajeEnBalanzaService } from './services/controlar-pesaje-en-balanza.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ParametrosTerminalService } from '../shared/services/parametros-terminal.service';
import { MovimientoControlPesoDataView } from '../../shared/data-models/movimiento-control-peso-data-view';

@Component({
  selector: 'yrd-controlar-pesaje-en-balanza',
  templateUrl: './controlar-pesaje-en-balanza.component.html',
  styleUrls: ['./controlar-pesaje-en-balanza.component.css']
})

export class ControlarPesajeEnBalanzaComponent
      extends SearchFormComponent<Array<MovimientoControlPesoItemDataView>> implements OnInit, OnDestroy {

  @ViewChild('searchFormComponent') searchFormComponent: SearchFormTemplateComponent;
  @ViewChild('datosControlPeso') datosControlPeso: DatosControlarPesajeEnBalanzaComponent;
  @ViewChild('filtroControlPesajeEnBalanza') filtroControlPesajeEnBalanza: FiltroControlPesajeEnBalanzaComponent;
  controlarPesajeForm: FormGroup;
  columns: any;
  controlPeso: MovimientoControlPesoDataView;
  filters: Dictionary<string>;
  selectedRow: any;
  disableButtons: boolean;
  editId: number;
  private readonly onDestroy = new Subject();
  cantidadDiasFiltro: number;

  constructor(public readonly popupService: PopupService,
              private readonly fb: FormBuilder,
              public readonly controlarPesajeEnBalanzaService: ControlarPesajeEnBalanzaService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              private readonly fcService: FormComponentService,
              public readonly parametrosTerminalService: ParametrosTerminalService,
            ) {
      super(controlarPesajeEnBalanzaService, notificationActionsService, popupService);
      this.botonesHabilitados = new Dictionary<boolean>();
      this.botonesHabilitados[BotonesEnum.Consultar] = true;
      this.botonesHabilitados[BotonesEnum.Eliminar] = false;
      this.botonesHabilitados[BotonesEnum.Agregar] = false;
      this.botonesHabilitados[BotonesEnum.Modificar] = false;
      this.botonesHabilitados[BotonesEnum.ExportarAExcel] = false;
  }

  ngOnInit() {
    this.getParametroRangoFecha();
    this.setFilters();
    this.Init();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private Init() {
    this.createForm();
    this.subscribeToFiltersChanges();
    this.setGridColumns();
    this.setValuesByDefault();
  }

  private setFilters() {
    this.filters = new Dictionary<string>();
    this.filters.add('fechaDesde', '');
    this.filters.add('fechaHasta', '');
    this.filters.add('parametroDiasFiltro', '');
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickSearch
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
          this.clickSearch()
      );

    this.notificationActionsService.clickView
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickView(row)
      );

    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickClear()
      );
  }

  private clickView(row) {
    if (row) {
      this.controlarPesajeEnBalanzaService.getControlPeso(row.id).subscribe(datos => {
        this.controlPeso = datos;
        this.disableButtons = false;
      });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.ControlPeso);
    }
  }

  private clickClear() {
    this.clear();
  }

  public onClickCerrar() {
    this.cerrar();
  }

  private cerrar() {
    this.disableButtons = true;
    this.setDisabledGroup(this.disableButtons, 'datos');
    this.setDisabledGroup(false, 'filtros');
    this.editId = 0;
    this.datosControlPeso.clearGridsRows();
    setTimeout(() => {
      this.filtroControlPesajeEnBalanza.setFocus();
    }, 500);
  }

  private clickSearch() {
    this.selectedRow = null;
    this.editId = 0;
  }

  private setValuesByDefault() {
    this.disableButtons = true;
    this.setDisabledGroup(this.disableButtons, 'datos');
    setTimeout(() => {
      this.filters['parametroDiasFiltro'] = this.cantidadDiasFiltro;
    }, 500);
  }

  private setDisabledGroup(disabled: boolean, groupName: string): void {
    const datosFG = this.controlarPesajeForm.get(groupName);
    if (datosFG) {
      if (disabled) {
        datosFG.disable(({ onlySelf: true, emitEvent: false }));
      } else {
        datosFG.enable(({ onlySelf: true, emitEvent: false }));
      }
    }
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  public clear() {
    this.controlarPesajeForm.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.Init();
  }

  onClickExportarAExcel() {
    this.datosControlPeso.exportarAExcel();
  }

  getParametroRangoFecha() {
    this.parametrosTerminalService.getParametros().subscribe(parametros => {
      if (parametros) {
        this.cantidadDiasFiltro = parametros.diferenciaDiasFiltroControlPeso;
      }
    });
  }

  private subscribeToFiltersChanges() {
    const fechaDesdeCtrl = this.controlarPesajeForm.get('filtros.fechaDesde');
    const fechaHastaCtrl = this.controlarPesajeForm.get('filtros.fechaHasta');

    if (fechaDesdeCtrl && fechaHastaCtrl) {
      fechaDesdeCtrl.valueChanges.subscribe((fechaDesdeValue: string) => {
        this.filters['fechaDesde'] = fechaDesdeValue;
      });
      fechaHastaCtrl.valueChanges.subscribe((fechaHastaValue: string) => {
        this.filters['fechaHasta'] = fechaHastaValue;
      });
    }
  }

  private setGridColumns() {
    this.columns = [
      { prop: 'selected',
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
        name: Resources.Labels.Patente,
        prop: 'patente'
      },
      {
        name: Resources.Labels.Acoplado,
        prop: 'acoplado'
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'fechaHora'
      }
    ];
  }

  private createForm() {
    this.controlarPesajeForm = this.fb.group({

      filtros: this.fb.group({
        fechaDesde: { value: '', disabled: false },
        fechaHasta: { value: '', disabled: false }
      }),
      datos: this.fb.group({})
    });
    this.fcService.initialize(this.controlarPesajeForm);
  }
}


