import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AdministrableFormComponent } from '../../core/components/search-form/administrable-form.component';
import { AdministrarAutorizacionesBalanzaDataView } from '../../shared/data-models/administrar-autorizaciones-balanza-data-view';
import { AutorizacionBalanzaCommand, CrearAutorizacionBalanzaCommand, ModificarAutorizacionBalanzaCommand } from '../../shared/data-models/commands/cargas-descargas/autorizacion-balanza-command';
import { AutorizacionBalanzaDataView } from '../../shared/data-models/autorizacion-balanza-data-view';
import { Permission, OpcionesSiNo, TablasTransporte, MotivosErrorBalanza } from '../../shared/enums/enums';
import { DetalleAdministrarAutorizacionesBalanzaComponent } from './detalle-administrar-autorizaciones-balanza/detalle-administrar-autorizaciones-balanza.component';
import { FiltroAdministrarAutorizacionesBalanzaComponent } from './filtro-administrar-autorizaciones-balanza/filtro-administrar-autorizaciones-balanza.component';
import { AdministrarAutorizacionesBalanzaService } from './administrar-autorizaciones-balanza.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PopupService } from '../../core/services/popupService/popup.service';
import { BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-administrar-autorizaciones-balanza',
  templateUrl: './administrar-autorizaciones-balanza.component.html',
  styleUrls: ['./administrar-autorizaciones-balanza.component.css']
})

