import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { takeUntil, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { RegistrarControlPatrimonialCommand, ArchivoRegistrarControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-control-patrimonial-command';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { DecisionControlPatrimonialDataView } from '../../shared/data-models/decision-control-patrimonial-data-view';
import { Operaciones, Permission } from '../../shared/enums/enums';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ModalDecisionRegistrarControlPatrimonialComponent } from './modal-decision-registrar-control-patrimonial/modal-decision-registrar-control-patrimonial.component';
import { RegistrarControlPatrimonialService } from './registrar-control-patrimonial.service';
import { FiltroRegistrarControlPatrimonialComponent } from './filtro-registrar-control-patrimonial/filtro-registrar-control-patrimonial.component';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { AuthService } from '../../core/services/session/auth.service';
import { Terminal } from '../../shared/data-models/terminal';

@Component({
  selector: 'yrd-registrar-control-patrimonial',
  templateUrl: './registrar-control-patrimonial.component.html',
  styleUrls: ['./registrar-control-patrimonial.component.css']
})
export class RegistrarControlPatrimonialComponent
extends AdministrableFormComponent<Array<ControlarCalidadCargaDataView>,
                                 RegistrarControlPatrimonialCommand,
                                 RegistrarControlPatrimonialCommand,
                                 RegistrarControlPatrimonialCommand,
                                 DecisionControlPatrimonialDataView>
implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: ModalDecisionRegistrarControlPatrimonialComponent;
  @ViewChild('filtro') filtro: FiltroRegistrarControlPatrimonialComponent;

  form: FormGroup;
  disableFiltros = true;
  isLoading = false;
  idMovimiento: number;
  terminal: Terminal;
  basePath = 'RegistrarControlPatrimonial';
  aceptarContinuar = false;
  Permission = Permission;
  private esNavegacion = false;
  private destroyedByNavigation = false;

  constructor(protected readonly administrarRegistrarControlPatrimonialService: RegistrarControlPatrimonialService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService,
              private readonly navigationService: NavigationService,
              private readonly authService: AuthService) {
    super(administrarRegistrarControlPatrimonialService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = false;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = false;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Modificar] = Permission.RegistrarControlPatrimonialRegistrarDecision;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.RegistrarControlPatrimonialExportarAExcel;
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeNavigation();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  private subscribeNavigation(): void {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params.idMovimiento) {
          this.administrarRegistrarControlPatrimonialService.getByNavigtion(+params.idMovimiento)
            .pipe(takeUntil(this.onDestroy))
            .subscribe(movimiento => {
              if (movimiento) {
                this.esNavegacion = true;
                this.fcService.setValue(`filtros.numeroDocumento`, movimiento.numeroDocumentoPorte);
                this.fcService.setValue(`filtros.patente`, movimiento.patente);
                this.fcService.setValue(`filtros.tarjeta`, movimiento.tarjeta);
                this.fcService.setValue(`filtros.producto`, movimiento.producto);
                this.completeDataBinding([movimiento] as Array<ControlarCalidadCargaDataView>);
              } else {
                this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
              }
            });
        } else {
          this.search();
        }
      });
  }

  protected search() {
    this.selected = [];
    this.searchService.getData(this.filters)
    .pipe(takeUntil(this.onDestroy))
    .subscribe(results => {
      if (results instanceof Array) {
        if (results.length === 0) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
        }
        this.completeDataBinding(results);
      }
    });
  }

  private completeDataBinding(results: Array<ControlarCalidadCargaDataView>): void {
    if (!this.esNavegacion) {
      this.navigationService.clearPathCache();
    }
    this.rows = [];
    const dataBinding = <Array<ControlarCalidadCargaDataView>><any>results;
    this.rows = [...dataBinding];
  }

  aceptar(aceptarContinuar: boolean): void {
    this.aceptarContinuar = aceptarContinuar;
    this.onClickAceptar();
  }

  public cancelarModal() {
    this.onClickCancelar();
    if (!this.terminal.utilizaTarjeta) {
      this.fcService.disableControl('filtros.tarjeta');
    }
  }

  private continuar(): void {
    this.destroyedByNavigation = true;
    this.navigationService.navigateByMovement(this.idMovimiento, this.basePath, this.setNavigationExtras());
  }

  private setNavigationExtras(): NavigationExtras {
    return {
      queryParams: {
        'idMovimiento': this.idMovimiento,
        'operacion': Operaciones.Alta
      }
    };
  }

  fillControlsWithData(parametros: DecisionControlPatrimonialDataView, isView: boolean): void {
    this.fcService.setValue('detalle.decision', parametros.decision, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.observacion', parametros.observaciones, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.archivos', parametros.archivo, {onlySelf: true}, isView);
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
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.ControlPatrimonial);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.ControlPatrimonial);
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
        prop: 'producto.descripcion',
        width: 200
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado',
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
        name: Resources.Labels.TitularCP,
        prop: 'titularCP',
        width: 70
      },
      {
        name: Resources.Labels.Vendedor,
        prop: 'vendedor',
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
        decision: [{ value: '', disabled: true }, Validators.required],
        observacion: { value: '', disabled: true},
        archivos: { value: [], disabled: true },
      })
    });
    this.fcService.initialize(this.form);
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
      this.mostarMensaje(obs, messageSuccess, titleSuccess);
      this.popupService.unblockUI();
      if (this.aceptarContinuar) {
        this.continuar();
      } else if (this.esNavegacion && this.navigationService.isFromGestionarTransporteCircuito()) {
        this.destroyedByNavigation = true;
        this.navigationService.navigateBackToSource();
      } else {
        this.isLoading = false;
        this.detalle.close();
        this.cancelar();
        this.setDisabledGroup(false, 'filtros');
        this.setFocusFiltro();
        this.search();
      }
    });
  }

  clickEdit(row) {
    this.disableButtons = false;
    this.setDisabledGroup(true, 'filtros');
    this.setDisabledGroup(false, 'detalle');
    this.esConsulta = false;
    this.editId = this.esCopia ? 0 : row['id'];
    this.idMovimiento = row['id'];
    this.setFocusDetalle();
    this.fillControlsWithData(row, false);
    this.detalle.open();
  }

  mapControlsToCommand(): RegistrarControlPatrimonialCommand {
    const command = new RegistrarControlPatrimonialCommand();
    command.estaAceptado = this.mapDecisionToCommand();
    command.observaciones = this.fcService.getValue('detalle.observacion');
    command.archivos = this.mapArchivosToCommand();
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión Patrimonial', ['Gestión Patrimonial']);
  }

  private mapDecisionToCommand(): boolean {
    const estaAceptado = this.fcService.getValue('detalle.decision');
    return estaAceptado === 1;
  }

  private mapArchivosToCommand(): ArchivoRegistrarControlPatrimonialCommand[] {
    const result: ArchivoRegistrarControlPatrimonialCommand[] = [];

    const archivos = this.fcService.getValue('detalle.archivos') as ArchivoRegistrarControlPatrimonialCommand[];
    if (archivos && archivos.length > 0) {
      for (let i = 0; i < archivos.length; i++) {
        result.push({
          contenido: archivos[i].contenido,
          nombre: archivos[i].nombre,
          extension: archivos[i].extension
        });
      }
    }
    return result;
  }

}
