import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Resources } from '../../../locale/artifacts/resources';
import { FiltroAdministrarNotificacionesComponent } from '../administrar-notificaciones/filtro-administrar-notificaciones/filtro-administrar-notificaciones.component';
import { SearchFormComponent } from '../../core/components/search-form/search-form.component';
import { GestionarNotificacionesDataView } from './gestionar-notificaciones-data-view';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { NotificacionesService } from './search-notificaciones.service';
import { Dictionary } from '../../core/models/dictionary';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { TipoNotificacion } from '../../shared/data-models/tipo-notificacion';
import { ReintentarNotificacionCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-notificacion-command';
import { Permission } from '../../shared/enums/enums';
import { CancelarNotificacionesCommand } from '../../shared/data-models/commands/cargas-descargas/cancelar-notificaciones-command';
import { ModalMostrarMensajeComponent } from '../shared/modals/modal-mostrar-mensaje/modal-mostrar-mensaje.component';

@Component({
  selector: 'yrd-gestionar-notificaciones',
  templateUrl: './gestionar-notificaciones.component.html',
  styleUrls: ['./gestionar-notificaciones.component.css']
})
export class GestionarNotificacionesComponent extends SearchFormComponent<Array<GestionarNotificacionesDataView>>
implements OnInit, AfterViewInit, OnDestroy {

  Permission = Permission;
  @ViewChild('modalDetalle') modalDetalle: ModalMostrarMensajeComponent;
  @ViewChild('filtro') filtroNotificaciones: FiltroAdministrarNotificacionesComponent;

  onDestroy = new Subject();
  selectedRow: any;


  constructor(
    notificationActionsService: SearchFormActionsNotifierService,
    public readonly dropdownNotificationService: DropdownNotificationService<TipoNotificacion>,
    private readonly service: NotificacionesService,
    public readonly popupService: PopupService,
    private readonly fb: FormBuilder) {
    super(service, notificationActionsService, popupService);
  }

  ngOnInit() {
    this.createForm();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.setFilters();
    this.subscribeToActionEventsPrivate();
  }

  ngAfterViewInit() {
    this.search();
    this.filtroNotificaciones.setFocus();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        terminal: {value: ''},
        tipoNotificacion: {value: ''},
        fechaDesde: '',
        fechaHasta: '',
        usuario: ''
      })
    });
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
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
        name: Resources.Labels.Terminal,
        prop: 'terminal'
      },
      {
        name: Resources.Labels.Notificacion,
        prop: 'tipoNotificacion'
      },
      {
        name: Resources.Labels.Fecha,
        prop: 'fechaFormat'
      },
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('terminal', '');
    this.filters.add('tipoNotificacion', '');
    this.filters.add('fechaDesde', '');
    this.filters.add('fechaHasta', '');
    this.filters.add('DetalleError', '');
  }

  private subscribeToFiltersChanges() {
    const terminal = this.form.get('filtros.terminal');
    const tipoNotificacion = this.form.get('filtros.tipoNotificacion');
    const fechaDesde = this.form.get('filtros.fechaDesde');
    const fechaHasta = this.form.get('filtros.fechaHasta');

    if (terminal && tipoNotificacion && fechaDesde && fechaHasta) {
      terminal.valueChanges.subscribe((value: string) => {
        this.filters['terminal'] = value;
      });
      tipoNotificacion.valueChanges.subscribe((value) => {
        this.filters['tipoNotificacion'] = value;
      });
      fechaDesde.valueChanges.subscribe((value) => {
        this.filters['fechaDesde'] = value;
      });
      fechaHasta.valueChanges.subscribe((value) => {
        this.filters['fechaHasta'] = value;
      });
    }

  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.selectedRows
    .pipe(
      takeUntil(this.onDestroy)
    )
    .subscribe(row =>
      this.clickSelectedRow(row)
    );
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== undefined) {
      this.selectedRow = row;
    }
  }

  onReintentar() {
      const notificaciones = this.selectedRow.map(sr => sr.id);
      const command = new ReintentarNotificacionCommand(notificaciones);
      this.service.reintentar(command).subscribe(() => {
        this.popupService.success(Resources.Messages.ReintentoNotificacionExitoso);
        this.search();
      });

    }

  onCancelar() {
    const notificaciones = this.selectedRow.map(sr => sr.id);
    const command = new CancelarNotificacionesCommand(notificaciones);
    this.service.cancelar(command).subscribe(() => {
      this.popupService.success(Resources.Messages.SeCanceloLaNotificacion);
      this.search();
    });
  }

  onDetalle() {
    this.modalDetalle.open(this.selectedRow[0].detalleError);
  }

}