export class AdministrarAutorizacionesBalanzaComponent extends
  AdministrableFormComponent<Array<AdministrarAutorizacionesBalanzaDataView>,
                             AutorizacionBalanzaCommand,
                             CrearAutorizacionBalanzaCommand,
                             ModificarAutorizacionBalanzaCommand,
                             AutorizacionBalanzaDataView> implements OnInit, OnDestroy {

  @ViewChild('detalle') detalle: DetalleAdministrarAutorizacionesBalanzaComponent;
  @ViewChild('filtro') filtro: FiltroAdministrarAutorizacionesBalanzaComponent;
  idTablaTransporte = TablasTransporte.RangoAutorizacionBalanza;

  Permission = Permission;

  constructor(protected readonly service: AdministrarAutorizacionesBalanzaService,
              public readonly searchFormActionsNotifierService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder) {
    super(service, searchFormActionsNotifierService, popupService, fcService);

    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.Agregar] = true;
    this.botonesHabilitados[BotonesEnum.Modificar] = true;
    this.botonesHabilitados[BotonesEnum.Copiar] = true;
    this.botonesHabilitados[BotonesEnum.Eliminar] = true;

    this.permisosBotones[BotonesEnum.Consultar] = Permission.AdministrarAutorizacionesBalanzaConsultar;
    this.permisosBotones[BotonesEnum.Agregar] = Permission.AdministrarAutorizacionesBalanzaAgregar;
    this.permisosBotones[BotonesEnum.Modificar] = Permission.AdministrarAutorizacionesBalanzaModificar;
    this.permisosBotones[BotonesEnum.Copiar] = Permission.AdministrarAutorizacionesBalanzaCopiar;
    this.permisosBotones[BotonesEnum.Eliminar] = Permission.AdministrarAutorizacionesBalanzaEliminar;
  }

  setFocusFiltro(): void {
    setTimeout(() => this.filtro.setFocus(), 0);
  }

  setFocusDetalle(): void {
    setTimeout(() => this.detalle.setFocus(), 0);
  }

  getCreateSuccessMessage(): string {
    return Resources.Messages.LaNuevaXFueAgregadaConExito.format(Resources.Labels.AutorizacionBalanza);
  }

  getUpdateSuccessMessage(): string {
    return Resources.Messages.LaEdicionDeLaXFueGuardadaConExito.format(Resources.Labels.AutorizacionBalanza);
  }

  clearForm() {
    this.form.controls.detalle.reset();
    this.detalle.clearCheckboxLists();
  }

  mapControlsToCommand(): AutorizacionBalanzaCommand {
    const command = new AutorizacionBalanzaCommand();
    command.idMotivoErrorBalanzaCircuito = this.fcService.getValue('detalle.motivoErrorBalanzaCircuito');
    command.tope = this.fcService.getValue('detalle.tope');
    command.habilitado = this.fcService.getValue('detalle.habilitado');
    command.idVendedor = this.fcService.getValue('detalle.vendedor');
    command.idsRolesPrimeraAutorizacion = this.fcService.getValue('detalle.rolesPrimeraAutorizacion');
    command.idsRolesSegundaAutorizacion = this.fcService.getValue('detalle.rolesSegundaAutorizacion');
    return command;
  }

  subscribeFilterChanges(): void {
    this.subscribeToFilterControlChanges('filtros.circuito', 'circuito');
    this.subscribeToFilterControlChanges('filtros.motivo', 'motivo');
        const esEntradaControl = this.form.get('filtros.esEntrada');
    if (esEntradaControl) {
      esEntradaControl.valueChanges.subscribe((value: any) => {
        if (value) {
          this.filters['esEntrada'] = +value.id === 1;
        } else {
          this.filters['esEntrada'] = null;
        }
      });
    }

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

  fillControlsWithData(data: AutorizacionBalanzaDataView, isView: boolean) {
    this.fcService.setValue('detalle.circuito', data.circuito, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.esEntrada', { id: data.esEntrada ? 1 : 2 }, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.motivoErrorBalanzaCircuito', data.motivoErrorBalanzaCircuito, {onlySelf: true}, isView);
    this.fcService.setValue('detalle.tope', data.tope, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.habilitado', data.habilitado, { onlySelf: true }, isView);
    this.fcService.setValue('detalle.vendedor', data.sociedad, { onlySelf: true },
    data.motivoErrorBalanzaCircuito.id !== MotivosErrorBalanza.DiferenciaPesoDocPorte);

    this.detalle.setRoles(data.rolesPrimeraAutorizacion, true);
    this.detalle.setRoles(data.rolesSegundaAutorizacion, false);
  }

  createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        circuito: { value: '', disabled: false },
        esEntrada: { value: '', disabled: false },
        motivo: { value: '', disabled: false },
        habilitado: { value: '', disabled: false }
      }),
      detalle: this.fb.group({
        circuito: [{ value: '', disabled: false }, Validators.required],
        esEntrada: [{ value: '', disabled: false }, Validators.required],
        motivoErrorBalanzaCircuito: [{ value: '', disabled: false }, Validators.required],
        tope: [{ value: '', disabled: false }],
        habilitado: [{ value: false, disabled: false }],
        rolesPrimeraAutorizacion: [],
        rolesSegundaAutorizacion: [],
        vendedor: [{value: '', disable: true}],
      })
    });
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
        name: Resources.Labels.Circuito,
        prop: 'circuito',
        width: 300
      },
      {
        name: Resources.Labels.SentidoBalanza,
        prop: 'sentidoBalanza',
        width: 40
      },
      {
        name: Resources.Labels.Motivo,
        prop: 'motivo',
        width: 300
      },
      {
        name: Resources.Labels.Vendedor,
        prop: 'sociedad',
        width: 40
      },
      {
        name: Resources.Labels.Tope,
        prop: 'tope',
        width: 40
      },
      {
        name: Resources.Labels.Habilitado,
        prop: 'habilitado',
        width: 40
      }
    ];
  }

  protected init() {
    super.init();
    this.setearValoresPorDefectoFiltros();
  }

  protected clickAdd() {
    super.clickAdd();
    this.setearValoresPorDefectoAltaDetalle();
  }

  private setearValoresPorDefectoFiltros() {
    this.fcService.setValue('filtros.habilitado', { id: OpcionesSiNo.Si }, { onlySelf: true });
  }

  private setearValoresPorDefectoAltaDetalle() {
    this.fcService.setValue('detalle.habilitado', true, { onlySelf: true });
  }

}
