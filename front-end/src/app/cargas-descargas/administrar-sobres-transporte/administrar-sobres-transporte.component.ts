import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarSobresTransporteService } from './administrar-sobres-transporte.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { DetalleAdministrarSobresTransporteComponent } from './detalle-administrar-sobres-transporte/detalle-administrar-sobres-transporte.component';
import { FiltroAdministrarSobresTransporteComponent } from './filtro-administrar-sobres-transporte/filtro-administrar-sobres-transporte.component';
import { Resources } from '../../../locale/artifacts/resources';
import { AdministrarSobresTransporteDataView } from '../../shared/data-models/administrar-sobres-transporte-data-view';
import { SobreTransporteDataView, DetalleSobreTransporteDataView } from '../../shared/data-models/sobre-transporte-data-view';
import { SobreTransporteCommand, CrearSobreTransporteCommand, ModificarSobreTransporteCommand } from '../../shared/data-models/commands/cargas-descargas/sobre-transporte-command';
import { EstadosSobreTransporte, Permission } from '../../shared/enums/enums';
import { ModalMostrarMensajeComponent } from '../shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';
import { ModalHistorialSobreTransporteComponent } from './modal-historial-sobre-transporte/modal-historial-sobre-transporte.component';

@Component({
  selector: 'yrd-administrar-sobres-transporte',
  templateUrl: './administrar-sobres-transporte.component.html',
  styleUrls: ['./administrar-sobres-transporte.component.css']
})
export class AdministrarSobresTransporteComponent extends
  AdministrableFormComponent<AdministrarSobresTransporteDataView[],
                             SobreTransporteCommand,
                             CrearSobreTransporteCommand,
                             ModificarSobreTransporteCommand,
                             SobreTransporteDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarSobresTransporteComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarSobresTransporteComponent;
  @ViewChild('modalDetalleError') modalDetalleError: ModalMostrarMensajeComponent;
  @ViewChild('modalHistorialSobreTransporte') modalHistorialSobreTransporte: ModalHistorialSobreTransporteComponent;

  Permission = Permission;
  mostrarUsuarios = false;
  detalleSobreTransporte: DetalleSobreTransporteDataView | null;

  get selectedSobreTransporte(): AdministrarSobresTransporteDataView {
    return this.selectedRow ? this.selected[0] : null;
  }

  constructor(private readonly sobresService: AdministrarSobresTransporteService,
              searchFormActionsNotifierService: SearchFormActionsNotifierService,
              popupService: PopupService,
              fcService: FormComponentService,
              private readonly fb: FormBuilder) {
    super(sobresService, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarSobresTransporteConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarSobresTransporteAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarSobresTransporteModificar;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.ElNuevoXFueAgregadoConExito.format(Resources.Labels.SobreTransporte);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDelXFueGuardadaConExito.format(Resources.Labels.SobreTransporte);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        nombre: '',
        estado: '',
        fechaCreacion: '',
        nombreUsuarioCreacion: '',
        ambienteOriginante: '',
        tipo: '',
        fechaImportacion: '',
        nombreUsuarioImportacion: ''
      }),
      detalle: this.fb.group({
        nombre: ['', Validators.required],
        usuarios: []
      })
    });
  }

  clearForm() {
    this.form.controls.detalle.reset();
    this.detalle.clearUsuarios();
    this.detalleSobreTransporte = null;
  }

  mapControlsToCommand(): SobreTransporteCommand {
    const command = new SobreTransporteCommand();
    command.nombre = this.fcService.getValue('detalle.nombre');
    command.idsUsuarios = this.fcService.getValue('detalle.usuarios');
    return command;
  }

  subscribeFilterChanges() {
    this.subscribeToFilterControlChanges('filtros.nombre', 'nombre');
    this.subscribeToFilterControlChanges('filtros.estado', 'estado');
    this.subscribeToFilterControlChanges('filtros.fechaCreacion', 'fechaCreacion');
    this.subscribeToFilterControlChanges('filtros.nombreUsuarioCreacion', 'nombreUsuarioCreacion');
    this.subscribeToFilterControlChanges('filtros.ambienteOriginante', 'ambienteOriginante');
    this.subscribeToFilterControlChanges('filtros.tipo', 'tipo');
    this.subscribeToFilterControlChanges('filtros.fechaImportacion', 'fechaImportacion');
    this.subscribeToFilterControlChanges('filtros.nombreUsuarioImportacion', 'nombreUsuarioImportacion');
  }

  fillControlsWithData(data: SobreTransporteDataView, isView: boolean) {
    this.fcService.setValue('detalle.nombre', data.nombre, {onlySelf: true}, isView);
    if (data.usuarios && data.usuarios.length > 0) {
      this.fcService.setValue('detalle.usuarios', data.usuarios, {onlySelf: true}, isView);
      this.detalle.setUsuarios(data.usuarios);
      this.mostrarUsuarios = true;
    }
    if (isView) {
      this.detalleSobreTransporte = data.detalle;
    }
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

  onClickCerrar() {
    if (this.selectedSobreTransporte) {
      if (this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Abierto) {
        this.sobresService.cerrar(this.selectedId).subscribe(() => {
          this.popupService.success(Resources.Messages.ElSobreTransporteHaSidoCerradoConExito, Resources.Labels.Exito);
          this.selectedRow = [];
          this.search();
        });
      } else {
        this.popupService.error(Resources.Messages.ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderCerrarlo, Resources.Labels.Error);
      }
    }
  }

  onClickAnular() {
    if (this.selectedSobreTransporte) {
      if (this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Abierto ||
          this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Cerrado) {
        this.sobresService.anular(this.selectedId).subscribe(() => {
          this.popupService.success(Resources.Messages.ElSobreTransporteHaSidoAnuladoConExito, Resources.Labels.Exito);
          this.selectedRow = [];
          this.search();
        });
      } else {
        this.popupService.error(Resources.Messages.ElSobreTransporteDebeEstarEnEstadoAbiertoOCerradoParaPoderAnularlo,
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

  protected clickAdd() {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
    this.mostrarUsuarios = true;
  }

  protected clickEdit(row: any) {
    if (row) {
      if (this.selectedSobreTransporte.idEstado === EstadosSobreTransporte.Abierto) {
        super.clickEdit(row);
      } else {
        this.popupService.error(Resources.Messages.ElSobreTransporteDebeEstarEnEstadoAbiertoParaPoderModificarlo,
                                Resources.Labels.Error);
      }
    }
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.detalle.setUsuarioActualPorDefecto();
  }

  protected cancelar() {
    super.cancelar();
    this.mostrarUsuarios = false;
  }

  onVerHistorial() {
    if (this.selectedSobreTransporte) {
      this.sobresService.getTrazabilidades(this.selectedSobreTransporte.id).subscribe((historial: any[]) => {
        this.modalHistorialSobreTransporte.open(historial);
      });
    }
  }
}
