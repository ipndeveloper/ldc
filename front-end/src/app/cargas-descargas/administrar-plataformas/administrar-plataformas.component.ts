import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarPlataformasService } from './administrar-plataformas.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { AdministrarPlataformasdataView } from '../../shared/data-models/administrar-plataformas-data-view';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo, Permission } from '../../shared/enums/enums';
import { DetalleAdministrarPlataformasComponent } from './detalle-administrar-plataformas/detalle-administrar-plataformas.component';
import { FiltroAdministrarPlataformasComponent } from './filtro-administrar-plataformas/filtro-administrar-plataformas.component';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { PlataformaDescargaCommand, CrearPlataformaDescargaCommand, ModificarPlataformaDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/plataforma-descarga-command';
import { PlataformaDescarga } from '../../shared/data-models/plataforma-descarga';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'yrd-administrar-plataformas',
  templateUrl: './administrar-plataformas.component.html',
  styleUrls: ['./administrar-plataformas.component.css']
})
export class AdministrarPlataformasComponent
                                extends AdministrableFormComponent<AdministrarPlataformasdataView[],
                                                                    PlataformaDescargaCommand,
                                                                    CrearPlataformaDescargaCommand,
                                                                    ModificarPlataformaDescargaCommand,
                                                                    PlataformaDescarga> implements OnInit, OnDestroy {
  @ViewChild('detalle') detalle: DetalleAdministrarPlataformasComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarPlataformasComponent;

  constructor(service: AdministrarPlataformasService,
              searchFormActionsNotifierService: SearchFormActionsNotifierService,
              popupService: PopupService,
              fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly excelExportService: ExcelService) {
    super(service, searchFormActionsNotifierService, popupService, fcService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarPlataformasConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarPlataformasAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarPlataformasModificar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.AdministrarPlataformasExportarAExcel;
}

public init() {
  super.init();
  this.setearValoresPorDefecto();
}

ngOnDestroy(): void {
  this.onDestroy.next();
  this.onDestroy.unsubscribe();
}

createForm(): void {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: [{ value: '', disabled: false }],
        habilitado: [{ value: '', disabled: false }, Validators.required],
      }),
      detalle: this.fb.group({
        terminal: [{ value: '', disabled: true }, Validators.required],
        plataforma: [{ value: '', disabled: true }, Validators.required],
        capacidadMaxima: [{value: '', disabled: true}, Validators.required],
        habilitado: [{ value: '', disabled: true }, Validators.required]
      })
    });
   this.fcService.initialize(this.form);
}

private setearValoresPorDefecto() {
  this.fcService.setValue('filtros.habilitado', {id: OpcionesSiNo.Si}, {onlySelf: true});
}

public setGridColumns(): void {
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
        name: Resources.Labels.Plataforma,
        prop: 'plataforma'
      },
      {
         name: Resources.Labels.CapacidadMaxima,
         prop: 'capacidadMaxima'
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado'
      }
    ];
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
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Administrar Plataformas', ['Plataformas']);
  }

  protected clickAdd() {
    super.clickAdd();
    this.prepareForm();
  }

  private prepareForm() {
    this.fcService.disableControl('detalle.habilitado');
    this.fcService.setValue('detalle.habilitado', true, {onlySelf: true});
  }

  public setFocusFiltro(): void {
    setTimeout(() => {this.filtro.setFocus(); }, 0);
  }

  public setFocusDetalle(): void {
    setTimeout(() => {this.detalle.setFocus(); }, 0);
  }

  public fillControlsWithData(data: PlataformaDescarga, isView: boolean): void {
    this.fcService.setValue('detalle.plataforma', data.descripcion, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.terminal', data.terminal, {onlySelf: true}, true);
    this.fcService.setValue('detalle.habilitado', data.habilitado, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.capacidadMaxima', data.capacidadMaxima, {onlySelf: true});
  }

  public clearForm(): void {
    this.form.reset();
  }

 public subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.terminal', 'terminal');
    const habilitadoControl = this.form.get('filtros.habilitado');
    if (habilitadoControl) {
      habilitadoControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['habilitado'] = +value.id === -1 ? null : value.id === OpcionesSiNo.Si;
        } else {
          this.filters['habilitado'] = null;
        }
      });
    }
  }

  mapControlsToCommand(): PlataformaDescargaCommand {
      const command = new PlataformaDescargaCommand();
      command.idTerminal = this.fcService.getValue('detalle.terminal');
      command.descripcion =  this.fcService.getValue('detalle.plataforma');
      command.habilitado =  this.fcService.getValue('detalle.habilitado');
      command.capacidadMaxima = this.fcService.getValue('detalle.capacidadMaxima');

      return command;
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.Plataforma);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.Plataforma);
  }

}
