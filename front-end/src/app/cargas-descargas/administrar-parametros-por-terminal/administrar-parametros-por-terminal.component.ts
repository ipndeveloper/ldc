import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarParametrosPorTerminalService } from './administrar-parametros-por-terminal.service';
import { ParametrosPorTerminal } from '../../shared/data-models/parametros-por-terminal';
import { ModificarParametrosPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-parametros-por-terminal-command';
import { Resources } from '../../../locale/artifacts/resources';
import { DetalleAdministrarParametrosPorTerminalComponent } from './detalle-administrar-parametros-por-terminal/detalle-administrar-parametros-por-terminal.component';
import { horaCupoValida } from '../shared/validators/hora-cupo-valida.validator';
import { FiltroAdministrarParametrosPorTerminalComponent } from './filtro-administrar-parametros-por-terminal/filtro-administrar-parametros-por-terminal.component';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { ParametrosTerminalDataView } from '../../shared/data-models/parametros-terminal-data-view';
import { ParametrosPorTerminalCommand, CrearParametrosPorTerminalCommand } from '../../shared/data-models/commands/cargas-descargas/parametros-por-terminal-command';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Permission } from '../../shared/enums/enums';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'yrd-administrar-parametros-por-terminal',
  templateUrl: './administrar-parametros-por-terminal.component.html',
  styleUrls: ['./administrar-parametros-por-terminal.component.css']
})

