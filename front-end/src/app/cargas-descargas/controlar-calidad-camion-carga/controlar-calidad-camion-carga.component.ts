import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { ControlarCalidadCamionCargaService } from './controlar-calidad-camion-carga.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { ControlarCalidadCamionCargaCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-calidad-camion-carga-command';
import { FiltroControlarCalidadCamionCargaComponent } from './filtro-controlar-calidad-camion-carga/filtro-controlar-calidad-camion-carga.component';
import { ModalDecisionControlarCalidadCamionCargaComponent } from './modal-decision-controlar-calidad-camion-carga/modal-decision-controlar-calidad-camion-carga.component';
import { Permission } from '../../shared/enums/enums';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { takeUntil, catchError } from 'rxjs/operators';
import { DecisionControlarCalidadCamionCargaDataView } from '../../shared/data-models/decision-controlar-calidad-camion-carga-cata-view';

@Component({
  selector: 'yrd-controlar-calidad-camion-carga',
  templateUrl: './controlar-calidad-camion-carga.component.html',
  styleUrls: ['./controlar-calidad-camion-carga.component.css'],
})
export class ControlarCalidadCamionCargaComponent
extends AdministrableFormComponent<Array<ControlarCalidadCargaDataView>,
                                ControlarCalidadCamionCargaCommand,
                                ControlarCalidadCamionCargaCommand,
                                ControlarCalidadCamionCargaCommand,
                                DecisionControlarCalidadCamionCargaDataView>
implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: ModalDecisionControlarCalidadCamionCargaComponent;
  @ViewChild('filtro') filtro: FiltroControlarCalidadCamionCargaComponent;

  form: FormGroup;
  disableFiltros = true;
  isLoading = false;

  Permission = Permission;

  constructor(protected readonly controlarCalidadCamionCargaService: ControlarCalidadCamionCargaService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(controlarCalidadCamionCargaService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = false;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = false;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Modificar] = Permission.ControlarCalidadCamionCargaRegistrarDecision;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.ControlarCalidadCamionCargaExportarAExcel;
  }

  ngOnInit() {
    super.ngOnInit();
    this.search();
  }

  fillControlsWithData(parametros: DecisionControlarCalidadCamionCargaDataView, isView: boolean): void {

    this.fcService.setValue('detalle.decision', parametros.decision, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.coeficiente', parametros.coeficiente, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.observacion', parametros.observaciones, {onlySelf: true}, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.producto', 'producto');
    this.subscribeToFilterControlChanges('filtros.numeroDocumento', 'numeroDocumento');
    this.subscribeToFilterControlChanges('filtros.patente', 'patente');
    this.subscribeToFilterControlChanges('filtros.tarjeta', 'tarjeta');
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Terminal);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.ElControlCalidadDeCargaDeCamionesFueGuardadoConExito;
  }

  protected saveEditItem(command: ControlarCalidadCamionCargaCommand) {
    this.runAction(this.service.update(command),
      this.getUpdateSuccessMessage(),
      Resources.Labels.Exito);
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
        name: Resources.Labels.FechaEntrada,
        prop: 'fechaEntrada',
        width: 70
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocumentoPorte',
        width: 70
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'numeroDocumentoPorte',
        width: 70
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto',
        width: 200
      },
      {
        name: Resources.Labels.Tarjeta,
        prop: 'tarjeta',
        width: 70
      },
      {
        name: Resources.Labels.OrdenCarga,
        prop: 'ordenCarga',
        width: 70
      },
      {
        name: Resources.Labels.NroViaje,
        prop: 'nroViaje',
        width: 70
      },
      {
        name: Resources.Labels.PatenteCamion,
        prop: 'patente',
        width: 70
      }
    ];
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        patente: [{ value: '', disabled: true }],
        tarjeta: [{ value: '', disabled: true }, Validators.pattern('^[0-9]*$')],
        producto: [{ value: undefined, disabled: true }],
        numeroDocumento: [{ value: '', disabled: true }],
      }),
      detalle: this.fb.group({
        decision: [{ value: '', disabled: false }, Validators.required],
        observacion: ''
      })
    });
  }

  setFocusFiltro() {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle() {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  protected runAction(action: Observable<any>, messageSuccess: string, titleSuccess: string): void {
    this.isLoading = true;
    this.popupService.blockUI();
    action.pipe(
      takeUntil(this.onDestroy),
      catchError((caught: Observable<any>) => {
        this.isLoading = false;
        this.popupService.unblockUI();
        return caught;
      })
    ).subscribe(obs => {
      this.isLoading = false;
      this.popupService.unblockUI();
      this.cancelar();
      this.detalle.close();
      this.mostarMensaje(obs, messageSuccess, titleSuccess);
      this.search();
      this.setDisabledGroup(false, 'filtros');
      this.setFocusFiltro();
    });
  }

  clickEdit(row) {
    this.disableButtons = false;
    this.setDisabledGroup(true, 'filtros');
    this.setDisabledGroup(false, 'detalle');
    this.esConsulta = false;
    this.editId = this.esCopia ? 0 : row['id'];
    this.setFocusDetalle();
    this.fillControlsWithData(row, false);
    this.detalle.open();
  }

  mapControlsToCommand(): ControlarCalidadCamionCargaCommand {
    const command = new ControlarCalidadCamionCargaCommand();
    command.idDecision = this.fcService.getValue('detalle.decision');
    command.observacion = this.fcService.getValue('detalle.observacion');
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

  protected onClickRegistrarDecision() { }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión Calidad', ['Gestión Calidad']);
  }

}
