import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { AdministrarFinalidadesEnvioPdfTicketPesajeDataView } from '../../shared/data-models/administrar-finalidades-envio-pdf-ticket-pesaje-data-view';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { CrearFinalidadesEnvioPdfTicketBalanzaCommand, FinalidadesEnvioPdfTicketBalanzaCommand, ModificarFinalidadesEnvioPdfTicketBalanzaCommand } from '../../shared/data-models/commands/cargas-descargas/finalidades-envio-pdf-ticket-balanza-command';
import { FinalidadesEnvioPdfTicketBalanzaDataView } from '../../shared/data-models/finalidades-envio-pdf-ticket-balanza-data-view copy';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { AdministrarFinalidadesEnvioPdfTicketBalanzaService } from './administrar-finalidades-envio-pdf-ticket-balanza.service';
import { DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './detalle-administrar-finalidades-envio-pdf-ticket-balanza/detalle-administrar-finalidades-envio-pdf-ticket-balanza.component';
import { FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent } from './filtro-administrar-finalidades-envio-pdf-ticket-balanza/filtro-administrar-finalidades-envio-pdf-ticket-balanza.component';

@Component({
  selector: 'yrd-administrar-finalidades-envio-pdf-ticket-balanza',
  templateUrl: './administrar-finalidades-envio-pdf-ticket-balanza.component.html',
  styleUrls: ['./administrar-finalidades-envio-pdf-ticket-balanza.component.css']
})
export class AdministrarFinalidadesEnvioPdfTicketBalanzaComponent
  extends AdministrableFormComponent<Array<AdministrarFinalidadesEnvioPdfTicketPesajeDataView>,
                                     FinalidadesEnvioPdfTicketBalanzaCommand,
                                     CrearFinalidadesEnvioPdfTicketBalanzaCommand,
                                     ModificarFinalidadesEnvioPdfTicketBalanzaCommand,
                                     FinalidadesEnvioPdfTicketBalanzaDataView> {

  @ViewChild('detalle') detalle: DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent;



  constructor(protected readonly service: AdministrarFinalidadesEnvioPdfTicketBalanzaService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarFinalidadesEnvioPdfTicketBalanzaConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarFinalidadesEnvioPdfTicketBalanzaAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarFinalidadesEnvioPdfTicketBalanzaModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarFinalidadesEnvioPdfTicketBalanzaExportarAExcel;
  }

  createForm(): void {
    this.form = this.fb.group({
      filtro: this.fb.group({
        circuito: { value: undefined, disabled: false },
        finalidad: { value: undefined, disabled: false },
        estaHabilitado: { value: false, disabled: false }
      }),
      detalle: this.fb.group({
        circuito: [{ value: undefined, disabled: true }, Validators.required],
        finalidad: [{ value: undefined, disabled: true }, Validators.required],
        estaHabilitado: { value: false, disabled: true }
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
        headerCheckboxable: false,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.Circuito,
        prop: 'circuito'
      },
      {
        name: Resources.Labels.Finalidad,
        prop: 'finalidad'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'estaHabilitado'
      }
    ];
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  fillControlsWithData(data: FinalidadesEnvioPdfTicketBalanzaDataView, isView: boolean): void {
    this.fcService.setValue('detalle.id', data.id);
    this.fcService.setValue('detalle.circuito', data.circuito, { onlySelf: true }, isView || this.editId !== 0);
    this.fcService.setValue('detalle.finalidad', data.finalidad, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.estaHabilitado', data.estaHabilitado, { onlySelf: true }, isView);
  }

  clearForm(): void {
    this.form.controls.detalle.reset();
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtro.circuito', 'circuito');
    this.subscribeToFilterControlChanges('filtro.finalidad', 'finalidad');
    const habilitadoControl = this.form.get('filtro.estaHabilitado');
    if (habilitadoControl) {
      habilitadoControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['estaHabilitado'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['estaHabilitado'] = null;
        }
      });
    }
    const circuitoFiltro = this.form.get('filtro.circuito');
    if (circuitoFiltro) {
      circuitoFiltro.valueChanges.subscribe((value: Circuito) => {
        this.filtro.bindFinalidad(value);
      });
    }
    const circuitoDetalle = this.form.get('detalle.circuito');
    if (circuitoDetalle) {
      circuitoDetalle.valueChanges.subscribe((value: Circuito) => {
        this.detalle.bindFinalidad(value);
      });
    }
  }

  mapControlsToCommand(): FinalidadesEnvioPdfTicketBalanzaCommand {
    const command = new FinalidadesEnvioPdfTicketBalanzaCommand();
    command.id = this.fcService.getValue('detalle.id');
    command.idCircuito = this.fcService.getValue('detalle.circuito');
    command.idFinalidad = this.fcService.getValue('detalle.finalidad');
    command.estaHabilitado = this.fcService.getValue('detalle.estaHabilitado');
    return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.FinalidadEnvioPdfTicketBalanza);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.FinalidadEnvioPdfTicketBalanza);
  }

  protected init(): void {
    super.init();
    this.setearValoresPorDefectofiltro();
  }

  protected clickAdd(): void {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
  }

  private setearValoresPorDefectofiltro(): void {
    this.fcService.setValue('filtro.estaHabilitado', {id: OpcionesSiNo.Si});
  }

  private setearValoresPorDefectoAltaDetalle(): void {
    this.fcService.setValue('detalle.estaHabilitado', true, {onlySelf: true}, true);
  }

  protected subscribeToActionEventsAdministration(): void {
    super.subscribeToActionEventsAdministration();

    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(dataGrid =>
        this.clickExcelExport(dataGrid)
      );
  }

  private clickExcelExport(dataGrid): void {
    this.excelExportService.exportDataGridAsExcel (
      [dataGrid],
      'Administrar finalidades para envío PDF ticket balanza',
      ['Finalidades para envío PDF ticket balanza']
    );
  }
}