export class AdministrarParametrosPorTerminalComponent extends
AdministrableFormComponent<Array<ParametrosTerminalDataView>,
                           ParametrosPorTerminalCommand,
                           CrearParametrosPorTerminalCommand,
                           ModificarParametrosPorTerminalCommand,
                           ParametrosPorTerminal>
  implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarParametrosPorTerminalComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarParametrosPorTerminalComponent;

  form: FormGroup;
  disableFiltros = true;
  isLoading = false;

  constructor(protected readonly administrarParametrosPorTerminalService: AdministrarParametrosPorTerminalService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(administrarParametrosPorTerminalService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarParametrosPorTerminalConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarParametrosPorTerminalModificar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarParametrosPorTerminalModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarParametrosPorTerminalExportarAExcel;
  }

  ngOnInit() {
    super.ngOnInit();
    this.administrarParametrosPorTerminalService.codigoPermiso = Permission.AdministrarParametrosPorTerminal;
    this.administrarParametrosPorTerminalService.incluirAdministracionCentral = false;
  }

  protected init() {
    super.init();
    this.subscribeDetailChanges();
  }

  fillControlsWithData(parametros: ParametrosPorTerminal, isView: boolean): void {
    this.fcService.setValue('detalle.terminal', parametros.terminal, {onlySelf: true}, +parametros.id !== 0);
    this.fcService.setValue('detalle.usaTarjeta', parametros.utilizaTarjeta, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.direccion', parametros.direccion, { onlySelf: true });
    this.fcService.setValue('detalle.abreviatura', parametros.abreviatura, { onlySelf: true });
    this.fcService.setValue('detalle.sede', parametros.sede, { onlySelf: true });
    this.fcService.setValue('detalle.tipoTarjeta', parametros.tipoTarjeta, { onlySelf: true });
    this.fcService.setValue('detalle.diferenciaDiasFiltroControlPeso', parametros.diferenciaDiasFiltroControlPeso, { onlySelf: true });
    this.fcService.setValue('detalle.horaCorteCupo', String(parametros.horaCorteCupo).substring(11, 16) , { onlySelf: true });
    this.fcService.setValue('detalle.formatoPatente', parametros.expresionesRegularPatente, { onlySelf: true });
    this.fcService.setValue('detalle.horasExpiracionRespuestaEntregador',
                            parametros.horasExpiracionRespuestaEntregador, { onlySelf: true });
    this.fcService.setValue('detalle.diferenciaDiasFiltroGeneracionArchivoMuestra',
                            parametros.diferenciaDiasFiltroGeneracionArchivoMuestra, { onlySelf: true });
    this.fcService.setValue('detalle.copiasTicketCalidadVagon', parametros.copiasTicketCalidadVagon, { onlySelf: true });
    this.fcService.setValue('detalle.copiasTicketCalidad', parametros.copiasTicketCalidad, { onlySelf: true });
    this.fcService.setValue('detalle.copiasTicketPesaje', parametros.copiasTicketPesaje, { onlySelf: true });
    this.fcService.setValue('detalle.copiasRemito', parametros.copiasRemito, { onlySelf: true });
    this.fcService.setValue('detalle.kgsBrutosEstimados', parametros.kgsBrutosEstimados, { onlySelf: true });
    this.fcService.setValue('detalle.kgsTaraEstimados', parametros.kgsTaraEstimados, { onlySelf: true });
    this.fcService.setValue('detalle.leyendaBonificacionTrigo', parametros.leyendaBonificacionTrigo, { onlySelf: true });
    this.fcService.setValue('detalle.usaAceptarYContinuar', parametros.usaAceptarYContinuar, { onlySelf: true });
    this.fcService.setValue('detalle.usaFleteCorto', parametros.usaFleteCorto, { onlySelf: true });
    this.fcService.setValue('detalle.usaMuestraIntacta', parametros.usaMuestraIntacta, { onlySelf: true });
    this.fcService.setValue('detalle.codigoAduana', parametros.codigoAduana, { onlySelf: true });
    this.fcService.setValue('detalle.nroLote', parametros.nroLote, { onlySelf: true });
    this.fcService.setValue('detalle.toleranciaTurnoCircular', parametros.toleranciaTurnoCircular, { onlySelf: true });
    this.detalle.setFormatosPatente(parametros.expresionesRegularPatente);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
  }

  private subscribeDetailChanges(): void {
    const usaTarjetaCtrl = this.fcService.getControl('detalle.usaTarjeta');
    const tipoTarjetaCtrl = this.fcService.getControl('detalle.tipoTarjeta');
    if (usaTarjetaCtrl && tipoTarjetaCtrl) {
      usaTarjetaCtrl.valueChanges.subscribe((value: boolean) => {
        if (value === false) {
          tipoTarjetaCtrl.disable();
          tipoTarjetaCtrl.clearValidators();
          tipoTarjetaCtrl.updateValueAndValidity({ onlySelf: true });
        } else {
          tipoTarjetaCtrl.enable();
          tipoTarjetaCtrl.setValidators(Validators.required);
          tipoTarjetaCtrl.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.Terminal);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.Terminal);
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
        name: Resources.Labels.Terminal,
        prop: 'terminal.descripcion',
        width: 70
      },
      {
        name: Resources.Labels.Direccion,
        prop: 'direccion',
        width: 200
      },
      {
        name: Resources.Labels.Sede,
        prop: 'sede.descripcion',
        width: 70
      },
      {
        name: Resources.Labels.Abreviatura,
        prop: 'abreviatura',
        width: 70
      }
    ];
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: true }],
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: true }, Validators.required],
        direccion: [{ value: '', disabled: true }, Validators.required],
        abreviatura: [{ value: '', disabled: true }, Validators.required],
        usaTarjeta: [{ value: '', disabled: true }, Validators.required],
        tipoTarjeta: [{ value: '', disabled: true }],
        horaCorteCupo: [{ value: '', disabled: true }, [Validators.required, horaCupoValida()]],
        sede: [{ value: '', disabled: true }, Validators.required],
        diferenciaDiasFiltroGeneracionArchivoMuestra: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        diferenciaDiasFiltroControlPeso: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        formatoPatente: [{ value: '', disabled: true }],
        copiasTicketCalidadVagon: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        copiasTicketCalidad: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        copiasTicketPesaje: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        copiasRemito: [{ value: '', disabled: true }, [Validators.required, Validators.min(1)]],
        kgsBrutosEstimados: [{ value: '', disabled: true }],
        kgsTaraEstimados: [{ value: '', disabled: true }],
        leyendaBonificacionTrigo: [{ value: '', disabled: true }],
        usaFleteCorto: [{ value: '', disabled: true }],
        usaMuestraIntacta: [{ value: '', disabled: true }],
        usaAceptarYContinuar: [{ value: '', disabled: true }],
        codigoAduana: [{ value: '', disabled: true }],
        nroLote: [{ value: '', disabled: true }],
        toleranciaTurnoCircular: [{value: '', disabled: true }]
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

  onClickAceptar() {
    this.editId = this.fcService.getValue('detalle.terminal');
    super.onClickAceptar();
  }

  mapControlsToCommand(): ModificarParametrosPorTerminalCommand {
    const command = new ModificarParametrosPorTerminalCommand();
    command.direccion = this.fcService.getValue('detalle.direccion');
    command.IdTipoTarjeta = this.fcService.getValue('detalle.tipoTarjeta');
    command.IdSede = this.fcService.getValue('detalle.sede');
    command.abreviatura = this.fcService.getValue('detalle.abreviatura');
    command.utilizaTarjeta = this.fcService.getValue('detalle.usaTarjeta');
    command.copiasTicketCalidadVagon = this.fcService.getValue('detalle.copiasTicketCalidadVagon');
    command.copiasTicketCalidad = this.fcService.getValue('detalle.copiasTicketCalidad');
    command.copiasTicketPesaje = this.fcService.getValue('detalle.copiasTicketPesaje');
    command.copiasRemito = this.fcService.getValue('detalle.copiasRemito');
    command.diferenciaDiasFiltroControlPeso = this.fcService.getValue('detalle.diferenciaDiasFiltroControlPeso');
    command.diferenciaDiasFiltroGeneracionArchivoMuestra = this.fcService.getValue('detalle.diferenciaDiasFiltroGeneracionArchivoMuestra');
    command.horaCorteCupo = this.HoraCorteCupoConFormato().toLocalISOString();
    command.kgsBrutosEstimados = this.fcService.getValue('detalle.kgsBrutosEstimados');
    command.kgsTaraEstimados = this.fcService.getValue('detalle.kgsTaraEstimados');
    command.expresionesRegularPatente = this.fcService.getValue('detalle.formatoPatente');
    command.leyendaBonificacionTrigo = this.fcService.getValue('detalle.leyendaBonificacionTrigo');
    command.usaFleteCorto = this.fcService.getValue('detalle.usaFleteCorto');
    command.usaMuestraIntacta = this.fcService.getValue('detalle.usaMuestraIntacta');
    command.usaAceptarYContinuar = this.fcService.getValue('detalle.usaAceptarYContinuar');
    command.codigoAduana = this.fcService.getValue('detalle.codigoAduana');
    command.nroLote = this.fcService.getValue('detalle.nroLote');
    command.toleranciaTurnoCircular = this.fcService.getValue('detalle.toleranciaTurnoCircular');
    return command;
  }

  private HoraCorteCupoConFormato(): Date {
    const horaCorteCupo = String(this.fcService.getValue('detalle.horaCorteCupo'));
    const horaCorteCupoConFormato = new Date();
    horaCorteCupoConFormato.setHours(Number(horaCorteCupo.substring(0, 2)));
    horaCorteCupoConFormato.setMinutes(Number(horaCorteCupo.substring(3, 5)));
    horaCorteCupoConFormato.setSeconds(0);

    return horaCorteCupoConFormato;
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Terminal', ['Terminales']);
  }
}
