import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { DetalleImportarSobresTransporteComponent } from './detalle-importar-sobres-transporte/detalle-importar-sobres-transporte.component';
import { FiltroImportarSobresTransporteComponent } from './filtro-importar-sobres-transporte/filtro-importar-sobres-transporte.component';
import { Permission, EstadosSobreTransporte } from '../../shared/enums/enums';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder } from '@angular/forms';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { ImportarSobresTransporteService } from './importar-sobres-transporte.service';
import { Resources } from '../../../locale/artifacts/resources';
import { ImportarSobresTransporteDataView } from '../../shared/data-models/importar-sobres-transporte-data-view';
import { SobreTransporteCommand, CrearSobreTransporteCommand, ModificarSobreTransporteCommand } from '../../shared/data-models/commands/cargas-descargas/sobre-transporte-command';
import { SobreTransporteDataView, DetalleSobreTransporteDataView } from '../../shared/data-models/sobre-transporte-data-view';
import { ModalMostrarMensajeComponent } from '../shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';

@Component({
  selector: 'yrd-importar-sobres-transporte',
  templateUrl: './importar-sobres-transporte.component.html',
  styleUrls: ['./importar-sobres-transporte.component.css']
})
export class ImportarSobresTransporteComponent extends
  AdministrableFormComponent<ImportarSobresTransporteDataView[],
                             SobreTransporteCommand,
                             CrearSobreTransporteCommand,
                             ModificarSobreTransporteCommand,
                             SobreTransporteDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleImportarSobresTransporteComponent;
  @ViewChild('filtro') filtro: FiltroImportarSobresTransporteComponent;
  @ViewChild('modalDetalleError') modalDetalleError: ModalMostrarMensajeComponent;

  Permission = Permission;
  detalleSobreTransporte: DetalleSobreTransporteDataView | null;

  get selectedSobreTransporte(): ImportarSobresTransporteDataView {
    return this.selectedRow ? this.selectedRow[0] : null;
  }

  constructor(private readonly importarSobresService: ImportarSobresTransporteService,
              searchFormActionsNotifierService: SearchFormActionsNotifierService,
              popupService: PopupService,
              fcService: FormComponentService,
              private readonly fb: FormBuilder) {
    super(importarSobresService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.ImportarSobresTransporteConsultar;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
  }

  getCreateSuccessMessage(): string {
    return '';
  }

  getUpdateSuccessMessage(): string {
    return '';
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        nombre: '',
        estado: '',
        fechaCreacion: '',
        nombreUsuarioCreacion: '',
        ambienteOriginante: '',
        tipo: ''
      }),
      detalle: this.fb.group({
        nombre: ''
      })
    });
  }

  clearForm() {
    this.form.controls.detalle.reset();
    this.detalleSobreTransporte = null;
  }

  mapControlsToCommand(): SobreTransporteCommand {
    return new SobreTransporteCommand();
  }

  subscribeFilterChanges() {
    this.subscribeToFilterControlChanges('filtros.nombre', 'nombre');
    this.subscribeToFilterControlChanges('filtros.estado', 'estado');
    this.subscribeToFilterControlChanges('filtros.fechaCreacion', 'fechaCreacion');
    this.subscribeToFilterControlChanges('filtros.nombreUsuarioCreacion', 'nombreUsuarioCreacion');
    this.subscribeToFilterControlChanges('filtros.ambienteOriginante', 'ambienteOriginante');
    this.subscribeToFilterControlChanges('filtros.tipo', 'tipo');
  }

  fillControlsWithData(data: SobreTransporteDataView, isView: boolean) {
    this.fcService.setValue('detalle.nombre', this.selectedSobreTransporte.nombre, {onlySelf: true}, isView);
    this.detalleSobreTransporte = data.detalle;
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
        name: Resources.Labels.Nombre,
        prop: 'nombre',
        width: 200
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado',
      },
      {
        name: Resources.Labels.FechaCreacion,
        prop: 'fechaCreacion',
      },
      {
        name: Resources.Labels.NombreUsuarioCreacion,
        prop: 'nombreUsuarioCreacion',
      },
      {
        name: Resources.Labels.AmbienteCreacion,
        prop: 'ambienteOriginante',
      },
      {
        name: Resources.Labels.FechaImportacion,
        prop: 'fechaImportacion',
      },
      {
        name: Resources.Labels.NombreUsuarioImportacion,
        prop: 'nombreUsuarioImportacion',
      },
      {
        name: Resources.Labels.Tipo,
        prop: 'tipo',
      }
    ];
  }

  onClickImportar() {
    if (this.selectedSobreTransporte) {
      if (this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Cerrado ||
          this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Error ||
          this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.ErrorTecnico) {
        this.popupService.info(Resources.Messages.AguardePorFavor);
        this.importarSobresService.importar(this.selectedId).subscribe(() => {
          this.popupService.success(Resources.Messages.SeIntentoImportarElSobreTransporte, Resources.Labels.Importar);
          this.selectedRow = [];
          this.search();
        });
      } else {
        this.popupService.error(Resources.Messages.ElSobreTransporteDebeEstarEnEstadoCerradoParaPoderImportarlo,
                                Resources.Labels.Error);
      }
    }
  }

  onVerDetalleError() {
    if (this.selectedSobreTransporte) {
      if (this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Error ||
          this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.ErrorTecnico) {
        this.modalDetalleError.open(this.selectedSobreTransporte.detalleError);
      } else {
        this.popupService.error(Resources.Messages.ElSobreTransporteDebeEstarEnEstadoErrorOErrorTecnicoParaVerSuError,
                                Resources.Labels.Error);
      }
    }
  }
}
